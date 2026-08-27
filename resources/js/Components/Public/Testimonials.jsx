import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Card from '@/Components/Shared/Card';
import { fadeInUp } from '@/Lib/animations';
import { useLanguage } from '@/Context/LanguageContext';

export default function Testimonials() {
    const { t } = useLanguage();

    const avatarStyles = [
        { avatarBg: 'bg-blue-600', initials: 'AF', rating: 5 },
        { avatarBg: 'bg-indigo-600', initials: 'SJ', rating: 5 },
        { avatarBg: 'bg-slate-800', initials: 'MT', rating: 5 },
    ];

    const testimonials = t.testimonials.items.map((item, index) => ({
        ...item,
        ...avatarStyles[index],
    }));

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    const current = testimonials[currentIndex] || testimonials[0];

    const clientLogos = [
        'TECHVISION',
        'NEXA GLOBAL',
        'SCALEUP',
        'HYPERION',
        'CLOUDSTACK',
        'APEX LABS'
    ];

    return (
        <section className="py-20 lg:py-28 bg-[#F8FAFC] border-y border-slate-100 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#2563EB] text-xs font-semibold uppercase tracking-wider mb-4">
                        <span>{t.testimonials.badge}</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14213D] tracking-tight mb-4">
                        {t.testimonials.title}
                    </h2>
                    <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
                        {t.testimonials.subtitle}
                    </p>
                </motion.div>

                {/* Testimonial Slider Card */}
                <div className="max-w-4xl mx-auto mb-16">
                    <Card className="p-8 sm:p-12 relative bg-white border-slate-200/80 shadow-soft">
                        <Quote className="w-12 h-12 text-blue-100 absolute top-8 right-8 pointer-events-none" />
                        
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="relative z-10"
                            >
                                {/* Rating Stars */}
                                <div className="flex items-center space-x-1 text-amber-400 mb-6">
                                    {[...Array(current.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-current" />
                                    ))}
                                </div>

                                {/* Quote Content */}
                                <blockquote className="text-lg sm:text-xl md:text-2xl text-[#14213D] font-medium leading-relaxed mb-8">
                                    "{current.quote}"
                                </blockquote>

                                {/* Client Info */}
                                <div className="flex items-center space-x-4">
                                    <div className={`w-12 h-12 rounded-full ${current.avatarBg} text-white font-bold flex items-center justify-center text-sm shadow-xs`}>
                                        {current.initials}
                                    </div>
                                    <div>
                                        <div className="font-bold text-[#14213D] text-base">
                                            {current.name}
                                        </div>
                                        <div className="text-xs sm:text-sm text-slate-500 font-normal">
                                            {current.role}, <span className="text-[#2563EB] font-medium">{current.company}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-end space-x-2 pt-6 sm:pt-0 sm:absolute sm:bottom-12 sm:right-12">
                            <button
                                onClick={prevSlide}
                                className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-[#14213D] flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                                aria-label="Previous testimonial"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-[#14213D] flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                                aria-label="Next testimonial"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </Card>
                </div>

                {/* Logos / Client Strip */}
                <div className="pt-8 border-t border-slate-200/80">
                    <p className="text-center text-xs uppercase tracking-widest text-slate-400 font-bold mb-6">
                        {t.testimonials.trustedBy}
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-60">
                        {clientLogos.map((logo) => (
                            <span key={logo} className="font-black text-slate-400 tracking-wider text-sm sm:text-base font-mono">
                                {logo}
                            </span>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
