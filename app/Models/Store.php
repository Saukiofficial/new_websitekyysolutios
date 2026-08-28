<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Store extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'username',
        'slug',
        'logo',
        'banner',
        'description',
        'is_official',
        'is_verified',
        'rating',
        'response_time',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'is_official' => 'boolean',
            'is_verified' => 'boolean',
            'rating' => 'decimal:2',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }
}
