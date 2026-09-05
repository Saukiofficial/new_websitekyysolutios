import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import axios from 'axios';
import { 
    Sparkles, 
    Wand2, 
    RefreshCw, 
    FileText, 
    CheckCircle2, 
    Image as ImageIcon, 
    Layers, 
    Send, 
    Eye, 
    Code2, 
    Sliders, 
    X, 
    ChevronRight, 
    AlertCircle, 
    ArrowRight, 
    Clock, 
    Tag, 
    Copy, 
    Check,
    Bookmark,
    Flame,
    Cpu,
    Shield,
    Smartphone,
    Layout,
    Cloud,
    HelpCircle,
    Search,
    Link2,
    Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

export default function AiBlogGeneratorModal({ isOpen, onClose, onApplyToForm }) {
    // Stage: 'input' | 'generating' | 'preview'
    const [stage, setStage] = useState('input');
    const [loadingStageIndex, setLoadingStageIndex] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    // Input configuration
    const [config, setConfig] = useState({
        topic: '',
        category: 'Software Engineering',
        type: 'tutorial',
        thumbnail_style: 'modern_tech',
        language: 'id',
        instructions: '',
    });

    // Generated result
    const [result, setResult] = useState(null);
    const [activeTab, setActiveTab] = useState('preview'); // 'preview' | 'edit'
    const [isSaving, setIsSaving] = useState(false);
    const [copiedCode, setCopiedCode] = useState(false);

    // Thumbnail studio modes: 'ai' | 'search' | 'url'
    const [thumbMode, setThumbMode] = useState('ai');
    const [customPrompt, setCustomPrompt] = useState('');
    const [isRegeneratingThumb, setIsRegeneratingThumb] = useState(false);
    const [searchLogoQuery, setSearchLogoQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearchingLogos, setIsSearchingLogos] = useState(false);
    const [manualImageUrl, setManualImageUrl] = useState('');

    const handleSearchLogos = async (overrideQuery) => {
        const queryToSearch = overrideQuery || searchLogoQuery || result?.title || config.topic;
        if (!queryToSearch.trim()) return;
        setIsSearchingLogos(true);
        try {
            const res = await axios.get('/admin/blog/ai/search-images', {
                params: { q: queryToSearch }
            });
            if (res.data?.status === 'success') {
                setSearchResults(res.data.results || []);
            }
        } catch (err) {
            console.error('Error searching logos:', err);
        } finally {
            setIsSearchingLogos(false);
        }
    };

    const stagesList = [
        'Menganalisis topik & merancang struktur bab tutorial...',
        'Menulis konten mendalam, contoh kode & penjelasan arsitektur...',
        'Membuat prompt visual & men-generate thumbnail AI 16:9...',
        'Mengoptimasi metadata SEO, tag topik, & kesimpulan kunci...',
    ];

    // Simulate animated loading stages
    useEffect(() => {
        let interval;
        if (stage === 'generating') {
            setLoadingStageIndex(0);
            interval = setInterval(() => {
                setLoadingStageIndex((prev) => (prev < stagesList.length - 1 ? prev + 1 : prev));
            }, 3500);
        }
        return () => clearInterval(interval);
    }, [stage]);

    if (!isOpen) return null;

    const handleStartGenerate = async (e) => {
        e.preventDefault();
        if (!config.topic.trim()) return;

        setStage('generating');
        setErrorMessage('');

        try {
            const response = await axios.post('/admin/blog/ai/generate', config, {
                timeout: 130000,
            });
            if (response.data?.status === 'success') {
                const data = response.data.data;
                setResult({
                    title: data.title || config.topic,
                    category: data.category || config.category,
                    excerpt: data.excerpt || '',
                    content: data.content || '',
                    read_time: data.read_time || '6 min baca',
                    tags: data.tags || [config.category, 'Tutorial', 'Engineering'],
                    key_takeaways: data.key_takeaways || [],
                    cover_image: data.cover_image || '',
                    thumbnail_prompt: data.thumbnail_prompt || '',
                    author_name: 'KyySolutions Core Team',
                    author_role: 'Principal Software Architect',
                });
                setCustomPrompt(data.thumbnail_prompt || '');
                const defaultQuery = config.topic.replace(/tutorial|lengkap|install|di|komputer|lokal|setup|panduan/gi, '').trim() || config.topic;
                setSearchLogoQuery(defaultQuery);
                handleSearchLogos(defaultQuery);
                setStage('preview');
            } else {
                throw new Error(response.data?.message || 'Gagal men-generate artikel');
            }
        } catch (err) {
            console.error('AI Generation Error:', err);
            setErrorMessage(err.response?.data?.message || err.message || 'Terjadi kesalahan saat memproses AI.');
            setStage('input');
        }
    };

    const handleRegenerateThumbnail = async () => {
        if (!customPrompt.trim() && !result?.title) return;
        setIsRegeneratingThumb(true);

        try {
            const response = await axios.post('/admin/blog/ai/generate-thumbnail', {
                prompt: customPrompt || result.thumbnail_prompt || result.title,
                style: config.thumbnail_style,
                category: result.category,
            }, {
                timeout: 40000,
            });

            if (response.data?.status === 'success' && response.data.imageUrl) {
                setResult((prev) => ({ ...prev, cover_image: response.data.imageUrl }));
            }
        } catch (err) {
            alert('Gagal meregenerasi thumbnail: ' + (err.response?.data?.message || err.message));
        } finally {
            setIsRegeneratingThumb(false);
        }
    };

    const handleSaveDirect = (publishStatus = 'draft') => {
        if (!result) return;
        setIsSaving(true);

        const payload = {
            title: result.title,
            category: result.category,
            excerpt: result.excerpt,
            content: result.content,
            cover_image_url: result.cover_image,
            author_name: result.author_name || 'KyySolutions Core Team',
            author_role: result.author_role || 'Principal Software Architect',
            read_time: result.read_time || '6 min baca',
            is_featured: false,
            status: publishStatus,
        };

        router.post('/admin/blog', payload, {
            onSuccess: () => {
                setIsSaving(false);
                onClose();
            },
            onError: (errs) => {
                setIsSaving(false);
                alert('Gagal menyimpan artikel: ' + Object.values(errs).join(', '));
            }
        });
    };

    const handleApplyAndEdit = () => {
        if (!result) return;
        onApplyToForm({
            title: result.title,
            category: result.category,
            excerpt: result.excerpt,
            content: result.content,
            cover_image_url: result.cover_image,
            read_time: result.read_time,
            author_name: result.author_name,
            author_role: result.author_role,
            status: 'draft',
        });
        onClose();
    };

    const handleReset = () => {
        setStage('input');
        setResult(null);
        setErrorMessage('');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
            <motion.div 
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 10 }}
                className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden"
            >
                {/* ════════════════════════════════════════════════════════════
                    MODAL HEADER
                   ════════════════════════════════════════════════════════════ */}
                <div className="p-4 sm:p-5 px-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-900 via-[#0a1b38] to-[#041228] text-white">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 p-0.5 flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <Sparkles className="w-5 h-5 text-white animate-pulse" />
                        </div>
                        <div>
                            <div className="flex items-center space-x-2">
                                <h3 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                                    AI Article & Tutorial Studio
                                </h3>
                                <span className="px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-[#60A5FA] text-[10px] font-bold tracking-wider uppercase">
                                    KyySolutions Engine
                                </span>
                            </div>
                            <p className="text-xs text-slate-300">
                                Buat artikel teknis lengkap, kode program, dan visual thumbnail 16:9 secara otomatis.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* ════════════════════════════════════════════════════════════
                    STAGE 1: INPUT & CONFIGURATION
                   ════════════════════════════════════════════════════════════ */}
                {stage === 'input' && (
                    <form onSubmit={handleStartGenerate} className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
                        {errorMessage && (
                            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start space-x-2.5">
                                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                                <div>
                                    <div className="font-bold">Terjadi Kesalahan</div>
                                    <div className="text-rose-600 mt-0.5">{errorMessage}</div>
                                </div>
                            </div>
                        )}

                        {/* Topik / Ide Artikel */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                                <span>Topik / Masalah / Judul Tutorial yang Ingin Dibuat *</span>
                                <span className="text-[11px] font-normal text-slate-400">Contoh: Tutorial, arsitektur, panduan</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={config.topic}
                                onChange={(e) => setConfig({ ...config, topic: e.target.value })}
                                placeholder="Contoh: Tutorial Lengkap Event Sourcing & CQRS di Laravel 11 dengan PostgreSQL"
                                className="w-full h-12 px-4 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-[#0F172A] placeholder:text-slate-400 focus:border-[#2563EB] focus:ring-4 focus:ring-blue-50 focus:outline-none transition-all"
                            />
                            {/* Suggestions Chips */}
                            <div className="flex flex-wrap items-center gap-1.5 pt-1">
                                <span className="text-[11px] font-semibold text-slate-400 mr-1 flex items-center gap-1">
                                    <Flame className="w-3 h-3 text-amber-500" /> Coba ide:
                                </span>
                                {[
                                    'Arsitektur Microservices dengan Redis Streams di Laravel',
                                    'Panduan Keamanan Web API: Rate Limiting & JWT Rotation',
                                    'Optimasi Query Eloquent & Redis Caching untuk 10.000 QPS',
                                    'Integrasi Payment Gateway Midtrans & Webhook Idempotency'
                                ].map((idea, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => setConfig({ ...config, topic: idea })}
                                        className="text-[10px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 border border-slate-200/60 transition-colors text-left"
                                    >
                                        {idea}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Grid: Kategori & Tipe Konten */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Kategori */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                                    <Layers className="w-3.5 h-3.5 text-blue-600" /> Kategori Artikel
                                </label>
                                <select
                                    value={config.category}
                                    onChange={(e) => setConfig({ ...config, category: e.target.value })}
                                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:border-[#2563EB] focus:outline-none bg-white cursor-pointer"
                                >
                                    <option value="Software Engineering">Software Engineering</option>
                                    <option value="AI & Cloud">AI & Cloud Architecture</option>
                                    <option value="Mobile Development">Mobile Development</option>
                                    <option value="DevOps & Security">DevOps & Cyber Security</option>
                                    <option value="SaaS & Business">SaaS, Business & Product</option>
                                    <option value="UI/UX Design">UI/UX Design Systems</option>
                                </select>
                            </div>

                            {/* Tipe Konten */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                                    <FileText className="w-3.5 h-3.5 text-blue-600" /> Format & Kedalaman Konten
                                </label>
                                <select
                                    value={config.type}
                                    onChange={(e) => setConfig({ ...config, type: e.target.value })}
                                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:border-[#2563EB] focus:outline-none bg-white cursor-pointer"
                                >
                                    <option value="tutorial">Tutorial Hands-On (Step-by-step + Kode Nyata)</option>
                                    <option value="architecture">Panduan Arsitektur & Perancangan Sistem</option>
                                    <option value="best_practice">Best Practices, Clean Code & Pola Desain</option>
                                    <option value="security">Panduan Keamanan & Audit Kerentanan</option>
                                </select>
                            </div>
                        </div>

                        {/* Gaya Thumbnail AI */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                                <span className="flex items-center gap-1.5">
                                    <ImageIcon className="w-3.5 h-3.5 text-blue-600" /> Gaya Visual Thumbnail AI (Rasio 16:9)
                                </span>
                                <span className="text-[11px] font-normal text-emerald-600 font-semibold">
                                    ✓ FLUX Engine 1280×720 Auto-Save
                                </span>
                            </label>
                            
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                                {[
                                    { id: 'modern_tech', name: 'Modern Tech Dark', desc: 'Indigo, obsidian, circuit glow' },
                                    { id: 'cyber_dark', name: 'Cyberpunk Neon', desc: 'Cyan & electric violet streams' },
                                    { id: 'blueprint_3d', name: 'Blueprint 3D', desc: 'Glass isometric engineering grid' },
                                    { id: 'code_terminal', name: 'Code Terminal', desc: 'Sleek IDE workspace & bokeh' },
                                    { id: 'abstract_gradient', name: 'Apple Keynote', desc: 'Fluid glass refractive gradient' },
                                ].map((style) => {
                                    const isSelected = config.thumbnail_style === style.id;
                                    return (
                                        <button
                                            key={style.id}
                                            type="button"
                                            onClick={() => setConfig({ ...config, thumbnail_style: style.id })}
                                            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                                                isSelected 
                                                    ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20 shadow-xs' 
                                                    : 'border-slate-200 hover:border-slate-300 bg-white'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <span className={`text-xs font-bold ${isSelected ? 'text-blue-700' : 'text-slate-800'}`}>
                                                    {style.name}
                                                </span>
                                                {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                                            </div>
                                            <div className="text-[10px] text-slate-500 leading-tight">
                                                {style.desc}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Instruksi Tambahan (Opsional) */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                                <span>Instruksi Khusus / Target Audiens (Opsional)</span>
                                <span className="text-[11px] text-slate-400">Opsional</span>
                            </label>
                            <textarea
                                rows="2"
                                value={config.instructions}
                                onChange={(e) => setConfig({ ...config, instructions: e.target.value })}
                                placeholder="Misal: Sertakan konfigurasi file .env, contoh error handling, atau fokus pada framework Laravel 11..."
                                className="w-full p-3 rounded-xl border border-slate-200 text-xs text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
                            />
                        </div>

                        {/* Submit Bar */}
                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                            <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                                Didukung Model KyySolutions AI & Generator Gambar Otomatis
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-lg shadow-blue-500/25 flex items-center space-x-2 transition-all cursor-pointer group"
                                >
                                    <Wand2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                    <span>Mulai Generate dengan AI</span>
                                </button>
                            </div>
                        </div>
                    </form>
                )}

                {/* ════════════════════════════════════════════════════════════
                    STAGE 2: GENERATING PROGRESS ANIMATION
                   ════════════════════════════════════════════════════════════ */}
                {stage === 'generating' && (
                    <div className="p-8 sm:p-14 flex-1 flex flex-col items-center justify-center text-center space-y-6">
                        <div className="relative">
                            {/* Glowing Aura */}
                            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 blur-xl opacity-40 animate-pulse" />
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-xl shadow-blue-500/30 absolute inset-0 m-auto animate-bounce">
                                <Wand2 className="w-9 h-9" />
                            </div>
                        </div>

                        <div className="space-y-2 max-w-md">
                            <h4 className="text-lg font-black text-[#0F172A]">
                                Sedang Mengkreasikan Artikel & Thumbnail AI...
                            </h4>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                AI sedang menyusun artikel teknis berbobot, menulis kode program, dan merender thumbnail 16:9 beresolusi tinggi.
                            </p>
                        </div>

                        {/* Progress Stepper Indicator */}
                        <div className="w-full max-w-md space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                            {stagesList.map((st, i) => {
                                const isDone = i < loadingStageIndex;
                                const isCurrent = i === loadingStageIndex;
                                return (
                                    <div key={i} className="flex items-center space-x-3 text-left">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                                            isDone 
                                                ? 'bg-emerald-500 text-white' 
                                                : isCurrent 
                                                ? 'bg-blue-600 text-white animate-spin' 
                                                : 'bg-slate-200 text-slate-400'
                                        }`}>
                                            {isDone ? (
                                                <Check className="w-3 h-3" />
                                            ) : isCurrent ? (
                                                <RefreshCw className="w-3 h-3" />
                                            ) : (
                                                <span className="text-[10px] font-bold">{i + 1}</span>
                                            )}
                                        </div>
                                        <span className={`text-xs ${
                                            isCurrent 
                                                ? 'font-bold text-blue-700' 
                                                : isDone 
                                                ? 'text-slate-600 font-medium line-through opacity-70' 
                                                : 'text-slate-400'
                                        }`}>
                                            {st}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* ════════════════════════════════════════════════════════════
                    STAGE 3: PREVIEW & REVIEW STUDIO
                   ════════════════════════════════════════════════════════════ */}
                {stage === 'preview' && result && (
                    <div className="flex-1 flex flex-col overflow-hidden">
                        
                        {/* Sub Header / Info bar */}
                        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                            <div className="flex items-center space-x-2">
                                <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold">
                                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Sukses Digenerate
                                </span>
                                <span className="text-slate-400">•</span>
                                <span className="font-semibold text-slate-700">{result.category}</span>
                                <span className="text-slate-400">•</span>
                                <span className="text-slate-500 flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {result.read_time}
                                </span>
                            </div>

                            <div className="flex items-center space-x-2">
                                <div className="flex rounded-lg bg-slate-200/80 p-0.5 text-xs font-semibold">
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab('preview')}
                                        className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                                            activeTab === 'preview' ? 'bg-white text-blue-600 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                                        }`}
                                    >
                                        Pratinjau Hasil
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab('edit')}
                                        className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                                            activeTab === 'edit' ? 'bg-white text-blue-600 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                                        }`}
                                    >
                                        Edit Teks Markdown
                                    </button>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                                    title="Generate topik lain"
                                >
                                    <RefreshCw className="w-3 h-3" /> Baru
                                </button>
                            </div>
                        </div>

                        {/* Studio Split Body */}
                        <div className="flex-1 overflow-y-auto p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                            
                            {/* ──── LEFT COLUMN: THUMBNAIL & METADATA (5 cols) ──── */}
                            <div className="lg:col-span-5 space-y-4">
                                
                                {/* Thumbnail Card 16:9 */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="font-bold text-slate-700 flex items-center gap-1.5">
                                            <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
                                            Thumbnail AI (16:9)
                                        </span>
                                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                                            Auto Stored
                                        </span>
                                    </div>

                                    <div className="w-full aspect-video rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-md relative group">
                                        {result.cover_image ? (
                                            <img
                                                src={result.cover_image}
                                                alt="AI Thumbnail"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                                                Tidak ada thumbnail
                                            </div>
                                        )}

                                        {isRegeneratingThumb && (
                                            <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex flex-col items-center justify-center text-white space-y-2">
                                                <RefreshCw className="w-6 h-6 animate-spin text-blue-400" />
                                                <span className="text-xs font-bold">Membuat visual baru...</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Logo & Thumbnail Studio Controls */}
                                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                                    {/* Sub-tabs */}
                                    <div className="flex rounded-xl bg-slate-200/70 p-1 text-[11px] font-bold">
                                        <button
                                            type="button"
                                            onClick={() => setThumbMode('ai')}
                                            className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
                                                thumbMode === 'ai' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                                            }`}
                                        >
                                            <Sparkles className="w-3 h-3 text-blue-500" />
                                            <span>Prompt AI</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setThumbMode('search');
                                                if (searchResults.length === 0) handleSearchLogos();
                                            }}
                                            className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
                                                thumbMode === 'search' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                                            }`}
                                        >
                                            <Search className="w-3 h-3 text-indigo-500" />
                                            <span>Cari Logo</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setThumbMode('url')}
                                            className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
                                                thumbMode === 'url' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                                            }`}
                                        >
                                            <Link2 className="w-3 h-3 text-slate-500" />
                                            <span>Tempel URL</span>
                                        </button>
                                    </div>

                                    {/* Mode 1: AI Prompt */}
                                    {thumbMode === 'ai' && (
                                        <div className="space-y-2">
                                            <div className="text-[11px] font-semibold text-slate-600">
                                                Prompt Gambar Visual AI:
                                            </div>
                                            <input
                                                type="text"
                                                value={customPrompt}
                                                onChange={(e) => setCustomPrompt(e.target.value)}
                                                placeholder="Contoh: Official logo Hermes Agent and 9 Router..."
                                                className="w-full h-9 px-3 rounded-lg border border-slate-200 text-xs focus:border-blue-600 focus:outline-none bg-white"
                                            />
                                            <button
                                                type="button"
                                                disabled={isRegeneratingThumb}
                                                onClick={handleRegenerateThumbnail}
                                                className="w-full h-8 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                                            >
                                                <RefreshCw className={`w-3.5 h-3.5 text-blue-600 ${isRegeneratingThumb ? 'animate-spin' : ''}`} />
                                                <span>Regenerate Thumbnail AI</span>
                                            </button>
                                        </div>
                                    )}

                                    {/* Mode 2: Search Official Logos */}
                                    {thumbMode === 'search' && (
                                        <div className="space-y-2.5">
                                            <div className="flex items-center gap-1.5">
                                                <input
                                                    type="text"
                                                    value={searchLogoQuery}
                                                    onChange={(e) => setSearchLogoQuery(e.target.value)}
                                                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleSearchLogos())}
                                                    placeholder="Cari logo (misal: Hermes, 9 Router, Nous)..."
                                                    className="flex-1 h-9 px-3 rounded-lg border border-slate-200 text-xs focus:border-blue-600 focus:outline-none bg-white"
                                                />
                                                <button
                                                    type="button"
                                                    disabled={isSearchingLogos}
                                                    onClick={() => handleSearchLogos()}
                                                    className="h-9 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-50"
                                                >
                                                    {isSearchingLogos ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Search className="w-3 h-3" />}
                                                    <span>Cari</span>
                                                </button>
                                            </div>

                                            {/* Quick Suggestions */}
                                            <div className="flex flex-wrap items-center gap-1">
                                                {['Hermes', 'Nous Research', '9 Router', 'Docker', 'Python'].map((sug, sIdx) => (
                                                    <button
                                                        key={sIdx}
                                                        type="button"
                                                        onClick={() => {
                                                            setSearchLogoQuery(sug);
                                                            handleSearchLogos(sug);
                                                        }}
                                                        className="text-[10px] px-2 py-0.5 rounded-md bg-white hover:bg-blue-50 border border-slate-200 text-slate-600"
                                                    >
                                                        {sug}
                                                    </button>
                                                ))}
                                            </div>

                                            {/* Search Results Grid */}
                                            <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
                                                {isSearchingLogos ? (
                                                    <div className="py-4 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
                                                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-600" />
                                                        <span>Mencari logo dan aset resmi...</span>
                                                    </div>
                                                ) : searchResults.length > 0 ? (
                                                    searchResults.map((item, rIdx) => {
                                                        const isSelected = result.cover_image === item.url;
                                                        return (
                                                            <div
                                                                key={rIdx}
                                                                onClick={() => setResult({ ...result, cover_image: item.url })}
                                                                className={`p-2 rounded-xl border flex items-center justify-between gap-2.5 transition-all cursor-pointer ${
                                                                    isSelected 
                                                                        ? 'bg-blue-50/80 border-blue-600 ring-2 ring-blue-500/20 shadow-2xs' 
                                                                        : 'bg-white hover:bg-slate-100/80 border-slate-200'
                                                                }`}
                                                            >
                                                                <div className="flex items-center space-x-2.5 min-w-0">
                                                                    <div className="w-10 h-10 rounded-lg bg-slate-900 overflow-hidden shrink-0 flex items-center justify-center p-1">
                                                                        <img 
                                                                            src={item.url} 
                                                                            alt={item.title} 
                                                                            className="w-full h-full object-contain"
                                                                        />
                                                                    </div>
                                                                    <div className="min-w-0">
                                                                        <div className="text-xs font-bold text-slate-800 truncate">
                                                                            {item.title}
                                                                        </div>
                                                                        <div className="text-[10px] text-slate-400 truncate">
                                                                            {item.source}
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="shrink-0">
                                                                    {isSelected ? (
                                                                        <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white text-[10px] font-bold flex items-center gap-0.5">
                                                                            <Check className="w-3 h-3" /> Dipakai
                                                                        </span>
                                                                    ) : (
                                                                        <span className="text-[10px] font-bold text-slate-500 hover:text-blue-600">
                                                                            Pilih
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                ) : (
                                                    <div className="py-3 text-center text-xs text-slate-400">
                                                        Ketik nama teknologi dan klik "Cari"
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Mode 3: Direct URL */}
                                    {thumbMode === 'url' && (
                                        <div className="space-y-2">
                                            <div className="text-[11px] font-semibold text-slate-600">
                                                Tempel Tautan Gambar / Logo:
                                            </div>
                                            <input
                                                type="url"
                                                value={manualImageUrl}
                                                onChange={(e) => setManualImageUrl(e.target.value)}
                                                placeholder="https://example.com/logo-hermes.png"
                                                className="w-full h-9 px-3 rounded-lg border border-slate-200 text-xs focus:border-blue-600 focus:outline-none bg-white"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (manualImageUrl.trim()) {
                                                        setResult({ ...result, cover_image: manualImageUrl.trim() });
                                                    }
                                                }}
                                                className="w-full h-8 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                                            >
                                                <Check className="w-3.5 h-3.5" />
                                                <span>Terapkan Gambar Ini</span>
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Tags */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                                        <Tag className="w-3.5 h-3.5 text-blue-600" /> Tag Topik Terkait:
                                    </label>
                                    <div className="flex flex-wrap gap-1.5">
                                        {result.tags?.map((t, idx) => (
                                            <span key={idx} className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/60">
                                                #{t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Key Takeaways Box */}
                                {result.key_takeaways?.length > 0 && (
                                    <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-[#0c1e3a] text-white space-y-2 shadow-xs">
                                        <div className="text-[11px] font-bold text-[#60A5FA] uppercase tracking-wider flex items-center gap-1.5">
                                            <Sparkles className="w-3.5 h-3.5" /> Poin Kunci & Kesimpulan:
                                        </div>
                                        <ul className="space-y-1.5">
                                            {result.key_takeaways.map((point, pIdx) => (
                                                <li key={pIdx} className="text-xs text-slate-300 flex items-start space-x-2">
                                                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                                    <span>{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* ──── RIGHT COLUMN: CONTENT & EDITOR (7 cols) ──── */}
                            <div className="lg:col-span-7 space-y-4">
                                
                                {/* Judul */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700">Judul Artikel</label>
                                    <input
                                        type="text"
                                        value={result.title}
                                        onChange={(e) => setResult({ ...result, title: e.target.value })}
                                        className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
                                    />
                                </div>

                                {/* Excerpt */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700">Ringkasan Pengantar (Excerpt)</label>
                                    <textarea
                                        rows="2"
                                        value={result.excerpt}
                                        onChange={(e) => setResult({ ...result, excerpt: e.target.value })}
                                        className="w-full p-3 rounded-xl border border-slate-200 text-xs text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
                                    />
                                </div>

                                {/* Content Tabs */}
                                {activeTab === 'preview' ? (
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                                            <span>Pratinjau Format Artikel (Markdown)</span>
                                            <span className="text-[11px] text-slate-400">Siap publikasi</span>
                                        </label>
                                        <div className="p-5 rounded-2xl border border-slate-200 bg-white max-h-[350px] overflow-y-auto text-xs leading-relaxed text-slate-700 prose prose-slate max-w-none">
                                            <ReactMarkdown
                                                components={{
                                                    h2: ({node, ...props}) => <h2 className="text-base font-bold text-slate-900 mt-4 mb-2 pb-1 border-b border-slate-100" {...props} />,
                                                    h3: ({node, ...props}) => <h3 className="text-sm font-bold text-slate-800 mt-3 mb-1.5" {...props} />,
                                                    p: ({node, ...props}) => <p className="mb-2.5 text-slate-600 leading-relaxed" {...props} />,
                                                    ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-2.5 space-y-1 text-slate-600" {...props} />,
                                                    ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-2.5 space-y-1 text-slate-600" {...props} />,
                                                    code: ({node, inline, className, children, ...props}) => {
                                                        if (inline) {
                                                            return <code className="px-1.5 py-0.5 rounded-md bg-slate-100 text-blue-600 font-mono text-[11px]" {...props}>{children}</code>;
                                                        }
                                                        return (
                                                            <div className="my-3 rounded-xl bg-slate-900 text-slate-200 p-3 font-mono text-[11px] overflow-x-auto border border-slate-800">
                                                                <code>{children}</code>
                                                            </div>
                                                        );
                                                    }
                                                }}
                                            >
                                                {result.content}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-700">Edit Mentah Konten (Markdown)</label>
                                        <textarea
                                            rows="14"
                                            value={result.content}
                                            onChange={(e) => setResult({ ...result, content: e.target.value })}
                                            className="w-full p-3.5 rounded-xl border border-slate-200 text-xs font-mono text-[#0F172A] focus:border-[#2563EB] focus:outline-none leading-relaxed"
                                        />
                                    </div>
                                )}

                            </div>

                        </div>

                        {/* ════════════════════════════════════════════════════════════
                            MODAL FOOTER ACTIONS
                           ════════════════════════════════════════════════════════════ */}
                        <div className="p-4 px-6 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center space-x-2">
                                <button
                                    type="button"
                                    onClick={handleApplyAndEdit}
                                    className="px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
                                    title="Pindahkan semua data ke form pembuatan manual"
                                >
                                    <Sliders className="w-3.5 h-3.5 text-slate-600" />
                                    <span>Terapkan ke Form Utama</span>
                                </button>
                            </div>

                            <div className="flex items-center space-x-2.5">
                                <button
                                    type="button"
                                    disabled={isSaving}
                                    onClick={() => handleSaveDirect('draft')}
                                    className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-bold transition-colors cursor-pointer disabled:opacity-50 flex items-center space-x-1.5"
                                >
                                    <Bookmark className="w-3.5 h-3.5 text-slate-500" />
                                    <span>Simpan sebagai Draft</span>
                                </button>

                                <button
                                    type="button"
                                    disabled={isSaving}
                                    onClick={() => handleSaveDirect('published')}
                                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all cursor-pointer disabled:opacity-50 flex items-center space-x-1.5"
                                >
                                    <Send className="w-3.5 h-3.5" />
                                    <span>Publikasikan Sekarang</span>
                                </button>
                            </div>
                        </div>

                    </div>
                )}
            </motion.div>
        </div>
    );
}
