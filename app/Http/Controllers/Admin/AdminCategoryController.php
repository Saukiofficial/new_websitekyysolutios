<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class AdminCategoryController extends Controller
{
    /**
     * Display categories list.
     */
    public function index(): Response
    {
        $categories = Category::withCount('products')->latest()->get()->map(function ($c) {
            return [
                'id' => $c->id,
                'name' => $c->name,
                'slug' => $c->slug,
                'categoryKey' => $c->category_key,
                'description' => $c->description,
                'productsCount' => $c->products_count,
                'status' => $c->status,
                'createdAt' => $c->created_at->format('d M Y'),
            ];
        });

        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a new category.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'description' => 'nullable|string',
        ]);

        $slug = Str::slug($validated['name']);
        $key = Str::camel($validated['name']);

        Category::create([
            'name' => $validated['name'],
            'slug' => $slug,
            'category_key' => $key,
            'description' => $validated['description'],
            'status' => 'active',
        ]);

        return redirect()->back()->with('success', 'Kategori baru berhasil ditambahkan.');
    }

    /**
     * Delete a category.
     */
    public function destroy(int $id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return redirect()->back()->with('success', 'Kategori berhasil dihapus.');
    }
}
