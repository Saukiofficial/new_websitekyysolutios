<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogPost extends Model
{
    use HasFactory;

    protected $table = 'blog_posts';

    protected $fillable = [
        'title',
        'slug',
        'category',
        'excerpt',
        'content',
        'cover_image',
        'read_time',
        'views_count',
        'author_name',
        'author_role',
        'author_avatar',
        'is_featured',
        'status',
        'published_at',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'published_at' => 'datetime',
        'views_count' => 'integer',
    ];
}
