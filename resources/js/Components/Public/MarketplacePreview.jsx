import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowRight, Eye, ShoppingCart, Check, Tag } from 'lucide-react';
import Card from '@/Components/Shared/Card';
import Button from '@/Components/Shared/Button';
import { fadeInUp, staggerContainer, staggerItem } from '@/Lib/animations';

export default function MarketplacePreview() {
    const categories = [
        'All Products',
        'Source Code',
        'Templates',
        'Mobile Apps',
        'UI Kits',
        'Plugins',
        'SaaS Systems'
    ];

    const [activeCategory, setActiveCategory] = useState('All Products');

    const products = [
        {
            id: 1,
            title: 'SaaS Multi-Tenant Boilerplate',
            category: 'SaaS Systems',
            tech: 'Laravel 13 • React 19 • Inertia',
            description: 'Production-ready starter with multi-tenancy, Stripe billing, auth & teams.',
            price: 'Rp 650.000',
            rating: 4.9,
            reviews: 38,
            badge: 'Best Seller',
            gradient: 'from-blue-600 to-indigo-700',
            previewIcon: '⚡'
        },
        {
            id: 2,
            title: 'E-Commerce Admin & POS Kit',
            category: 'Source Code',
            tech: 'Laravel • Vue / React • Tailwind',
            description: 'Complete e-commerce backend with live inventory, invoice & payment gate.',
            price: 'Rp 450.000',
            rating: 4.8,
            reviews: 24,
            badge: 'Featured',
            gradient: 'from-slate-800 to-slate-900',
            previewIcon: '🛍️'
        },
        {
            id: 3,
            title: 'Fintech Mobile Banking App',
            category: 'Mobile Apps',
            tech: 'Flutter • Node.js • PostgreSQL',
            description: 'Cross-platform mobile wallet template with QR payments & transaction feed.',
            price: 'Rp 550.000',
            rating: 4.9,
            reviews: 19,
            badge: 'Popular',
            gradient: 'from-indigo-600 to-purple-700',
            previewIcon: '💳'
        },
        {
            id: 4,
            title: 'Design System & UI Component Kit',
            category: 'UI Kits',
            tech: 'Figma • Tailwind CSS • React',
            description: 'Over 200+ accessible components, dark mode tokens & responsive blocks.',
            price: 'Rp 350.000',
            rating: 5.0,
            reviews: 42,
            badge: 'Top Rated',
            gradient: 'from-blue-700 to-cyan-700',
            previewIcon: '🎨'
        },
    ];

    const filteredProducts = activeCategory === 'All Products'
        ? products
        : products.filter(p => p.category === activeCategory);

    return (
        <section id="marketplace" className="py-20 md:py-28 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header (Section 13) */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={staggerContainer}
                    className="text-center max-w-3xl mx-auto mb-12"
                >
                    <motion.div variants={fadeInUp} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] text-xs font-semibold uppercase tracking-wider mb-3">
                        Ready-to-Deploy
                    </motion.div>
                    <motion.h2
                        variants={fadeInUp}
                        className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#0F172A] tracking-tight leading-tight mb-4"
                    >
                        Digital Products Marketplace
                    </motion.h2>
                    <motion.p
                        variants={fadeInUp}
                        className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed"
                    >
                        Ready-made digital solutions to accelerate your project.
                    </motion.p>
                </motion.div>

                {/* Category Filters Pills (Section 13) */}
                <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer ${
                                activeCategory === cat
                                    ? 'bg-[#2563EB] text-white shadow-sm'
                                    : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* 4-Column Product Cards Grid (Section 13 & 14) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="h-full"
                            >
                                <Card className="p-0 h-full flex flex-col justify-between group bg-white border border-slate-200/90 rounded-xl overflow-hidden hover:border-[#2563EB]/40">
                                    {/* Thumbnail Preview Banner */}
                                    <div className={`relative h-44 bg-gradient-to-br ${product.gradient} p-4 flex flex-col justify-between overflow-hidden`}>
                                        {/* Subtle pattern background */}
                                        <div className="absolute inset-0 bg-dot-dark opacity-20 pointer-events-none" />
                                        
                                        {/* Top Badge & Category */}
                                        <div className="relative z-10 flex items-center justify-between">
                                            <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-sm text-[11px] font-bold text-[#0F172A] shadow-xs">
                                                {product.category}
                                            </span>
                                            <span className="px-2.5 py-1 rounded-md bg-blue-500/80 text-white text-[10px] font-semibold tracking-wide uppercase backdrop-blur-sm">
                                                {product.badge}
                                            </span>
                                        </div>

                                        {/* Center Abstract Graphic / Mock Display */}
                                        <div className="relative z-10 my-auto text-center">
                                            <span className="text-3xl filter drop-shadow-md block mb-1">
                                                {product.previewIcon}
                                            </span>
                                            <div className="inline-block px-3 py-1 rounded-md bg-black/30 backdrop-blur-xs text-[11px] font-mono text-white/90 border border-white/10">
                                                {product.tech}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Product Details (Section 14) */}
                                    <div className="p-5 flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center text-amber-400">
                                                    <Star className="w-3.5 h-3.5 fill-current" />
                                                    <span className="text-xs font-bold text-slate-800 ml-1">{product.rating}</span>
                                                    <span className="text-[11px] text-slate-400 ml-0.5">({product.reviews})</span>
                                                </div>
                                            </div>

                                            <h3 className="text-base font-bold text-[#0F172A] mb-1.5 group-hover:text-[#2563EB] transition-colors line-clamp-1">
                                                {product.title}
                                            </h3>

                                            <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2">
                                                {product.description}
                                            </p>
                                        </div>

                                        {/* Price & Action Row */}
                                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                                            <div>
                                                <span className="text-[10px] text-slate-400 block leading-none mb-0.5">Price</span>
                                                <span className="text-base font-bold text-[#0F172A]">{product.price}</span>
                                            </div>
                                            <a href="#cta">
                                                <Button variant="primary" size="sm" className="px-3.5 py-1.5 text-xs">
                                                    <span>View</span>
                                                    <ArrowRight className="w-3 h-3 ml-1" />
                                                </Button>
                                            </a>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Bottom Explorer Action */}
                <div className="text-center mt-12">
                    <a href="#cta">
                        <Button variant="secondary" size="md" className="group">
                            <span>View All Marketplace Products</span>
                            <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </a>
                </div>

            </div>
        </section>
    );
}
