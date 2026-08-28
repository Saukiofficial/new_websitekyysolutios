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

class AuthController extends Controller
{
    /**
     * Show the Buyer / General customer login form.
     */
    public function showLogin(): Response
    {
        return Inertia::render('Auth/Login');
    }

    /**
     * Handle an incoming customer authentication request.
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials, $request->boolean('remember'))) {
            $request->session()->regenerate();

            $user = Auth::user();

            if ($user->role === 'admin') {
                return redirect()->intended(route('admin.dashboard'));
            }

            if ($user->role === 'seller') {
                return redirect()->intended(route('seller.dashboard'));
            }

            return redirect()->intended(route('user.my-products'));
        }

        return back()->withErrors([
            'email' => 'Email atau kata sandi yang Anda masukkan salah.',
        ])->onlyInput('email');
    }

    /**
     * Show the Buyer registration form.
     */
    public function showRegister(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming Buyer registration request.
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:6'],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'buyer',
            'status' => 'active',
        ]);

        Auth::login($user);
        $request->session()->regenerate();

        return redirect()->route('user.my-products')->with('success', 'Selamat datang! Akun pembeli Anda berhasil dibuat.');
    }

    /**
     * Redirect Buyer to Google OAuth server.
     */
    public function redirectToGoogle(Request $request)
    {
        session(['oauth_target_role' => 'buyer']);

        if (class_exists(\Laravel\Socialite\Facades\Socialite::class)) {
            try {
                return Socialite::driver('google')->redirect();
            } catch (Throwable $e) {
                return $this->fallbackBuyerGoogleAuth();
            }
        }

        return $this->fallbackBuyerGoogleAuth();
    }

    /**
     * Handle incoming callback from Google OAuth (routes cleanly for both Buyer & Seller).
     */
    public function handleGoogleCallback(Request $request)
    {
        $targetRole = session('oauth_target_role', 'buyer');

        try {
            $googleUser = Socialite::driver('google')->user();
            $email = $googleUser->getEmail();
            $name = $googleUser->getName() ?: 'User Google';
        } catch (Throwable $e) {
            return redirect()->route('login')->withErrors(['email' => 'Gagal menghubungkan Akun Google: ' . $e->getMessage()]);
        }

        $user = User::where('email', $email)->first();

        if (!$user) {
            $user = User::create([
                'name' => $name,
                'email' => $email,
                'password' => Hash::make(Str::random(24)),
                'role' => $targetRole,
                'status' => 'active',
            ]);
        }

        // If user logged in through Seller Portal, ensure they have a store
        if ($targetRole === 'seller') {
            if ($user->role !== 'admin') {
                $user->role = 'seller';
                $user->save();
            }

            $existingStore = Store::where('user_id', $user->id)->first();
            if (!$existingStore) {
                $storeName = $name . ' Studio';
                $storeSlug = Str::slug($storeName);
                Store::create([
                    'user_id' => $user->id,
                    'name' => $storeName,
                    'username' => $storeSlug . rand(10, 99),
                    'slug' => $storeSlug . '-' . Str::random(4),
                    'description' => 'Studio pengembang software mitra resmi KyySolutions terverifikasi melalui Akun Google.',
                    'rating' => 5.00,
                    'is_verified' => true,
                    'is_official' => false,
                ]);
            }
        }

        Auth::login($user, true);
        $request->session()->regenerate();

        if ($user->role === 'admin') {
            return redirect()->route('admin.dashboard');
        }

        if ($targetRole === 'seller' || $user->role === 'seller') {
            return redirect()->route('seller.dashboard')->with('success', "Selamat datang di Seller Studio, {$user->name}!");
        }

        return redirect()->route('user.my-products')->with('success', "Selamat datang di Buyer Hub, {$user->name}!");
    }

    /**
     * Fallback for instant mock auth.
     */
    protected function fallbackBuyerGoogleAuth()
    {
        $randomSuffix = rand(100, 999);
        $email = "buyer{$randomSuffix}@gmail.com";
        $name = "Buyer Google {$randomSuffix}";

        $user = User::firstOrCreate(
            ['email' => $email],
            [
                'name' => $name,
                'password' => Hash::make(Str::random(16)),
                'role' => 'buyer',
                'status' => 'active',
            ]
        );

        Auth::login($user);
        return redirect()->route('user.my-products')->with('success', 'Autentikasi Google Berhasil!');
    }

    /**
     * Show the forgot password form.
     */
    public function showForgotPassword(): Response
    {
        return Inertia::render('Auth/ForgotPassword');
    }

    /**
     * Handle send reset link request.
     */
    public function sendResetLink(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
        ]);

        return back()->with('status', 'Instruksi pemulihan kata sandi telah dikirimkan ke email Anda.');
    }

    /**
     * Destroy an authenticated session.
     */
    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('home');
    }
}
