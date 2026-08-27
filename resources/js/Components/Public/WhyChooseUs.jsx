import { motion } from 'framer-motion';
import { 
    Users, 
    Zap, 
    ShieldCheck, 
    Headphones, 
    Award, 
    DollarSign,
    CheckCircle
} from 'lucide-react';
import { fadeInUp, staggerContainer, staggerItem } from '@/Lib/animations';

export default function WhyChooseUs() {
    const features = [
        {
            icon: Users,
            title: 'Professional Team',
            description: 'Experienced senior engineers, solution architects, and product designers with deep domain expertise.',
        },
        {
            icon: Zap,
            title: 'Fast Delivery',
            description: 'Agile development cycles and rapid deployment protocols to get your product to market faster.',
        },
        {
            icon: ShieldCheck,
            title: 'Secure & Reliable',
            description: 'Built with enterprise-grade security standards, automated backups, and 99.98% high availability.',
        },
        {
            icon: Headphones,
            title: 'Support 24/7',
            description: 'Round-the-clock infrastructure monitoring and dedicated technical assistance for complete peace of mind.',
        },
        {
            icon: Award,
            title: 'Quality Products',
            description: 'Clean, well-documented, and strictly tested codebases built to scale seamlessly with your growth.',
        },
        {
            icon: DollarSign,
            title: 'Competitive Pricing',
            description: 'Transparent investment models with clear deliverables and no hidden fees, maximizing your ROI.',
        },
    ];

    const statistics = [
        { value: '50+', label: 'Projects Completed' },
        { value: '100+', label: 'Happy Clients' },
        { value: '30+', label: 'Ready Products' },
        { value: '99%', label: 'Satisfaction Rate' },
    ];

    return (
        <section id="why-us" className="py-20 md:py-28 bg-[#0B1220] text-white relative overflow-hidden">
            {/* Subtle Gradient Glow & Grid Accent (Section 17) */}
            <div className="absolute inset-0 bg-dot-dark opacity-10 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-blue-600/15 via-indigo-600/10 to-transparent blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header (Section 17) */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={staggerContainer}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <motion.div variants={fadeInUp} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3 backdrop-blur-xs">
                        Why KyySolutions
                    </motion.div>
                    <motion.h2
                        variants={fadeInUp}
                        className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-white tracking-tight leading-tight mb-4"
                    >
                        Why Choose KyySolutions?
                    </motion.h2>
                    <motion.p
                        variants={fadeInUp}
                        className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed"
                    >
                        We combine expertise, quality, and dedication to deliver exceptional digital solutions.
                    </motion.p>
                </motion.div>

                {/* 6 Feature Cards (Section 17) */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
                >
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div key={feature.title} variants={staggerItem} className="h-full">
                                <div className="p-6 rounded-2xl bg-white/[0.06] border border-white/[0.09] backdrop-blur-sm hover:bg-white/[0.09] hover:border-blue-400/30 transition-all duration-200 h-full flex flex-col justify-between">
                                    <div>
                                        <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-400/20 flex items-center justify-center mb-5">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-2.5">
                                            {feature.title}
                                        </h3>
                                        <p className="text-sm text-slate-300 leading-relaxed font-normal">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Prominent Statistics Row (Section 18) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="pt-12 border-t border-white/10"
                >
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-white/10">
                        {statistics.map((stat, idx) => (
                            <div key={stat.label} className={`${idx !== 0 ? 'pt-6 sm:pt-0' : ''}`}>
                                <div className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-300 tracking-tight mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-slate-400 font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
