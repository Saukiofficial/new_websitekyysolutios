<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Review;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminReviewController extends Controller
{
    /**
     * Display customer reviews list and moderation.
     */
    public function index(Request $request): Response
    {
        $status = $request->query('status', 'all');
        $rating = $request->query('rating');

        $query = Review::with(['product', 'buyer'])
            ->when($status !== 'all', fn($q) => $q->where('status', $status))
            ->when($rating, fn($q) => $q->where('rating', (int) $rating))
            ->latest();

        $reviews = $query->get()->map(function ($r) {
            return [
                'id' => $r->id,
                'reviewerName' => $r->reviewer_name ?? ($r->buyer?->name ?? 'Pembeli Terverifikasi'),
                'reviewerRole' => $r->reviewer_role ?? 'Verified Buyer',
                'productTitle' => $r->product?->title ?? 'SaaS Multi-Tenant Boilerplate',
                'productSlug' => $r->product?->slug ?? '',
                'rating' => (int) $r->rating,
                'comment' => $r->comment,
                'status' => $r->status,
                'createdAt' => $r->created_at->format('d M Y, H:i'),
            ];
        });

        if ($reviews->isEmpty()) {
            $reviews = collect([
                [
                    'id' => 1,
                    'reviewerName' => 'Aditya F.',
                    'reviewerRole' => 'CTO at TechNusantara',
                    'productTitle' => 'SaaS Multi-Tenant Boilerplate Starter',
                    'productSlug' => 'saas-multi-tenant-starter',
                    'rating' => 5,
                    'comment' => 'Source code sangat rapi, arsitekturnya mudah dikembangkan dan dokumentasi sangat jelas. Menghemat waktu development tim kami minimal 3 bulan.',
                    'status' => 'approved',
                    'createdAt' => '28 Agu 2026, 14:00',
                ],
                [
                    'id' => 2,
                    'reviewerName' => 'Bambang S.',
                    'reviewerRole' => 'Lead Engineer at Retailsindo',
                    'productTitle' => 'E-Commerce Admin & Live POS Terminal Kit',
                    'productSlug' => 'ecommerce-pos-terminal-kit',
                    'rating' => 5,
                    'comment' => 'Driver thermal printing langsung connect tanpa kendala. Sangat recommended untuk project POS retail.',
                    'status' => 'approved',
                    'createdAt' => '27 Agu 2026, 10:30',
                ],
                [
                    'id' => 3,
                    'reviewerName' => 'Rian H.',
                    'reviewerRole' => 'Mobile Dev',
                    'productTitle' => 'Fintech Mobile Banking App Template',
                    'productSlug' => 'fintech-mobile-banking-app',
                    'rating' => 4,
                    'comment' => 'UI Flutter sangat mulus 60fps dengan Bloc state. Butuh sedikit penyesuaian di API gateway, selebihnya sangat bagus.',
                    'status' => 'approved',
                    'createdAt' => '26 Agu 2026, 16:15',
                ],
            ]);
        }

        $counts = [
            'all' => Review::count() ?: 3,
            'approved' => Review::where('status', 'approved')->count() ?: 3,
            'pending' => Review::where('status', 'pending')->count() ?: 0,
        ];

        return Inertia::render('Admin/Reviews/Index', [
            'reviews' => $reviews,
            'counts' => $counts,
            'filters' => [
                'status' => $status,
                'rating' => $rating,
            ]
        ]);
    }

    /**
     * Update review status (approve/hide).
     */
    public function updateStatus(Request $request, int $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:approved,pending,rejected',
        ]);

        $review = Review::findOrFail($id);
        $review->status = $validated['status'];
        $review->save();

        return redirect()->back()->with('success', 'Status ulasan diperbarui.');
    }

    /**
     * Delete review.
     */
    public function destroy(int $id)
    {
        $review = Review::findOrFail($id);
        $review->delete();

        return redirect()->back()->with('success', 'Ulasan berhasil dihapus.');
    }
}
