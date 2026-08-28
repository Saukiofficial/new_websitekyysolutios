import { motion } from 'framer-motion';
import { 
    ArrowUpRight, 
    ExternalLink, 
    TrendingUp, 
    ShieldCheck, 
    MapPin, 
    Clock, 
    Video, 
    Star, 
    Smartphone, 
    Laptop, 
    Award,
    CheckCircle2
} from 'lucide-react';
import Card from '@/Components/Shared/Card';
import { fadeInUp, staggerContainer, staggerItem } from '@/Lib/animations';
import { useLanguage } from '@/Context/LanguageContext';

// Mockup 1: E-Commerce Omnichannel Platform
const EcommerceMockup = () => (
    <div className="w-full h-full bg-[#0F172A] p-3 text-white flex flex-col justify-between relative overflow-hidden select-none group-hover:scale-[1.02] transition-transform duration-300">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[9px] text-slate-400">
            <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-red-500/80" />
                <div className="w-2 h-2 rounded-full bg-amber-500/80" />
                <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
            </div>
            <span className="font-mono text-[8px] bg-slate-800/80 px-2 py-0.5 rounded text-blue-300">store.globaltrade.com</span>
        </div>

        <div className="space-y-1.5 pt-1.5">
            <div className="flex items-center justify-between bg-slate-800/70 p-2 rounded-lg border border-slate-700/60">
                <div>
                    <span className="text-[8px] text-slate-400 block">Total Volume (GMV)</span>
                    <span className="text-[12px] font-black text-white font-mono">$1,420,890</span>
                </div>
                <span className="text-[8px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-bold">▲ +38.4%</span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 text-[8px]">
                <div className="bg-slate-800/40 p-1.5 rounded border border-slate-700/40">
                    <span className="text-slate-400 block">Avg Fulfillment</span>
                    <span className="font-bold text-slate-200">12 Mins</span>
                </div>
                <div className="bg-slate-800/40 p-1.5 rounded border border-slate-700/40">
                    <span className="text-slate-400 block">Conversion</span>
                    <span className="font-bold text-emerald-400">4.82%</span>
                </div>
            </div>
        </div>

        <div className="pt-2 flex items-center justify-between text-[8px] text-slate-400 border-t border-slate-800">
            <span className="flex items-center text-blue-400 font-semibold"><CheckCircle2 className="w-2.5 h-2.5 mr-1" /> Multi-Currency Checkout</span>
            <span className="font-mono text-slate-300">Stripe & PayPal</span>
        </div>
    </div>
);

// Mockup 2: Healthcare & Telemedicine Portal
const HealthcareMockup = () => (
    <div className="w-full h-full bg-[#0B1E36] p-3 text-white flex flex-col justify-between relative overflow-hidden select-none group-hover:scale-[1.02] transition-transform duration-300">
        <div className="flex items-center justify-between pb-2 border-b border-blue-900/60 text-[9px] text-blue-200">
            <div className="flex items-center space-x-1.5">
                <div className="w-3.5 h-3.5 rounded bg-blue-500 flex items-center justify-center text-[7px] font-bold">
                    +
                </div>
                <span className="font-bold text-[9px]">MedixCare Portal</span>
            </div>
            <span className="text-[8px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-bold">HIPAA Compliant</span>
        </div>

        <div className="bg-blue-950/70 p-2 rounded-lg border border-blue-800/50 space-y-1">
            <div className="flex items-center justify-between text-[8px]">
                <span className="text-slate-300 font-semibold">Dr. Sarah Williams</span>
                <span className="bg-red-500/30 text-red-300 px-1 rounded flex items-center"><Video className="w-2 h-2 mr-0.5" /> Teleconsult</span>
            </div>
            <div className="text-[11px] font-bold text-white">Cardiology Live Session</div>
            <div className="text-[8px] text-blue-300 font-mono">120k+ Patients Registered</div>
        </div>

        <div className="grid grid-cols-2 gap-1.5 text-[8px] pt-1">
            <div className="bg-blue-950/40 p-1.5 rounded border border-blue-900/40 text-slate-300">
                <span>EHR Records: </span><span className="text-white font-bold">Encrypted</span>
            </div>
            <div className="bg-blue-950/40 p-1.5 rounded border border-blue-900/40 text-slate-300">
                <span>Uptime: </span><span className="text-emerald-400 font-bold">99.99%</span>
            </div>
        </div>
    </div>
);

// Mockup 3: Real Estate 3D Virtual Tour Mobile App
const RealEstateMockup = () => (
    <div className="w-full h-full bg-gradient-to-br from-[#1E1B4B] to-[#312E81] p-3 text-white flex flex-col justify-between relative overflow-hidden select-none group-hover:scale-[1.02] transition-transform duration-300">
        <div className="flex items-center justify-between text-[8px] text-indigo-300 pb-1">
            <span className="font-bold">EstateFinder Pro</span>
            <span className="flex items-center text-amber-400 font-bold"><Star className="w-2.5 h-2.5 fill-current mr-0.5" /> 4.9★</span>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/15 space-y-1">
            <div className="flex items-center justify-between text-[8px]">
                <span className="text-indigo-200 flex items-center"><MapPin className="w-2 h-2 mr-0.5" /> Beverly Hills, CA</span>
                <span className="bg-indigo-500/40 text-white px-1.5 rounded text-[7px] font-bold">3D Tour</span>
            </div>
            <div className="text-[12px] font-extrabold text-white font-mono">$2,450,000</div>
            <div className="text-[8px] text-indigo-200">5 Beds • 4 Baths • 4,200 sqft</div>
        </div>

        <div className="flex items-center justify-between text-[8px] text-indigo-200 pt-1 border-t border-indigo-900/80">
            <span>Virtual Tours Generated</span>
            <span className="text-white font-bold font-mono">14,200+</span>
        </div>
    </div>
);

// Mockup 4: Restaurant Cloud POS System
const POSMockup = () => (
    <div className="w-full h-full bg-[#1A1A24] p-3 text-white flex flex-col justify-between relative overflow-hidden select-none group-hover:scale-[1.02] transition-transform duration-300">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[9px]">
            <span className="font-bold text-amber-400">CloudPOS Terminal #04</span>
            <span className="bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded text-[8px] font-mono">Online • 45 Outlets</span>
        </div>

        <div className="space-y-1 pt-1 text-[8px]">
            <div className="bg-slate-800/80 p-1.5 rounded flex items-center justify-between border border-slate-700/60">
                <div>
                    <span className="font-bold text-white block">Table #12 (4 Guests)</span>
                    <span className="text-slate-400">Steak Truffle, Pasta, Wine</span>
                </div>
                <span className="text-amber-400 font-mono font-bold">$142.50</span>
            </div>
            <div className="bg-slate-800/50 p-1 rounded flex items-center justify-between text-slate-300">
                <span>Kitchen Display System (KDS)</span>
                <span className="text-emerald-400 font-bold">Synced (0.2s)</span>
            </div>
        </div>

        <div className="flex items-center justify-between text-[8px] text-slate-400 pt-1 border-t border-slate-800">
            <span>Offline-First Engine</span>
            <span className="text-white font-bold">WebSockets Live</span>
        </div>
    </div>
);

// Mockup 5: Corporate Technology & Logistics Portal
const CorporateMockup = () => (
    <div className="w-full h-full bg-[#0F172A] p-3 text-white flex flex-col justify-between relative overflow-hidden select-none group-hover:scale-[1.02] transition-transform duration-300">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[9px] text-slate-400">
            <span className="font-mono text-[8px] text-blue-300">apexlogistics.global</span>
            <span className="bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded text-[8px] font-bold">99/100 PageSpeed</span>
        </div>

        <div className="bg-slate-800/70 p-2 rounded-lg border border-slate-700/60 space-y-1">
            <div className="flex items-center justify-between text-[8px]">
                <span className="text-slate-400">Live Vessel Tracking</span>
                <span className="text-blue-400 font-mono">GPS Active</span>
            </div>
            <div className="text-[11px] font-bold text-white">Container Shipment #8921</div>
            <div className="text-[8px] text-emerald-400">Rotterdam ➔ Singapore (On Schedule)</div>
        </div>

        <div className="flex items-center justify-between text-[8px] text-slate-400 pt-1 border-t border-slate-800">
            <span>Dynamic Multi-Language</span>
            <span className="text-white font-bold">Headless CMS</span>
        </div>
    </div>
);

// Mockup 6: Enterprise Learning Management System (LMS)
const LMSMockup = () => (
    <div className="w-full h-full bg-[#181829] p-3 text-white flex flex-col justify-between relative overflow-hidden select-none group-hover:scale-[1.02] transition-transform duration-300">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[9px]">
            <span className="font-bold text-purple-300">Enterprise LMS Portal</span>
            <span className="bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded text-[8px] font-mono">40k+ Students</span>
        </div>

        <div className="bg-slate-800/80 p-2 rounded-lg border border-slate-700/60 space-y-1.5">
            <div className="flex items-center justify-between text-[8px]">
                <span className="text-slate-300 font-semibold">Fullstack Architecture Masterclass</span>
                <span className="text-emerald-400 font-bold">82% Completed</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div className="w-[82%] h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
            </div>
            <div className="flex justify-between text-[7px] text-slate-400 font-mono">
                <span>Module 08/10</span>
                <span>Automated Certificate</span>
            </div>
        </div>

        <div className="flex items-center justify-between text-[8px] text-slate-400 pt-1 border-t border-slate-800">
            <span>Video Streaming CDN</span>
            <span className="text-white font-bold">Interactive Quizzes</span>
        </div>
    </div>
);

export default function PortfolioSection() {
    const { t } = useLanguage();

    const projectMockups = [
        { 
            mockupComponent: EcommerceMockup,
            tags: ['Laravel 13', 'React 19', 'Stripe Connect', 'Redis'], 
            metric: '$1.4M GMV' 
        },
        { 
            mockupComponent: HealthcareMockup,
            tags: ['Next.js', 'PostgreSQL', 'WebRTC', 'Docker'], 
            metric: '120k+ Patients' 
        },
        { 
            mockupComponent: RealEstateMockup,
            tags: ['Flutter 3', 'Firebase', 'Google Maps API'], 
            metric: '4.9★ App Store' 
        },
        { 
            mockupComponent: POSMockup,
            tags: ['React', 'Laravel', 'Tailwind', 'WebSockets'], 
            metric: '45+ Outlets' 
        },
        { 
            mockupComponent: CorporateMockup,
            tags: ['Next.js', 'Tailwind CSS', 'Headless CMS'], 
            metric: '99/100 PageSpeed' 
        },
        { 
            mockupComponent: LMSMockup,
            tags: ['Laravel 13', 'React 19', 'Inertia', 'MySQL'], 
            metric: '40k+ Students' 
        },
    ];

    const projects = t.portfolio.projects.map((proj, index) => ({
        ...proj,
        ...projectMockups[index],
    }));

    return (
        <section id="portfolio" className="py-20 lg:py-28 bg-slate-50/50 relative">
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
                    {projects.map((project, index) => {
                        const MockupComponent = project.mockupComponent;
                        return (
                            <motion.div key={index} variants={staggerItem}>
                                <div className="h-full flex flex-col justify-between rounded-[22px] bg-white border border-slate-200/80 hover:border-[#2563EB]/50 shadow-[0_4px_20px_rgba(20,33,61,0.04)] hover:shadow-[0_15px_35px_rgba(37,99,235,0.12)] hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
                                    
                                    <div>
                                        {/* Realistic UI Mockup / Banner Image Header */}
                                        <div className="h-48 w-full relative overflow-hidden bg-slate-900 border-b border-slate-100">
                                            {project.banner_image || project.image ? (
                                                <img 
                                                    src={project.banner_image || project.image} 
                                                    alt={project.title} 
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                                />
                                            ) : MockupComponent ? (
                                                <MockupComponent />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-400">
                                                    <span className="text-xs font-mono font-bold">{project.title}</span>
                                                </div>
                                            )}

                                            {/* Key Metric Floating Badge */}
                                            <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-[#14213D] text-[11px] font-black px-3 py-1 rounded-full shadow-md border border-slate-100 flex items-center space-x-1">
                                                <span>{project.metric}</span>
                                            </div>
                                        </div>

                                        {/* Content Area */}
                                        <div className="p-6">
                                            {/* Category Pill */}
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-xs font-bold text-[#2563EB] bg-blue-50 px-2.5 py-1 rounded-lg">
                                                    {project.category}
                                                </span>
                                                <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 group-hover:bg-[#2563EB] group-hover:text-white flex items-center justify-center transition-colors">
                                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                                </div>
                                            </div>

                                            {/* Title & Description */}
                                            <h3 className="text-xl font-bold text-[#14213D] mb-2.5 group-hover:text-[#2563EB] transition-colors leading-snug">
                                                {project.title}
                                            </h3>
                                            <p className="text-sm text-slate-600 leading-relaxed font-normal mb-5">
                                                {project.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Tech Stack Tags Footer */}
                                    <div className="px-6 py-4 bg-slate-50/60 border-t border-slate-100/90 flex flex-wrap gap-1.5 mt-auto">
                                        {project.tags.map((tag) => (
                                            <span 
                                                key={tag} 
                                                className="px-2.5 py-1 rounded-md bg-white border border-slate-200/80 text-slate-600 text-[11px] font-medium shadow-2xs"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

            </div>
        </section>
    );
}
