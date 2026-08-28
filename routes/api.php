<?php

use App\Http\Controllers\Api\TrackingController;
use Illuminate\Support\Facades\Route;

Route::post('/track-event', [TrackingController::class, 'track']);
