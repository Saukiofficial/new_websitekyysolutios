import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { 
    Globe, 
    Layers, 
    Smartphone, 
    Cpu, 
    Palette, 
    Database, 
    Network, 
    Wrench, 
    ArrowRight,
    MessageSquare
} from 'lucide-react';
import Card from '@/Components/Shared/Card';
import { fadeInUp, staggerContainer, staggerItem } from '@/Lib/animations';
import { useLanguage } from '@/Context/LanguageContext';

export default function ServicesSection() {
    const { t, lang } = useLanguage();

    const serviceData = [
        { 
            icon: Globe, 
            tech: ['Laravel 13', 'React 19', 'Tailwind CSS', 'SEO Engine'],
            color: 'from-blue-600 to-indigo-600'
        },
        { 
            icon: Layers, 
            tech: ['Next.js', 'Inertia.js', 'PostgreSQL', 'Docker'],
            color: 'from-indigo-600 to-purple-600'
        },
        { 
            icon: Smartphone, 
            tech: ['Flutter 3', 'React Native', 'iOS & Android', 'Firebase'],
            color: 'from-cyan-600 to-blue-600'
        },
        { 
            icon: Cpu, 
            tech: ['Microservices', 'Python', 'Go', 'AWS Cloud'],
            color: 'from-blue-700 to-slate-800'
        },
        { 
            icon: Palette, 
            tech: ['Figma Pro', 'Design Systems', 'Wireframing', 'Tokens'],
            color: 'from-purple-600 to-pink-600'
        },
        { 
            icon: Database, 
            tech: ['RESTful API', 'GraphQL', 'OAuth2', 'Webhooks'],
            color: 'from-blue-600 to-cyan-600'
        },
        { 
            icon: Network, 
            tech: ['Zapier', 'Payment Gateway', 'ERP Sync', 'Pusher'],
            color: 'from-amber-600 to-orange-600'
        },
        { 
            icon: Wrench, 
            tech: ['24/7 SLA', 'Security Audits', 'Cloud Backup', 'DevOps'],
            color: 'from-slate-700 to-slate-900'
        },
    ];

    const services = t.services.items.map((item, index) => ({
        ...item,
        ...(serviceData[index] || serviceData[0]),
    }));

    return (
        <section id="services" className="py-20 lg:py-28 bg-slate-50/70 relative">
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

                {/* 8 Services Grid (4 cols on desktop, 2 on tablet, 1 on mobile) */}
                <motion.div 
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        const waMessage = lang === 'ID' 
                            ? `Halo KyySolutions, saya ingin konsultasi mengenai layanan: ${service.title}`
                            : `Hello KyySolutions, I'd like to discuss the service: ${service.title}`;

                        return (
                            <motion.div key={index} variants={staggerItem}>
                                <div className="h-full p-6 rounded-[20px] bg-white border border-slate-200/85 hover:border-[#2563EB]/50 shadow-[0_4px_20px_rgba(20,33,61,0.04)] hover:shadow-[0_12px_30px_rgba(37,99,235,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
                                    <div>
                                        {/* Icon Header */}
                                        <div className="w-13 h-13 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-5 group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-200 shadow-2xs group-hover:scale-105">
                                            <Icon className="w-6 h-6" />
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-lg font-bold text-[#14213D] mb-2 group-hover:text-[#2563EB] transition-colors leading-snug">
                                            {service.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-5">
                                            {service.description}
                                        </p>

                                        {/* Tech Stack Badges */}
                                        <div className="flex flex-wrap gap-1 mb-4">
                                            {service.tech.map((t) => (
                                                <span key={t} className="text-[10px] font-medium bg-slate-50 border border-slate-200/70 text-slate-600 px-2 py-0.5 rounded-md">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Action Link: Route to dedicated /services page */}
                                    <Link
                                        href="/services"
                                        className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] group/link transition-colors"
                                    >
                                        <span className="flex items-center">
                                            <span>{t.services.learnMore}</span>
                                        </span>
                                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

            </div>
        </section>
    );
}
