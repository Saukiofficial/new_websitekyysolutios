<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Models\Store;
use App\Models\Product;
use App\Models\Review;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class SellerStoreController extends Controller
{
    protected function getSellerStore()
    {
        $seller = auth()->user() ?? User::where('role', 'seller')->first() ?? User::first();
        $store = Store::where('user_id', $seller->id)->first() ?? Store::first();
        return [$seller, $store];
    }

    /**
     * Display seller store profile settings.
     */
    public function settings(): Response
    {
        [$seller, $store] = $this->getSellerStore();

        return Inertia::render('Seller/Settings/Index', [
            'store' => [
                'id' => $store?->id,
                'name' => $store?->name ?? 'KyySolutions Studio',
                'slug' => $store?->slug ?? 'kyysolutions-studio',
                'bio' => $store?->bio ?? 'Official software engineering and SaaS product development lab by KyySolutions.',
                'website' => 'https://kyysolutions.com',
                'github' => 'https://github.com/kyysolutions',
                'isVerified' => (bool) $store?->is_verified,
                'commissionRate' => $store?->commission_rate ?? 10.00,
            ],
        ]);
    }

    /**
     * Update store profile.
     */
    public function update(Request $request)
    {
        [$seller, $store] = $this->getSellerStore();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'bio' => 'nullable|string|max:1000',
        ]);

        if ($store) {
            $store->name = $validated['name'];
            $store->slug = Str::slug($validated['name']);
            $store->bio = $validated['bio'];
            $store->save();
        }

        return redirect()->back()->with('success', 'Profil toko berhasil diperbarui.');
    }

    /**
     * Display public storefront for any seller.
     */
    public function showPublic(string $slug): Response
    {
        $store = Store::where('slug', $slug)->firstOrFail();
        
        $products = Product::with(['category'])
            ->where('store_id', $store->id)
            ->where('status', 'published')
            ->latest()
            ->get()
            ->map(function ($p) {
                return [
                    'id' => $p->id,
                    'title' => $p->title,
                    'slug' => $p->slug,
                    'category' => $p->category?->name ?? 'Source Code',
                    'priceFormatted' => $p->price_formatted,
                    'salesCount' => $p->sales_count,
                    'rating' => (float) $p->rating,
                    'badge' => $p->badge,
                    'shortDescription' => $p->short_description,
                ];
            });

        return Inertia::render('Public/Store/Show', [
            'store' => [
                'name' => $store->name,
                'slug' => $store->slug,
                'bio' => $store->bio,
                'isVerified' => (bool) $store->is_verified,
                'isOfficial' => (bool) $store->is_official,
                'rating' => (float) $store->rating,
                'salesCount' => $products->sum('salesCount') ?: 142,
                'productsCount' => $products->count(),
            ],
            'products' => $products,
        ]);
    }
}
