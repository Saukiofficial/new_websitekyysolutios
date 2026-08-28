<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductAccess extends Model
{
    use HasFactory;

    protected $fillable = [
        'buyer_id',
        'buyer_email',
        'product_id',
        'order_id',
        'order_item_id',
        'license_key',
        'license_type',
        'access_status',
        'access_count',
        'last_accessed_at',
    ];

    protected function casts(): array
    {
        return [
            'access_count' => 'integer',
            'last_accessed_at' => 'datetime',
        ];
    }

    public function buyer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
}
