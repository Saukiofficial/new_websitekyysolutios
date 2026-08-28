import { useState, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { 
    Layers, 
    Globe, 
    Smartphone, 
    Bot, 
    TrendingUp, 
    ArrowRight, 
    Check, 
    Search, 
    Building2, 
    Clock, 
    ExternalLink, 
    X,
    ShieldCheck,
    MessageSquare,
    Zap,
    Quote,
    CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContactModal } from '@/Context/ContactModalContext';

export default function PortfolioIndex({ projects = [], categories = [] }) {
    const { openContact } = useContactModal();
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProject, setSelectedProject] = useState(null);

    // Filter projects based on activeTab and searchQuery
    const filteredProjects = useMemo(() => {
        return projects.filter((project) => {
            const matchesTab = activeTab === 'all' || project.categoryKey === activeTab;
            const matchesSearch = searchQuery.trim() === '' || 
                project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));

            return matchesTab && matchesSearch;
        });
    }, [projects, activeTab, searchQuery]);

    return (
        <PublicLayout>
            <Head>
                <title>Showcase Portfolio & Studi Kasus Proyek Software — KyySolutions</title>
                <meta name="description" content="Jelajahi portfolio karya rekayasa software KyySolutions: Sistem ERP Pergudangan, SaaS Penagihan, Aplikasi Mobile Telemedisin, dan Agen AI WhatsApp." />
            </Head>

            <div className="bg-[#F8FAFC] text-[#0F172A] pt-28 pb-20 font-sans">
                
                {/* ═══════════════════════════════════════════════════════
                    1. HERO HEADER SECTION
                   ═══════════════════════════════════════════════════════ */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14 text-center">
                    
                    {/* Eyebrow */}
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-bold uppercase tracking-wider mb-6 shadow-xs"
                    >
                        <Zap className="w-3.5 h-3.5 text-[#2563EB]" />
                        <span>Studi Kasus & Showcase Proyek Nyata</span>
                    </motion.div>

                    {/* Main Title */}
                    <motion.h1 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] tracking-tight leading-[1.15] max-w-4xl mx-auto"
                    >
                        Karya Nyata yang Memberi <span className="text-[#2563EB]">Dampak Nyata</span> Bagi Pertumbuhan Klien
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mt-6 leading-relaxed"
                    >
                        Jelajahi rekam jejak solusi digital berstandar industri yang dirancang dengan arsitektur tangguh, performa tinggi, dan ROI terukur.
                    </motion.p>

                    {/* Key Stats Bar */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                        <div className="text-center border-r border-slate-100 last:border-0">
                            <div className="text-2xl sm:text-3xl font-black text-[#0F172A]">50+</div>
                            <div className="text-xs text-slate-500 font-medium mt-0.5">Proyek Selesai</div>
                        </div>
                        <div className="text-center border-r border-slate-100 last:border-0">
                            <div className="text-2xl sm:text-3xl font-black text-[#2563EB]">99.8%</div>
                            <div className="text-xs text-slate-500 font-medium mt-0.5">On-Time Delivery</div>
                        </div>
                        <div className="text-center border-r border-slate-100 last:border-0">
                            <div className="text-2xl sm:text-3xl font-black text-emerald-600">100%</div>
                            <div className="text-xs text-slate-500 font-medium mt-0.5">Kepemilikan Kode</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl font-black text-indigo-600">15+</div>
                            <div className="text-xs text-slate-500 font-medium mt-0.5">Sektor Industri</div>
                        </div>
                    </div>

                </section>

                {/* ═══════════════════════════════════════════════════════
                    2. FILTER CONTROLS & SEARCH BAR
                   ═══════════════════════════════════════════════════════ */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-200">
                        
                        {/* Interactive Filter Pills */}
                        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                            {categories.map((cat) => {
                                const isActive = activeTab === cat.key;
                                return (
                                    <button
                                        key={cat.key}
                                        onClick={() => setActiveTab(cat.key)}
                                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                            isActive
                                                ? 'bg-[#2563EB] text-white shadow-md shadow-blue-500/20'
                                                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                                        }`}
                                    >
                                        {cat.label}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Instant Search Bar */}
                        <div className="relative w-full md:w-72">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari proyek / teknologi..."
                                className="w-full h-10 pl-9 pr-4 text-xs bg-white border border-slate-200 rounded-xl text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:ring-3 focus:ring-blue-500/10 font-medium"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>

                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════
                    3. PORTFOLIO SHOWCASE GRID
                   ═══════════════════════════════════════════════════════ */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    
                    {filteredProjects.length === 0 ? (
                        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 my-8">
                            <Layers className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                            <h3 className="text-base font-bold text-slate-700">Tidak ada proyek yang sesuai</h3>
                            <p className="text-xs text-slate-400 mt-1">Coba gunakan kata kunci pencarian lain atau pilih tab kategori berbeda.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.35, delay: index * 0.05 }}
                                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all flex flex-col justify-between group"
                                >
                                    <div>
                                        
                                        {/* Visual Gradient Header Banner with Impact Metric */}
                                        <div className={`p-6 sm:p-7 bg-gradient-to-br ${project.gradient} text-white relative overflow-hidden`}>
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                                            
                                            <div className="relative z-10 flex items-center justify-between">
                                                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20 uppercase tracking-wider">
                                                    {project.category}
                                                </span>
                                                <span className="text-xs text-slate-300 font-mono font-medium">
                                                    {project.year}
                                                </span>
                                            </div>

                                            <div className="relative z-10 mt-6">
                                                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-emerald-500/25 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
                                                    <TrendingUp className="w-3.5 h-3.5" />
                                                    <span>{project.impactMetric}</span>
                                                </div>
                                                <div className="text-xs text-slate-300 font-semibold mt-2">
                                                    Klien: {project.client}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Body Details */}
                                        <div className="p-6 sm:p-7 space-y-4">
                                            
                                            <h3 className="text-base sm:text-lg font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors leading-snug">
                                                {project.title}
                                            </h3>

                                            <p className="text-xs text-slate-600 leading-relaxed">
                                                {project.summary}
                                            </p>

                                            {/* Key Metrics Quick Row */}
                                            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                                                {project.metrics.slice(0, 2).map((m, mIdx) => (
                                                    <div key={mIdx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                                                        <span className="text-[10px] text-slate-400 block">{m.label}</span>
                                                        <span className="text-xs font-bold text-[#0F172A]">{m.value}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Tech Stack Pills */}
                                            <div className="pt-2 flex flex-wrap gap-1.5">
                                                {project.techStack.map((tech, tIdx) => (
                                                    <span key={tIdx} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>

                                        </div>

                                    </div>

                                    {/* Action Bar */}
                                    <div className="p-6 sm:p-7 pt-0 flex items-center justify-between gap-3 border-t border-slate-100 mt-2">
                                        <button
                                            onClick={() => setSelectedProject(project)}
                                            className="w-full py-2.5 px-4 rounded-xl bg-blue-50 hover:bg-[#2563EB] text-[#2563EB] hover:text-white text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs"
                                        >
                                            <span>Buka Studi Kasus</span>
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </button>
                                    </div>

                                </motion.div>
                            ))}
                        </div>
                    )}

                </section>

                {/* ═══════════════════════════════════════════════════════
                    4. BOTTOM CTA BLUEPRINT CONSULTATION
                   ═══════════════════════════════════════════════════════ */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
                    <div className="bg-gradient-to-br from-[#06152E] via-[#091E3E] to-[#041126] rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-blue-900/40 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
                        
                        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative z-10 space-y-3 max-w-xl text-center lg:text-left">
                            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-blue-500/20 text-[#60A5FA] text-xs font-bold uppercase tracking-wider">
                                <ShieldCheck className="w-3.5 h-3.5 text-[#60A5FA]" />
                                <span>Konsultasi Blueprint Teknis</span>
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                                Ingin Membangun Sistem Serupa untuk Bisnis Anda?
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                Jadwalkan diskusi teknis bersama Tech Lead KyySolutions. Kami siap menyusun dokumen estimasi, arsitektur database, dan timeline pengerjaan gratis.
                            </p>
                        </div>

                        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3.5 w-full lg:w-auto">
                            <button
                                onClick={openContact}
                                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs shadow-lg shadow-blue-500/25 flex items-center justify-center space-x-2 transition-all cursor-pointer"
                            >
                                <MessageSquare className="w-4 h-4" />
                                <span>Konsultasi Proyek Sekarang</span>
                            </button>

                            <Link
                                href="/services"
                                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-colors flex items-center justify-center space-x-1.5"
                            >
                                <span>Kalkulator Estimasi Biaya</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════
                    5. MODAL: DETAILED CASE STUDY VIEW
                   ═══════════════════════════════════════════════════════ */}
                <AnimatePresence>
                    {selectedProject && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
                            
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ duration: 0.2 }}
                                className="w-full max-w-3xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden my-8"
                            >
                                {/* Header Banner */}
                                <div className={`p-6 sm:p-8 bg-gradient-to-br ${selectedProject.gradient} text-white relative flex items-start justify-between`}>
                                    <div className="space-y-2 max-w-xl">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/20 border border-white/20 uppercase tracking-wider">
                                                {selectedProject.category}
                                            </span>
                                            <span className="text-xs text-slate-300 font-mono">
                                                Tahun: {selectedProject.year} • Durasi: {selectedProject.duration}
                                            </span>
                                        </div>
                                        <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                                            {selectedProject.title}
                                        </h2>
                                        <p className="text-xs text-slate-200">
                                            Klien: <strong className="text-white">{selectedProject.client}</strong> ({selectedProject.industry})
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => setSelectedProject(null)}
                                        className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center cursor-pointer transition-colors shrink-0 ml-4"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Modal Content Body */}
                                <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto text-xs">
                                    
                                    {/* 3 Impact Metrics */}
                                    <div className="grid grid-cols-3 gap-3">
                                        {selectedProject.metrics.map((m, idx) => (
                                            <div key={idx} className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 text-center">
                                                <span className="text-[10px] text-slate-500 font-medium block">{m.label}</span>
                                                <span className="text-sm sm:text-base font-black text-[#2563EB] mt-0.5 block">{m.value}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Challenge & Solution */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                                            <h4 className="font-bold text-slate-900 flex items-center text-xs text-amber-800">
                                                <span>⚠️ Tantangan Klien</span>
                                            </h4>
                                            <p className="text-slate-600 leading-relaxed">
                                                {selectedProject.challenge}
                                            </p>
                                        </div>

                                        <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-2">
                                            <h4 className="font-bold text-emerald-900 flex items-center text-xs">
                                                <span>💡 Solusi Rekayasa KyySolutions</span>
                                            </h4>
                                            <p className="text-slate-600 leading-relaxed">
                                                {selectedProject.solution}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Key Features Delivered */}
                                    <div className="space-y-2.5 pt-2">
                                        <h4 className="font-bold text-[#0F172A] text-xs uppercase tracking-wider text-slate-400">
                                            Fitur Kunci yang Diimplementasikan:
                                        </h4>
                                        <div className="space-y-2">
                                            {selectedProject.features.map((feat, fIdx) => (
                                                <div key={fIdx} className="flex items-start space-x-2.5 text-slate-700 bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
                                                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                                    <span className="font-medium">{feat}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="space-y-2 pt-2">
                                        <h4 className="font-bold text-[#0F172A] text-xs uppercase tracking-wider text-slate-400">
                                            Teknologi & Infrastruktur:
                                        </h4>
                                        <div className="flex flex-wrap gap-1.5">
                                            {selectedProject.techStack.map((tech, tIdx) => (
                                                <span key={tIdx} className="text-xs font-bold px-3 py-1 rounded-lg bg-blue-50 text-[#2563EB] border border-blue-200">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Testimonial Quote */}
                                    {selectedProject.testimonial && (
                                        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white space-y-3 relative">
                                            <Quote className="w-6 h-6 text-blue-400 opacity-40 absolute top-3 right-4" />
                                            <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed">
                                                "{selectedProject.testimonial.quote}"
                                            </p>
                                            <div className="text-[11px] text-blue-300 font-semibold">
                                                — {selectedProject.testimonial.author}, <span className="text-slate-400">{selectedProject.testimonial.role}</span>
                                            </div>
                                        </div>
                                    )}

                                </div>

                                {/* Modal Footer */}
                                <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
                                    <button
                                        onClick={() => setSelectedProject(null)}
                                        className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-white transition-colors cursor-pointer"
                                    >
                                        Tutup
                                    </button>

                                    <button
                                        onClick={() => {
                                            const text = `Halo KyySolutions, saya melihat studi kasus *${selectedProject.title}* dan ingin membuat sistem serupa untuk bisnis saya.`;
                                            window.open(`https://wa.me/6281232916758?text=${encodeURIComponent(text)}`, '_blank');
                                        }}
                                        className="px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs shadow-md shadow-blue-500/25 flex items-center space-x-2 transition-all cursor-pointer"
                                    >
                                        <MessageSquare className="w-4 h-4" />
                                        <span>Konsultasikan Proyek Serupa</span>
                                    </button>
                                </div>

                            </motion.div>

                        </div>
                    )}
                </AnimatePresence>

            </div>
        </PublicLayout>
    );
}
