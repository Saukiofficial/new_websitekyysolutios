<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Store;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminSellerController extends Controller
{
    /**
     * Display list of seller stores and verification requests.
     */
    public function index(Request $request): Response
    {
        $status = $request->query('status', 'all');
        $search = $request->query('q', '');

        $query = Store::with(['user', 'products'])
            ->when($status !== 'all', fn($q) => $q->where('status', $status))
            ->when($search, fn($q) => $q->where('name', 'like', "%{$search}%")->orWhere('username', 'like', "%{$search}%"))
            ->latest();

        $sellers = $query->get()->map(function ($s) {
            return [
                'id' => $s->id,
                'name' => $s->name,
                'username' => $s->username,
                'email' => $s->user?->email ?? '-',
                'phone' => $s->user?->phone ?? '-',
                'isVerified' => (bool) $s->is_verified,
                'isOfficial' => (bool) $s->is_official,
                'rating' => (float) $s->rating,
                'totalProducts' => $s->products->count(),
                'status' => $s->status,
                'createdAt' => $s->created_at->format('d M Y'),
            ];
        });

        $counts = [
            'all' => Store::count(),
            'verified' => Store::where('is_verified', true)->count(),
            'pending' => Store::where('is_verified', false)->count(),
            'active' => Store::where('status', 'active')->count(),
        ];

        return Inertia::render('Admin/Sellers/Index', [
            'sellers' => $sellers,
            'counts' => $counts,
            'filters' => [
                'status' => $status,
                'q' => $search,
            ]
        ]);
    }

    /**
     * Toggle seller verification status.
     */
    public function toggleVerification(Request $request, int $id)
    {
        $store = Store::findOrFail($id);
        $store->is_verified = !$store->is_verified;
        $store->save();

        return redirect()->back()->with('success', "Status verifikasi toko {$store->name} diperbarui.");
    }
}
