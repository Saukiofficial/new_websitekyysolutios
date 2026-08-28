<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use App\Models\Store;
use App\Models\ProductLink;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class SellerProductController extends Controller
{
    protected function getSellerStore()
    {
        $seller = auth()->user() ?? User::where('role', 'seller')->first() ?? User::first();
        $store = Store::where('user_id', $seller->id)->first() ?? Store::first();
        return [$seller, $store];
    }

    /**
     * Display seller product management list.
     */
    public function index(Request $request): Response
    {
        [$seller, $store] = $this->getSellerStore();

        $products = Product::with(['category', 'links'])
            ->where('seller_id', $seller->id)
            ->orWhere('store_id', $store?->id)
            ->latest()
            ->get()
            ->map(function ($p) {
                $primaryLink = $p->links->first();

                return [
                    'id' => $p->id,
                    'title' => $p->title,
                    'slug' => $p->slug,
                    'category' => $p->category?->name ?? 'Source Code',
                    'price' => $p->price,
                    'priceFormatted' => $p->price_formatted,
                    'extendedPrice' => $p->extended_price,
                    'version' => $p->version,
                    'salesCount' => $p->sales_count,
                    'rating' => (float) $p->rating,
                    'badge' => $p->badge,
                    'thumbnail' => $p->thumbnail,
                    'status' => $p->status,
                    'deliveryType' => $primaryLink?->type ?? 'gdrive',
                    'deliveryUrl' => $primaryLink?->url ?? 'https://drive.google.com',
                    'publishedAt' => $p->published_at ? $p->published_at->format('d M Y') : '-',
                ];
            });

        $categories = Category::all(['id', 'name', 'slug']);

        return Inertia::render('Seller/Products/Index', [
            'products' => $products,
            'categories' => $categories,
            'store' => [
                'name' => $store?->name ?? 'My Studio',
                'isVerified' => (bool) $store?->is_verified,
            ],
        ]);
    }

    /**
     * Store new software product by seller with thumbnail upload support.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric|min:0',
            'extended_price' => 'nullable|numeric|min:0',
            'version' => 'required|string|max:20',
            'badge' => 'nullable|string|max:50',
            'short_description' => 'required|string',
            'demo_url' => 'nullable|string|max:255',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,webp,svg|max:3072',
            'thumbnail_url' => 'nullable|string|max:500',
            'delivery_type' => 'required|in:gdrive,github,zip',
            'delivery_url' => 'required|url',
        ]);

        [$seller, $store] = $this->getSellerStore();
        $slug = Str::slug($validated['title']) . '-' . Str::random(4);

        // Handle thumbnail file upload or URL
        $thumbnail = null;
        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('products', 'public');
            $thumbnail = '/storage/' . $path;
        } elseif ($request->filled('thumbnail_url')) {
            $thumbnail = $request->input('thumbnail_url');
        }

        $product = Product::create([
            'store_id' => $store?->id,
            'seller_id' => $seller->id,
            'category_id' => $validated['category_id'],
            'title' => $validated['title'],
            'slug' => $slug,
            'price' => (int) $validated['price'],
            'extended_price' => $validated['extended_price'] ? (int) $validated['extended_price'] : ((int) $validated['price'] * 2),
            'version' => $validated['version'],
            'badge' => $validated['badge'] ?: 'New Release',
            'thumbnail' => $thumbnail,
            'short_description' => $validated['short_description'],
            'description' => $validated['short_description'],
            'demo_url' => $validated['demo_url'] ?? null,
            'status' => 'published',
            'published_at' => now(),
            'sales_count' => 0,
            'rating' => 5.00,
        ]);

        ProductLink::create([
            'product_id' => $product->id,
            'type' => $validated['delivery_type'],
            'url' => $validated['delivery_url'],
            'version' => $product->version,
            'status' => 'active',
        ]);

        return redirect()->route('seller.products')->with('success', 'Software baru beserta thumbnail berhasil diunggah dan terbit di marketplace.');
    }

    /**
     * Delete product.
     */
    public function destroy(int $id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return redirect()->back()->with('success', 'Produk berhasil dihapus.');
    }
}
