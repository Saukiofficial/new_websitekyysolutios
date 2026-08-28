<?php

use App\Http\Controllers\Web\LandingPageController;
use App\Http\Controllers\Web\MarketplaceController;
use App\Http\Controllers\Web\CheckoutController;
use Illuminate\Support\Facades\Route;

Route::get('/', LandingPageController::class)->name('home');
Route::get('/marketplace', [MarketplaceController::class, 'index'])->name('marketplace.index');

// Direct Checkout & Order Routes (As defined in docs/08_USER_FLOW.md & docs/FEATURES/CHECKOUT.md)
Route::get('/checkout/{id?}', [CheckoutController::class, 'index'])->name('checkout.index');
Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');
Route::get('/orders/{orderNumber}', [CheckoutController::class, 'success'])->name('orders.success');
