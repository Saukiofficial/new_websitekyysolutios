<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'store_id',
        'seller_id',
        'category_id',
        'title',
        'slug',
        'short_description',
        'description',
        'price',
        'extended_price',
        'compare_price',
        'thumbnail',
        'demo_url',
        'version',
        'license_type',
        'badge',
        'rating',
        'reviews_count',
        'sales_count',
        'views_count',
        'features',
        'tech_stack',
        'requirements',
        'files_included',
        'changelog',
        'status',
        'published_at',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'integer',
            'extended_price' => 'integer',
            'compare_price' => 'integer',
            'rating' => 'decimal:2',
            'reviews_count' => 'integer',
            'sales_count' => 'integer',
            'views_count' => 'integer',
            'features' => 'array',
            'tech_stack' => 'array',
            'requirements' => 'array',
            'files_included' => 'array',
            'changelog' => 'array',
            'published_at' => 'datetime',
        ];
    }

    public function store(): BelongsTo
    {
        return $this->belongsTo(Store::class);
    }

    public function seller(): BelongsTo
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function links(): HasMany
    {
        return $this->hasMany(ProductLink::class);
    }

    public function accesses(): HasMany
    {
        return $this->hasMany(ProductAccess::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function getPriceFormattedAttribute(): string
    {
        return 'Rp ' . number_format($this->price, 0, ',', '.');
    }

    public function getExtendedPriceFormattedAttribute(): string
    {
        return 'Rp ' . number_format($this->extended_price ?? ($this->price * 2), 0, ',', '.');
    }
}
