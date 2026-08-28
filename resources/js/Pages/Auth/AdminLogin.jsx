import { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { 
    Lock, 
    Mail, 
    Eye, 
    EyeOff, 
    ShieldCheck, 
    ChartNoAxesCombined, 
    UsersRound, 
    WalletCards, 
    LockKeyhole,
    Globe,
    Loader2
} from 'lucide-react';

export default function AdminLogin() {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        email: 'admin@kyysolutions.com',
        password: 'password',
        remember: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/login');
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-3 sm:p-5 lg:p-6 antialiased selection:bg-blue-600 selection:text-white font-sans">
            <Head title="Super Admin Secure Login — KyySolutions Operational Command Center" />

            {/* Split Screen Master Frame */}
            <div className="w-full max-w-[1440px] min-h-[calc(100vh-36px)] sm:min-h-[calc(100vh-48px)] bg-white rounded-2xl sm:rounded-[22px] border border-slate-200/80 shadow-2xl overflow-hidden flex flex-col lg:flex-row">
                
                {/* ═══════════════════════════════════════════════════════
                    1. LEFT HERO BRAND PANEL (58% desktop ratio)
                   ═══════════════════════════════════════════════════════ */}
                <div className="lg:w-[58%] bg-gradient-to-b from-[#06152E] via-[#071A38] to-[#041126] p-8 sm:p-12 lg:p-14 xl:p-16 text-white flex flex-col justify-between relative overflow-hidden">
                    
                    {/* Background Visual Elements & Glows */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
                    
                    {/* Top Brand Area */}
                    <div className="relative z-10">
                        <div className="flex items-center space-x-3.5 group">
                            <img 
                                src="/images/logo/logo_no_bg.png" 
                                alt="KyySolutions" 
                                className="h-10 sm:h-11 w-auto object-contain" 
                            />
                            <div className="flex flex-col">
                                <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
                                    Kyy<span className="text-[#60A5FA]">Solutions</span>
                                </span>
                                <span className="text-[10px] font-semibold text-blue-300/80 tracking-widest uppercase -mt-0.5">
                                    Operational Command Center
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Middle Main Content */}
                    <div className="relative z-10 my-8 sm:my-10 space-y-8">
                        
                        {/* Eyebrow Badge */}
                        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-blue-500/20 border border-blue-400/20 text-[#60A5FA] text-xs font-bold tracking-wide uppercase">
                            <ShieldCheck className="w-4 h-4 text-[#60A5FA]" />
                            <span>Panel Super Administrator</span>
                        </div>

                        {/* Heading & Description */}
                        <div className="space-y-3">
                            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black text-white leading-[1.15] tracking-tight max-w-[540px]">
                                Pusat Kontrol & Tata Kelola Platform KyySolutions
                            </h1>
                            <p className="text-sm sm:text-base text-[#D5DEEB] leading-relaxed max-w-[480px]">
                                Akses terbatas untuk monitoring transaksi, verifikasi mitra seller, manajemen katalog software, dan analitik performa ekosistem secara real-time.
                            </p>
                        </div>

                        {/* 3 Vertical Feature Cards */}
                        <div className="space-y-3 pt-2 max-w-[440px]">
                            
                            {/* Card 1: Revenue Monitoring */}
                            <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.06] transition-colors flex items-start space-x-3.5">
                                <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-[#60A5FA] flex items-center justify-center shrink-0 border border-blue-500/20">
                                    <ChartNoAxesCombined className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-xs font-bold text-white">Monitoring Finansial & Komisi</h3>
                                    <p className="text-[11px] text-[#8EA0B8] leading-normal mt-0.5">
                                        Pantau omset marketplace, bagi hasil 90% seller, dan komisi 10% platform secara akurat.
                                    </p>
                                </div>
                            </div>

                            {/* Card 2: Moderasi Produk & Seller */}
                            <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.06] transition-colors flex items-start space-x-3.5">
                                <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-[#A78BFA] flex items-center justify-center shrink-0 border border-purple-500/20">
                                    <UsersRound className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-xs font-bold text-white">Moderasi Produk & Verifikasi Mitra</h3>
                                    <p className="text-[11px] text-[#8EA0B8] leading-normal mt-0.5">
                                        Persetujuan software baru, kontrol lisensi kode sumber, dan verifikasi identitas developer.
                                    </p>
                                </div>
                            </div>

                            {/* Card 3: Kontrol Payout */}
                            <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.06] transition-colors flex items-start space-x-3.5">
                                <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-[#4ADE80] flex items-center justify-center shrink-0 border border-emerald-500/20">
                                    <WalletCards className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-xs font-bold text-white">Otorisasi Penarikan Saldo (Withdrawal)</h3>
                                    <p className="text-[11px] text-[#8EA0B8] leading-normal mt-0.5">
                                        Pencairan dana transfer bank mitra seller dengan audit keamanan berlapis.
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>

                    {/* Bottom Security Footer */}
                    <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#8EA0B8]">
                        <span>© {new Date().getFullYear()} KyySolutions Inc.</span>
                        <span className="font-mono text-[11px] text-blue-300/70">SECURE LEVEL 4 ENCRYPTION</span>
                    </div>

                </div>

                {/* ═══════════════════════════════════════════════════════
                    2. RIGHT LOGIN PANEL (42% desktop ratio)
                   ═══════════════════════════════════════════════════════ */}
                <div className="lg:w-[42%] p-6 sm:p-10 lg:p-12 xl:p-14 flex flex-col justify-between bg-white overflow-y-auto">
                    
                    {/* Top Switcher */}
                    <div className="flex items-center justify-between pb-4">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            Super Admin Authentication
                        </span>
                        <Link href="/login" className="text-xs font-bold text-[#2563EB] hover:underline">
                            Portal Pengguna
                        </Link>
                    </div>

                    {/* Form Center */}
                    <div className="my-auto py-6 max-w-md w-full mx-auto space-y-6">
                        
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                                Masuk Super Admin
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-500 mt-1">
                                Masukkan kredensial administrator resmi untuk mengelola seluruh sistem.
                            </p>
                        </div>

                        {/* Error Alert */}
                        {errors.email && (
                            <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-medium">
                                {errors.email}
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                            
                            {/* Email */}
                            <div>
                                <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
                                    Email Administrator
                                </label>
                                <div className="relative">
                                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input 
                                        type="email"
                                        required
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="admin@kyysolutions.com"
                                        className="w-full h-11 pl-10 pr-3.5 text-xs sm:text-sm bg-white border border-[#CBD5E1] rounded-xl text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:ring-3 focus:ring-blue-500/10 font-medium"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
                                    Kata Sandi
                                </label>
                                <div className="relative">
                                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input 
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full h-11 pl-10 pr-10 text-xs sm:text-sm bg-white border border-[#CBD5E1] rounded-xl text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:ring-3 focus:ring-blue-500/10 font-medium"
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

                            {/* Remember Me */}
                            <div className="pt-1">
                                <label className="flex items-center space-x-2 cursor-pointer select-none">
                                    <input 
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="w-4 h-4 rounded border-[#CBD5E1] text-[#2563EB] focus:ring-blue-500 cursor-pointer"
                                    />
                                    <span className="text-xs font-medium text-slate-700">Ingat sesi login administrator</span>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full h-12 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF] text-white text-sm font-bold shadow-md shadow-blue-500/20 flex items-center justify-center space-x-2 transition-all cursor-pointer disabled:opacity-50"
                                >
                                    {processing ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            <span>Mengotentikasi...</span>
                                        </>
                                    ) : (
                                        <>
                                            <LockKeyhole className="w-4 h-4" />
                                            <span>Masuk ke Panel Super Admin</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Back to Home */}
                            <div className="pt-2">
                                <Link
                                    href="/"
                                    className="w-full h-11 rounded-xl bg-slate-50 hover:bg-slate-100 border border-[#CBD5E1] text-[#0F172A] text-xs font-bold flex items-center justify-center space-x-2 transition-colors"
                                >
                                    <Globe className="w-4 h-4 text-slate-500" />
                                    <span>Kembali ke Halaman Utama</span>
                                </Link>
                            </div>

                        </form>

                    </div>

                    {/* Bottom Info */}
                    <div className="text-center text-[11px] text-slate-400 font-medium pt-4">
                        Khusus untuk staf operasional internal KyySolutions.
                    </div>

                </div>

            </div>
        </div>
    );
}
