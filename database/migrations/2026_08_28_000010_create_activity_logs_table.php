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
        Schema::create('activity_logs', function (Blueprint $table) {
            $table->id();
            $table->string('session_id', 100)->nullable()->index();
            $table->string('ip_address', 50)->nullable();
            $table->string('event_type', 50)->index(); // pageview, product_view, cart_click, checkout_start, purchase, demo_click
            $table->string('page_url')->nullable();
            $table->foreignId('product_id')->nullable()->constrained('products')->nullOnDelete();
            $table->string('product_title')->nullable();
            $table->string('device', 30)->default('Desktop');
            $table->string('browser', 50)->default('Chrome');
            $table->string('location', 100)->default('Jakarta, Indonesia');
            $table->json('metadata')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activity_logs');
    }
};
