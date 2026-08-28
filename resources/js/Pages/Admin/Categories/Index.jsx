import { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FolderTree, 
    Plus, 
    Trash2, 
    Layers, 
    Package, 
    X,
    FolderPlus
} from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function AdminCategoriesIndex({ categories }) {
    const [showCreateModal, setShowCreateModal] = useState(false);

    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        description: '',
    });

    const handleCreateCategory = (e) => {
        e.preventDefault();
        post('/admin/categories', {
            onSuccess: () => {
                setShowCreateModal(false);
                reset();
            }
        });
    };

    const handleDeleteCategory = (id) => {
        if (confirm('Hapus kategori ini?')) {
            router.delete(`/admin/categories/${id}`);
        }
    };

    return (
        <AdminLayout title="Kategori Marketplace" breadcrumb="Management > Kategori">
            <Head title="Kelola Kategori — Super Admin KyySolutions" />

            <div className="space-y-6">
                
                {/* Header Toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E9EEF5] shadow-xs">
                    <div>
                        <h2 className="text-base font-bold text-[#0F172A]">Kategori Produk Digital</h2>
                        <p className="text-xs text-[#64748B] mt-0.5">Kelola struktur kategori untuk katalog marketplace software KyySolutions.</p>
                    </div>

                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center justify-center space-x-2 transition-all cursor-pointer shrink-0"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Tambah Kategori Baru</span>
                    </button>
                </div>

                {/* Categories Grid Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {categories.map((c) => (
                        <div key={c.id} className="bg-white p-5 rounded-2xl border border-[#E9EEF5] shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold border border-blue-100">
                                        <FolderTree className="w-5 h-5" />
                                    </div>
                                    <span className="text-[10px] font-bold bg-blue-50 text-[#2563EB] px-2 py-0.5 rounded-full border border-blue-100">
                                        {c.productsCount} Produk Aktif
                                    </span>
                                </div>

                                <h3 className="font-bold text-sm text-[#0F172A] mb-1">{c.name}</h3>
                                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                    {c.description || 'Kategori produk software dan aset digital terverifikasi.'}
                                </p>
                            </div>

                            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                                <span className="font-mono text-[11px] text-slate-400">/{c.slug}</span>
                                <button
                                    onClick={() => handleDeleteCategory(c.id)}
                                    className="text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                                    title="Hapus Kategori"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* Modal Tambah Kategori */}
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
                            className="relative w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 z-10"
                        >
                            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                                <h3 className="text-sm font-bold text-[#0F172A]">Tambah Kategori Baru</h3>
                                <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleCreateCategory} className="space-y-3.5 text-xs">
                                <div>
                                    <label className="font-bold text-[#0F172A] block mb-1">Nama Kategori *</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Contoh: AI & LLM Systems"
                                        className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                                    />
                                    {errors.name && <p className="text-red-500 mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="font-bold text-[#0F172A] block mb-1">Deskripsi Kategori</label>
                                    <textarea
                                        rows={3}
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Deskripsi singkat jenis software dalam kategori ini..."
                                        className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div className="pt-3 flex items-center justify-end space-x-2">
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
                                        className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold cursor-pointer disabled:opacity-50"
                                    >
                                        {processing ? 'Menyimpan...' : 'Simpan Kategori'}
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
