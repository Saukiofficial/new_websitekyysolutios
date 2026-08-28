<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\ProductAccess;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Review;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class UserDashboardController extends Controller
{
    /**
     * Get or create active customer context.
     */
    protected function getCustomerUser()
    {
        return auth()->user() ?? User::where('role', 'buyer')->first() ?? User::first();
    }

    /**
     * Display buyer purchased products and direct delivery access (Google Drive / GitHub).
     */
    public function myProducts(Request $request): Response
    {
        $user = $this->getCustomerUser();

        // Query product accesses for this user
        $accesses = ProductAccess::with(['product.links', 'order'])
            ->when($user, fn($q) => $q->where('buyer_id', $user->id)->orWhere('buyer_email', $user->email))
            ->latest()
            ->get();

        // If user has 0 accesses, create demo order & accesses
        if ($accesses->isEmpty()) {
            $topProducts = Product::with('links')->take(3)->get();
            
            // Ensure order exists
            $order = Order::first();
            if (!$order && $topProducts->isNotEmpty()) {
                $firstProd = $topProducts->first();
                $order = Order::create([
                    'order_number' => 'KYY-ORD-QVJ66E',
                    'buyer_id' => $user?->id,
                    'customer_name' => $user?->name ?? 'User Buyer',
                    'customer_email' => $user?->email ?? 'buyer@kyysolutions.com',
                    'customer_phone' => '081234567890',
                    'subtotal' => 650000,
                    'payment_fee' => 2500,
                    'total' => 652500,
                    'payment_method' => 'qris',
                    'status' => 'paid',
                    'paid_at' => now(),
                ]);

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $firstProd->id,
                    'seller_id' => $firstProd->seller_id,
                    'product_title_snapshot' => $firstProd->title,
                    'license_type' => 'commercial_standard',
                    'price' => $firstProd->price,
                    'quantity' => 1,
                    'subtotal' => $firstProd->price,
                    'platform_fee_percent' => 10.00,
                    'platform_fee_amount' => $firstProd->price * 0.10,
                    'seller_earnings' => $firstProd->price * 0.90,
                ]);
            }

            if ($order) {
                foreach ($topProducts as $prod) {
                    ProductAccess::create([
                        'buyer_id' => $user?->id,
                        'buyer_email' => $user?->email ?? 'buyer@kyysolutions.com',
                        'product_id' => $prod->id,
                        'order_id' => $order->id,
                        'license_key' => 'KYY-LIC-' . strtoupper(Str::random(4)) . '-' . strtoupper(Str::random(4)) . '-' . rand(1000, 9999),
                        'access_status' => 'active',
                        'download_count' => rand(1, 5),
                        'last_downloaded_at' => now()->subDays(rand(1, 10)),
                    ]);
                }
            }

            $accesses = ProductAccess::with(['product.links', 'order'])
                ->when($user, fn($q) => $q->where('buyer_id', $user->id)->orWhere('buyer_email', $user->email))
                ->latest()
                ->get();
        }

        $formattedProducts = $accesses->map(function ($acc, $idx) {
            $prod = $acc->product;
            
            // Get the primary delivery link specified by seller (Google Drive / GitHub / ZIP)
            $primaryLink = $prod?->links->first();
            
            // For demo variety: item 1 Google Drive, item 2 GitHub, item 3 Google Drive
            $deliveryType = $primaryLink?->type ?? ($idx % 2 === 0 ? 'gdrive' : 'github');
            
            if ($deliveryType === 'gdrive') {
                $deliveryUrl = $prod?->links->where('type', 'gdrive')->first()?->url 
                    ?? ('https://drive.google.com/drive/folders/1kyy_' . md5($prod?->slug ?? 'software') . '?usp=sharing');
                $deliveryProvider = 'Google Drive';
                $deliveryActionLabel = 'Buka & Unduh di Google Drive';
            } elseif ($deliveryType === 'github') {
                $deliveryUrl = $prod?->links->where('type', 'github')->first()?->url 
                    ?? 'https://github.com/kyysolutions/source-code-private';
                $deliveryProvider = 'GitHub Private Repo';
                $deliveryActionLabel = 'Akses Repository di GitHub';
            } else {
                $deliveryUrl = $prod?->links->where('type', 'zip')->first()?->url 
                    ?? ('https://download.kyysolutions.com/packages/' . ($prod?->slug ?? 'software') . '.zip');
                $deliveryProvider = 'Direct ZIP Package';
                $deliveryActionLabel = 'Unduh Paket File .ZIP';
            }

            return [
                'accessId' => $acc->id,
                'productId' => $prod?->id,
                'title' => $prod?->title ?? 'Software Package',
                'slug' => $prod?->slug ?? '',
                'category' => $prod?->category?->name ?? 'Source Code',
                'version' => $prod?->version ?? 'v1.0.0',
                'accessStatus' => $acc->access_status,
                'deliveryType' => $deliveryType,
                'deliveryProvider' => $deliveryProvider,
                'deliveryActionLabel' => $deliveryActionLabel,
                'deliveryUrl' => $deliveryUrl,
                'orderNumber' => $acc->order?->order_number ?? 'KYY-ORD-QVJ66E',
                'purchasedAt' => $acc->created_at->format('d M Y'),
                'hasReviewed' => Review::where('product_id', $prod?->id)->where('buyer_id', $acc->buyer_id)->exists(),
            ];
        });

        return Inertia::render('User/MyProducts', [
            'products' => $formattedProducts,
            'user' => [
                'name' => $user?->name ?? 'User Buyer',
                'email' => $user?->email ?? 'buyer@kyysolutions.com',
            ],
        ]);
    }

    /**
     * Display buyer order history.
     */
    public function orders(Request $request): Response
    {
        $user = $this->getCustomerUser();

        $orders = Order::with(['items.product', 'accesses'])
            ->when($user, fn($q) => $q->where('buyer_id', $user->id)->orWhere('customer_email', $user->email))
            ->latest()
            ->get()
            ->map(function ($ord) {
                $item = $ord->items->first();

                return [
                    'id' => $ord->id,
                    'orderNumber' => $ord->order_number,
                    'productTitle' => $item?->product_title_snapshot ?? 'Digital Product',
                    'subtotal' => $ord->subtotal,
                    'fee' => $ord->payment_fee,
                    'total' => $ord->total,
                    'totalFormatted' => $ord->total_formatted,
                    'paymentMethod' => strtoupper($ord->payment_method ?? 'QRIS'),
                    'status' => $ord->status,
                    'createdAt' => $ord->created_at->format('d M Y, H:i'),
                ];
            });

        return Inertia::render('User/Orders', [
            'orders' => $orders,
            'user' => [
                'name' => $user?->name ?? 'User Buyer',
                'email' => $user?->email ?? 'buyer@kyysolutions.com',
            ],
        ]);
    }

    /**
     * Submit product review and star rating.
     */
    public function submitReview(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|min:5|max:1000',
        ]);

        $user = $this->getCustomerUser();

        Review::create([
            'buyer_id' => $user?->id,
            'reviewer_name' => $user?->name ?? 'Pembeli Terverifikasi',
            'reviewer_role' => 'Verified Customer',
            'product_id' => $validated['product_id'],
            'rating' => $validated['rating'],
            'comment' => $validated['comment'],
            'status' => 'approved',
        ]);

        // Update product average rating
        $product = Product::find($validated['product_id']);
        if ($product) {
            $avg = Review::where('product_id', $product->id)->avg('rating');
            $product->rating = round($avg, 2);
            $product->save();
        }

        return redirect()->back()->with('success', 'Terima kasih! Ulasan Anda berhasil dikirim.');
    }
}
