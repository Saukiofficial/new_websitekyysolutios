import { motion } from 'framer-motion';
import { 
    MessageSquare, 
    Compass, 
    Palette, 
    Code2, 
    CheckSquare, 
    Rocket, 
    ArrowRight 
} from 'lucide-react';
import Card from '@/Components/Shared/Card';
import { fadeInUp, staggerContainer, staggerItem } from '@/Lib/animations';

export default function HowItWorks() {
    const steps = [
        {
            number: '01',
            icon: MessageSquare,
            title: 'Discuss',
            description: 'We listen to your ideas, requirements, and understand your business goals.',
        },
        {
            number: '02',
            icon: Compass,
            title: 'Plan',
            description: 'We create a clear roadmap, technical specification, and project timeline.',
        },
        {
            number: '03',
            icon: Palette,
            title: 'Design',
            description: 'We transform concepts into intuitive, high-converting modern UI/UX interfaces.',
        },
        {
            number: '04',
            icon: Code2,
            title: 'Develop',
            description: 'Our engineers build robust, scalable, and secure full-stack software solutions.',
        },
        {
            number: '05',
            icon: CheckSquare,
            title: 'Test',
            description: 'We rigorously test performance, security, responsiveness, and code quality.',
        },
        {
            number: '06',
            icon: Rocket,
            title: 'Deliver',
            description: 'We launch your product to production and provide continuous support.',
        },
    ];

    return (
        <section id="how-it-works" className="py-20 md:py-28 bg-[#F8FAFC] border-y border-slate-100 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header (Section 15) */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={staggerContainer}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <motion.div variants={fadeInUp} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] text-xs font-semibold uppercase tracking-wider mb-3">
                        Proven Process
                    </motion.div>
                    <motion.h2
                        variants={fadeInUp}
                        className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#0F172A] tracking-tight leading-tight mb-4"
                    >
                        How It Works
                    </motion.h2>
                    <motion.p
                        variants={fadeInUp}
                        className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed"
                    >
                        A simple process to turn your ideas into reality.
                    </motion.p>
                </motion.div>

                {/* 6-Step Horizontal on Desktop, Vertical on Mobile (Section 15) */}
                <div className="relative">
                    {/* Connecting Line on Large Desktop */}
                    <div className="hidden xl:block absolute top-12 left-10 right-10 h-0.5 bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 z-0" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 relative z-10">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <motion.div
                                    key={step.number}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="flex flex-col h-full"
                                >
                                    <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-soft hover:border-[#2563EB]/40 transition-all duration-200 h-full flex flex-col items-start">
                                        {/* Number Badge & Icon Header */}
                                        <div className="flex items-center justify-between w-full mb-4">
                                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold text-sm">
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <span className="text-xs font-mono font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded">
                                                {step.number}
                                            </span>
                                        </div>

                                        <h3 className="text-base font-bold text-[#0F172A] mb-2">
                                            {step.title}
                                        </h3>

                                        <p className="text-xs text-slate-600 leading-relaxed font-normal">
                                            {step.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
}
