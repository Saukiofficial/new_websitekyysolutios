import { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { 
    Store, 
    Mail, 
    Lock, 
    User as UserIcon,
    Eye, 
    EyeOff, 
    TrendingUp, 
    ShieldCheck, 
    CircleCheckBig,
    Code2,
    Loader2
} from 'lucide-react';

export default function SellerRegister() {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        store_name: '',
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/seller/register');
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-3 sm:p-5 lg:p-6 antialiased selection:bg-blue-600 selection:text-white font-sans">
            <Head title="Daftar Mitra Developer — Seller Studio KyySolutions" />

            <div className="w-full max-w-[1280px] min-h-[calc(100vh-48px)] bg-white rounded-2xl sm:rounded-[24px] border border-slate-200 shadow-xl overflow-hidden flex flex-col lg:flex-row">
                
                {/* ═══════════════════════════════════════════════════════
                    1. LEFT DEVELOPER HERO PANEL
                   ═══════════════════════════════════════════════════════ */}
                <div className="lg:w-[52%] bg-gradient-to-br from-[#0B1727] via-[#0E2038] to-[#0A1628] p-8 sm:p-12 lg:p-14 text-white flex flex-col justify-between relative overflow-hidden">
                    
                    <div className="relative z-10">
                        <Link href="/" className="flex items-center space-x-3 group">
                            <img src="/images/logo/logo_no_bg.png" alt="KyySolutions Logo" className="h-9 w-auto object-contain" />
                            <div className="flex flex-col">
                                <span className="text-xl font-extrabold text-white tracking-tight">
                                    Kyy<span className="text-[#60A5FA]">Solutions</span>
                                </span>
                                <span className="text-[10px] font-bold text-blue-400 tracking-widest uppercase -mt-0.5">
                                    Seller Studio
                                </span>
                            </div>
                        </Link>
                    </div>

                    <div className="relative z-10 my-8 space-y-6 max-w-[480px]">
                        
                        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-400/20 text-[#60A5FA] text-xs font-bold">
                            <Store className="w-3.5 h-3.5 text-[#60A5FA]" />
                            <span>Pendaftaran Mitra Pengembang Resmi</span>
                        </div>

                        <div className="space-y-3">
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight">
                                Mulai Jual Software & Dapatkan 90% Bagi Hasil
                            </h1>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                Bergabunglah bersama ratusan software house dan developer independen. Upload source code Anda dan dapatkan penghasilan tanpa ribet.
                            </p>
                        </div>

                        {/* 3 Step Onboarding */}
                        <div className="space-y-3 pt-2">
                            <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center space-x-3">
                                <div className="w-7 h-7 rounded-full bg-blue-600/30 text-blue-400 font-bold text-xs flex items-center justify-center shrink-0">1</div>
                                <span className="text-xs font-medium text-slate-200">Daftar akun toko mitra developer dalam 1 menit</span>
                            </div>
                            <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center space-x-3">
                                <div className="w-7 h-7 rounded-full bg-blue-600/30 text-blue-400 font-bold text-xs flex items-center justify-center shrink-0">2</div>
                                <span className="text-xs font-medium text-slate-200">Unggah file link Google Drive atau repository GitHub</span>
                            </div>
                            <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center space-x-3">
                                <div className="w-7 h-7 rounded-full bg-emerald-600/30 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">3</div>
                                <span className="text-xs font-medium text-slate-200">Terima pendapatan bersih 90% langsung ke rekening Anda</span>
                            </div>
                        </div>

                    </div>

                    <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                        <span>Pendaftaran Gratis & Instan</span>
                        <span className="text-blue-400 font-bold">10% Platform Fee Only</span>
                    </div>

                </div>

                {/* ═══════════════════════════════════════════════════════
                    2. RIGHT REGISTRATION FORM PANEL
                   ═══════════════════════════════════════════════════════ */}
                <div className="lg:w-[48%] p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-white overflow-y-auto">
                    
                    <div className="flex items-center justify-between pb-4">
                        <span className="text-xs text-slate-500">
                            Sudah punya akun seller?{' '}
                            <Link href="/seller/login" className="font-bold text-[#2563EB] hover:underline">
                                Masuk Seller
                            </Link>
                        </span>
                    </div>

                    <div className="my-auto py-4 max-w-md w-full mx-auto space-y-5">
                        
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                                Buka Toko Developer
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-500 mt-1">
                                Daftarkan studio software Anda untuk mulai berjualan.
                            </p>
                        </div>

                        {/* 1-Click Google OAuth for Developer */}
                        <a
                            href="/seller/auth/google"
                            className="w-full h-11 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center space-x-2.5 transition-all shadow-xs"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                            </svg>
                            <span>Daftar Instan dengan Akun Google</span>
                        </a>

                        <div className="flex items-center space-x-3 text-slate-300">
                            <div className="flex-1 border-b border-slate-200" />
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">atau dengan email</span>
                            <div className="flex-1 border-b border-slate-200" />
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                            
                            <div>
                                <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                                    Nama Lengkap Developer
                                </label>
                                <div className="relative">
                                    <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input 
                                        type="text"
                                        required
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Nama lengkap Anda"
                                        className="w-full h-10.5 pl-10 pr-3.5 text-xs bg-white border border-[#CBD5E1] rounded-xl text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:ring-3 focus:ring-blue-500/10 font-medium"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                                    Nama Toko / Studio Software
                                </label>
                                <div className="relative">
                                    <Store className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input 
                                        type="text"
                                        required
                                        value={data.store_name}
                                        onChange={(e) => setData('store_name', e.target.value)}
                                        placeholder="Contoh: Nexa Code Labs"
                                        className="w-full h-10.5 pl-10 pr-3.5 text-xs bg-white border border-[#CBD5E1] rounded-xl text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:ring-3 focus:ring-blue-500/10 font-medium"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                                    Email Akun Mitra
                                </label>
                                <div className="relative">
                                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input 
                                        type="email"
                                        required
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="developer@gmail.com"
                                        className="w-full h-10.5 pl-10 pr-3.5 text-xs bg-white border border-[#CBD5E1] rounded-xl text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:ring-3 focus:ring-blue-500/10 font-medium"
                                    />
                                </div>
                                {errors.email && <span className="text-[11px] text-red-600 mt-1 block">{errors.email}</span>}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                                    Kata Sandi
                                </label>
                                <div className="relative">
                                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input 
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Minimal 6 karakter"
                                        className="w-full h-10.5 pl-10 pr-10 text-xs bg-white border border-[#CBD5E1] rounded-xl text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:ring-3 focus:ring-blue-500/10 font-medium"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="w-8 h-8 rounded-lg absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 flex items-center justify-center cursor-pointer"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full h-11.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF] text-white text-sm font-bold shadow-md shadow-blue-500/20 flex items-center justify-center space-x-2 transition-all cursor-pointer disabled:opacity-50"
                                >
                                    {processing ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            <span>Mendaftarkan Studio...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Store className="w-4 h-4" />
                                            <span>Buka Toko Mitra Sekarang</span>
                                        </>
                                    )}
                                </button>
                            </div>

                        </form>

                    </div>

                    <div className="text-center text-[11px] text-slate-400 font-medium pt-4">
                        KyySolutions Mitra Ecosystem
                    </div>

                </div>

            </div>
        </div>
    );
}
