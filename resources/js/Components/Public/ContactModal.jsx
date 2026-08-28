import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    X, 
    Send, 
    MessageSquare, 
    Check, 
    Layers, 
    DollarSign, 
    Calendar, 
    User, 
    Building, 
    FileText,
    CheckCircle2
} from 'lucide-react';
import { useLanguage } from '@/Context/LanguageContext';

export default function ContactModal({ isOpen, onClose }) {
    const { lang } = useLanguage();

    const [selectedServices, setSelectedServices] = useState(['Website Development']);
    const [selectedBudget, setSelectedBudget] = useState('Rp 10 – 25 Juta');
    const [selectedTimeline, setSelectedTimeline] = useState('1 Bulan');
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [description, setDescription] = useState('');

    const serviceOptions = [
        'Website Development',
        'Web Applications / SaaS',
        'Mobile Apps (iOS & Android)',
        'Custom Enterprise Software',
        'UI/UX Design & Figma',
        'API & System Integration',
        'Server & Maintenance SLA'
    ];

    const budgetOptions = [
        '< Rp 10 Juta',
        'Rp 10 – 25 Juta',
        'Rp 25 – 50 Juta',
        '> Rp 50 Juta'
    ];

    const timelineOptions = [
        lang === 'ID' ? '1 – 2 Minggu' : '1 – 2 Weeks',
        lang === 'ID' ? '1 Bulan' : '1 Month',
        lang === 'ID' ? '2 – 3 Bulan' : '2 – 3 Months',
        lang === 'ID' ? 'Fleksibel' : 'Flexible'
    ];

    const toggleService = (svc) => {
        if (selectedServices.includes(svc)) {
            if (selectedServices.length > 1) {
                setSelectedServices(selectedServices.filter(s => s !== svc));
            }
        } else {
            setSelectedServices([...selectedServices, svc]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const text = lang === 'ID'
            ? `Halo KyySolutions, saya ingin konsultasi proyek baru:\n\n` +
              `📌 Layanan: ${selectedServices.join(', ')}\n` +
              `💰 Estimasi Budget: ${selectedBudget}\n` +
              `⏱️ Target Timeline: ${selectedTimeline}\n` +
              `👤 Nama: ${name || '-'}\n` +
              `🏢 Perusahaan/Email: ${company || '-'}\n` +
              `📝 Catatan Proyek: ${description || '-'}`
            : `Hello KyySolutions, I would like to discuss a new project:\n\n` +
              `📌 Services: ${selectedServices.join(', ')}\n` +
              `💰 Estimated Budget: ${selectedBudget}\n` +
              `⏱️ Target Timeline: ${selectedTimeline}\n` +
              `👤 Name: ${name || '-'}\n` +
              `🏢 Company/Email: ${company || '-'}\n` +
              `📝 Project Details: ${description || '-'}`;

        const url = `https://wa.me/6281234567890?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs">
                    
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.25 }}
                        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[90vh] flex flex-col"
                    >
                        {/* Header */}
                        <div className="px-6 sm:px-8 pt-7 pb-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-50/50 to-indigo-50/30">
                            <div>
                                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#2563EB] bg-blue-100/60 px-2.5 py-0.5 rounded-full mb-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                                    <span>{lang === 'ID' ? 'KONSULTASI GRATIS' : 'FREE CONSULTATION'}</span>
                                </div>
                                <h3 className="text-xl sm:text-2xl font-extrabold text-[#14213D] tracking-tight">
                                    {lang === 'ID' ? 'Mulai Proyek Digital Anda' : 'Start Your Digital Project'}
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-500 font-normal">
                                    {lang === 'ID' ? 'Pilih kebutuhan dan dapatkan estimasi solusi dalam 24 jam.' : 'Select requirements & get a custom proposal within 24 hours.'}
                                </p>
                            </div>

                            <button
                                onClick={onClose}
                                className="w-9 h-9 rounded-full bg-white hover:bg-slate-100 text-slate-500 flex items-center justify-center transition-colors shadow-2xs cursor-pointer shrink-0"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Form Body */}
                        <form onSubmit={handleSubmit} className="p-6 sm:p-8 overflow-y-auto space-y-6">
                            
                            {/* Step 1: Services Selection */}
                            <div>
                                <label className="text-xs font-bold text-[#14213D] uppercase tracking-wider block mb-2.5">
                                    1. {lang === 'ID' ? 'Pilih Layanan yang Dibutuhkan' : 'Select Needed Services'}
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {serviceOptions.map((svc) => {
                                        const isSelected = selectedServices.includes(svc);
                                        return (
                                            <button
                                                type="button"
                                                key={svc}
                                                onClick={() => toggleService(svc)}
                                                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-150 flex items-center cursor-pointer ${
                                                    isSelected
                                                        ? 'bg-[#2563EB] text-white shadow-sm shadow-blue-500/25'
                                                        : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                                                }`}
                                            >
                                                {isSelected && <Check className="w-3.5 h-3.5 mr-1.5" />}
                                                <span>{svc}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Step 2: Budget Range */}
                            <div>
                                <label className="text-xs font-bold text-[#14213D] uppercase tracking-wider block mb-2.5">
                                    2. {lang === 'ID' ? 'Estimasi Anggaran Proyek' : 'Estimated Budget Range'}
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                    {budgetOptions.map((bg) => (
                                        <button
                                            type="button"
                                            key={bg}
                                            onClick={() => setSelectedBudget(bg)}
                                            className={`p-2.5 rounded-xl text-xs font-bold text-center transition-all cursor-pointer ${
                                                selectedBudget === bg
                                                    ? 'bg-blue-50 border-2 border-[#2563EB] text-[#2563EB] shadow-2xs'
                                                    : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                                            }`}
                                        >
                                            {bg}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Step 3: Timeline */}
                            <div>
                                <label className="text-xs font-bold text-[#14213D] uppercase tracking-wider block mb-2.5">
                                    3. {lang === 'ID' ? 'Target Waktu Peluncuran' : 'Target Launch Timeline'}
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                    {timelineOptions.map((tl) => (
                                        <button
                                            type="button"
                                            key={tl}
                                            onClick={() => setSelectedTimeline(tl)}
                                            className={`p-2.5 rounded-xl text-xs font-bold text-center transition-all cursor-pointer ${
                                                selectedTimeline === tl
                                                    ? 'bg-blue-50 border-2 border-[#2563EB] text-[#2563EB] shadow-2xs'
                                                    : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                                            }`}
                                        >
                                            {tl}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Step 4: Contact Information */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-[#14213D] block mb-1.5">
                                        {lang === 'ID' ? 'Nama Lengkap *' : 'Full Name *'}
                                    </label>
                                    <div className="relative">
                                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                        <input
                                            type="text"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder={lang === 'ID' ? 'cth: Budi Santoso' : 'e.g. John Doe'}
                                            className="w-full h-11 pl-10 pr-3 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-[#14213D] block mb-1.5">
                                        {lang === 'ID' ? 'Perusahaan / Email *' : 'Company / Email *'}
                                    </label>
                                    <div className="relative">
                                        <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                        <input
                                            type="text"
                                            required
                                            value={company}
                                            onChange={(e) => setCompany(e.target.value)}
                                            placeholder={lang === 'ID' ? 'cth: PT Maju Digital / email@domain.com' : 'e.g. Acme Corp / email@domain.com'}
                                            className="w-full h-11 pl-10 pr-3 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Project Notes */}
                            <div>
                                <label className="text-xs font-bold text-[#14213D] block mb-1.5">
                                    {lang === 'ID' ? 'Deskripsi Singkat Kebutuhan (Opsional)' : 'Brief Project Details (Optional)'}
                                </label>
                                <textarea
                                    rows={3}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder={lang === 'ID' ? 'Ceritakan fitur utama atau referensi website/aplikasi yang diinginkan...' : 'Describe main features or website/app references...'}
                                    className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 resize-none"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#2563EB] text-white text-sm font-extrabold shadow-lg shadow-blue-500/25 flex items-center justify-center space-x-2 transition-all duration-200 cursor-pointer"
                                >
                                    <Send className="w-4 h-4" />
                                    <span>{lang === 'ID' ? 'Kirim Konsultasi via WhatsApp' : 'Submit Consultation via WhatsApp'}</span>
                                </button>
                                <div className="flex items-center justify-center space-x-4 text-[11px] text-slate-400 font-medium mt-3">
                                    <span className="flex items-center"><CheckCircle2 className="w-3 h-3 text-emerald-500 mr-1" /> 100% Free Consultation</span>
                                    <span className="flex items-center"><CheckCircle2 className="w-3 h-3 text-emerald-500 mr-1" /> NDA Protected</span>
                                </div>
                            </div>

                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
