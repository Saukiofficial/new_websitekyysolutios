import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import ImageUploadInput from '@/Components/Shared/ImageUploadInput';
import { 
    Briefcase, 
    Plus, 
    Search, 
    Edit, 
    Trash2, 
    Eye, 
    ExternalLink, 
    CheckCircle2, 
    Star, 
    X,
    Building2,
    Clock,
    Tag,
    Layers,
    Quote
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PortfolioIndex({ projects, categories = [], filters = {}, stats = {} }) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || 'all');
    const [selectedStatus, setSelectedStatus] = useState(filters.status || 'all');

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        category: 'SaaS & Cloud',
        client_name: '',
        industry: 'Technology',
        duration: '8 Minggu',
        live_url: '',
        banner_image: null,
        banner_image_url: '',
        problem_statement: '',
        solution_overview: '',
        architecture_summary: '',
        tech_stack_input: 'Laravel 11, React 19, PostgreSQL, Docker, Redis',
        deliverables_input: 'Dashboard Terpusat, Integrasi API Gateway, Mobile App Android & iOS',
        testimonial_quote: '',
        testimonial_author: '',
        testimonial_role: '',
        featured: false,
        status: 'published',
    });

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/portfolio', {
            search,
            category: selectedCategory !== 'all' ? selectedCategory : undefined,
            status: selectedStatus !== 'all' ? selectedStatus : undefined,
        }, { preserveState: true });
    };

    const handleFilterChange = (cat, stat) => {
        setSelectedCategory(cat);
        setSelectedStatus(stat);
        router.get('/admin/portfolio', {
            search: search || undefined,
            category: cat !== 'all' ? cat : undefined,
            status: stat !== 'all' ? stat : undefined,
        }, { preserveState: true });
    };

    const openCreateModal = () => {
        setEditingProject(null);
        setFormData({
            title: '',
            category: 'SaaS & Cloud',
            client_name: '',
            industry: 'Technology',
            duration: '8 Minggu',
            live_url: '',
            banner_image: null,
            banner_image_url: '',
            problem_statement: '',
            solution_overview: '',
            architecture_summary: '',
            tech_stack_input: 'Laravel 11, React 19, PostgreSQL, Docker, Redis',
            deliverables_input: 'Dashboard Terpusat, Integrasi API Gateway, Mobile App Android & iOS',
            testimonial_quote: '',
            testimonial_author: '',
            testimonial_role: '',
            featured: false,
            status: 'published',
        });
        setIsModalOpen(true);
    };

    const openEditModal = (p) => {
        setEditingProject(p);
        setFormData({
            title: p.title,
            category: p.category,
            client_name: p.client_name,
            industry: p.industry,
            duration: p.duration || '8 Minggu',
            live_url: p.live_url || '',
            banner_image: null,
            banner_image_url: p.banner_image || '',
            problem_statement: p.problem_statement || '',
            solution_overview: p.solution_overview || '',
            architecture_summary: p.architecture_summary || '',
            tech_stack_input: Array.isArray(p.tech_stack) ? p.tech_stack.join(', ') : '',
            deliverables_input: Array.isArray(p.deliverables) ? p.deliverables.join(', ') : '',
            testimonial_quote: p.testimonial?.quote || '',
            testimonial_author: p.testimonial?.author || '',
            testimonial_role: p.testimonial?.role || '',
            featured: p.featured,
            status: p.status,
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = new FormData();
        Object.keys(formData).forEach(key => {
            if (formData[key] !== null && formData[key] !== undefined) {
                payload.append(key, formData[key]);
            }
        });
        
        payload.append('tech_stack', JSON.stringify(formData.tech_stack_input.split(',').map(s => s.trim()).filter(Boolean)));
        payload.append('deliverables', JSON.stringify(formData.deliverables_input.split(',').map(s => s.trim()).filter(Boolean)));
        payload.append('impact_metrics', JSON.stringify([
            { label: 'Efisiensi Waktu', value: '+300%' },
            { label: 'Uptime Sistem', value: '99.9%' },
            { label: 'Kecepatan Proses', value: '< 200ms' },
        ]));

        if (editingProject) {
            router.post(`/admin/portfolio/${editingProject.id}?_method=PUT`, payload, {
                onSuccess: () => setIsModalOpen(false),
            });
        } else {
            router.post('/admin/portfolio', payload, {
                onSuccess: () => setIsModalOpen(false),
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus studi kasus portfolio ini?')) {
            router.delete(`/admin/portfolio/${id}`, { preserveScroll: true });
        }
    };

    const handleToggleFeatured = (id) => {
        router.patch(`/admin/portfolio/${id}/featured`, {}, { preserveScroll: true });
    };

    return (
        <AdminLayout>
            <Head title="Manajemen Portfolio & Studi Kasus — Super Admin KyySolutions" />

            <div className="space-y-6 max-w-[1400px] mx-auto pb-16 font-sans">
                
                {/* 1. Header Title & Create Action */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
                    <div className="space-y-1">
                        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-bold uppercase tracking-wider">
                            <Briefcase className="w-3.5 h-3.5" />
                            <span>Enterprise Showcase & Case Studies CMS</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                            Manajemen Portfolio Proyek
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500">
                            Kelola rekam jejak implementasi rekayasa software enterprise, studi kasus tantangan solusi, dan testimoni klien resmi.
                        </p>
                    </div>

                    <div className="flex items-center space-x-3">
                        <Link
                            href="/portfolio"
                            target="_blank"
                            className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors inline-flex items-center space-x-1.5"
                        >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Lihat Portfolio Publik</span>
                        </Link>

                        <button
                            onClick={openCreateModal}
                            className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-md shadow-blue-500/20 inline-flex items-center space-x-2 transition-all cursor-pointer"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Tambah Studi Kasus</span>
                        </button>
                    </div>
                </div>

                {/* 2. Stats Overview Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                        <div>
                            <span className="text-xs text-slate-500 font-medium">Total Proyek Portfolio</span>
                            <div className="text-2xl font-black text-[#0F172A] mt-1">{stats.total || 0}</div>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold">
                            <Briefcase className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                        <div>
                            <span className="text-xs text-slate-500 font-medium">Diterbitkan (Published)</span>
                            <div className="text-2xl font-black text-emerald-600 mt-1">{stats.published || 0}</div>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                            <CheckCircle2 className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                        <div>
                            <span className="text-xs text-slate-500 font-medium">Proyek Unggulan</span>
                            <div className="text-2xl font-black text-amber-500 mt-1">{stats.featured || 0}</div>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center font-bold">
                            <Star className="w-5 h-5" />
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
                            placeholder="Cari nama proyek, klien, atau industri..."
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

                {/* 4. Portfolio Table */}
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                                    <th className="py-4 px-5">Proyek & Klien</th>
                                    <th className="py-4 px-5">Kategori & Industri</th>
                                    <th className="py-4 px-5">Tech Stack</th>
                                    <th className="py-4 px-5 text-center">Status</th>
                                    <th className="py-4 px-5 text-center">Unggulan</th>
                                    <th className="py-4 px-5 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-xs">
                                {projects.data?.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="py-12 text-center text-slate-400">
                                            Tidak ada data portfolio ditemukan. Klik <strong>Tambah Studi Kasus</strong> untuk menambahkan proyek baru.
                                        </td>
                                    </tr>
                                ) : (
                                    projects.data.map((proj) => (
                                        <tr key={proj.id} className="hover:bg-slate-50/70 transition-colors">
                                            <td className="py-4 px-5 max-w-sm">
                                                <div className="font-bold text-[#0F172A] text-sm leading-snug line-clamp-2">
                                                    {proj.title}
                                                </div>
                                                <div className="text-[11px] text-slate-400 mt-1 flex items-center space-x-2">
                                                    <Building2 className="w-3 h-3 text-slate-400" />
                                                    <span className="font-semibold text-slate-600">{proj.client_name}</span>
                                                    <span>•</span>
                                                    <span>{proj.duration}</span>
                                                </div>
                                            </td>

                                            <td className="py-4 px-5">
                                                <div className="font-bold text-[#2563EB]">{proj.category}</div>
                                                <div className="text-[11px] text-slate-400">{proj.industry}</div>
                                            </td>

                                            <td className="py-4 px-5 max-w-xs">
                                                <div className="flex flex-wrap gap-1">
                                                    {proj.tech_stack?.slice(0, 3).map((tech, i) => (
                                                        <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-semibold">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                    {proj.tech_stack?.length > 3 && (
                                                        <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-400 text-[10px]">
                                                            +{proj.tech_stack.length - 3}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>

                                            <td className="py-4 px-5 text-center">
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                    proj.status === 'published'
                                                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                                                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                                                }`}>
                                                    {proj.status}
                                                </span>
                                            </td>

                                            <td className="py-4 px-5 text-center">
                                                <button
                                                    onClick={() => handleToggleFeatured(proj.id)}
                                                    className={`w-7 h-7 rounded-lg inline-flex items-center justify-center transition-colors cursor-pointer ${
                                                        proj.featured 
                                                            ? 'bg-amber-100 text-amber-600' 
                                                            : 'bg-slate-100 text-slate-400 hover:text-amber-500'
                                                    }`}
                                                    title={proj.featured ? 'Proyek Unggulan' : 'Jadikan Unggulan'}
                                                >
                                                    <Star className={`w-3.5 h-3.5 ${proj.featured ? 'fill-amber-500' : ''}`} />
                                                </button>
                                            </td>

                                            <td className="py-4 px-5 text-right">
                                                <div className="inline-flex items-center space-x-1.5">
                                                    <Link
                                                        href={`/portfolio/${proj.slug}`}
                                                        target="_blank"
                                                        className="w-8 h-8 rounded-lg border border-slate-200 hover:bg-blue-50 hover:text-[#2563EB] text-slate-500 flex items-center justify-center transition-colors"
                                                        title="Lihat Halaman Publik"
                                                    >
                                                        <ExternalLink className="w-3.5 h-3.5" />
                                                    </Link>

                                                    <button
                                                        onClick={() => openEditModal(proj)}
                                                        className="w-8 h-8 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                                                        title="Edit Studi Kasus"
                                                    >
                                                        <Edit className="w-3.5 h-3.5" />
                                                    </button>

                                                    <button
                                                        onClick={() => handleDelete(proj.id)}
                                                        className="w-8 h-8 rounded-lg border border-slate-200 hover:bg-rose-50 hover:text-rose-600 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
                                                        title="Hapus Proyek"
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

                {/* 5. Create / Edit Case Study Modal */}
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
                                            {editingProject ? 'Edit Studi Kasus Portfolio' : 'Tambah Studi Kasus Baru'}
                                        </h3>
                                        <p className="text-xs text-slate-500">
                                            Lengkapi detail rekayasa software, solusi teknis, dan pencapaian metrik proyek.
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
                                    
                                    {/* Judul Proyek */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-700">Nama & Judul Proyek *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            placeholder="Contoh: SmartLogistics ERP: Platform Manajemen Rantai Pasok Multi-Gudang"
                                            className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
                                        />
                                    </div>

                                    {/* Kategori, Klien, Industri */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-700">Kategori Sistem *</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                placeholder="ERP / SaaS / Fintech"
                                                className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs focus:border-[#2563EB] focus:outline-none"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-700">Nama Klien / Perusahaan *</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.client_name}
                                                onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                                                placeholder="PT Logistik Nusantara Prima"
                                                className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs focus:border-[#2563EB] focus:outline-none"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-700">Industri</label>
                                            <input
                                                type="text"
                                                value={formData.industry}
                                                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                                placeholder="Supply Chain & Distribusi"
                                                className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs focus:border-[#2563EB] focus:outline-none"
                                            />
                                        </div>
                                    </div>

                                    {/* Durasi & Status */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-700">Durasi Pengerjaan</label>
                                            <input
                                                type="text"
                                                value={formData.duration}
                                                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                                placeholder="10 Minggu"
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

                                    {/* Banner Image Upload */}
                                    <ImageUploadInput
                                        label="Banner Mockup / Cover Portofolio"
                                        recommendedText="1200 × 750 px (Rasio 16:10), Maks 3MB"
                                        aspectRatio="aspect-[16/10]"
                                        value={formData.banner_image_url}
                                        onChangeFile={(file) => setFormData({ ...formData, banner_image: file })}
                                        onChangeUrl={(url) => setFormData({ ...formData, banner_image_url: url })}
                                    />

                                    {/* Tantangan Proyek (Problem Statement) */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-700">Tantangan Klien (Problem Statement) *</label>
                                        <textarea
                                            rows="3"
                                            required
                                            value={formData.problem_statement}
                                            onChange={(e) => setFormData({ ...formData, problem_statement: e.target.value })}
                                            placeholder="Deskripsikan masalah operasional atau bottleneck teknis yang dialami klien..."
                                            className="w-full p-3 rounded-xl border border-slate-200 text-xs text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
                                        />
                                    </div>

                                    {/* Solusi Rekayasa Software KyySolutions */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-700">Solusi Rekayasa Software KyySolutions *</label>
                                        <textarea
                                            rows="3"
                                            required
                                            value={formData.solution_overview}
                                            onChange={(e) => setFormData({ ...formData, solution_overview: e.target.value })}
                                            placeholder="Jelaskan modul, integrasi, dan arsitektur yang dibangun untuk menyelesaikan masalah klien..."
                                            className="w-full p-3 rounded-xl border border-slate-200 text-xs text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
                                        />
                                    </div>

                                    {/* Tech Stack & Deliverables */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-700">Tech Stack (Pisahkan Koma)</label>
                                            <input
                                                type="text"
                                                value={formData.tech_stack_input}
                                                onChange={(e) => setFormData({ ...formData, tech_stack_input: e.target.value })}
                                                placeholder="Laravel 11, React 19, PostgreSQL, Docker, Redis"
                                                className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs focus:border-[#2563EB] focus:outline-none"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-700">Deliverables / Fitur Utama (Pisahkan Koma)</label>
                                            <input
                                                type="text"
                                                value={formData.deliverables_input}
                                                onChange={(e) => setFormData({ ...formData, deliverables_input: e.target.value })}
                                                placeholder="Dashboard Terpusat, REST API, Aplikasi Mobile"
                                                className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs focus:border-[#2563EB] focus:outline-none"
                                            />
                                        </div>
                                    </div>

                                    {/* Testimoni Klien */}
                                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                                        <div className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
                                            <Quote className="w-3.5 h-3.5 text-[#2563EB]" />
                                            <span>Testimoni Klien (Opsional)</span>
                                        </div>

                                        <input
                                            type="text"
                                            value={formData.testimonial_quote}
                                            onChange={(e) => setFormData({ ...formData, testimonial_quote: e.target.value })}
                                            placeholder="Kutipan testimoni klien..."
                                            className="w-full h-9 px-3 rounded-lg border border-slate-200 text-xs bg-white focus:border-[#2563EB] focus:outline-none"
                                        />

                                        <div className="grid grid-cols-2 gap-2">
                                            <input
                                                type="text"
                                                value={formData.testimonial_author}
                                                onChange={(e) => setFormData({ ...formData, testimonial_author: e.target.value })}
                                                placeholder="Nama Klien (e.g. Hendrawan Kusuma)"
                                                className="w-full h-9 px-3 rounded-lg border border-slate-200 text-xs bg-white focus:border-[#2563EB] focus:outline-none"
                                            />
                                            <input
                                                type="text"
                                                value={formData.testimonial_role}
                                                onChange={(e) => setFormData({ ...formData, testimonial_role: e.target.value })}
                                                placeholder="Jabatan (e.g. Chief Operating Officer)"
                                                className="w-full h-9 px-3 rounded-lg border border-slate-200 text-xs bg-white focus:border-[#2563EB] focus:outline-none"
                                            />
                                        </div>
                                    </div>

                                    {/* Featured Switch */}
                                    <div className="pt-2 flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="featured_portfolio_checkbox"
                                            checked={formData.featured}
                                            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                            className="w-4 h-4 text-[#2563EB] rounded border-slate-300 focus:ring-blue-500"
                                        />
                                        <label htmlFor="featured_portfolio_checkbox" className="text-xs font-bold text-slate-700 cursor-pointer">
                                            Tampilkan sebagai Proyek Unggulan (*Featured Case Study*)
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
                                            {editingProject ? 'Simpan Perubahan' : 'Simpan Studi Kasus'}
                                        </button>
                                    </div>

                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

            </div>
        </AdminLayout>
    );
}
