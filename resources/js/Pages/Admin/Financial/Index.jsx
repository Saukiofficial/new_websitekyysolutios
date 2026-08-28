import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { 
    CreditCard, 
    Percent, 
    ArrowDownToLine, 
    Check, 
    X, 
    FileText, 
    Clock, 
    CheckCircle2, 
    Building2,
    DollarSign
} from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function AdminFinancialIndex({ 
    activeTab = 'payments', 
    payments = [], 
    commissions = [], 
    withdrawals = [], 
    totalCommissionFormatted = 'Rp 0', 
    title = 'Monitoring Keuangan Platform' 
}) {
    const currentTab = activeTab || 'payments';
    const pageTitle = title || 'Monitoring Keuangan Platform';
    const paymentList = Array.isArray(payments) ? payments : [];
    const commissionList = Array.isArray(commissions) ? commissions : [];
    const withdrawalList = Array.isArray(withdrawals) ? withdrawals : [];

    return (
        <AdminLayout title={pageTitle} breadcrumb={`Transaksi > ${currentTab.toUpperCase()}`}>
            <Head title={pageTitle} />

            <div className="space-y-6">
                
                {/* Financial Navigation Tabs */}
                <div className="flex items-center space-x-2 border-b border-slate-200 pb-3 overflow-x-auto">
                    <Link
                        href="/admin/payments"
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                            currentTab === 'payments' ? 'bg-[#1557C8] text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                        }`}
                    >
                        <CreditCard className="w-3.5 h-3.5 inline mr-1.5" />
                        <span>Log Pembayaran Gateway</span>
                    </Link>

                    <Link
                        href="/admin/commissions"
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                            currentTab === 'commissions' ? 'bg-[#1557C8] text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                        }`}
                    >
                        <Percent className="w-3.5 h-3.5 inline mr-1.5" />
                        <span>Bagi Hasil Komisi (10%)</span>
                    </Link>

                    <Link
                        href="/admin/withdrawals"
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                            currentTab === 'withdrawals' ? 'bg-[#1557C8] text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                        }`}
                    >
                        <ArrowDownToLine className="w-3.5 h-3.5 inline mr-1.5" />
                        <span>Pencairan Dana (Withdrawals)</span>
                    </Link>
                </div>

                {/* 1. PAYMENTS TAB */}
                {currentTab === 'payments' && (
                    <div className="bg-white rounded-2xl border border-[#E9EEF5] shadow-xs overflow-hidden">
                        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-bold text-[#0F172A]">Riwayat Transaksi Gateway Pembayaran</h3>
                                <p className="text-xs text-slate-400">Semua log webhook dan status transaksi QRIS, Virtual Account, & Kartu.</p>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-[#FAFBFD] text-[#64748B] font-bold border-b border-slate-100 uppercase tracking-wider text-[11px]">
                                    <tr>
                                        <th className="py-3.5 px-4 font-mono">Invoice</th>
                                        <th className="py-3.5 px-4">Nama Pembeli</th>
                                        <th className="py-3.5 px-4">Provider Gateway</th>
                                        <th className="py-3.5 px-4 font-mono">Referensi Bayar</th>
                                        <th className="py-3.5 px-4">Nominal</th>
                                        <th className="py-3.5 px-4">Status</th>
                                        <th className="py-3.5 px-4">Waktu Lunas</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-slate-700">
                                    {paymentList.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="py-8 text-center text-slate-400">
                                                Belum ada data pembayaran gateway.
                                            </td>
                                        </tr>
                                    ) : (
                                        paymentList.map((p) => (
                                            <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                                                <td className="py-3.5 px-4 font-mono font-bold text-[#2563EB]">{p.orderNumber}</td>
                                                <td className="py-3.5 px-4 font-bold text-[#0F172A]">{p.customerName}</td>
                                                <td className="py-3.5 px-4">
                                                    <span className="px-2 py-0.5 rounded bg-blue-50 text-[#2563EB] font-bold font-mono text-[10px]">
                                                        {p.provider}
                                                    </span>
                                                </td>
                                                <td className="py-3.5 px-4 font-mono text-slate-500">{p.reference}</td>
                                                <td className="py-3.5 px-4 font-mono font-bold text-[#0F172A]">{p.amount}</td>
                                                <td className="py-3.5 px-4">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                                        {p.status === 'paid' ? 'LUNAS' : p.status}
                                                    </span>
                                                </td>
                                                <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">{p.paidAt}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* 2. COMMISSIONS TAB */}
                {currentTab === 'commissions' && (
                    <div className="space-y-6">
                        
                        {/* Commission KPI Banner */}
                        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#06152E] to-[#1E3A8A] text-white flex items-center justify-between shadow-md">
                            <div>
                                <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider block">Total Pendapatan Komisi Bersih Platform (10%)</span>
                                <span className="text-3xl font-black font-mono mt-1 block">{totalCommissionFormatted}</span>
                                <p className="text-xs text-slate-300 mt-1">Dihitung otomatis 10% dari setiap penjualan software oleh mitra seller.</p>
                            </div>
                            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white border border-white/20">
                                <Percent className="w-8 h-8 text-blue-400" />
                            </div>
                        </div>

                        {/* Commission Split Table */}
                        <div className="bg-white rounded-2xl border border-[#E9EEF5] shadow-xs overflow-hidden">
                            <div className="p-5 border-b border-slate-100">
                                <h3 className="text-sm font-bold text-[#0F172A]">Rincian Bagi Hasil per Transaksi</h3>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead className="bg-[#FAFBFD] text-[#64748B] font-bold border-b border-slate-100 uppercase tracking-wider text-[11px]">
                                        <tr>
                                            <th className="py-3.5 px-4 font-mono">Invoice</th>
                                            <th className="py-3.5 px-4">Software Terjual</th>
                                            <th className="py-3.5 px-4">Mitra Seller</th>
                                            <th className="py-3.5 px-4">Harga Kotor</th>
                                            <th className="py-3.5 px-4 text-emerald-600 font-bold">Platform (10%)</th>
                                            <th className="py-3.5 px-4 text-blue-600 font-bold">Seller Net (90%)</th>
                                            <th className="py-3.5 px-4">Tanggal</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 text-slate-700">
                                        {commissionList.length === 0 ? (
                                            <tr>
                                                <td colSpan={7} className="py-8 text-center text-slate-400">
                                                    Belum ada komisi transaksi tercatat.
                                                </td>
                                            </tr>
                                        ) : (
                                            commissionList.map((c) => (
                                                <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                                                    <td className="py-3.5 px-4 font-mono font-bold text-[#2563EB]">{c.orderNumber}</td>
                                                    <td className="py-3.5 px-4 font-semibold text-slate-900">{c.productTitle}</td>
                                                    <td className="py-3.5 px-4 text-slate-600">{c.sellerName}</td>
                                                    <td className="py-3.5 px-4 font-mono font-bold">{c.grossPrice}</td>
                                                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-600">+{c.platformEarning}</td>
                                                    <td className="py-3.5 px-4 font-mono font-bold text-blue-600">+{c.sellerEarning}</td>
                                                    <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">{c.date}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* 3. WITHDRAWALS TAB */}
                {currentTab === 'withdrawals' && (
                    <div className="bg-white rounded-2xl border border-[#E9EEF5] shadow-xs overflow-hidden">
                        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-bold text-[#0F172A]">Permohonan Penarikan Saldo (Payout Escrow)</h3>
                                <p className="text-xs text-slate-400">Verifikasi dan transfer saldo pendapatan mitra developer penjual.</p>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-[#FAFBFD] text-[#64748B] font-bold border-b border-slate-100 uppercase tracking-wider text-[11px]">
                                    <tr>
                                        <th className="py-3.5 px-4 font-mono">ID Payout</th>
                                        <th className="py-3.5 px-4">Toko Seller</th>
                                        <th className="py-3.5 px-4">Rekening Tujuan</th>
                                        <th className="py-3.5 px-4">Nominal Penarikan</th>
                                        <th className="py-3.5 px-4">Status</th>
                                        <th className="py-3.5 px-4">Waktu Request</th>
                                        <th className="py-3.5 px-4 text-right">Aksi Transfer</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-slate-700">
                                    {withdrawalList.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="py-8 text-center text-slate-400">
                                                Belum ada request withdrawal saat ini.
                                            </td>
                                        </tr>
                                    ) : (
                                        withdrawalList.map((w, idx) => (
                                            <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                                                <td className="py-3.5 px-4 font-mono font-bold text-[#2563EB]">{w.id}</td>
                                                <td className="py-3.5 px-4 font-bold text-[#0F172A]">{w.seller}</td>
                                                <td className="py-3.5 px-4 font-mono font-medium text-slate-700 flex items-center space-x-1 mt-2.5">
                                                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                                                    <span>{w.bank}</span>
                                                </td>
                                                <td className="py-3.5 px-4 font-mono font-bold text-[#0F172A]">{w.amount}</td>
                                                <td className="py-3.5 px-4">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                                        w.status === 'Selesai' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                                                    }`}>
                                                        {w.status}
                                                    </span>
                                                </td>
                                                <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">{w.date}</td>
                                                <td className="py-3.5 px-4 text-right">
                                                    {w.status === 'Pending' ? (
                                                        <button
                                                            onClick={() => alert(`Proses payout ${w.id} telah disetujui & ditransfer.`)}
                                                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold transition-colors cursor-pointer"
                                                        >
                                                            Kirim Dana (Transfer)
                                                        </button>
                                                    ) : (
                                                        <span className="text-[11px] font-semibold text-slate-400 font-mono">Ditransfer</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            </div>
        </AdminLayout>
    );
}
