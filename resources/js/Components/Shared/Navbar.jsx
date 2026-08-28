import { useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X, ChevronDown, Check, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/Context/LanguageContext';

// UK Flag Icon (SVG)
const UKFlag = () => (
    <svg className="w-5 h-3.5 rounded-[2px] shadow-xs object-cover" viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <clipPath id="uk-clip">
            <path d="M0 0v30h60V0H0z"/>
        </clipPath>
        <g clipPath="url(#uk-clip)">
            <path d="M0 0v30h60V0H0z" fill="#012169"/>
            <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6"/>
            <path d="M0 0l60 30m0-30L0 30" stroke="#C8102E" strokeWidth="4"/>
            <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10"/>
            <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6"/>
        </g>
    </svg>
);

// Indonesian Flag Icon (SVG)
const IDFlag = () => (
    <svg className="w-5 h-3.5 rounded-[2px] shadow-xs border border-slate-200 object-cover" viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <clipPath id="id-clip">
            <path d="M0 0v30h60V0H0z"/>
        </clipPath>
        <g clipPath="url(#id-clip)">
            <rect width="60" height="15" fill="#E70011" />
            <rect y="15" width="60" height="15" fill="#FFFFFF" />
        </g>
    </svg>
);

export default function Navbar({ onOpenContact }) {
    const { lang, setLanguage, t } = useLanguage();
    const { url } = usePage();
    const [isOpen, setIsOpen] = useState(false);
    const [langDropdown, setLangDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const navItems = [
        { name: t.nav.home, key: 'Home', href: '/' },
        { name: t.nav.services, key: 'Services', href: '/services' },
        { name: t.nav.products, key: 'Products', href: '/marketplace' },
        { name: t.nav.portfolio, key: 'Portfolio', href: '/portfolio' },
        { name: 'Blog', key: 'Blog', href: '/blog' },
        { name: t.nav.whyUs, key: 'Why Us', href: '/#why-us' },
        { name: t.nav.process, key: 'Process', href: '/#how-it-works' },
    ];

    const isCurrentActive = (item) => {
        if (item.key === 'Home') {
            return url === '/' || url === '';
        }
        if (item.key === 'Services') {
            return url.startsWith('/services');
        }
        if (item.key === 'Products') {
            return url.startsWith('/marketplace') || url.startsWith('/products');
        }
        if (item.key === 'Portfolio') {
            return url.startsWith('/portfolio');
        }
        if (item.key === 'Blog') {
            return url.startsWith('/blog');
        }
        if (item.key === 'Why Us') {
            return url.includes('#why-us');
        }
        if (item.key === 'Process') {
            return url.includes('#how-it-works');
        }
        return false;
    };

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
                    <img 
                        src="/images/logo/logo_no_bg.png" 
                        alt="KyySolutions Logo" 
                        className="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-200" 
                    />
                    <div className="flex items-center">
                        <span className="text-xl font-extrabold text-[#14213D] tracking-tight">
                            Kyy<span className="text-[#2563EB]">Solutions</span>
                        </span>
                    </div>
                </Link>

                {/* Center: Horizontal Navigation Links */}
                <nav className="hidden lg:flex items-center space-x-8 xl:space-x-10">
                    {navItems.map((item) => {
                        const isActive = isCurrentActive(item);
                        const isHash = item.href.startsWith('/#');

                        return isHash ? (
                            <a
                                key={item.key}
                                href={item.href}
                                className={`text-[15px] font-medium transition-colors duration-150 relative py-1 ${
                                    isActive 
                                        ? 'text-[#2563EB] font-bold' 
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
                        ) : (
                            <Link
                                key={item.key}
                                href={item.href}
                                className={`text-[15px] font-medium transition-colors duration-150 relative py-1 ${
                                    isActive 
                                        ? 'text-[#2563EB] font-bold' 
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
                            </Link>
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

                    {/* Login & Register Links */}
                    <Link
                        href="/login"
                        className="px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:text-[#2563EB] rounded-xl hover:bg-slate-100/80 transition-colors inline-flex items-center space-x-1"
                    >
                        <span>{lang === 'ID' ? 'Masuk' : 'Login'}</span>
                    </Link>

                    <Link
                        href="/register"
                        className="px-3.5 py-1.5 text-xs font-bold text-[#2563EB] bg-blue-50 hover:bg-blue-100/70 border border-blue-200/60 rounded-xl transition-colors inline-flex items-center space-x-1"
                    >
                        <span>{lang === 'ID' ? 'Daftar' : 'Register'}</span>
                    </Link>
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
                        {navItems.map((item) => {
                            const isActive = isCurrentActive(item);
                            const isHash = item.href.startsWith('/#');

                            return isHash ? (
                                <a
                                    key={item.key}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`block px-4 py-2.5 text-sm rounded-xl font-medium transition-colors ${
                                        isActive 
                                            ? 'bg-blue-50 text-[#2563EB] font-bold' 
                                            : 'text-[#14213D] hover:bg-slate-50'
                                    }`}
                                >
                                    {item.name}
                                </a>
                            ) : (
                                <Link
                                    key={item.key}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`block px-4 py-2.5 text-sm rounded-xl font-medium transition-colors ${
                                        isActive 
                                            ? 'bg-blue-50 text-[#2563EB] font-bold' 
                                            : 'text-[#14213D] hover:bg-slate-50'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
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

                    {/* Actions in Mobile Drawer */}
                    <div className="pt-2 space-y-2">
                        <Link
                            href="/login"
                            onClick={() => setIsOpen(false)}
                            className="w-full py-2.5 rounded-[14px] bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center transition-colors"
                        >
                            <span>{lang === 'ID' ? 'Masuk' : 'Login'}</span>
                        </Link>

                        <Link
                            href="/register"
                            onClick={() => setIsOpen(false)}
                            className="w-full py-2.5 rounded-[14px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-md shadow-blue-500/25 flex items-center justify-center transition-colors"
                        >
                            <span>{lang === 'ID' ? 'Daftar Akun Baru' : 'Register Account'}</span>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
