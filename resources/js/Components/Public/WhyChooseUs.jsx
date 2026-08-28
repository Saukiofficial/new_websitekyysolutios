import { motion } from 'framer-motion';
import { 
    Users, 
    Zap, 
    ShieldCheck, 
    Headphones, 
    Award, 
    DollarSign,
    CheckCircle2,
    Lock
} from 'lucide-react';
import { fadeInUp, staggerContainer, staggerItem } from '@/Lib/animations';
import { useLanguage } from '@/Context/LanguageContext';

export default function WhyChooseUs() {
    const { t } = useLanguage();

    const featureIcons = [
        Users, 
        Zap, 
        ShieldCheck, 
        Headphones, 
        Award, 
        DollarSign
    ];

    const featureBadges = [
        ['Senior Devs', 'Certified'],
        ['Sub-second', 'Vite & Redis'],
        ['100% IP', 'NDA Ready'],
        ['15-Min SLA', 'Dedicated'],
        ['Zero Fluff', 'Clean Code'],
        ['Transparent', 'No Hidden Fee']
    ];

    const features = t.whyUs.features.map((feat, index) => ({
        ...feat,
        icon: featureIcons[index] || ShieldCheck,
        badges: featureBadges[index] || [],
    }));

    const statistics = t.whyUs.statistics;

    return (
        <section id="why-us" className="py-20 md:py-28 bg-[#0B1220] text-white relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute inset-0 bg-dot-dark opacity-15 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-blue-600/15 via-indigo-600/10 to-transparent blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-900/60 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
                        <span>{t.whyUs.badge}</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-white tracking-tight mb-4">
                        {t.whyUs.title}
                    </h2>
                    <p className="text-base sm:text-lg text-slate-400 font-normal leading-relaxed">
                        {t.whyUs.subtitle}
                    </p>
                </motion.div>

                {/* 6 Feature Cards Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
                >
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div key={index} variants={staggerItem}>
                                <div className="h-full p-8 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900 shadow-lg hover:shadow-blue-500/10 transition-all duration-300 group flex flex-col justify-between">
                                    <div>
                                        {/* Icon Header */}
                                        <div className="w-13 h-13 rounded-2xl bg-blue-950/70 border border-blue-500/30 text-[#3B82F6] flex items-center justify-center mb-6 group-hover:scale-105 group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-200 shadow-sm">
                                            <Icon className="w-6 h-6" />
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-blue-400 transition-colors leading-snug">
                                            {feature.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal mb-5">
                                            {feature.description}
                                        </p>
                                    </div>

                                    {/* Micro Badges */}
                                    <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5 mt-auto">
                                        {feature.badges.map((b) => (
                                            <span key={b} className="text-[10px] font-semibold bg-slate-800/80 border border-slate-700/60 text-slate-300 px-2 py-0.5 rounded">
                                                {b}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* 4 Statistics Metrics Strip */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-sm relative overflow-hidden"
                >
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
                        {statistics.map((stat, index) => (
                            <div key={index} className={`${index > 1 ? 'pt-6 lg:pt-0' : ''} ${index % 2 !== 0 && index <= 1 ? 'border-l lg:border-l-0 border-slate-800 pl-4 lg:pl-0' : ''}`}>
                                <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 mb-2 font-mono tracking-tight">
                                    {stat.value}
                                </div>
                                <div className="text-xs sm:text-sm font-bold text-white mb-1">
                                    {stat.label}
                                </div>
                                <div className="text-[11px] text-slate-400 font-normal">
                                    {stat.sublabel}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
