<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class AdminBlogController extends Controller
{
    /**
     * Display blog management table.
     */
    public function index(Request $request): Response
    {
        $query = BlogPost::query();

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('category', 'like', "%{$search}%")
                  ->orWhere('author_name', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status') && $request->input('status') !== 'all') {
            $query->where('status', $request->input('status'));
        }

        if ($request->filled('category') && $request->input('category') !== 'all') {
            $query->where('category', $request->input('category'));
        }

        $posts = $query->latest()->paginate(10)->through(function ($post) {
            return [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'category' => $post->category,
                'excerpt' => $post->excerpt,
                'content' => $post->content,
                'cover_image' => $post->cover_image,
                'read_time' => $post->read_time,
                'views_count' => $post->views_count,
                'author_name' => $post->author_name,
                'author_role' => $post->author_role,
                'is_featured' => (bool) $post->is_featured,
                'status' => $post->status,
                'published_at' => $post->published_at ? $post->published_at->format('d M Y') : '-',
                'created_at' => $post->created_at->format('d M Y, H:i'),
            ];
        });

        $categories = BlogPost::distinct()->pluck('category')->filter()->values();

        return Inertia::render('Admin/Blog/Index', [
            'posts' => $posts,
            'categories' => $categories,
            'filters' => $request->only(['search', 'status', 'category']),
            'stats' => [
                'total' => BlogPost::count(),
                'published' => BlogPost::where('status', 'published')->count(),
                'draft' => BlogPost::where('status', 'draft')->count(),
                'featured' => BlogPost::where('is_featured', true)->count(),
                'totalViews' => BlogPost::sum('views_count'),
            ],
        ]);
    }

    /**
     * Store new blog article with cover image upload support.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'excerpt' => 'nullable|string|max:500',
            'content' => 'required|string',
            'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,webp,svg|max:3072',
            'cover_image_url' => 'nullable|string|max:500',
            'author_name' => 'nullable|string|max:100',
            'author_role' => 'nullable|string|max:100',
            'read_time' => 'nullable|string|max:50',
            'is_featured' => 'boolean',
            'status' => 'required|in:published,draft,archived',
        ]);

        $slug = Str::slug($validated['title']);
        $count = BlogPost::where('slug', 'like', "{$slug}%")->count();
        if ($count > 0) {
            $slug .= '-' . ($count + 1);
        }

        // Handle cover image upload or URL
        $coverImage = null;
        if ($request->hasFile('cover_image')) {
            $path = $request->file('cover_image')->store('blog', 'public');
            $coverImage = '/storage/' . $path;
        } elseif ($request->filled('cover_image_url')) {
            $coverImage = $request->input('cover_image_url');
        }

        $validated['slug'] = $slug;
        $validated['cover_image'] = $coverImage;
        $validated['author_name'] = $validated['author_name'] ?: 'KyySolutions Team';
        $validated['author_role'] = $validated['author_role'] ?: 'Software Architect';
        $validated['read_time'] = $validated['read_time'] ?: '5 min baca';
        $validated['published_at'] = $validated['status'] === 'published' ? now() : null;

        BlogPost::create($validated);

        return redirect()->back()->with('success', 'Artikel blog beserta cover image berhasil diterbitkan!');
    }

    /**
     * Update existing blog article with cover image upload support.
     */
    public function update(Request $request, $id)
    {
        $post = BlogPost::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'excerpt' => 'nullable|string|max:500',
            'content' => 'required|string',
            'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,webp,svg|max:3072',
            'cover_image_url' => 'nullable|string|max:500',
            'author_name' => 'nullable|string|max:100',
            'author_role' => 'nullable|string|max:100',
            'read_time' => 'nullable|string|max:50',
            'is_featured' => 'boolean',
            'status' => 'required|in:published,draft,archived',
        ]);

        if ($post->title !== $validated['title']) {
            $slug = Str::slug($validated['title']);
            $count = BlogPost::where('slug', 'like', "{$slug}%")->where('id', '!=', $post->id)->count();
            if ($count > 0) {
                $slug .= '-' . ($count + 1);
            }
            $validated['slug'] = $slug;
        }

        if ($request->hasFile('cover_image')) {
            $path = $request->file('cover_image')->store('blog', 'public');
            $validated['cover_image'] = '/storage/' . $path;
        } elseif ($request->filled('cover_image_url')) {
            $validated['cover_image'] = $request->input('cover_image_url');
        }

        if ($validated['status'] === 'published' && !$post->published_at) {
            $validated['published_at'] = now();
        }

        $post->update($validated);

        return redirect()->back()->with('success', 'Artikel blog berhasil diperbarui!');
    }

    /**
     * Delete blog article.
     */
    public function destroy($id)
    {
        $post = BlogPost::findOrFail($id);
        $post->delete();

        return redirect()->back()->with('success', 'Artikel blog berhasil dihapus.');
    }

    /**
     * Toggle featured status.
     */
    public function toggleFeatured($id)
    {
        $post = BlogPost::findOrFail($id);
        $post->is_featured = !$post->is_featured;
        $post->save();

        return redirect()->back()->with('success', 'Status artikel unggulan berhasil diubah.');
    }
}
