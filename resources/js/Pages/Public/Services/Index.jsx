import { useState, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { 
    Globe, 
    Smartphone, 
    Layers, 
    Bot, 
    Server, 
    Layout, 
    CheckCircle2, 
    ArrowRight, 
    ShieldCheck, 
    Clock, 
    Check, 
    MessageSquare, 
    Code2, 
    Search, 
    Rocket,
    Calculator,
    Zap,
    Cpu,
    ExternalLink,
    ChevronDown,
    Building2,
    Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/Context/LanguageContext';
import { useContactModal } from '@/Context/ContactModalContext';

// Dynamic Icon Renderer (Avoid Sparkles)
const ServiceIcon = ({ name, className = "w-6 h-6" }) => {
    switch (name) {
        case 'Globe': return <Globe className={className} />;
        case 'Smartphone': return <Smartphone className={className} />;
        case 'Layers': return <Layers className={className} />;
        case 'Bot': return <Bot className={className} />;
        case 'Server': return <Server className={className} />;
        case 'Layout': return <Layout className={className} />;
        case 'Code2': return <Code2 className={className} />;
        case 'ShieldCheck': return <ShieldCheck className={className} />;
        case 'Rocket': return <Rocket className={className} />;
        default: return <Zap className={className} />;
    }
};

export default function ServicesIndex({ services = [], workflow = [] }) {
    const { lang } = useLanguage();
    const { openContact } = useContactModal();

    // ─────────────────────────────────────────────────────────────
    // Interactive Project Cost Estimator State
    // ─────────────────────────────────────────────────────────────
    const [calcPlatform, setCalcPlatform] = useState('web'); // web, mobile, fullstack
    const [calcScale, setCalcScale] = useState('business'); // mvp, business, enterprise
    const [calcAddons, setCalcAddons] = useState(['payment', 'admin']); // payment, admin, ai, chat, multilingual

    const platformRates = {
        web: { title: 'Web App / SaaS', base: 7500000 },
        mobile: { title: 'Mobile App (Android & iOS)', base: 9500000 },
        fullstack: { title: 'Web + Mobile Terpadu', base: 15000000 },
    };

    const scaleMultipliers = {
        mvp: { title: 'MVP / Prototype Cepat', multiplier: 0.85, weeks: '2–3 Minggu' },
        business: { title: 'Business Standard (Siap Pakai)', multiplier: 1.0, weeks: '4–6 Minggu' },
        enterprise: { title: 'Enterprise Skala Besar', multiplier: 1.6, weeks: '8–12 Minggu' },
    };

    const addonOptions = [
        { id: 'payment', title: 'Payment Gateway (QRIS, VA, CC)', price: 1500000 },
        { id: 'admin', title: 'Panel Admin & Analitik Finansial', price: 1800000 },
        { id: 'ai', title: 'AI Assistant / WhatsApp Bot', price: 2500000 },
        { id: 'chat', title: 'Real-time Chat & Notifikasi', price: 1600000 },
        { id: 'multilingual', title: 'Multi-bahasa & Multi-currency', price: 1200000 },
    ];

    const toggleAddon = (id) => {
        if (calcAddons.includes(id)) {
            setCalcAddons(calcAddons.filter((item) => item !== id));
        } else {
            setCalcAddons([...calcAddons, id]);
        }
    };

    const calculatedEstimate = useMemo(() => {
        const base = platformRates[calcPlatform].base;
        const multiplier = scaleMultipliers[calcScale].multiplier;
        const addonsTotal = calcAddons.reduce((sum, id) => {
            const opt = addonOptions.find((o) => o.id === id);
            return sum + (opt ? opt.price : 0);
        }, 0);

        const total = Math.round((base * multiplier) + addonsTotal);
        return {
            total,
            formatted: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(total),
            timeline: scaleMultipliers[calcScale].weeks,
        };
    }, [calcPlatform, calcScale, calcAddons]);

    const handleSendEstimatorToWA = () => {
        const text = `Halo Tim KyySolutions, saya ingin konsultasi pembuatan software kustom:\n\n` +
            `• Tipe Platform: ${platformRates[calcPlatform].title}\n` +
            `• Skala Proyek: ${scaleMultipliers[calcScale].title}\n` +
            `• Fitur Tambahan: ${calcAddons.map(id => addonOptions.find(o => o.id === id)?.title).join(', ') || 'Standar'}\n` +
            `• Estimasi Biaya: ${calculatedEstimate.formatted}\n` +
            `• Target Waktu: ${calculatedEstimate.timeline}\n\n` +
            `Mohon info ketersediaan jadwal tim & proposal teknisnya. Terima kasih!`;
        window.open(`https://wa.me/6281232916758?text=${encodeURIComponent(text)}`, '_blank');
    };

    return (
        <PublicLayout>
            <Head>
                <title>Jasa Pembuatan Software Kustom & Solusi Aplikasi Web/Mobile — KyySolutions</title>
                <meta name="description" content="Layanan rekayasa software kustom KyySolutions: Web Apps, SaaS Multi-Tenant, Mobile Android/iOS, ERP Pergudangan, POS Kasir, dan Integrasi AI Bot." />
            </Head>

            <div className="bg-[#F8FAFC] text-[#0F172A] pt-28 pb-20">
                
                {/* ═══════════════════════════════════════════════════════
                    1. HERO HEADER SECTION
                   ═══════════════════════════════════════════════════════ */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 text-center">
                    
                    {/* Eyebrow */}
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-bold uppercase tracking-wider mb-6 shadow-xs"
                    >
                        <Zap className="w-3.5 h-3.5 text-[#2563EB]" />
                        <span>Layanan Pengembangan Software Kustom</span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] tracking-tight leading-[1.15] max-w-4xl mx-auto"
                    >
                        Solusi Rekayasa Perangkat Lunak Skala <span className="text-[#2563EB]">Enterprise & Startup</span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mt-6 leading-relaxed"
                    >
                        Dari konsep arsitektur hingga *production launch*, tim senior software engineer KyySolutions membangun aplikasi web, mobile, ERP, dan agen AI yang teruji aman, cepat, dan 100% hak milik Anda.
                    </motion.p>

                    {/* Hero CTA Action Buttons */}
                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
                    >
                        <button
                            onClick={openContact}
                            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center space-x-2 transition-all cursor-pointer hover:-translate-y-0.5"
                        >
                            <MessageSquare className="w-4 h-4" />
                            <span>Konsultasi Proyek Gratis</span>
                        </button>

                        <a
                            href="#calculator"
                            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-[#0F172A] font-bold text-sm shadow-xs flex items-center justify-center space-x-2 transition-all"
                        >
                            <Calculator className="w-4 h-4 text-slate-500" />
                            <span>Hitung Estimasi Biaya</span>
                        </a>
                    </motion.div>

                    {/* 3 Key Trust Badges */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mt-12 pt-8 border-t border-slate-200">
                        <div className="flex items-center justify-center space-x-2 text-xs font-semibold text-slate-700">
                            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>Garansi Pemeliharaan 6 Bulan</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2 text-xs font-semibold text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                            <span>100% Hak Milik Source Code</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2 text-xs font-semibold text-slate-700">
                            <Cpu className="w-4 h-4 text-indigo-600 shrink-0" />
                            <span>SLA Uptime & Bug-Free 99.8%</span>
                        </div>
                    </div>

                </section>

                {/* ═══════════════════════════════════════════════════════
                    2. SERVICES CATALOG GRID (6 Pillars)
                   ═══════════════════════════════════════════════════════ */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                            Spesialisasi & Bidang Keahlian Kami
                        </h2>
                        <p className="text-sm text-slate-500 mt-2">
                            Pilih modul layanan yang sesuai dengan skala dan sasaran teknologi bisnis Anda.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.08 }}
                                className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all flex flex-col justify-between group"
                            >
                                <div className="space-y-4">
                                    
                                    {/* Top Card Bar: Icon & Badge */}
                                    <div className="flex items-center justify-between">
                                        <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2563EB] border border-blue-100 flex items-center justify-center group-hover:scale-105 group-hover:bg-[#2563EB] group-hover:text-white transition-all shadow-xs">
                                            <ServiceIcon name={service.icon} className="w-6 h-6" />
                                        </div>
                                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                                            {service.badge}
                                        </span>
                                    </div>

                                    {/* Category & Title */}
                                    <div>
                                        <span className="text-[11px] font-bold text-[#2563EB] uppercase tracking-wider block mb-1">
                                            {service.category}
                                        </span>
                                        <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors leading-snug">
                                            {service.title}
                                        </h3>
                                        <p className="text-xs text-slate-600 leading-relaxed mt-2">
                                            {service.description}
                                        </p>
                                    </div>

                                    {/* Deliverables checklist */}
                                    <div className="pt-2 space-y-2 border-t border-slate-100">
                                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Cakupan Deliverables:</span>
                                        {service.deliverables.map((item, dIdx) => (
                                            <div key={dIdx} className="flex items-start space-x-2 text-xs text-slate-700">
                                                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Tech Stack Pills */}
                                    <div className="pt-2 flex flex-wrap gap-1.5">
                                        {service.techStack.map((tech, tIdx) => (
                                            <span key={tIdx} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                </div>

                                {/* Bottom Price & Order Action */}
                                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                                    <div>
                                        <span className="text-[10px] text-slate-400 font-medium block">Mulai Dari</span>
                                        <span className="text-base font-extrabold text-[#0F172A]">{service.startingPrice}</span>
                                        <span className="text-[10px] text-slate-500 block">Est: {service.timeline}</span>
                                    </div>

                                    <button
                                        onClick={() => {
                                            const text = `Halo KyySolutions, saya tertarik dengan layanan *${service.title}*. Bisakah berdiskusi mengenai kebutuhan teknis proyek saya?`;
                                            window.open(`https://wa.me/6281232916758?text=${encodeURIComponent(text)}`, '_blank');
                                        }}
                                        className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-[#2563EB] text-[#2563EB] hover:text-white text-xs font-bold transition-colors inline-flex items-center space-x-1.5 cursor-pointer shadow-2xs"
                                    >
                                        <span>Pesan Jasa</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                </div>

                            </motion.div>
                        ))}
                    </div>

                </section>

                {/* ═══════════════════════════════════════════════════════
                    3. INTERACTIVE PROJECT COST ESTIMATOR
                   ═══════════════════════════════════════════════════════ */}
                <section id="calculator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24">
                    
                    <div className="bg-gradient-to-br from-[#06152E] via-[#091E3E] to-[#041126] rounded-3xl p-6 sm:p-10 lg:p-14 text-white shadow-2xl border border-blue-900/40 relative overflow-hidden">
                        
                        {/* Glow decorative */}
                        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative z-10 max-w-2xl mb-10">
                            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-blue-500/20 text-[#60A5FA] text-xs font-bold uppercase tracking-wider mb-3">
                                <Calculator className="w-3.5 h-3.5 text-[#60A5FA]" />
                                <span>Kalkulator Estimasi Biaya & Waktu</span>
                            </div>
                            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                                Hitung Transparan Rencana Anggaran Software Anda
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 mt-2">
                                Sesuaikan jenis platform, kompleksitas arsitektur, dan fitur integrasi untuk melihat simulasi estimasi instan.
                            </p>
                        </div>

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            
                            {/* Left Options Form (7 cols) */}
                            <div className="lg:col-span-7 space-y-6 text-xs">
                                
                                {/* 1. Platform Type */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-200">1. Pilih Tipe Platform:</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                                        {Object.entries(platformRates).map(([key, val]) => (
                                            <button
                                                key={key}
                                                type="button"
                                                onClick={() => setCalcPlatform(key)}
                                                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                                                    calcPlatform === key 
                                                        ? 'bg-blue-600 text-white border-blue-400 shadow-md' 
                                                        : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                                                }`}
                                            >
                                                <div className="font-bold text-xs">{val.title}</div>
                                                <div className={`text-[10px] mt-0.5 ${calcPlatform === key ? 'text-blue-100' : 'text-slate-400'}`}>
                                                    Mulai {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val.base)}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* 2. Complexity Scale */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-200">2. Skala & Kompleksitas Sistem:</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                                        {Object.entries(scaleMultipliers).map(([key, val]) => (
                                            <button
                                                key={key}
                                                type="button"
                                                onClick={() => setCalcScale(key)}
                                                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                                                    calcScale === key 
                                                        ? 'bg-blue-600 text-white border-blue-400 shadow-md' 
                                                        : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                                                }`}
                                            >
                                                <div className="font-bold text-xs">{val.title}</div>
                                                <div className={`text-[10px] mt-0.5 ${calcScale === key ? 'text-blue-100' : 'text-slate-400'}`}>
                                                    Estimasi: {val.weeks}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* 3. Addon Features */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-200">3. Fitur Tambahan & Integrasi:</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {addonOptions.map((addon) => {
                                            const isSelected = calcAddons.includes(addon.id);
                                            return (
                                                <button
                                                    key={addon.id}
                                                    type="button"
                                                    onClick={() => toggleAddon(addon.id)}
                                                    className={`p-2.5 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                                                        isSelected 
                                                            ? 'bg-blue-500/20 text-white border-blue-400' 
                                                            : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                                                    }`}
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <div className={`w-4 h-4 rounded flex items-center justify-center border ${isSelected ? 'bg-[#2563EB] border-[#60A5FA]' : 'border-slate-500'}`}>
                                                            {isSelected && <Check className="w-3 h-3 text-white" />}
                                                        </div>
                                                        <span className="font-medium text-xs">{addon.title}</span>
                                                    </div>
                                                    <span className="text-[10px] text-blue-300 font-semibold ml-2">
                                                        +{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(addon.price)}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                            </div>

                            {/* Right Live Estimate Output Box (5 cols) */}
                            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
                                
                                <div>
                                    <span className="text-[11px] font-bold text-blue-300 uppercase tracking-widest block">
                                        Hasil Simulasi Estimasi
                                    </span>
                                    
                                    <div className="mt-4">
                                        <span className="text-xs text-slate-300 block">Estimasi Investasi Proyek:</span>
                                        <div className="text-3xl sm:text-4xl font-black text-white mt-1">
                                            {calculatedEstimate.formatted}
                                        </div>
                                        <span className="text-[11px] text-slate-300 mt-1 block">
                                            *Biaya dapat dinegosiasikan sesuai batasan sprint & deliverable.
                                        </span>
                                    </div>

                                    {/* Timeline & SLA */}
                                    <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-white/10">
                                        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                                            <div className="flex items-center space-x-1.5 text-blue-300 text-[11px] font-semibold">
                                                <Clock className="w-3.5 h-3.5" />
                                                <span>Waktu Pengerjaan</span>
                                            </div>
                                            <div className="text-sm font-bold text-white mt-1">
                                                {calculatedEstimate.timeline}
                                            </div>
                                        </div>

                                        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                                            <div className="flex items-center space-x-1.5 text-emerald-400 text-[11px] font-semibold">
                                                <ShieldCheck className="w-3.5 h-3.5" />
                                                <span>Garansi Bug-Free</span>
                                            </div>
                                            <div className="text-sm font-bold text-white mt-1">
                                                6 Bulan Penuh
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="space-y-2 pt-4">
                                    <button
                                        onClick={handleSendEstimatorToWA}
                                        className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs font-bold shadow-lg shadow-emerald-500/25 flex items-center justify-center space-x-2 transition-all cursor-pointer"
                                    >
                                        <MessageSquare className="w-4 h-4" />
                                        <span>Kirim Estimasi & Konsultasi ke WhatsApp</span>
                                    </button>
                                </div>

                            </div>

                        </div>

                    </div>

                </section>

                {/* ═══════════════════════════════════════════════════════
                    4. STRUCTURED DEVELOPMENT WORKFLOW (5 Steps)
                   ═══════════════════════════════════════════════════════ */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider block mb-2">
                            Alur Pengerjaan Standar Industri
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                            Metodologi Agile yang Terstruktur & Transparan
                        </h2>
                        <p className="text-sm text-slate-500 mt-2">
                            Setiap tahapan dikawal oleh Project Manager dan Technical Lead untuk memastikan rilis tepat waktu tanpa kendala teknis.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {workflow.map((step, idx) => (
                            <div 
                                key={idx} 
                                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between relative group"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-black text-[#2563EB]/40 group-hover:text-[#2563EB] transition-colors font-mono">
                                            {step.step}
                                        </span>
                                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center">
                                            <ServiceIcon name={step.icon} className="w-4 h-4" />
                                        </div>
                                    </div>
                                    <h4 className="text-sm font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors leading-snug">
                                        {step.title}
                                    </h4>
                                    <p className="text-xs text-slate-500 leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </section>

                {/* ═══════════════════════════════════════════════════════
                    5. BOTTOM CTA CONSULTATION BANNER
                   ═══════════════════════════════════════════════════════ */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                    <div className="bg-white rounded-3xl border border-blue-200 p-8 sm:p-12 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="space-y-3 max-w-xl text-center lg:text-left">
                            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                                Siap Mewujudkan Ide Software Anda?
                            </h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Diskusikan spesifikasi kebutuhan aplikasi Anda bersama Senior Tech Lead KyySolutions. Dapatkan dokumen rekomendasi arsitektur dan penawaran resmi gratis.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full lg:w-auto">
                            <button
                                onClick={openContact}
                                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center justify-center space-x-2 transition-all cursor-pointer"
                            >
                                <MessageSquare className="w-4 h-4" />
                                <span>Hubungi Tim Sales</span>
                            </button>

                            <Link
                                href="/marketplace"
                                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center space-x-1.5"
                            >
                                <span>Lihat Template Siap Pakai</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>
                </section>

            </div>
        </PublicLayout>
    );
}
