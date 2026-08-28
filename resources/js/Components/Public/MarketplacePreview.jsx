import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Star, 
    ArrowRight, 
    Eye, 
    ShoppingCart, 
    TrendingUp, 
    CreditCard, 
    Layers, 
    Check, 
    SlidersHorizontal,
    ShoppingBag
} from 'lucide-react';
import Card from '@/Components/Shared/Card';
import Button from '@/Components/Shared/Button';
import { fadeInUp, staggerContainer, staggerItem } from '@/Lib/animations';
import { useLanguage } from '@/Context/LanguageContext';

// Product 1: Realistic SaaS Dashboard Window Preview
const SaaSPreview = () => (
    <div className="w-full h-full bg-[#0F172A] p-3 text-white flex flex-col justify-between select-none relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
        {/* Top Window Bar */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[9px] text-slate-400">
            <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-red-500/80" />
                <div className="w-2 h-2 rounded-full bg-amber-500/80" />
                <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
            </div>
            <span className="font-mono text-[8px] bg-slate-800/80 px-2 py-0.5 rounded text-slate-300">app.kyy.io/saas</span>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-3 gap-1.5 pt-2">
            <div className="bg-slate-800/60 p-2 rounded-lg border border-slate-700/50">
                <span className="text-[8px] text-slate-400 block">MRR</span>
                <span className="text-[11px] font-bold text-white block">$42.8k</span>
                <span className="text-[7px] text-emerald-400 font-medium">▲ +24%</span>
            </div>
            <div className="bg-slate-800/60 p-2 rounded-lg border border-slate-700/50">
                <span className="text-[8px] text-slate-400 block">Users</span>
                <span className="text-[11px] font-bold text-white block">8,920</span>
                <span className="text-[7px] text-blue-400 font-medium">Active</span>
            </div>
            <div className="bg-slate-800/60 p-2 rounded-lg border border-slate-700/50">
                <span className="text-[8px] text-slate-400 block">Uptime</span>
                <span className="text-[11px] font-bold text-white block">99.9%</span>
                <span className="text-[7px] text-emerald-400 font-medium">Optimal</span>
            </div>
        </div>

        {/* Mini Chart Curve */}
        <div className="pt-2">
            <svg className="w-full h-8" viewBox="0 0 100 30" fill="none">
                <path d="M0 25 Q 25 10, 50 18 T 100 5 L 100 30 L 0 30 Z" fill="url(#saasGrad)" />
                <path d="M0 25 Q 25 10, 50 18 T 100 5" stroke="#3B82F6" strokeWidth="1.5" />
                <defs>
                    <linearGradient id="saasGrad" x1="0" y1="0" x2="0" y2="30" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#3B82F6" stopOpacity="0.4" />
                        <stop stopColor="#1E40AF" stopOpacity="0.0" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    </div>
);

// Product 2: E-Commerce & POS System Preview
const EcommercePreview = () => (
    <div className="w-full h-full bg-[#1E293B] p-3 text-white flex flex-col justify-between select-none relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
        {/* Top bar */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-700">
            <div className="flex items-center space-x-1.5">
                <div className="w-4 h-4 rounded bg-[#2563EB] flex items-center justify-center text-[8px] font-bold">
                    <ShoppingBag className="w-2.5 h-2.5" />
                </div>
                <span className="text-[10px] font-bold text-white">POS & Orders</span>
            </div>
            <span className="text-[8px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-medium">Live POS</span>
        </div>

        {/* Table Rows Preview */}
        <div className="space-y-1.5 pt-2 text-[9px]">
            <div className="flex items-center justify-between bg-slate-800/80 px-2 py-1 rounded border border-slate-700/60">
                <span className="font-semibold text-slate-200 truncate max-w-[100px]">Nike Air Jordan</span>
                <span className="text-emerald-400 font-mono font-bold">$189.00</span>
                <span className="text-[7px] bg-emerald-900/60 text-emerald-300 px-1 rounded">Paid</span>
            </div>
            <div className="flex items-center justify-between bg-slate-800/80 px-2 py-1 rounded border border-slate-700/60">
                <span className="font-semibold text-slate-200 truncate max-w-[100px]">MacBook Pro M3</span>
                <span className="text-emerald-400 font-mono font-bold">$1,999.00</span>
                <span className="text-[7px] bg-blue-900/60 text-blue-300 px-1 rounded">Processing</span>
            </div>
        </div>

        {/* Bottom Total Strip */}
        <div className="pt-2 flex items-center justify-between text-[9px] text-slate-400 border-t border-slate-800 mt-1">
            <span>Today's Sales</span>
            <span className="text-white font-bold font-mono">$8,450.00</span>
        </div>
    </div>
);

// Product 3: Fintech Mobile App Card Preview
const FintechPreview = () => (
    <div className="w-full h-full bg-gradient-to-br from-[#1E1B4B] to-[#312E81] p-3 text-white flex flex-col justify-between select-none relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
        {/* Smartphone Status Bar */}
        <div className="flex items-center justify-between text-[8px] text-indigo-300 pb-1">
            <span>9:41</span>
            <div className="flex items-center space-x-1">
                <span>5G</span>
                <span>100%</span>
            </div>
        </div>

        {/* Mini Virtual Debit Card */}
        <div className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] rounded-xl p-2.5 shadow-md border border-white/20 relative overflow-hidden">
            <div className="flex justify-between items-center text-[8px] opacity-80 mb-1.5">
                <span>KyyPay Platinum</span>
                <span className="font-bold">VISA</span>
            </div>
            <div className="text-[12px] font-extrabold tracking-tight mb-1 font-mono">
                $12,450.80
            </div>
            <div className="text-[7px] font-mono opacity-70">
                •••• 8842  |  08/28
            </div>
        </div>

        {/* Quick Action Pills */}
        <div className="grid grid-cols-3 gap-1 pt-1.5 text-center text-[8px]">
            <div className="bg-white/10 rounded py-1 hover:bg-white/20 transition-colors font-medium">Send</div>
            <div className="bg-white/10 rounded py-1 hover:bg-white/20 transition-colors font-medium">Request</div>
            <div className="bg-white/10 rounded py-1 hover:bg-white/20 transition-colors font-medium">QR Pay</div>
        </div>
    </div>
);

// Product 4: Design System & UI Kit Preview
const UIComponentsPreview = () => (
    <div className="w-full h-full bg-[#0F172A] p-3 text-white flex flex-col justify-between select-none relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
        {/* UI Kit Header */}
        <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
            <span className="text-[9px] font-bold text-slate-300">Component Matrix</span>
            <span className="text-[8px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded font-mono">200+ Blocks</span>
        </div>

        {/* Floating Interactive UI Components */}
        <div className="space-y-1.5 pt-1">
            {/* Button Preview Variants */}
            <div className="flex items-center space-x-1.5">
                <div className="bg-[#2563EB] text-white text-[8px] font-bold px-2 py-1 rounded-md shadow-xs flex items-center">
                    <span>Button</span>
                    <ArrowRight className="w-2 h-2 ml-1" />
                </div>
                <div className="bg-slate-800 border border-slate-700 text-slate-300 text-[8px] font-medium px-2 py-1 rounded-md">
                    Secondary
                </div>
                <div className="border border-blue-400/40 text-blue-300 text-[8px] font-medium px-2 py-1 rounded-md">
                    Outline
                </div>
            </div>

            {/* Color Palette Swatches & Toggle */}
            <div className="flex items-center justify-between pt-1">
                <div className="flex items-center space-x-1">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#2563EB] border border-white/20" />
                    <div className="w-3.5 h-3.5 rounded-full bg-[#3B82F6] border border-white/20" />
                    <div className="w-3.5 h-3.5 rounded-full bg-[#60A5FA] border border-white/20" />
                    <div className="w-3.5 h-3.5 rounded-full bg-[#10B981] border border-white/20" />
                    <div className="w-3.5 h-3.5 rounded-full bg-[#F59E0B] border border-white/20" />
                </div>
                <div className="w-6 h-3.5 bg-[#2563EB] rounded-full p-0.5 flex items-center justify-end">
                    <div className="w-2.5 h-2.5 rounded-full bg-white shadow-xs" />
                </div>
            </div>
        </div>

        {/* Badges footer */}
        <div className="pt-1.5 flex items-center justify-between text-[8px] text-slate-400 border-t border-slate-800 mt-1">
            <span>Dark & Light Tokens</span>
            <span className="text-emerald-400 font-bold">Figma & React</span>
        </div>
    </div>
);

export default function MarketplacePreview() {
    const { t } = useLanguage();
    const [activeCategoryKey, setActiveCategoryKey] = useState('all');

    const categoryKeys = [
        { key: 'all', label: t.marketplace.categories.all },
        { key: 'sourceCode', label: t.marketplace.categories.sourceCode },
        { key: 'templates', label: t.marketplace.categories.templates },
        { key: 'mobileApps', label: t.marketplace.categories.mobileApps },
        { key: 'uiKits', label: t.marketplace.categories.uiKits },
        { key: 'plugins', label: t.marketplace.categories.plugins },
        { key: 'saasSystems', label: t.marketplace.categories.saasSystems }
    ];

    const productVisuals = [
        { 
            rating: 4.9, 
            reviews: 38, 
            previewComponent: SaaSPreview, 
            categoryKey: 'saasSystems',
            techBadges: ['Laravel 13', 'React 19', 'Inertia', 'Stripe']
        },
        { 
            rating: 4.8, 
            reviews: 24, 
            previewComponent: EcommercePreview, 
            categoryKey: 'sourceCode',
            techBadges: ['Laravel', 'React', 'Tailwind', 'MySQL']
        },
        { 
            rating: 4.9, 
            reviews: 19, 
            previewComponent: FintechPreview, 
            categoryKey: 'mobileApps',
            techBadges: ['Flutter 3', 'Node.js', 'PostgreSQL']
        },
        { 
            rating: 5.0, 
            reviews: 42, 
            previewComponent: UIComponentsPreview, 
            categoryKey: 'uiKits',
            techBadges: ['Figma', 'Tailwind', 'React 19']
        },
    ];

    const products = t.marketplace.products.map((prod, index) => ({
        ...prod,
        ...productVisuals[index],
    }));

    const filteredProducts = activeCategoryKey === 'all' 
        ? products 
        : products.filter(p => p.categoryKey === activeCategoryKey);

    return (
        <section id="marketplace" className="py-20 lg:py-28 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <motion.div 
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center max-w-3xl mx-auto mb-12"
                >
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#2563EB] text-xs font-semibold uppercase tracking-wider mb-4">
                        <span>{t.marketplace.badge}</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14213D] tracking-tight mb-4">
                        {t.marketplace.title}
                    </h2>
                    <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
                        {t.marketplace.subtitle}
                    </p>
                </motion.div>

                {/* Category Pills Filter */}
                <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
                    {categoryKeys.map((cat) => {
                        const isActive = activeCategoryKey === cat.key;
                        return (
                            <button
                                key={cat.key}
                                onClick={() => setActiveCategoryKey(cat.key)}
                                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer ${
                                    isActive
                                        ? 'bg-[#2563EB] text-white shadow-sm shadow-blue-500/25'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                                }`}
                            >
                                {cat.label}
                            </button>
                        );
                    })}
                </div>

                {/* Products Grid (4 high-end commercial cards) */}
                <motion.div 
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map((product) => {
                            const PreviewComponent = product.previewComponent;
                            return (
                                <motion.div 
                                    key={product.id} 
                                    layout
                                    variants={staggerItem}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <div className="h-full flex flex-col justify-between rounded-[20px] bg-white border border-slate-200/85 hover:border-[#2563EB]/50 shadow-[0_4px_20px_rgba(20,33,61,0.04)] hover:shadow-[0_14px_35px_rgba(37,99,235,0.12)] hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
                                        
                                        <div>
                                            {/* Realistic UI Mockup Header Box */}
                                            <div className="h-44 w-full relative overflow-hidden bg-slate-900 border-b border-slate-100">
                                                {PreviewComponent && <PreviewComponent />}

                                                {/* Official Badge Pill */}
                                                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-[#14213D] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-md border border-slate-100">
                                                    {product.badge}
                                                </div>

                                                {/* Hover Quick View Overlay Action */}
                                                <div className="absolute inset-0 bg-[#0F172A]/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2.5">
                                                    <button className="px-3.5 py-1.5 bg-white text-[#14213D] text-xs font-bold rounded-xl shadow-lg hover:bg-slate-50 transition-transform hover:scale-105 inline-flex items-center">
                                                        <Eye className="w-3.5 h-3.5 mr-1 text-[#2563EB]" />
                                                        <span>Preview</span>
                                                    </button>
                                                    <button className="p-2 bg-[#2563EB] text-white rounded-xl shadow-lg hover:bg-[#1D4ED8] transition-transform hover:scale-105">
                                                        <ShoppingCart className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Card Content Area */}
                                            <div className="p-5">
                                                {/* Category & Rating */}
                                                <div className="flex items-center justify-between text-xs mb-2.5">
                                                    <span className="text-[11px] font-bold text-[#2563EB] bg-blue-50 px-2.5 py-0.5 rounded-md">
                                                        {product.category}
                                                    </span>
                                                    <div className="flex items-center text-amber-500 font-bold text-xs">
                                                        <Star className="w-3.5 h-3.5 fill-current mr-1 text-amber-400" />
                                                        <span>{product.rating}</span>
                                                        <span className="text-slate-400 font-normal ml-1">({product.reviews})</span>
                                                    </div>
                                                </div>

                                                {/* Title */}
                                                <h3 className="font-extrabold text-[#14213D] text-base group-hover:text-[#2563EB] transition-colors line-clamp-1 mb-1.5">
                                                    {product.title}
                                                </h3>

                                                {/* Description */}
                                                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4 font-normal">
                                                    {product.description}
                                                </p>

                                                {/* Tech Stack Pills */}
                                                <div className="flex flex-wrap gap-1 mb-2">
                                                    {product.techBadges?.map((badge) => (
                                                        <span key={badge} className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                                                            {badge}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Card Footer: Price & View CTA */}
                                        <div className="px-5 py-4 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between">
                                            <div>
                                                <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">{t.marketplace.priceLabel}</span>
                                                <span className="text-base font-black text-[#14213D]">
                                                    {product.price}
                                                </span>
                                            </div>
                                            <Link 
                                                href="/marketplace"
                                                className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-[#2563EB] hover:bg-[#2563EB] hover:text-white text-[#14213D] text-xs font-bold shadow-xs transition-all duration-150 inline-flex items-center group/btn cursor-pointer"
                                            >
                                                <span>{t.marketplace.view}</span>
                                                <ArrowRight className="w-3 h-3 ml-1 group-hover/btn:translate-x-0.5 transition-transform" />
                                            </Link>
                                        </div>

                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                {/* Bottom CTA to Full Marketplace */}
                <div className="text-center mt-14">
                    <Link href="/marketplace">
                        <Button variant="outline" className="border-slate-300 hover:border-[#2563EB] hover:text-[#2563EB] font-bold text-sm px-6 py-3 rounded-xl shadow-xs">
                            <span>{t.marketplace.viewAll}</span>
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </div>

            </div>
        </section>
    );
}
