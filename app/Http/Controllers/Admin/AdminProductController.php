<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use App\Models\Store;
use App\Models\ProductLink;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class AdminProductController extends Controller
{
    /**
     * Display product catalog and moderation list.
     */
    public function index(Request $request): Response
    {
        $status = $request->query('status', 'all');
        $search = $request->query('q', '');
        $categoryId = $request->query('category_id');

        $query = Product::with(['category', 'store', 'seller', 'links'])
            ->when($status !== 'all', fn($q) => $q->where('status', $status))
            ->when($search, fn($q) => $q->where('title', 'like', "%{$search}%"))
            ->when($categoryId, fn($q) => $q->where('category_id', $categoryId))
            ->latest();

        $products = $query->get()->map(function ($p) {
            return [
                'id' => $p->id,
                'title' => $p->title,
                'slug' => $p->slug,
                'category' => $p->category?->name ?? 'Uncategorized',
                'category_id' => $p->category_id,
                'seller' => $p->store?->name ?? ($p->seller?->name ?? 'KyySolutions Official'),
                'price' => $p->price,
                'priceFormatted' => $p->price_formatted,
                'extendedPrice' => $p->extended_price,
                'version' => $p->version,
                'salesCount' => $p->sales_count,
                'rating' => (float) $p->rating,
                'badge' => $p->badge,
                'status' => $p->status,
                'publishedAt' => $p->published_at ? $p->published_at->format('d M Y') : '-',
                'deliveryUrl' => $p->links->first()?->url ?? 'https://github.com/kyysolutions',
                'demoUrl' => $p->demo_url,
            ];
        });

        $categories = Category::all(['id', 'name', 'slug', 'category_key']);

        // Moderation summary counts
        $counts = [
            'all' => Product::count(),
            'published' => Product::where('status', 'published')->count(),
            'pending' => Product::where('status', 'pending')->count(),
            'rejected' => Product::where('status', 'rejected')->count(),
        ];

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
            'categories' => $categories,
            'counts' => $counts,
            'filters' => [
                'status' => $status,
                'q' => $search,
                'category_id' => $categoryId,
            ],
        ]);
    }

    /**
     * Store a newly created product.
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
            'demo_url' => 'nullable|url',
            'delivery_url' => 'required|url',
        ]);

        $slug = Str::slug($validated['title']) . '-' . Str::random(4);
        $officialStore = Store::where('is_official', true)->first();
        $adminUser = auth()->user() ?? \App\Models\User::where('role', 'admin')->first();

        $product = Product::create([
            'store_id' => $officialStore?->id,
            'seller_id' => $adminUser->id,
            'category_id' => $validated['category_id'],
            'title' => $validated['title'],
            'slug' => $slug,
            'price' => (int) $validated['price'],
            'extended_price' => $validated['extended_price'] ? (int) $validated['extended_price'] : ((int) $validated['price'] * 2),
            'version' => $validated['version'],
            'badge' => $validated['badge'] ?: 'New Release',
            'short_description' => $validated['short_description'],
            'description' => $validated['short_description'],
            'demo_url' => $validated['demo_url'],
            'status' => 'published',
            'published_at' => now(),
            'sales_count' => 0,
            'rating' => 5.00,
        ]);

        ProductLink::create([
            'product_id' => $product->id,
            'type' => 'github',
            'url' => $validated['delivery_url'],
            'version' => $product->version,
            'status' => 'active',
        ]);

        return redirect()->route('admin.products')->with('success', 'Produk digital berhasil diterbitkan ke marketplace.');
    }

    /**
     * Moderate product status (Approve / Reject).
     */
    public function updateStatus(Request $request, int $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:published,pending,rejected',
        ]);

        $product = Product::findOrFail($id);
        $product->status = $validated['status'];
        if ($validated['status'] === 'published' && !$product->published_at) {
            $product->published_at = now();
        }
        $product->save();

        return redirect()->back()->with('success', "Status produk berhasil diperbarui menjadi {$validated['status']}.");
    }

    /**
     * Delete a product.
     */
    public function destroy(int $id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return redirect()->route('admin.products')->with('success', 'Produk berhasil dihapus.');
    }
}
