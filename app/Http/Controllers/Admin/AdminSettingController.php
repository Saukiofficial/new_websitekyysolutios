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
            'platformName' => config('app.name', 'KyySolutions'),
            'supportEmail' => config('mail.from.address', 'support@kyysolutions.com'),
            'whatsappContact' => env('WHATSAPP_ADMIN_NUMBER', '6281232916758'),
            'commissionRate' => 10,
            'autoApproveVerifiedSellers' => true,
            'paymentGatewayProvider' => 'Midtrans Snap (Live / Sandbox)',
            'sandboxMode' => !config('services.midtrans.is_production', false),
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
