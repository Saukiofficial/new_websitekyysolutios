<?php

use App\Http\Controllers\Web\LandingPageController;
use App\Http\Controllers\Web\MarketplaceController;
use App\Http\Controllers\Web\ProductController;
use App\Http\Controllers\Web\CheckoutController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminProductController;
use App\Http\Controllers\Admin\AdminOrderController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\AdminSellerController;
use App\Http\Controllers\Admin\AdminCategoryController;
use App\Http\Controllers\Admin\AdminFinancialController;
use App\Http\Controllers\Admin\AdminReviewController;
use App\Http\Controllers\Admin\AdminReportController;
use App\Http\Controllers\Admin\AdminServiceController;
use App\Http\Controllers\Admin\AdminContentController;
use App\Http\Controllers\Admin\AdminNotificationController;
use App\Http\Controllers\Admin\AdminSettingController;
use App\Http\Controllers\Admin\AdminAnalyticsController;
use App\Http\Controllers\Api\TrackingController;
use Illuminate\Support\Facades\Route;

// Public Guest Routes
Route::get('/', LandingPageController::class)->name('home');
Route::get('/marketplace', [MarketplaceController::class, 'index'])->name('marketplace.index');
Route::get('/products/{slug}', [ProductController::class, 'show'])->name('products.show');

// Direct Checkout & Order Routes
Route::get('/checkout/{id?}', [CheckoutController::class, 'index'])->name('checkout.index');
Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');
Route::get('/orders/{orderNumber}', [CheckoutController::class, 'success'])->name('orders.success');

// Lightweight Event & Visitor Tracking API
Route::post('/api/track-event', [TrackingController::class, 'track'])->name('api.track');

// Authentication Routes
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Super Admin Panel Routes (As defined in docs/Ui/superadmin_design.md)
Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
    
    // Products Management & Moderation
    Route::get('/products', [AdminProductController::class, 'index'])->name('products');
    Route::post('/products', [AdminProductController::class, 'store'])->name('products.store');
    Route::patch('/products/{id}/status', [AdminProductController::class, 'updateStatus'])->name('products.status');
    Route::delete('/products/{id}', [AdminProductController::class, 'destroy'])->name('products.destroy');

    // Orders & Transactions Monitoring
    Route::get('/orders', [AdminOrderController::class, 'index'])->name('orders');

    // Users Management
    Route::get('/users', [AdminUserController::class, 'index'])->name('users');
    Route::post('/users', [AdminUserController::class, 'store'])->name('users.store');
    Route::patch('/users/{id}/toggle-status', [AdminUserController::class, 'toggleStatus'])->name('users.toggle');

    // Sellers & Store Verification
    Route::get('/sellers', [AdminSellerController::class, 'index'])->name('sellers');
    Route::patch('/sellers/{id}/verify', [AdminSellerController::class, 'toggleVerification'])->name('sellers.verify');

    // Categories Management
    Route::get('/categories', [AdminCategoryController::class, 'index'])->name('categories');
    Route::post('/categories', [AdminCategoryController::class, 'store'])->name('categories.store');
    Route::delete('/categories/{id}', [AdminCategoryController::class, 'destroy'])->name('categories.destroy');

    // Financial Management (Payments, Commissions, Withdrawals)
    Route::get('/payments', [AdminFinancialController::class, 'payments'])->name('payments');
    Route::get('/commissions', [AdminFinancialController::class, 'commissions'])->name('commissions');
    Route::get('/withdrawals', [AdminFinancialController::class, 'withdrawals'])->name('withdrawals');

    // Marketplace Activity & Analytics Tracking
    Route::get('/analytics', [AdminAnalyticsController::class, 'index'])->name('analytics');

    // Marketplace Feedback & Reports
    Route::get('/reviews', [AdminReviewController::class, 'index'])->name('reviews');
    Route::patch('/reviews/{id}/status', [AdminReviewController::class, 'updateStatus'])->name('reviews.status');
    Route::delete('/reviews/{id}', [AdminReviewController::class, 'destroy'])->name('reviews.destroy');
    Route::get('/reports', [AdminReportController::class, 'index'])->name('reports');

    // Business Services & Content
    Route::get('/services', [AdminServiceController::class, 'index'])->name('services');
    Route::get('/portfolio', [AdminContentController::class, 'portfolio'])->name('portfolio');
    Route::get('/blog', [AdminContentController::class, 'blog'])->name('blog');

    // System Settings & Notifications
    Route::get('/notifications', [AdminNotificationController::class, 'index'])->name('notifications');
    Route::get('/settings', [AdminSettingController::class, 'index'])->name('settings');
    Route::post('/settings', [AdminSettingController::class, 'update'])->name('settings.update');
});
