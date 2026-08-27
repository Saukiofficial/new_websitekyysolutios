<?php

use App\Http\Controllers\Web\LandingPageController;
use App\Http\Controllers\Web\MarketplaceController;
use Illuminate\Support\Facades\Route;

Route::get('/', LandingPageController::class)->name('home');
Route::get('/marketplace', [MarketplaceController::class, 'index'])->name('marketplace.index');
