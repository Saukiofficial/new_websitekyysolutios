<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Services\Payment\MidtransService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PaymentWebhookController extends Controller
{
    protected MidtransService $midtransService;

    public function __construct(MidtransService $midtransService)
    {
        $this->midtransService = $midtransService;
    }

    /**
     * Handle incoming Midtrans HTTP Webhook Notification.
     */
    public function handleMidtrans(Request $request): JsonResponse
    {
        $payload = $request->all();

        Log::info('Midtrans Webhook Received', [
            'order_id' => $payload['order_id'] ?? null,
            'status' => $payload['transaction_status'] ?? null,
        ]);

        $orderId = (string) ($payload['order_id'] ?? '');
        $statusCode = (string) ($payload['status_code'] ?? '');
        $grossAmount = (string) ($payload['gross_amount'] ?? '');
        $signatureKey = (string) ($payload['signature_key'] ?? '');
        $transactionStatus = (string) ($payload['transaction_status'] ?? '');
        $fraudStatus = (string) ($payload['fraud_status'] ?? 'accept');

        // 1. Verify Signature Integrity
        if (!$this->midtransService->verifySignature($orderId, $statusCode, $grossAmount, $signatureKey)) {
            Log::warning('Midtrans Signature Mismatch', ['order_id' => $orderId]);
            return response()->json(['status' => 'error', 'message' => 'Invalid signature hash'], 403);
        }

        // 2. Locate Order in MySQL
        $order = Order::with(['items.product'])->where('order_number', $orderId)->first();

        if (!$order) {
            Log::error('Midtrans Webhook: Order Not Found', ['order_id' => $orderId]);
            return response()->json(['status' => 'error', 'message' => 'Order not found in database'], 404);
        }

        // 3. Process Transaction Status
        if ($transactionStatus === 'capture') {
            if ($fraudStatus === 'accept') {
                $this->midtransService->processOrderSettlement($order, $payload);
            }
        } elseif ($transactionStatus === 'settlement') {
            $this->midtransService->processOrderSettlement($order, $payload);
        } elseif ($transactionStatus === 'pending') {
            $order->status = 'pending';
            $order->save();
        } elseif (in_array($transactionStatus, ['deny', 'expire', 'cancel', 'failure'], true)) {
            $order->status = ($transactionStatus === 'expire') ? 'expired' : 'failed';
            $order->save();
        }

        return response()->json([
            'status' => 'success',
            'order_number' => $order->order_number,
            'order_status' => $order->status,
        ]);
    }
}
