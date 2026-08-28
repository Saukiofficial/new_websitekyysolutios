<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request and check if authenticated user possesses the authorized role.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string  ...$roles
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        if (!Auth::check()) {
            if ($request->is('admin*')) {
                return redirect()->guest(route('admin.login'))->with('error', 'Silakan masuk dengan akun Super Administrator.');
            }
            if ($request->is('seller*')) {
                return redirect()->guest(route('seller.login'))->with('error', 'Silakan masuk dengan akun Mitra Developer.');
            }
            return redirect()->guest(route('login'))->with('error', 'Silakan masuk terlebih dahulu untuk mengakses halaman ini.');
        }

        $user = Auth::user();

        // Check user active status
        if ($user->status === 'suspended' || $user->status === 'banned') {
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return redirect()->route('login')->withErrors([
                'email' => 'Akun Anda telah dinonaktifkan oleh administrator.',
            ]);
        }

        // Parse allowed roles list
        $allowedRoles = [];
        foreach ($roles as $roleGroup) {
            foreach (explode(',', $roleGroup) as $r) {
                $trimmed = trim($r);
                if ($trimmed) {
                    $allowedRoles[] = $trimmed;
                }
            }
        }

        // Super Admin has master privilege
        if ($user->role === 'admin') {
            return $next($request);
        }

        // User role matches allowed roles
        if (in_array($user->role, $allowedRoles, true)) {
            return $next($request);
        }

        // Contextual redirection on unauthorized access
        if ($request->is('admin*')) {
            return redirect()->route('user.my-products')->with('error', 'Akses ditolak: Anda tidak memiliki wewenang Super Administrator.');
        }

        if ($request->is('seller*')) {
            return redirect()->route('seller.register')->with('error', 'Silakan daftar sebagai Mitra Developer untuk membuka Seller Studio.');
        }

        return redirect()->route('user.my-products')->with('error', 'Akses tidak diizinkan.');
    }
}
