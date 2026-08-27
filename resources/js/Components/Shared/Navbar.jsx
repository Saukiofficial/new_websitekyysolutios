import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { Menu, X, ChevronDown, Globe, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeNav, setActiveNav] = useState('Home');
    const [lang, setLang] = useState('EN');
    const [langDropdown, setLangDropdown] = useState(false);

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'Services', href: '#services' },
        { name: 'Products', href: '#marketplace' },
        { name: 'Portfolio', href: '#portfolio' },
        { name: 'Why Us', href: '#why-us' },
        { name: 'Process', href: '#how-it-works' },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-3 sm:pt-5 pointer-events-none">
            {/* Floating Rounded Navbar Container (Section 2) */}
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
                        const isActive = activeNav === item.name;
                        return (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={() => setActiveNav(item.name)}
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

                {/* Right: Language Selector + Contact Us CTA Button */}
                <div className="hidden lg:flex items-center space-x-4 shrink-0">
                    {/* Language Selector */}
                    <div className="relative">
                        <button
                            onClick={() => setLangDropdown(!langDropdown)}
                            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-[#14213D]/70 hover:text-[#14213D] rounded-lg hover:bg-slate-100/80 transition-colors cursor-pointer"
                        >
                            <Globe className="w-4 h-4 text-[#2563EB]" />
                            <span>{lang}</span>
                            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                        </button>

                        {langDropdown && (
                            <div className="absolute right-0 mt-2 w-28 bg-white border border-slate-200/90 rounded-xl shadow-lg py-1.5 z-50">
                                <button
                                    onClick={() => { setLang('EN'); setLangDropdown(false); }}
                                    className={`w-full text-left px-3.5 py-1.5 text-xs font-medium ${lang === 'EN' ? 'text-[#2563EB] bg-blue-50/60 font-semibold' : 'text-slate-700 hover:bg-slate-50'}`}
                                >
                                    EN (English)
                                </button>
                                <button
                                    onClick={() => { setLang('ID'); setLangDropdown(false); }}
                                    className={`w-full text-left px-3.5 py-1.5 text-xs font-medium ${lang === 'ID' ? 'text-[#2563EB] bg-blue-50/60 font-semibold' : 'text-slate-700 hover:bg-slate-50'}`}
                                >
                                    ID (Bahasa)
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Contact Button */}
                    <a href="#cta">
                        <button className="px-6 py-2.5 rounded-[14px] bg-gradient-to-r from-[#2563EB] to-[#3B82F6] hover:from-[#1D4ED8] hover:to-[#2563EB] text-white text-sm font-semibold shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 inline-flex items-center group cursor-pointer">
                            <span>Contact Us</span>
                            <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </a>
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
                <div className="lg:hidden max-w-[1400px] mx-auto mt-2 bg-white/95 backdrop-blur-lg border border-blue-100 shadow-xl rounded-[20px] p-5 space-y-2 pointer-events-auto">
                    {navItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            onClick={() => { setActiveNav(item.name); setIsOpen(false); }}
                            className={`block px-4 py-2.5 text-sm rounded-xl font-medium transition-colors ${
                                activeNav === item.name 
                                    ? 'bg-blue-50 text-[#2563EB] font-bold' 
                                    : 'text-[#14213D] hover:bg-slate-50'
                            }`}
                        >
                            {item.name}
                        </a>
                    ))}
                    <div className="pt-3 border-t border-slate-100">
                        <a href="#cta" onClick={() => setIsOpen(false)} className="w-full block">
                            <button className="w-full py-3 rounded-[14px] bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white text-sm font-semibold shadow-md shadow-blue-500/25 flex items-center justify-center">
                                <span>Contact Us</span>
                                <ArrowRight className="w-4 h-4 ml-1.5" />
                            </button>
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}
