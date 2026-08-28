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
        // 1. Blog Posts Table
        Schema::create('blog_posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('category')->default('Engineering');
            $table->text('excerpt')->nullable();
            $table->longText('content');
            $table->string('cover_image')->nullable();
            $table->string('read_time')->default('5 min baca');
            $table->unsignedBigInteger('views_count')->default(0);
            $table->string('author_name')->default('KyySolutions Core Team');
            $table->string('author_role')->default('Software Architect');
            $table->string('author_avatar')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->enum('status', ['published', 'draft', 'archived'])->default('published');
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });

        // 2. Portfolio Projects Table
        Schema::create('portfolio_projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('category')->default('SaaS & Cloud');
            $table->string('client_name')->default('Confidential Enterprise');
            $table->string('industry')->default('Technology');
            $table->string('duration')->default('8 Minggu');
            $table->string('live_url')->nullable();
            $table->string('banner_image')->nullable();
            $table->text('problem_statement')->nullable();
            $table->text('solution_overview')->nullable();
            $table->text('architecture_summary')->nullable();
            $table->json('impact_metrics')->nullable();
            $table->json('tech_stack')->nullable();
            $table->json('deliverables')->nullable();
            $table->json('testimonial')->nullable();
            $table->boolean('featured')->default(false);
            $table->enum('status', ['published', 'draft', 'archived'])->default('published');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('portfolio_projects');
        Schema::dropIfExists('blog_posts');
    }
};
