<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Models\ProductAccess;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class CheckoutController extends Controller
{
    /**
     * Display the checkout page for a selected product.
     */
    public function index(Request $request, ?int $id = null): Response
    {
        $productId = $id ?? (int) $request->query('product_id', 1);
        $productModel = Product::with(['category'])->find($productId);

        if (!$productModel) {
            $productModel = Product::with(['category'])->first();
        }

        $product = [
            'id' => $productModel->id,
            'slug' => $productModel->slug,
            'title' => $productModel->title,
            'category' => $productModel->category?->name ?? 'SaaS Systems',
            'categoryKey' => $productModel->category?->category_key ?? 'saasSystems',
            'price' => $productModel->price,
            'priceFormatted' => $productModel->price_formatted,
            'extendedPrice' => $productModel->extended_price ?? ($productModel->price * 2),
            'extendedPriceFormatted' => $productModel->extended_price_formatted,
            'license' => 'Regular License',
            'badge' => $productModel->badge,
            'tech' => $productModel->tech_stack ?? ['Laravel', 'React'],
            'version' => $productModel->version,
            'filesIncluded' => 'Full Source Code, SQL Database Dump, Documentation, Figma Tokens',
        ];

        return Inertia::render('Public/Checkout/Index', [
            'product' => $product,
            'productId' => $product['id'],
        ]);
    }

    /**
     * Process checkout order submission and save into MySQL Database.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|integer',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:30',
            'payment_method' => 'required|string',
            'agree_terms' => 'accepted',
        ]);

        $product = Product::with(['category', 'seller'])->findOrFail($validated['product_id']);
        
        $orderNumber = 'KYY-ORD-' . date('Ymd') . '-' . strtoupper(Str::random(5));
        $fee = $validated['payment_method'] === 'qris' ? 0 : 4000;
        $total = $product->price + $fee;

        // Transactional Database Insert
        $order = DB::transaction(function () use ($validated, $product, $orderNumber, $fee, $total) {
            // Find or associate buyer user if logged in / exists
            $buyer = User::where('email', $validated['email'])->first();

            // 1. Create Order
            $order = Order::create([
                'buyer_id' => $buyer?->id,
                'order_number' => $orderNumber,
                'customer_name' => $validated['name'],
                'customer_email' => $validated['email'],
                'customer_phone' => $validated['phone'],
                'subtotal' => $product->price,
                'discount' => 0,
                'payment_fee' => $fee,
                'total' => $total,
                'currency' => 'IDR',
                'payment_method' => $validated['payment_method'],
                'status' => 'paid', // Instant auto-verified for demonstration
                'paid_at' => now(),
            ]);

            // 2. Create Order Item
            $orderItem = OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'seller_id' => $product->seller_id,
                'product_title_snapshot' => $product->title,
                'price' => $product->price,
                'license_type' => 'regular',
                'commission_rate' => 10.00,
                'commission_amount' => (int) ($product->price * 0.10),
                'seller_amount' => (int) ($product->price * 0.90),
            ]);

            // 3. Create Payment Record
            Payment::create([
                'order_id' => $order->id,
                'provider' => $validated['payment_method'],
                'provider_reference' => 'PAY-' . strtoupper(Str::random(8)),
                'payment_method_code' => $validated['payment_method'],
                'amount' => $total,
                'status' => 'paid',
                'paid_at' => now(),
            ]);

            // 4. Create Product Access & Commercial License
            $licenseKey = 'KYY-LIC-' . strtoupper(Str::random(4)) . '-' . strtoupper(Str::random(4)) . '-AUTH';
            ProductAccess::create([
                'buyer_id' => $buyer?->id,
                'buyer_email' => $validated['email'],
                'product_id' => $product->id,
                'order_id' => $order->id,
                'order_item_id' => $orderItem->id,
                'license_key' => $licenseKey,
                'license_type' => 'regular',
                'access_status' => 'active',
                'access_count' => 0,
            ]);

            // Increment sales count on product
            $product->increment('sales_count');

            return $order;
        });

        return redirect()->route('orders.success', ['orderNumber' => $order->order_number])->with([
            'order' => [
                'orderNumber' => $order->order_number,
                'product' => [
                    'id' => $product->id,
                    'title' => $product->title,
                    'category' => $product->category?->name ?? 'Digital Product',
                    'version' => $product->version,
                ],
                'buyer' => [
                    'name' => $order->customer_name,
                    'email' => $order->customer_email,
                    'phone' => $order->customer_phone,
                ],
                'paymentMethod' => $order->payment_method,
                'subtotal' => $order->subtotal,
                'fee' => $order->payment_fee,
                'total' => $order->total,
                'status' => $order->status,
                'paidAt' => $order->paid_at->format('d M Y, H:i') . ' WIB',
            ]
        ]);
    }

    /**
     * Display order success & product download access page.
     */
    public function success(Request $request, string $orderNumber): Response
    {
        $orderModel = Order::with(['items.product.category', 'accesses'])->where('order_number', $orderNumber)->first();

        if ($orderModel) {
            $firstItem = $orderModel->items->first();
            $access = $orderModel->accesses->first();

            $order = [
                'orderNumber' => $orderModel->order_number,
                'product' => [
                    'id' => $firstItem?->product_id ?? 1,
                    'title' => $firstItem?->product_title_snapshot ?? ($firstItem?->product?->title ?? 'Digital Product'),
                    'category' => $firstItem?->product?->category?->name ?? 'SaaS Systems',
                    'version' => $firstItem?->product?->version ?? 'v2.4.0',
                ],
                'buyer' => [
                    'name' => $orderModel->customer_name,
                    'email' => $orderModel->customer_email,
                    'phone' => $orderModel->customer_phone,
                ],
                'paymentMethod' => $orderModel->payment_method,
                'subtotal' => $orderModel->subtotal,
                'fee' => $orderModel->payment_fee,
                'total' => $orderModel->total,
                'status' => $orderModel->status,
                'licenseKey' => $access?->license_key,
                'paidAt' => $orderModel->paid_at ? $orderModel->paid_at->format('d M Y, H:i') . ' WIB' : now()->format('d M Y, H:i') . ' WIB',
            ];
        } else {
            $order = session('order') ?? [
                'orderNumber' => $orderNumber,
                'product' => [
                    'id' => 1,
                    'title' => 'SaaS Multi-Tenant Boilerplate Starter',
                    'category' => 'SaaS Systems',
                    'version' => 'v2.4.0',
                ],
                'buyer' => [
                    'name' => 'Customer',
                    'email' => 'customer@example.com',
                    'phone' => '+62 812-3456-7890',
                ],
                'paymentMethod' => 'qris',
                'subtotal' => 650000,
                'fee' => 0,
                'total' => 650000,
                'status' => 'paid',
                'paidAt' => now()->format('d M Y, H:i') . ' WIB',
            ];
        }

        return Inertia::render('Public/Checkout/Success', [
            'order' => $order,
        ]);
    }
}
