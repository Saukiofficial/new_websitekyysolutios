<?php

require __DIR__ . '/../vendor/autoload.php';

$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$routes = [
    // Public routes
    'GET /' => '/',
    'GET /marketplace' => '/marketplace',
    'GET /checkout' => '/checkout',
    'GET /stores/kyysolutions-official' => '/stores/kyysolutions-official',
    'GET /products/saas-multi-tenant-starter' => '/products/saas-multi-tenant-starter',
    
    // Buyer Auth routes
    'GET /login' => '/login',
    'GET /register' => '/register',
    'GET /forgot-password' => '/forgot-password',
    'GET /auth/google' => '/auth/google',

    // Seller Auth routes
    'GET /seller/login' => '/seller/login',
    'GET /seller/register' => '/seller/register',
    'GET /seller/auth/google' => '/seller/auth/google',
    
    // Super Admin Auth routes
    'GET /admin/login' => '/admin/login',

    // Buyer Hub
    'GET /dashboard/my-products' => '/dashboard/my-products',
    'GET /dashboard/orders' => '/dashboard/orders',
    
    // Seller Studio
    'GET /seller/dashboard' => '/seller/dashboard',
    'GET /seller/products' => '/seller/products',
    'GET /seller/withdrawals' => '/seller/withdrawals',
    'GET /seller/settings' => '/seller/settings',
    
    // Super Admin
    'GET /admin/dashboard' => '/admin/dashboard',
    'GET /admin/products' => '/admin/products',
    'GET /admin/orders' => '/admin/orders',
    'GET /admin/users' => '/admin/users',
    'GET /admin/sellers' => '/admin/sellers',
    'GET /admin/categories' => '/admin/categories',
    'GET /admin/payments' => '/admin/payments',
    'GET /admin/commissions' => '/admin/commissions',
    'GET /admin/withdrawals' => '/admin/withdrawals',
    'GET /admin/analytics' => '/admin/analytics',
    'GET /admin/reviews' => '/admin/reviews',
    'GET /admin/reports' => '/admin/reports',
    'GET /admin/services' => '/admin/services',
    'GET /admin/portfolio' => '/admin/portfolio',
    'GET /admin/blog' => '/admin/blog',
    'GET /admin/notifications' => '/admin/notifications',
    'GET /admin/settings' => '/admin/settings',
];

echo "===== AUDITING SEPARATED AUTH & PLATFORM ROUTES =====\n\n";

$passCount = 0;
$failCount = 0;

foreach ($routes as $label => $uri) {
    $request = Illuminate\Http\Request::create($uri, 'GET');
    $response = $kernel->handle($request);
    $status = $response->getStatusCode();
    
    if ($status === 200 || $status === 302) {
        echo "✅ [{$status}] {$label}\n";
        $passCount++;
    } else {
        echo "❌ [{$status}] {$label}\n";
        $failCount++;
    }
}

echo "\nSummary: {$passCount} Passed, {$failCount} Failed.\n";
