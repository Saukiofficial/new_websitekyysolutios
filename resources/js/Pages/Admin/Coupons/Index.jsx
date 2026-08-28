import { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Tag, 
    Plus, 
    Search, 
    CheckCircle2, 
    Clock, 
    AlertCircle, 
    Percent, 
    DollarSign, 
    Trash2, 
    Power, 
    X, 
    Sparkles, 
    TrendingUp, 
    Calendar,
    Wallet,
    Check
} from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function AdminCouponsIndex({ coupons, stats, filters }) {
    const [searchQuery, setSearchQuery] = useState(filters.q || '');
    const [selectedStatus, setSelectedStatus] = useState(filters.status || 'all');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        code: '',
        name: '',
        description: '',
        type: 'percent',
        value: '',
        min_order_amount: '',
        max_discount_amount: '',
        usage_limit: '',
        start_date: '',
        end_date: '',
    });

    const handleFilterChange = (status) => {
        setSelectedStatus(status);
        router.get('/admin/coupons', {
            status: status,
            q: searchQuery,
        }, { preserveState: true, replace: true });
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        router.get('/admin/coupons', {
            status: selectedStatus,
            q: searchQuery,
        }, { preserveState: true, replace: true });
    };

    const handleToggleStatus = (id) => {
        router.patch(`/admin/coupons/${id}/toggle`, {}, { preserveScroll: true });
    };

    const handleDelete = (id, code) => {
        if (confirm(`Apakah Anda yakin ingin menghapus kupon promo "${code}"?`)) {
            router.delete(`/admin/coupons/${id}`, { preserveScroll: true });
        }
    };

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        post('/admin/coupons', {
            onSuccess: () => {
                setIsCreateModalOpen(false);
                reset();
            }
        });
    };

    return (
        <AdminLayout title="Manajemen Kupon & Promo" breadcrumb="Marketplace > Kupon & Promo">
            <Head title="Manajemen Kupon Promo — Super Admin KyySolutions" />

            <div className="space-y-6">
                
                {/* 1. Header Metrics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl bg-white border border-[#E9EEF5] shadow-xs flex items-center justify-between">
                        <div>
                            <span className="text-xs font-semibold text-slate-500">Total Kupon Promo</span>
                            <div className="text-xl font-black text-slate-900 mt-1 font-mono">{stats.totalCoupons}</div>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
                            <Tag className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-[#E9EEF5] shadow-xs flex items-center justify-between">
                        <div>
                            <span className="text-xs font-semibold text-slate-500">Kupon Aktif</span>
                            <div className="text-xl font-black text-emerald-600 mt-1 font-mono">{stats.activeCoupons}</div>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-[#E9EEF5] shadow-xs flex items-center justify-between">
                        <div>
                            <span className="text-xs font-semibold text-slate-500">Total Klaim Pemakaian</span>
                            <div className="text-xl font-black text-indigo-600 mt-1 font-mono">{stats.totalUsages} Kali</div>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                            <Sparkles className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-[#E9EEF5] shadow-xs flex items-center justify-between">
                        <div>
                            <span className="text-xs font-semibold text-slate-500">Total Diskon Diberikan</span>
                            <div className="text-xl font-black text-slate-900 mt-1 font-mono">{stats.totalDiscountGiven}</div>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                            <Wallet className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                {/* 2. Toolbar & Create Button */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E9EEF5] shadow-xs">
                    
                    {/* Status Tabs */}
                    <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
                        {[
                            { key: 'all', label: 'Semua Kupon' },
                            { key: 'active', label: 'Sedang Aktif' },
                            { key: 'inactive', label: 'Nonaktif / Expired' },
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => handleFilterChange(tab.key)}
                                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                    selectedStatus === tab.key
                                        ? 'bg-[#1557C8] text-white shadow-xs'
                                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Search & Action Button */}
                    <div className="flex items-center space-x-2">
                        <form onSubmit={handleSearchSubmit} className="relative">
                            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari kode kupon..."
                                className="h-9 pl-8 pr-3 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#2563EB] w-44 sm:w-56"
                            />
                        </form>

                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="h-9 px-4 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#2563EB] text-white text-xs font-bold transition-all shadow-xs flex items-center space-x-1.5 cursor-pointer shrink-0"
                        >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Buat Kupon Baru</span>
                        </button>
                    </div>
                </div>

                {/* 3. Coupons Table */}
                <div className="bg-white rounded-2xl border border-[#E9EEF5] shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead>
                                <tr className="bg-[#F8FAFC] border-b border-[#E9EEF5] text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                                    <th className="py-3.5 px-4">Kode Kupon</th>
                                    <th className="py-3.5 px-4">Nama Promo</th>
                                    <th className="py-3.5 px-4">Nilai Diskon</th>
                                    <th className="py-3.5 px-4">Ketentuan Order</th>
                                    <th className="py-3.5 px-4">Pemakaian</th>
                                    <th className="py-3.5 px-4">Masa Berlaku</th>
                                    <th className="py-3.5 px-4">Status</th>
                                    <th className="py-3.5 px-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#E9EEF5] text-slate-700">
                                {coupons.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="py-10 text-center text-slate-400">
                                            Belum ada kupon promo yang dibuat.
                                        </td>
                                    </tr>
                                ) : (
                                    coupons.map((coupon) => (
                                        <tr key={coupon.id} className="hover:bg-slate-50/70 transition-colors">
                                            <td className="py-3.5 px-4">
                                                <span className="font-mono font-black text-[#2563EB] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                                                    {coupon.code}
                                                </span>
                                            </td>
                                            <td className="py-3.5 px-4">
                                                <div className="font-bold text-slate-900">{coupon.name}</div>
                                                {coupon.description && (
                                                    <p className="text-[10px] text-slate-400 truncate max-w-xs">{coupon.description}</p>
                                                )}
                                            </td>
                                            <td className="py-3.5 px-4">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full font-bold text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-100">
                                                    {coupon.discountLabel}
                                                </span>
                                            </td>
                                            <td className="py-3.5 px-4 text-[11px]">
                                                <div>Min: <span className="font-mono font-semibold">{coupon.minOrderFormatted}</span></div>
                                                <div className="text-slate-400">Maks: {coupon.maxDiscountFormatted}</div>
                                            </td>
                                            <td className="py-3.5 px-4">
                                                <div className="flex items-center space-x-1.5">
                                                    <span className="font-mono font-bold text-slate-900">{coupon.usedCount}</span>
                                                    <span className="text-slate-400">/ {coupon.usageLimit ? coupon.usageLimit : '∞'}</span>
                                                </div>
                                                {coupon.usageLimit && (
                                                    <div className="w-20 h-1.5 rounded-full bg-slate-100 overflow-hidden mt-1">
                                                        <div 
                                                            className="h-full bg-[#2563EB] rounded-full"
                                                            style={{ width: `${Math.min(100, (coupon.usedCount / coupon.usageLimit) * 100)}%` }}
                                                        />
                                                    </div>
                                                )}
                                            </td>
                                            <td className="py-3.5 px-4 text-[11px]">
                                                <div>Mulai: {coupon.startDate}</div>
                                                <div className={coupon.isExpired ? 'text-rose-600 font-bold' : 'text-slate-500'}>
                                                    Hingga: {coupon.endDate}
                                                </div>
                                            </td>
                                            <td className="py-3.5 px-4">
                                                <button
                                                    onClick={() => handleToggleStatus(coupon.id)}
                                                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center space-x-1 cursor-pointer transition-colors ${
                                                        coupon.isActive && !coupon.isExpired
                                                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                                    }`}
                                                >
                                                    <span className={`w-1.5 h-1.5 rounded-full ${coupon.isActive && !coupon.isExpired ? 'bg-emerald-600' : 'bg-slate-400'}`} />
                                                    <span>{coupon.isActive && !coupon.isExpired ? 'Aktif' : (coupon.isExpired ? 'Expired' : 'Nonaktif')}</span>
                                                </button>
                                            </td>
                                            <td className="py-3.5 px-4 text-right">
                                                <button
                                                    onClick={() => handleDelete(coupon.id, coupon.code)}
                                                    title="Hapus Kupon"
                                                    className="w-7 h-7 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-colors cursor-pointer inline-flex"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
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

            {/* Modal Form: Buat Kupon Baru */}
            <AnimatePresence>
                {isCreateModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCreateModalOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="relative w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 z-10 overflow-hidden"
                        >
                            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
                                        <Tag className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-[#0F172A]">Buat Kupon Promo Baru</h3>
                                        <p className="text-[11px] text-slate-500">Terbitkan kode voucher diskon untuk pembeli.</p>
                                    </div>
                                </div>
                                <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleCreateSubmit} className="space-y-3.5 text-xs">
                                
                                {/* Kode Kupon */}
                                <div>
                                    <label className="font-bold text-slate-700 block mb-1">Kode Voucher / Promo *</label>
                                    <input
                                        type="text"
                                        value={data.code}
                                        onChange={(e) => setData('code', e.target.value.toUpperCase())}
                                        placeholder="cth: DISKON50, PROMOJUMAT"
                                        required
                                        className="w-full h-10 px-3 uppercase font-mono font-bold text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#2563EB]"
                                    />
                                    {errors.code && <p className="text-rose-500 text-[10px] mt-1">{errors.code}</p>}
                                </div>

                                {/* Nama Promo */}
                                <div>
                                    <label className="font-bold text-slate-700 block mb-1">Nama Promo *</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="cth: Promo Spesial Flash Sale 20%"
                                        required
                                        className="w-full h-10 px-3 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#2563EB]"
                                    />
                                </div>

                                {/* Tipe Diskon & Nilai */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="font-bold text-slate-700 block mb-1">Tipe Diskon *</label>
                                        <select
                                            value={data.type}
                                            onChange={(e) => setData('type', e.target.value)}
                                            className="w-full h-10 px-3 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#2563EB]"
                                        >
                                            <option value="percent">Persentase (%)</option>
                                            <option value="fixed">Nominal Tetap (Rp)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="font-bold text-slate-700 block mb-1">
                                            {data.type === 'percent' ? 'Besaran Diskon (%) *' : 'Nominal Potongan (Rp) *'}
                                        </label>
                                        <input
                                            type="number"
                                            value={data.value}
                                            onChange={(e) => setData('value', e.target.value)}
                                            placeholder={data.type === 'percent' ? '20' : '50000'}
                                            required
                                            min="1"
                                            className="w-full h-10 px-3 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#2563EB] font-mono font-bold"
                                        />
                                    </div>
                                </div>

                                {/* Min Order & Max Discount */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="font-bold text-slate-700 block mb-1">Min. Pembelian (Rp)</label>
                                        <input
                                            type="number"
                                            value={data.min_order_amount}
                                            onChange={(e) => setData('min_order_amount', e.target.value)}
                                            placeholder="0"
                                            className="w-full h-10 px-3 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#2563EB] font-mono"
                                        />
                                    </div>
                                    <div>
                                        <label className="font-bold text-slate-700 block mb-1">Batas Kuota Pakai</label>
                                        <input
                                            type="number"
                                            value={data.usage_limit}
                                            onChange={(e) => setData('usage_limit', e.target.value)}
                                            placeholder="Kosongkan jika unlimited"
                                            className="w-full h-10 px-3 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#2563EB] font-mono"
                                        />
                                    </div>
                                </div>

                                {/* Tanggal Mulai & Selesai */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="font-bold text-slate-700 block mb-1">Tgl Mulai</label>
                                        <input
                                            type="date"
                                            value={data.start_date}
                                            onChange={(e) => setData('start_date', e.target.value)}
                                            className="w-full h-10 px-3 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#2563EB]"
                                        />
                                    </div>
                                    <div>
                                        <label className="font-bold text-slate-700 block mb-1">Tgl Berakhir</label>
                                        <input
                                            type="date"
                                            value={data.end_date}
                                            onChange={(e) => setData('end_date', e.target.value)}
                                            className="w-full h-10 px-3 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#2563EB]"
                                        />
                                    </div>
                                </div>

                                {/* Submit Buttons */}
                                <div className="pt-3 flex items-center justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsCreateModalOpen(false)}
                                        className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white font-bold transition-all shadow-md shadow-blue-500/20 cursor-pointer disabled:opacity-50"
                                    >
                                        {processing ? 'Menyimpan...' : 'Simpan & Aktifkan Kupon'}
                                    </button>
                                </div>

                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </AdminLayout>
    );
}
