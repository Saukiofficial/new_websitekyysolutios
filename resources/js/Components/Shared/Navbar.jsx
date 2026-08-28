import { useState, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';
import { Menu, X, ChevronDown, ArrowRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/Context/LanguageContext';

// Crisp vector Flag of the United Kingdom (English)
const UKFlag = () => (
    <svg className="w-4.5 h-3 rounded-[2px] shadow-xs shrink-0 object-cover" viewBox="0 0 60 30" fill="none">
        <clipPath id="uk-flag-clip">
            <rect width="60" height="30" rx="2" />
        </clipPath>
        <g clipPath="url(#uk-flag-clip)">
            <rect width="60" height="30" fill="#012169" />
            <path d="M0 0L60 30M60 0L0 30" stroke="#FFFFFF" strokeWidth="6" />
            <path d="M0 0L60 30M60 0L0 30" stroke="#C8102E" strokeWidth="3.5" />
            <path d="M30 0V30M0 15H60" stroke="#FFFFFF" strokeWidth="10" />
            <path d="M30 0V30M0 15H60" stroke="#C8102E" strokeWidth="6" />
        </g>
    </svg>
);

// Crisp vector Flag of Indonesia (Bahasa)
const IDFlag = () => (
    <svg className="w-4.5 h-3 rounded-[2px] shadow-xs shrink-0 border border-slate-200/80" viewBox="0 0 60 30" fill="none">
        <clipPath id="id-flag-clip">
            <rect width="60" height="30" rx="2" />
        </clipPath>
        <g clipPath="url(#id-flag-clip)">
            <rect width="60" height="15" fill="#E70011" />
            <rect y="15" width="60" height="15" fill="#FFFFFF" />
        </g>
    </svg>
);

export default function Navbar({ onOpenContact }) {
    const { lang, setLanguage, t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [activeNav, setActiveNav] = useState('Home');
    const [langDropdown, setLangDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const navItems = [
        { name: t.nav.home, key: 'Home', href: '/' },
        { name: t.nav.services, key: 'Services', href: '#services' },
        { name: t.nav.products, key: 'Products', href: '#marketplace' },
        { name: t.nav.portfolio, key: 'Portfolio', href: '#portfolio' },
        { name: t.nav.whyUs, key: 'Why Us', href: '#why-us' },
        { name: t.nav.process, key: 'Process', href: '#how-it-works' },
    ];

    // Close language dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setLangDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-3 sm:pt-5 pointer-events-none">
            {/* Floating Rounded Navbar Container */}
            <motion.div 
                initial={{ opacity: 0, y: -25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-[1400px] mx-auto bg-white/90 backdrop-blur-md border border-blue-100/70 shadow-[0_8px_30px_rgb(20,33,61,0.06)] rounded-[20px] sm:rounded-[24px] px-5 sm:px-8 py-3.5 sm:py-4 h-[72px] sm:h-[80px] flex items-center justify-between pointer-events-auto transition-all duration-200"
            >
                {/* Left: Logo & Brand Name */}
                <Link href="/" className="flex items-center space-x-3 group shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center p-1.5 shadow-xs group-hover:scale-105 transition-transform duration-200">
                        <img 
                            src="/images/logo/logo.png" 
                            alt="KyySolutions Logo" 
                            className="w-full h-full object-contain" 
                        />
                    </div>
                    <div className="flex items-center">
                        <span className="text-xl font-extrabold text-[#14213D] tracking-tight">
                            Kyy<span className="text-[#2563EB]">Solutions</span>
                        </span>
                    </div>
                </Link>

                {/* Center: Horizontal Navigation Links */}
                <nav className="hidden lg:flex items-center space-x-8 xl:space-x-10">
                    {navItems.map((item) => {
                        const isActive = activeNav === item.key;
                        return (
                            <a
                                key={item.key}
                                href={item.href}
                                onClick={() => setActiveNav(item.key)}
                                className={`text-[15px] font-medium transition-colors duration-150 relative py-1 ${
                                    isActive 
                                        ? 'text-[#2563EB] font-semibold' 
                                        : 'text-[#14213D]/70 hover:text-[#2563EB]'
                                }`}
                            >
                                {item.name}
                                {isActive && (
                                    <motion.span 
                                        layoutId="activeNavIndicator"
                                        className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-1 bg-[#2563EB] rounded-full"
                                    />
                                )}
                            </a>
                        );
                    })}
                </nav>

                {/* Right: Language Selector (with Functional Switcher) + Contact Us CTA Button */}
                <div className="hidden lg:flex items-center space-x-4 shrink-0">
                    
                    {/* Language Selector Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setLangDropdown(!langDropdown)}
                            className="flex items-center space-x-2 px-3 py-1.5 text-xs font-semibold text-[#14213D]/80 hover:text-[#14213D] rounded-xl hover:bg-slate-100/80 border border-transparent hover:border-slate-200/70 transition-all cursor-pointer"
                            aria-label="Select language"
                        >
                            {/* Current Selected Flag */}
                            {lang === 'EN' ? <UKFlag /> : <IDFlag />}
                            <span>{lang}</span>
                            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${langDropdown ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {langDropdown && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute right-0 mt-2 w-36 bg-white border border-slate-200/90 rounded-2xl shadow-lg p-1.5 z-50 overflow-hidden"
                                >
                                    {/* English (UK) Option */}
                                    <button
                                        onClick={() => { setLanguage('EN'); setLangDropdown(false); }}
                                        className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
                                            lang === 'EN' 
                                                ? 'text-[#2563EB] bg-blue-50/70' 
                                                : 'text-slate-700 hover:bg-slate-50'
                                        }`}
                                    >
                                        <div className="flex items-center space-x-2.5">
                                            <UKFlag />
                                            <span>English</span>
                                        </div>
                                        {lang === 'EN' && <Check className="w-3.5 h-3.5 text-[#2563EB]" />}
                                    </button>

                                    {/* Bahasa Indonesia Option */}
                                    <button
                                        onClick={() => { setLanguage('ID'); setLangDropdown(false); }}
                                        className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
                                            lang === 'ID' 
                                                ? 'text-[#2563EB] bg-blue-50/70' 
                                                : 'text-slate-700 hover:bg-slate-50'
                                        }`}
                                    >
                                        <div className="flex items-center space-x-2.5">
                                            <IDFlag />
                                            <span>Indonesia</span>
                                        </div>
                                        {lang === 'ID' && <Check className="w-3.5 h-3.5 text-[#2563EB]" />}
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Contact Button */}
                    <button 
                        onClick={onOpenContact || (() => window.location.href = '#cta')}
                        className="px-6 py-2.5 rounded-[14px] bg-gradient-to-r from-[#2563EB] to-[#3B82F6] hover:from-[#1D4ED8] hover:to-[#2563EB] text-white text-sm font-semibold shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 inline-flex items-center group cursor-pointer"
                    >
                        <span>{t.nav.contactUs}</span>
                        <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Mobile Menu Toggle Button */}
                <div className="flex items-center lg:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 rounded-xl text-[#14213D] hover:bg-blue-50/60 focus:outline-none transition-colors"
                        aria-label="Toggle navigation menu"
                    >
                        {isOpen ? <X className="w-6 h-6 text-[#2563EB]" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </motion.div>

            {/* Mobile Drawer Menu */}
            {isOpen && (
                <div className="lg:hidden max-w-[1400px] mx-auto mt-2 bg-white/95 backdrop-blur-lg border border-blue-100 shadow-xl rounded-[20px] p-5 space-y-3 pointer-events-auto">
                    {/* Navigation items */}
                    <div className="space-y-1">
                        {navItems.map((item) => (
                            <a
                                key={item.key}
                                href={item.href}
                                onClick={() => { setActiveNav(item.key); setIsOpen(false); }}
                                className={`block px-4 py-2.5 text-sm rounded-xl font-medium transition-colors ${
                                    activeNav === item.key 
                                        ? 'bg-blue-50 text-[#2563EB] font-bold' 
                                        : 'text-[#14213D] hover:bg-slate-50'
                                }`}
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>

                    {/* Language Switcher in Mobile Drawer */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between px-2">
                        <span className="text-xs font-semibold text-slate-500">{t.nav.language}:</span>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setLanguage('EN')}
                                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                                    lang === 'EN' ? 'bg-blue-50 text-[#2563EB] border border-blue-200' : 'bg-slate-100 text-slate-600'
                                }`}
                            >
                                <UKFlag />
                                <span>EN</span>
                            </button>
                            <button
                                onClick={() => setLanguage('ID')}
                                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                                    lang === 'ID' ? 'bg-blue-50 text-[#2563EB] border border-blue-200' : 'bg-slate-100 text-slate-600'
                                }`}
                            >
                                <IDFlag />
                                <span>ID</span>
                            </button>
                        </div>
                    </div>

                    {/* Contact Action */}
                    <div className="pt-2">
                        <button 
                            onClick={() => { setIsOpen(false); if (onOpenContact) onOpenContact(); else window.location.href = '#cta'; }}
                            className="w-full py-3 rounded-[14px] bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white text-sm font-semibold shadow-md shadow-blue-500/25 flex items-center justify-center cursor-pointer"
                        >
                            <span>{t.nav.contactUs}</span>
                            <ArrowRight className="w-4 h-4 ml-1.5" />
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}
