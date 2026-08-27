import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag, MessageSquare, CheckCircle2 } from 'lucide-react';
import Button from '@/Components/Shared/Button';
import { fadeInUp, staggerContainer, staggerItem } from '@/Lib/animations';

export default function CTASection() {
    return (
        <section id="cta" className="py-20 md:py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Gradient Banner Container (Section 21) */}
                <div className="relative rounded-3xl bg-gradient-to-r from-[#2563EB] via-[#1D4ED8] to-[#4F46E5] text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-xl">
                    
                    {/* Subtle decorative dot/glow pattern (Section 21) */}
                    <div className="absolute inset-0 bg-dot-dark opacity-15 pointer-events-none" />
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 max-w-3xl mx-auto text-center">
                        
                        {/* Heading */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-tight mb-4"
                        >
                            Ready to Start Your Project?
                        </motion.h2>

                        {/* Subhead */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-base sm:text-lg text-blue-100 font-normal leading-relaxed mb-8 max-w-2xl mx-auto"
                        >
                            Whether you need a custom development solution or a ready-made product, we're here to help you succeed.
                        </motion.p>

                        {/* CTA Buttons (Section 21) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
                        >
                            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                                <button className="w-full sm:w-auto px-7 py-3.5 rounded-[10px] bg-white text-[#2563EB] font-bold text-sm hover:bg-blue-50 shadow-md transition-all duration-150 inline-flex items-center justify-center group cursor-pointer">
                                    <MessageSquare className="w-4 h-4 mr-2" />
                                    <span>Request a Quote</span>
                                    <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </a>
                            
                            <a href="#marketplace" className="w-full sm:w-auto">
                                <button className="w-full sm:w-auto px-7 py-3.5 rounded-[10px] bg-transparent text-white border border-white/40 hover:bg-white/10 font-semibold text-sm transition-all duration-150 inline-flex items-center justify-center group cursor-pointer">
                                    <ShoppingBag className="w-4 h-4 mr-2 text-blue-200" />
                                    <span>Browse Marketplace</span>
                                </button>
                            </a>
                        </motion.div>

                        {/* Micro Trust Points */}
                        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-blue-100 font-medium">
                            <span className="flex items-center">
                                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-blue-300" /> Free Consultation
                            </span>
                            <span className="flex items-center">
                                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-blue-300" /> NDA Protected
                            </span>
                            <span className="flex items-center">
                                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-blue-300" /> 100% Satisfaction Guarantee
                            </span>
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}
