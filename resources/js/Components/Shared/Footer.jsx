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
import { useLanguage } from '@/Context/LanguageContext';

export default function Footer() {
    const { t } = useLanguage();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#0B1220] text-slate-400 text-sm border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
                
                {/* Main 5+1 Columns Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8 pb-12 border-b border-slate-800/80">
                    
                    {/* Brand Column (2 cols on lg) */}
                    <div className="lg:col-span-2 space-y-4">
                        <Link href="/" className="flex items-center space-x-2.5">
                            <img 
                                src="/images/logo/logo_no_bg.png" 
                                alt="KyySolutions Logo" 
                                className="h-9 w-auto object-contain" 
                            />
                            <span className="text-xl font-bold text-white tracking-tight">
                                Kyy<span className="text-[#2563EB]">Solutions</span>
                            </span>
                        </Link>
                        
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal max-w-sm">
                            {t.footer.description}
                        </p>

                        {/* Social Links */}
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
                            {t.footer.company}
                        </h4>
                        <ul className="space-y-2.5 text-xs sm:text-sm">
                            <li>
                                <a href="#services" className="hover:text-white transition-colors">{t.footer.aboutUs}</a>
                            </li>
                            <li>
                                <a href="#why-us" className="hover:text-white transition-colors">{t.footer.ourTeam}</a>
                            </li>
                            <li>
                                <a href="#portfolio" className="hover:text-white transition-colors">{t.portfolio.title}</a>
                            </li>
                            <li>
                                <a href="#cta" className="hover:text-white transition-colors">{t.footer.careers}</a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 2: Services */}
                    <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
                            {t.footer.services}
                        </h4>
                        <ul className="space-y-2.5 text-xs sm:text-sm">
                            <li>
                                <a href="#services" className="hover:text-white transition-colors">{t.footer.webDev}</a>
                            </li>
                            <li>
                                <a href="#services" className="hover:text-white transition-colors">{t.footer.mobileDev}</a>
                            </li>
                            <li>
                                <a href="#services" className="hover:text-white transition-colors">{t.footer.uiUxDesign}</a>
                            </li>
                            <li>
                                <a href="#services" className="hover:text-white transition-colors">{t.footer.apiDev}</a>
                            </li>
                            <li>
                                <a href="#services" className="hover:text-white transition-colors">{t.footer.maintenance}</a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Products */}
                    <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
                            {t.footer.products}
                        </h4>
                        <ul className="space-y-2.5 text-xs sm:text-sm">
                            <li>
                                <a href="#marketplace" className="hover:text-white transition-colors">{t.footer.marketplace}</a>
                            </li>
                            <li>
                                <a href="#marketplace" className="hover:text-white transition-colors">{t.footer.saasSystems}</a>
                            </li>
                            <li>
                                <a href="#marketplace" className="hover:text-white transition-colors">{t.footer.uiKits}</a>
                            </li>
                            <li>
                                <a href="#marketplace" className="hover:text-white transition-colors">{t.footer.templates}</a>
                            </li>
                            <li>
                                <a href="#marketplace" className="hover:text-white transition-colors">{t.footer.plugins}</a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Contact */}
                    <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
                            {t.footer.contact}
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
                                <span>{t.footer.location}</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Copyright & Back to Top */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <p>© {currentYear} KyySolutions. {t.footer.allRightsReserved}</p>

                    <div className="flex items-center space-x-6">
                        <a href="#cta" className="hover:text-slate-400 transition-colors">{t.footer.privacyPolicy}</a>
                        <a href="#cta" className="hover:text-slate-400 transition-colors">{t.footer.termsOfService}</a>
                        <button
                            onClick={scrollToTop}
                            className="flex items-center space-x-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        >
                            <span>{t.footer.backToTop}</span>
                            <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>

            </div>
        </footer>
    );
}
