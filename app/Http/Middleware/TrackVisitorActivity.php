<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\ActivityLog;
use App\Models\Product;
use Illuminate\Support\Str;

class TrackVisitorActivity
{
    /**
     * Handle an incoming request and automatically track page visits in real-time.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Only track successful GET web page requests (ignore assets, vite, devtools, internal api)
        if ($request->isMethod('GET') && !$request->is('build/*', 'images/*', '@*', '_inertia/*', 'api/*')) {
            try {
                $path = $request->path();
                $eventType = 'pageview';
                $productId = null;
                $productTitle = null;

                // Detect Product Detail view
                if (str_starts_with($path, 'products/')) {
                    $slug = str_replace('products/', '', $path);
                    $product = Product::where('slug', $slug)->first();
                    if ($product) {
                        $eventType = 'product_view';
                        $productId = $product->id;
                        $productTitle = $product->title;
                    }
                } elseif (str_starts_with($path, 'checkout')) {
                    $eventType = 'checkout_start';
                    $productTitle = 'Halaman Checkout';
                } elseif ($path === 'marketplace') {
                    $productTitle = 'Katalog Marketplace';
                } elseif ($path === '/') {
                    $productTitle = 'Landing Page Beranda';
                } else {
                    $productTitle = 'Halaman ' . ucfirst($path);
                }

                // Ignore Admin pages from public visitor analytics
                if (!str_starts_with($path, 'admin') && !str_starts_with($path, 'login')) {
                    $sessionId = $request->session()->getId() ?: ($request->cookie('kyy_session') ?: 'guest_' . Str::random(10));

                    ActivityLog::create([
                        'session_id' => $sessionId,
                        'ip_address' => $request->ip() ?: '127.0.0.1',
                        'event_type' => $eventType,
                        'page_url' => '/' . ltrim($path, '/'),
                        'product_id' => $productId,
                        'product_title' => $productTitle,
                        'device' => $this->detectDevice($request->userAgent()),
                        'browser' => $this->detectBrowser($request->userAgent()),
                        'location' => 'Indonesia (Local)',
                    ]);
                }
            } catch (\Throwable $e) {
                // Fail silently to never break visitor browsing
            }
        }

        return $response;
    }

    private function detectDevice(?string $ua): string
    {
        if (!$ua) return 'Desktop';
        if (preg_match('/(iPhone|Android.*Mobile|Windows Phone)/i', $ua)) return 'Mobile';
        if (preg_match('/(iPad|Tablet|Android(?!.*Mobile))/i', $ua)) return 'Tablet';
        return 'Desktop';
    }

    private function detectBrowser(?string $ua): string
    {
        if (!$ua) return 'Chrome';
        if (str_contains($ua, 'Edg')) return 'Edge';
        if (str_contains($ua, 'Chrome')) return 'Chrome';
        if (str_contains($ua, 'Safari')) return 'Safari';
        if (str_contains($ua, 'Firefox')) return 'Firefox';
        return 'Browser';
    }
}
