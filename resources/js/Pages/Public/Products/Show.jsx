import { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent } from '@/Lib/analytics';
import { 
    Star, 
    ArrowRight, 
    Check, 
    ShieldCheck, 
    Download, 
    ExternalLink, 
    FileCode2, 
    CheckCircle2, 
    Layers, 
    Clock, 
    ShoppingCart, 
    HelpCircle, 
    Cpu, 
    Package, 
    Sparkles, 
    Store, 
    MessageSquare, 
    ChevronRight, 
    Calendar,
    ArrowLeft,
    Sliders
} from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import { useLanguage } from '@/Context/LanguageContext';
import { useContactModal } from '@/Context/ContactModalContext';

// Product Mockup Previews
const ProductMockupPreview = ({ productId }) => {
    switch (productId) {
        case 1:
            return (
                <div className="w-full bg-[#0F172A] rounded-2xl p-4 sm:p-6 text-white font-mono shadow-2xl border border-slate-800">
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 text-xs">
                        <div className="flex space-x-1.5">
                            <div className="w-3 h-3 rounded-full bg-rose-500" />
                            <div className="w-3 h-3 rounded-full bg-amber-500" />
                            <div className="w-3 h-3 rounded-full bg-emerald-500" />
                        </div>
                        <span className="text-slate-400 font-sans text-xs">tenant-acme.saas-platform.com/dashboard</span>
                        <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">Multi-Tenancy Active</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                            <span className="text-[10px] text-slate-400 block font-sans">Active Subscriptions</span>
                            <span className="text-base sm:text-lg font-black text-blue-400">1,248</span>
                        </div>
                        <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                            <span className="text-[10px] text-slate-400 block font-sans">Monthly Recurring</span>
                            <span className="text-base sm:text-lg font-black text-emerald-400">$34,850</span>
                        </div>
                        <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                            <span className="text-[10px] text-slate-400 block font-sans">Isolated DBs</span>
                            <span className="text-base sm:text-lg font-black text-purple-400">100% OK</span>
                        </div>
                    </div>
                    <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800 text-xs text-slate-300 font-sans space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="font-bold">Tenant Migration Worker</span>
                            <span className="text-emerald-400 text-[11px]">Completed (0.42s)</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-blue-500 h-1.5 rounded-full w-full" />
                        </div>
                    </div>
                </div>
            );
        case 2:
            return (
                <div className="w-full bg-[#0F172A] rounded-2xl p-4 sm:p-6 text-white font-mono shadow-2xl border border-slate-800">
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 text-xs">
                        <div className="flex space-x-1.5">
                            <div className="w-3 h-3 rounded-full bg-rose-500" />
                            <div className="w-3 h-3 rounded-full bg-amber-500" />
                            <div className="w-3 h-3 rounded-full bg-emerald-500" />
                        </div>
                        <span className="text-slate-400 font-sans text-xs">pos.store-terminal.id/cashier</span>
                        <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">Thermal USB Online</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                            <span className="text-[10px] text-slate-400 block font-sans">Today's Transactions</span>
                            <span className="text-base sm:text-lg font-black text-amber-400">314 Orders</span>
                        </div>
                        <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                            <span className="text-[10px] text-slate-400 block font-sans">Shift Gross Sales</span>
                            <span className="text-base sm:text-lg font-black text-emerald-400">Rp 18.450.000</span>
                        </div>
                    </div>
                    <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800 text-xs text-slate-300 font-sans flex items-center justify-between">
                        <span className="font-bold">Offline Queue Mode</span>
                        <span className="text-blue-400 text-[11px]">IndexedDB Synced (0 pending)</span>
                    </div>
                </div>
            );
        case 3:
            return (
                <div className="w-full bg-[#0F172A] rounded-2xl p-4 sm:p-6 text-white font-mono shadow-2xl border border-slate-800">
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 text-xs">
                        <div className="flex space-x-1.5">
                            <div className="w-3 h-3 rounded-full bg-rose-500" />
                            <div className="w-3 h-3 rounded-full bg-amber-500" />
                            <div className="w-3 h-3 rounded-full bg-emerald-500" />
                        </div>
                        <span className="text-slate-400 font-sans text-xs">Flutter 3.22 (iOS & Android)</span>
                        <span className="text-[10px] text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">60 FPS Impeller</span>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl mb-4 text-white font-sans">
                        <div className="flex justify-between items-center text-xs opacity-80 mb-2">
                            <span>Main Virtual Card</span>
                            <span>Visa Platinum</span>
                        </div>
                        <div className="text-xl font-bold tracking-widest mb-3">••••  ••••  ••••  9042</div>
                        <div className="flex justify-between text-xs">
                            <span>TOTAL BALANCE</span>
                            <span className="font-bold">Rp 84.920.000</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs font-sans">
                        <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-blue-400 font-bold">Transfer</div>
                        <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-emerald-400 font-bold">QR Pay</div>
                        <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-purple-400 font-bold">Analytics</div>
                    </div>
                </div>
            );
        default:
            return (
                <div className="w-full bg-[#0F172A] rounded-2xl p-4 sm:p-6 text-white font-mono shadow-2xl border border-slate-800">
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 text-xs">
                        <div className="flex space-x-1.5">
                            <div className="w-3 h-3 rounded-full bg-rose-500" />
                            <div className="w-3 h-3 rounded-full bg-amber-500" />
                            <div className="w-3 h-3 rounded-full bg-emerald-500" />
                        </div>
                        <span className="text-slate-400 font-sans text-xs">kyysolutions-source-preview.dev</span>
                        <span className="text-[10px] text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-500/30">Clean Architecture</span>
                    </div>
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
                        <div className="text-blue-400">// Ready to Deploy Source Code</div>
                        <div className="text-slate-300">git clone https://github.com/kyysolutions/repo.git</div>
                        <div className="text-slate-400">composer install && npm install && npm run build</div>
                        <div className="text-emerald-400 font-bold">✓ Application ready on http://localhost:8000</div>
                    </div>
                </div>
            );
    }
};

export default function ProductShow({ product, relatedProducts }) {
    const { lang } = useLanguage();
    const { openContact } = useContactModal();

    const [selectedLicense, setSelectedLicense] = useState('regular');
    const [activeTab, setActiveTab] = useState('overview');

    const isRegular = selectedLicense === 'regular';
    const currentPrice = isRegular ? product.regularPriceFormatted : product.extendedPriceFormatted;

    useEffect(() => {
        if (product?.id) {
            trackEvent('product_view', { productId: product.id, productTitle: product.title });
        }
    }, [product?.id]);

    const tabs = [
        { id: 'overview', label: lang === 'ID' ? 'Ikhtisar & Fitur' : 'Overview & Features' },
        { id: 'tech', label: lang === 'ID' ? 'Teknologi & Persyaratan' : 'Tech Stack & Specs' },
        { id: 'files', label: lang === 'ID' ? 'File Termasuk' : 'Files Included' },
        { id: 'changelog', label: lang === 'ID' ? 'Riwayat Versi (Changelog)' : 'Version Changelog' },
        { id: 'reviews', label: `${lang === 'ID' ? 'Ulasan Pembeli' : 'Customer Reviews'} (${product.reviewsCount})` },
    ];

    return (
        <PublicLayout>
            <Head>
                <title>{`${product.title} — KyySolutions Marketplace`}</title>
                <meta name="description" content={product.shortDescription} />
            </Head>

            <div className="bg-[#F8FAFC] min-h-screen py-8 lg:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Breadcrumbs */}
                    <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 mb-6">
                        <Link href="/" className="hover:text-[#2563EB] transition-colors">{lang === 'ID' ? 'Beranda' : 'Home'}</Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <Link href="/marketplace" className="hover:text-[#2563EB] transition-colors">{lang === 'ID' ? 'Marketplace' : 'Marketplace'}</Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span className="text-slate-600">{product.category}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span className="text-[#2563EB] font-bold truncate max-w-xs">{product.title}</span>
                    </div>

                    {/* Main Grid: Left Details & Right Sticky Purchase Sidebar */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
                        
                        {/* Left Column (8 cols): Title, Preview Window, Tabs */}
                        <div className="lg:col-span-8 space-y-6">
                            
                            {/* Product Header Card */}
                            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
                                
                                <div className="flex flex-wrap items-center gap-2 mb-3">
                                    <span className="text-xs font-bold text-[#2563EB] bg-blue-50 border border-blue-100 px-3 py-1 rounded-full uppercase tracking-wider">
                                        {product.category}
                                    </span>
                                    {product.badge && (
                                        <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                                            {product.badge}
                                        </span>
                                    )}
                                    <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                                        {product.version}
                                    </span>
                                </div>

                                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#14213D] tracking-tight mb-4 leading-snug">
                                    {product.title}
                                </h1>

                                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal mb-6">
                                    {product.shortDescription}
                                </p>

                                {/* Meta stats bar */}
                                <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-100 text-xs font-medium text-slate-600">
                                    <div className="flex items-center space-x-1.5">
                                        <div className="flex text-amber-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-current" />
                                            ))}
                                        </div>
                                        <span className="font-extrabold text-[#14213D]">{product.rating}</span>
                                        <span className="text-slate-400">({product.reviewsCount} {lang === 'ID' ? 'ulasan' : 'reviews'})</span>
                                    </div>

                                    <div className="flex items-center space-x-1.5">
                                        <ShoppingCart className="w-4 h-4 text-[#2563EB]" />
                                        <span className="font-bold text-[#14213D]">{product.salesCount}</span>
                                        <span className="text-slate-400">{lang === 'ID' ? 'terjual' : 'sales'}</span>
                                    </div>

                                    <div className="flex items-center space-x-1.5">
                                        <Calendar className="w-4 h-4 text-slate-400" />
                                        <span>{lang === 'ID' ? 'Pembaruan:' : 'Updated:'} {product.updatedAt}</span>
                                    </div>
                                </div>

                            </div>

                            {/* Realistic Mockup Preview Box */}
                            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                    <div>
                                        <span className="text-xs font-bold uppercase tracking-wider text-blue-400 block mb-1">
                                            {lang === 'ID' ? 'TAMPILAN UI & ARSITEKTUR SOFTWARE' : 'LIVE UI & ARCHITECTURE PREVIEW'}
                                        </span>
                                        <h3 className="text-lg font-bold text-white">
                                            {lang === 'ID' ? 'Cuplikan Sistem Siap Pakai' : 'Interactive System Preview'}
                                        </h3>
                                    </div>

                                    {product.demoUrl && (
                                        <a
                                            href={product.demoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-500/25 inline-flex items-center space-x-1.5 transition-all self-start sm:self-auto"
                                        >
                                            <span>{lang === 'ID' ? 'Buka Live Demo' : 'Open Live Demo'}</span>
                                            <ExternalLink className="w-3.5 h-3.5 ml-1" />
                                        </a>
                                    )}
                                </div>

                                <ProductMockupPreview productId={product.id} />
                            </div>

                            {/* Tab Controls */}
                            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
                                
                                <div className="flex overflow-x-auto border-b border-slate-200/90 bg-slate-50/70 p-1.5 gap-1">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                                                activeTab === tab.id
                                                    ? 'bg-white text-[#2563EB] shadow-xs'
                                                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                                            }`}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Tab Body Content */}
                                <div className="p-6 sm:p-8">
                                    
                                    {/* TAB 1: Overview & Features */}
                                    {activeTab === 'overview' && (
                                        <div className="space-y-6">
                                            <div>
                                                <h3 className="text-base font-extrabold text-[#14213D] mb-3">
                                                    {lang === 'ID' ? 'Deskripsi Lengkap Produk' : 'Full Product Description'}
                                                </h3>
                                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                                    {product.description}
                                                </p>
                                            </div>

                                            <div>
                                                <h3 className="text-base font-extrabold text-[#14213D] mb-4">
                                                    {lang === 'ID' ? 'Fitur-Fitur Utama' : 'Key Core Features'}
                                                </h3>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    {product.features?.map((feat, idx) => (
                                                        <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start space-x-3">
                                                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                                            <span className="text-xs text-slate-700 font-medium leading-relaxed">
                                                                {feat}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* TAB 2: Tech Stack & Requirements */}
                                    {activeTab === 'tech' && (
                                        <div className="space-y-6">
                                            <div>
                                                <h3 className="text-base font-extrabold text-[#14213D] mb-3">
                                                    {lang === 'ID' ? 'Tech Stack yang Digunakan' : 'Technologies & Frameworks'}
                                                </h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {product.techStack?.map((tech) => (
                                                        <span key={tech} className="px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-100 text-[#2563EB] text-xs font-bold">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="text-base font-extrabold text-[#14213D] mb-3">
                                                    {lang === 'ID' ? 'Persyaratan Sistem Server & Lingkungan' : 'System & Environment Requirements'}
                                                </h3>
                                                <ul className="space-y-2">
                                                    {product.requirements?.map((req, idx) => (
                                                        <li key={idx} className="flex items-center space-x-2 text-xs text-slate-700 font-medium">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                                                            <span>{req}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}

                                    {/* TAB 3: Files Included */}
                                    {activeTab === 'files' && (
                                        <div className="space-y-4">
                                            <h3 className="text-base font-extrabold text-[#14213D] mb-3">
                                                {lang === 'ID' ? 'File & Aset yang Anda Dapatkan' : 'Included Files & Assets in Package'}
                                            </h3>
                                            <div className="space-y-2.5">
                                                {product.filesIncluded?.map((file, idx) => (
                                                    <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center space-x-3">
                                                        <FileCode2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                                                        <span className="text-xs font-bold text-[#14213D]">{file}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* TAB 4: Changelog */}
                                    {activeTab === 'changelog' && (
                                        <div className="space-y-6">
                                            <h3 className="text-base font-extrabold text-[#14213D] mb-3">
                                                {lang === 'ID' ? 'Riwayat Pembaruan Versi' : 'Version Update History'}
                                            </h3>
                                            <div className="space-y-4">
                                                {product.changelog?.map((log, idx) => (
                                                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className="font-mono font-bold text-xs text-[#2563EB] bg-blue-100/70 px-2.5 py-0.5 rounded">
                                                                {log.version}
                                                            </span>
                                                            <span className="text-xs text-slate-400">{log.date}</span>
                                                        </div>
                                                        <ul className="space-y-1 mt-2">
                                                            {log.changes.map((ch, cIdx) => (
                                                                <li key={cIdx} className="text-xs text-slate-600 flex items-center space-x-2">
                                                                    <span className="text-emerald-500 font-bold">•</span>
                                                                    <span>{ch}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* TAB 5: Customer Reviews */}
                                    {activeTab === 'reviews' && (
                                        <div className="space-y-6">
                                            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                                                <div>
                                                    <div className="text-3xl font-black text-[#14213D] font-mono">{product.rating} / 5.0</div>
                                                    <div className="flex text-amber-400 mt-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} className="w-4 h-4 fill-current" />
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="text-xs text-slate-500 font-medium">
                                                    100% {lang === 'ID' ? 'Pembeli Terverifikasi' : 'Verified Buyers'}
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                {product.reviews && product.reviews.length > 0 ? (
                                                    product.reviews.map((rev, idx) => (
                                                        <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center space-x-2">
                                                                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                                                                        {rev.name.charAt(0)}
                                                                    </div>
                                                                    <div>
                                                                        <span className="font-bold text-xs text-[#14213D] block">{rev.name}</span>
                                                                        <span className="text-[10px] text-slate-400">{rev.role}</span>
                                                                    </div>
                                                                </div>
                                                                <span className="text-[10px] text-slate-400">{rev.date}</span>
                                                            </div>
                                                            <p className="text-xs text-slate-600 italic">"{rev.comment}"</p>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="text-xs text-slate-500 text-center py-6">{lang === 'ID' ? 'Belum ada ulasan untuk produk ini.' : 'No reviews yet for this product.'}</p>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                </div>

                            </div>

                            {/* Cross-Selling Banner (PRD Section 10) */}
                            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                <div className="space-y-2 max-w-lg">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-950/80 px-2.5 py-0.5 rounded border border-blue-500/30">
                                        {lang === 'ID' ? 'KUSTOMISASI & INTEGRASI KHUSUS' : 'CUSTOMIZATION & INTEGRATION SERVICE'}
                                    </span>
                                    <h4 className="text-lg font-bold text-white">
                                        {lang === 'ID' ? 'Perlu Custom Fitur untuk Source Code ini?' : 'Need Custom Features for this Software?'}
                                    </h4>
                                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                                        {lang === 'ID' 
                                            ? 'Tim software engineer senior KyySolutions siap membantu modifikasi, penambahan modul payment/API, atau setup server siap pakai.'
                                            : 'KyySolutions senior engineering team is ready to assist with custom feature builds, payment integration, or turnkey server deployment.'}
                                    </p>
                                </div>

                                <button
                                    onClick={openContact}
                                    className="px-6 py-3.5 rounded-xl bg-white hover:bg-blue-50 text-[#2563EB] text-xs font-extrabold shadow-md transition-all whitespace-nowrap cursor-pointer self-start sm:self-auto shrink-0 flex items-center space-x-1.5"
                                >
                                    <MessageSquare className="w-4 h-4" />
                                    <span>{lang === 'ID' ? 'Konsultasi Custom' : 'Request Custom Quote'}</span>
                                </button>
                            </div>

                        </div>

                        {/* Right Column (4 cols): Sticky Purchase Card & Seller Box */}
                        <div className="lg:col-span-4 sticky top-24 space-y-6">
                            
                            {/* License & Purchase Card */}
                            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
                                
                                <div>
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                                        {lang === 'ID' ? 'Harga Investasi Sekali Bayar' : 'One-time Investment Price'}
                                    </span>
                                    <div className="text-3xl font-black text-[#2563EB] font-mono">
                                        {currentPrice}
                                    </div>
                                </div>

                                {/* License Options Switcher */}
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-[#14213D] block">
                                        {lang === 'ID' ? 'Pilih Tipe Lisensi' : 'Select License Option'}
                                    </label>

                                    {/* Regular License */}
                                    <div
                                        onClick={() => setSelectedLicense('regular')}
                                        className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                                            isRegular ? 'border-[#2563EB] bg-blue-50/40 shadow-xs' : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                    >
                                        <div>
                                            <div className="text-xs font-bold text-[#14213D]">{lang === 'ID' ? 'Lisensi Reguler' : 'Regular License'}</div>
                                            <div className="text-[11px] text-slate-500">{lang === 'ID' ? '1 Proyek Komersial / Bisnis Sendiri' : '1 Commercial Project / Own Business'}</div>
                                        </div>
                                        <div className="font-mono font-bold text-xs text-slate-700">{product.regularPriceFormatted}</div>
                                    </div>

                                    {/* Extended License */}
                                    <div
                                        onClick={() => setSelectedLicense('extended')}
                                        className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                                            !isRegular ? 'border-[#2563EB] bg-blue-50/40 shadow-xs' : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                    >
                                        <div>
                                            <div className="text-xs font-bold text-[#14213D]">{lang === 'ID' ? 'Lisensi Extended (Agensi)' : 'Extended License (Agency)'}</div>
                                            <div className="text-[11px] text-slate-500">{lang === 'ID' ? 'Unlimited Klien & Modifikasi Penuh' : 'Unlimited Client Projects & Resale'}</div>
                                        </div>
                                        <div className="font-mono font-bold text-xs text-slate-700">{product.extendedPriceFormatted}</div>
                                    </div>
                                </div>

                                {/* Buy Now CTA Link to Checkout */}
                                <Link
                                    href={`/checkout/${product.id}`}
                                    onClick={() => trackEvent('cart_click', { productId: product.id, productTitle: product.title })}
                                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#2563EB] text-white text-sm font-extrabold shadow-lg shadow-blue-500/25 flex items-center justify-center space-x-2 transition-all duration-200 cursor-pointer"
                                >
                                    <ShoppingCart className="w-4 h-4" />
                                    <span>{lang === 'ID' ? 'Beli Sekarang' : 'Buy Now'}</span>
                                    <ArrowRight className="w-4 h-4 ml-1" />
                                </Link>

                                {/* Micro Trust Badges */}
                                <div className="pt-4 border-t border-slate-100 space-y-2 text-[11px] text-slate-500 font-medium">
                                    <div className="flex items-center space-x-2">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                        <span>{lang === 'ID' ? 'Akses Unduh Instan & Terverifikasi' : 'Instant Download & Verified Access'}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                        <span>{lang === 'ID' ? 'Gratis Pembaruan Versi Seumur Hidup' : 'Free Lifetime Version Updates'}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                        <span>{lang === 'ID' ? 'Dokumentasi & Panduan Setup Lengkap' : 'Full Documentation & Setup Guides'}</span>
                                    </div>
                                </div>

                            </div>

                            {/* Official Seller Card */}
                            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
                                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{lang === 'ID' ? 'Informasi Penjual' : 'Seller Profile'}</span>
                                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                        Official Verified
                                    </span>
                                </div>

                                <div className="flex items-center space-x-3.5">
                                    <div className={`w-11 h-11 rounded-2xl ${product.seller?.avatarBg || 'bg-blue-600'} text-white font-extrabold flex items-center justify-center text-sm shadow-2xs`}>
                                        KS
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-extrabold text-[#14213D]">{product.seller?.name || 'KyySolutions Official'}</h4>
                                        <div className="text-xs text-slate-400 font-medium">
                                            {product.seller?.totalProducts || 12} {lang === 'ID' ? 'Produk Digital' : 'Digital Products'} • Rating 5.0
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-2 text-xs text-slate-500 flex items-center justify-between">
                                    <span>{lang === 'ID' ? 'Waktu Respons:' : 'Avg Response Time:'}</span>
                                    <span className="font-bold text-[#14213D]">{product.seller?.responseTime || '< 15 Menit'}</span>
                                </div>
                            </div>

                        </div>

                    </div>

                    {/* Related Products Recommendations */}
                    {relatedProducts && relatedProducts.length > 0 && (
                        <div className="pt-12 border-t border-slate-200/80">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="text-xl sm:text-2xl font-black text-[#14213D] tracking-tight">
                                        {lang === 'ID' ? 'Produk Terkait Lainnya' : 'Related Digital Products'}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-slate-500">
                                        {lang === 'ID' ? 'Pilihan source code dan template populer lainnya.' : 'Other popular source codes and templates.'}
                                    </p>
                                </div>
                                <Link href="/marketplace" className="text-xs font-bold text-[#2563EB] hover:underline flex items-center">
                                    <span>{lang === 'ID' ? 'Lihat Semua' : 'View All'}</span>
                                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedProducts.map((p) => (
                                    <div key={p.id} className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-md hover:border-[#2563EB]/40 transition-all flex flex-col justify-between">
                                        <div>
                                            <span className="text-[10px] font-bold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded uppercase">
                                                {p.category}
                                            </span>
                                            <h4 className="text-sm font-extrabold text-[#14213D] mt-2 mb-1 line-clamp-1">
                                                {p.title}
                                            </h4>
                                            <p className="text-xs text-slate-500 line-clamp-2 mb-4">
                                                {p.shortDescription}
                                            </p>
                                        </div>

                                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                                            <span className="font-mono font-bold text-xs text-[#14213D]">{p.regularPriceFormatted}</span>
                                            <Link href={`/products/${p.slug}`} className="text-xs font-bold text-[#2563EB] hover:underline flex items-center">
                                                <span>{lang === 'ID' ? 'Detail' : 'View'}</span>
                                                <ArrowRight className="w-3 h-3 ml-1" />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </PublicLayout>
    );
}
