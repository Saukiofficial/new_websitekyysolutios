import { useState } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    Package, 
    WalletCards, 
    Settings, 
    Store, 
    LogOut, 
    ShieldCheck, 
    Bell, 
    Menu, 
    X, 
    CirclePercent,
    User,
    ChevronDown
} from 'lucide-react';

export default function SellerLayout({ children, title = 'Seller Studio', store = {} }) {
    const { url } = usePage();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

    const handleLogout = () => {
        router.post('/logout');
    };

    const navItems = [
        { name: 'Dashboard', href: '/seller/dashboard', icon: LayoutDashboard },
        { name: 'Produk Saya', href: '/seller/products', icon: Package },
        { name: 'Saldo & Penarikan', href: '/seller/withdrawals', icon: WalletCards },
        { name: 'Pengaturan Toko', href: '/seller/settings', icon: Settings },
    ];

    const storeName = store.name || 'KyySolutions Official';

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans selection:bg-[#2563EB] selection:text-white">
            
            {/* 1. TOP HEADER (Section 12, 13, 14, 15) */}
            <header className="sticky top-0 z-40 bg-white border-b border-[#E2E8F0] shadow-xs">
                <div className="w-full px-4 sm:px-6 lg:px-8 h-[68px] flex items-center justify-between gap-4">
                    
                    {/* Left: Mobile Drawer Trigger + Brand Logo with Sub-brand */}
                    <div className="flex items-center space-x-3.5">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
                            aria-label="Toggle menu"
                        >
                            <Menu className="w-5 h-5" />
                        </button>

                        <Link href="/" className="flex items-center space-x-2.5 group">
                            <img
                                src="/images/logo/logo_no_bg.png"
                                alt="KyySolutions"
                                className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
                            />
                            <div className="flex flex-col">
                                <span className="text-[15px] font-extrabold tracking-tight text-[#0F172A] leading-none">
                                    Kyy<span className="text-[#2563EB]">Solutions</span>
                                </span>
                                <span className="text-[9px] font-bold text-slate-400 tracking-[0.14em] uppercase mt-0.5">
                                    SELLER STUDIO
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Right: Verified Badge, Marketplace Button, Notifications, Seller Profile */}
                    <div className="flex items-center space-x-2.5 sm:space-x-3.5">
                        
                        {/* Verified Seller Badge (Section 13) */}
                        <div className="hidden sm:inline-flex items-center space-x-1.5 h-9 px-3.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-xs font-semibold shadow-2xs">
                            <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                            <span>Mitra Developer Terverifikasi</span>
                        </div>

                        {/* Marketplace Button (Section 14) */}
                        <Link
                            href="/marketplace"
                            className="inline-flex items-center space-x-1.5 h-[38px] px-3.5 rounded-[10px] bg-white border border-[#E2E8F0] hover:border-[#BFDBFE] hover:bg-[#F8FAFC] text-xs font-semibold text-[#334155] transition-all shadow-2xs"
                        >
                            <Store className="w-4 h-4 text-slate-500" />
                            <span className="hidden md:inline">Lihat Marketplace</span>
                        </Link>

                        {/* Notification Bell with indicator */}
                        <button 
                            className="relative p-2 rounded-[10px] border border-[#E2E8F0] bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                            aria-label="Notifikasi"
                        >
                            <Bell className="w-4 h-4" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#2563EB] ring-2 ring-white" />
                        </button>

                        {/* Seller Avatar & Profile Menu (Section 15) */}
                        <div className="relative">
                            <button
                                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                className="flex items-center space-x-2 p-1 pl-1.5 rounded-xl border border-transparent hover:border-slate-200 transition-all cursor-pointer"
                            >
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] text-white flex items-center justify-center font-black text-sm shadow-xs">
                                    {storeName.charAt(0) || 'K'}
                                </div>
                                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                            </button>

                            {profileDropdownOpen && (
                                <>
                                    <div 
                                        className="fixed inset-0 z-20" 
                                        onClick={() => setProfileDropdownOpen(false)} 
                                    />
                                    <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl border border-slate-200 shadow-xl py-2 z-30 text-xs">
                                        <div className="px-4 py-2 border-b border-slate-100">
                                            <div className="font-bold text-[#0F172A] truncate">{storeName}</div>
                                            <div className="text-[10px] text-slate-400">Akun Mitra Seller</div>
                                        </div>
                                        <Link 
                                            href="/seller/settings" 
                                            onClick={() => setProfileDropdownOpen(false)}
                                            className="px-4 py-2 hover:bg-slate-50 flex items-center space-x-2 text-slate-700 font-medium"
                                        >
                                            <Settings className="w-3.5 h-3.5 text-slate-400" />
                                            <span>Pengaturan Toko</span>
                                        </Link>
                                        <Link 
                                            href={`/stores/${store.slug || 'kyysolutions-official'}`} 
                                            target="_blank"
                                            onClick={() => setProfileDropdownOpen(false)}
                                            className="px-4 py-2 hover:bg-slate-50 flex items-center space-x-2 text-slate-700 font-medium"
                                        >
                                            <Store className="w-3.5 h-3.5 text-slate-400" />
                                            <span>Lihat Toko Publik</span>
                                        </Link>
                                        <div className="my-1 border-t border-slate-100" />
                                        <button 
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 hover:bg-rose-50 flex items-center space-x-2 text-rose-600 font-bold cursor-pointer"
                                        >
                                            <LogOut className="w-3.5 h-3.5" />
                                            <span>Keluar</span>
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>

                    </div>

                </div>
            </header>

            {/* 2. BODY CONTAINER */}
            <div className="flex-1 flex w-full max-w-[1600px] mx-auto">
                
                {/* 3. LEFT SELLER SIDEBAR (Section 16, 17, 18, 19, 20, 21) */}
                <aside className={`fixed inset-y-0 left-0 z-50 w-[260px] bg-white border-r border-[#E2E8F0] p-4 flex flex-col justify-between transition-transform duration-200 lg:static lg:translate-x-0 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                    <div className="space-y-5">
                        
                        {/* Mobile Drawer Close */}
                        <div className="flex items-center justify-between lg:hidden pb-2 border-b border-slate-100">
                            <span className="font-bold text-xs text-slate-400 uppercase tracking-wider">Menu Seller</span>
                            <button onClick={() => setSidebarOpen(false)} className="p-1 text-slate-400">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Store Identity Card (Section 17, 18) */}
                        <div className="p-4 rounded-[14px] bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#94A3B8] block">
                                TOKO AKTIF
                            </span>
                            <div className="font-bold text-[15px] text-[#0F172A] truncate">
                                {storeName}
                            </div>
                            <div className="text-xs font-bold text-[#2563EB] flex items-center space-x-1.5 pt-0.5">
                                <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB]" />
                                <span>Mitra Resmi</span>
                            </div>
                        </div>

                        {/* Sidebar Navigation Menu (Section 19, 20) */}
                        <nav className="space-y-1">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = url.startsWith(item.href);

                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`flex items-center space-x-3 px-3.5 h-11 rounded-[10px] text-xs font-bold transition-all ${
                                            isActive
                                                ? 'bg-[#2563EB] text-white shadow-[0_6px_16px_rgba(37,99,235,0.18)]'
                                                : 'text-[#475569] hover:bg-[#F8FAFC] hover:text-[#2563EB]'
                                        }`}
                                    >
                                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                                        <span>{item.name}</span>
                                    </Link>
                                );
                            })}
                        </nav>

                    </div>

                    {/* Revenue Share Card (Section 21) */}
                    <div 
                        className="p-4 rounded-[14px] border border-[#BFDBFE] space-y-1.5 text-xs"
                        style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #F5F8FF 100%)' }}
                    >
                        <div className="flex items-center space-x-1.5 font-bold text-[#2563EB]">
                            <CirclePercent className="w-4 h-4 text-[#2563EB]" />
                            <span>Bagi Hasil 90%</span>
                        </div>
                        <p className="text-[11px] text-[#475569] leading-snug">
                            Anda menerima 90% dari setiap penjualan software secara instan.
                        </p>
                    </div>

                </aside>

                {/* 4. MAIN CONTENT AREA (Section 22, 23, etc.) */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full max-w-full overflow-hidden">
                    {children}
                </main>

            </div>

        </div>
    );
}
