import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    WalletCards, 
    DollarSign, 
    ShoppingBag, 
    Star, 
    CirclePlus, 
    ArrowUpRight, 
    TrendingUp, 
    Store, 
    ArrowRight,
    PackageCheck,
    FileCode,
    Sparkles
} from 'lucide-react';
import SellerLayout from '@/Layouts/SellerLayout';

export default function SellerDashboard({ store = {}, kpis = {}, recentSales = [], monthlyEarnings = [] }) {
    const [hoveredBarIndex, setHoveredBarIndex] = useState(null);

    // Maximum capacity for Y-axis scale (800k IDR)
    const maxCapacity = 800000;
    const yAxisLabels = ['Rp 800K', 'Rp 600K', 'Rp 400K', 'Rp 200K', 'Rp 0'];

    return (
        <SellerLayout title="Seller Studio Dashboard" store={store}>
            <Head title="Seller Studio — KyySolutions Mitra Dashboard" />

            <div className="space-y-6 max-w-full">
                
                {/* =========================================================================
                    SECTION 23–28: HERO OVERVIEW CARD
                   ========================================================================= */}
                <div className="relative bg-white border border-[#E2E8F0] rounded-[16px] p-6 sm:p-7 shadow-[0_8px_32px_rgba(37,99,235,0.06)] overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
                    
                    {/* Background Decorative Analytics Wave / Glow (Section 27) */}
                    <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none opacity-[0.09] hidden md:flex items-end justify-end pr-8 pb-4">
                        <div className="flex items-end space-x-2.5 h-24">
                            <div className="w-4 h-12 bg-[#2563EB] rounded-t-sm" />
                            <div className="w-4 h-16 bg-[#2563EB] rounded-t-sm" />
                            <div className="w-4 h-10 bg-[#2563EB] rounded-t-sm" />
                            <div className="w-4 h-20 bg-[#2563EB] rounded-t-sm" />
                            <div className="w-4 h-14 bg-[#2563EB] rounded-t-sm" />
                            <div className="w-4 h-24 bg-[#2563EB] rounded-t-sm" />
                        </div>
                    </div>

                    {/* Left: Store Label, Title & Description (Section 24, 25, 26) */}
                    <div className="relative z-10 space-y-1.5 max-w-2xl">
                        <div className="flex items-center space-x-2 text-xs font-bold text-[#2563EB]">
                            <Store className="w-4 h-4 text-[#2563EB]" />
                            <span>{store.name || 'KyySolutions Official'}</span>
                        </div>

                        <h1 className="text-2xl sm:text-[28px] font-bold text-[#0F172A] tracking-tight leading-snug">
                            Ringkasan Penjualan & Pendapatan Mitra
                        </h1>

                        <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                            Pantau performa penjualan software, pendapatan bersih (90%), dan saldo siap tarik Anda.
                        </p>
                    </div>

                    {/* Right: Primary CTA Button (Section 28) */}
                    <div className="relative z-10 shrink-0 self-start md:self-auto w-full sm:w-auto">
                        <Link
                            href="/seller/products"
                            className="w-full sm:w-auto h-12 px-5 rounded-[12px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-[13px] font-semibold flex items-center justify-center space-x-2 shadow-[0_8px_20px_rgba(37,99,235,0.22)] hover:-translate-y-0.5 transition-all cursor-pointer"
                        >
                            <CirclePlus className="w-4 h-4 text-white" />
                            <span>Unggah Software Baru</span>
                        </Link>
                    </div>

                </div>

                {/* =========================================================================
                    SECTION 29–36: 4 KPI CARDS ROW
                   ========================================================================= */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    
                    {/* KPI 1: Saldo Siap Tarik (Section 31 - Emerald Accent) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.06 }}
                        className="bg-white p-5 rounded-[14px] border border-[#E8EDF3] shadow-[0_1px_2px_rgba(15,23,42,0.03),0_8px_24px_rgba(15,23,42,0.04)] hover:shadow-[0_12px_30px_rgba(15,23,42,0.06)] hover:-translate-y-0.5 transition-all flex flex-col justify-between space-y-3 min-h-[155px]"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-[#475569]">Saldo Siap Tarik</span>
                            <div className="w-12 h-12 rounded-[14px] bg-[#ECFDF5] text-[#059669] flex items-center justify-center shrink-0">
                                <WalletCards className="w-5 h-5" />
                            </div>
                        </div>

                        <div>
                            <div className="text-2xl sm:text-[26px] font-bold font-mono text-[#059669] tracking-tight leading-none">
                                {kpis.walletBalance || 'Rp 263.250'}
                            </div>

                            <Link 
                                href="/seller/withdrawals" 
                                className="text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] inline-flex items-center space-x-1 mt-2.5 transition-colors group"
                            >
                                <span>Ajukan Penarikan</span>
                                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* KPI 2: Total Pendapatan (90%) (Section 32 - Blue Accent) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.12 }}
                        className="bg-white p-5 rounded-[14px] border border-[#E8EDF3] shadow-[0_1px_2px_rgba(15,23,42,0.03),0_8px_24px_rgba(15,23,42,0.04)] hover:shadow-[0_12px_30px_rgba(15,23,42,0.06)] hover:-translate-y-0.5 transition-all flex flex-col justify-between space-y-3 min-h-[155px]"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-[#475569]">Total Pendapatan (90%)</span>
                            <div className="w-12 h-12 rounded-[14px] bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
                                <DollarSign className="w-5 h-5" />
                            </div>
                        </div>

                        <div>
                            <div className="text-2xl sm:text-[26px] font-bold font-mono text-[#0F172A] tracking-tight leading-none">
                                {kpis.netEarnings || 'Rp 585.000'}
                            </div>
                            <div className="text-[11px] text-[#94A3B8] font-medium mt-2.5">
                                Akumulasi bagi hasil bersih
                            </div>
                        </div>
                    </motion.div>

                    {/* KPI 3: Software Terjual (Section 33 - Purple Accent) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.18 }}
                        className="bg-white p-5 rounded-[14px] border border-[#E8EDF3] shadow-[0_1px_2px_rgba(15,23,42,0.03),0_8px_24px_rgba(15,23,42,0.04)] hover:shadow-[0_12px_30px_rgba(15,23,42,0.06)] hover:-translate-y-0.5 transition-all flex flex-col justify-between space-y-3 min-h-[155px]"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-[#475569]">Software Terjual</span>
                            <div className="w-12 h-12 rounded-[14px] bg-[#F5F3FF] text-[#7C3AED] flex items-center justify-center shrink-0">
                                <ShoppingBag className="w-5 h-5" />
                            </div>
                        </div>

                        <div>
                            <div className="text-2xl sm:text-[26px] font-bold font-mono text-[#0F172A] tracking-tight leading-none">
                                {kpis.totalSales || '1 Unit'}
                            </div>
                            <div className="text-[11px] font-bold text-[#059669] flex items-center space-x-1 mt-2.5">
                                <TrendingUp className="w-3.5 h-3.5" />
                                <span>+18% bulan ini</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* KPI 4: Rating Toko (Section 34 - Amber Accent) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.24 }}
                        className="bg-white p-5 rounded-[14px] border border-[#E8EDF3] shadow-[0_1px_2px_rgba(15,23,42,0.03),0_8px_24px_rgba(15,23,42,0.04)] hover:shadow-[0_12px_30px_rgba(15,23,42,0.06)] hover:-translate-y-0.5 transition-all flex flex-col justify-between space-y-3 min-h-[155px]"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-[#475569]">Rating Toko</span>
                            <div className="w-12 h-12 rounded-[14px] bg-[#FFFBEB] text-[#F59E0B] flex items-center justify-center shrink-0">
                                <Star className="w-5 h-5 fill-current" />
                            </div>
                        </div>

                        <div>
                            <div className="text-2xl sm:text-[26px] font-bold font-mono text-[#0F172A] tracking-tight leading-none">
                                {kpis.storeRating || '5.00 / 5.0'}
                            </div>
                            <div className="text-[11px] text-[#94A3B8] font-medium mt-2.5">
                                Dari {store.reviewsCount || 6} review pembeli
                            </div>
                        </div>
                    </motion.div>

                </div>

                {/* =========================================================================
                    SECTION 37–49: LOWER ANALYTICS GRID (1.65fr / 1fr)
                   ========================================================================= */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                    
                    {/* Left Card: Pertumbuhan Pendapatan Bulanan (Section 38–44) */}
                    <div className="lg:col-span-7 xl:col-span-8 bg-white p-6 rounded-[16px] border border-[#E8EDF3] shadow-[0_1px_2px_rgba(15,23,42,0.03),0_8px_24px_rgba(15,23,42,0.04)] space-y-6 flex flex-col justify-between">
                        
                        {/* Card Header (Section 38, 39) */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#F1F5F9]">
                            <div>
                                <h3 className="font-bold text-[#0F172A] text-base">
                                    Pertumbuhan Pendapatan Bulanan
                                </h3>
                                <p className="text-xs text-[#64748B] mt-0.5">
                                    Total pendapatan bersih 6 bulan terakhir
                                </p>
                            </div>

                            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#EFF6FF] text-[#2563EB] text-[11px] font-bold self-start sm:self-auto">
                                90% Revenue Share
                            </span>
                        </div>

                        {/* Vertical Bar Chart Container with Y-Axis and Grid (Section 40, 41, 42, 43, 44) */}
                        <div className="relative pt-2">
                            
                            {/* Horizontal Dashed Grid Lines & Y-Axis */}
                            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8 pr-2">
                                {yAxisLabels.map((lbl, idx) => (
                                    <div key={idx} className="flex items-center space-x-3 w-full">
                                        <span className="w-14 text-[11px] font-mono text-[#94A3B8] text-right shrink-0">
                                            {lbl}
                                        </span>
                                        <div className="flex-1 border-b border-dashed border-[#EDF2F7]" />
                                    </div>
                                ))}
                            </div>

                            {/* Dual-Layer Vertical Bars Area */}
                            <div className="pl-16 pr-4 pt-4 pb-2 h-64 flex items-end justify-between gap-2 sm:gap-4 relative z-10">
                                {monthlyEarnings.map((item, idx) => {
                                    const grossHeight = Math.min(100, Math.round((item.gross / maxCapacity) * 100));
                                    const netHeight = Math.min(100, Math.round((item.net / maxCapacity) * 100));
                                    const isHovered = hoveredBarIndex === idx;

                                    return (
                                        <div 
                                            key={idx} 
                                            className="flex-1 flex flex-col items-center justify-end h-full relative cursor-pointer group"
                                            onMouseEnter={() => setHoveredBarIndex(idx)}
                                            onMouseLeave={() => setHoveredBarIndex(null)}
                                        >
                                            {/* Interactive Floating Tooltip (Section 44) */}
                                            {isHovered && (
                                                <div className="absolute bottom-full mb-3 z-30 bg-white border border-[#E2E8F0] shadow-xl rounded-xl p-3 text-left w-44 pointer-events-none transition-all">
                                                    <div className="text-[11px] font-bold text-[#0F172A] border-b border-slate-100 pb-1 mb-1.5">
                                                        {item.month} 2026
                                                    </div>
                                                    <div className="space-y-1 text-[11px]">
                                                        <div className="flex justify-between text-slate-500">
                                                            <span>Gross Sale:</span>
                                                            <span className="font-mono font-semibold text-slate-800">{item.grossFormatted}</span>
                                                        </div>
                                                        <div className="flex justify-between font-bold text-[#2563EB]">
                                                            <span>Mitra (90%):</span>
                                                            <span className="font-mono">{item.netFormatted}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Bar Pillar */}
                                            <div className="w-full max-w-[48px] bg-[#F1F5F9] rounded-t-[8px] overflow-hidden h-full flex items-end relative transition-transform group-hover:scale-105">
                                                {/* Gross Track Capacity Top Accent */}
                                                <div 
                                                    className="absolute w-full bg-[#E2E8F0]/60" 
                                                    style={{ height: `${grossHeight}%`, bottom: 0 }}
                                                />

                                                {/* Blue Net Revenue Foreground Fill (Section 42, 43) */}
                                                <motion.div 
                                                    initial={{ height: 0 }}
                                                    animate={{ height: `${netHeight}%` }}
                                                    transition={{ duration: 0.75, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                                                    className="w-full rounded-t-[8px] relative z-10"
                                                    style={{ background: 'linear-gradient(180deg, #60A5FA 0%, #2563EB 100%)' }}
                                                />
                                            </div>

                                            {/* X-Axis Month Label */}
                                            <span className="text-xs font-bold text-[#64748B] mt-2.5">
                                                {item.month}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                        </div>

                        {/* Chart Footnote / Legend */}
                        <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-100">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1.5">
                                    <div className="w-3 h-3 rounded-xs bg-[#2563EB]" />
                                    <span className="text-[11px] font-semibold text-[#475569]">Pendapatan Mitra (90%)</span>
                                </div>
                                <div className="flex items-center space-x-1.5">
                                    <div className="w-3 h-3 rounded-xs bg-[#E2E8F0]" />
                                    <span className="text-[11px] font-semibold text-slate-400">Total Penjualan Gross</span>
                                </div>
                            </div>
                            <span className="text-[11px] font-mono text-slate-400">Performa Transaksi Real-time</span>
                        </div>

                    </div>

                    {/* Right Card: Penjualan Terkini (Section 45–49) */}
                    <div className="lg:col-span-5 xl:col-span-4 bg-white p-6 rounded-[16px] border border-[#E8EDF3] shadow-[0_1px_2px_rgba(15,23,42,0.03),0_8px_24px_rgba(15,23,42,0.04)] space-y-4 flex flex-col justify-between">
                        
                        <div>
                            {/* Card Header (Section 45) */}
                            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                                <h3 className="font-bold text-[#0F172A] text-base">
                                    Penjualan Terkini
                                </h3>
                                <Link 
                                    href="/seller/products" 
                                    className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
                                >
                                    Lihat Semua
                                </Link>
                            </div>

                            {/* Recent Sales List (Section 46, 47, 48, 49) */}
                            <div className="divide-y divide-[#F1F5F9] text-xs">
                                {recentSales.length === 0 ? (
                                    <div className="py-12 text-center text-slate-400 space-y-1">
                                        <ShoppingBag className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                                        <p className="font-bold text-xs text-slate-600">Belum ada penjualan terbaru.</p>
                                        <p className="text-[11px]">Penjualan baru akan muncul di sini secara otomatis.</p>
                                    </div>
                                ) : (
                                    recentSales.map((sale) => (
                                        <div key={sale.id} className="py-3.5 flex items-center justify-between gap-3 group">
                                            
                                            {/* Left: Product Icon + Title + Metadata */}
                                            <div className="flex items-center space-x-3 min-w-0">
                                                <div className="w-11 h-11 rounded-[12px] bg-[#F8FBFF] border border-[#DBEAFE] text-[#2563EB] flex items-center justify-center shrink-0 group-hover:bg-[#EFF6FF] transition-colors">
                                                    <FileCode className="w-5 h-5" />
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="font-semibold text-xs sm:text-[13px] text-[#0F172A] truncate max-w-[180px] sm:max-w-[210px] leading-snug">
                                                        {sale.productTitle}
                                                    </div>
                                                    <div className="text-[11px] text-[#94A3B8] truncate mt-0.5">
                                                        {sale.buyerName} • {sale.createdAt}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right: Net Earning in Green + Gross Amount */}
                                            <div className="text-right shrink-0">
                                                <div className="font-mono font-bold text-xs sm:text-[13px] text-[#059669] leading-tight">
                                                    {sale.earningsFormatted}
                                                </div>
                                                <div className="text-[10px] text-[#94A3B8] font-mono mt-0.5">
                                                    Gross: {sale.amountFormatted}
                                                </div>
                                            </div>

                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Bottom CTA to Store Settings or Product Upload */}
                        <div className="pt-3 border-t border-slate-100">
                            <Link
                                href="/seller/products"
                                className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200 hover:border-blue-200 text-xs font-bold text-slate-700 hover:text-[#2563EB] flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
                            >
                                <span>Kelola Semua Software Toko</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                    </div>

                </div>

            </div>
        </SellerLayout>
    );
}
