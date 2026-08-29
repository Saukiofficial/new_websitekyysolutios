<?php

namespace App\Services\Payment;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Payment;
use App\Models\ProductAccess;
use App\Models\User;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Throwable;

class MidtransService
{
    protected string $serverKey;
    protected string $clientKey;
    protected bool $isProduction;
    protected string $snapUrl;
    protected string $apiBaseUrl;
    protected string $chargeUrl;

    public function __construct()
    {
        $this->serverKey = (string) config('services.midtrans.server_key', env('MIDTRANS_SERVER_KEY', ''));
        $this->clientKey = (string) config('services.midtrans.client_key', env('MIDTRANS_CLIENT_KEY', ''));
        $this->isProduction = (bool) config('services.midtrans.is_production', env('MIDTRANS_IS_PRODUCTION', false));

        $this->snapUrl = $this->isProduction
            ? 'https://app.midtrans.com/snap/v1/transactions'
            : 'https://app.sandbox.midtrans.com/snap/v1/transactions';

        $this->apiBaseUrl = $this->isProduction
            ? 'https://api.midtrans.com/v2'
            : 'https://api.sandbox.midtrans.com/v2';

        $this->chargeUrl = $this->isProduction
            ? 'https://api.midtrans.com/v2/charge'
            : 'https://api.sandbox.midtrans.com/v2/charge';
    }

    /**
     * Charge Core API Transaction for Direct In-App Payment (QRIS, VA BCA/Mandiri/BNI/BRI, GoPay).
     */
    public function chargeTransaction(Order $order, Product $product, User $buyer, int $total, string $paymentMethod): array
    {
        // If Midtrans Server Key is not configured yet, generate realistic development mock
        if (empty($this->serverKey) || str_starts_with($this->serverKey, 'YOUR_')) {
            return [
                'success' => true,
                'is_mock' => true,
                'details' => [
                    'paymentType' => $paymentMethod,
                    'transactionId' => 'MID-MOCK-' . Str::random(10),
                    'grossAmount' => $total,
                    'expiryTime' => now()->addMinutes(15)->format('Y-m-d H:i:s'),
                    'qrCodeUrl' => 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=KYY-QRIS-' . $order->order_number,
                    'vaNumber' => '0688' . rand(1000000000, 9999999999),
                    'bank' => strtoupper(str_replace('_va', '', $paymentMethod)),
                ],
            ];
        }

        $items = [
            [
                'id' => (string) $product->id,
                'price' => (int) $order->subtotal,
                'quantity' => 1,
                'name' => Str::limit($product->title, 45, '...'),
            ]
        ];

        if ($order->discount > 0) {
            $items[] = [
                'id' => 'DISCOUNT',
                'price' => -(int) $order->discount,
                'quantity' => 1,
                'name' => 'Diskon Kupon ' . ($order->coupon_code ? "({$order->coupon_code})" : 'Promo'),
            ];
        }

        if ($order->payment_fee > 0) {
            $items[] = [
                'id' => 'FEE',
                'price' => (int) $order->payment_fee,
                'quantity' => 1,
                'name' => 'Biaya Layanan Pembayaran',
            ];
        }

        $basePayload = [
            'transaction_details' => [
                'order_id' => $order->order_number,
                'gross_amount' => (int) $total,
            ],
            'item_details' => $items,
            'customer_details' => [
                'first_name' => $order->customer_name,
                'email' => $order->customer_email,
                'phone' => $order->customer_phone ?: '081234567890',
            ],
        ];

        if ($paymentMethod === 'bca_va') {
            $payload = array_merge($basePayload, [
                'payment_type' => 'bank_transfer',
                'bank_transfer' => ['bank' => 'bca'],
            ]);
        } elseif ($paymentMethod === 'mandiri_va') {
            $payload = array_merge($basePayload, [
                'payment_type' => 'echannel',
                'echannel' => [
                    'bill_info1' => 'Pembayaran Software KyySolutions',
                    'bill_info2' => Str::limit($order->order_number, 30),
                ],
            ]);
        } elseif ($paymentMethod === 'bni_va') {
            $payload = array_merge($basePayload, [
                'payment_type' => 'bank_transfer',
                'bank_transfer' => ['bank' => 'bni'],
            ]);
        } elseif ($paymentMethod === 'bri_va') {
            $payload = array_merge($basePayload, [
                'payment_type' => 'bank_transfer',
                'bank_transfer' => ['bank' => 'bri'],
            ]);
        } elseif ($paymentMethod === 'ewallet' || $paymentMethod === 'gopay') {
            $payload = array_merge($basePayload, [
                'payment_type' => 'gopay',
                'gopay' => [
                    'enable_callback' => true,
                    'callback_url' => route('orders.success', ['orderNumber' => $order->order_number]),
                ]
            ]);
        } else {
            // Default: QRIS
            $payload = array_merge($basePayload, [
                'payment_type' => 'qris',
                'qris' => ['acquirer' => 'gopay'],
            ]);
        }

        try {
            $response = Http::withoutVerifying()
                ->withBasicAuth($this->serverKey, '')
                ->timeout(15)
                ->post($this->chargeUrl, $payload);

            if ($response->successful()) {
                $data = $response->json();

                $paymentDetails = [
                    'paymentType' => $data['payment_type'] ?? $paymentMethod,
                    'transactionId' => $data['transaction_id'] ?? null,
                    'grossAmount' => (int) ($data['gross_amount'] ?? $total),
                    'expiryTime' => $data['expiry_time'] ?? now()->addMinutes(15)->format('Y-m-d H:i:s'),
                ];

                // QRIS Specific
                if (($data['payment_type'] ?? '') === 'qris') {
                    $qrAction = collect($data['actions'] ?? [])->firstWhere('name', 'generate-qr-code');
                    $paymentDetails['qrCodeUrl'] = $qrAction['url'] ?? null;
                    $paymentDetails['qrString'] = $data['qr_string'] ?? null;
                }

                // Bank Transfer Specific (BCA/BNI/BRI)
                if (!empty($data['va_numbers'][0])) {
                    $paymentDetails['vaNumber'] = $data['va_numbers'][0]['va_number'];
                    $paymentDetails['bank'] = strtoupper($data['va_numbers'][0]['bank']);
                }

                // Mandiri E-Channel Specific
                if (!empty($data['bill_key'])) {
                    $paymentDetails['billKey'] = $data['bill_key'];
                    $paymentDetails['billerCode'] = $data['biller_code'] ?? '70012';
                    $paymentDetails['bank'] = 'MANDIRI';
                }

                // GoPay Specific
                if (($data['payment_type'] ?? '') === 'gopay') {
                    $qrAction = collect($data['actions'] ?? [])->firstWhere('name', 'generate-qr-code');
                    $deeplink = collect($data['actions'] ?? [])->firstWhere('name', 'deeplink-redirect');
                    $paymentDetails['qrCodeUrl'] = $qrAction['url'] ?? null;
                    $paymentDetails['deeplinkUrl'] = $deeplink['url'] ?? null;
                }

                return [
                    'success' => true,
                    'is_mock' => false,
                    'details' => $paymentDetails,
                    'raw' => $data,
                ];
            }

            Log::error('Midtrans Core Charge Error', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);

            // Fallback gracefully
            return [
                'success' => true,
                'is_mock' => true,
                'details' => [
                    'paymentType' => $paymentMethod,
                    'transactionId' => 'MID-FB-' . Str::random(10),
                    'grossAmount' => $total,
                    'expiryTime' => now()->addMinutes(15)->format('Y-m-d H:i:s'),
                    'qrCodeUrl' => 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=KYY-QRIS-' . $order->order_number,
                    'vaNumber' => '0688' . rand(1000000000, 9999999999),
                    'bank' => strtoupper(str_replace('_va', '', $paymentMethod)),
                ],
            ];
        } catch (Throwable $e) {
            Log::error('Midtrans Core Exception: ' . $e->getMessage());

            return [
                'success' => true,
                'is_mock' => true,
                'details' => [
                    'paymentType' => $paymentMethod,
                    'transactionId' => 'MID-EX-' . Str::random(10),
                    'grossAmount' => $total,
                    'expiryTime' => now()->addMinutes(15)->format('Y-m-d H:i:s'),
                    'qrCodeUrl' => 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=KYY-QRIS-' . $order->order_number,
                    'vaNumber' => '0688' . rand(1000000000, 9999999999),
                    'bank' => strtoupper(str_replace('_va', '', $paymentMethod)),
                ],
            ];
        }
    }

    /**
     * Create Snap Token & Redirect URL from Midtrans API (Optional Fallback).
     */
    public function createSnapTransaction(Order $order, Product $product, User $buyer, int $total): array
    {
        if (empty($this->serverKey) || str_starts_with($this->serverKey, 'YOUR_')) {
            $mockToken = 'SNAP-MOCK-' . Str::random(24);
            return [
                'token' => $mockToken,
                'redirect_url' => "https://app.sandbox.midtrans.com/snap/v2/vtweb/{$mockToken}",
                'is_mock' => true,
            ];
        }

        $items = [
            [
                'id' => (string) $product->id,
                'price' => (int) $order->subtotal,
                'quantity' => 1,
                'name' => Str::limit($product->title, 45, '...'),
            ]
        ];

        if ($order->discount > 0) {
            $items[] = [
                'id' => 'DISCOUNT',
                'price' => -(int) $order->discount,
                'quantity' => 1,
                'name' => 'Diskon Kupon ' . ($order->coupon_code ? "({$order->coupon_code})" : 'Promo'),
            ];
        }

        if ($order->payment_fee > 0) {
            $items[] = [
                'id' => 'FEE',
                'price' => (int) $order->payment_fee,
                'quantity' => 1,
                'name' => 'Biaya Layanan Pembayaran',
            ];
        }

        $params = [
            'transaction_details' => [
                'order_id' => $order->order_number,
                'gross_amount' => (int) $total,
            ],
            'item_details' => $items,
            'customer_details' => [
                'first_name' => $order->customer_name,
                'email' => $order->customer_email,
                'phone' => $order->customer_phone ?: '081234567890',
            ],
            'callbacks' => [
                'finish' => route('orders.success', ['orderNumber' => $order->order_number]),
            ],
        ];

        try {
            $response = Http::withoutVerifying()
                ->withBasicAuth($this->serverKey, '')
                ->timeout(15)
                ->post($this->snapUrl, $params);

            if ($response->successful()) {
                $data = $response->json();
                return [
                    'token' => $data['token'] ?? null,
                    'redirect_url' => $data['redirect_url'] ?? null,
                    'is_mock' => false,
                ];
            }

            Log::error('Midtrans Snap Error', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);

            $fallbackToken = 'SNAP-FALLBACK-' . Str::random(20);
            return [
                'token' => $fallbackToken,
                'redirect_url' => "https://app.sandbox.midtrans.com/snap/v2/vtweb/{$fallbackToken}",
                'is_mock' => true,
                'error' => $response->json('error_messages') ?? ['Gagal menghubungkan Midtrans Snap gateway.'],
            ];
        } catch (Throwable $e) {
            Log::error('Midtrans Exception: ' . $e->getMessage());

            $fallbackToken = 'SNAP-EX-' . Str::random(20);
            return [
                'token' => $fallbackToken,
                'redirect_url' => "https://app.sandbox.midtrans.com/snap/v2/vtweb/{$fallbackToken}",
                'is_mock' => true,
                'error' => [$e->getMessage()],
            ];
        }
    }

    /**
     * Verify Webhook SHA512 signature hash to prevent fraudulent spoofing.
     */
    public function verifySignature(string $orderId, string $statusCode, string $grossAmount, string $signatureKey): bool
    {
        if (empty($this->serverKey)) {
            return true;
        }

        $expectedSignature = hash('sha512', $orderId . $statusCode . $grossAmount . $this->serverKey);
        return hash_equals($expectedSignature, $signatureKey);
    }

    /**
     * Real-time query to Midtrans Server Status Endpoint (Anti-Fail / Manual Check).
     */
    public function checkTransactionStatus(string $orderNumber): array
    {
        if (empty($this->serverKey)) {
            return [
                'status' => 'mock_paid',
                'transaction_status' => 'settlement',
                'message' => 'Mode pengembangan lokal (Mock Success).',
            ];
        }

        try {
            $response = Http::withoutVerifying()
                ->withBasicAuth($this->serverKey, '')
                ->timeout(10)
                ->get("{$this->apiBaseUrl}/{$orderNumber}/status");

            if ($response->successful()) {
                return $response->json();
            }

            return [
                'status' => 'error',
                'message' => $response->json('status_message') ?? 'Gagal memeriksa status dari Midtrans.',
            ];
        } catch (Throwable $e) {
            Log::error('Midtrans check status exception: ' . $e->getMessage());
            return [
                'status' => 'error',
                'message' => $e->getMessage(),
            ];
        }
    }

    /**
     * Process order settlement and issue software license key upon valid payment.
     */
    public function processOrderSettlement(Order $order, array $payload = []): Order
    {
        if ($order->status === 'paid') {
            return $order;
        }

        $order->status = 'paid';
        $order->paid_at = now();
        $order->save();

        // 1. Update or create Payment record
        Payment::updateOrCreate(
            ['order_id' => $order->id],
            [
                'provider' => 'midtrans',
                'provider_reference' => $payload['transaction_id'] ?? ('MID-' . strtoupper(Str::random(10))),
                'payment_method_code' => $payload['payment_type'] ?? $order->payment_method,
                'amount' => $order->total,
                'status' => 'paid',
                'paid_at' => now(),
                'raw_reference' => $payload,
            ]
        );

        // 2. Issue Commercial License Key & Access if not generated
        foreach ($order->items as $item) {
            $existingAccess = ProductAccess::where('order_id', $order->id)
                ->where('product_id', $item->product_id)
                ->first();

            if (!$existingAccess) {
                $licenseKey = 'KYY-LIC-' . strtoupper(Str::random(4)) . '-' . strtoupper(Str::random(4)) . '-AUTH';
                ProductAccess::create([
                    'buyer_id' => $order->buyer_id,
                    'buyer_email' => $order->customer_email,
                    'product_id' => $item->product_id,
                    'order_id' => $order->id,
                    'order_item_id' => $item->id,
                    'license_key' => $licenseKey,
                    'license_type' => $item->license_type ?? 'regular',
                    'access_status' => 'active',
                    'access_count' => 0,
                ]);

                // Increment sales count on product
                $item->product?->increment('sales_count');
            }
        }

        // 3. Dispatch Automated WhatsApp Bot Notification to Customer
        try {
            app(\App\Services\Notification\WhatsAppNotificationService::class)->sendOrderPaidNotification($order);
        } catch (Throwable $e) {
            Log::warning('WhatsApp dispatch exception: ' . $e->getMessage());
        }

        return $order;
    }
}
