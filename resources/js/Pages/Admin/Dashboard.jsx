import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    Wallet, 
    ShoppingBag, 
    Users, 
    Package, 
    Headphones, 
    CircleDollarSign, 
    TrendingUp, 
    TrendingDown, 
    ArrowUpRight, 
    ChevronRight, 
    Plus, 
    Megaphone, 
    FileText, 
    ArrowDownToLine, 
    Percent, 
    Settings, 
    Check, 
    X, 
    ExternalLink, 
    Clock, 
    ArrowRight,
    CreditCard
} from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';

const defaultKpi = {
    totalRevenue: { value: 'Rp 1.248.750.000', growth: '+18.6%' },
    totalOrders: { value: '3.842', growth: '+12.4%' },
    activeSellers: { value: '215', growth: '+15.3%' },
    activeProducts: { value: '1.256', growth: '+9.7%' },
    serviceRequests: { value: '128', growth: '+20.5%' },
    pendingWithdrawals: { value: 'Rp 78.450.000', growth: '-5.2%' },
};

export default function AdminDashboard({ 
    kpi: initialKpi = defaultKpi, 
    recentOrders = [], 
    pendingProducts = [], 
    recentSellers = [], 
    activities = [], 
    serviceRequests = [] 
}) {
    const kpi = { ...defaultKpi, ...(initialKpi || {}) };
    const [timeRange, setTimeRange] = useState('30d');
    const [hoveredRevenueIndex, setHoveredRevenueIndex] = useState(null);

    // Revenue Chart Mock Data (30-day timeline)
    const revenueData = [
        { label: '20 Apr', value: 38 },
        { label: '24 Apr', value: 45 },
        { label: '28 Apr', value: 42 },
        { label: '02 Mei', value: 58 },
        { label: '06 Mei', value: 64 },
        { label: '10 Mei', value: 72 },
        { label: '14 Mei', value: 68 },
        { label: '18 Mei', value: 85 },
        { label: '22 Mei', value: 92 },
        { label: '26 Mei', value: 98 },
    ];

    const orderTrendData = [
        { label: 'W1', value: 180 },
        { label: 'W2', value: 240 },
        { label: 'W3', value: 210 },
        { label: 'W4', value: 310 },
        { label: 'W5', value: 280 },
        { label: 'W6', value: 342 },
    ];

    // Helper for SVG Path generation
    const getSvgPath = (data, maxVal, width = 500, height = 180) => {
        const points = data.map((d, i) => {
            const x = (i / (data.length - 1)) * width;
            const y = height - (d.value / maxVal) * (height - 20) - 10;
            return `${x},${y}`;
        });
        return points.join(' L ');
    };

    const getSvgAreaPath = (data, maxVal, width = 500, height = 180) => {
        const linePath = getSvgPath(data, maxVal, width, height);
        return `M 0,${height} L ${linePath} L ${width},${height} Z`;
    };

    const formatRupiah = (num) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
    };

    return (
        <AdminLayout title="Dashboard Super Admin" breadcrumb="Home > Dashboard">
            <Head title="Super Admin Dashboard — KyySolutions" />

            <div className="space-y-8">
                
                {/* 1. 6 KPI SUMMARY CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                    
                    {/* Card 1: Total Revenue */}
                    <div className="p-4 rounded-xl bg-white border border-[#E9EEF5] shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-semibold text-[#64748B]">Total Revenue</span>
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-xs">
                                <Wallet className="w-5 h-5" />
                            </div>
                        </div>
                        <div>
                            <div className="text-lg font-bold text-[#0F172A] tracking-tight truncate font-mono">
                                {kpi.totalRevenue.value}
                            </div>
                            <div className="flex items-center text-[11px] font-semibold text-emerald-600 mt-1">
                                <TrendingUp className="w-3.5 h-3.5 mr-1" />
                                <span>{kpi.totalRevenue.growth} dari bln lalu</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Total Orders */}
                    <div className="p-4 rounded-xl bg-white border border-[#E9EEF5] shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-semibold text-[#64748B]">Total Orders</span>
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#3B82F6] to-[#2563EB] text-white flex items-center justify-center shadow-xs">
                                <ShoppingBag className="w-5 h-5" />
                            </div>
                        </div>
                        <div>
                            <div className="text-lg font-bold text-[#0F172A] tracking-tight font-mono">
                                {kpi.totalOrders.value}
                            </div>
                            <div className="flex items-center text-[11px] font-semibold text-emerald-600 mt-1">
                                <TrendingUp className="w-3.5 h-3.5 mr-1" />
                                <span>{kpi.totalOrders.growth} dari bln lalu</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Active Sellers */}
                    <div className="p-4 rounded-xl bg-white border border-[#E9EEF5] shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-semibold text-[#64748B]">Active Sellers</span>
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-xs">
                                <Users className="w-5 h-5" />
                            </div>
                        </div>
                        <div>
                            <div className="text-lg font-bold text-[#0F172A] tracking-tight font-mono">
                                {kpi.activeSellers.value}
                            </div>
                            <div className="flex items-center text-[11px] font-semibold text-emerald-600 mt-1">
                                <TrendingUp className="w-3.5 h-3.5 mr-1" />
                                <span>{kpi.activeSellers.growth} dari bln lalu</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 4: Produk Aktif */}
                    <div className="p-4 rounded-xl bg-white border border-[#E9EEF5] shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-semibold text-[#64748B]">Produk Aktif</span>
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center shadow-xs">
                                <Package className="w-5 h-5" />
                            </div>
                        </div>
                        <div>
                            <div className="text-lg font-bold text-[#0F172A] tracking-tight font-mono">
                                {kpi.activeProducts.value}
                            </div>
                            <div className="flex items-center text-[11px] font-semibold text-emerald-600 mt-1">
                                <TrendingUp className="w-3.5 h-3.5 mr-1" />
                                <span>{kpi.activeProducts.growth} dari bln lalu</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 5: Service Requests */}
                    <div className="p-4 rounded-xl bg-white border border-[#E9EEF5] shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-semibold text-[#64748B]">Service Requests</span>
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-600 text-white flex items-center justify-center shadow-xs">
                                <Headphones className="w-5 h-5" />
                            </div>
                        </div>
                        <div>
                            <div className="text-lg font-bold text-[#0F172A] tracking-tight font-mono">
                                {kpi.serviceRequests.value}
                            </div>
                            <div className="flex items-center text-[11px] font-semibold text-emerald-600 mt-1">
                                <TrendingUp className="w-3.5 h-3.5 mr-1" />
                                <span>{kpi.serviceRequests.growth} dari bln lalu</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 6: Pending Withdrawals */}
                    <div className="p-4 rounded-xl bg-white border border-[#E9EEF5] shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-semibold text-[#64748B]">Pending Withdrawals</span>
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-600 text-white flex items-center justify-center shadow-xs">
                                <CircleDollarSign className="w-5 h-5" />
                            </div>
                        </div>
                        <div>
                            <div className="text-lg font-bold text-[#0F172A] tracking-tight truncate font-mono">
                                {kpi.pendingWithdrawals.value}
                            </div>
                            <div className="flex items-center text-[11px] font-semibold text-amber-600 mt-1">
                                <TrendingDown className="w-3.5 h-3.5 mr-1" />
                                <span>{kpi.pendingWithdrawals.growth} dari bln lalu</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* 2. ANALYTICS SECTION (Revenue Overview 2fr + Trend Orders 1fr) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* Revenue Overview Card (8 cols) */}
                    <div className="lg:col-span-8 bg-white rounded-xl border border-[#E9EEF5] p-6 shadow-xs flex flex-col justify-between">
                        <div>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-100">
                                <div>
                                    <h3 className="text-base font-bold text-[#0F172A]">Revenue Overview</h3>
                                    <div className="flex items-baseline space-x-2 mt-1">
                                        <span className="text-2xl font-extrabold text-[#0F172A] font-mono">Rp 1.248.750.000</span>
                                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">↑ 18.6%</span>
                                    </div>
                                </div>

                                <select
                                    value={timeRange}
                                    onChange={(e) => setTimeRange(e.target.value)}
                                    className="text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none cursor-pointer self-start sm:self-auto"
                                >
                                    <option value="7d">7 Hari Terakhir</option>
                                    <option value="30d">30 Hari Terakhir</option>
                                    <option value="90d">90 Hari Terakhir</option>
                                    <option value="1y">1 Tahun</option>
                                </select>
                            </div>

                            {/* Chart Area + Donut Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                                
                                {/* Left Line/Area Chart (70% ~ 8 cols) */}
                                <div className="md:col-span-8">
                                    <div className="h-48 w-full relative">
                                        
                                        {/* Horizontal Dashed Grid */}
                                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] text-slate-400 font-mono">
                                            <div className="border-b border-dashed border-slate-200 pb-0.5">100jt</div>
                                            <div className="border-b border-dashed border-slate-200 pb-0.5">75jt</div>
                                            <div className="border-b border-dashed border-slate-200 pb-0.5">50jt</div>
                                            <div className="border-b border-dashed border-slate-200 pb-0.5">25jt</div>
                                            <div>0</div>
                                        </div>

                                        {/* SVG Chart */}
                                        <svg className="w-full h-full overflow-visible" viewBox="0 0 500 180" preserveAspectRatio="none">
                                            <defs>
                                                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
                                                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0.00" />
                                                </linearGradient>
                                            </defs>
                                            <path d={getSvgAreaPath(revenueData, 100, 500, 180)} fill="url(#revenueGradient)" />
                                            <path d={`M 0,180 L ${getSvgPath(revenueData, 100, 500, 180)}`} fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
                                        </svg>
                                    </div>

                                    {/* X-Axis Labels */}
                                    <div className="flex justify-between text-[11px] text-[#94A3B8] font-mono mt-3 pt-2 border-t border-slate-100">
                                        {revenueData.map((d, i) => (
                                            <span key={i}>{d.label}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* Right Donut Breakdown (30% ~ 4 cols) */}
                                <div className="md:col-span-4 p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                                    <h4 className="text-xs font-bold text-[#0F172A] mb-3">Sumber Revenue</h4>
                                    
                                    {/* Donut graphic representation */}
                                    <div className="flex items-center justify-center my-2 relative">
                                        <div className="w-24 h-24 rounded-full border-[10px] border-[#2563EB] border-r-[#22C55E] border-b-[#F59E0B] flex items-center justify-center">
                                            <span className="text-[10px] font-bold text-slate-600 text-center font-mono">100%<br />Total</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2 mt-3 text-xs">
                                        <div className="flex items-center justify-between">
                                            <span className="flex items-center text-slate-600">
                                                <span className="w-2 h-2 rounded-full bg-[#2563EB] mr-1.5" /> Produk Digital
                                            </span>
                                            <span className="font-mono font-bold text-[#0F172A]">63%</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="flex items-center text-slate-600">
                                                <span className="w-2 h-2 rounded-full bg-[#22C55E] mr-1.5" /> Services
                                            </span>
                                            <span className="font-mono font-bold text-[#0F172A]">25%</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="flex items-center text-slate-600">
                                                <span className="w-2 h-2 rounded-full bg-[#F59E0B] mr-1.5" /> Marketplace
                                            </span>
                                            <span className="font-mono font-bold text-[#0F172A]">12%</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Trend Orders Card (4 cols) */}
                    <div className="lg:col-span-4 bg-white rounded-xl border border-[#E9EEF5] p-6 shadow-xs flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                                <div>
                                    <h3 className="text-base font-bold text-[#0F172A]">Trend Orders</h3>
                                    <div className="flex items-baseline space-x-2 mt-1">
                                        <span className="text-2xl font-extrabold text-[#0F172A] font-mono">3.842</span>
                                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">↑ 12.4%</span>
                                    </div>
                                </div>
                                <span className="text-xs text-slate-400 font-mono">30 Hari</span>
                            </div>

                            <div className="h-44 w-full relative mt-2">
                                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] text-slate-400 font-mono">
                                    <div className="border-b border-dashed border-slate-100">350</div>
                                    <div className="border-b border-dashed border-slate-100">200</div>
                                    <div>0</div>
                                </div>
                                <svg className="w-full h-full overflow-visible" viewBox="0 0 300 150" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id="orderGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
                                            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
                                        </linearGradient>
                                    </defs>
                                    <path d={getSvgAreaPath(orderTrendData, 350, 300, 150)} fill="url(#orderGradient)" />
                                    <path d={`M 0,150 L ${getSvgPath(orderTrendData, 350, 300, 150)}`} fill="none" stroke="#3B82F6" strokeWidth="2.5" />
                                </svg>
                            </div>

                            <div className="flex justify-between text-[11px] text-[#94A3B8] font-mono mt-3 pt-2 border-t border-slate-100">
                                {orderTrendData.map((d, i) => (
                                    <span key={i}>{d.label}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

                {/* 3. MAIN LOWER DASHBOARD GRID (Main Tables 3fr + Right Rail 1fr) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Main Area: Order Terbaru, Produk Pending, Seller Terbaru (8 cols) */}
                    <div className="lg:col-span-8 space-y-8">
                        
                        {/* Table 1: Order Terbaru */}
                        <div className="bg-white rounded-xl border border-[#E9EEF5] shadow-xs overflow-hidden">
                            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                                <h3 className="text-sm font-bold text-[#0F172A]">Order Terbaru</h3>
                                <Link href="/admin/orders" className="text-xs font-bold text-[#2563EB] hover:underline flex items-center">
                                    <span>Lihat Semua</span>
                                    <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead className="bg-[#FAFBFD] text-[#64748B] font-semibold border-b border-slate-100">
                                        <tr>
                                            <th className="py-3 px-4 font-mono">Order ID</th>
                                            <th className="py-3 px-4">Customer</th>
                                            <th className="py-3 px-4">Produk / Layanan</th>
                                            <th className="py-3 px-4">Total</th>
                                            <th className="py-3 px-4">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 text-slate-700">
                                        {recentOrders.map((ord, idx) => (
                                            <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                                                <td className="py-3.5 px-4 font-mono font-bold text-[#2563EB]">{ord.id}</td>
                                                <td className="py-3.5 px-4">
                                                    <div className="font-bold text-[#0F172A]">{ord.customer}</div>
                                                    <div className="text-[10px] text-slate-400">{ord.email}</div>
                                                </td>
                                                <td className="py-3.5 px-4 font-medium max-w-[200px] truncate">{ord.product}</td>
                                                <td className="py-3.5 px-4 font-mono font-bold">{ord.total}</td>
                                                <td className="py-3.5 px-4">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                                        ord.status === 'Selesai' 
                                                            ? 'bg-[#DCFCE7] text-[#15803D]' 
                                                            : (ord.status === 'Proses' ? 'bg-[#DBEAFE] text-[#1D4ED8]' : 'bg-[#FEF3C7] text-[#B45309]')
                                                    }`}>
                                                        {ord.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Table 2: Produk Menunggu Persetujuan (Moderation) */}
                        <div className="bg-white rounded-xl border border-[#E9EEF5] shadow-xs overflow-hidden">
                            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <h3 className="text-sm font-bold text-[#0F172A]">Produk Menunggu Persetujuan</h3>
                                    <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                                        5 Pending
                                    </span>
                                </div>
                                <Link href="/admin/products" className="text-xs font-bold text-[#2563EB] hover:underline flex items-center">
                                    <span>Lihat Semua</span>
                                    <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead className="bg-[#FAFBFD] text-[#64748B] font-semibold border-b border-slate-100">
                                        <tr>
                                            <th className="py-3 px-4">Produk</th>
                                            <th className="py-3 px-4">Seller</th>
                                            <th className="py-3 px-4">Kategori</th>
                                            <th className="py-3 px-4">Dikirim</th>
                                            <th className="py-3 px-4 text-right">Aksi Moderasi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 text-slate-700">
                                        {pendingProducts.map((p, idx) => (
                                            <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                                                <td className="py-3.5 px-4 font-bold text-[#0F172A]">
                                                    <div className="flex items-center space-x-2.5">
                                                        <div className="w-7 h-7 rounded-md bg-blue-50 text-[#2563EB] font-mono text-[9px] font-black flex items-center justify-center shrink-0">
                                                            {p.thumbnail}
                                                        </div>
                                                        <span className="truncate max-w-[180px]">{p.title}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3.5 px-4 font-medium text-slate-600">{p.seller}</td>
                                                <td className="py-3.5 px-4">
                                                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-semibold">
                                                        {p.category}
                                                    </span>
                                                </td>
                                                <td className="py-3.5 px-4 text-[11px] text-slate-400">{p.time}</td>
                                                <td className="py-3.5 px-4 text-right">
                                                    <div className="inline-flex items-center space-x-1.5">
                                                        <button 
                                                            onClick={() => alert(`Produk "${p.title}" disetujui (Approved)`)}
                                                            className="w-7 h-7 rounded-lg bg-emerald-50 hover:bg-emerald-600 text-emerald-600 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                                                            title="Setujui Produk"
                                                        >
                                                            <Check className="w-3.5 h-3.5" />
                                                        </button>
                                                        <button 
                                                            onClick={() => alert(`Produk "${p.title}" ditolak (Rejected)`)}
                                                            className="w-7 h-7 rounded-lg bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                                                            title="Tolak Produk"
                                                        >
                                                            <X className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Table 3: Seller Terbaru */}
                        <div className="bg-white rounded-xl border border-[#E9EEF5] shadow-xs overflow-hidden">
                            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                                <h3 className="text-sm font-bold text-[#0F172A]">Seller Terbaru</h3>
                                <Link href="/admin/sellers" className="text-xs font-bold text-[#2563EB] hover:underline flex items-center">
                                    <span>Lihat Semua</span>
                                    <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                                </Link>
                            </div>

                            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {recentSellers.map((sel, idx) => (
                                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                                        <div className="flex items-center space-x-2.5 min-w-0">
                                            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                                                {sel.initials}
                                            </div>
                                            <div className="min-w-0">
                                                <span className="font-bold text-xs text-[#0F172A] block truncate">{sel.name}</span>
                                                <span className="text-[10px] text-slate-400 block truncate">{sel.email}</span>
                                            </div>
                                        </div>
                                        <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded shrink-0">
                                            {sel.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Right Rail: Activity Feed, Quick Actions, Service Requests (4 cols) */}
                    <div className="lg:col-span-4 space-y-6">
                        
                        {/* 1. Aktivitas Terbaru */}
                        <div className="bg-white rounded-xl border border-[#E9EEF5] p-5 shadow-xs">
                            <h3 className="text-sm font-bold text-[#0F172A] mb-4 pb-3 border-b border-slate-100">
                                Aktivitas Terbaru
                            </h3>
                            <div className="space-y-4 text-xs">
                                {activities.map((act, idx) => (
                                    <div key={idx} className="flex items-start space-x-3">
                                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                                            act.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                                            act.color === 'green' ? 'bg-emerald-50 text-emerald-600' :
                                            act.color === 'rose' ? 'bg-rose-50 text-rose-600' :
                                            act.color === 'purple' ? 'bg-purple-50 text-purple-600' : 'bg-amber-50 text-amber-600'
                                        }`}>
                                            <Clock className="w-3.5 h-3.5" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="font-bold text-[#0F172A] leading-snug">{act.title}</div>
                                            <div className="text-[11px] text-slate-500">{act.sub}</div>
                                            <div className="text-[10px] text-slate-400 mt-0.5 font-mono">{act.time}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 2. Quick Actions (3 cols x 2 rows) */}
                        <div className="bg-white rounded-xl border border-[#E9EEF5] p-5 shadow-xs">
                            <h3 className="text-sm font-bold text-[#0F172A] mb-3 pb-3 border-b border-slate-100">
                                Quick Actions
                            </h3>
                            <div className="grid grid-cols-3 gap-2 text-center">
                                
                                <Link 
                                    href="/admin/products"
                                    className="p-2.5 rounded-xl border border-[#E8EDF3] hover:border-blue-300 hover:bg-[#F8FBFF] hover:-translate-y-0.5 transition-all flex flex-col items-center justify-center group"
                                >
                                    <Plus className="w-4 h-4 text-[#2563EB] mb-1 group-hover:scale-110 transition-transform" />
                                    <span className="text-[10px] font-bold text-slate-700 leading-tight">Tambah Produk</span>
                                </Link>

                                <button 
                                    onClick={() => alert('Fitur Pengumuman Global')}
                                    className="p-2.5 rounded-xl border border-[#E8EDF3] hover:border-blue-300 hover:bg-[#F8FBFF] hover:-translate-y-0.5 transition-all flex flex-col items-center justify-center group cursor-pointer"
                                >
                                    <Megaphone className="w-4 h-4 text-purple-600 mb-1 group-hover:scale-110 transition-transform" />
                                    <span className="text-[10px] font-bold text-slate-700 leading-tight">Buat Info</span>
                                </button>

                                <Link 
                                    href="/admin/reports"
                                    className="p-2.5 rounded-xl border border-[#E8EDF3] hover:border-blue-300 hover:bg-[#F8FBFF] hover:-translate-y-0.5 transition-all flex flex-col items-center justify-center group"
                                >
                                    <FileText className="w-4 h-4 text-emerald-600 mb-1 group-hover:scale-110 transition-transform" />
                                    <span className="text-[10px] font-bold text-slate-700 leading-tight">Laporan</span>
                                </Link>

                                <Link 
                                    href="/admin/withdrawals"
                                    className="p-2.5 rounded-xl border border-[#E8EDF3] hover:border-blue-300 hover:bg-[#F8FBFF] hover:-translate-y-0.5 transition-all flex flex-col items-center justify-center group"
                                >
                                    <ArrowDownToLine className="w-4 h-4 text-amber-600 mb-1 group-hover:scale-110 transition-transform" />
                                    <span className="text-[10px] font-bold text-slate-700 leading-tight">Withdraw</span>
                                </Link>

                                <Link 
                                    href="/admin/commissions"
                                    className="p-2.5 rounded-xl border border-[#E8EDF3] hover:border-blue-300 hover:bg-[#F8FBFF] hover:-translate-y-0.5 transition-all flex flex-col items-center justify-center group"
                                >
                                    <Percent className="w-4 h-4 text-indigo-600 mb-1 group-hover:scale-110 transition-transform" />
                                    <span className="text-[10px] font-bold text-slate-700 leading-tight">Atur Komisi</span>
                                </Link>

                                <Link 
                                    href="/admin/settings"
                                    className="p-2.5 rounded-xl border border-[#E8EDF3] hover:border-blue-300 hover:bg-[#F8FBFF] hover:-translate-y-0.5 transition-all flex flex-col items-center justify-center group"
                                >
                                    <Settings className="w-4 h-4 text-slate-600 mb-1 group-hover:scale-110 transition-transform" />
                                    <span className="text-[10px] font-bold text-slate-700 leading-tight">Pengaturan</span>
                                </Link>

                            </div>
                        </div>

                        {/* 3. Service / Project Requests */}
                        <div className="bg-white rounded-xl border border-[#E9EEF5] p-5 shadow-xs">
                            <h3 className="text-sm font-bold text-[#0F172A] mb-3 pb-3 border-b border-slate-100">
                                Service / Project Requests
                            </h3>
                            <div className="space-y-3">
                                {serviceRequests.map((req, idx) => (
                                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                                        <div className="min-w-0 pr-2">
                                            <h4 className="text-xs font-bold text-[#0F172A] truncate">{req.title}</h4>
                                            <p className="text-[10px] text-slate-400 truncate">oleh {req.client}</p>
                                        </div>
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                                            req.statusColor === 'purple' ? 'bg-purple-100 text-purple-700' :
                                            req.statusColor === 'blue' ? 'bg-blue-100 text-blue-700' :
                                            req.statusColor === 'amber' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                                        }`}>
                                            {req.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </AdminLayout>
    );
}
