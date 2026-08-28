import { useState, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { 
    BookOpen, 
    Clock, 
    Calendar, 
    ArrowRight, 
    Search, 
    Tag, 
    X,
    User,
    Zap,
    ChevronRight,
    TrendingUp,
    MessageSquare
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function BlogIndex({ articles = [], categories = [] }) {
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const featuredArticle = useMemo(() => {
        return articles.find(a => a.featured) || articles[0];
    }, [articles]);

    const filteredArticles = useMemo(() => {
        return articles.filter((article) => {
            const matchesTab = activeTab === 'all' || article.categoryKey === activeTab;
            const matchesSearch = searchQuery.trim() === '' || 
                article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

            return matchesTab && matchesSearch;
        });
    }, [articles, activeTab, searchQuery]);

    return (
        <PublicLayout>
            <Head>
                <title>Blog & Wawasan Rekayasa Software — KyySolutions Knowledge Hub</title>
                <meta name="description" content="Artikel, tutorial pemrograman, tren kecerdasan buatan, arsitektur cloud, dan panduan bisnis SaaS dari tim software engineer KyySolutions." />
            </Head>

            <div className="bg-[#F8FAFC] text-[#0F172A] pt-28 pb-20 font-sans">
                
                {/* ═══════════════════════════════════════════════════════
                    1. HERO HEADER SECTION
                   ═══════════════════════════════════════════════════════ */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 text-center">
                    
                    {/* Eyebrow */}
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-bold uppercase tracking-wider mb-6 shadow-xs"
                    >
                        <BookOpen className="w-3.5 h-3.5 text-[#2563EB]" />
                        <span>KyySolutions Knowledge Hub</span>
                    </motion.div>

                    {/* Main Title */}
                    <motion.h1 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] tracking-tight leading-[1.15] max-w-4xl mx-auto"
                    >
                        Wawasan, Tutorial & Panduan <span className="text-[#2563EB]">Rekayasa Software</span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mt-6 leading-relaxed"
                    >
                        Pelajari arsitektur sistem modern, praktik terbaik keamanan enterprise, tren AI terbaru, dan strategi membangun platform digital yang sukses.
                    </motion.p>

                </section>

                {/* ═══════════════════════════════════════════════════════
                    2. FEATURED ARTICLE BANNER
                   ═══════════════════════════════════════════════════════ */}
                {featuredArticle && (
                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                        <Link 
                            href={`/blog/${featuredArticle.slug}`}
                            className="block rounded-3xl bg-gradient-to-br from-[#06152E] via-[#081B39] to-[#041126] border border-blue-900/40 p-7 sm:p-10 lg:p-12 text-white shadow-2xl hover:shadow-blue-500/10 hover:border-blue-700/60 transition-all relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

                            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                                
                                <div className="lg:col-span-8 space-y-4">
                                    
                                    <div className="flex flex-wrap items-center gap-2.5">
                                        <span className="px-3 py-1 rounded-full bg-blue-500/20 text-[#60A5FA] border border-blue-400/20 text-[11px] font-bold uppercase tracking-wider">
                                            Artikel Utama
                                        </span>
                                        <span className="text-xs text-slate-300 font-medium">
                                            {featuredArticle.category}
                                        </span>
                                        <span className="text-slate-500">•</span>
                                        <span className="text-xs text-slate-300 flex items-center">
                                            <Clock className="w-3.5 h-3.5 mr-1 text-slate-400" />
                                            {featuredArticle.readTime}
                                        </span>
                                    </div>

                                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white group-hover:text-blue-300 transition-colors leading-snug">
                                        {featuredArticle.title}
                                    </h2>

                                    <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                                        {featuredArticle.excerpt}
                                    </p>

                                    {/* Author & Read CTA */}
                                    <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/10">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center border border-blue-400/40">
                                                {featuredArticle.author.avatar}
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-white">{featuredArticle.author.name}</div>
                                                <div className="text-[11px] text-slate-400">{featuredArticle.author.role} • {featuredArticle.date}</div>
                                            </div>
                                        </div>

                                        <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-300 group-hover:text-white transition-colors">
                                            <span>Baca Selengkapnya</span>
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>

                                </div>

                                {/* Right Side Visual Accent */}
                                <div className="lg:col-span-4 hidden lg:flex items-center justify-center">
                                    <div className="w-full h-48 rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col justify-between backdrop-blur-xs">
                                        <div className="flex items-center justify-between text-xs text-blue-300 font-mono">
                                            <span>KYY/ENGINEERING</span>
                                            <span>VERIFIED</span>
                                        </div>
                                        <div className="space-y-2">
                                            <span className="text-xs text-slate-400 font-medium block">Topik Populer:</span>
                                            <div className="flex flex-wrap gap-1.5">
                                                {featuredArticle.tags.map((t, idx) => (
                                                    <span key={idx} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/10 text-slate-200 border border-white/10">
                                                        #{t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </Link>
                    </section>
                )}

                {/* ═══════════════════════════════════════════════════════
                    3. FILTER TABS & LIVE SEARCH BAR
                   ═══════════════════════════════════════════════════════ */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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

                        {/* Search Input */}
                        <div className="relative w-full md:w-72">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari artikel / topik..."
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
                    4. ARTICLES GRID
                   ═══════════════════════════════════════════════════════ */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    
                    {filteredArticles.length === 0 ? (
                        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 my-8">
                            <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                            <h3 className="text-base font-bold text-slate-700">Tidak ada artikel yang ditemukan</h3>
                            <p className="text-xs text-slate-400 mt-1">Coba gunakan kata kunci pencarian yang lain.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                            {filteredArticles.map((article, index) => (
                                <motion.div
                                    key={article.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.35, delay: index * 0.05 }}
                                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all flex flex-col justify-between group"
                                >
                                    <div>
                                        
                                        {/* Top Card Gradient Bar */}
                                        <div className={`h-3 w-full bg-gradient-to-r ${article.gradient}`} />

                                        <div className="p-6 sm:p-7 space-y-4">
                                            
                                            {/* Meta: Category & Read Time */}
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-[11px] font-bold text-[#2563EB] uppercase tracking-wider">
                                                    {article.category}
                                                </span>
                                                <span className="text-[11px] text-slate-400 flex items-center">
                                                    <Clock className="w-3 h-3 mr-1" />
                                                    {article.readTime}
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <Link href={`/blog/${article.slug}`} className="block">
                                                <h3 className="text-base sm:text-lg font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors leading-snug">
                                                    {article.title}
                                                </h3>
                                            </Link>

                                            {/* Excerpt */}
                                            <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                                                {article.excerpt}
                                            </p>

                                            {/* Tags */}
                                            <div className="pt-2 flex flex-wrap gap-1.5">
                                                {article.tags.map((tag, tIdx) => (
                                                    <span key={tIdx} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>

                                        </div>

                                    </div>

                                    {/* Card Footer: Author & Read Link */}
                                    <div className="p-6 sm:p-7 pt-4 border-t border-slate-100 flex items-center justify-between">
                                        <div className="flex items-center space-x-2.5">
                                            <div className="w-7 h-7 rounded-full bg-blue-100 text-[#2563EB] font-bold text-[10px] flex items-center justify-center">
                                                {article.author.avatar}
                                            </div>
                                            <div className="text-[11px]">
                                                <span className="font-bold text-[#0F172A] block">{article.author.name}</span>
                                                <span className="text-slate-400 text-[10px]">{article.date}</span>
                                            </div>
                                        </div>

                                        <Link
                                            href={`/blog/${article.slug}`}
                                            className="w-8 h-8 rounded-lg bg-blue-50 group-hover:bg-[#2563EB] text-[#2563EB] group-hover:text-white flex items-center justify-center transition-colors"
                                        >
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>

                                </motion.div>
                            ))}
                        </div>
                    )}

                </section>

                {/* ═══════════════════════════════════════════════════════
                    5. BOTTOM NEWSLETTER / CONSULTATION CTA
                   ═══════════════════════════════════════════════════════ */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                    <div className="bg-white rounded-3xl border border-blue-200 p-8 sm:p-12 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="space-y-3 max-w-xl text-center lg:text-left">
                            <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
                                Kolaborasi Rekayasa Software
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                                Butuh Solusi Khusus untuk Bisnis Anda?
                            </h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Konsultasikan arsitektur aplikasi Anda dengan tim senior engineer KyySolutions. Dapatkan rekomendasi teknis & estimasi pengerjaan gratis.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full lg:w-auto">
                            <Link
                                href="/services"
                                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center justify-center space-x-2 transition-all"
                            >
                                <MessageSquare className="w-4 h-4" />
                                <span>Lihat Paket Layanan Software</span>
                            </Link>

                            <Link
                                href="/portfolio"
                                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center space-x-1.5"
                            >
                                <span>Showcase Portfolio</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>
                </section>

            </div>
        </PublicLayout>
    );
}
