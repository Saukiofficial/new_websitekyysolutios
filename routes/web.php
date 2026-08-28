<?php

use App\Http\Controllers\Web\LandingPageController;
use App\Http\Controllers\Web\MarketplaceController;
use App\Http\Controllers\Web\ProductController;
use App\Http\Controllers\Web\ServiceController;
use App\Http\Controllers\Web\PortfolioController;
use App\Http\Controllers\Web\BlogController;
use App\Http\Controllers\Web\CheckoutController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\SellerAuthController;
use App\Http\Controllers\Auth\AdminAuthController;
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
use App\Http\Controllers\Admin\AdminBlogController;
use App\Http\Controllers\Admin\AdminPortfolioController;
use App\Http\Controllers\Admin\AdminNotificationController;
use App\Http\Controllers\Admin\AdminSettingController;
use App\Http\Controllers\Admin\AdminAnalyticsController;
use App\Http\Controllers\User\UserDashboardController;
use App\Http\Controllers\Seller\SellerDashboardController;
use App\Http\Controllers\Seller\SellerProductController;
use App\Http\Controllers\Seller\SellerWithdrawalController;
use App\Http\Controllers\Seller\SellerStoreController;
use App\Http\Controllers\Api\TrackingController;
use Illuminate\Support\Facades\Route;

// Public Guest Routes
Route::get('/', LandingPageController::class)->name('home');
Route::get('/services', [ServiceController::class, 'index'])->name('services.index');
Route::get('/portfolio', [PortfolioController::class, 'index'])->name('portfolio.index');
Route::get('/portfolio/{slug}', [PortfolioController::class, 'show'])->name('portfolio.show');
Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');
Route::get('/marketplace', [MarketplaceController::class, 'index'])->name('marketplace.index');
Route::get('/products/{slug}', [ProductController::class, 'show'])->name('products.show');
Route::get('/stores/{slug}', [SellerStoreController::class, 'showPublic'])->name('stores.show');

// Direct Checkout & Order Routes
Route::get('/checkout/{id?}', [CheckoutController::class, 'index'])->name('checkout.index');
Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');
Route::get('/orders/{orderNumber}', [CheckoutController::class, 'success'])->name('orders.success');

// Customer / Buyer Dashboard Routes
Route::prefix('dashboard')->group(function () {
    Route::get('/', fn() => redirect()->route('user.my-products'));
    Route::get('/my-products', [UserDashboardController::class, 'myProducts'])->name('user.my-products');
    Route::get('/orders', [UserDashboardController::class, 'orders'])->name('user.orders');
    Route::get('/wishlist', [UserDashboardController::class, 'wishlist'])->name('user.wishlist');
    Route::post('/wishlist/toggle', [UserDashboardController::class, 'toggleWishlist'])->name('user.wishlist.toggle');
    Route::post('/reviews', [UserDashboardController::class, 'submitReview'])->name('user.reviews.store');
});

// Seller / Vendor Partner Hub Routes
Route::prefix('seller')->name('seller.')->group(function () {
    // Dedicated Mitra Developer Authentication
    Route::get('/login', [SellerAuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [SellerAuthController::class, 'login']);
    Route::get('/register', [SellerAuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [SellerAuthController::class, 'register']);
    Route::get('/auth/google', [SellerAuthController::class, 'redirectToGoogle'])->name('auth.google');

    // Dashboard & Operations
    Route::get('/', fn() => redirect()->route('seller.dashboard'));
    Route::get('/dashboard', [SellerDashboardController::class, 'index'])->name('dashboard');
    Route::get('/products', [SellerProductController::class, 'index'])->name('products');
    Route::post('/products', [SellerProductController::class, 'store'])->name('products.store');
    Route::delete('/products/{id}', [SellerProductController::class, 'destroy'])->name('products.destroy');
    Route::get('/withdrawals', [SellerWithdrawalController::class, 'index'])->name('withdrawals');
    Route::post('/withdrawals', [SellerWithdrawalController::class, 'store'])->name('withdrawals.store');
    Route::get('/settings', [SellerStoreController::class, 'settings'])->name('settings');
    Route::post('/settings', [SellerStoreController::class, 'update'])->name('settings.update');
});

// Lightweight Event & Visitor Tracking API
Route::post('/api/track-event', [TrackingController::class, 'track'])->name('api.track');

// Buyer / General Authentication Routes
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
Route::post('/register', [AuthController::class, 'register']);
Route::get('/auth/google', [AuthController::class, 'redirectToGoogle'])->name('auth.google');
Route::get('/auth/google/callback', [AuthController::class, 'handleGoogleCallback'])->name('auth.google.callback');
Route::get('/forgot-password', [AuthController::class, 'showForgotPassword'])->name('password.request');
Route::post('/forgot-password', [AuthController::class, 'sendResetLink'])->name('password.email');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Super Admin Panel Routes (As defined in docs/Ui/superadmin_design.md & design_login_admin.md)
Route::prefix('admin')->name('admin.')->group(function () {
    // Dedicated Super Admin Login
    Route::get('/login', [AdminAuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AdminAuthController::class, 'login']);

    // Admin Operations
    Route::get('/', fn() => redirect()->route('admin.dashboard'));
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
    
    // Blog & Knowledge Hub CMS
    Route::get('/blog', [AdminBlogController::class, 'index'])->name('blog');
    Route::post('/blog', [AdminBlogController::class, 'store'])->name('blog.store');
    Route::put('/blog/{id}', [AdminBlogController::class, 'update'])->name('blog.update');
    Route::delete('/blog/{id}', [AdminBlogController::class, 'destroy'])->name('blog.destroy');
    Route::patch('/blog/{id}/featured', [AdminBlogController::class, 'toggleFeatured'])->name('blog.featured');

    // Portfolio & Case Studies CMS
    Route::get('/portfolio', [AdminPortfolioController::class, 'index'])->name('portfolio');
    Route::post('/portfolio', [AdminPortfolioController::class, 'store'])->name('portfolio.store');
    Route::put('/portfolio/{id}', [AdminPortfolioController::class, 'update'])->name('portfolio.update');
    Route::delete('/portfolio/{id}', [AdminPortfolioController::class, 'destroy'])->name('portfolio.destroy');
    Route::patch('/portfolio/{id}/featured', [AdminPortfolioController::class, 'toggleFeatured'])->name('portfolio.featured');

    // System Settings & Notifications
    Route::get('/notifications', [AdminNotificationController::class, 'index'])->name('notifications');
    Route::get('/settings', [AdminSettingController::class, 'index'])->name('settings');
    Route::post('/settings', [AdminSettingController::class, 'update'])->name('settings.update');
});
