<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    /**
     * Display the product detail page.
     */
    public function show(string $slug): Response
    {
        // Fetch from Database with relationships
        $productModel = Product::with(['category', 'store', 'reviews', 'links'])
            ->where('slug', $slug)
            ->orWhere('id', is_numeric($slug) ? (int) $slug : 0)
            ->first();

        if ($productModel) {
            $product = [
                'id' => $productModel->id,
                'slug' => $productModel->slug,
                'title' => $productModel->title,
                'category' => $productModel->category?->name ?? 'SaaS Systems',
                'categoryKey' => $productModel->category?->category_key ?? 'saasSystems',
                'badge' => $productModel->badge,
                'rating' => (float) $productModel->rating,
                'reviewsCount' => $productModel->reviews_count ?: $productModel->reviews->count(),
                'salesCount' => $productModel->sales_count,
                'regularPrice' => $productModel->price,
                'extendedPrice' => $productModel->extended_price ?? ($productModel->price * 2),
                'regularPriceFormatted' => $productModel->price_formatted,
                'extendedPriceFormatted' => $productModel->extended_price_formatted,
                'version' => $productModel->version,
                'updatedAt' => $productModel->updated_at->format('d M Y'),
                'demoUrl' => $productModel->demo_url,
                'shortDescription' => $productModel->short_description,
                'description' => $productModel->description,
                'features' => $productModel->features ?? [],
                'techStack' => $productModel->tech_stack ?? [],
                'requirements' => $productModel->requirements ?? [],
                'filesIncluded' => $productModel->files_included ?? [],
                'changelog' => $productModel->changelog ?? [],
                'seller' => [
                    'name' => $productModel->store?->name ?? 'KyySolutions Official',
                    'verified' => $productModel->store?->is_verified ?? true,
                    'rating' => (float) ($productModel->store?->rating ?? 5.0),
                    'totalProducts' => 12,
                    'responseTime' => $productModel->store?->response_time ?? '< 15 Menit',
                    'avatarBg' => 'bg-blue-600',
                ],
                'reviews' => $productModel->reviews->map(fn($r) => [
                    'name' => $r->reviewer_name ?? 'Aditya F.',
                    'role' => $r->reviewer_role ?? 'Verified Buyer',
                    'rating' => (int) $r->rating,
                    'date' => $r->created_at->diffForHumans(),
                    'comment' => $r->comment,
                ])->toArray(),
            ];

            // Related products from database
            $relatedModels = Product::with(['category'])
                ->where('id', '!=', $productModel->id)
                ->limit(3)
                ->get();

            $relatedProducts = $relatedModels->map(fn($p) => [
                'id' => $p->id,
                'slug' => $p->slug,
                'title' => $p->title,
                'category' => $p->category?->name ?? 'Digital Product',
                'shortDescription' => $p->short_description,
                'regularPriceFormatted' => $p->price_formatted,
            ])->toArray();

            return Inertia::render('Public/Products/Show', [
                'product' => $product,
                'relatedProducts' => $relatedProducts,
            ]);
        }

        // Fallback if DB empty
        return redirect()->route('marketplace.index');
    }
}
