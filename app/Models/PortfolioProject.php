<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PortfolioProject extends Model
{
    use HasFactory;

    protected $table = 'portfolio_projects';

    protected $fillable = [
        'title',
        'slug',
        'category',
        'client_name',
        'industry',
        'duration',
        'live_url',
        'banner_image',
        'problem_statement',
        'solution_overview',
        'architecture_summary',
        'impact_metrics',
        'tech_stack',
        'deliverables',
        'testimonial',
        'featured',
        'status',
    ];

    protected $casts = [
        'impact_metrics' => 'array',
        'tech_stack' => 'array',
        'deliverables' => 'array',
        'testimonial' => 'array',
        'featured' => 'boolean',
    ];
}
