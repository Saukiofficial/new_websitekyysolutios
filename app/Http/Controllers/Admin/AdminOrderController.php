<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminOrderController extends Controller
{
    /**
     * Display list of platform transactions and orders.
     */
    public function index(Request $request): Response
    {
        $status = $request->query('status', 'all');
        $search = $request->query('q', '');

        $query = Order::with(['items.product', 'accesses', 'payment'])
            ->when($status !== 'all', fn($q) => $q->where('status', $status))
            ->when($search, fn($q) => $q->where('order_number', 'like', "%{$search}%")
                ->orWhere('customer_name', 'like', "%{$search}%")
                ->orWhere('customer_email', 'like', "%{$search}%"))
            ->latest();

        $orders = $query->get()->map(function ($ord) {
            $firstItem = $ord->items->first();
            $access = $ord->accesses->first();

            return [
                'id' => $ord->id,
                'orderNumber' => $ord->order_number,
                'customerName' => $ord->customer_name,
                'customerEmail' => $ord->customer_email,
                'customerPhone' => $ord->customer_phone,
                'productTitle' => $firstItem?->product_title_snapshot ?? 'Digital Product',
                'subtotal' => $ord->subtotal,
                'fee' => $ord->payment_fee,
                'total' => $ord->total,
                'totalFormatted' => $ord->total_formatted,
                'paymentMethod' => strtoupper($ord->payment_method ?? 'QRIS'),
                'status' => $ord->status,
                'licenseKey' => $access?->license_key ?? 'KYY-LIC-PENDING',
                'paidAt' => $ord->paid_at ? $ord->paid_at->format('d M Y, H:i') : '-',
                'createdAt' => $ord->created_at->format('d M Y, H:i'),
            ];
        });

        $counts = [
            'all' => Order::count(),
            'paid' => Order::where('status', 'paid')->count(),
            'pending' => Order::where('status', 'pending')->count(),
            'failed' => Order::where('status', 'failed')->count(),
        ];

        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders,
            'counts' => $counts,
            'filters' => [
                'status' => $status,
                'q' => $search,
            ]
        ]);
    }
}
