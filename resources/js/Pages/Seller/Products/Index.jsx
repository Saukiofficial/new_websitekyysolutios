import { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Package, 
    Plus, 
    Search, 
    Filter, 
    HardDrive, 
    FolderGit2, 
    Download, 
    Star, 
    ExternalLink, 
    Trash2, 
    Edit, 
    X,
    CheckCircle2
} from 'lucide-react';
import SellerLayout from '@/Layouts/SellerLayout';
import ImageUploadInput from '@/Components/Shared/ImageUploadInput';

export default function SellerProductsIndex({ products = [], categories = [], store = {} }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);

    const { data, setData, post, processing, reset, errors } = useForm({
        title: '',
        category_id: categories[0]?.id || 1,
        price: '',
        extended_price: '',
        version: 'v1.0.0',
        badge: 'New Release',
        thumbnail: null,
        thumbnail_url: '',
        short_description: '',
        delivery_type: 'gdrive',
        delivery_url: '',
    });

    const submitCreateForm = (e) => {
        e.preventDefault();
        post('/seller/products', {
            onSuccess: () => {
                setShowCreateModal(false);
                reset();
            }
        });
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus software ini dari toko Anda?')) {
            router.delete(`/seller/products/${id}`);
        }
    };

    const filteredProducts = products.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <SellerLayout title="Produk & Software Saya" store={store}>
            <Head title="Kelola Software Mitra — KyySolutions Studio" />

            <div className="space-y-6">
                
                {/* Header Row */}
                <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
                            Katalog Software Mitra
                        </h1>
                        <p className="text-xs text-slate-500 mt-1">
                            Kelola source code, template, dan link Google Drive / GitHub untuk produk Anda.
                        </p>
                    </div>

                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-sm shadow-blue-500/20 flex items-center space-x-1.5 transition-colors cursor-pointer self-start sm:self-auto"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Unggah Software Baru</span>
                    </button>
                </div>

                {/* Filter Toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Cari software..."
                            className="w-full h-10 pl-10 pr-4 bg-white border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#2563EB]"
                        />
                    </div>

                    <div className="text-xs font-mono font-bold text-slate-500">
                        Total: {filteredProducts.length} Produk
                    </div>
                </div>

                {/* Products Table */}
                <div className="bg-white rounded-2xl border border-[#E8EDF3] shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-[#FAFBFD] text-[#64748B] font-bold border-b border-slate-100 uppercase tracking-wider text-[11px]">
                                <tr>
                                    <th className="py-4 px-5">Software & Versi</th>
                                    <th className="py-4 px-5">Kategori</th>
                                    <th className="py-4 px-5">Harga (IDR)</th>
                                    <th className="py-4 px-5">Penyedia File</th>
                                    <th className="py-4 px-5 text-center">Penjualan</th>
                                    <th className="py-4 px-5">Status</th>
                                    <th className="py-4 px-5 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-700">
                                {filteredProducts.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="py-12 text-center text-slate-400">
                                            <Package className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                                            <p className="font-semibold text-xs">Belum ada software yang diunggah.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredProducts.map((p) => (
                                        <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                                            
                                            <td className="py-4 px-5">
                                                <Link 
                                                    href={`/products/${p.slug}`}
                                                    target="_blank"
                                                    className="font-bold text-[#0F172A] hover:text-[#2563EB] transition-colors block text-xs"
                                                >
                                                    {p.title}
                                                </Link>
                                                <span className="text-[10px] text-slate-400 font-mono">{p.version}</span>
                                            </td>

                                            <td className="py-4 px-5 font-semibold text-slate-600">
                                                {p.category}
                                            </td>

                                            <td className="py-4 px-5 font-mono font-bold text-[#0F172A]">
                                                {p.priceFormatted}
                                            </td>

                                            <td className="py-4 px-5">
                                                {p.deliveryType === 'gdrive' ? (
                                                    <span className="inline-flex items-center space-x-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-bold">
                                                        <HardDrive className="w-3 h-3 text-emerald-600" />
                                                        <span>Google Drive</span>
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center space-x-1 text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-[10px] font-bold">
                                                        <FolderGit2 className="w-3 h-3" />
                                                        <span>GitHub</span>
                                                    </span>
                                                )}
                                            </td>

                                            <td className="py-4 px-5 text-center font-mono font-bold text-[#0F172A]">
                                                {p.salesCount} sales
                                            </td>

                                            <td className="py-4 px-5">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 border border-emerald-200 text-emerald-800">
                                                    Aktif
                                                </span>
                                            </td>

                                            <td className="py-4 px-5 text-right">
                                                <button
                                                    onClick={() => handleDelete(p.id)}
                                                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                                    title="Hapus Produk"
                                                >
                                                    <Trash2 className="w-4 h-4" />
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

            {/* Modal Upload Software Baru */}
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
                            className="relative w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 z-10 space-y-4 max-h-[90vh] overflow-y-auto"
                        >
                            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                                <div>
                                    <h3 className="text-base font-bold text-[#0F172A]">Unggah Software Baru</h3>
                                    <p className="text-xs text-slate-500">Terbitkan source code atau template ke marketplace</p>
                                </div>
                                <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={submitCreateForm} className="space-y-4 text-xs">
                                
                                <div>
                                    <label className="font-bold text-[#0F172A] block mb-1">Judul Software / Template *</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Contoh: Laravel Multi-Tenant SaaS Boilerplate"
                                        className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                                    />
                                    {errors.title && <p className="text-red-500 mt-1">{errors.title}</p>}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                                        <label className="font-bold text-[#0F172A] block mb-1">Versi Rilis *</label>
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

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="font-bold text-[#0F172A] block mb-1">Harga Reguler (IDR) *</label>
                                        <input 
                                            type="number" 
                                            required
                                            value={data.price}
                                            onChange={(e) => setData('price', e.target.value)}
                                            placeholder="450000"
                                            className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                                        />
                                        <span className="text-[10px] text-slate-400">Anda menerima 90% (Rp {data.price ? new Intl.NumberFormat('id-ID').format(data.price * 0.9) : 0})</span>
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
                                    <label className="font-bold text-[#0F172A] block mb-1">Deskripsi Singkat & Fitur Utama *</label>
                                    <textarea
                                        required
                                        rows={3}
                                        value={data.short_description}
                                        onChange={(e) => setData('short_description', e.target.value)}
                                        placeholder="Jelaskan fitur unggulan, dependensi, dan panduan instalasi..."
                                        className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                <ImageUploadInput
                                    label="Thumbnail / Mockup Preview Software"
                                    recommendedText="1200 × 675 px (Rasio 16:9), Maks 3MB"
                                    aspectRatio="aspect-video"
                                    value={data.thumbnail_url}
                                    onChangeFile={(file) => setData('thumbnail', file)}
                                    onChangeUrl={(url) => setData('thumbnail_url', url)}
                                    error={errors.thumbnail || errors.thumbnail_url}
                                />

                                {/* Delivery Method Selector (Google Drive / GitHub) */}
                                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        <div>
                                            <label className="font-bold text-[#0F172A] block mb-1">Penyedia File *</label>
                                            <select
                                                value={data.delivery_type}
                                                onChange={(e) => setData('delivery_type', e.target.value)}
                                                className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-blue-500 cursor-pointer font-semibold"
                                            >
                                                <option value="gdrive">📁 Google Drive</option>
                                                <option value="github">🐙 GitHub Repo</option>
                                                <option value="zip">📥 Direct ZIP</option>
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
                                                        : (data.delivery_type === 'github' ? 'https://github.com/username/repo-private' : 'https://domain.com/file.zip')
                                                }
                                                className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-blue-500 font-mono text-xs"
                                            />
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-slate-400">
                                        Link ini aman dan hanya akan diberikan langsung kepada pembeli setelah pembayaran lunas terverifikasi.
                                    </p>
                                </div>

                                <div className="pt-3 flex items-center justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowCreateModal(false)}
                                        className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-5 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold cursor-pointer disabled:opacity-50"
                                    >
                                        {processing ? 'Menyimpan...' : 'Terbitkan Software'}
                                    </button>
                                </div>

                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </SellerLayout>
    );
}
