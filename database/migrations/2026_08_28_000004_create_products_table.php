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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->nullable()->constrained('stores')->nullOnDelete();
            $table->foreignId('seller_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('category_id')->nullable()->constrained('categories')->nullOnDelete();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('short_description')->nullable();
            $table->longText('description')->nullable();
            $table->unsignedBigInteger('price'); // Regular Price in IDR
            $table->unsignedBigInteger('extended_price')->nullable(); // Extended Price in IDR
            $table->unsignedBigInteger('compare_price')->nullable();
            $table->string('thumbnail')->nullable();
            $table->string('demo_url')->nullable();
            $table->string('version')->default('v1.0.0');
            $table->string('license_type')->default('regular'); // regular, extended
            $table->string('badge')->nullable(); // Best Seller, Featured, Top Rated, New Release, Popular
            $table->decimal('rating', 3, 2)->default(5.00);
            $table->unsignedInteger('reviews_count')->default(0);
            $table->unsignedInteger('sales_count')->default(0);
            $table->unsignedInteger('views_count')->default(0);
            $table->json('features')->nullable();
            $table->json('tech_stack')->nullable();
            $table->json('requirements')->nullable();
            $table->json('files_included')->nullable();
            $table->json('changelog')->nullable();
            $table->string('status')->default('published'); // draft, pending, published, rejected
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
