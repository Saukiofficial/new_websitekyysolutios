import { useState } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { 
    Package, 
    ShoppingCart, 
    ArrowLeft, 
    LogOut, 
    User, 
    ExternalLink, 
    CheckCircle2, 
    Sparkles, 
    ShieldCheck,
    ChevronRight,
    ShoppingBag
} from 'lucide-react';

export default function UserDashboardLayout({ children, title = 'Dashboard Pembeli', activeTab = 'products' }) {
    const { url } = usePage();

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans">
            
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    
                    {/* Brand Logo */}
                    <div className="flex items-center space-x-6">
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

                        <div className="hidden md:flex items-center space-x-1 pl-4 border-l border-slate-200 text-xs font-semibold text-slate-600">
                            <Link href="/marketplace" className="px-3 py-1.5 rounded-lg hover:bg-slate-100 hover:text-[#2563EB] transition-colors flex items-center space-x-1.5">
                                <ShoppingBag className="w-3.5 h-3.5" />
                                <span>Katalog Marketplace</span>
                            </Link>
                        </div>
                    </div>

                    {/* Right User Profile & Action */}
                    <div className="flex items-center space-x-3">
                        <Link 
                            href="/marketplace"
                            className="hidden sm:inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-blue-50 text-[#2563EB] hover:bg-blue-100 text-xs font-bold transition-colors"
                        >
                            <span>Eksplor Software Baru</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                        </Link>

                        <div className="flex items-center space-x-2.5 pl-3 border-l border-slate-200">
                            <div className="w-8 h-8 rounded-full bg-[#2563EB] text-white font-bold flex items-center justify-center text-xs shadow-sm">
                                U
                            </div>
                            <button
                                onClick={handleLogout}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                                title="Logout Akun"
                            >
                                <LogOut className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                </div>
            </header>

            {/* Sub-Header Banner & Navigation Tabs */}
            <div className="bg-white border-b border-slate-200/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                            <div className="flex items-center space-x-2 text-xs font-medium text-slate-400 mb-1">
                                <Link href="/" className="hover:text-[#2563EB]">Beranda</Link>
                                <span>/</span>
                                <span className="text-slate-600 font-semibold">Portal Pelanggan</span>
                            </div>
                            <h1 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight">
                                {title}
                            </h1>
                        </div>

                        <div className="flex items-center space-x-2 bg-emerald-50 border border-emerald-200/80 px-3.5 py-1.5 rounded-xl self-start sm:self-auto text-xs font-bold text-emerald-800">
                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                            <span>Akun Pembeli Terverifikasi</span>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none">
                        <Link
                            href="/dashboard/my-products"
                            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all shrink-0 ${
                                url.includes('my-products') || url === '/dashboard'
                                    ? 'bg-[#2563EB] text-white shadow-sm shadow-blue-500/20'
                                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                            }`}
                        >
                            <Package className="w-4 h-4" />
                            <span>Produk & Lisensi Saya</span>
                        </Link>

                        <Link
                            href="/dashboard/orders"
                            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all shrink-0 ${
                                url.includes('orders')
                                    ? 'bg-[#2563EB] text-white shadow-sm shadow-blue-500/20'
                                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                            }`}
                        >
                            <ShoppingCart className="w-4 h-4" />
                            <span>Riwayat Faktur Transaksi</span>
                        </Link>
                    </div>

                </div>
            </div>

            {/* Main Page Content */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>

            {/* Simple Clean Footer */}
            <footer className="bg-white border-t border-slate-200/80 py-6 text-center text-xs text-slate-400">
                <div className="max-w-7xl mx-auto px-4">
                    <p>© 2026 KyySolutions Platform. Seluruh hak cipta dilindungi.</p>
                </div>
            </footer>

        </div>
    );
}
