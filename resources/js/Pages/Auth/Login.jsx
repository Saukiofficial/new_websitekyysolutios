import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    ShieldCheck, 
    Mail, 
    Lock, 
    LockKeyhole, 
    Eye, 
    EyeOff, 
    KeyRound, 
    TrendingUp, 
    Globe, 
    ArrowLeft, 
    ChartNoAxesCombined, 
    UsersRound, 
    WalletCards, 
    CheckCircle2, 
    AlertCircle,
    Loader2
} from 'lucide-react';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [otpSent, setOtpSent] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        email: 'admin@kyysolutions.com',
        password: 'password123',
        otp: '',
        remember: true,
    });

    const handleSendOtp = () => {
        setOtpSent(true);
        setData('otp', '884210');
    };

    const fillAdminCredentials = () => {
        setData({
            email: 'admin@kyysolutions.com',
            password: 'password123',
            otp: '884210',
            remember: true,
        });
        setOtpSent(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] p-3 sm:p-5 lg:p-6 flex items-center justify-center font-sans antialiased selection:bg-[#2563EB] selection:text-white">
            <Head>
                <title>Masuk Super Admin — KyySolutions</title>
            </Head>

            {/* Split Screen Master Container */}
            <div className="w-full max-w-[1560px] min-h-[calc(100vh-40px)] flex flex-col lg:flex-row bg-white rounded-2xl lg:rounded-3xl border border-[#E2E8F0] shadow-sm overflow-hidden">
                
                {/* ═══════════════════════════════════════════════════════
                    1. LEFT DARK BRAND & HERO PANEL (58% desktop ratio)
                   ═══════════════════════════════════════════════════════ */}
                <div 
                    className="hidden lg:flex lg:w-[56%] xl:w-[58%] flex-col justify-between p-8 xl:p-12 2xl:p-14 relative overflow-hidden text-white shrink-0"
                    style={{
                        background: 'linear-gradient(180deg, #06152E 0%, #071A38 52%, #041126 100%)',
                    }}
                >
                    {/* Background Subtle Highlights & Glows */}
                    <div className="absolute top-0 right-0 w-[450px] h-[350px] bg-blue-600/15 blur-[100px] pointer-events-none" />
                    <div className="absolute bottom-10 left-10 w-[350px] h-[250px] bg-indigo-600/10 blur-[80px] pointer-events-none" />

                    {/* Subtle Blueprint Grid Pattern */}
                    <div 
                        className="absolute inset-0 opacity-[0.035] pointer-events-none"
                        style={{
                            backgroundImage: 'radial-gradient(circle at 1px 1px, #60A5FA 1px, transparent 0)',
                            backgroundSize: '24px 24px'
                        }}
                    />

                    {/* Top Left: Brand Area */}
                    <div className="relative z-10">
                        <Link href="/" className="inline-flex items-center space-x-3 group">
                            <img 
                                src="/images/logo/logo_no_bg.png" 
                                alt="KyySolutions Logo" 
                                className="h-10 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform" 
                            />
                            <span className="font-extrabold text-xl text-white tracking-tight">
                                Kyy<span className="text-[#3B82F6]">Solutions</span>
                            </span>
                        </Link>
                    </div>

                    {/* Middle Section: Hero Copy & Feature Cards + Visual Layout */}
                    <div className="my-auto py-8 relative z-10 grid grid-cols-1 xl:grid-cols-12 gap-8 items-center">
                        
                        {/* Copy & Feature Cards (7 cols) */}
                        <div className="xl:col-span-7 space-y-6">
                            
                            {/* Eyebrow Badge */}
                            <div className="inline-flex items-center space-x-2 h-8 px-3 rounded-md bg-blue-600/20 border border-blue-400/20 text-[#60A5FA] text-xs font-semibold tracking-wide">
                                <ShieldCheck className="w-4 h-4 text-[#60A5FA]" />
                                <span>PANEL SUPER ADMIN</span>
                            </div>

                            {/* Hero Title */}
                            <h1 className="text-3xl xl:text-4xl 2xl:text-[44px] font-bold text-white tracking-tight leading-[1.15] max-w-[500px]">
                                Panel Super Admin <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-blue-300">
                                    KyySolutions
                                </span>
                            </h1>

                            {/* Hero Description */}
                            <p className="text-sm xl:text-base text-[#D5DEEB] leading-relaxed max-w-[460px]">
                                Kelola marketplace, layanan, produk digital, seller, transaksi, dan operasional platform dalam satu pusat kontrol.
                            </p>

                            {/* 3 Vertical Feature Cards */}
                            <div className="space-y-3 pt-2 max-w-[420px]">
                                
                                {/* Card 1: Revenue Monitoring */}
                                <div className="p-3.5 rounded-xl bg-white/[0.035] border border-white/[0.07] hover:bg-white/[0.055] transition-colors flex items-start space-x-3.5">
                                    <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-[#60A5FA] flex items-center justify-center shrink-0 border border-blue-500/20">
                                        <ChartNoAxesCombined className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-xs font-bold text-white">Monitoring Revenue</h3>
                                        <p className="text-[11px] text-[#8EA0B8] leading-normal mt-0.5">
                                            Pantau pendapatan, order, dan performa platform secara real-time.
                                        </p>
                                    </div>
                                </div>

                                {/* Card 2: Moderasi Produk & Seller */}
                                <div className="p-3.5 rounded-xl bg-white/[0.035] border border-white/[0.07] hover:bg-white/[0.055] transition-colors flex items-start space-x-3.5">
                                    <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-[#A78BFA] flex items-center justify-center shrink-0 border border-purple-500/20">
                                        <UsersRound className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-xs font-bold text-white">Moderasi Produk & Seller</h3>
                                        <p className="text-[11px] text-[#8EA0B8] leading-normal mt-0.5">
                                            Kelola dan moderasi produk, seller, serta konten untuk menjaga kualitas platform.
                                        </p>
                                    </div>
                                </div>

                                {/* Card 3: Kontrol Pembayaran & Withdrawal */}
                                <div className="p-3.5 rounded-xl bg-white/[0.035] border border-white/[0.07] hover:bg-white/[0.055] transition-colors flex items-start space-x-3.5">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-[#4ADE80] flex items-center justify-center shrink-0 border border-emerald-500/20">
                                        <WalletCards className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-xs font-bold text-white">Kontrol Pembayaran & Withdrawal</h3>
                                        <p className="text-[11px] text-[#8EA0B8] leading-normal mt-0.5">
                                            Kontrol pembayaran, komisi, dan withdrawal dengan sistem yang aman dan transparan.
                                        </p>
                                    </div>
                                </div>

                            </div>

                        </div>

                        {/* Visual Analytics Floating Illustration (5 cols) */}
                        <div className="xl:col-span-5 hidden 2xl:flex flex-col items-center justify-center relative min-h-[380px]">
                            
                            {/* Card 1: Mini Total Orders Card (Floating Top-Right) */}
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="absolute top-2 right-4 p-3.5 rounded-xl bg-white/95 text-slate-900 border border-white/40 shadow-xl w-36 z-20 backdrop-blur-md rotate-2"
                            >
                                <span className="text-[10px] font-semibold text-slate-500 block">Total Orders</span>
                                <span className="text-base font-black text-slate-900 font-mono block mt-0.5">3.842</span>
                                <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center mt-0.5">
                                    <TrendingUp className="w-3 h-3 mr-0.5" /> +12.4%
                                </span>
                            </motion.div>

                            {/* Card 2: Main Revenue Card (Middle) */}
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="w-72 p-5 rounded-2xl bg-white/95 text-slate-900 border border-white/40 shadow-2xl z-10 backdrop-blur-md -rotate-2"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-semibold text-slate-500">Total Revenue</span>
                                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">+18.6%</span>
                                </div>
                                <div className="text-lg font-black text-[#0F172A] font-mono">
                                    Rp 1.248.750.000
                                </div>

                                {/* Upward Blue Chart Path */}
                                <div className="h-16 w-full mt-3 relative">
                                    <svg className="w-full h-full overflow-visible" viewBox="0 0 200 60">
                                        <defs>
                                            <linearGradient id="miniArea" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.3" />
                                                <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                                            </linearGradient>
                                        </defs>
                                        <path d="M 0,55 L 30,45 L 60,48 L 90,32 L 120,35 L 150,18 L 200,8 L 200,60 L 0,60 Z" fill="url(#miniArea)" />
                                        <path d="M 0,55 L 30,45 L 60,48 L 90,32 L 120,35 L 150,18 L 200,8" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
                                    </svg>
                                </div>
                            </motion.div>

                            {/* Card 3: Mini Donut Breakdown (Bottom Left) */}
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="absolute bottom-0 left-2 p-3 rounded-xl bg-white/95 text-slate-900 border border-white/40 shadow-xl w-48 z-20 backdrop-blur-md rotate-1"
                            >
                                <span className="text-[10px] font-bold text-slate-700 block mb-1.5">Sumber Revenue</span>
                                <div className="space-y-1 text-[9px] font-medium text-slate-600">
                                    <div className="flex justify-between items-center">
                                        <span className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mr-1" /> Produk Digital</span>
                                        <span className="font-mono font-bold">63%</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] mr-1" /> Services</span>
                                        <span className="font-mono font-bold">25%</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mr-1" /> Marketplace</span>
                                        <span className="font-mono font-bold">12%</span>
                                    </div>
                                </div>
                            </motion.div>

                        </div>

                    </div>

                    {/* Bottom Security Note */}
                    <div className="relative z-10 pt-4 border-t border-white/10 flex items-center space-x-2 text-xs text-[#8EA0B8]">
                        <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                        <span>Keamanan tingkat enterprise untuk melindungi data dan operasional platform.</span>
                    </div>

                </div>

                {/* ═══════════════════════════════════════════════════════
                    2. RIGHT LOGIN AREA (42% desktop ratio)
                   ═══════════════════════════════════════════════════════ */}
                <div className="flex-1 bg-[#F8FAFC] p-6 sm:p-10 lg:p-12 xl:p-14 flex flex-col justify-between overflow-y-auto">
                    
                    {/* Top Controls: Secure Badge + 1-Click Demo Fill */}
                    <div className="flex items-center justify-between gap-3 mb-6">
                        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-white border border-[#E2E8F0] text-xs font-semibold text-slate-700 shadow-2xs">
                            <LockKeyhole className="w-3.5 h-3.5 text-[#2563EB]" />
                            <span>Secure Admin Access</span>
                        </div>

                        <button
                            type="button"
                            onClick={fillAdminCredentials}
                            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 text-[#2563EB] text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                        >
                            <span>1-Click Auto Fill</span>
                        </button>
                    </div>

                    {/* Login Card Container */}
                    <div className="w-full max-w-[480px] mx-auto my-auto bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-9 shadow-md shadow-slate-900/4">
                        
                        {/* Security Icon Circle */}
                        <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 rounded-full bg-[#EFF6FF] border-4 border-blue-50 flex items-center justify-center text-[#2563EB] shadow-xs">
                                <ShieldCheck className="w-8 h-8 text-[#2563EB]" />
                            </div>
                        </div>

                        {/* Heading & Subtitle */}
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight">
                                Masuk Super Admin
                            </h2>
                            <p className="text-xs sm:text-sm text-[#64748B] mt-1 font-medium">
                                Masuk untuk mengakses panel administrasi KyySolutions.
                            </p>
                        </div>

                        {/* Generic Login Error Alert */}
                        {errors.email && (
                            <div className="mb-5 p-3 rounded-xl bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B] text-xs flex items-start space-x-2">
                                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                                <div>
                                    <div className="font-bold">Login gagal</div>
                                    <div>{errors.email}</div>
                                </div>
                            </div>
                        )}

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="space-y-4 text-left">
                            
                            {/* 1. Email Field */}
                            <div>
                                <label className="text-xs font-semibold text-[#0F172A] block mb-1.5">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="email"
                                        required
                                        autoComplete="username"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="admin@kyysolutions.com"
                                        className="w-full h-11 pl-10 pr-3.5 text-xs sm:text-sm bg-white border border-[#CBD5E1] rounded-xl text-[#0F172A] focus:outline-none focus:border-[#60A5FA] focus:ring-3 focus:ring-blue-500/10 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            {/* 2. Password Field */}
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label className="text-xs font-semibold text-[#0F172A]">
                                        Password
                                    </label>
                                    <a href="#" className="text-xs font-semibold text-[#2563EB] hover:underline">
                                        Lupa password?
                                    </a>
                                </div>
                                <div className="relative">
                                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        autoComplete="current-password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full h-11 pl-10 pr-10 text-xs sm:text-sm bg-white border border-[#CBD5E1] rounded-xl text-[#0F172A] focus:outline-none focus:border-[#60A5FA] focus:ring-3 focus:ring-blue-500/10 transition-all font-medium"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="w-8 h-8 rounded-lg absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* 3. OTP Code Field (Optional Security Token) */}
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label className="text-xs font-semibold text-[#0F172A] flex items-center space-x-1">
                                        <span>Kode Verifikasi / OTP</span>
                                        <span className="text-[10px] text-slate-400 font-normal">(Opsional)</span>
                                    </label>
                                    {!otpSent ? (
                                        <button
                                            type="button"
                                            onClick={handleSendOtp}
                                            className="text-xs font-bold text-[#2563EB] hover:underline cursor-pointer"
                                        >
                                            Kirim OTP
                                        </button>
                                    ) : (
                                        <span className="text-[10px] font-bold text-emerald-600 flex items-center">
                                            <CheckCircle2 className="w-3 h-3 mr-0.5" /> OTP Terkirim (884210)
                                        </span>
                                    )}
                                </div>
                                <div className="relative">
                                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        autoComplete="one-time-code"
                                        value={data.otp}
                                        onChange={(e) => setData('otp', e.target.value)}
                                        placeholder="Masukkan 6-digit kode OTP"
                                        className="w-full h-11 pl-10 pr-3.5 text-xs sm:text-sm bg-white border border-[#CBD5E1] rounded-xl text-[#0F172A] focus:outline-none focus:border-[#60A5FA] focus:ring-3 focus:ring-blue-500/10 transition-all font-mono"
                                    />
                                </div>
                            </div>

                            {/* 4. Remember Me */}
                            <div className="pt-1">
                                <label className="flex items-center space-x-2 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="w-4 h-4 rounded border-[#CBD5E1] text-[#2563EB] focus:ring-blue-500 cursor-pointer"
                                    />
                                    <span className="text-xs font-medium text-slate-700">Ingat saya</span>
                                </label>
                            </div>

                            {/* 5. Primary Login Button */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full h-12 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF] text-white text-sm font-bold shadow-md shadow-blue-500/20 flex items-center justify-center space-x-2 transition-all cursor-pointer disabled:opacity-50"
                                >
                                    {processing ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            <span>Memverifikasi...</span>
                                        </>
                                    ) : (
                                        <>
                                            <LockKeyhole className="w-4 h-4" />
                                            <span>Masuk ke Dashboard</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* 6. Secondary Website Button */}
                            <div>
                                <Link
                                    href="/"
                                    className="w-full h-11 rounded-xl bg-white hover:bg-slate-50 border border-[#CBD5E1] text-[#0F172A] text-xs font-bold flex items-center justify-center space-x-2 transition-colors"
                                >
                                    <Globe className="w-4 h-4 text-slate-500" />
                                    <span>Kembali ke Website</span>
                                </Link>
                            </div>

                            {/* 7. Bottom Security Note */}
                            <div className="pt-3 text-center">
                                <p className="text-[11px] text-[#64748B] flex items-center justify-center space-x-1 font-medium">
                                    <Lock className="w-3 h-3 text-slate-400 shrink-0" />
                                    <span>Akses terbatas hanya untuk administrator yang berwenang.</span>
                                </p>
                            </div>

                        </form>

                    </div>

                    {/* Bottom Copyright */}
                    <div className="text-center text-[11px] text-slate-400 font-medium mt-6">
                        © {new Date().getFullYear()} KyySolutions Platform. All rights reserved.
                    </div>

                </div>

            </div>
        </div>
    );
}
