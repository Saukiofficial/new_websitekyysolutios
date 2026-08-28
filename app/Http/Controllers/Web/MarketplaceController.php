<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MarketplaceController extends Controller
{
    /**
     * Display the public digital marketplace catalog connected to MySQL database.
     */
    public function index(Request $request): Response
    {
        $products = Product::with(['category', 'store', 'reviews'])
            ->where('status', 'active')
            ->latest('id')
            ->get()
            ->map(function ($p) {
                return [
                    'id' => $p->id,
                    'slug' => $p->slug,
                    'title' => $p->title,
                    'categoryKey' => $p->category?->category_key ?? 'sourceCode',
                    'categoryName' => $p->category?->name ?? 'Source Code',
                    'licenseType' => $p->license_type ?? 'regular',
                    'description' => $p->short_description ?? $p->description,
                    'price' => (int) $p->price,
                    'priceFormatted' => $p->price_formatted,
                    'extendedPrice' => (int) ($p->extended_price ?? ($p->price * 2)),
                    'extendedPriceFormatted' => $p->extended_price_formatted,
                    'rating' => (float) ($p->rating ?: 5.0),
                    'reviews' => (int) ($p->reviews_count ?: ($p->reviews ? $p->reviews->count() : 0)),
                    'sales' => (int) ($p->sales_count ?: 0),
                    'badge' => $p->badge ?: 'Unggulan',
                    'tech' => $p->tech_stack ?: ['Laravel', 'React'],
                    'features' => $p->features ?: [
                        'Dokumentasi instalasi lengkap',
                        'Source code bersih terorganisir',
                        'Gratis update versi berkala',
                    ],
                    'thumbnail' => $p->thumbnail,
                    'demoUrl' => $p->demo_url,
                    'version' => $p->version ?: 'v1.0.0',
                    'store' => [
                        'name' => $p->store?->name ?? 'KyySolutions Official',
                        'slug' => $p->store?->slug ?? 'kyysolutions-official',
                        'verified' => (bool) ($p->store?->is_verified ?? true),
                        'rating' => (float) ($p->store?->rating ?? 5.0),
                    ],
                ];
            });

        $categories = Category::all()->map(function ($c) {
            return [
                'id' => $c->category_key ?: $c->slug,
                'name' => $c->name,
                'slug' => $c->slug,
                'description' => $c->description,
            ];
        });

        return Inertia::render('Public/Marketplace/Index', [
            'initialCategory' => $request->query('category', 'all'),
            'searchQuery' => $request->query('q', ''),
            'dbProducts' => $products,
            'dbCategories' => $categories,
        ]);
    }
}
