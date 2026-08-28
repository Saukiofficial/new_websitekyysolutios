import { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    LayoutDashboard, 
    Users, 
    Store, 
    Package, 
    FolderTree, 
    ShoppingCart, 
    CreditCard, 
    Percent, 
    ArrowDownToLine, 
    Star, 
    FileBarChart, 
    Layers, 
    Briefcase, 
    FileText, 
    Bell, 
    Settings, 
    Search, 
    Menu, 
    X, 
    ChevronDown, 
    LogOut, 
    Shield, 
    ExternalLink,
    ChevronRight,
    Activity
} from 'lucide-react';

export default function AdminLayout({ children, title = 'Dashboard Super Admin', breadcrumb = 'Home > Dashboard' }) {
    const { url } = usePage();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [profileDropdown, setProfileDropdown] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const navigationGroups = [
        {
            group: null,
            items: [
                { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
            ]
        },
        {
            group: 'MANAGEMENT',
            items: [
                { name: 'Users', href: '/admin/users', icon: Users },
                { name: 'Seller', href: '/admin/sellers', icon: Store },
                { name: 'Produk', href: '/admin/products', icon: Package },
                { name: 'Kategori', href: '/admin/categories', icon: FolderTree },
            ]
        },
        {
            group: 'TRANSAKSI',
            items: [
                { name: 'Order', href: '/admin/orders', icon: ShoppingCart },
                { name: 'Pembayaran', href: '/admin/payments', icon: CreditCard },
                { name: 'Komisi', href: '/admin/commissions', icon: Percent },
                { name: 'Withdrawal', href: '/admin/withdrawals', icon: ArrowDownToLine },
            ]
        },
        {
            group: 'MARKETPLACE',
            items: [
                { name: 'Aktivitas & Traffic', href: '/admin/analytics', icon: Activity },
                { name: 'Review', href: '/admin/reviews', icon: Star },
                { name: 'Laporan', href: '/admin/reports', icon: FileBarChart },
            ]
        },
        {
            group: 'BUSINESS',
            items: [
                { name: 'Services', href: '/admin/services', icon: Layers },
                { name: 'Portfolio', href: '/admin/portfolio', icon: Briefcase },
                { name: 'Blog / CMS', href: '/admin/blog', icon: FileText },
            ]
        },
        {
            group: 'SYSTEM',
            items: [
                { name: 'Notifikasi', href: '/admin/notifications', icon: Bell, badge: 12 },
                { name: 'Pengaturan', href: '/admin/settings', icon: Settings },
            ]
        }
    ];

    const isCurrentUrl = (href) => {
        if (href === '/admin/dashboard' && url === '/admin/dashboard') return true;
        if (href !== '/admin/dashboard' && url.startsWith(href)) return true;
        return false;
    };

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <div className="min-h-screen bg-[#F7F9FC] text-[#0F172A] flex font-sans antialiased selection:bg-[#2563EB] selection:text-white">
            
            {/* Desktop Sidebar (240px fixed or 72px collapsed) */}
            <aside 
                className={`hidden lg:flex flex-col shrink-0 z-30 transition-all duration-300 ${
                    sidebarCollapsed ? 'w-[76px]' : 'w-[240px]'
                }`}
                style={{
                    background: 'linear-gradient(180deg, #06152E 0%, #071A38 55%, #041126 100%)',
                }}
            >
                {/* Branding Area (Height: 72px) */}
                <div className="h-[72px] px-5 flex items-center justify-between border-b border-white/6 shrink-0">
                    <Link href="/admin/dashboard" className="flex items-center space-x-3 overflow-hidden">
                        <img 
                            src="/images/logo/logo_no_bg.png" 
                            alt="KyySolutions Logo" 
                            className="h-9 w-auto object-contain shrink-0" 
                        />
                        {!sidebarCollapsed && (
                            <span className="font-extrabold text-[17px] text-white tracking-tight truncate">
                                Kyy<span className="text-[#3B82F6]">Solutions</span>
                            </span>
                        )}
                    </Link>
                </div>

                {/* Sidebar Navigation Items */}
                <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5 scrollbar-thin scrollbar-thumb-slate-800">
                    {navigationGroups.map((grp, gIdx) => (
                        <div key={gIdx} className="space-y-1">
                            {grp.group && !sidebarCollapsed && (
                                <div className="px-3 text-[10px] font-bold tracking-widest text-[#8496B2] uppercase mb-1">
                                    {grp.group}
                                </div>
                            )}
                            {grp.items.map((item) => {
                                const Icon = item.icon;
                                const active = isCurrentUrl(item.href);

                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`h-[42px] px-3 rounded-lg flex items-center justify-between text-xs font-semibold transition-all group ${
                                            active
                                                ? 'bg-[#1557C8] text-white shadow-md shadow-[#1557C8]/25'
                                                : 'text-[#D8E2F1] hover:bg-blue-600/12 hover:text-white'
                                        }`}
                                        title={sidebarCollapsed ? item.name : undefined}
                                    >
                                        <div className="flex items-center space-x-3 min-w-0">
                                            <Icon className={`w-4.5 h-4.5 shrink-0 ${active ? 'text-white' : 'text-[#8496B2] group-hover:text-blue-300'}`} />
                                            {!sidebarCollapsed && (
                                                <span className="truncate">{item.name}</span>
                                            )}
                                        </div>

                                        {!sidebarCollapsed && item.badge && (
                                            <span className="text-[10px] font-bold bg-[#2563EB] text-white px-2 py-0.5 rounded-full">
                                                {item.badge}
                                            </span>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    ))}
                </div>

                {/* Sidebar Footer (Admin Account Card) */}
                <div className="p-3 border-t border-white/6 shrink-0">
                    <div className="p-2.5 rounded-xl bg-white/4 border border-white/8 flex items-center justify-between">
                        <div className="flex items-center space-x-2.5 min-w-0">
                            <div className="w-8 h-8 rounded-lg bg-blue-600/30 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
                                <Shield className="w-4 h-4" />
                            </div>
                            {!sidebarCollapsed && (
                                <div className="min-w-0">
                                    <span className="text-xs font-bold text-white block truncate leading-tight">Super Admin</span>
                                    <span className="text-[10px] text-[#8496B2] truncate block">KyySolutions Platform</span>
                                </div>
                            )}
                        </div>

                        {!sidebarCollapsed && (
                            <Link href="/" target="_blank" title="Buka Website Publik" className="text-slate-400 hover:text-white transition-colors">
                                <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                        )}
                    </div>
                </div>
            </aside>

            {/* Main Wrapper: Header & Page Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                
                {/* Top Header (Height: 72px) */}
                <header className="h-[72px] bg-white border-b border-[#E8EDF3] px-4 sm:px-6 lg:px-8 flex items-center justify-between shrink-0 sticky top-0 z-20">
                    
                    {/* Left: Hamburger & Title */}
                    <div className="flex items-center space-x-3.5">
                        <button
                            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                            className="hidden lg:flex w-9 h-9 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 items-center justify-center transition-colors cursor-pointer"
                            aria-label="Toggle Sidebar"
                        >
                            <Menu className="w-4.5 h-4.5" />
                        </button>

                        <button
                            onClick={() => setMobileSidebarOpen(true)}
                            className="lg:hidden w-9 h-9 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                            aria-label="Open Mobile Menu"
                        >
                            <Menu className="w-4.5 h-4.5" />
                        </button>

                        <div>
                            <h1 className="text-lg sm:text-xl font-bold text-[#0F172A] tracking-tight leading-tight">
                                {title}
                            </h1>
                            <p className="text-[11px] text-[#94A3B8] font-medium hidden sm:block">
                                {breadcrumb}
                            </p>
                        </div>
                    </div>

                    {/* Center / Right: Search Bar & Actions */}
                    <div className="flex items-center space-x-4">
                        
                        {/* Search Bar */}
                        <div className="relative hidden md:block w-72 lg:w-80">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari sesuatu (order, seller, produk)..."
                                className="w-full h-10 pl-9 pr-3 text-xs bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#93C5FD] focus:ring-3 focus:ring-blue-500/8 transition-all"
                            />
                        </div>

                        {/* Notification Bell */}
                        <div className="relative">
                            <button className="w-10 h-10 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 flex items-center justify-center transition-colors relative cursor-pointer">
                                <Bell className="w-4.5 h-4.5" />
                                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                                    8
                                </span>
                            </button>
                        </div>

                        {/* Admin Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setProfileDropdown(!profileDropdown)}
                                className="flex items-center space-x-2.5 p-1.5 rounded-xl hover:bg-slate-50 border border-slate-200/80 transition-colors cursor-pointer"
                            >
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-2xs">
                                    SA
                                </div>
                                <div className="hidden sm:block text-left pr-1">
                                    <div className="text-xs font-bold text-[#0F172A] leading-none">Super Admin</div>
                                    <div className="text-[10px] text-[#64748B] font-medium mt-0.5">Administrator</div>
                                </div>
                                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                            </button>

                            {/* Dropdown Menu */}
                            <AnimatePresence>
                                {profileDropdown && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 6, scale: 0.96 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 6, scale: 0.96 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl p-1.5 z-50 overflow-hidden"
                                    >
                                        <div className="px-3 py-2 border-b border-slate-100 mb-1">
                                            <div className="text-xs font-bold text-[#0F172A]">admin@kyysolutions.com</div>
                                            <div className="text-[10px] text-slate-400">Super Administrator</div>
                                        </div>

                                        <Link
                                            href="/admin/settings"
                                            className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-semibold rounded-xl text-slate-700 hover:bg-slate-50 transition-colors"
                                        >
                                            <Settings className="w-3.5 h-3.5 text-slate-400" />
                                            <span>Pengaturan</span>
                                        </Link>

                                        <Link
                                            href="/"
                                            target="_blank"
                                            className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-semibold rounded-xl text-slate-700 hover:bg-slate-50 transition-colors"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                                            <span>Lihat Toko Publik</span>
                                        </Link>

                                        <div className="border-t border-slate-100 my-1" />

                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-semibold rounded-xl text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                                        >
                                            <LogOut className="w-3.5 h-3.5 text-rose-500" />
                                            <span>Keluar (Logout)</span>
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                    </div>

                </header>

                {/* Main Scrollable Canvas */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    {children}
                </main>

            </div>

            {/* Mobile Drawer Sidebar */}
            <AnimatePresence>
                {mobileSidebarOpen && (
                    <div className="fixed inset-0 z-50 lg:hidden flex">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileSidebarOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
                        />

                        {/* Slide-out Sidebar */}
                        <motion.aside
                            initial={{ x: -260 }}
                            animate={{ x: 0 }}
                            exit={{ x: -260 }}
                            transition={{ duration: 0.25 }}
                            className="relative w-[260px] h-full flex flex-col z-10"
                            style={{
                                background: 'linear-gradient(180deg, #06152E 0%, #071A38 55%, #041126 100%)',
                            }}
                        >
                            <div className="h-[72px] px-5 flex items-center justify-between border-b border-white/6 shrink-0">
                                <div className="flex items-center space-x-3">
                                    <img 
                                        src="/images/logo/logo_no_bg.png" 
                                        alt="KyySolutions Logo" 
                                        className="h-8 w-auto object-contain shrink-0" 
                                    />
                                    <span className="font-extrabold text-base text-white">KyySolutions</span>
                                </div>
                                <button
                                    onClick={() => setMobileSidebarOpen(false)}
                                    className="w-8 h-8 rounded-lg bg-white/5 text-white flex items-center justify-center"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
                                {navigationGroups.map((grp, gIdx) => (
                                    <div key={gIdx} className="space-y-1">
                                        {grp.group && (
                                            <div className="px-3 text-[10px] font-bold tracking-widest text-[#8496B2] uppercase mb-1">
                                                {grp.group}
                                            </div>
                                        )}
                                        {grp.items.map((item) => {
                                            const Icon = item.icon;
                                            const active = isCurrentUrl(item.href);

                                            return (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    onClick={() => setMobileSidebarOpen(false)}
                                                    className={`h-[42px] px-3 rounded-lg flex items-center justify-between text-xs font-semibold transition-all ${
                                                        active
                                                            ? 'bg-[#1557C8] text-white shadow-md shadow-[#1557C8]/25'
                                                            : 'text-[#D8E2F1] hover:bg-blue-600/12'
                                                    }`}
                                                >
                                                    <div className="flex items-center space-x-3">
                                                        <Icon className={`w-4.5 h-4.5 ${active ? 'text-white' : 'text-[#8496B2]'}`} />
                                                        <span>{item.name}</span>
                                                    </div>
                                                    {item.badge && (
                                                        <span className="text-[10px] font-bold bg-[#2563EB] text-white px-2 py-0.5 rounded-full">
                                                            {item.badge}
                                                        </span>
                                                    )}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </motion.aside>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
}
