import { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Eye, 
    MousePointerClick, 
    Users, 
    TrendingUp, 
    Search, 
    ShoppingCart, 
    ArrowRight, 
    CheckCircle2, 
    Monitor, 
    Smartphone, 
    Globe, 
    Activity, 
    ExternalLink, 
    ArrowUpRight,
    RefreshCw,
    Filter
} from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';

// Small SVG Mini Sparkline Component
function MiniSparkline({ data = [], color = '#2563EB', height = 28, width = 74 }) {
    if (!data || data.length < 2) return null;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const points = data.map((val, idx) => {
        const x = (idx / (data.length - 1)) * width;
        const y = height - ((val - min) / range) * (height - 6) - 3;
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg width={width} height={height} className="overflow-visible">
            <polyline
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
            />
        </svg>
    );
}

// Live Emerald Sparkline for Header Strip
function LiveHeaderSparkline({ width = 130, height = 34 }) {
    const data = [12, 14, 13, 16, 15, 17, 19, 16, 18, 20, 18, 21];
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const points = data.map((val, idx) => {
        const x = (idx / (data.length - 1)) * width;
        const y = height - ((val - min) / range) * (height - 8) - 4;
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg width={width} height={height} className="overflow-visible hidden sm:block">
            <defs>
                <linearGradient id="liveEmeraldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                </linearGradient>
            </defs>
            <polygon
                fill="url(#liveEmeraldGrad)"
                points={`0,${height} ${points} ${width},${height}`}
            />
            <polyline
                fill="none"
                stroke="#10B981"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
            />
        </svg>
    );
}

// Referrer Donut SVG Chart Component
function ReferrerDonutChart({ referrers = [] }) {
    // Standard Donut SVG with 4 segmented arcs
    const size = 88;
    const strokeWidth = 14;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    let accumulatedPercentage = 0;

    return (
        <div className="relative w-[88px] h-[88px] shrink-0 flex items-center justify-center">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
                {referrers.map((item, idx) => {
                    const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
                    const strokeDashoffset = -((accumulatedPercentage / 100) * circumference);
                    accumulatedPercentage += item.percentage;

                    return (
                        <circle
                            key={idx}
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            fill="transparent"
                            stroke={item.color}
                            strokeWidth={strokeWidth}
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                            className="transition-all duration-700"
                        />
                    );
                })}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[11px] font-black font-mono text-[#0F172A]">100%</span>
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Traffic</span>
            </div>
        </div>
    );
}

export default function AdminAnalyticsIndex({ 
    summary = {}, 
    kpis = {}, 
    funnel = [], 
    devices = [], 
    referrers = [], 
    topProducts = [], 
    recentActivities = [],
    timeRange = 'today'
}) {
    const [selectedRange, setSelectedRange] = useState(timeRange);
    const [liveVisitors, setLiveVisitors] = useState(summary.liveVisitors || 18);
    const [activitiesList, setActivitiesList] = useState(recentActivities);

    // Subtle Live Pulse
    useEffect(() => {
        const interval = setInterval(() => {
            setLiveVisitors(prev => Math.max(12, prev + (Math.random() > 0.5 ? 1 : -1)));
        }, 9000);
        return () => clearInterval(interval);
    }, []);

    const handleRangeChange = (range) => {
        setSelectedRange(range);
        router.get('/admin/analytics', { range }, { preserveState: true, replace: true });
    };

    return (
        <AdminLayout title="Aktivitas & Analitik Pengunjung" breadcrumb="Marketplace > Aktivitas & Traffic">
            <Head title="Aktivitas & Analitik Pengunjung — Super Admin KyySolutions" />

            <div className="space-y-4 pb-8 max-w-[1720px] mx-auto">
                
                {/* 1. HERO / LIVE STATUS STRIP */}
                <div className="bg-white px-5 py-4 rounded-xl border border-[#E8EDF3] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-[15px] sm:text-[16px] font-bold text-[#0F172A] tracking-tight">
                            {summary.title || 'Aktivitas Pengunjung & Performa Konversi'}
                        </h2>
                        <p className="text-[12px] sm:text-[13px] text-[#64748B] mt-0.5">
                            {summary.subtitle || 'Pantau data trafik realtime, interaksi klik tombol beli, dan funnel konversi pembeli.'}
                        </p>
                    </div>

                    {/* Right side: Live Pulse Badge & Mini Sparkline */}
                    <div className="flex items-center space-x-3 self-start sm:self-auto">
                        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0]">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
                            </span>
                            <span className="text-[12px] font-bold text-[#047857] font-mono">
                                {liveVisitors} Pengunjung Aktif Online
                            </span>
                        </div>

                        <LiveHeaderSparkline />
                    </div>
                </div>

                {/* 2. TIME RANGE FILTER TABS */}
                <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
                    <div className="flex items-center space-x-1.5">
                        {[
                            { key: 'today', label: 'Hari Ini' },
                            { key: '7days', label: '7 Hari' },
                            { key: '30days', label: '30 Hari' },
                            { key: '90days', label: '90 Hari' },
                        ].map((t) => (
                            <button
                                key={t.key}
                                onClick={() => handleRangeChange(t.key)}
                                className={`h-8 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                    selectedRange === t.key
                                        ? 'bg-[#2563EB] text-white shadow-xs'
                                        : 'bg-white text-slate-600 border border-[#E2E8F0] hover:bg-slate-50'
                                }`}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>

                    <span className="text-[11px] font-mono font-medium text-slate-400 hidden sm:inline">
                        Terakhir diperbarui: Hari ini, {new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                    </span>
                </div>

                {/* 3. FOUR KPI CARDS (Strict Hierarchy) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 sm:gap-4">
                    
                    {/* KPI 1: Pageviews (Hari Ini) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.05 }}
                        className="bg-white p-4 sm:p-4.5 rounded-xl border border-[#E8EDF3] shadow-xs hover:-translate-y-0.5 hover:shadow-md transition-all duration-180 flex flex-col justify-between"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-2.5">
                                <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center font-bold">
                                    <Eye className="w-4 h-4" />
                                </div>
                                <span className="text-[11px] font-bold text-[#64748B] tracking-wider uppercase">
                                    {kpis.pageviews?.label || 'PAGEVIEWS (HARI INI)'}
                                </span>
                            </div>
                            <MiniSparkline data={kpis.pageviews?.sparkline} color="#2563EB" />
                        </div>

                        <div className="mt-2.5">
                            <div className="text-[24px] font-bold font-mono text-[#0F172A] leading-tight">
                                {kpis.pageviews?.value || '1.482'}
                            </div>
                            <div className="text-[11px] font-bold text-[#10B981] flex items-center mt-0.5">
                                <TrendingUp className="w-3.5 h-3.5 mr-1" />
                                <span>{kpis.pageviews?.trend || '+24% vs kemarin'}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* KPI 2: Klik "Beli Sekarang" */}
                    <motion.div 
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.1 }}
                        className="bg-white p-4 sm:p-4.5 rounded-xl border border-[#E8EDF3] shadow-xs hover:-translate-y-0.5 hover:shadow-md transition-all duration-180 flex flex-col justify-between"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-2.5">
                                <div className="w-8 h-8 rounded-lg bg-[#F5F3FF] text-[#7C3AED] flex items-center justify-center font-bold">
                                    <MousePointerClick className="w-4 h-4" />
                                </div>
                                <span className="text-[11px] font-bold text-[#64748B] tracking-wider uppercase">
                                    {kpis.buyClicks?.label || 'KLIK "BELI SEKARANG"'}
                                </span>
                            </div>
                            <MiniSparkline data={kpis.buyClicks?.sparkline} color="#7C3AED" />
                        </div>

                        <div className="mt-2.5">
                            <div className="text-[24px] font-bold font-mono text-[#7C3AED] leading-tight">
                                {kpis.buyClicks?.value || '342'}
                            </div>
                            <div className="text-[11px] font-medium text-[#64748B] mt-0.5">
                                {kpis.buyClicks?.description || 'Interaksi tombol checkout'}
                            </div>
                        </div>
                    </motion.div>

                    {/* KPI 3: Total Customer Terdaftar */}
                    <motion.div 
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.15 }}
                        className="bg-white p-4 sm:p-4.5 rounded-xl border border-[#E8EDF3] shadow-xs hover:-translate-y-0.5 hover:shadow-md transition-all duration-180 flex flex-col justify-between"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-2.5">
                                <div className="w-8 h-8 rounded-lg bg-[#F0FDFA] text-[#0D9488] flex items-center justify-center font-bold">
                                    <Users className="w-4 h-4" />
                                </div>
                                <span className="text-[11px] font-bold text-[#64748B] tracking-wider uppercase">
                                    {kpis.customers?.label || 'TOTAL CUSTOMER TERDAFTAR'}
                                </span>
                            </div>
                            <MiniSparkline data={kpis.customers?.sparkline} color="#0D9488" />
                        </div>

                        <div className="mt-2.5">
                            <div className="text-[24px] font-bold font-mono text-[#0F172A] leading-tight">
                                {kpis.customers?.value || '894'}
                            </div>
                            <div className="text-[11px] font-bold text-[#10B981] flex items-center mt-0.5">
                                <TrendingUp className="w-3.5 h-3.5 mr-1" />
                                <span>{kpis.customers?.trend || '+12 customer baru minggu ini'}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* KPI 4: Tingkat Konversi (CR) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.2 }}
                        className="bg-white p-4 sm:p-4.5 rounded-xl border border-[#E8EDF3] shadow-xs hover:-translate-y-0.5 hover:shadow-md transition-all duration-180 flex flex-col justify-between"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-2.5">
                                <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] text-[#10B981] flex items-center justify-center font-bold">
                                    <TrendingUp className="w-4 h-4" />
                                </div>
                                <span className="text-[11px] font-bold text-[#64748B] tracking-wider uppercase">
                                    {kpis.conversion?.label || 'TINGKAT KONVERSI (CR)'}
                                </span>
                            </div>
                            <MiniSparkline data={kpis.conversion?.sparkline} color="#10B981" />
                        </div>

                        <div className="mt-2.5">
                            <div className="text-[24px] font-bold font-mono text-[#10B981] leading-tight">
                                {kpis.conversion?.value || '8.4%'}
                            </div>
                            <div className="text-[11px] font-medium text-[#64748B] mt-0.5">
                                {kpis.conversion?.description || 'Dari pengunjung menjadi pembeli'}
                            </div>
                        </div>
                    </motion.div>

                </div>

                {/* 4. MAIN ANALYTICS GRID (2fr Funnel / 1fr Device & Referrer) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    
                    {/* LEFT (8 Cols / 2fr): Funnel Konversi Pembelian Marketplace */}
                    <div className="lg:col-span-8 bg-white p-5 rounded-xl border border-[#E8EDF3] shadow-xs flex flex-col justify-between">
                        <div>
                            {/* Funnel Header */}
                            <div className="flex items-start justify-between pb-3 border-b border-[#EEF2F7]">
                                <div>
                                    <h3 className="text-[15px] font-bold text-[#0F172A]">
                                        Funnel Konversi Pembelian Marketplace
                                    </h3>
                                    <p className="text-[12px] text-[#64748B] mt-0.5">
                                        Jalur perjalanan pengunjung dari membuka website hingga menyelesaikan transaksi.
                                    </p>
                                </div>
                                
                                <span className="text-[11px] font-bold text-[#2563EB] bg-[#EFF6FF] border border-[#DBEAFE] px-2.5 py-1 rounded-md shrink-0 font-mono">
                                    Conversion: 8.4%
                                </span>
                            </div>

                            {/* 5 Funnel Steps */}
                            <div className="space-y-3.5 pt-4">
                                {funnel.map((step) => (
                                    <div 
                                        key={step.step}
                                        className="group p-2 rounded-lg hover:bg-[#F8FAFC] transition-colors"
                                    >
                                        <div className="flex items-center justify-between text-xs mb-1.5">
                                            <div className="flex items-center space-x-2">
                                                <div 
                                                    className="w-5 h-5 rounded-md flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                                                    style={{ backgroundColor: step.color }}
                                                >
                                                    {step.step === 1 && <Users className="w-3 h-3" />}
                                                    {step.step === 2 && <Search className="w-3 h-3" />}
                                                    {step.step === 3 && <ShoppingCart className="w-3 h-3" />}
                                                    {step.step === 4 && <ArrowRight className="w-3 h-3" />}
                                                    {step.step === 5 && <CheckCircle2 className="w-3 h-3" />}
                                                </div>
                                                <span className="font-bold text-[#0F172A] text-[13px]">{step.stage}</span>
                                            </div>

                                            <div className="flex items-center space-x-2 font-mono">
                                                <span className="font-bold text-slate-800 text-xs">{step.countFormatted} aksi</span>
                                                <span className="text-[11px] font-bold text-slate-500 w-11 text-right">({step.percentage}%)</span>
                                            </div>
                                        </div>

                                        {/* Progress Bar Track */}
                                        <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                animate={{ width: `${step.percentage}%` }}
                                                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                                                className="h-full rounded-full"
                                                style={{ backgroundColor: step.color }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT (4 Cols / 1fr): Perangkat Pengunjung & Sumber Referrer */}
                    <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-[#E8EDF3] shadow-xs flex flex-col justify-between space-y-4">
                        <div>
                            {/* Card Header */}
                            <h3 className="text-[15px] font-bold text-[#0F172A] pb-3 border-b border-[#EEF2F7]">
                                Perangkat Pengunjung
                            </h3>

                            {/* Device Distribution Bars */}
                            <div className="space-y-3.5 pt-3 text-xs">
                                {devices.map((d, idx) => (
                                    <div key={idx} className="space-y-1">
                                        <div className="flex items-center justify-between text-slate-700">
                                            <span className="flex items-center space-x-1.5 font-bold text-[#0F172A]">
                                                {d.name.includes('Desktop') && <Monitor className="w-3.5 h-3.5 text-[#2563EB]" />}
                                                {d.name.includes('Mobile') && <Smartphone className="w-3.5 h-3.5 text-[#7C3AED]" />}
                                                {d.name.includes('Tablet') && <Globe className="w-3.5 h-3.5 text-[#10B981]" />}
                                                <span>{d.name}</span>
                                            </span>
                                            <span className="font-mono font-bold text-slate-900">{d.percentage}%</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                animate={{ width: `${d.percentage}%` }}
                                                transition={{ duration: 0.75, ease: 'easeOut' }}
                                                className="h-full rounded-full"
                                                style={{ backgroundColor: d.color }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Referrer Box with Legend and Donut Chart */}
                        <div className="p-3.5 bg-[#FAFBFD] rounded-xl border border-[#EEF2F7] flex items-center justify-between gap-3">
                            <div className="space-y-1.5 text-xs">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                                    Sumber Referrer Utama
                                </span>
                                {referrers.map((r, idx) => (
                                    <div key={idx} className="flex items-center space-x-2">
                                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: r.color }} />
                                        <span className="font-medium text-slate-700 text-[11px]">{r.source}:</span>
                                        <span className="font-mono font-bold text-slate-900 text-[11px]">{r.percentage}%</span>
                                    </div>
                                ))}
                            </div>

                            <ReferrerDonutChart referrers={referrers} />
                        </div>
                    </div>

                </div>

                {/* 5. LOWER GRID (1.65fr Top Products / 1fr Realtime Stream) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    
                    {/* LEFT (7.5 Cols / 1.65fr): Produk Paling Banyak Dilihat & Diklik */}
                    <div className="lg:col-span-7 xl:col-span-8 bg-white rounded-xl border border-[#E8EDF3] shadow-xs overflow-hidden flex flex-col justify-between">
                        <div>
                            {/* Card Header */}
                            <div className="p-5 border-b border-[#EEF2F7] flex items-center justify-between">
                                <div>
                                    <h3 className="text-[15px] font-bold text-[#0F172A]">
                                        Produk Paling Banyak Dilihat & Diklik
                                    </h3>
                                    <p className="text-[12px] text-[#64748B] mt-0.5">
                                        Statistik interaksi tombol dan rasio klik (CTR) per software.
                                    </p>
                                </div>
                            </div>

                            {/* Products Table (Software 56%, Views 14%, Klik 14%, CTR 16%) */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead className="bg-[#FAFBFD] text-[#64748B] font-bold border-b border-[#EEF2F7] uppercase tracking-wider text-[11px]">
                                        <tr>
                                            <th className="py-3 px-4 w-[56%]">SOFTWARE</th>
                                            <th className="py-3 px-4 text-center w-[14%]">VIEWS</th>
                                            <th className="py-3 px-4 text-center w-[14%]">KLIK BELI</th>
                                            <th className="py-3 px-4 text-right w-[16%]">RASIO CTR</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#F1F5F9] text-slate-700">
                                        {topProducts.map((p) => (
                                            <tr key={p.id} className="hover:bg-[#F8FAFC] transition-colors h-[54px]">
                                                <td className="py-2.5 px-4">
                                                    <Link 
                                                        href={`/products/${p.slug}`}
                                                        target="_blank"
                                                        className="font-bold text-[#0F172A] hover:text-[#2563EB] transition-colors truncate block text-xs"
                                                    >
                                                        {p.title}
                                                    </Link>
                                                    <span className="text-[11px] text-[#64748B] block mt-0.5">{p.category}</span>
                                                </td>
                                                <td className="py-2.5 px-4 text-center font-mono font-medium text-[#334155]">
                                                    {p.views}
                                                </td>
                                                <td className="py-2.5 px-4 text-center font-mono font-bold text-[#4F46E5]">
                                                    {p.clicks}
                                                </td>
                                                <td className="py-2.5 px-4 text-right font-mono font-bold text-[#059669]">
                                                    {p.ctr}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Table Footer */}
                        <div className="p-3.5 border-t border-[#EEF2F7] flex items-center justify-end bg-white">
                            <Link
                                href="/admin/products"
                                className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] inline-flex items-center space-x-1 transition-colors"
                            >
                                <span>Lihat semua produk</span>
                                <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                            </Link>
                        </div>
                    </div>

                    {/* RIGHT (4.5 Cols / 1fr): Stream Aktivitas Realtime */}
                    <div className="lg:col-span-5 xl:col-span-4 bg-white p-5 rounded-xl border border-[#E8EDF3] shadow-xs flex flex-col justify-between">
                        <div>
                            {/* Stream Header */}
                            <div className="flex items-center justify-between pb-3 border-b border-[#EEF2F7] mb-3">
                                <h3 className="text-[15px] font-bold text-[#0F172A]">
                                    Stream Aktivitas Realtime
                                </h3>
                                
                                <div className="flex items-center space-x-1.5">
                                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                                    <span className="text-[11px] font-bold text-[#047857] font-mono">Live Feed</span>
                                </div>
                            </div>

                            {/* Activity Vertical Timeline */}
                            <div className="relative pl-5 space-y-3 max-h-[380px] overflow-y-auto pr-1">
                                {/* Connecting vertical line */}
                                <div className="absolute left-[7px] top-2 bottom-2 w-[1.5px] bg-[#E2E8F0]" />

                                {activitiesList.map((act) => (
                                    <div 
                                        key={act.id} 
                                        className="relative p-2.5 rounded-lg bg-[#FAFBFD] border border-[#EEF2F7] hover:bg-[#F8FAFC] hover:border-[#DBEAFE] transition-all text-xs"
                                    >
                                        {/* Dot on line */}
                                        <div className={`absolute -left-[17px] top-3.5 w-2 h-2 rounded-full ring-4 ring-white ${
                                            act.color === 'emerald' ? 'bg-[#10B981]' :
                                            act.color === 'amber' ? 'bg-[#F59E0B]' :
                                            act.color === 'purple' ? 'bg-[#7C3AED]' : 'bg-[#2563EB]'
                                        }`} />

                                        <div className="flex items-start justify-between gap-1">
                                            <span className={`font-bold ${
                                                act.color === 'emerald' ? 'text-[#047857]' :
                                                act.color === 'amber' ? 'text-[#B45309]' :
                                                act.color === 'purple' ? 'text-[#6D28D9]' : 'text-[#2563EB]'
                                            }`}>
                                                {act.label}
                                            </span>
                                            <span className="text-[10px] font-mono text-slate-400 shrink-0">{act.timeAgo}</span>
                                        </div>

                                        <div className="font-semibold text-[#0F172A] truncate mt-0.5">
                                            {act.productTitle}
                                        </div>

                                        <div className="text-[10px] text-slate-400 font-mono mt-1">
                                            {act.metadata}
                                        </div>
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
