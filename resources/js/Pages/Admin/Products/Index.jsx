import { useState } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Package, 
    Plus, 
    Search, 
    Filter, 
    Check, 
    X, 
    Trash2, 
    ExternalLink, 
    Eye, 
    Star, 
    FileCode, 
    ShieldCheck, 
    ArrowUpRight,
    Sparkles,
    AlertCircle,
    ChevronDown
} from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function AdminProductsIndex({ products, categories, counts, filters }) {
    const [selectedStatus, setSelectedStatus] = useState(filters.status || 'all');
    const [searchQuery, setSearchQuery] = useState(filters.q || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category_id || '');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [moderationTarget, setModerationTarget] = useState(null);

    // Form for creating new digital product
    const { data, setData, post, processing, reset, errors } = useForm({
        title: '',
        category_id: categories[0]?.id || '',
        price: '',
        extended_price: '',
        version: 'v1.0.0',
        badge: 'New Release',
        short_description: '',
        demo_url: '',
        delivery_url: 'https://github.com/kyysolutions/source-code-private',
    });

    const handleFilterChange = (status) => {
        setSelectedStatus(status);
        router.get('/admin/products', {
            status: status,
            q: searchQuery,
            category_id: selectedCategory,
        }, { preserveState: true, replace: true });
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        router.get('/admin/products', {
            status: selectedStatus,
            q: searchQuery,
            category_id: selectedCategory,
        }, { preserveState: true, replace: true });
    };

    const handleCategoryChange = (e) => {
        const catId = e.target.value;
        setSelectedCategory(catId);
        router.get('/admin/products', {
            status: selectedStatus,
            q: searchQuery,
            category_id: catId,
        }, { preserveState: true, replace: true });
    };

    const handleCreateProduct = (e) => {
        e.preventDefault();
        post('/admin/products', {
            onSuccess: () => {
                setShowCreateModal(false);
                reset();
            }
        });
    };

    const handleUpdateStatus = (id, newStatus) => {
        router.patch(`/admin/products/${id}/status`, { status: newStatus }, {
            onSuccess: () => setModerationTarget(null)
        });
    };

    const handleDeleteProduct = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
            router.delete(`/admin/products/${id}`);
        }
    };

    return (
        <AdminLayout title="Manajemen & Moderasi Produk" breadcrumb="Management > Produk">
            <Head title="Kelola Produk Digital — Super Admin KyySolutions" />

            <div className="space-y-6">
                
                {/* 1. Header Toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E9EEF5] shadow-xs">
                    <div>
                        <h2 className="text-base font-bold text-[#0F172A]">Katalog Produk & Moderasi</h2>
                        <p className="text-xs text-[#64748B] mt-0.5">Kelola seluruh produk digital, status persetujuan, dan tautan pengiriman software.</p>
                    </div>

                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center justify-center space-x-2 transition-all cursor-pointer shrink-0"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Tambah Produk Baru</span>
                    </button>
                </div>

                {/* 2. Status Filter Tabs & Search Bar */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    
                    {/* Status Tabs */}
                    <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                        {[
                            { key: 'all', label: 'Semua Produk', count: counts.all },
                            { key: 'published', label: 'Published', count: counts.published, badgeColor: 'bg-emerald-100 text-emerald-800' },
                            { key: 'pending', label: 'Menunggu Review', count: counts.pending, badgeColor: 'bg-amber-100 text-amber-800' },
                            { key: 'rejected', label: 'Ditolak', count: counts.rejected, badgeColor: 'bg-rose-100 text-rose-800' },
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

                    {/* Search & Category Filter */}
                    <div className="flex items-center space-x-3 w-full lg:w-auto">
                        <form onSubmit={handleSearchSubmit} className="relative flex-1 sm:w-64">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari judul software..."
                                className="w-full h-10 pl-9 pr-3 text-xs bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#93C5FD] transition-colors"
                            />
                        </form>

                        <select
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            className="h-10 px-3 text-xs bg-white border border-[#E2E8F0] rounded-xl text-slate-700 focus:outline-none cursor-pointer"
                        >
                            <option value="">Semua Kategori</option>
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>

                </div>

                {/* 3. Products Table */}
                <div className="bg-white rounded-2xl border border-[#E9EEF5] shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-[#FAFBFD] text-[#64748B] font-bold border-b border-slate-100 uppercase tracking-wider text-[11px]">
                                <tr>
                                    <th className="py-3.5 px-4">Software / Produk</th>
                                    <th className="py-3.5 px-4">Kategori & Versi</th>
                                    <th className="py-3.5 px-4">Seller</th>
                                    <th className="py-3.5 px-4">Harga Reguler</th>
                                    <th className="py-3.5 px-4 text-center">Penjualan</th>
                                    <th className="py-3.5 px-4">Status</th>
                                    <th className="py-3.5 px-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-700">
                                {products.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="py-12 text-center text-slate-400">
                                            <Package className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                                            <p className="font-semibold text-xs">Tidak ada produk yang ditemukan.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    products.map((product) => (
                                        <tr key={product.id} className="hover:bg-slate-50/80 transition-colors">
                                            
                                            {/* Product Title & Badge */}
                                            <td className="py-3.5 px-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 text-[#2563EB] font-bold text-xs flex items-center justify-center shrink-0">
                                                        <FileCode className="w-4.5 h-4.5" />
                                                    </div>
                                                    <div className="min-w-0 max-w-[220px]">
                                                        <Link 
                                                            href={`/products/${product.slug}`}
                                                            target="_blank"
                                                            className="font-bold text-[#0F172A] hover:text-[#2563EB] transition-colors truncate block text-xs"
                                                        >
                                                            {product.title}
                                                        </Link>
                                                        {product.badge && (
                                                            <span className="text-[9px] font-bold bg-blue-50 text-[#2563EB] px-1.5 py-0.2 rounded border border-blue-100 mt-0.5 inline-block">
                                                                {product.badge}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Category & Version */}
                                            <td className="py-3.5 px-4">
                                                <div className="font-semibold text-slate-800">{product.category}</div>
                                                <div className="text-[10px] text-slate-400 font-mono font-medium">{product.version}</div>
                                            </td>

                                            {/* Seller */}
                                            <td className="py-3.5 px-4 font-medium text-slate-600">
                                                {product.seller}
                                            </td>

                                            {/* Price */}
                                            <td className="py-3.5 px-4 font-bold font-mono text-[#0F172A]">
                                                {product.priceFormatted}
                                            </td>

                                            {/* Sales & Rating */}
                                            <td className="py-3.5 px-4 text-center">
                                                <div className="font-bold font-mono text-slate-900">{product.salesCount} sales</div>
                                                <div className="text-[10px] text-amber-500 font-bold flex items-center justify-center">
                                                    <Star className="w-3 h-3 fill-current mr-0.5 text-amber-400" />
                                                    <span>{product.rating}</span>
                                                </div>
                                            </td>

                                            {/* Status Badge */}
                                            <td className="py-3.5 px-4">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                                    product.status === 'published'
                                                        ? 'bg-[#DCFCE7] text-[#15803D]'
                                                        : (product.status === 'pending' ? 'bg-[#FEF3C7] text-[#B45309]' : 'bg-[#FEE2E2] text-[#B91C1C]')
                                                }`}>
                                                    {product.status === 'published' ? 'Published' : (product.status === 'pending' ? 'Pending Review' : 'Rejected')}
                                                </span>
                                            </td>

                                            {/* Actions */}
                                            <td className="py-3.5 px-4 text-right">
                                                <div className="inline-flex items-center space-x-1.5">
                                                    
                                                    {/* Quick Approve / Reject for Pending Products */}
                                                    {product.status === 'pending' && (
                                                        <>
                                                            <button
                                                                onClick={() => handleUpdateStatus(product.id, 'published')}
                                                                className="w-7 h-7 rounded-lg bg-emerald-50 hover:bg-emerald-600 text-emerald-600 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                                                                title="Setujui Produk (Approve)"
                                                            >
                                                                <Check className="w-3.5 h-3.5" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleUpdateStatus(product.id, 'rejected')}
                                                                className="w-7 h-7 rounded-lg bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                                                                title="Tolak Produk (Reject)"
                                                            >
                                                                <X className="w-3.5 h-3.5" />
                                                            </button>
                                                        </>
                                                    )}

                                                    {/* View Live */}
                                                    <Link
                                                        href={`/products/${product.slug}`}
                                                        target="_blank"
                                                        className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
                                                        title="Lihat Detail Halaman"
                                                    >
                                                        <ExternalLink className="w-3.5 h-3.5" />
                                                    </Link>

                                                    {/* Delete */}
                                                    <button
                                                        onClick={() => handleDeleteProduct(product.id)}
                                                        className="w-7 h-7 rounded-lg bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                                                        title="Hapus Produk"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>

                                                </div>
                                            </td>

                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            {/* Modal Tambah Produk Baru */}
            <AnimatePresence>
                {showCreateModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowCreateModal(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="relative w-full max-w-xl bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 z-10 max-h-[90vh] overflow-y-auto"
                        >
                            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                                <div>
                                    <h3 className="text-base font-bold text-[#0F172A]">Tambah Produk Digital Baru</h3>
                                    <p className="text-xs text-slate-500">Terbitkan source code, template, atau UI kit resmi ke marketplace.</p>
                                </div>
                                <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
                                
                                <div>
                                    <label className="font-bold text-[#0F172A] block mb-1">Judul Software / Produk *</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Contoh: Modern SaaS Boilerplate v2"
                                        className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                                    />
                                    {errors.title && <p className="text-red-500 mt-1">{errors.title}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="font-bold text-[#0F172A] block mb-1">Kategori *</label>
                                        <select
                                            value={data.category_id}
                                            onChange={(e) => setData('category_id', e.target.value)}
                                            className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
                                        >
                                            {categories.map((c) => (
                                                <option key={c.id} value={c.id}>{c.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="font-bold text-[#0F172A] block mb-1">Versi Software *</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={data.version}
                                            onChange={(e) => setData('version', e.target.value)}
                                            placeholder="v1.0.0"
                                            className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="font-bold text-[#0F172A] block mb-1">Harga Reguler (IDR) *</label>
                                        <input 
                                            type="number" 
                                            required
                                            value={data.price}
                                            onChange={(e) => setData('price', e.target.value)}
                                            placeholder="500000"
                                            className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                                        />
                                    </div>

                                    <div>
                                        <label className="font-bold text-[#0F172A] block mb-1">Harga Extended (IDR)</label>
                                        <input 
                                            type="number" 
                                            value={data.extended_price}
                                            onChange={(e) => setData('extended_price', e.target.value)}
                                            placeholder="1200000"
                                            className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="font-bold text-[#0F172A] block mb-1">Deskripsi Singkat *</label>
                                    <textarea
                                        required
                                        rows={3}
                                        value={data.short_description}
                                        onChange={(e) => setData('short_description', e.target.value)}
                                        placeholder="Tuliskan ringkasan fitur software dan arsitektur..."
                                        className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <label className="font-bold text-[#0F172A] block mb-1">Penyedia File (Delivery Type) *</label>
                                        <select
                                            value={data.delivery_type || 'gdrive'}
                                            onChange={(e) => setData('delivery_type', e.target.value)}
                                            className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer text-xs font-semibold"
                                        >
                                            <option value="gdrive">📁 Google Drive (Folder/File)</option>
                                            <option value="github">🐙 GitHub (Private Repo)</option>
                                            <option value="zip">📥 Direct Download .ZIP</option>
                                        </select>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label className="font-bold text-[#0F172A] block mb-1">Link Source Code (Delivery URL) *</label>
                                        <input 
                                            type="url" 
                                            required
                                            value={data.delivery_url}
                                            onChange={(e) => setData('delivery_url', e.target.value)}
                                            placeholder={
                                                data.delivery_type === 'gdrive' 
                                                    ? 'https://drive.google.com/drive/folders/...' 
                                                    : (data.delivery_type === 'github' ? 'https://github.com/org/repo-private' : 'https://domain.com/file.zip')
                                            }
                                            className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 font-mono text-xs"
                                        />
                                    </div>
                                </div>
                                <p className="text-[10px] text-slate-400">Pilih salah satu (Google Drive atau GitHub). Tautan ini otomatis disajikan langsung ke pembeli terverifikasi setelah order berstatus lunas.</p>

                                <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowCreateModal(false)}
                                        className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold shadow-md shadow-blue-500/20 cursor-pointer disabled:opacity-50"
                                    >
                                        {processing ? 'Menyimpan...' : 'Terbitkan Produk'}
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
