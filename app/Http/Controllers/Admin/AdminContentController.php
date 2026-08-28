<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminContentController extends Controller
{
    /**
     * Display portfolio projects.
     */
    public function portfolio(): Response
    {
        $items = [
            ['id' => 1, 'title' => 'Core Banking Microservices', 'client' => 'PT. Bank Nusantara', 'category' => 'Fintech', 'status' => 'Published', 'date' => 'Agu 2026'],
            ['id' => 2, 'title' => 'Automated Warehouse Dispatch', 'client' => 'Logistik Cepat ID', 'category' => 'Supply Chain', 'status' => 'Published', 'date' => 'Jul 2026'],
            ['id' => 3, 'title' => 'Omnichannel POS Ecosystem', 'client' => 'Retail Grand Store', 'category' => 'E-Commerce', 'status' => 'Published', 'date' => 'Jun 2026'],
        ];

        return Inertia::render('Admin/Content/Index', [
            'type' => 'portfolio',
            'title' => 'Manajemen Portofolio Proyek Klien',
            'items' => $items,
        ]);
    }

    /**
     * Display blog articles.
     */
    public function blog(): Response
    {
        $items = [
            ['id' => 1, 'title' => 'Panduan Membangun Multi-Tenant Architecture di Laravel & React', 'author' => 'KyySolutions Team', 'views' => '2.4K', 'status' => 'Published', 'date' => '24 Agu 2026'],
            ['id' => 2, 'title' => 'Integrasi Direct Payment Gateway QRIS Tanpa Third Party Aggregator', 'author' => 'Engineering Lead', 'views' => '1.8K', 'status' => 'Published', 'date' => '18 Agu 2026'],
            ['id' => 3, 'title' => 'Optimasi Performa Fullstack Next.js & Inertia SSR untuk Enterprise', 'author' => 'DevOps Team', 'views' => '3.1K', 'status' => 'Published', 'date' => '10 Agu 2026'],
        ];

        return Inertia::render('Admin/Content/Index', [
            'type' => 'blog',
            'title' => 'Manajemen Artikel Blog & Rilis',
            'items' => $items,
        ]);
    }
}
