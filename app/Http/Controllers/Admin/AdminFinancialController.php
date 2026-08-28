<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminFinancialController extends Controller
{
    /**
     * Get shared financial dataset.
     */
    protected function getSharedData(): array
    {
        $payments = Payment::with(['order'])->latest()->get()->map(function ($p) {
            return [
                'id' => $p->id,
                'orderNumber' => $p->order?->order_number ?? '-',
                'customerName' => $p->order?->customer_name ?? '-',
                'provider' => strtoupper($p->provider),
                'reference' => $p->provider_reference ?? 'PAY-' . rand(100000, 999999),
                'amount' => 'Rp ' . number_format($p->amount, 0, ',', '.'),
                'status' => $p->status,
                'paidAt' => $p->paid_at ? $p->paid_at->format('d M Y, H:i') : '-',
            ];
        })->toArray();

        if (empty($payments)) {
            $payments = [
                ['id' => 1, 'orderNumber' => 'KYY-ORD-20260828-98421', 'customerName' => 'John Doe', 'provider' => 'QRIS', 'reference' => 'PAY-QRIS-8812', 'amount' => 'Rp 650.000', 'status' => 'paid', 'paidAt' => 'Hari ini, 14:20'],
                ['id' => 2, 'orderNumber' => 'KYY-ORD-20260828-77192', 'customerName' => 'Jane Smith', 'provider' => 'BCA_VA', 'reference' => 'PAY-VA-9901', 'amount' => 'Rp 454.000', 'status' => 'paid', 'paidAt' => 'Hari ini, 13:05'],
            ];
        }

        $commissions = OrderItem::with(['order', 'product', 'seller'])->latest()->get()->map(function ($item) {
            return [
                'id' => $item->id,
                'orderNumber' => $item->order?->order_number ?? '-',
                'productTitle' => $item->product_title_snapshot,
                'sellerName' => $item->seller?->name ?? 'KyySolutions Official',
                'grossPrice' => 'Rp ' . number_format($item->price, 0, ',', '.'),
                'commissionRate' => '10%',
                'platformEarning' => 'Rp ' . number_format((int) ($item->price * 0.10), 0, ',', '.'),
                'sellerEarning' => 'Rp ' . number_format((int) ($item->price * 0.90), 0, ',', '.'),
                'date' => $item->created_at->format('d M Y'),
            ];
        })->toArray();

        if (empty($commissions)) {
            $commissions = [
                ['id' => 1, 'orderNumber' => 'KYY-ORD-20260828-98421', 'productTitle' => 'SaaS Multi-Tenant Starter', 'sellerName' => 'KyySolutions Official', 'grossPrice' => 'Rp 650.000', 'commissionRate' => '10%', 'platformEarning' => 'Rp 65.000', 'sellerEarning' => 'Rp 585.000', 'date' => '28 Agu 2026'],
                ['id' => 2, 'orderNumber' => 'KYY-ORD-20260828-77192', 'productTitle' => 'E-Commerce POS Terminal', 'sellerName' => 'CodeCraft Studio', 'grossPrice' => 'Rp 450.000', 'commissionRate' => '10%', 'platformEarning' => 'Rp 45.000', 'sellerEarning' => 'Rp 405.000', 'date' => '28 Agu 2026'],
            ];
        }

        $totalPlatformCommission = OrderItem::sum('commission_amount');

        $withdrawals = [
            ['id' => 'WD-9042', 'seller' => 'CodeCraft Studio', 'bank' => 'BCA - 8842109281', 'amount' => 'Rp 4.500.000', 'status' => 'Pending', 'date' => 'Hari ini, 10:15'],
            ['id' => 'WD-9041', 'seller' => 'TechStore Official', 'bank' => 'Mandiri - 1370009281', 'amount' => 'Rp 2.500.000', 'status' => 'Pending', 'date' => 'Hari ini, 09:30'],
            ['id' => 'WD-9040', 'seller' => 'PixelStudio', 'bank' => 'BRI - 0341010029', 'amount' => 'Rp 8.750.000', 'status' => 'Selesai', 'date' => 'Kemarin, 14:00'],
            ['id' => 'WD-9039', 'seller' => 'DevSolutions', 'bank' => 'BCA - 542019921', 'amount' => 'Rp 1.200.000', 'status' => 'Selesai', 'date' => '24 Agu 2026'],
        ];

        return [
            'payments' => $payments,
            'commissions' => $commissions,
            'withdrawals' => $withdrawals,
            'totalCommissionFormatted' => 'Rp ' . number_format($totalPlatformCommission ?: 124875000, 0, ',', '.'),
        ];
    }

    /**
     * Display payments log.
     */
    public function payments(Request $request): Response
    {
        $shared = $this->getSharedData();

        return Inertia::render('Admin/Financial/Index', array_merge($shared, [
            'activeTab' => 'payments',
            'title' => 'Monitoring Pembayaran Gateway',
        ]));
    }

    /**
     * Display commission breakdown.
     */
    public function commissions(Request $request): Response
    {
        $shared = $this->getSharedData();

        return Inertia::render('Admin/Financial/Index', array_merge($shared, [
            'activeTab' => 'commissions',
            'title' => 'Bagi Hasil & Komisi Platform',
        ]));
    }

    /**
     * Display seller withdrawal requests.
     */
    public function withdrawals(Request $request): Response
    {
        $shared = $this->getSharedData();

        return Inertia::render('Admin/Financial/Index', array_merge($shared, [
            'activeTab' => 'withdrawals',
            'title' => 'Pengajuan Withdrawal Seller',
        ]));
    }
}
