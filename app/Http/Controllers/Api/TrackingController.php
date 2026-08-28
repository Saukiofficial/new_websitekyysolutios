<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TrackingController extends Controller
{
    /**
     * Record visitor activity or user event.
     */
    public function track(Request $request): JsonResponse
    {
        $eventType = $request->input('event_type', 'pageview');
        $pageUrl = $request->input('page_url') ?: $request->header('Referer');
        $productId = $request->input('product_id');
        $productTitle = $request->input('product_title');

        if ($productId && !$productTitle) {
            $product = Product::find($productId);
            $productTitle = $product?->title;
        }

        $log = ActivityLog::create([
            'session_id' => $request->header('X-Session-ID') ?: ($request->cookie('kyy_session') ?: 'sess_' . rand(1000, 9999)),
            'ip_address' => $request->ip(),
            'event_type' => $eventType,
            'page_url' => $pageUrl ?: '/',
            'product_id' => $productId,
            'product_title' => $productTitle,
            'device' => $this->detectDevice($request->userAgent()),
            'browser' => $this->detectBrowser($request->userAgent()),
            'location' => 'Jakarta, ID',
            'metadata' => $request->input('metadata'),
        ]);

        return response()->json([
            'status' => 'success',
            'tracked' => true,
            'id' => $log->id,
            'event' => $log->event_type,
        ]);
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
