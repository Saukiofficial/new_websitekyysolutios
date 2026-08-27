import { motion } from 'framer-motion';
import { 
    ArrowRight, 
    LayoutGrid, 
    Zap, 
    Rocket, 
    Headphones
} from 'lucide-react';
import { staggerContainer, staggerItem } from '@/Lib/animations';

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-white pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-24">
            
            {/* Subtle Ambient Background Elements (Section 12) */}
            <div className="absolute inset-0 bg-dot-light opacity-40 pointer-events-none" />
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-blue-100/40 via-blue-50/20 to-transparent blur-3xl rounded-full pointer-events-none" />
            <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-blue-100/30 blur-3xl rounded-full pointer-events-none" />
            
            {/* Subtle curved background flow wave lines (Section 12) */}
            <svg 
                className="absolute right-0 bottom-10 w-[700px] h-[400px] pointer-events-none opacity-40" 
                viewBox="0 0 700 400" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M0 350C180 320 320 380 480 330C600 290 660 180 700 120" stroke="url(#blueWave)" strokeWidth="1.5" />
                <path d="M50 370C220 340 360 400 520 350C640 310 680 200 700 160" stroke="url(#blueWave)" strokeWidth="1" strokeDasharray="4 4" />
                <path d="M100 390C260 360 400 420 560 370C680 330 700 240 700 200" stroke="url(#blueWave)" strokeWidth="0.75" />
                <defs>
                    <linearGradient id="blueWave" x1="0" y1="200" x2="700" y2="200" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#93C5FD" stopOpacity="0.1" />
                        <stop stopColor="#3B82F6" stopOpacity="0.4" />
                        <stop stopColor="#2563EB" stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>

            <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Main 2-Column Grid (45% Left / 55% Right) */}
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-4 sm:pt-8">
                    
                    {/* ================= LEFT CONTENT (Section 4, 5, 6) ================= */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="lg:col-span-5 xl:col-span-5 text-left"
                    >
                        {/* A. Eyebrow Badge (Section 4A) */}
                        <motion.div 
                            variants={staggerItem} 
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-100 text-[#2563EB] text-xs font-semibold mb-6 shadow-xs"
                        >
                            <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                            <span>Digital Solutions for Modern Business</span>
                        </motion.div>

                        {/* B. Main Headline (Section 4B) */}
                        <motion.h1
                            variants={staggerItem}
                            className="text-4xl sm:text-5xl lg:text-[56px] xl:text-[64px] font-extrabold text-[#14213D] leading-[1.08] tracking-tight mb-6"
                        >
                            We Build Powerful{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#4F46E5] block">
                                Digital Solutions
                            </span>{' '}
                            That Drive Results
                        </motion.h1>

                        {/* C. Description (Section 4C) */}
                        <motion.p
                            variants={staggerItem}
                            className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-[540px] font-normal"
                        >
                            We craft high-performance websites, applications, and digital products that help businesses grow, scale, and succeed in the digital era.
                        </motion.p>

                        {/* CTA Buttons (Section 5) */}
                        <motion.div 
                            variants={staggerItem} 
                            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10"
                        >
                            {/* Primary Button */}
                            <a href="#services">
                                <button className="w-full sm:w-auto h-[54px] px-8 rounded-[14px] bg-gradient-to-r from-[#2563EB] to-[#3B82F6] hover:from-[#1D4ED8] hover:to-[#2563EB] text-white font-semibold text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 inline-flex items-center justify-center group cursor-pointer">
                                    <span>Explore Services</span>
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </a>

                            {/* Secondary Button */}
                            <a href="#marketplace">
                                <button className="w-full sm:w-auto h-[54px] px-7 rounded-[14px] bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-[#14213D] font-semibold text-sm shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 inline-flex items-center justify-center group cursor-pointer">
                                    <LayoutGrid className="w-4 h-4 mr-2 text-[#2563EB]" />
                                    <span>Browse Marketplace</span>
                                </button>
                            </a>
                        </motion.div>

                        {/* Feature Highlights (Section 6) */}
                        <motion.div 
                            variants={staggerItem} 
                            className="pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4"
                        >
                            {/* Item 1 */}
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 text-[#2563EB] flex items-center justify-center shrink-0 shadow-xs">
                                    <Zap className="w-4 h-4 fill-current" />
                                </div>
                                <div className="text-left">
                                    <h4 className="text-xs sm:text-sm font-bold text-[#14213D] leading-tight">High Quality</h4>
                                    <p className="text-[11px] text-slate-500 font-normal">Top-notch standards</p>
                                </div>
                            </div>

                            {/* Item 2 */}
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 text-[#2563EB] flex items-center justify-center shrink-0 shadow-xs">
                                    <Rocket className="w-4 h-4" />
                                </div>
                                <div className="text-left">
                                    <h4 className="text-xs sm:text-sm font-bold text-[#14213D] leading-tight">On-Time Delivery</h4>
                                    <p className="text-[11px] text-slate-500 font-normal">Always on schedule</p>
                                </div>
                            </div>

                            {/* Item 3 */}
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 text-[#2563EB] flex items-center justify-center shrink-0 shadow-xs">
                                    <Headphones className="w-4 h-4" />
                                </div>
                                <div className="text-left">
                                    <h4 className="text-xs sm:text-sm font-bold text-[#14213D] leading-tight">24/7 Support</h4>
                                    <p className="text-[11px] text-slate-500 font-normal">We're here for you</p>
                                </div>
                            </div>
                        </motion.div>

                    </motion.div>


                    {/* ================= RIGHT VISUAL (Using User's High-Res img-hero.png) ================= */}
                    <motion.div
                        initial={{ opacity: 0, x: 30, scale: 0.96 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="lg:col-span-7 xl:col-span-7 relative mt-8 lg:mt-0 flex items-center justify-center"
                    >
                        {/* 3D Floating Mockup Wrapper */}
                        <motion.div 
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="relative w-full max-w-[700px] lg:max-w-none filter drop-shadow-[0_25px_45px_rgba(37,99,235,0.14)] select-none pointer-events-auto"
                        >
                            {/* Ambient Glow */}
                            <div className="absolute inset-0 bg-blue-400/10 blur-3xl rounded-full scale-90 pointer-events-none" />

                            {/* Actual 3D Render Image from public/images/hero/img-hero.png */}
                            <img 
                                src="/images/hero/img-hero.png" 
                                alt="KyySolutions Digital Platform Dashboard" 
                                className="w-full h-auto object-contain relative z-10 hover:scale-[1.01] transition-transform duration-300"
                                loading="eager"
                                draggable="false"
                            />
                        </motion.div>
                    </motion.div>

                </div>

                {/* ================= TRUSTED BY SECTION STRIP (Section 13) ================= */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-16 sm:mt-20 lg:mt-24 max-w-[1400px] mx-auto bg-white/95 backdrop-blur-md border border-slate-100/90 shadow-[0_8px_30px_rgb(20,33,61,0.04)] rounded-[20px] sm:rounded-[24px] px-6 sm:px-10 py-5 sm:py-6"
                >
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                        {/* Title text */}
                        <div className="text-center lg:text-left shrink-0">
                            <span className="text-xs sm:text-sm font-bold text-[#14213D] block leading-tight">
                                Trusted by innovative
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-[#14213D] block leading-tight">
                                companies worldwide
                            </span>
                        </div>

                        {/* Company Logos with Authentic Styling (Section 13) */}
                        <div className="flex flex-wrap items-center justify-center lg:justify-end gap-6 sm:gap-8 lg:gap-12 w-full">
                            
                            {/* Google */}
                            <div className="flex items-center space-x-1 hover:opacity-80 transition-opacity">
                                <span className="font-semibold text-base sm:text-lg tracking-tight">
                                    <span className="text-[#4285F4]">G</span>
                                    <span className="text-[#EA4335]">o</span>
                                    <span className="text-[#FBBC05]">o</span>
                                    <span className="text-[#4285F4]">g</span>
                                    <span className="text-[#34A853]">l</span>
                                    <span className="text-[#EA4335]">e</span>
                                </span>
                            </div>

                            {/* Microsoft */}
                            <div className="flex items-center space-x-1.5 hover:opacity-80 transition-opacity">
                                <div className="grid grid-cols-2 gap-0.5 w-3.5 h-3.5 shrink-0">
                                    <div className="bg-[#F25022] w-1.5 h-1.5" />
                                    <div className="bg-[#7FBA00] w-1.5 h-1.5" />
                                    <div className="bg-[#00A4EF] w-1.5 h-1.5" />
                                    <div className="bg-[#FFB900] w-1.5 h-1.5" />
                                </div>
                                <span className="font-semibold text-sm sm:text-base text-[#5E5E5E] tracking-tight">
                                    Microsoft
                                </span>
                            </div>

                            {/* Slack */}
                            <div className="flex items-center space-x-1.5 hover:opacity-80 transition-opacity">
                                <div className="w-4 h-4 rounded-sm bg-gradient-to-tr from-[#ECB22E] via-[#E01E5A] to-[#2EB67D] flex items-center justify-center text-white text-[10px] font-bold">
                                    #
                                </div>
                                <span className="font-extrabold text-sm sm:text-base text-[#14213D] tracking-tight">
                                    slack
                                </span>
                            </div>

                            {/* Airbnb */}
                            <div className="flex items-center space-x-1.5 hover:opacity-80 transition-opacity">
                                <svg className="w-4 h-4 text-[#FF5A5F]" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.26.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                                </svg>
                                <span className="font-bold text-sm sm:text-base text-[#FF5A5F] tracking-tight">
                                    airbnb
                                </span>
                            </div>

                            {/* GitHub */}
                            <div className="flex items-center space-x-1.5 hover:opacity-80 transition-opacity">
                                <svg className="w-4 h-4 text-[#14213D]" viewBox="0 0 24 24" fill="currentColor">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                                </svg>
                                <span className="font-bold text-sm sm:text-base text-[#14213D] tracking-tight">
                                    GitHub
                                </span>
                            </div>

                            {/* Stripe */}
                            <div className="flex items-center hover:opacity-80 transition-opacity">
                                <span className="font-extrabold text-base sm:text-lg text-[#635BFF] tracking-tight">
                                    stripe
                                </span>
                            </div>

                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
