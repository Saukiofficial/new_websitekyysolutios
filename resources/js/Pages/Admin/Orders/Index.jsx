import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ShoppingCart, 
    Search, 
    Filter, 
    CreditCard, 
    FileText, 
    CheckCircle2, 
    Clock, 
    AlertTriangle, 
    Eye, 
    X, 
    KeyRound, 
    Mail, 
    Phone, 
    ShieldCheck,
    Download
} from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function AdminOrdersIndex({ orders, counts, filters }) {
    const [selectedStatus, setSelectedStatus] = useState(filters.status || 'all');
    const [searchQuery, setSearchQuery] = useState(filters.q || '');
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleFilterChange = (status) => {
        setSelectedStatus(status);
        router.get('/admin/orders', {
            status: status,
            q: searchQuery,
        }, { preserveState: true, replace: true });
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        router.get('/admin/orders', {
            status: selectedStatus,
            q: searchQuery,
        }, { preserveState: true, replace: true });
    };

    return (
        <AdminLayout title="Monitoring Order & Transaksi" breadcrumb="Transaksi > Order">
            <Head title="Daftar Pesanan & Transaksi — Super Admin KyySolutions" />

            <div className="space-y-6">
                
                {/* 1. Header Toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E9EEF5] shadow-xs">
                    <div>
                        <h2 className="text-base font-bold text-[#0F172A]">Daftar Seluruh Pesanan Platform</h2>
                        <p className="text-xs text-[#64748B] mt-0.5">Monitoring status transaksi, gateway pembayaran, penerbitan lisensi, dan faktur.</p>
                    </div>

                    <div className="flex items-center space-x-2 text-xs font-mono font-bold text-slate-700 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                        <span>Total Transaksi:</span>
                        <span className="text-[#2563EB]">{counts.all}</span>
                    </div>
                </div>

                {/* 2. Status Filter Tabs & Search */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    
                    {/* Status Tabs */}
                    <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                        {[
                            { key: 'all', label: 'Semua Order', count: counts.all },
                            { key: 'paid', label: 'Lunas (Paid)', count: counts.paid, badgeColor: 'bg-emerald-100 text-emerald-800' },
                            { key: 'pending', label: 'Menunggu', count: counts.pending, badgeColor: 'bg-amber-100 text-amber-800' },
                            { key: 'failed', label: 'Gagal / Expired', count: counts.failed, badgeColor: 'bg-rose-100 text-rose-800' },
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => handleFilterChange(tab.key)}
                                className={`h-10 px-4 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer shrink-0 border ${
                                    selectedStatus === tab.key
                                        ? 'bg-[#1557C8] text-white border-[#1557C8] shadow-sm'
                                        : 'bg-white text-slate-600 border-[#E2E8F0] hover:bg-slate-50'
                                }`}
                            >
                                <span>{tab.label}</span>
                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                                    selectedStatus === tab.key ? 'bg-white/20 text-white' : (tab.badgeColor || 'bg-slate-100 text-slate-600')
                                }`}>
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Search Form */}
                    <form onSubmit={handleSearchSubmit} className="relative w-full lg:w-72">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari order ID / nama pembeli..."
                            className="w-full h-10 pl-9 pr-3 text-xs bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#93C5FD] transition-colors"
                        />
                    </form>

                </div>

                {/* 3. Orders Table */}
                <div className="bg-white rounded-2xl border border-[#E9EEF5] shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-[#FAFBFD] text-[#64748B] font-bold border-b border-slate-100 uppercase tracking-wider text-[11px]">
                                <tr>
                                    <th className="py-3.5 px-4 font-mono">Invoice / Order ID</th>
                                    <th className="py-3.5 px-4">Customer</th>
                                    <th className="py-3.5 px-4">Produk Dibeli</th>
                                    <th className="py-3.5 px-4">Metode Bayar</th>
                                    <th className="py-3.5 px-4">Total</th>
                                    <th className="py-3.5 px-4">Status</th>
                                    <th className="py-3.5 px-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-700">
                                {orders.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="py-12 text-center text-slate-400">
                                            <ShoppingCart className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                                            <p className="font-semibold text-xs">Belum ada data pesanan transaksi.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    orders.map((ord) => (
                                        <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                                            
                                            {/* Order Number */}
                                            <td className="py-3.5 px-4 font-mono font-bold text-[#2563EB]">
                                                {ord.orderNumber}
                                                <span className="block text-[10px] font-normal text-slate-400 font-sans mt-0.5">{ord.createdAt}</span>
                                            </td>

                                            {/* Customer */}
                                            <td className="py-3.5 px-4">
                                                <div className="font-bold text-[#0F172A]">{ord.customerName}</div>
                                                <div className="text-[10px] text-slate-400 font-mono">{ord.customerEmail}</div>
                                            </td>

                                            {/* Product Title */}
                                            <td className="py-3.5 px-4 font-semibold text-slate-800 max-w-[200px] truncate">
                                                {ord.productTitle}
                                            </td>

                                            {/* Payment Method */}
                                            <td className="py-3.5 px-4">
                                                <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px] font-bold">
                                                    <CreditCard className="w-3 h-3 text-[#2563EB]" />
                                                    <span>{ord.paymentMethod}</span>
                                                </span>
                                            </td>

                                            {/* Total */}
                                            <td className="py-3.5 px-4 font-bold font-mono text-[#0F172A]">
                                                {ord.totalFormatted}
                                            </td>

                                            {/* Status Badge */}
                                            <td className="py-3.5 px-4">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                                    ord.status === 'paid'
                                                        ? 'bg-[#DCFCE7] text-[#15803D]'
                                                        : (ord.status === 'pending' ? 'bg-[#FEF3C7] text-[#B45309]' : 'bg-[#FEE2E2] text-[#B91C1C]')
                                                }`}>
                                                    {ord.status === 'paid' ? 'Lunas' : (ord.status === 'pending' ? 'Menunggu' : 'Gagal')}
                                                </span>
                                            </td>

                                            {/* Actions */}
                                            <td className="py-3.5 px-4 text-right">
                                                <button
                                                    onClick={() => setSelectedOrder(ord)}
                                                    className="px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-600 text-[#2563EB] hover:text-white text-xs font-bold transition-colors inline-flex items-center space-x-1 cursor-pointer"
                                                >
                                                    <Eye className="w-3.5 h-3.5" />
                                                    <span>Detail</span>
                                                </button>
                                            </td>

                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            {/* Modal Detail Invoice & Lisensi */}
            <AnimatePresence>
                {selectedOrder && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedOrder(null)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="relative w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 z-10"
                        >
                            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold">
                                        <FileText className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-[#0F172A]">Rincian Faktur Pesanan</h3>
                                        <p className="text-[11px] font-mono text-[#2563EB] font-bold">{selectedOrder.orderNumber}</p>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-slate-600">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-4 text-xs">
                                
                                {/* Status Banner */}
                                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-between">
                                    <div className="flex items-center space-x-2 text-emerald-800 font-bold">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                        <span>Status Pembayaran: {selectedOrder.status === 'paid' ? 'LUNAS (TERVERIFIKASI)' : selectedOrder.status}</span>
                                    </div>
                                    <span className="text-[10px] font-mono text-emerald-700">{selectedOrder.paidAt}</span>
                                </div>

                                {/* Customer Info */}
                                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                                    <div className="font-bold text-[#0F172A]">Informasi Pembeli</div>
                                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                                        <div>Nama: <span className="font-bold text-slate-900">{selectedOrder.customerName}</span></div>
                                        <div>Telepon: <span className="font-mono text-slate-900">{selectedOrder.customerPhone || '-'}</span></div>
                                        <div className="col-span-2">Email: <span className="font-mono text-slate-900">{selectedOrder.customerEmail}</span></div>
                                    </div>
                                </div>

                                {/* Item Snapshot & License */}
                                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                                    <div className="font-bold text-[#0F172A]">Produk & Kunci Lisensi</div>
                                    <div className="text-[11px] text-slate-700 font-semibold">{selectedOrder.productTitle}</div>
                                    <div className="p-2 rounded-lg bg-blue-50/70 border border-blue-100 flex items-center justify-between">
                                        <span className="font-mono font-bold text-[#2563EB] text-[11px]">{selectedOrder.licenseKey}</span>
                                        <span className="text-[9px] font-bold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">Regular Commercial</span>
                                    </div>
                                </div>

                                {/* Financial Summary */}
                                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                                    <div className="flex justify-between text-slate-500">
                                        <span>Subtotal Software</span>
                                        <span className="font-mono font-semibold">Rp {new Intl.NumberFormat('id-ID').format(selectedOrder.subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-500">
                                        <span>Biaya Layanan Gateway</span>
                                        <span className="font-mono font-semibold">Rp {new Intl.NumberFormat('id-ID').format(selectedOrder.fee)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm font-bold text-[#0F172A] pt-2 border-t border-slate-200">
                                        <span>Total Pembayaran</span>
                                        <span className="font-mono text-[#2563EB]">{selectedOrder.totalFormatted}</span>
                                    </div>
                                </div>

                                <div className="pt-2 flex items-center justify-end space-x-2">
                                    <button
                                        onClick={() => setSelectedOrder(null)}
                                        className="w-full py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold transition-colors cursor-pointer"
                                    >
                                        Tutup
                                    </button>
                                </div>

                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </AdminLayout>
    );
}
