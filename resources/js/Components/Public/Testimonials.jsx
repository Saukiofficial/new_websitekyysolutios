import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Card from '@/Components/Shared/Card';
import { fadeInUp, staggerContainer } from '@/Lib/animations';

export default function Testimonials() {
    const testimonials = [
        {
            name: 'Ahmad Fauzi',
            role: 'CEO',
            company: 'TechVision Indonesia',
            rating: 5,
            quote: 'KyySolutions delivered our enterprise web application on time with exceptional quality. Their engineering team is professional, highly reliable, and very easy to communicate with.',
            avatarBg: 'bg-blue-600',
            initials: 'AF'
        },
        {
            name: 'Sarah Jenkins',
            role: 'Product Director',
            company: 'Nexa Global Solutions',
            rating: 5,
            quote: 'The ready-made SaaS template from KyySolutions saved us over 4 months of engineering time. The codebase is clean, well-architected, and documentation is thorough.',
            avatarBg: 'bg-indigo-600',
            initials: 'SJ'
        },
        {
            name: 'Michael Tan',
            role: 'Co-Founder & CTO',
            company: 'ScaleUp Commerce',
            rating: 5,
            quote: 'From UI/UX wireframes to final production deployment, their execution was flawless. Our platform has handled over 100k daily transactions without a hitch.',
            avatarBg: 'bg-slate-800',
            initials: 'MT'
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    const current = testimonials[currentIndex];

    // Grayscale Client / Partner Logos (Section 20)
    const clientLogos = [
        'TECHVISION',
        'NEXA GLOBAL',
        'SCALEUP',
        'HYPERION',
        'CLOUDSTACK',
        'APEX LABS'
    ];

    return (
        <section className="py-20 md:py-28 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header (Section 19) */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={staggerContainer}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <motion.div variants={fadeInUp} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] text-xs font-semibold uppercase tracking-wider mb-3">
                        Client Testimonials
                    </motion.div>
                    <motion.h2
                        variants={fadeInUp}
                        className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#0F172A] tracking-tight leading-tight mb-4"
                    >
                        What Our Clients Say
                    </motion.h2>
                    <motion.p
                        variants={fadeInUp}
                        className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed"
                    >
                        Don't just take our word for it — hear from our satisfied clients.
                    </motion.p>
                </motion.div>

                {/* Centered Narrow Testimonial Card (Section 19) */}
                <div className="max-w-2xl mx-auto mb-20">
                    <Card className="p-8 sm:p-10 text-center bg-white border border-slate-200/90 rounded-2xl shadow-soft relative">
                        <Quote className="w-10 h-10 text-blue-100 absolute top-6 left-6 -scale-x-100 pointer-events-none" />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.25 }}
                                className="relative z-10"
                            >
                                {/* 5-Star Rating */}
                                <div className="flex items-center justify-center text-amber-400 gap-1 mb-6">
                                    {[...Array(current.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-current" />
                                    ))}
                                </div>

                                {/* Quote */}
                                <blockquote className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed mb-8 italic">
                                    "{current.quote}"
                                </blockquote>

                                {/* Client Avatar & Info */}
                                <div className="flex flex-col items-center justify-center">
                                    <div className={`w-12 h-12 rounded-full ${current.avatarBg} text-white font-bold flex items-center justify-center text-sm shadow-sm mb-3`}>
                                        {current.initials}
                                    </div>
                                    <h4 className="text-base font-bold text-[#0F172A]">
                                        {current.name}
                                    </h4>
                                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                                        {current.role}, <span className="text-[#2563EB]">{current.company}</span>
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Slider Navigation Controls (Section 19) */}
                        <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
                            <button
                                onClick={prevSlide}
                                className="w-9 h-9 rounded-full border border-slate-200 text-slate-600 hover:text-[#2563EB] hover:border-blue-300 flex items-center justify-center transition-colors cursor-pointer"
                                aria-label="Previous testimonial"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>

                            {/* Dots */}
                            <div className="flex items-center space-x-2">
                                {testimonials.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentIndex(idx)}
                                        className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                                            currentIndex === idx ? 'w-6 bg-[#2563EB]' : 'w-2 bg-slate-200 hover:bg-slate-300'
                                        }`}
                                        aria-label={`Go to slide ${idx + 1}`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={nextSlide}
                                className="w-9 h-9 rounded-full border border-slate-200 text-slate-600 hover:text-[#2563EB] hover:border-blue-300 flex items-center justify-center transition-colors cursor-pointer"
                                aria-label="Next testimonial"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </Card>
                </div>

                {/* Client Logos Bar (Section 20) */}
                <div className="pt-8 border-t border-slate-100">
                    <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest mb-8">
                        Trusted by Innovative Companies & Startups
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
                        {clientLogos.map((logo) => (
                            <span key={logo} className="font-extrabold text-sm sm:text-base tracking-wider text-slate-600 hover:text-[#2563EB] transition-colors">
                                {logo}
                            </span>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
