<?php

namespace App\Services\Notification;

use App\Models\Order;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Throwable;

class WhatsAppNotificationService
{
    protected string $provider;
    protected string $apiToken;
    protected bool $isEnabled;

    public function __construct()
    {
        $this->provider = (string) env('WHATSAPP_GATEWAY_PROVIDER', 'fonnte');
        $this->apiToken = (string) env('WHATSAPP_API_TOKEN', '');
        $this->isEnabled = (bool) env('WHATSAPP_BOT_ENABLED', true);
    }

    /**
     * Format phone number to standard international WhatsApp format (e.g. 6281234567890).
     */
    public function formatPhoneNumber(?string $phone): string
    {
        if (empty($phone)) {
            return '';
        }

        // Remove non-numeric characters
        $cleaned = preg_replace('/[^0-9]/', '', $phone);

        // Convert leading 0 to 62
        if (str_starts_with($cleaned, '0')) {
            $cleaned = '62' . substr($cleaned, 1);
        } elseif (str_starts_with($cleaned, '8')) {
            $cleaned = '62' . $cleaned;
        }

        return $cleaned;
    }

    /**
     * Send instant order confirmation message to buyer WhatsApp upon payment settlement.
     */
    public function sendOrderPaidNotification(Order $order): array
    {
        if (!$this->isEnabled || empty($order->customer_phone)) {
            return [
                'success' => false,
                'message' => 'Notifikasi WhatsApp dinonaktifkan atau nomor telepon tidak tersedia.',
            ];
        }

        $phone = $this->formatPhoneNumber($order->customer_phone);
        $firstItem = $order->items->first();
        $productTitle = $firstItem?->product_title_snapshot ?? ($firstItem?->product?->title ?? 'Produk Software');
        $firstAccess = $order->accesses->first();
        $licenseKey = $firstAccess?->license_key ?? 'KYY-LIC-AUTHENTICATED';
        $appUrl = rtrim(config('app.url', 'http://localhost:8000'), '/');

        // Formatted WhatsApp message template
        $message = "🎉 *PEMBAYARAN DITERIMA & LISENSI AKTIF*\n"
            . "Halo *{$order->customer_name}*,\n\n"
            . "Terima kasih atas pesanan Anda di *KyySolutions*. Pembayaran Anda telah kami verifikasi lunas.\n\n"
            . "📦 *Detail Pesanan:*\n"
            . "• No. Ref: `{$order->order_number}`\n"
            . "• Software: *{$productTitle}*\n"
            . "• Total: *Rp " . number_format($order->total, 0, ',', '.') . "*\n\n"
            . "🔑 *Kunci Lisensi Komersial (DRM):*\n"
            . "`{$licenseKey}`\n\n"
            . "📥 *Akses Unduh & Faktur:*\n"
            . "• Dashboard Aset: {$appUrl}/dashboard/my-products\n"
            . "• Unduh Invoice PDF: {$appUrl}/orders/{$order->order_number}/invoice\n\n"
            . "Jika ada pertanyaan atau butuh bantuan instalasi, silakan balas pesan ini.\n\n"
            . "_Salam hangat,_\n"
            . "*Tim KyySolutions Platform*";

        // If no third-party API token is set, log message safely (Development / Mock mode)
        if (empty($this->apiToken) || str_starts_with($this->apiToken, 'YOUR_')) {
            Log::info("WhatsApp Bot Mock Sent to {$phone}:\n" . $message);
            return [
                'success' => true,
                'mode' => 'mock_logged',
                'phone' => $phone,
                'message' => 'Pesan tercatat di sistem log (Mode Simulasi Siap API).',
                'wa_direct_url' => "https://wa.me/{$phone}?text=" . urlencode($message),
            ];
        }

        try {
            // Dispatch to configured Gateway Provider (Default: Fonnte)
            if ($this->provider === 'fonnte') {
                $response = Http::withHeaders([
                    'Authorization' => $this->apiToken,
                ])->post('https://api.fonnte.com/send', [
                    'target' => $phone,
                    'message' => $message,
                    'countryCode' => '62',
                ]);

                return [
                    'success' => $response->successful(),
                    'provider' => 'fonnte',
                    'response' => $response->json(),
                ];
            }

            // Generic / Wablas Provider Dispatch
            $response = Http::withHeaders([
                'Authorization' => $this->apiToken,
            ])->post('https://pati.wablas.com/api/send-message', [
                'phone' => $phone,
                'message' => $message,
            ]);

            return [
                'success' => $response->successful(),
                'provider' => 'wablas',
                'response' => $response->json(),
            ];
        } catch (Throwable $e) {
            Log::error('WhatsApp Bot Notification Failed: ' . $e->getMessage());
            return [
                'success' => false,
                'error' => $e->getMessage(),
            ];
        }
    }
}
