import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import ImageUploadInput from '@/Components/Shared/ImageUploadInput';
import { 
    FileText, 
    Plus, 
    Search, 
    Edit, 
    Trash2, 
    Eye, 
    ExternalLink, 
    CheckCircle2, 
    Clock, 
    Bookmark, 
    Star, 
    X,
    Filter,
    Layers,
    User,
    Calendar,
    Globe,
    Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AiBlogGeneratorModal from '@/Components/Admin/AiBlogGeneratorModal';

export default function BlogIndex({ posts, categories = [], filters = {}, stats = {} }) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || 'all');
    const [selectedStatus, setSelectedStatus] = useState(filters.status || 'all');
    
    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState(null);

    const handleApplyAiData = (data) => {
        setEditingPost(null);
        setFormData({
            title: data.title || '',
            category: data.category || 'Software Engineering',
            excerpt: data.excerpt || '',
            content: data.content || '',
            cover_image: null,
            cover_image_url: data.cover_image_url || '',
            author_name: data.author_name || 'KyySolutions Core Team',
            author_role: data.author_role || 'Principal Software Architect',
            read_time: data.read_time || '6 min baca',
            is_featured: false,
            status: data.status || 'draft',
        });
        setIsModalOpen(true);
    };
    const [formData, setFormData] = useState({
        title: '',
        category: 'Software Engineering',
        excerpt: '',
        content: '',
        cover_image: null,
        cover_image_url: '',
        author_name: 'KyySolutions Core Team',
        author_role: 'Principal Software Architect',
        read_time: '5 min baca',
        is_featured: false,
        status: 'published',
    });

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/blog', {
            search,
            category: selectedCategory !== 'all' ? selectedCategory : undefined,
            status: selectedStatus !== 'all' ? selectedStatus : undefined,
        }, { preserveState: true });
    };

    const handleFilterChange = (cat, stat) => {
        setSelectedCategory(cat);
        setSelectedStatus(stat);
        router.get('/admin/blog', {
            search: search || undefined,
            category: cat !== 'all' ? cat : undefined,
            status: stat !== 'all' ? stat : undefined,
        }, { preserveState: true });
    };

    const openCreateModal = () => {
        setEditingPost(null);
        setFormData({
            title: '',
            category: 'Software Engineering',
            excerpt: '',
            content: '',
            cover_image: null,
            cover_image_url: '',
            author_name: 'KyySolutions Core Team',
            author_role: 'Principal Software Architect',
            read_time: '5 min baca',
            is_featured: false,
            status: 'published',
        });
        setIsModalOpen(true);
    };

    const openEditModal = (post) => {
        setEditingPost(post);
        setFormData({
            title: post.title,
            category: post.category,
            excerpt: post.excerpt || '',
            content: post.content,
            cover_image: null,
            cover_image_url: post.cover_image || '',
            author_name: post.author_name || 'KyySolutions Team',
            author_role: post.author_role || 'Software Architect',
            read_time: post.read_time || '5 min baca',
            is_featured: post.is_featured,
            status: post.status,
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = { ...formData };
        if (editingPost) {
            router.post(`/admin/blog/${editingPost.id}?_method=PUT`, payload, {
                onSuccess: () => setIsModalOpen(false),
            });
        } else {
            router.post('/admin/blog', payload, {
                onSuccess: () => setIsModalOpen(false),
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
            router.delete(`/admin/blog/${id}`, { preserveScroll: true });
        }
    };

    const handleToggleFeatured = (id) => {
        router.patch(`/admin/blog/${id}/featured`, {}, { preserveScroll: true });
    };

    return (
        <AdminLayout>
            <Head title="Manajemen Blog & CMS — Super Admin KyySolutions" />

            <div className="space-y-6 max-w-[1400px] mx-auto pb-16 font-sans">
                
                {/* 1. Header Title & Create Action */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
                    <div className="space-y-1">
                        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-bold uppercase tracking-wider">
                            <FileText className="w-3.5 h-3.5" />
                            <span>Knowledge Hub & Editorial CMS</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                            Manajemen Artikel & Blog
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500">
                            Kelola publikasi wawasan teknis, tutorial rekayasa software, dan artikel panduan resmi KyySolutions.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                        <Link
                            href="/blog"
                            target="_blank"
                            className="px-3.5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors inline-flex items-center space-x-1.5"
                        >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Lihat Publik</span>
                        </Link>

                        <button
                            type="button"
                            onClick={() => setIsAiModalOpen(true)}
                            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-blue-500/25 inline-flex items-center space-x-2 transition-all cursor-pointer group"
                        >
                            <Sparkles className="w-4 h-4 text-blue-200 group-hover:rotate-12 transition-transform" />
                            <span>Generate Artikel AI</span>
                        </button>

                        <button
                            type="button"
                            onClick={openCreateModal}
                            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md shadow-slate-900/15 inline-flex items-center space-x-2 transition-all cursor-pointer"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Tulis Manual</span>
                        </button>
                    </div>
                </div>

                {/* 2. Stats Overview Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                        <div>
                            <span className="text-xs text-slate-500 font-medium">Total Artikel</span>
                            <div className="text-2xl font-black text-[#0F172A] mt-1">{stats.total || 0}</div>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold">
                            <FileText className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                        <div>
                            <span className="text-xs text-slate-500 font-medium">Diterbitkan</span>
                            <div className="text-2xl font-black text-emerald-600 mt-1">{stats.published || 0}</div>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                            <CheckCircle2 className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                        <div>
                            <span className="text-xs text-slate-500 font-medium">Artikel Unggulan</span>
                            <div className="text-2xl font-black text-amber-500 mt-1">{stats.featured || 0}</div>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center font-bold">
                            <Star className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                        <div>
                            <span className="text-xs text-slate-500 font-medium">Total Pembaca (Views)</span>
                            <div className="text-2xl font-black text-purple-600 mt-1">{stats.totalViews?.toLocaleString('id-ID') || 0}</div>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                            <Eye className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                {/* 3. Search & Filter Bar */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
                    <form onSubmit={handleSearch} className="relative w-full md:w-80">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari judul, topik, atau penulis..."
                            className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:bg-white focus:border-[#2563EB] focus:outline-none transition-colors"
                        />
                    </form>

                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                        <select
                            value={selectedCategory}
                            onChange={(e) => handleFilterChange(e.target.value, selectedStatus)}
                            className="h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#2563EB] cursor-pointer"
                        >
                            <option value="all">Semua Kategori</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>

                        <select
                            value={selectedStatus}
                            onChange={(e) => handleFilterChange(selectedCategory, e.target.value)}
                            className="h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#2563EB] cursor-pointer"
                        >
                            <option value="all">Semua Status</option>
                            <option value="published">Diterbitkan (Published)</option>
                            <option value="draft">Draft</option>
                            <option value="archived">Diarsipkan</option>
                        </select>
                    </div>
                </div>

                {/* 4. Blog Posts Table */}
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                                    <th className="py-4 px-5">Artikel & Topik</th>
                                    <th className="py-4 px-5">Kategori</th>
                                    <th className="py-4 px-5">Penulis</th>
                                    <th className="py-4 px-5 text-center">Status</th>
                                    <th className="py-4 px-5 text-center">Unggulan</th>
                                    <th className="py-4 px-5 text-center">Views</th>
                                    <th className="py-4 px-5 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-xs">
                                {posts.data?.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="py-12 text-center text-slate-400">
                                            Tidak ada artikel ditemukan. Klik <strong>Tulis Artikel Baru</strong> untuk menerbitkan wawasan pertama.
                                        </td>
                                    </tr>
                                ) : (
                                    posts.data.map((post) => (
                                        <tr key={post.id} className="hover:bg-slate-50/70 transition-colors">
                                            <td className="py-4 px-5 max-w-sm">
                                                <div className="font-bold text-[#0F172A] text-sm leading-snug line-clamp-2">
                                                    {post.title}
                                                </div>
                                                <div className="text-[11px] text-slate-400 mt-1 flex items-center space-x-2">
                                                    <Clock className="w-3 h-3 text-slate-400" />
                                                    <span>{post.read_time}</span>
                                                    <span>•</span>
                                                    <span>{post.published_at}</span>
                                                </div>
                                            </td>

                                            <td className="py-4 px-5">
                                                <span className="px-2.5 py-1 rounded-md bg-blue-50 text-[#2563EB] font-bold text-[11px] border border-blue-100">
                                                    {post.category}
                                                </span>
                                            </td>

                                            <td className="py-4 px-5">
                                                <div className="font-semibold text-slate-800">{post.author_name}</div>
                                                <div className="text-[10px] text-slate-400">{post.author_role}</div>
                                            </td>

                                            <td className="py-4 px-5 text-center">
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                    post.status === 'published'
                                                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                                                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                                                }`}>
                                                    {post.status}
                                                </span>
                                            </td>

                                            <td className="py-4 px-5 text-center">
                                                <button
                                                    onClick={() => handleToggleFeatured(post.id)}
                                                    className={`w-7 h-7 rounded-lg inline-flex items-center justify-center transition-colors cursor-pointer ${
                                                        post.is_featured 
                                                            ? 'bg-amber-100 text-amber-600' 
                                                            : 'bg-slate-100 text-slate-400 hover:text-amber-500'
                                                    }`}
                                                    title={post.is_featured ? 'Artikel Unggulan' : 'Jadikan Unggulan'}
                                                >
                                                    <Star className={`w-3.5 h-3.5 ${post.is_featured ? 'fill-amber-500' : ''}`} />
                                                </button>
                                            </td>

                                            <td className="py-4 px-5 text-center font-bold text-slate-700">
                                                {post.views_count?.toLocaleString('id-ID')}
                                            </td>

                                            <td className="py-4 px-5 text-right">
                                                <div className="inline-flex items-center space-x-1.5">
                                                    <Link
                                                        href={`/blog/${post.slug}`}
                                                        target="_blank"
                                                        className="w-8 h-8 rounded-lg border border-slate-200 hover:bg-blue-50 hover:text-[#2563EB] text-slate-500 flex items-center justify-center transition-colors"
                                                        title="Lihat Halaman Publik"
                                                    >
                                                        <ExternalLink className="w-3.5 h-3.5" />
                                                    </Link>

                                                    <button
                                                        onClick={() => openEditModal(post)}
                                                        className="w-8 h-8 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                                                        title="Edit Artikel"
                                                    >
                                                        <Edit className="w-3.5 h-3.5" />
                                                    </button>

                                                    <button
                                                        onClick={() => handleDelete(post.id)}
                                                        className="w-8 h-8 rounded-lg border border-slate-200 hover:bg-rose-50 hover:text-rose-600 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
                                                        title="Hapus Artikel"
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

                {/* 5. Create / Edit Article Modal */}
                <AnimatePresence>
                    {isModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                                className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-3xl overflow-hidden my-8"
                            >
                                {/* Modal Header */}
                                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                    <div>
                                        <h3 className="text-lg font-bold text-[#0F172A]">
                                            {editingPost ? 'Edit Artikel Blog' : 'Tulis Artikel Blog Baru'}
                                        </h3>
                                        <p className="text-xs text-slate-500">
                                            Isi konten artikel teknis untuk ditayangkan di Knowledge Hub publik.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Modal Form */}
                                <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                                    
                                    {/* Judul Artikel */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-700">Judul Artikel *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            placeholder="Contoh: Arsitektur Multi-Tenant Database Terisolasi pada Laravel 11"
                                            className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
                                        />
                                    </div>

                                    {/* Kategori & Status */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-700">Kategori Topik *</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                placeholder="Engineering / AI / Mobile"
                                                className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs focus:border-[#2563EB] focus:outline-none"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-700">Waktu Baca</label>
                                            <input
                                                type="text"
                                                value={formData.read_time}
                                                onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                                                placeholder="5 min baca"
                                                className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs focus:border-[#2563EB] focus:outline-none"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-700">Status Publikasi *</label>
                                            <select
                                                value={formData.status}
                                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                                className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs font-semibold focus:border-[#2563EB] focus:outline-none cursor-pointer"
                                            >
                                                <option value="published">Diterbitkan (Published)</option>
                                                <option value="draft">Draft (Disimpan Sementara)</option>
                                                <option value="archived">Diarsipkan</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Ringkasan Excerpt */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-700">Ringkasan Singkat (Excerpt)</label>
                                        <textarea
                                            rows="2"
                                            value={formData.excerpt}
                                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                            placeholder="Ringkasan 1-2 kalimat pengantar artikel..."
                                            className="w-full p-3 rounded-xl border border-slate-200 text-xs text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
                                        />
                                    </div>

                                    {/* Konten Lengkap Markdown */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-700">Konten Artikel Lengkap (Markdown / Text) *</label>
                                        <textarea
                                            rows="8"
                                            required
                                            value={formData.content}
                                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                            placeholder="Tulis artikel teknis lengkap dengan heading, penjelasan arsitektur, dan snippet kode..."
                                            className="w-full p-3.5 rounded-xl border border-slate-200 text-xs font-mono text-[#0F172A] focus:border-[#2563EB] focus:outline-none leading-relaxed"
                                        />
                                    </div>

                                    {/* Cover Image Upload */}
                                    <ImageUploadInput
                                        label="Cover Image Artikel"
                                        recommendedText="1280 × 720 px (Rasio 16:9), Maks 3MB"
                                        aspectRatio="aspect-video"
                                        value={formData.cover_image_url}
                                        onChangeFile={(file) => setFormData({ ...formData, cover_image: file })}
                                        onChangeUrl={(url) => setFormData({ ...formData, cover_image_url: url })}
                                    />

                                    {/* Penulis & Waktu */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-700">Nama Penulis</label>
                                            <input
                                                type="text"
                                                value={formData.author_name}
                                                onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                                                placeholder="Nama Engineer / Penulis"
                                                className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs focus:border-[#2563EB] focus:outline-none"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-700">Role / Jabatan Penulis</label>
                                            <input
                                                type="text"
                                                value={formData.author_role}
                                                onChange={(e) => setFormData({ ...formData, author_role: e.target.value })}
                                                placeholder="Contoh: Principal Software Architect"
                                                className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs focus:border-[#2563EB] focus:outline-none"
                                            />
                                        </div>
                                    </div>

                                    {/* Featured Switch */}
                                    <div className="pt-2 flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="featured_checkbox"
                                            checked={formData.is_featured}
                                            onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                                            className="w-4 h-4 text-[#2563EB] rounded border-slate-300 focus:ring-blue-500"
                                        />
                                        <label htmlFor="featured_checkbox" className="text-xs font-bold text-slate-700 cursor-pointer">
                                            Tampilkan sebagai Artikel Unggulan di Hero Banner
                                        </label>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
                                        <button
                                            type="button"
                                            onClick={() => setIsModalOpen(false)}
                                            className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                                        >
                                            Batal
                                        </button>

                                        <button
                                            type="submit"
                                            className="px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-md shadow-blue-500/25 transition-all cursor-pointer"
                                        >
                                            {editingPost ? 'Simpan Perubahan' : 'Terbitkan Artikel'}
                                        </button>
                                    </div>

                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* 6. AI Article & Tutorial Studio Modal */}
                <AiBlogGeneratorModal
                    isOpen={isAiModalOpen}
                    onClose={() => setIsAiModalOpen(false)}
                    onApplyToForm={handleApplyAiData}
                />

            </div>
        </AdminLayout>
    );
}
