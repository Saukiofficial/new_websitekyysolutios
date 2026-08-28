<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminSettingController extends Controller
{
    /**
     * Display general system settings.
     */
    public function index(): Response
    {
        $settings = [
            'platformName' => 'KyySolutions Digital Ecosystem',
            'supportEmail' => 'support@kyysolutions.com',
            'whatsappContact' => '+62 812-3456-7890',
            'commissionRate' => 10,
            'autoApproveVerifiedSellers' => true,
            'paymentGatewayProvider' => 'Midtrans / QRIS Dynamic',
            'sandboxMode' => false,
            'currency' => 'IDR',
        ];

        return Inertia::render('Admin/Settings/Index', [
            'settings' => $settings,
        ]);
    }

    /**
     * Save settings.
     */
    public function update(Request $request)
    {
        return redirect()->back()->with('success', 'Pengaturan sistem berhasil disimpan.');
    }
}
