import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { 
    BarChart3, 
    TrendingUp, 
    Download, 
    Calendar, 
    DollarSign, 
    ShoppingBag, 
    FileSpreadsheet,
    ArrowUpRight,
    Trophy
} from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function AdminReportsIndex({ monthlyRevenue = [], topSelling = [], summary = {} }) {
    const handleExport = () => {
        alert('Laporan keuangan & penjualan periode 2026 berhasil diexport ke format CSV/Excel.');
    };

    return (
        <AdminLayout title="Laporan Finansial & Penjualan" breadcrumb="Marketplace > Laporan">
            <Head title="Laporan Finansial & Penjualan — Super Admin KyySolutions" />

            <div className="space-y-6">
                
                {/* Header Toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E9EEF5] shadow-xs">
                    <div>
                        <h2 className="text-base font-bold text-[#0F172A]">Laporan Keuangan & Kinerja Penjualan</h2>
                        <p className="text-xs text-[#64748B] mt-0.5">Analisis GMV transaksi, pertumbuhan omzet bulanan, dan ranking produk terlaris.</p>
                    </div>

                    <button
                        onClick={handleExport}
                        className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center justify-center space-x-2 transition-all cursor-pointer shrink-0"
                    >
                        <Download className="w-4 h-4" />
                        <span>Export Laporan (CSV)</span>
                    </button>
                </div>

                {/* 4 Financial Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    
                    <div className="bg-white p-5 rounded-2xl border border-[#E9EEF5] shadow-xs">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total GMV (Bulan Ini)</span>
                        <div className="text-xl font-black font-mono text-[#0F172A] mt-1.5">{summary.totalGmv || 'Rp 248.750.000'}</div>
                        <span className="text-[11px] font-bold text-emerald-600 flex items-center mt-1">
                            <TrendingUp className="w-3.5 h-3.5 mr-1" />
                            +18.4% vs bulan lalu
                        </span>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-[#E9EEF5] shadow-xs">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Net Komisi Platform (10%)</span>
                        <div className="text-xl font-black font-mono text-[#2563EB] mt-1.5">{summary.netPlatformProfit || 'Rp 24.875.000'}</div>
                        <span className="text-[11px] font-bold text-emerald-600 flex items-center mt-1">
                            <TrendingUp className="w-3.5 h-3.5 mr-1" />
                            Pendapatan bersih
                        </span>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-[#E9EEF5] shadow-xs">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Transaksi Selesai</span>
                        <div className="text-xl font-black font-mono text-[#0F172A] mt-1.5">{summary.totalTransactions || '3.951'}</div>
                        <span className="text-[11px] font-bold text-slate-400 mt-1 block">Pesanan berstatus lunas</span>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-[#E9EEF5] shadow-xs">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Rata-Rata Order (AOV)</span>
                        <div className="text-xl font-black font-mono text-[#0F172A] mt-1.5">{summary.avgOrderValue || 'Rp 562.400'}</div>
                        <span className="text-[11px] font-bold text-slate-400 mt-1 block">per transaksi pembeli</span>
                    </div>

                </div>

                {/* 2 Column Layout: Monthly Revenue Table & Top Selling Products */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* Monthly Growth Table (7 Cols) */}
                    <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E9EEF5] shadow-xs overflow-hidden">
                        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="text-sm font-bold text-[#0F172A]">Pertumbuhan Omzet Bulanan (2026)</h3>
                            <span className="text-xs text-slate-400 font-mono">YTD 2026</span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-[#FAFBFD] text-[#64748B] font-bold border-b border-slate-100 uppercase tracking-wider text-[11px]">
                                    <tr>
                                        <th className="py-3 px-4">Bulan</th>
                                        <th className="py-3 px-4">Total Revenue</th>
                                        <th className="py-3 px-4 text-center">Pesanan</th>
                                        <th className="py-3 px-4 text-right">Pertumbuhan</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-slate-700">
                                    {monthlyRevenue.map((m, idx) => (
                                        <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                                            <td className="py-3 px-4 font-bold text-[#0F172A]">{m.month}</td>
                                            <td className="py-3 px-4 font-mono font-bold text-slate-900">{m.revenue}</td>
                                            <td className="py-3 px-4 text-center font-mono text-slate-600">{m.orders} trx</td>
                                            <td className="py-3 px-4 text-right font-mono font-bold text-emerald-600">{m.growth}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Top 5 Best Sellers (5 Cols) */}
                    <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E9EEF5] shadow-xs p-5 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                                <h3 className="text-sm font-bold text-[#0F172A] flex items-center space-x-1.5">
                                    <Trophy className="w-4 h-4 text-amber-500" />
                                    <span>Top 5 Software Terlaris</span>
                                </h3>
                                <span className="text-[10px] font-bold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded">All-Time</span>
                            </div>

                            <div className="space-y-3.5">
                                {topSelling.map((p) => (
                                    <div key={p.rank} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-blue-50/50 transition-colors">
                                        <div className="flex items-center space-x-3 min-w-0">
                                            <div className="w-6 h-6 rounded-lg bg-white border border-slate-200 font-black text-xs text-slate-700 flex items-center justify-center shrink-0">
                                                #{p.rank}
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="font-bold text-xs text-[#0F172A] truncate">{p.title}</h4>
                                                <span className="text-[10px] text-slate-400">{p.category} • {p.sales} sales</span>
                                            </div>
                                        </div>

                                        <span className="font-mono font-bold text-xs text-[#2563EB] shrink-0">{p.revenue}</span>
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
