import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from 'lucide-react';
import Card from '@/Components/Shared/Card';
import { fadeInUp } from '@/Lib/animations';
import { useLanguage } from '@/Context/LanguageContext';

export default function Testimonials() {
    const { t, lang } = useLanguage();

    const avatarStyles = [
        { avatarBg: 'bg-blue-600', initials: 'AF', rating: 5, project: 'E-Commerce Platform' },
        { avatarBg: 'bg-indigo-600', initials: 'SJ', rating: 5, project: 'Telemedicine Web App' },
        { avatarBg: 'bg-slate-800', initials: 'MT', rating: 5, project: 'Cloud POS & KDS' },
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
        'SCALEUP MEDIA',
        'HYPERION LABS',
        'CLOUDSTACK',
        'APEX LOGISTICS',
        'MEDIXCARE',
        'VENTUREFLOW'
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
                <div className="max-w-4xl mx-auto mb-20">
                    <div className="rounded-3xl bg-white border border-slate-200/90 shadow-[0_10px_30px_rgba(20,33,61,0.05)] p-8 sm:p-12 relative overflow-hidden">
                        <Quote className="w-14 h-14 text-blue-50 absolute top-6 right-6 pointer-events-none" />
                        
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.25 }}
                                className="relative z-10"
                            >
                                {/* Rating Stars & Verified Badge */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center space-x-1 text-amber-400">
                                        {[...Array(current.rating)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-current" />
                                        ))}
                                    </div>
                                    <span className="inline-flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                                        <span>Verified Client</span>
                                    </span>
                                </div>

                                {/* Quote Content */}
                                <blockquote className="text-lg sm:text-xl md:text-2xl text-[#14213D] font-medium leading-relaxed mb-8">
                                    "{current.quote}"
                                </blockquote>

                                {/* Client Info & Slider Navigation */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-100">
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-13 h-13 rounded-2xl ${current.avatarBg} text-white font-black flex items-center justify-center text-base shadow-sm`}>
                                            {current.initials}
                                        </div>
                                        <div>
                                            <div className="font-extrabold text-[#14213D] text-base">
                                                {current.name}
                                            </div>
                                            <div className="text-xs text-slate-500 font-medium">
                                                {current.role}, <span className="text-[#2563EB] font-bold">{current.company}</span>
                                            </div>
                                            <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                                                Project: {current.project}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Slider Controls */}
                                    <div className="flex items-center space-x-2 self-end sm:self-auto">
                                        <button
                                            onClick={prevSlide}
                                            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-[#2563EB] hover:text-white text-slate-600 flex items-center justify-center transition-all duration-150 shadow-2xs cursor-pointer"
                                            aria-label="Previous Testimonial"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <div className="text-xs font-bold text-slate-400 px-2 font-mono">
                                            0{currentIndex + 1} / 0{testimonials.length}
                                        </div>
                                        <button
                                            onClick={nextSlide}
                                            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-[#2563EB] hover:text-white text-slate-600 flex items-center justify-center transition-all duration-150 shadow-2xs cursor-pointer"
                                            aria-label="Next Testimonial"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Infinite Auto-Scrolling Logo Marquee Track */}
                <div className="pt-10 border-t border-slate-200/80">
                    <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
                        {lang === 'ID' ? 'Dipercaya oleh Tim & Bisnis Berkembang' : 'Trusted by Fast-Growing Companies'}
                    </p>
                    
                    {/* Marquee viewport with gradient mask on left and right */}
                    <div className="relative overflow-hidden w-full py-2 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                        <motion.div 
                            className="flex items-center space-x-8 sm:space-x-12 w-max"
                            animate={{ x: ['0%', '-50%'] }}
                            transition={{
                                duration: 22,
                                repeat: Infinity,
                                ease: 'linear'
                            }}
                        >
                            {/* Duplicate list 3 times for completely seamless infinite running ticker */}
                            {[...clientLogos, ...clientLogos, ...clientLogos].map((logo, idx) => (
                                <div 
                                    key={idx} 
                                    className="flex items-center space-x-2.5 px-4 py-2 rounded-xl bg-white border border-slate-200/85 shadow-2xs group hover:border-[#2563EB]/40 transition-colors shrink-0"
                                >
                                    <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                                    <span className="font-mono font-extrabold text-xs sm:text-sm text-slate-600 tracking-wider group-hover:text-[#2563EB] transition-colors whitespace-nowrap">
                                        {logo}
                                    </span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

            </div>
        </section>
    );
}
