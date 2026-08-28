<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminServiceController extends Controller
{
    /**
     * Display service requests and custom software inquiries.
     */
    public function index(Request $request): Response
    {
        $requests = [
            ['id' => 'REQ-881', 'client' => 'PT. Maju Bersama', 'service' => 'Company Website & CMS', 'budget' => 'Rp 15.000.000 - Rp 30.000.000', 'timeline' => '1 - 2 Bulan', 'status' => 'Baru', 'phone' => '+62 812-3456-7890', 'date' => 'Hari ini, 11:20'],
            ['id' => 'REQ-880', 'client' => 'Fashion Store ID', 'service' => 'E-Commerce Mobile App Flutter', 'budget' => 'Rp 30.000.000 - Rp 50.000.000', 'timeline' => '2 - 3 Bulan', 'status' => 'Proses', 'phone' => '+62 813-8899-2211', 'date' => 'Kemarin, 16:45'],
            ['id' => 'REQ-879', 'client' => 'Finance Corp', 'service' => 'Custom Dashboard Development', 'budget' => 'Rp 50.000.000+', 'timeline' => '3+ Bulan', 'status' => 'Review', 'phone' => '+62 856-7788-9900', 'date' => '25 Agu 2026'],
            ['id' => 'REQ-878', 'client' => 'Logistics Express ID', 'service' => 'API Integration & Webhook Gateway', 'budget' => 'Rp 15.000.000 - Rp 30.000.000', 'timeline' => '1 Bulan', 'status' => 'Baru', 'phone' => '+62 878-1122-3344', 'date' => '24 Agu 2026'],
            ['id' => 'REQ-877', 'client' => 'StartupX Nusantara', 'service' => 'UI/UX Design for Multi-Tenant SaaS', 'budget' => 'Rp 10.000.000 - Rp 20.000.000', 'timeline' => '3 Minggu', 'status' => 'Selesai', 'phone' => '+62 811-9988-7766', 'date' => '20 Agu 2026'],
        ];

        return Inertia::render('Admin/Services/Index', [
            'requests' => $requests,
        ]);
    }
}
