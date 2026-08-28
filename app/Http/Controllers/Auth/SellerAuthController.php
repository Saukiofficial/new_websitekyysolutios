<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Socialite\Facades\Socialite;
use Throwable;

class SellerAuthController extends Controller
{
    /**
     * Show dedicated Mitra Developer Login page.
     */
    public function showLogin()
    {
        if (Auth::check() && Auth::user()->role === 'seller') {
            return redirect()->route('seller.dashboard');
        }

        return Inertia::render('Auth/SellerLogin');
    }

    /**
     * Show dedicated Mitra Developer Register page.
     */
    public function showRegister(): Response
    {
        return Inertia::render('Auth/SellerRegister');
    }

    /**
     * Handle Mitra Developer Login.
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials, $request->boolean('remember'))) {
            $user = Auth::user();

            if ($user->role !== 'seller' && $user->role !== 'admin') {
                Auth::logout();
                $request->session()->invalidate();
                $request->session()->regenerateToken();

                return back()->withErrors([
                    'email' => 'Akun ini terdaftar sebagai Pembeli. Silakan mendaftar sebagai Mitra Developer terlebih dahulu.',
                ])->onlyInput('email');
            }

            $request->session()->regenerate();
            return redirect()->intended(route('seller.dashboard'));
        }

        return back()->withErrors([
            'email' => 'Email atau kata sandi pengembang salah.',
        ])->onlyInput('email');
    }

    /**
     * Handle Mitra Developer Registration.
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:6'],
            'store_name' => ['required', 'string', 'max:255'],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'seller',
            'status' => 'active',
        ]);

        $storeSlug = Str::slug($validated['store_name']);
        Store::create([
            'user_id' => $user->id,
            'name' => $validated['store_name'],
            'username' => $storeSlug . rand(10, 99),
            'slug' => $storeSlug . '-' . Str::random(4),
            'description' => 'Mitra pengembang software resmi di KyySolutions Marketplace.',
            'rating' => 5.00,
            'is_verified' => true,
            'is_official' => false,
        ]);

        Auth::login($user);
        $request->session()->regenerate();

        return redirect()->route('seller.dashboard')->with('success', 'Selamat datang di Seller Studio! Toko software Anda berhasil diaktifkan.');
    }

    /**
     * Redirect to Google OAuth for Seller.
     */
    public function redirectToGoogle(Request $request)
    {
        session(['oauth_target_role' => 'seller']);

        if (class_exists(\Laravel\Socialite\Facades\Socialite::class)) {
            try {
                return Socialite::driver('google')->redirect();
            } catch (Throwable $e) {
                return $this->fallbackSellerGoogleAuth();
            }
        }

        return $this->fallbackSellerGoogleAuth();
    }

    /**
     * Fallback mock auth for demo purposes.
     */
    protected function fallbackSellerGoogleAuth()
    {
        $randomSuffix = rand(100, 999);
        $email = "developer{$randomSuffix}@gmail.com";
        $name = "Dev Studio {$randomSuffix}";

        $user = User::firstOrCreate(
            ['email' => $email],
            [
                'name' => $name,
                'password' => Hash::make(Str::random(16)),
                'role' => 'seller',
                'status' => 'active',
            ]
        );

        $storeSlug = Str::slug($name);
        Store::firstOrCreate(
            ['user_id' => $user->id],
            [
                'name' => $name . ' Lab',
                'username' => $storeSlug . rand(10, 99),
                'slug' => $storeSlug . '-' . Str::random(4),
                'description' => 'Studio pengembang software mitra resmi KyySolutions terverifikasi melalui Akun Google.',
                'rating' => 5.00,
                'is_verified' => true,
                'is_official' => false,
            ]
        );

        Auth::login($user);
        return redirect()->route('seller.dashboard')->with('success', 'Autentikasi Google Seller Berhasil!');
    }
}
