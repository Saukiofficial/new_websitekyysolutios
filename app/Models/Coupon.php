<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'name',
        'description',
        'type',
        'value',
        'min_order_amount',
        'max_discount_amount',
        'usage_limit',
        'used_count',
        'is_active',
        'start_date',
        'end_date',
    ];

    protected $casts = [
        'value' => 'integer',
        'min_order_amount' => 'integer',
        'max_discount_amount' => 'integer',
        'usage_limit' => 'integer',
        'used_count' => 'integer',
        'is_active' => 'boolean',
        'start_date' => 'datetime',
        'end_date' => 'datetime',
    ];

    /**
     * Validate if the coupon is currently valid for a given order amount.
     */
    public function validateForAmount(int $subtotal): array
    {
        if (!$this->is_active) {
            return ['valid' => false, 'message' => 'Kode promo ini sudah tidak aktif.'];
        }

        if ($this->start_date && now()->lt($this->start_date)) {
            return ['valid' => false, 'message' => 'Kode promo ini belum dapat digunakan.'];
        }

        if ($this->end_date && now()->gt($this->end_date)) {
            return ['valid' => false, 'message' => 'Masa berlaku kode promo ini telah berakhir.'];
        }

        if ($this->usage_limit !== null && $this->used_count >= $this->usage_limit) {
            return ['valid' => false, 'message' => 'Kuota penggunaan kode promo ini telah habis.'];
        }

        if ($this->min_order_amount > 0 && $subtotal < $this->min_order_amount) {
            $formattedMin = 'Rp ' . number_format($this->min_order_amount, 0, ',', '.');
            return ['valid' => false, 'message' => "Minimal pembelian untuk promo ini adalah {$formattedMin}."];
        }

        return ['valid' => true, 'message' => 'Kode promo berhasil digunakan.'];
    }

    /**
     * Calculate discount amount given a subtotal.
     */
    public function calculateDiscount(int $subtotal): int
    {
        if ($this->type === 'percent') {
            $discount = (int) round(($subtotal * $this->value) / 100);
            if ($this->max_discount_amount !== null && $this->max_discount_amount > 0) {
                $discount = min($discount, (int) $this->max_discount_amount);
            }
            return min($discount, $subtotal);
        }

        // Fixed nominal discount
        return min((int) $this->value, $subtotal);
    }

    /**
     * Get human-readable discount badge label (e.g. "Diskon 20%" or "Potongan Rp 50.000").
     */
    public function getDiscountLabelAttribute(): string
    {
        if ($this->type === 'percent') {
            return "Diskon {$this->value}%";
        }
        return 'Potongan Rp ' . number_format($this->value, 0, ',', '.');
    }
}
