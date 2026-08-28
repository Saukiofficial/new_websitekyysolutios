<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Models\ProductAccess;
use App\Models\User;
use App\Services\Payment\MidtransService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class CheckoutController extends Controller
{
    protected MidtransService $midtransService;

    public function __construct(MidtransService $midtransService)
    {
        $this->midtransService = $midtransService;
    }

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
            'thumbnail' => $productModel->thumbnail,
            'tech' => $productModel->tech_stack ?? ['Laravel', 'React'],
            'version' => $productModel->version,
            'filesIncluded' => 'Full Source Code, SQL Database Dump, Documentation, Figma Tokens',
        ];

        return Inertia::render('Public/Checkout/Index', [
            'product' => $product,
            'productId' => $product['id'],
            'midtransClientKey' => config('services.midtrans.client_key', env('MIDTRANS_CLIENT_KEY', '')),
            'midtransSnapUrl' => config('services.midtrans.is_production', false)
                ? 'https://app.midtrans.com/snap/snap.js'
                : 'https://app.sandbox.midtrans.com/snap/snap.js',
        ]);
    }

    /**
     * Process checkout order submission and connect to Midtrans Snap Gateway.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|integer',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:30',
            'payment_method' => 'required|string',
            'coupon_code' => 'nullable|string|max:50',
            'agree_terms' => 'accepted',
        ]);

        $product = Product::with(['category', 'seller'])->findOrFail($validated['product_id']);
        
        $orderNumber = 'KYY-ORD-' . date('Ymd') . '-' . strtoupper(Str::random(5));
        $fee = $validated['payment_method'] === 'qris' ? 0 : 4000;
        
        // Calculate optional coupon discount
        $discount = 0;
        if (!empty($validated['coupon_code'])) {
            $code = strtoupper(trim($validated['coupon_code']));
            if ($code === 'KYYSPECIAL') {
                $discount = (int) ($product->price * 0.10);
            } elseif ($code === 'LAUNCH50') {
                $discount = (int) ($product->price * 0.15);
            }
        }

        $total = ($product->price - $discount) + $fee;

        // Transactional Database Insert
        $order = DB::transaction(function () use ($validated, $product, $orderNumber, $fee, $discount, $total) {
            // Find or automatically create buyer user account
            $buyer = User::where('email', $validated['email'])->first();
            
            if (!$buyer) {
                $buyer = User::create([
                    'name' => $validated['name'],
                    'email' => $validated['email'],
                    'password' => Hash::make('Kyysolutions@' . rand(1000, 9999)),
                    'role' => 'buyer',
                    'status' => 'active',
                ]);
            }

            // Auto-login buyer if not authenticated
            if (!Auth::check()) {
                Auth::login($buyer);
            }

            // 1. Create Order with 'pending' status for payment gateway processing
            $order = Order::create([
                'buyer_id' => $buyer->id,
                'order_number' => $orderNumber,
                'customer_name' => $validated['name'],
                'customer_email' => $validated['email'],
                'customer_phone' => $validated['phone'],
                'subtotal' => $product->price,
                'discount' => $discount,
                'payment_fee' => $fee,
                'total' => $total,
                'currency' => 'IDR',
                'coupon_code' => $validated['coupon_code'] ?? null,
                'payment_method' => $validated['payment_method'],
                'payment_provider' => 'midtrans',
                'status' => 'pending',
            ]);

            // 2. Create Order Item
            OrderItem::create([
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

            // 3. Create Pending Payment Log
            Payment::create([
                'order_id' => $order->id,
                'provider' => 'midtrans',
                'provider_reference' => 'MID-' . strtoupper(Str::random(8)),
                'payment_method_code' => $validated['payment_method'],
                'amount' => $total,
                'status' => 'pending',
            ]);

            return [$order, $buyer];
        });

        [$createdOrder, $buyerUser] = $order;

        // Generate Midtrans Snap Transaction Token
        $snapResult = $this->midtransService->createSnapTransaction($createdOrder, $product, $buyerUser, $total);
        
        $createdOrder->snap_token = $snapResult['token'] ?? null;
        $createdOrder->payment_url = $snapResult['redirect_url'] ?? null;

        // If mock mode (no midtrans keys entered yet), auto-settle for seamless local testing
        if (!empty($snapResult['is_mock'])) {
            $this->midtransService->processOrderSettlement($createdOrder, [
                'transaction_id' => 'MID-MOCK-' . strtoupper(Str::random(8)),
                'payment_type' => $validated['payment_method'],
            ]);
        } else {
            $createdOrder->save();
        }

        return redirect()->route('orders.success', ['orderNumber' => $createdOrder->order_number])->with([
            'snap_token' => $createdOrder->snap_token,
            'payment_url' => $createdOrder->payment_url,
            'is_mock' => $snapResult['is_mock'] ?? false,
        ]);
    }

    /**
     * Real-time Check Order Status Endpoint (Failover / Anti-Delay Webhook).
     */
    public function checkStatus(Request $request, string $orderNumber): JsonResponse
    {
        $order = Order::with(['items.product'])->where('order_number', $orderNumber)->first();

        if (!$order) {
            return response()->json(['status' => 'error', 'message' => 'Pesanan tidak ditemukan.'], 404);
        }

        // If already paid, return instantly
        if ($order->status === 'paid') {
            return response()->json([
                'status' => 'paid',
                'is_paid' => true,
                'paid_at' => $order->paid_at ? $order->paid_at->format('d M Y, H:i') . ' WIB' : now()->format('d M Y, H:i') . ' WIB',
                'message' => 'Pembayaran telah terverifikasi lunas.',
            ]);
        }

        // Query Midtrans Server Status directly
        $midtransStatus = $this->midtransService->checkTransactionStatus($order->order_number);

        if (isset($midtransStatus['transaction_status'])) {
            $ts = $midtransStatus['transaction_status'];

            if (in_array($ts, ['settlement', 'capture'], true)) {
                $this->midtransService->processOrderSettlement($order, $midtransStatus);

                return response()->json([
                    'status' => 'paid',
                    'is_paid' => true,
                    'paid_at' => $order->paid_at ? $order->paid_at->format('d M Y, H:i') . ' WIB' : now()->format('d M Y, H:i') . ' WIB',
                    'message' => 'Pembayaran berhasil dikonfirmasi secara real-time!',
                ]);
            }

            if ($ts === 'pending') {
                return response()->json([
                    'status' => 'pending',
                    'is_paid' => false,
                    'message' => 'Menunggu transfer / pembayaran dari pembeli.',
                ]);
            }

            if (in_array($ts, ['expire', 'deny', 'cancel'], true)) {
                $order->status = ($ts === 'expire') ? 'expired' : 'failed';
                $order->save();

                return response()->json([
                    'status' => $order->status,
                    'is_paid' => false,
                    'message' => 'Transaksi kedaluwarsa atau dibatalkan.',
                ]);
            }
        }

        return response()->json([
            'status' => $order->status,
            'is_paid' => $order->status === 'paid',
            'message' => 'Status pesanan saat ini: ' . $order->status,
        ]);
    }

    /**
     * Display order success & product download access page with real-time status check.
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
                'snapToken' => $orderModel->snap_token,
                'paymentUrl' => $orderModel->payment_url,
                'licenseKey' => $access?->license_key,
                'paidAt' => $orderModel->paid_at ? $orderModel->paid_at->format('d M Y, H:i') . ' WIB' : ($orderModel->status === 'paid' ? now()->format('d M Y, H:i') . ' WIB' : null),
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
            'midtransClientKey' => config('services.midtrans.client_key', env('MIDTRANS_CLIENT_KEY', '')),
            'midtransSnapUrl' => config('services.midtrans.is_production', false)
                ? 'https://app.midtrans.com/snap/snap.js'
                : 'https://app.sandbox.midtrans.com/snap/snap.js',
        ]);
    }

    /**
     * Download or stream official PDF Invoice receipt.
     */
    public function downloadInvoice(Request $request, string $orderNumber)
    {
        $order = Order::with(['items.product.category', 'accesses'])->where('order_number', $orderNumber)->firstOrFail();

        if (class_exists(\Barryvdh\DomPDF\Facade\Pdf::class)) {
            $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('invoices.receipt', compact('order'))
                ->setPaper('a4', 'portrait');

            return $pdf->download("KyySolutions-Invoice-{$order->order_number}.pdf");
        }

        return view('invoices.receipt', compact('order'));
    }
}
