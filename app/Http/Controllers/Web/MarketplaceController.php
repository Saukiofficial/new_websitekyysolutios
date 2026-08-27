<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MarketplaceController extends Controller
{
    /**
     * Display the public digital marketplace catalog.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('Public/Marketplace/Index', [
            'initialCategory' => $request->query('category', 'all'),
            'searchQuery' => $request->query('q', ''),
        ]);
    }
}
