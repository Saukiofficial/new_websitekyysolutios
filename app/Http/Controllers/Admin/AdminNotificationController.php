<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminNotificationController extends Controller
{
    /**
     * Display system notifications and audit logs.
     */
    public function index(): Response
    {
        $notifications = [
            [
                'id' => 1,
                'type' => 'order',
                'title' => 'Pembayaran Pesanan Baru Berhasil',
                'description' => 'Invoice KYY-ORD-20260828-98421 telah dibayar lunas via QRIS (Rp 650.000).',
                'time' => '10 menit yang lalu',
                'unread' => true,
            ],
            [
                'id' => 2,
                'type' => 'product',
                'title' => 'Produk Baru Menunggu Moderasi',
                'description' => 'Seller "PixelStudio" mengajukan produk "Healthcare Clinic & Pharmacy SaaS".',
                'time' => '35 menit yang lalu',
                'unread' => true,
            ],
            [
                'id' => 3,
                'type' => 'withdrawal',
                'title' => 'Permohonan Payout Seller Baru',
                'description' => 'CodeCraft Studio mengajukan withdrawal sebesar Rp 4.500.000 ke rekening BCA.',
                'time' => '2 jam yang lalu',
                'unread' => false,
            ],
            [
                'id' => 4,
                'type' => 'security',
                'title' => 'Login Super Admin Berhasil',
                'description' => 'Sesi login Super Admin terautentikasi dari IP 127.0.0.1 (Laragon Local).',
                'time' => '4 jam yang lalu',
                'unread' => false,
            ],
        ];

        return Inertia::render('Admin/Notifications/Index', [
            'notifications' => $notifications,
        ]);
    }
}
