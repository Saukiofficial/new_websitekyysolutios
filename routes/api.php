<?php

use App\Http\Controllers\Api\TrackingController;
use App\Http\Controllers\Api\PaymentWebhookController;
use App\Http\Controllers\Api\AiChatController;
use Illuminate\Support\Facades\Route;

Route::post('/track-event', [TrackingController::class, 'track']);

// Midtrans Payment Webhook Notification
Route::post('/payments/midtrans/webhook', [PaymentWebhookController::class, 'handleMidtrans']);

// AI Virtual Assistant Chatbot Endpoint
Route::post('/ai/chat', [AiChatController::class, 'chat']);
