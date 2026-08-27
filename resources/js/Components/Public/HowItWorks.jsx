import { motion } from 'framer-motion';
import { 
    MessageSquare, 
    Compass, 
    Palette, 
    Code2, 
    CheckSquare, 
    Rocket 
} from 'lucide-react';
import Card from '@/Components/Shared/Card';
import { fadeInUp, staggerContainer, staggerItem } from '@/Lib/animations';
import { useLanguage } from '@/Context/LanguageContext';

export default function HowItWorks() {
    const { t } = useLanguage();

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

    return (
        <section id="how-it-works" className="py-20 md:py-28 bg-[#F8FAFC] border-y border-slate-100 relative overflow-hidden">
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
                        <span>{t.process.badge}</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14213D] tracking-tight mb-4">
                        {t.process.title}
                    </h2>
                    <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
                        {t.process.subtitle}
                    </p>
                </motion.div>

                {/* 6 Step Cards Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative"
                >
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <motion.div key={step.number} variants={staggerItem}>
                                <Card className="p-8 h-full relative group hover:border-[#2563EB]/40 bg-white shadow-soft transition-all duration-200">
                                    {/* Step Number in top-right */}
                                    <div className="absolute top-6 right-6 text-2xl font-black text-slate-200 group-hover:text-blue-200 transition-colors font-mono">
                                        {step.number}
                                    </div>

                                    {/* Icon */}
                                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-6 group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-200 shadow-xs">
                                        <Icon className="w-7 h-7" />
                                    </div>

                                    {/* Title & Description */}
                                    <h3 className="text-xl font-bold text-[#14213D] mb-3 group-hover:text-[#2563EB] transition-colors">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                                        {step.description}
                                    </p>
                                </Card>
                            </motion.div>
                        );
                    })}
                </motion.div>

            </div>
        </section>
    );
}
