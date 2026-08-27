import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    MessageSquare, 
    Compass, 
    Palette, 
    Code2, 
    CheckSquare, 
    Rocket,
    Check,
    ArrowRight
} from 'lucide-react';
import Card from '@/Components/Shared/Card';
import { fadeInUp, staggerContainer } from '@/Lib/animations';
import { useLanguage } from '@/Context/LanguageContext';

export default function HowItWorks() {
    const { t, lang } = useLanguage();
    const [activeStep, setActiveStep] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const stepIcons = [
        MessageSquare, 
        Compass, 
        Palette, 
        Code2, 
        CheckSquare, 
        Rocket
    ];

    const steps = t.process.steps.map((step, index) => ({
        ...step,
        icon: stepIcons[index] || Rocket,
    }));

    // Auto-advancing interactive animated cycle from Step 01 to 06
    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % steps.length);
        }, 3200);

        return () => clearInterval(interval);
    }, [isHovered, steps.length]);

    return (
        <section id="how-it-works" className="py-20 md:py-28 bg-[#F8FAFC] border-y border-slate-100 relative overflow-hidden">
            
            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-blue-100/40 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute inset-0 bg-dot-light opacity-30 pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="text-center max-w-3xl mx-auto mb-12"
                >
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#2563EB] text-xs font-semibold uppercase tracking-wider mb-4">
                        <span>{t.process.badge}</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#14213D] tracking-tight mb-4">
                        {t.process.title}
                    </h2>
                    <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
                        {t.process.subtitle}
                    </p>
                </motion.div>

                {/* Interactive Flow Progress Indicator (Timeline Bar) */}
                <div className="max-w-4xl mx-auto mb-14 hidden md:block">
                    <div className="relative flex items-center justify-between">
                        
                        {/* Background Base Track Line */}
                        <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-slate-200/80 -translate-y-1/2 rounded-full z-0" />
                        
                        {/* Animated Glowing Active Beam Line */}
                        <motion.div 
                            className="absolute top-1/2 left-0 h-1.5 bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#60A5FA] -translate-y-1/2 rounded-full z-0 shadow-sm shadow-blue-500/50"
                            animate={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                        />

                        {/* 6 Step Nodes */}
                        {steps.map((step, index) => {
                            const isCurrent = activeStep === index;
                            const isPassed = activeStep > index;

                            return (
                                <button
                                    key={step.number}
                                    onClick={() => setActiveStep(index)}
                                    className="relative z-10 flex flex-col items-center group cursor-pointer focus:outline-none"
                                >
                                    {/* Node Circle */}
                                    <div 
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                                            isCurrent 
                                                ? 'bg-[#2563EB] text-white ring-4 ring-blue-100 shadow-md shadow-blue-500/30 scale-110' 
                                                : isPassed 
                                                    ? 'bg-[#2563EB] text-white shadow-xs' 
                                                    : 'bg-white text-slate-400 border-2 border-slate-200 hover:border-blue-300 hover:text-[#2563EB]'
                                        }`}
                                    >
                                        {isPassed ? (
                                            <Check className="w-4 h-4 stroke-[3]" />
                                        ) : (
                                            <span>{step.number}</span>
                                        )}
                                    </div>

                                    {/* Node Label Below */}
                                    <span 
                                        className={`mt-2 text-xs font-bold transition-colors duration-200 ${
                                            isCurrent 
                                                ? 'text-[#2563EB]' 
                                                : isPassed 
                                                    ? 'text-[#14213D]' 
                                                    : 'text-slate-400 group-hover:text-slate-600'
                                        }`}
                                    >
                                        {step.title}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 6 Step Cards Grid */}
                <div 
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative"
                >
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        const isCurrent = activeStep === index;
                        const isPassed = activeStep > index;

                        return (
                            <motion.div 
                                key={step.number}
                                onClick={() => setActiveStep(index)}
                                className="cursor-pointer"
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div 
                                    className={`relative p-8 h-full rounded-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                                        isCurrent 
                                            ? 'bg-white border-2 border-[#2563EB] shadow-[0_15px_35px_-5px_rgba(37,99,235,0.18)] ring-4 ring-blue-50' 
                                            : isPassed 
                                                ? 'bg-white/95 border border-blue-200/80 shadow-soft' 
                                                : 'bg-white border border-slate-200/80 shadow-soft hover:border-blue-200 opacity-80 hover:opacity-100'
                                    }`}
                                >
                                    {/* Top Active Indicator Strip */}
                                    {isCurrent && (
                                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] overflow-hidden">
                                            <motion.div 
                                                className="h-full bg-white/40"
                                                initial={{ width: "0%" }}
                                                animate={{ width: "100%" }}
                                                transition={{ duration: 3.2, ease: "linear" }}
                                            />
                                        </div>
                                    )}

                                    <div>
                                        {/* Header Row: Icon + Step Badge */}
                                        <div className="flex items-center justify-between mb-6">
                                            {/* Icon */}
                                            <div 
                                                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xs ${
                                                    isCurrent 
                                                        ? 'bg-gradient-to-tr from-[#2563EB] to-[#3B82F6] text-white shadow-md shadow-blue-500/30 scale-105' 
                                                        : isPassed
                                                            ? 'bg-blue-50 text-[#2563EB]'
                                                            : 'bg-slate-100 text-slate-500'
                                                }`}
                                            >
                                                <Icon className="w-7 h-7" />
                                            </div>

                                            {/* Step Status Badge */}
                                            <div className="flex items-center space-x-2">
                                                {isCurrent && (
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-blue-50 text-[#2563EB] border border-blue-100 animate-pulse">
                                                        {lang === 'ID' ? 'Fase Aktif' : 'Active Phase'}
                                                    </span>
                                                )}
                                                {isPassed && (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                                                        <Check className="w-3 h-3 mr-0.5" />
                                                        {lang === 'ID' ? 'Selesai' : 'Completed'}
                                                    </span>
                                                )}
                                                <span className={`text-2xl font-black font-mono transition-colors ${
                                                    isCurrent ? 'text-[#2563EB]' : 'text-slate-200'
                                                }`}>
                                                    {step.number}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Title & Description */}
                                        <h3 className={`text-xl font-bold mb-3 transition-colors ${
                                            isCurrent ? 'text-[#2563EB]' : 'text-[#14213D]'
                                        }`}>
                                            {step.title}
                                        </h3>
                                        <p className="text-sm text-slate-600 leading-relaxed font-normal">
                                            {step.description}
                                        </p>
                                    </div>

                                    {/* Bottom Connector Action */}
                                    <div className="pt-6 mt-4 border-t border-slate-100/90 flex items-center justify-between text-xs">
                                        <span className={`font-semibold ${isCurrent ? 'text-[#2563EB]' : 'text-slate-400'}`}>
                                            {index < steps.length - 1 ? (
                                                <span className="flex items-center">
                                                    {lang === 'ID' ? 'Lanjut ke' : 'Next to'} {steps[index + 1].title}
                                                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                                                </span>
                                            ) : (
                                                <span className="text-emerald-600 font-bold flex items-center">
                                                    🚀 {lang === 'ID' ? 'Siap Produksi' : 'Ready for Launch'}
                                                </span>
                                            )}
                                        </span>
                                        <span className="text-[11px] text-slate-400 font-mono">
                                            Step {index + 1}/6
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
