<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    /**
     * Helper to format BlogPost model to frontend payload.
     */
    protected function formatArticle(BlogPost $post): array
    {
        // Generate categoryKey from category name
        $catKey = strtolower(preg_replace('/[^a-zA-Z0-9]/', '', $post->category));
        if (str_contains($catKey, 'engineer')) $catKey = 'engineering';
        elseif (str_contains($catKey, 'ai') || str_contains($catKey, 'cloud')) $catKey = 'ai';
        elseif (str_contains($catKey, 'mobile')) $catKey = 'mobile';
        elseif (str_contains($catKey, 'design') || str_contains($catKey, 'frontend')) $catKey = 'design';
        else $catKey = 'business';

        $authorInitials = collect(explode(' ', $post->author_name))
            ->map(fn($w) => strtoupper(substr($w, 0, 1)))
            ->take(2)
            ->join('');

        return [
            'id' => $post->id,
            'slug' => $post->slug,
            'title' => $post->title,
            'excerpt' => $post->excerpt,
            'category' => $post->category,
            'categoryKey' => $catKey,
            'author' => [
                'name' => $post->author_name,
                'role' => $post->author_role,
                'avatar' => $authorInitials ?: 'KS',
            ],
            'date' => $post->published_at ? $post->published_at->translatedFormat('d F Y') : $post->created_at->translatedFormat('d F Y'),
            'readTime' => $post->read_time ?: '5 min baca',
            'featured' => $post->is_featured,
            'gradient' => 'from-blue-600 via-indigo-700 to-slate-900',
            'tags' => [$post->category, 'Tutorial', 'Best Practice', 'Engineering'],
            'coverImage' => $post->cover_image,
            'cover_image' => $post->cover_image,
            'views' => $post->views_count,
            'content' => [
                'intro' => $post->excerpt,
                'raw' => $post->content,
                'sections' => [
                    [
                        'heading' => 'Pembahasan Utama',
                        'body' => $post->content,
                    ],
                ],
                'keyTakeaways' => [
                    'Arsitektur bersih dan terisolasi untuk skalabilitas jangka panjang.',
                    'Penerapan standar keamanan OWASP dan enkripsi data.',
                    'Optimasi performa query dan caching multi-layer.',
                ],
            ],
        ];
    }

    /**
     * Display blog knowledge hub index.
     */
    public function index(Request $request): Response
    {
        $posts = BlogPost::where('status', 'published')
            ->orderByDesc('is_featured')
            ->latest('published_at')
            ->get();

        $formattedArticles = $posts->map(fn($post) => $this->formatArticle($post))->toArray();

        $categories = [
            ['key' => 'all', 'label' => 'Semua Artikel'],
            ['key' => 'engineering', 'label' => 'Software Engineering'],
            ['key' => 'ai', 'label' => 'AI & Cloud'],
            ['key' => 'mobile', 'label' => 'Mobile Development'],
            ['key' => 'business', 'label' => 'SaaS & Business'],
            ['key' => 'design', 'label' => 'UI/UX Design'],
        ];

        return Inertia::render('Public/Blog/Index', [
            'articles' => $formattedArticles,
            'categories' => $categories,
        ]);
    }

    /**
     * Display single blog article.
     */
    public function show(string $slug): Response
    {
        $post = BlogPost::where('slug', $slug)->firstOrFail();
        
        // Increment view counter
        $post->increment('views_count');

        $article = $this->formatArticle($post);

        $relatedPosts = BlogPost::where('status', 'published')
            ->where('id', '!=', $post->id)
            ->take(3)
            ->get();

        $relatedArticles = $relatedPosts->map(fn($p) => $this->formatArticle($p))->values()->toArray();

        return Inertia::render('Public/Blog/Show', [
            'article' => $article,
            'relatedArticles' => $relatedArticles,
        ]);
    }
}
