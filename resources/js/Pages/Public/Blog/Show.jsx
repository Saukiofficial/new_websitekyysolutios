import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { 
    Clock, 
    Calendar, 
    ArrowLeft, 
    ArrowRight, 
    Share2, 
    Tag, 
    Check, 
    User, 
    MessageSquare, 
    BookOpen,
    ShieldCheck,
    Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function BlogShow({ article, relatedArticles = [] }) {
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: article.title,
                text: article.excerpt,
                url: window.location.href,
            }).catch(() => {});
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Tautan artikel telah disalin ke clipboard!');
        }
    };

    return (
        <PublicLayout>
            <Head>
                <title>{`${article.title} — KyySolutions Blog`}</title>
                <meta name="description" content={article.excerpt} />
            </Head>

            <div className="bg-[#F8FAFC] text-[#0F172A] pt-28 pb-20 font-sans">
                
                {/* ═══════════════════════════════════════════════════════
                    1. ARTICLE HEADER & HERO
                   ═══════════════════════════════════════════════════════ */}
                <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                    
                    {/* Back Link */}
                    <div className="mb-6">
                        <Link 
                            href="/blog"
                            className="inline-flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-[#2563EB] transition-colors"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>Kembali ke Knowledge Hub</span>
                        </Link>
                    </div>

                    {/* Category & Meta */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-bold uppercase tracking-wider">
                            {article.category}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center">
                            <Clock className="w-3.5 h-3.5 mr-1" />
                            {article.readTime}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-xs text-slate-400 flex items-center">
                            <Calendar className="w-3.5 h-3.5 mr-1" />
                            {article.date}
                        </span>
                    </div>

                    {/* Main Title */}
                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight leading-[1.2]">
                        {article.title}
                    </h1>

                    {/* Excerpt Lead Paragraph */}
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed mt-4 font-normal">
                        {article.excerpt}
                    </p>

                    {/* Author & Share Bar */}
                    <div className="py-6 my-6 border-y border-slate-200 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-11 h-11 rounded-full bg-blue-600 text-white font-black text-sm flex items-center justify-center border border-blue-400/40 shadow-xs">
                                {article.author.avatar}
                            </div>
                            <div>
                                <div className="text-sm font-bold text-[#0F172A]">{article.author.name}</div>
                                <div className="text-xs text-slate-500">{article.author.role}</div>
                            </div>
                        </div>

                        <button
                            onClick={handleShare}
                            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer shadow-2xs"
                        >
                            <Share2 className="w-3.5 h-3.5" />
                            <span>Bagikan Artikel</span>
                        </button>
                    </div>

                    {/* Hero Banner Cover Image */}
                    {article.cover_image && (
                        <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-900 mb-8">
                            <img 
                                src={article.cover_image} 
                                alt={article.title} 
                                className="w-full h-full object-cover" 
                            />
                        </div>
                    )}

                    {/* ═══════════════════════════════════════════════════════
                        2. ARTICLE CONTENT BODY
                       ═══════════════════════════════════════════════════════ */}
                    <div className="space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base font-normal">
                        
                        {/* Introduction Card */}
                        <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-100 text-slate-800 text-sm sm:text-base leading-relaxed">
                            {article.content.intro}
                        </div>

                        {/* Structured Sections */}
                        {article.content.sections.map((sec, idx) => (
                            <div key={idx} className="space-y-3 pt-2">
                                <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
                                    {sec.heading}
                                </h2>
                                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                                    {sec.body}
                                </p>
                            </div>
                        ))}

                        {/* Key Takeaways Callout */}
                        {article.content.keyTakeaways && (
                            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#06152E] via-[#091E3E] to-[#041126] text-white shadow-xl space-y-4 my-8">
                                <div className="inline-flex items-center space-x-2 text-xs font-bold text-[#60A5FA] uppercase tracking-wider">
                                    <Zap className="w-4 h-4 text-[#60A5FA]" />
                                    <span>Poin Kunci & Kesimpulan Praktis:</span>
                                </div>
                                <div className="space-y-2.5">
                                    {article.content.keyTakeaways.map((takeaway, tIdx) => (
                                        <div key={tIdx} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-200">
                                            <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                            <span>{takeaway}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tags */}
                        <div className="pt-6 border-t border-slate-200">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Topik Terkait:</span>
                            <div className="flex flex-wrap gap-2">
                                {article.tags.map((tag, tagIdx) => (
                                    <span key={tagIdx} className="text-xs font-semibold px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-700">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* ═══════════════════════════════════════════════════════
                        3. AUTHOR BIO BOX
                       ═══════════════════════════════════════════════════════ */}
                    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs my-10 flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                        <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white font-black text-xl flex items-center justify-center shrink-0 shadow-md">
                            {article.author.avatar}
                        </div>
                        <div className="space-y-1.5">
                            <div className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">Tentang Penulis</div>
                            <h3 className="text-base font-bold text-[#0F172A]">{article.author.name}</h3>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                Software Engineer di KyySolutions dengan spesialisasi arsitektur cloud, rekayasa backend berkinerja tinggi, dan integrasi kecerdasan buatan.
                            </p>
                        </div>
                    </div>

                </article>

                {/* ═══════════════════════════════════════════════════════
                    4. RELATED ARTICLES GRID
                   ═══════════════════════════════════════════════════════ */}
                {relatedArticles.length > 0 && (
                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 border-t border-slate-200 mt-12">
                        
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
                                    Artikel Terkait Lainnya
                                </h3>
                                <p className="text-xs text-slate-500 mt-1">Eksplorasi wawasan teknologi terkini dari KyySolutions.</p>
                            </div>

                            <Link 
                                href="/blog"
                                className="text-xs font-bold text-[#2563EB] hover:underline inline-flex items-center space-x-1"
                            >
                                <span>Lihat Semua</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedArticles.map((rel) => (
                                <Link
                                    key={rel.id}
                                    href={`/blog/${rel.slug}`}
                                    className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all flex flex-col justify-between group"
                                >
                                    <div className="space-y-3">
                                        <span className="text-[11px] font-bold text-[#2563EB] uppercase tracking-wider">
                                            {rel.category}
                                        </span>
                                        <h4 className="text-sm font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors leading-snug">
                                            {rel.title}
                                        </h4>
                                        <p className="text-xs text-slate-500 line-clamp-2">
                                            {rel.excerpt}
                                        </p>
                                    </div>

                                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                                        <span>{rel.readTime}</span>
                                        <ArrowRight className="w-3.5 h-3.5 text-[#2563EB]" />
                                    </div>
                                </Link>
                            ))}
                        </div>

                    </section>
                )}

            </div>
        </PublicLayout>
    );
}
