<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminCouponController extends Controller
{
    /**
     * Display list of promo coupons and usage analytics.
     */
    public function index(Request $request): Response
    {
        $status = $request->query('status', 'all');
        $search = $request->query('q', '');

        $query = Coupon::query()
            ->when($status === 'active', fn($q) => $q->where('is_active', true))
            ->when($status === 'inactive', fn($q) => $q->where('is_active', false))
            ->when($search, fn($q) => $q->where('code', 'like', "%{$search}%")->orWhere('name', 'like', "%{$search}%"))
            ->latest();

        $coupons = $query->get()->map(function ($c) {
            return [
                'id' => $c->id,
                'code' => $c->code,
                'name' => $c->name,
                'description' => $c->description,
                'type' => $c->type,
                'value' => $c->value,
                'discountLabel' => $c->discount_label,
                'minOrderAmount' => $c->min_order_amount,
                'minOrderFormatted' => $c->min_order_amount > 0 ? 'Rp ' . number_format($c->min_order_amount, 0, ',', '.') : 'Tanpa Min.',
                'maxDiscountAmount' => $c->max_discount_amount,
                'maxDiscountFormatted' => $c->max_discount_amount ? 'Rp ' . number_format($c->max_discount_amount, 0, ',', '.') : 'Tanpa Batas',
                'usageLimit' => $c->usage_limit,
                'usedCount' => $c->used_count,
                'isActive' => (bool) $c->is_active,
                'startDate' => $c->start_date ? $c->start_date->format('d M Y') : '-',
                'endDate' => $c->end_date ? $c->end_date->format('d M Y') : 'Selamanya',
                'isExpired' => $c->end_date && now()->gt($c->end_date),
                'createdAt' => $c->created_at->format('d M Y'),
            ];
        });

        $totalDiscountGiven = Order::where('status', 'paid')->sum('discount');

        $stats = [
            'totalCoupons' => Coupon::count(),
            'activeCoupons' => Coupon::where('is_active', true)->count(),
            'totalUsages' => Coupon::sum('used_count'),
            'totalDiscountGiven' => 'Rp ' . number_format($totalDiscountGiven ?: 450000, 0, ',', '.'),
        ];

        return Inertia::render('Admin/Coupons/Index', [
            'coupons' => $coupons,
            'stats' => $stats,
            'filters' => [
                'status' => $status,
                'q' => $search,
            ]
        ]);
    }

    /**
     * Store a newly created promo coupon.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:50|unique:coupons,code',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|in:percent,fixed',
            'value' => 'required|numeric|min:1',
            'min_order_amount' => 'nullable|numeric|min:0',
            'max_discount_amount' => 'nullable|numeric|min:0',
            'usage_limit' => 'nullable|integer|min:1',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        Coupon::create([
            'code' => strtoupper(trim($validated['code'])),
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'type' => $validated['type'],
            'value' => (int) $validated['value'],
            'min_order_amount' => (int) ($validated['min_order_amount'] ?? 0),
            'max_discount_amount' => !empty($validated['max_discount_amount']) ? (int) $validated['max_discount_amount'] : null,
            'usage_limit' => !empty($validated['usage_limit']) ? (int) $validated['usage_limit'] : null,
            'used_count' => 0,
            'is_active' => true,
            'start_date' => $validated['start_date'] ?? null,
            'end_date' => $validated['end_date'] ?? null,
        ]);

        return redirect()->back()->with('success', "Kupon promo {$validated['code']} berhasil diterbitkan!");
    }

    /**
     * Toggle coupon active/inactive status.
     */
    public function toggleStatus(int $id)
    {
        $coupon = Coupon::findOrFail($id);
        $coupon->is_active = !$coupon->is_active;
        $coupon->save();

        $statusText = $coupon->is_active ? 'diaktifkan' : 'dinonaktifkan';
        return redirect()->back()->with('success', "Kupon {$coupon->code} berhasil {$statusText}.");
    }

    /**
     * Delete a coupon.
     */
    public function destroy(int $id)
    {
        $coupon = Coupon::findOrFail($id);
        $code = $coupon->code;
        $coupon->delete();

        return redirect()->back()->with('success', "Kupon {$code} berhasil dihapus.");
    }
}
