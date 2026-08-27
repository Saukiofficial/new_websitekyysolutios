import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowRight, Eye, ShoppingCart } from 'lucide-react';
import Card from '@/Components/Shared/Card';
import Button from '@/Components/Shared/Button';
import { fadeInUp, staggerContainer, staggerItem } from '@/Lib/animations';
import { useLanguage } from '@/Context/LanguageContext';

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
        { rating: 4.9, reviews: 38, gradient: 'from-blue-600 to-indigo-700', previewIcon: '⚡', categoryKey: 'saasSystems' },
        { rating: 4.8, reviews: 24, gradient: 'from-slate-800 to-slate-900', previewIcon: '🛍️', categoryKey: 'sourceCode' },
        { rating: 4.9, reviews: 19, gradient: 'from-indigo-600 to-purple-700', previewIcon: '💳', categoryKey: 'mobileApps' },
        { rating: 5.0, reviews: 42, gradient: 'from-blue-500 to-cyan-600', previewIcon: '🎨', categoryKey: 'uiKits' },
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

                {/* Products Grid (4 cards on desktop) */}
                <motion.div 
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map((product) => (
                            <motion.div 
                                key={product.id} 
                                layout
                                variants={staggerItem}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.25 }}
                            >
                                <Card className="h-full flex flex-col justify-between overflow-hidden group bg-white border-slate-200/90 hover:border-blue-300 transition-all duration-200">
                                    <div>
                                        {/* Product Thumbnail / Preview Box */}
                                        <div className={`h-40 rounded-xl bg-gradient-to-br ${product.gradient} p-4 relative flex items-center justify-center overflow-hidden mb-4`}>
                                            <span className="text-4xl filter drop-shadow-md group-hover:scale-110 transition-transform duration-200">
                                                {product.previewIcon}
                                            </span>
                                            
                                            {/* Badge */}
                                            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[#14213D] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                                                {product.badge}
                                            </div>

                                            {/* Hover Quick View Overlay */}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                                                <button className="p-2 bg-white rounded-full text-slate-800 hover:text-[#2563EB] shadow-md transition-transform hover:scale-105">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 bg-[#2563EB] rounded-full text-white shadow-md transition-transform hover:scale-105">
                                                    <ShoppingCart className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Rating & Reviews */}
                                        <div className="flex items-center justify-between text-xs mb-2">
                                            <span className="text-[11px] font-semibold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded-md">
                                                {product.category}
                                            </span>
                                            <div className="flex items-center text-amber-500 font-bold">
                                                <Star className="w-3.5 h-3.5 fill-current mr-1" />
                                                <span>{product.rating}</span>
                                                <span className="text-slate-400 font-normal ml-1">({product.reviews})</span>
                                            </div>
                                        </div>

                                        {/* Title & Description */}
                                        <h3 className="font-bold text-[#14213D] text-base group-hover:text-[#2563EB] transition-colors line-clamp-1 mb-1">
                                            {product.title}
                                        </h3>
                                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                                            {product.description}
                                        </p>
                                    </div>

                                    {/* Price & CTA */}
                                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
                                        <div>
                                            <span className="text-[10px] text-slate-400 block uppercase font-semibold">{t.marketplace.priceLabel}</span>
                                            <span className="text-base font-extrabold text-[#14213D]">
                                                {product.price}
                                            </span>
                                        </div>
                                        <Button size="sm" variant="outline" className="text-xs px-3 py-1.5 h-8">
                                            <span>{t.marketplace.view}</span>
                                            <ArrowRight className="w-3 h-3 ml-1" />
                                        </Button>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Bottom CTA to Full Marketplace */}
                <div className="text-center mt-12">
                    <Button variant="outline" className="border-slate-300 hover:border-slate-400">
                        <span>{t.marketplace.viewAll}</span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>

            </div>
        </section>
    );
}
