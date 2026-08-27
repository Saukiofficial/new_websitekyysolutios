import { motion } from 'framer-motion';
import { 
    Globe, 
    Layers, 
    Smartphone, 
    Cpu, 
    Palette, 
    Database, 
    Network, 
    Wrench, 
    ArrowRight 
} from 'lucide-react';
import Card from '@/Components/Shared/Card';
import { fadeInUp, staggerContainer, staggerItem } from '@/Lib/animations';
import { useLanguage } from '@/Context/LanguageContext';

export default function ServicesSection() {
    const { t } = useLanguage();

    const serviceIcons = [
        Globe, 
        Layers, 
        Smartphone, 
        Cpu, 
        Palette, 
        Database, 
        Network, 
        Wrench
    ];

    const services = t.services.items.map((item, index) => ({
        ...item,
        icon: serviceIcons[index] || Globe,
    }));

    return (
        <section id="services" className="py-20 lg:py-28 bg-slate-50/60 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <motion.div 
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#2563EB] text-xs font-semibold uppercase tracking-wider mb-4">
                        <span>{t.services.badge}</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14213D] tracking-tight mb-4">
                        {t.services.title}
                    </h2>
                    <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
                        {t.services.subtitle}
                    </p>
                </motion.div>

                {/* 8 Services Grid (4 cols on desktop) */}
                <motion.div 
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <motion.div key={index} variants={staggerItem}>
                                <Card 
                                    className="h-full p-6 flex flex-col justify-between group hover:border-[#2563EB]/40 bg-white"
                                    hoverEffect={true}
                                >
                                    <div>
                                        <div className="w-12 h-12 rounded-xl bg-blue-50/80 text-[#2563EB] flex items-center justify-center mb-5 group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-200 shadow-xs">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-lg font-bold text-[#14213D] mb-2.5 group-hover:text-[#2563EB] transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-sm text-slate-600 leading-relaxed font-normal">
                                            {service.description}
                                        </p>
                                    </div>

                                    <div className="pt-6 mt-4 border-t border-slate-100/80 flex items-center text-xs font-semibold text-[#2563EB] group-hover:translate-x-1 transition-transform">
                                        <span>{t.services.learnMore}</span>
                                        <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                                    </div>
                                </Card>
                            </motion.div>
                        );
                    })}
                </motion.div>

            </div>
        </section>
    );
}
