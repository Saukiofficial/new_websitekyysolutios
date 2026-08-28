<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('buyer_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('order_number')->unique(); // e.g. KYY-ORD-20260828-ABC12
            $table->string('customer_name');
            $table->string('customer_email');
            $table->string('customer_phone')->nullable();
            $table->unsignedBigInteger('subtotal');
            $table->unsignedBigInteger('discount')->default(0);
            $table->unsignedBigInteger('payment_fee')->default(0);
            $table->unsignedBigInteger('total');
            $table->string('currency')->default('IDR');
            $table->string('coupon_code')->nullable();
            $table->string('payment_method')->nullable(); // qris, bca_va, mandiri_va, ewallet, cc
            $table->string('status')->default('pending'); // pending, paid, failed, expired, refunded
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();
        });

        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->cascadeOnDelete();
            $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();
            $table->foreignId('seller_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('product_title_snapshot');
            $table->unsignedBigInteger('price');
            $table->string('license_type')->default('regular'); // regular, extended
            $table->decimal('commission_rate', 5, 2)->default(10.00); // 10%
            $table->unsignedBigInteger('commission_amount')->default(0);
            $table->unsignedBigInteger('seller_amount')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
        Schema::dropIfExists('orders');
    }
};
