<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CouponController extends Controller
{
    /**
     * Validate coupon code for a given subtotal.
     */
    public function validateCoupon(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'code' => 'required|string|max:50',
            'subtotal' => 'required|numeric|min:0',
        ]);

        $code = strtoupper(trim($validated['code']));
        $subtotal = (int) $validated['subtotal'];

        $coupon = Coupon::where('code', $code)->first();

        if (!$coupon) {
            return response()->json([
                'status' => 'error',
                'valid' => false,
                'message' => 'Kode kupon promo tidak ditemukan atau salah.',
            ], 404);
        }

        $check = $coupon->validateForAmount($subtotal);
        if (!$check['valid']) {
            return response()->json([
                'status' => 'error',
                'valid' => false,
                'message' => $check['message'],
            ], 422);
        }

        $discount = $coupon->calculateDiscount($subtotal);
        $finalTotal = max(0, $subtotal - $discount);

        return response()->json([
            'status' => 'success',
            'valid' => true,
            'message' => 'Kode kupon promo berhasil diterapkan!',
            'coupon' => [
                'id' => $coupon->id,
                'code' => $coupon->code,
                'name' => $coupon->name,
                'type' => $coupon->type,
                'value' => $coupon->value,
                'discountLabel' => $coupon->discount_label,
                'discountAmount' => $discount,
                'discountFormatted' => 'Rp ' . number_format($discount, 0, ',', '.'),
                'finalTotal' => $finalTotal,
                'finalTotalFormatted' => 'Rp ' . number_format($finalTotal, 0, ',', '.'),
            ],
        ]);
    }
}
