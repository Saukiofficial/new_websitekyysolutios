<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Hash;

class AdminUserController extends Controller
{
    /**
     * Display list of users.
     */
    public function index(Request $request): Response
    {
        $role = $request->query('role', 'all');
        $search = $request->query('q', '');

        $query = User::query()
            ->when($role !== 'all', fn($q) => $q->where('role', $role))
            ->when($search, fn($q) => $q->where('name', 'like', "%{$search}%")->orWhere('email', 'like', "%{$search}%"))
            ->latest();

        $users = $query->get()->map(function ($u) {
            return [
                'id' => $u->id,
                'name' => $u->name,
                'email' => $u->email,
                'role' => $u->role,
                'status' => $u->status ?? 'active',
                'phone' => $u->phone ?? '-',
                'createdAt' => $u->created_at->format('d M Y'),
            ];
        });

        $counts = [
            'all' => User::count(),
            'buyer' => User::where('role', 'buyer')->count(),
            'seller' => User::where('role', 'seller')->count(),
            'admin' => User::where('role', 'admin')->count(),
        ];

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'counts' => $counts,
            'filters' => [
                'role' => $role,
                'q' => $search,
            ]
        ]);
    }

    /**
     * Toggle user status (active / banned).
     */
    public function toggleStatus(Request $request, int $id)
    {
        $user = User::findOrFail($id);
        $user->status = $user->status === 'active' ? 'banned' : 'active';
        $user->save();

        return redirect()->back()->with('success', "Status user {$user->name} diperbarui menjadi {$user->status}.");
    }

    /**
     * Store new user.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'role' => 'required|in:buyer,seller,admin',
            'phone' => 'nullable|string',
        ]);

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
            'status' => 'active',
            'phone' => $validated['phone'],
        ]);

        return redirect()->back()->with('success', 'User baru berhasil didaftarkan.');
    }
}
