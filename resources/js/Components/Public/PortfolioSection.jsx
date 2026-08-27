import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Card from '@/Components/Shared/Card';
import { fadeInUp, staggerContainer, staggerItem } from '@/Lib/animations';
import { useLanguage } from '@/Context/LanguageContext';

export default function PortfolioSection() {
    const { t } = useLanguage();

    const projectVisuals = [
        { tags: ['Laravel', 'React', 'Stripe', 'Redis'], gradient: 'from-blue-600 via-indigo-600 to-slate-900', icon: '🛍️', metric: '$1.4M GMV' },
        { tags: ['Next.js', 'PostgreSQL', 'Docker', 'WebRTC'], gradient: 'from-cyan-600 via-blue-600 to-slate-900', icon: '🏥', metric: '120k+ Patients' },
        { tags: ['Flutter', 'Firebase', 'Google Maps API'], gradient: 'from-indigo-600 via-purple-600 to-slate-900', icon: '🏠', metric: '4.9★ App Store' },
        { tags: ['React', 'Laravel', 'Tailwind', 'WebSockets'], gradient: 'from-amber-600 via-orange-600 to-slate-900', icon: '🍽️', metric: '45+ Outlets' },
        { tags: ['Next.js', 'Tailwind CSS', 'Headless CMS'], gradient: 'from-slate-700 via-slate-800 to-slate-900', icon: '🌐', metric: '99/100 PageSpeed' },
        { tags: ['Laravel 13', 'React 19', 'Inertia', 'MySQL'], gradient: 'from-purple-600 via-blue-600 to-slate-900', icon: '🎓', metric: '40k+ Students' },
    ];

    const projects = t.portfolio.projects.map((proj, index) => ({
        ...proj,
        ...projectVisuals[index],
    }));

    return (
        <section id="portfolio" className="py-20 lg:py-28 bg-white relative">
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
                        <span>{t.portfolio.badge}</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14213D] tracking-tight mb-4">
                        {t.portfolio.title}
                    </h2>
                    <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
                        {t.portfolio.subtitle}
                    </p>
                </motion.div>

                {/* 6 Portfolio Cards Grid (3 cols on lg) */}
                <motion.div 
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {projects.map((project, index) => (
                        <motion.div key={index} variants={staggerItem}>
                            <Card className="h-full flex flex-col justify-between overflow-hidden group bg-white border-slate-200/80 hover:border-blue-300 transition-all duration-200">
                                <div>
                                    {/* Mockup Preview Header */}
                                    <div className={`h-48 rounded-xl bg-gradient-to-br ${project.gradient} p-6 relative flex flex-col justify-between overflow-hidden mb-5 text-white`}>
                                        <div className="flex items-center justify-between">
                                            <span className="text-3xl filter drop-shadow-md">{project.icon}</span>
                                            <div className="bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold border border-white/20">
                                                {project.metric}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-4">
                                            <span className="text-xs font-mono opacity-80 uppercase tracking-wider">
                                                {project.category}
                                            </span>
                                            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <ArrowUpRight className="w-4 h-4 text-white" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Category Pill */}
                                    <div className="mb-2">
                                        <span className="text-xs font-bold text-[#2563EB] bg-blue-50 px-2.5 py-1 rounded-md">
                                            {project.category}
                                        </span>
                                    </div>

                                    {/* Title & Description */}
                                    <h3 className="text-xl font-bold text-[#14213D] mb-2 group-hover:text-[#2563EB] transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm text-slate-600 leading-relaxed font-normal mb-5">
                                        {project.description}
                                    </p>
                                </div>

                                {/* Tech Stack Tags */}
                                <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-1.5 mt-auto">
                                    {project.tags.map((tag) => (
                                        <span 
                                            key={tag} 
                                            className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
