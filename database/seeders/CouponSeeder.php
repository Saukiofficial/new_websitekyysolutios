<?php

namespace Database\Seeders;

use App\Models\Coupon;
use Illuminate\Database\Seeder;

class CouponSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $coupons = [
            [
                'code' => 'KYYLAUNCH',
                'name' => 'Spesial Peluncuran KyySolutions 20%',
                'description' => 'Diskon 20% untuk semua produk digital dan source code.',
                'type' => 'percent',
                'value' => 20,
                'min_order_amount' => 0,
                'max_discount_amount' => 250000,
                'usage_limit' => 100,
                'used_count' => 8,
                'is_active' => true,
                'start_date' => now()->subDays(5),
                'end_date' => now()->addMonths(3),
            ],
            [
                'code' => 'HEMAT50K',
                'name' => 'Voucher Potongan Langsung Rp 50.000',
                'description' => 'Potongan langsung Rp 50.000 dengan minimal transaksi Rp 300.000.',
                'type' => 'fixed',
                'value' => 50000,
                'min_order_amount' => 300000,
                'max_discount_amount' => null,
                'usage_limit' => 50,
                'used_count' => 3,
                'is_active' => true,
                'start_date' => now()->subDays(2),
                'end_date' => now()->addMonths(2),
            ],
            [
                'code' => 'SAUKISPECIAL',
                'name' => 'Founder Special Promo 30%',
                'description' => 'Diskon 30% spesial persembahan Sauki Annaim untuk developer muda.',
                'type' => 'percent',
                'value' => 30,
                'min_order_amount' => 400000,
                'max_discount_amount' => 350000,
                'usage_limit' => 25,
                'used_count' => 5,
                'is_active' => true,
                'start_date' => now()->subDays(1),
                'end_date' => now()->addMonths(1),
            ],
        ];

        foreach ($coupons as $c) {
            Coupon::updateOrCreate(['code' => $c['code']], $c);
        }
    }
}
