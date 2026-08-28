<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminReportController extends Controller
{
    /**
     * Display financial and sales reports.
     */
    public function index(): Response
    {
        $monthlyRevenue = [
            ['month' => 'Jan 2026', 'revenue' => 'Rp 148.500.000', 'orders' => 412, 'growth' => '+14%'],
            ['month' => 'Feb 2026', 'revenue' => 'Rp 162.200.000', 'orders' => 460, 'growth' => '+9.2%'],
            ['month' => 'Mar 2026', 'revenue' => 'Rp 180.400.000', 'orders' => 505, 'growth' => '+11.2%'],
            ['month' => 'Apr 2026', 'revenue' => 'Rp 195.100.000', 'orders' => 540, 'growth' => '+8.1%'],
            ['month' => 'Mei 2026', 'revenue' => 'Rp 210.800.000', 'orders' => 588, 'growth' => '+8.0%'],
            ['month' => 'Jun 2026', 'revenue' => 'Rp 224.500.000', 'orders' => 610, 'growth' => '+6.5%'],
            ['month' => 'Jul 2026', 'revenue' => 'Rp 239.000.000', 'orders' => 652, 'growth' => '+6.4%'],
            ['month' => 'Agu 2026', 'revenue' => 'Rp 248.750.000', 'orders' => 684, 'growth' => '+4.1%'],
        ];

        $topSelling = [
            ['rank' => 1, 'title' => 'SaaS Multi-Tenant Starter', 'category' => 'Source Code', 'sales' => 142, 'revenue' => 'Rp 92.300.000'],
            ['rank' => 2, 'title' => 'E-Commerce POS Terminal Kit', 'category' => 'Source Code', 'sales' => 98, 'revenue' => 'Rp 44.100.000'],
            ['rank' => 3, 'title' => 'Fintech Mobile Banking App', 'category' => 'Mobile Apps', 'sales' => 74, 'revenue' => 'Rp 62.900.000'],
            ['rank' => 4, 'title' => 'Healthcare Clinic & Pharmacy SaaS', 'category' => 'SaaS', 'sales' => 56, 'revenue' => 'Rp 67.200.000'],
            ['rank' => 5, 'title' => 'KyyDesign Design System UI Kit', 'category' => 'UI Kits', 'sales' => 112, 'revenue' => 'Rp 39.200.000'],
        ];

        return Inertia::render('Admin/Reports/Index', [
            'monthlyRevenue' => $monthlyRevenue,
            'topSelling' => $topSelling,
            'summary' => [
                'totalGmv' => 'Rp 248.750.000',
                'netPlatformProfit' => 'Rp 24.875.000',
                'totalTransactions' => 3951,
                'avgOrderValue' => 'Rp 562.400',
            ],
        ]);
    }
}
