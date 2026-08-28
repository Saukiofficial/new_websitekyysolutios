<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ActivityLog;
use App\Models\Product;
use Illuminate\Support\Str;

class ActivityLogSeeder extends Seeder
{
    public function run(): void
    {
        $products = Product::all();
        $cities = ['Jakarta, ID', 'Surabaya, ID', 'Bandung, ID', 'Medan, ID', 'Yogyakarta, ID', 'Semarang, ID', 'Bali, ID', 'Singapore, SG'];
        $browsers = ['Chrome 124', 'Safari 17', 'Edge 124', 'Firefox 125'];
        $devices = ['Desktop Windows', 'Desktop MacOS', 'Mobile iPhone', 'Mobile Android'];

        // Seed 40 realistic recent activity logs
        for ($i = 0; $i < 40; $i++) {
            $product = $products->random();
            $eventTypes = ['pageview', 'product_view', 'cart_click', 'checkout_start', 'purchase', 'demo_click'];
            $event = $eventTypes[array_rand($eventTypes)];

            ActivityLog::create([
                'session_id' => Str::random(16),
                'ip_address' => '114.124.' . rand(10, 255) . '.' . rand(1, 254),
                'event_type' => $event,
                'page_url' => $event === 'pageview' ? '/' : "/products/{$product->slug}",
                'product_id' => $product->id,
                'product_title' => $product->title,
                'device' => $devices[array_rand($devices)],
                'browser' => $browsers[array_rand($browsers)],
                'location' => $cities[array_rand($cities)],
                'created_at' => now()->subMinutes(rand(1, 1440)),
            ]);
        }
    }
}
