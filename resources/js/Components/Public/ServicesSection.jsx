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

export default function ServicesSection() {
    const services = [
        {
            icon: Globe,
            title: 'Website Development',
            description: 'Custom websites built with modern technologies, responsive design, and SEO optimization.',
        },
        {
            icon: Layers,
            title: 'Web Application',
            description: 'Scalable, high-performance web applications engineered for complex business workflows.',
        },
        {
            icon: Smartphone,
            title: 'Mobile Application',
            description: 'Native and cross-platform iOS & Android mobile applications with seamless user experience.',
        },
        {
            icon: Cpu,
            title: 'Custom Software',
            description: 'Enterprise-grade bespoke software solutions built to solve complex organizational challenges.',
        },
        {
            icon: Palette,
            title: 'UI/UX Design',
            description: 'Modern, intuitive design systems and user interfaces that enhance engagement and conversions.',
        },
        {
            icon: Database,
            title: 'API Development',
            description: 'High-throughput, well-documented RESTful and GraphQL APIs for robust system integration.',
        },
        {
            icon: Network,
            title: 'System Integration',
            description: 'Connect disparate platforms, automate data synchronization, and streamline business processes.',
        },
        {
            icon: Wrench,
            title: 'Maintenance & Support',
            description: 'Proactive server management, continuous security updates, and dedicated technical SLA support.',
        },
    ];

    return (
        <section id="services" className="py-20 md:py-28 bg-[#F8FAFC] border-y border-slate-100 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header (Section 11) */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={staggerContainer}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <motion.div variants={fadeInUp} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] text-xs font-semibold uppercase tracking-wider mb-3">
                        Our Expertise
                    </motion.div>
                    <motion.h2
                        variants={fadeInUp}
                        className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#0F172A] tracking-tight leading-tight mb-4"
                    >
                        Technology Services
                    </motion.h2>
                    <motion.p
                        variants={fadeInUp}
                        className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed"
                    >
                        End-to-end development services to bring your ideas to life.
                    </motion.p>
                </motion.div>

                {/* 4-Column Responsive Grid (Section 11) */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <motion.div key={service.title} variants={staggerItem} className="h-full">
                                <Card className="p-6 h-full flex flex-col justify-between group hover:border-[#2563EB]/40 bg-white">
                                    <div>
                                        {/* Icon Container with consistent Blue/Indigo accent */}
                                        <div className="w-12 h-12 rounded-xl bg-blue-50/80 border border-blue-100 text-[#2563EB] flex items-center justify-center mb-5 group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-200">
                                            <Icon className="w-6 h-6" />
                                        </div>

                                        <h3 className="text-lg font-bold text-[#0F172A] mb-2.5 group-hover:text-[#2563EB] transition-colors duration-150">
                                            {service.title}
                                        </h3>

                                        <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                                            {service.description}
                                        </p>
                                    </div>

                                    {/* Action link */}
                                    <a
                                        href="#cta"
                                        className="inline-flex items-center text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors group/link mt-auto pt-2"
                                    >
                                        <span>Learn more</span>
                                        <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover/link:translate-x-1 transition-transform duration-150" />
                                    </a>
                                </Card>
                            </motion.div>
                        );
                    })}
                </motion.div>

            </div>
        </section>
    );
}
