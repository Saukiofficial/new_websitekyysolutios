import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import Card from '@/Components/Shared/Card';
import { fadeInUp, staggerContainer, staggerItem } from '@/Lib/animations';

export default function PortfolioSection() {
    const projects = [
        {
            title: 'E-Commerce Platform',
            category: 'Web Application',
            description: 'Scalable omnichannel shopping engine with real-time stock sync, multi-currency checkout & automated fulfillment.',
            tags: ['Laravel', 'React', 'Stripe', 'Redis'],
            gradient: 'from-blue-600 via-indigo-600 to-slate-900',
            icon: '🛍️',
            metric: '$1.4M GMV'
        },
        {
            title: 'Healthcare Management Portal',
            category: 'Custom Software',
            description: 'HIPAA-compliant clinic management system with digital patient records, scheduling & telemedicine modules.',
            tags: ['Next.js', 'PostgreSQL', 'Docker', 'WebRTC'],
            gradient: 'from-cyan-600 via-blue-600 to-slate-900',
            icon: '🏥',
            metric: '120k+ Patients'
        },
        {
            title: 'Real Estate Mobile App',
            category: 'Mobile Application',
            description: 'Cross-platform property search app with interactive map filters, 3D virtual tours & agent chat.',
            tags: ['Flutter', 'Firebase', 'Google Maps API'],
            gradient: 'from-indigo-600 via-purple-600 to-slate-900',
            icon: '🏠',
            metric: '4.9★ App Store'
        },
        {
            title: 'Restaurant Cloud POS System',
            category: 'Web Application',
            description: 'Fast offline-first point of sale system with kitchen display integration, QR menus & inventory control.',
            tags: ['React', 'Laravel', 'Tailwind', 'WebSockets'],
            gradient: 'from-amber-600 via-orange-600 to-slate-900',
            icon: '🍽️',
            metric: '45+ Outlets'
        },
        {
            title: 'Corporate Technology Portal',
            category: 'Website Development',
            description: 'High-speed marketing site for an international logistics firm with custom career portal and dynamic localization.',
            tags: ['Next.js', 'Tailwind CSS', 'Headless CMS'],
            gradient: 'from-slate-700 via-slate-800 to-slate-900',
            icon: '🌐',
            metric: '99/100 PageSpeed'
        },
        {
            title: 'Learning Management System',
            category: 'SaaS Platform',
            description: 'Enterprise training platform with interactive video modules, automated quizzes & certificate issuance.',
            tags: ['Laravel 13', 'React 19', 'Inertia', 'MySQL'],
            gradient: 'from-purple-600 via-blue-600 to-slate-900',
            icon: '🎓',
            metric: '40k+ Students'
        },
    ];

    return (
        <section id="portfolio" className="py-20 md:py-28 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header (Section 16) */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={staggerContainer}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <motion.div variants={fadeInUp} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] text-xs font-semibold uppercase tracking-wider mb-3">
                        Featured Work
                    </motion.div>
                    <motion.h2
                        variants={fadeInUp}
                        className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#0F172A] tracking-tight leading-tight mb-4"
                    >
                        Our Work
                    </motion.h2>
                    <motion.p
                        variants={fadeInUp}
                        className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed"
                    >
                        Some of the projects we've proudly delivered.
                    </motion.p>
                </motion.div>

                {/* 3-Column Portfolio Grid (Section 16) */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {projects.map((project, index) => (
                        <motion.div key={project.title} variants={staggerItem} className="h-full">
                            <Card className="p-0 h-full flex flex-col justify-between group bg-white border border-slate-200/90 rounded-2xl overflow-hidden hover:border-[#2563EB]/40">
                                
                                {/* Mockup Preview Visual */}
                                <div className={`relative h-48 bg-gradient-to-br ${project.gradient} p-5 flex flex-col justify-between overflow-hidden`}>
                                    <div className="flex items-center justify-between relative z-10">
                                        <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-sm text-[11px] font-bold text-[#0F172A]">
                                            {project.category}
                                        </span>
                                        <span className="px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-sm text-white/90 text-[11px] font-medium border border-white/10">
                                            {project.metric}
                                        </span>
                                    </div>

                                    {/* Mock Graphic Element */}
                                    <div className="relative z-10 flex items-center justify-center my-auto">
                                        <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            {project.icon}
                                        </div>
                                    </div>
                                </div>

                                {/* Project Description & Tech Stack */}
                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-start justify-between gap-2 mb-2">
                                            <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                                                {project.title}
                                            </h3>
                                            <a href="#cta" className="text-slate-400 group-hover:text-[#2563EB] transition-colors">
                                                <ArrowUpRight className="w-4 h-4" />
                                            </a>
                                        </div>

                                        <p className="text-sm text-slate-600 leading-relaxed mb-5 font-normal">
                                            {project.description}
                                        </p>
                                    </div>

                                    {/* Tech Tags */}
                                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2.5 py-1 rounded-md bg-slate-100 text-[11px] font-medium text-slate-600"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
