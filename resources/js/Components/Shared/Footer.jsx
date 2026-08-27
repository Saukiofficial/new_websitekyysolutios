import { Link } from '@inertiajs/react';
import { 
    Phone, 
    Mail, 
    MapPin, 
    MessageCircle,
    ArrowUp
} from 'lucide-react';
import { 
    FaGithub, 
    FaLinkedinIn, 
    FaInstagram, 
    FaFacebookF 
} from 'react-icons/fa6';

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#0B1220] text-slate-400 text-sm border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
                
                {/* Main 5+1 Columns Grid (Section 22) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8 pb-12 border-b border-slate-800/80">
                    
                    {/* Brand Column (2 cols on lg) */}
                    <div className="lg:col-span-2 space-y-4">
                        <Link href="/" className="flex items-center space-x-2.5">
                            <img 
                                src="/images/logo/logo.png" 
                                alt="KyySolutions Logo" 
                                className="w-9 h-9 object-contain rounded-lg shadow-sm" 
                            />
                            <span className="text-xl font-bold text-white tracking-tight">
                                Kyy<span className="text-[#2563EB]">Solutions</span>
                            </span>
                        </Link>
                        
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal max-w-sm">
                            Building digital solutions that empower businesses and drive sustainable growth. From concept to enterprise-scale deployment.
                        </p>

                        {/* Social Links (Section 22) */}
                        <div className="flex items-center space-x-3 pt-2">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                                aria-label="GitHub"
                            >
                                <FaGithub className="w-3.5 h-3.5" />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedinIn className="w-3.5 h-3.5" />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                                aria-label="Instagram"
                            >
                                <FaInstagram className="w-3.5 h-3.5" />
                            </a>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                                aria-label="Facebook"
                            >
                                <FaFacebookF className="w-3.5 h-3.5" />
                            </a>
                            <a
                                href="https://wa.me/6281234567890"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                                aria-label="WhatsApp"
                            >
                                <MessageCircle className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Column 1: Company */}
                    <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
                            Company
                        </h4>
                        <ul className="space-y-2.5 text-xs sm:text-sm">
                            <li>
                                <a href="#services" className="hover:text-white transition-colors">About Us</a>
                            </li>
                            <li>
                                <a href="#why-us" className="hover:text-white transition-colors">Our Team</a>
                            </li>
                            <li>
                                <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
                            </li>
                            <li>
                                <a href="#cta" className="hover:text-white transition-colors">Careers</a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 2: Services */}
                    <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
                            Services
                        </h4>
                        <ul className="space-y-2.5 text-xs sm:text-sm">
                            <li>
                                <a href="#services" className="hover:text-white transition-colors">Web Development</a>
                            </li>
                            <li>
                                <a href="#services" className="hover:text-white transition-colors">Mobile Development</a>
                            </li>
                            <li>
                                <a href="#services" className="hover:text-white transition-colors">UI/UX Design</a>
                            </li>
                            <li>
                                <a href="#services" className="hover:text-white transition-colors">API Development</a>
                            </li>
                            <li>
                                <a href="#services" className="hover:text-white transition-colors">Maintenance</a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Products */}
                    <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
                            Products
                        </h4>
                        <ul className="space-y-2.5 text-xs sm:text-sm">
                            <li>
                                <a href="#marketplace" className="hover:text-white transition-colors">Marketplace</a>
                            </li>
                            <li>
                                <a href="#marketplace" className="hover:text-white transition-colors">SaaS Systems</a>
                            </li>
                            <li>
                                <a href="#marketplace" className="hover:text-white transition-colors">UI Kits</a>
                            </li>
                            <li>
                                <a href="#marketplace" className="hover:text-white transition-colors">Templates</a>
                            </li>
                            <li>
                                <a href="#marketplace" className="hover:text-white transition-colors">Plugins</a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Contact */}
                    <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
                            Contact
                        </h4>
                        <ul className="space-y-3 text-xs">
                            <li className="flex items-start space-x-2">
                                <Mail className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                                <span>contact@kyysolutions.com</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <Phone className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                                <span>+62 812-3456-7890</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <MapPin className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                                <span>Jakarta & Yogyakarta, Indonesia</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Copyright & Back to Top (Section 22) */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <p>© {currentYear} KyySolutions. All rights reserved.</p>

                    <div className="flex items-center space-x-6">
                        <a href="#cta" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
                        <a href="#cta" className="hover:text-slate-400 transition-colors">Terms of Service</a>
                        <button
                            onClick={scrollToTop}
                            className="flex items-center space-x-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        >
                            <span>Back to Top</span>
                            <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>

            </div>
        </footer>
    );
}
