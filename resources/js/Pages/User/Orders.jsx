import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ShoppingBag, 
    FileText, 
    Activity, 
    ShieldCheck, 
    CreditCard, 
    CheckCircle2, 
    Eye, 
    X, 
    KeyRound, 
    Calendar,
    ArrowRight 
} from 'lucide-react';
import BuyerLayout from '@/Layouts/BuyerLayout';

export default function UserOrders({ orders = [], user = {} }) {
    const [selectedOrder, setSelectedOrder] = useState(null);

    return (
        <BuyerLayout activeTab="orders">
            <Head title="Riwayat Faktur Transaksi — KyySolutions Buyer Hub" />

            <div className="space-y-6">
                
                {/* 1. BREADCRUMB & HEADER SECTION */}
                <div>
                    <div className="flex items-center space-x-2 text-xs text-slate-400 font-medium mb-1.5">
                        <Link href="/" className="hover:text-[#2563EB] transition-colors">Beranda</Link>
                        <span>&gt;</span>
                        <span>Buyer Hub</span>
                        <span>&gt;</span>
                        <span className="text-slate-600 font-semibold">Riwayat Faktur Transaksi</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
                        <div>
                            <h1 className="text-2xl sm:text-[28px] font-bold text-[#0F172A] tracking-tight">
                                Riwayat Faktur Transaksi
                            </h1>
                            <p className="text-xs sm:text-[13px] text-slate-500 mt-1">
                                Pantau riwayat tagihan, status pembayaran, dan detail faktur pembelian Anda.
                            </p>
                        </div>

                        {/* Right Status Badges */}
                        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
                            <div className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-xs font-bold shadow-2xs">
                                <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                                <span>Akun Pembeli Terverifikasi</span>
                            </div>

                            <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-slate-600 text-xs font-semibold shadow-2xs">
                                <span>Status Akun:</span>
                                <span className="flex items-center space-x-1 font-bold text-slate-800">
                                    <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                                    <span>Aktif</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. PRIMARY HUB NAVIGATION TABS */}
                <div className="flex items-center space-x-2 border-b border-[#E2E8F0] pb-px overflow-x-auto scrollbar-none">
                    <Link
                        href="/dashboard/my-products"
                        className="px-4 py-2.5 text-xs font-semibold flex items-center space-x-2 text-slate-500 hover:text-slate-900 border-b-2 border-transparent -mb-px transition-colors shrink-0"
                    >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Produk & Lisensi Saya</span>
                    </Link>

                    <Link
                        href="/dashboard/orders"
                        className="px-4 py-2.5 text-xs font-bold flex items-center space-x-2 text-[#2563EB] border-b-2 border-[#2563EB] -mb-px transition-colors shrink-0"
                    >
                        <FileText className="w-4 h-4" />
                        <span>Riwayat Faktur Transaksi</span>
                    </Link>

                    <Link
                        href="/dashboard/my-products"
                        className="px-4 py-2.5 text-xs font-semibold flex items-center space-x-2 text-slate-500 hover:text-slate-900 border-b-2 border-transparent -mb-px transition-colors shrink-0"
                    >
                        <Activity className="w-4 h-4" />
                        <span>Aktivitas Akun</span>
                    </Link>
                </div>

                {/* 3. ORDERS TABLE CARD */}
                <div className="bg-white rounded-2xl border border-[#E8EDF3] shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-[#FAFBFD] text-[#64748B] font-bold border-b border-slate-100 uppercase tracking-wider text-[11px]">
                                <tr>
                                    <th className="py-4 px-5 font-mono">Nomor Invoice</th>
                                    <th className="py-4 px-5">Produk Software</th>
                                    <th className="py-4 px-5">Metode Bayar</th>
                                    <th className="py-4 px-5">Total Pembayaran</th>
                                    <th className="py-4 px-5">Status</th>
                                    <th className="py-4 px-5">Tanggal</th>
                                    <th className="py-4 px-5 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-700">
                                {orders.map((ord) => (
                                    <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                                        
                                        <td className="py-4 px-5 font-mono font-bold text-[#2563EB]">
                                            {ord.orderNumber}
                                        </td>

                                        <td className="py-4 px-5 font-bold text-[#0F172A] max-w-[240px] truncate">
                                            {ord.productTitle}
                                        </td>

                                        <td className="py-4 px-5">
                                            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-mono text-[10px] font-bold">
                                                <CreditCard className="w-3 h-3 text-[#2563EB]" />
                                                <span>{ord.paymentMethod}</span>
                                            </span>
                                        </td>

                                        <td className="py-4 px-5 font-mono font-bold text-[#0F172A]">
                                            {ord.totalFormatted}
                                        </td>

                                        <td className="py-4 px-5">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                                ord.status === 'paid'
                                                    ? 'bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857]'
                                                    : (ord.status === 'pending' ? 'bg-amber-50 text-amber-800' : 'bg-rose-50 text-rose-800')
                                            }`}>
                                                {ord.status === 'paid' ? 'LUNAS' : (ord.status === 'pending' ? 'MENUNGGU' : 'GAGAL')}
                                            </span>
                                        </td>

                                        <td className="py-4 px-5 text-slate-400 font-mono text-[11px]">
                                            {ord.createdAt}
                                        </td>

                                        <td className="py-4 px-5 text-right">
                                            <button
                                                onClick={() => setSelectedOrder(ord)}
                                                className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-[#2563EB] text-[#2563EB] hover:text-white font-bold transition-colors inline-flex items-center space-x-1 cursor-pointer"
                                            >
                                                <Eye className="w-3.5 h-3.5" />
                                                <span>Faktur</span>
                                            </button>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            {/* Modal Detail Faktur */}
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
                            className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 z-10 space-y-4"
                        >
                            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold">
                                        <FileText className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-[#0F172A]">Kwitansi Faktur Digital</h3>
                                        <p className="text-[11px] font-mono text-[#2563EB] font-bold">{selectedOrder.orderNumber}</p>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-slate-600">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-3.5 text-xs">
                                
                                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-between">
                                    <div className="flex items-center space-x-2 text-emerald-800 font-bold">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                        <span>Status: Pembayaran Lunas Terverifikasi</span>
                                    </div>
                                </div>

                                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                                    <div className="font-bold text-[#0F172A]">Produk Software yang Dibeli</div>
                                    <div className="text-xs text-slate-800 font-semibold">{selectedOrder.productTitle}</div>
                                    <div className="flex items-center justify-between pt-1 font-mono text-[11px]">
                                        <span className="text-slate-400">Lisensi Komersial:</span>
                                        <span className="text-[#2563EB] font-bold">{selectedOrder.licenseKey}</span>
                                    </div>
                                </div>

                                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
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

                                <div className="pt-2 flex items-center justify-between space-x-2">
                                    <Link
                                        href="/dashboard/my-products"
                                        className="px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#2563EB] font-bold transition-colors"
                                    >
                                        Buka Aset Unduhan
                                    </Link>
                                    <button
                                        onClick={() => setSelectedOrder(null)}
                                        className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold transition-colors cursor-pointer"
                                    >
                                        Tutup
                                    </button>
                                </div>

                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </BuyerLayout>
    );
}
