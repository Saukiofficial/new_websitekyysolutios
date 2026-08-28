<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PortfolioProject;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class AdminPortfolioController extends Controller
{
    /**
     * Display portfolio projects management table.
     */
    public function index(Request $request): Response
    {
        $query = PortfolioProject::query();

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('client_name', 'like', "%{$search}%")
                  ->orWhere('category', 'like', "%{$search}%")
                  ->orWhere('industry', 'like', "%{$search}%");
            });
        }

        if ($request->filled('category') && $request->input('category') !== 'all') {
            $query->where('category', $request->input('category'));
        }

        if ($request->filled('status') && $request->input('status') !== 'all') {
            $query->where('status', $request->input('status'));
        }

        $projects = $query->latest()->paginate(10)->through(function ($p) {
            return [
                'id' => $p->id,
                'title' => $p->title,
                'slug' => $p->slug,
                'category' => $p->category,
                'client_name' => $p->client_name,
                'industry' => $p->industry,
                'duration' => $p->duration,
                'live_url' => $p->live_url,
                'banner_image' => $p->banner_image,
                'problem_statement' => $p->problem_statement,
                'solution_overview' => $p->solution_overview,
                'architecture_summary' => $p->architecture_summary,
                'impact_metrics' => $p->impact_metrics ?: [],
                'tech_stack' => $p->tech_stack ?: [],
                'deliverables' => $p->deliverables ?: [],
                'testimonial' => $p->testimonial ?: [],
                'featured' => (bool) $p->featured,
                'status' => $p->status,
                'created_at' => $p->created_at->format('d M Y, H:i'),
            ];
        });

        $categories = PortfolioProject::distinct()->pluck('category')->filter()->values();

        return Inertia::render('Admin/Portfolio/Index', [
            'projects' => $projects,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category', 'status']),
            'stats' => [
                'total' => PortfolioProject::count(),
                'published' => PortfolioProject::where('status', 'published')->count(),
                'featured' => PortfolioProject::where('featured', true)->count(),
            ],
        ]);
    }

    /**
     * Store new portfolio case study with banner image upload support.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'client_name' => 'required|string|max:150',
            'industry' => 'required|string|max:100',
            'duration' => 'nullable|string|max:50',
            'live_url' => 'nullable|string|max:255',
            'banner_image' => 'nullable|image|mimes:jpeg,png,jpg,webp,svg|max:3072',
            'banner_image_url' => 'nullable|string|max:500',
            'problem_statement' => 'required|string',
            'solution_overview' => 'required|string',
            'architecture_summary' => 'nullable|string',
            'tech_stack' => 'nullable',
            'deliverables' => 'nullable',
            'impact_metrics' => 'nullable',
            'testimonial_quote' => 'nullable|string',
            'testimonial_author' => 'nullable|string',
            'testimonial_role' => 'nullable|string',
            'featured' => 'boolean',
            'status' => 'required|in:published,draft,archived',
        ]);

        $slug = Str::slug($validated['title']);
        $count = PortfolioProject::where('slug', 'like', "{$slug}%")->count();
        if ($count > 0) {
            $slug .= '-' . ($count + 1);
        }

        // Handle banner image file upload or URL
        $bannerImage = null;
        if ($request->hasFile('banner_image')) {
            $path = $request->file('banner_image')->store('portfolio', 'public');
            $bannerImage = '/storage/' . $path;
        } elseif ($request->filled('banner_image_url')) {
            $bannerImage = $request->input('banner_image_url');
        }

        $validated['slug'] = $slug;
        $validated['banner_image'] = $bannerImage;
        $validated['duration'] = $validated['duration'] ?: '8 Minggu';
        
        // Parse array/JSON inputs
        if (is_string($request->input('tech_stack'))) {
            $validated['tech_stack'] = json_decode($request->input('tech_stack'), true) ?: array_filter(array_map('trim', explode(',', $request->input('tech_stack'))));
        }
        if (is_string($request->input('deliverables'))) {
            $validated['deliverables'] = json_decode($request->input('deliverables'), true) ?: array_filter(array_map('trim', explode(',', $request->input('deliverables'))));
        }
        if (is_string($request->input('impact_metrics'))) {
            $validated['impact_metrics'] = json_decode($request->input('impact_metrics'), true);
        }

        if (!empty($validated['testimonial_quote'])) {
            $validated['testimonial'] = [
                'quote' => $validated['testimonial_quote'],
                'author' => $validated['testimonial_author'] ?: 'Client Representative',
                'role' => $validated['testimonial_role'] ?: 'Director',
            ];
        }

        PortfolioProject::create($validated);

        return redirect()->back()->with('success', 'Studi kasus portfolio beserta banner image berhasil ditambahkan!');
    }

    /**
     * Update existing portfolio case study with banner image upload support.
     */
    public function update(Request $request, $id)
    {
        $project = PortfolioProject::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'client_name' => 'required|string|max:150',
            'industry' => 'required|string|max:100',
            'duration' => 'nullable|string|max:50',
            'live_url' => 'nullable|string|max:255',
            'banner_image' => 'nullable|image|mimes:jpeg,png,jpg,webp,svg|max:3072',
            'banner_image_url' => 'nullable|string|max:500',
            'problem_statement' => 'required|string',
            'solution_overview' => 'required|string',
            'architecture_summary' => 'nullable|string',
            'tech_stack' => 'nullable',
            'deliverables' => 'nullable',
            'impact_metrics' => 'nullable',
            'testimonial_quote' => 'nullable|string',
            'testimonial_author' => 'nullable|string',
            'testimonial_role' => 'nullable|string',
            'featured' => 'boolean',
            'status' => 'required|in:published,draft,archived',
        ]);

        if ($project->title !== $validated['title']) {
            $slug = Str::slug($validated['title']);
            $count = PortfolioProject::where('slug', 'like', "{$slug}%")->where('id', '!=', $project->id)->count();
            if ($count > 0) {
                $slug .= '-' . ($count + 1);
            }
            $validated['slug'] = $slug;
        }

        if ($request->hasFile('banner_image')) {
            $path = $request->file('banner_image')->store('portfolio', 'public');
            $validated['banner_image'] = '/storage/' . $path;
        } elseif ($request->filled('banner_image_url')) {
            $validated['banner_image'] = $request->input('banner_image_url');
        }

        // Parse array/JSON inputs
        if (is_string($request->input('tech_stack'))) {
            $validated['tech_stack'] = json_decode($request->input('tech_stack'), true) ?: array_filter(array_map('trim', explode(',', $request->input('tech_stack'))));
        }
        if (is_string($request->input('deliverables'))) {
            $validated['deliverables'] = json_decode($request->input('deliverables'), true) ?: array_filter(array_map('trim', explode(',', $request->input('deliverables'))));
        }
        if (is_string($request->input('impact_metrics'))) {
            $validated['impact_metrics'] = json_decode($request->input('impact_metrics'), true);
        }

        if (!empty($validated['testimonial_quote'])) {
            $validated['testimonial'] = [
                'quote' => $validated['testimonial_quote'],
                'author' => $validated['testimonial_author'] ?: 'Client Representative',
                'role' => $validated['testimonial_role'] ?: 'Director',
            ];
        }

        $project->update($validated);

        return redirect()->back()->with('success', 'Studi kasus portfolio berhasil diperbarui!');
    }

    /**
     * Delete portfolio case study.
     */
    public function destroy($id)
    {
        $project = PortfolioProject::findOrFail($id);
        $project->delete();

        return redirect()->back()->with('success', 'Studi kasus portfolio berhasil dihapus.');
    }

    /**
     * Toggle featured status.
     */
    public function toggleFeatured($id)
    {
        $project = PortfolioProject::findOrFail($id);
        $project->featured = !$project->featured;
        $project->save();

        return redirect()->back()->with('success', 'Status unggulan portfolio berhasil diubah.');
    }
}
