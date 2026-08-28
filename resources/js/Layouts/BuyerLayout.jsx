import { useState } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { 
    Home, 
    ShoppingBag, 
    FileText, 
    Heart,
    Activity, 
    Download, 
    Settings, 
    HelpCircle, 
    Moon, 
    LogOut, 
    Search, 
    ShoppingCart, 
    Bell, 
    ChevronDown, 
    Compass, 
    Globe, 
    ShieldCheck
} from 'lucide-react';

export default function BuyerLayout({ children, activeTab = 'products' }) {
    const { url } = usePage();
    const [searchQuery, setSearchQuery] = useState('');

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans">
            
            {/* 1. TOP NAVIGATION BAR (Height 70px) */}
            <header className="sticky top-0 z-40 bg-white border-b border-[#E2E8F0] shadow-xs">
                <div className="w-full px-4 sm:px-6 lg:px-8 h-[70px] flex items-center justify-between gap-4">
                    
                    {/* Left: Logo & Marketplace Quick Link */}
                    <div className="flex items-center space-x-5 shrink-0">
                        <Link href="/" className="flex items-center space-x-2.5">
                            <img
                                src="/images/logo/logo_no_bg.png"
                                alt="KyySolutions"
                                className="h-8 w-auto object-contain"
                            />
                            <span className="text-base font-bold tracking-tight text-[#0F172A]">
                                Kyy<span className="text-[#2563EB]">Solutions</span>
                            </span>
                        </Link>

                        <div className="hidden md:flex items-center pl-5 border-l border-[#E2E8F0]">
                            <Link 
                                href="/marketplace" 
                                className="px-3 py-1.5 rounded-xl border border-[#E2E8F0] hover:border-[#2563EB] hover:bg-blue-50/50 text-slate-700 hover:text-[#2563EB] text-xs font-bold transition-all flex items-center space-x-1.5"
                            >
                                <ShoppingBag className="w-3.5 h-3.5 text-[#2563EB]" />
                                <span>Katalog Marketplace</span>
                            </Link>
                        </div>
                    </div>

                    {/* Center: Global Search Bar */}
                    <div className="hidden lg:flex flex-1 max-w-[500px] mx-4">
                        <div className="relative w-full">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari software, template, atau fitur..."
                                className="w-full h-[42px] pl-10 pr-12 bg-white border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/10 transition-all"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded border border-slate-200 bg-slate-50 text-[10px] font-mono text-slate-400 font-bold">
                                ⌘K
                            </span>
                        </div>
                    </div>

                    {/* Right: CTA, Cart, Notifications & Profile Dropdown */}
                    <div className="flex items-center space-x-3 shrink-0">
                        
                        {/* Primary CTA */}
                        <Link
                            href="/marketplace"
                            className="hidden sm:inline-flex items-center space-x-1.5 px-4 h-[42px] rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-sm shadow-blue-500/20 transition-all cursor-pointer"
                        >
                            <Compass className="w-4 h-4" />
                            <span>Eksplor Software Baru</span>
                        </Link>

                        {/* Wishlist Button */}
                        <Link
                            href="/dashboard/wishlist"
                            className={`w-10 h-10 rounded-xl border border-[#E2E8F0] hover:bg-slate-50 flex items-center justify-center transition-colors ${
                                url.includes('wishlist') ? 'text-rose-600 bg-rose-50 border-rose-200' : 'text-slate-600 hover:text-rose-600'
                            }`}
                            title="Wishlist & Tersimpan"
                        >
                            <Heart className="w-4 h-4" />
                        </Link>

                        {/* Cart Button */}
                        <Link
                            href="/marketplace"
                            className="w-10 h-10 rounded-xl border border-[#E2E8F0] hover:bg-slate-50 flex items-center justify-center text-slate-600 hover:text-[#2563EB] transition-colors relative"
                            title="Keranjang"
                        >
                            <ShoppingCart className="w-4 h-4" />
                        </Link>

                        {/* Notifications */}
                        <button
                            className="w-10 h-10 rounded-xl border border-[#E2E8F0] hover:bg-slate-50 flex items-center justify-center text-slate-600 hover:text-[#2563EB] transition-colors relative"
                            title="Notifikasi"
                        >
                            <Bell className="w-4 h-4" />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#2563EB] rounded-full ring-2 ring-white" />
                        </button>

                        {/* User Profile Pill */}
                        <div className="flex items-center space-x-2.5 pl-2">
                            <div className="w-9 h-9 rounded-full bg-[#2563EB] text-white font-bold flex items-center justify-center text-xs shadow-xs">
                                U
                            </div>
                            <div className="hidden md:block text-left leading-tight">
                                <div className="text-xs font-bold text-[#0F172A]">User Buyer</div>
                                <div className="text-[10px] font-semibold text-emerald-600">Verified Buyer</div>
                            </div>
                        </div>

                    </div>

                </div>
            </header>

            {/* 2. BODY CONTAINER WITH SLIM LEFT ICON RAIL + MAIN CONTENT */}
            <div className="flex-1 flex w-full">
                
                {/* Slim Left Icon Rail (Width 74px) */}
                <aside className="hidden md:flex flex-col justify-between items-center w-[74px] bg-white border-r border-[#E2E8F0] py-6 shrink-0">
                    
                    {/* Top Icons */}
                    <div className="flex flex-col items-center space-y-3">
                        <Link
                            href="/"
                            className="w-11 h-11 rounded-xl flex items-center justify-center text-slate-500 hover:text-[#2563EB] hover:bg-slate-50 transition-colors"
                            title="Beranda Website"
                        >
                            <Home className="w-5 h-5" />
                        </Link>

                        <Link
                            href="/dashboard/my-products"
                            className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                                url.includes('my-products') || url === '/dashboard'
                                    ? 'bg-[#EFF6FF] text-[#2563EB]'
                                    : 'text-slate-500 hover:text-[#2563EB] hover:bg-slate-50'
                            }`}
                            title="Produk & Lisensi Saya"
                        >
                            <ShoppingBag className="w-5 h-5" />
                        </Link>

                        <Link
                            href="/dashboard/orders"
                            className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                                url.includes('orders')
                                    ? 'bg-[#EFF6FF] text-[#2563EB]'
                                    : 'text-slate-500 hover:text-[#2563EB] hover:bg-slate-50'
                            }`}
                            title="Riwayat Faktur Transaksi"
                        >
                            <FileText className="w-5 h-5" />
                        </Link>

                        <Link
                            href="/dashboard/wishlist"
                            className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                                url.includes('wishlist')
                                    ? 'bg-rose-50 text-rose-600'
                                    : 'text-slate-500 hover:text-rose-600 hover:bg-slate-50'
                            }`}
                            title="Wishlist & Software Favorit"
                        >
                            <Heart className="w-5 h-5" />
                        </Link>

                        <Link
                            href="/dashboard/my-products"
                            className="w-11 h-11 rounded-xl flex items-center justify-center text-slate-500 hover:text-[#2563EB] hover:bg-slate-50 transition-colors"
                            title="Aktivitas Akun"
                        >
                            <Activity className="w-5 h-5" />
                        </Link>

                        <Link
                            href="/dashboard/my-products"
                            className="w-11 h-11 rounded-xl flex items-center justify-center text-slate-500 hover:text-[#2563EB] hover:bg-slate-50 transition-colors"
                            title="Unduhan & File"
                        >
                            <Download className="w-5 h-5" />
                        </Link>

                        <Link
                            href="/dashboard/my-products"
                            className="w-11 h-11 rounded-xl flex items-center justify-center text-slate-500 hover:text-[#2563EB] hover:bg-slate-50 transition-colors"
                            title="Pengaturan Akun"
                        >
                            <Settings className="w-5 h-5" />
                        </Link>

                        <Link
                            href="/marketplace"
                            className="w-11 h-11 rounded-xl flex items-center justify-center text-slate-500 hover:text-[#2563EB] hover:bg-slate-50 transition-colors"
                            title="Bantuan & FAQ"
                        >
                            <HelpCircle className="w-5 h-5" />
                        </Link>
                    </div>

                    {/* Bottom Utility Icons */}
                    <div className="flex flex-col items-center space-y-3 pt-6 border-t border-slate-100">
                        <button
                            className="w-11 h-11 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                            title="Mode Tampilan"
                        >
                            <Moon className="w-5 h-5" />
                        </button>

                        <button
                            onClick={handleLogout}
                            className="w-11 h-11 rounded-xl flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Keluar"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>

                </aside>

                {/* Main Content Pane */}
                <main className="flex-1 px-4 sm:px-8 py-7 max-w-[1360px] mx-auto w-full">
                    {children}
                </main>

            </div>

            {/* 3. ELEGANT FOOTER */}
            <footer className="bg-white border-t border-[#E2E8F0] py-5 px-6 sm:px-10 text-xs text-slate-500">
                <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p>© 2026 KyySolutions Platform. Seluruh hak cipta dilindungi.</p>
                    
                    <div className="flex flex-wrap items-center space-x-4 text-xs font-medium text-slate-600">
                        <Link href="/terms" className="hover:text-[#2563EB] transition-colors">Kebijakan Privasi</Link>
                        <span>|</span>
                        <Link href="/terms" className="hover:text-[#2563EB] transition-colors">Syarat & Ketentuan</Link>
                        <span>|</span>
                        <Link href="/marketplace" className="hover:text-[#2563EB] transition-colors">Bantuan</Link>
                        <span>|</span>
                        <div className="flex items-center space-x-1 text-slate-700 font-semibold cursor-pointer">
                            <Globe className="w-3.5 h-3.5" />
                            <span>Bahasa Indonesia</span>
                            <ChevronDown className="w-3 h-3 ml-0.5" />
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    );
}
