<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\PortfolioProject;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    /**
     * Format PortfolioProject model to frontend structure.
     */
    protected function formatProject(PortfolioProject $proj): array
    {
        $catKey = 'saas';
        $lowCat = strtolower($proj->category);
        if (str_contains($lowCat, 'erp') || str_contains($lowCat, 'logistik')) $catKey = 'erp';
        elseif (str_contains($lowCat, 'saas') || str_contains($lowCat, 'cloud')) $catKey = 'saas';
        elseif (str_contains($lowCat, 'fintech') || str_contains($lowCat, 'keuangan')) $catKey = 'fintech';
        elseif (str_contains($lowCat, 'kesehatan') || str_contains($lowCat, 'health')) $catKey = 'health';
        elseif (str_contains($lowCat, 'mobile')) $catKey = 'mobile';
        elseif (str_contains($lowCat, 'ai') || str_contains($lowCat, 'education')) $catKey = 'ai';

        $firstMetric = !empty($proj->impact_metrics) && is_array($proj->impact_metrics) 
            ? ($proj->impact_metrics[0]['value'] . ' ' . $proj->impact_metrics[0]['label'])
            : '+250% Peningkatan Kinerja';

        return [
            'id' => $proj->id,
            'slug' => $proj->slug,
            'title' => $proj->title,
            'client' => $proj->client_name,
            'category' => $proj->category,
            'categoryKey' => $catKey,
            'year' => $proj->created_at ? $proj->created_at->format('Y') : '2026',
            'duration' => $proj->duration,
            'industry' => $proj->industry,
            'impactMetric' => $firstMetric,
            'metrics' => $proj->impact_metrics ?: [
                ['label' => 'Efisiensi', 'value' => '+300%'],
                ['label' => 'Uptime', 'value' => '99.9%'],
                ['label' => 'Integrasi', 'value' => '100%'],
            ],
            'summary' => $proj->solution_overview,
            'challenge' => $proj->problem_statement,
            'solution' => $proj->solution_overview,
            'features' => $proj->deliverables ?: [
                'Arsitektur Terdistribusi Berkecepatan Tinggi',
                'Integrasi Database Terenkripsi',
                'Portal Web & Mobile Responsif',
            ],
            'techStack' => $proj->tech_stack ?: ['Laravel', 'React', 'PostgreSQL', 'Docker'],
            'gradient' => 'from-blue-600 via-indigo-600 to-slate-900',
            'icon' => 'Layers',
            'testimonial' => $proj->testimonial ?: [
                'quote' => 'KyySolutions memberikan hasil rekayasa software enterprise terbaik dengan kepatuhan deadline yang sangat disiplin.',
                'author' => 'Enterprise Client',
                'role' => 'Executive Director',
            ],
        ];
    }

    /**
     * Display portfolio showcase page.
     */
    public function index(Request $request): Response
    {
        $projects = PortfolioProject::where('status', 'published')
            ->orderByDesc('featured')
            ->latest()
            ->get();

        $formattedProjects = $projects->map(fn($p) => $this->formatProject($p))->toArray();

        $categories = [
            ['key' => 'all', 'label' => 'Semua Proyek'],
            ['key' => 'erp', 'label' => 'ERP & Logistik'],
            ['key' => 'saas', 'label' => 'SaaS & Cloud'],
            ['key' => 'fintech', 'label' => 'Fintech & Dompet Digital'],
            ['key' => 'health', 'label' => 'HealthTech & Medis'],
            ['key' => 'mobile', 'label' => 'Mobile Apps'],
        ];

        return Inertia::render('Public/Portfolio/Index', [
            'projects' => $formattedProjects,
            'categories' => $categories,
        ]);
    }

    /**
     * Display single portfolio case study.
     */
    public function show(string $slug): Response
    {
        $project = PortfolioProject::where('slug', $slug)->firstOrFail();
        $formatted = $this->formatProject($project);

        $otherProjects = PortfolioProject::where('status', 'published')
            ->where('id', '!=', $project->id)
            ->take(3)
            ->get();

        $related = $otherProjects->map(fn($p) => $this->formatProject($p))->values()->toArray();

        return Inertia::render('Public/Portfolio/Index', [
            'projects' => [$formatted, ...$related],
            'categories' => [
                ['key' => 'all', 'label' => 'Semua Proyek'],
            ],
            'initialProject' => $formatted,
        ]);
    }
}
