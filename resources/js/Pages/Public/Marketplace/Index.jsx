import { useState, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Search, 
    Star, 
    ArrowRight, 
    Eye, 
    ShoppingCart, 
    ShoppingBag, 
    Check, 
    ShieldCheck, 
    Zap, 
    Download, 
    X, 
    FileCode2, 
    Sparkles, 
    RotateCcw,
    ArrowLeft,
    Sliders
} from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import { useLanguage } from '@/Context/LanguageContext';

// Product 1 Mockup: SaaS Multi-Tenant Starter
const SaaSPreview = () => (
    <div className="w-full h-full bg-[#0F172A] p-3 text-white flex flex-col justify-between select-none relative overflow-hidden">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[9px] text-slate-400">
            <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-red-500/80" />
                <div className="w-2 h-2 rounded-full bg-amber-500/80" />
                <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
            </div>
            <span className="font-mono text-[8px] bg-slate-800/80 px-2 py-0.5 rounded text-slate-300">app.kyy.io/saas</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 pt-2">
            <div className="bg-slate-800/60 p-2 rounded-lg border border-slate-700/50">
                <span className="text-[8px] text-slate-400 block">MRR</span>
                <span className="text-[11px] font-bold text-white block">$42.8k</span>
                <span className="text-[7px] text-emerald-400 font-medium">▲ +24%</span>
            </div>
            <div className="bg-slate-800/60 p-2 rounded-lg border border-slate-700/50">
                <span className="text-[8px] text-slate-400 block">Users</span>
                <span className="text-[11px] font-bold text-white block">8,920</span>
                <span className="text-[7px] text-blue-400 font-medium">Active</span>
            </div>
            <div className="bg-slate-800/60 p-2 rounded-lg border border-slate-700/50">
                <span className="text-[8px] text-slate-400 block">Uptime</span>
                <span className="text-[11px] font-bold text-white block">99.9%</span>
                <span className="text-[7px] text-emerald-400 font-medium">Optimal</span>
            </div>
        </div>
        <div className="pt-2">
            <svg className="w-full h-7" viewBox="0 0 100 30" fill="none">
                <path d="M0 25 Q 25 10, 50 18 T 100 5 L 100 30 L 0 30 Z" fill="rgba(59, 130, 246, 0.3)" />
                <path d="M0 25 Q 25 10, 50 18 T 100 5" stroke="#3B82F6" strokeWidth="1.5" />
            </svg>
        </div>
    </div>
);

// Product 2 Mockup: E-Commerce Admin & POS Kit
const EcommercePreview = () => (
    <div className="w-full h-full bg-[#1E293B] p-3 text-white flex flex-col justify-between select-none relative overflow-hidden">
        <div className="flex items-center justify-between pb-2 border-b border-slate-700">
            <div className="flex items-center space-x-1.5">
                <div className="w-4 h-4 rounded bg-[#2563EB] flex items-center justify-center text-[8px] font-bold">
                    <ShoppingBag className="w-2.5 h-2.5" />
                </div>
                <span className="text-[10px] font-bold text-white">POS & Orders</span>
            </div>
            <span className="text-[8px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-medium">Live POS</span>
        </div>
        <div className="space-y-1.5 pt-2 text-[9px]">
            <div className="flex items-center justify-between bg-slate-800/80 px-2 py-1 rounded border border-slate-700/60">
                <span className="font-semibold text-slate-200 truncate max-w-[100px]">Nike Air Jordan</span>
                <span className="text-emerald-400 font-mono font-bold">$189.00</span>
                <span className="text-[7px] bg-emerald-900/60 text-emerald-300 px-1 rounded">Paid</span>
            </div>
            <div className="flex items-center justify-between bg-slate-800/80 px-2 py-1 rounded border border-slate-700/60">
                <span className="font-semibold text-slate-200 truncate max-w-[100px]">MacBook Pro M3</span>
                <span className="text-emerald-400 font-mono font-bold">$1,999.00</span>
                <span className="text-[7px] bg-blue-900/60 text-blue-300 px-1 rounded">Processing</span>
            </div>
        </div>
        <div className="pt-1.5 flex items-center justify-between text-[9px] text-slate-400 border-t border-slate-800 mt-1">
            <span>Today's Sales</span>
            <span className="text-white font-bold font-mono">$8,450.00</span>
        </div>
    </div>
);

// Product 3 Mockup: Fintech Mobile Banking App
const FintechPreview = () => (
    <div className="w-full h-full bg-gradient-to-br from-[#1E1B4B] to-[#312E81] p-3 text-white flex flex-col justify-between select-none relative overflow-hidden">
        <div className="flex items-center justify-between text-[8px] text-indigo-300 pb-1">
            <span>9:41</span>
            <div className="flex items-center space-x-1">
                <span>5G</span>
                <span>100%</span>
            </div>
        </div>
        <div className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] rounded-xl p-2.5 shadow-md border border-white/20 relative overflow-hidden">
            <div className="flex justify-between items-center text-[8px] opacity-80 mb-1">
                <span>KyyPay Platinum</span>
                <span className="font-bold">VISA</span>
            </div>
            <div className="text-[12px] font-extrabold tracking-tight mb-1 font-mono">
                $12,450.80
            </div>
            <div className="text-[7px] font-mono opacity-70">
                •••• 8842  |  08/28
            </div>
        </div>
        <div className="grid grid-cols-3 gap-1 pt-1 text-center text-[8px]">
            <div className="bg-white/10 rounded py-1 font-medium">Send</div>
            <div className="bg-white/10 rounded py-1 font-medium">Request</div>
            <div className="bg-white/10 rounded py-1 font-medium">QR Pay</div>
        </div>
    </div>
);

// Product 4 Mockup: Design System & UI Kit
const UIComponentsPreview = () => (
    <div className="w-full h-full bg-[#0F172A] p-3 text-white flex flex-col justify-between select-none relative overflow-hidden">
        <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
            <span className="text-[9px] font-bold text-slate-300">Component Matrix</span>
            <span className="text-[8px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded font-mono">200+ Blocks</span>
        </div>
        <div className="space-y-1.5 pt-1">
            <div className="flex items-center space-x-1.5">
                <div className="bg-[#2563EB] text-white text-[8px] font-bold px-2 py-1 rounded-md shadow-xs flex items-center">
                    <span>Button</span>
                    <ArrowRight className="w-2 h-2 ml-1" />
                </div>
                <div className="bg-slate-800 border border-slate-700 text-slate-300 text-[8px] font-medium px-2 py-1 rounded-md">
                    Secondary
                </div>
                <div className="border border-blue-400/40 text-blue-300 text-[8px] font-medium px-2 py-1 rounded-md">
                    Outline
                </div>
            </div>
            <div className="flex items-center justify-between pt-1">
                <div className="flex items-center space-x-1">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#2563EB] border border-white/20" />
                    <div className="w-3.5 h-3.5 rounded-full bg-[#3B82F6] border border-white/20" />
                    <div className="w-3.5 h-3.5 rounded-full bg-[#60A5FA] border border-white/20" />
                    <div className="w-3.5 h-3.5 rounded-full bg-[#10B981] border border-white/20" />
                    <div className="w-3.5 h-3.5 rounded-full bg-[#F59E0B] border border-white/20" />
                </div>
                <div className="w-6 h-3.5 bg-[#2563EB] rounded-full p-0.5 flex items-center justify-end">
                    <div className="w-2.5 h-2.5 rounded-full bg-white shadow-xs" />
                </div>
            </div>
        </div>
        <div className="pt-1 flex items-center justify-between text-[8px] text-slate-400 border-t border-slate-800 mt-1">
            <span>Dark & Light Tokens</span>
            <span className="text-emerald-400 font-bold">Figma & React</span>
        </div>
    </div>
);

// Product 5 Mockup: CRM & Sales Pipeline
const CRMPreview = () => (
    <div className="w-full h-full bg-[#111827] p-3 text-white flex flex-col justify-between select-none relative overflow-hidden">
        <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 text-[9px]">
            <span className="font-bold text-amber-300">CRM & Lead Pipeline</span>
            <span className="bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded text-[8px] font-mono">$184k Deals</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5 pt-1.5 text-[8px]">
            <div className="bg-slate-800/80 p-1.5 rounded border border-slate-700">
                <span className="text-slate-400 block">Lead Stage</span>
                <span className="font-bold text-white">Proposal (14)</span>
            </div>
            <div className="bg-slate-800/80 p-1.5 rounded border border-slate-700">
                <span className="text-slate-400 block">Won Rate</span>
                <span className="font-bold text-emerald-400">74.2%</span>
            </div>
        </div>
        <div className="pt-1 flex items-center justify-between text-[8px] text-slate-400 border-t border-slate-800">
            <span>Automated Email Workflows</span>
            <span className="text-blue-400 font-mono">REST API</span>
        </div>
    </div>
);

// Product 6 Mockup: AI Prompt & Agent Engine
const AIPlatformPreview = () => (
    <div className="w-full h-full bg-[#181829] p-3 text-white flex flex-col justify-between select-none relative overflow-hidden">
        <div className="flex items-center justify-between pb-1.5 border-b border-purple-900/60 text-[9px]">
            <span className="font-bold text-purple-300">AI Prompt & Agent Engine</span>
            <span className="bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded text-[8px] font-mono">GPT-4o Ready</span>
        </div>
        <div className="bg-slate-800/80 p-2 rounded-lg border border-purple-800/40 text-[8px] space-y-1">
            <span className="text-purple-300 font-mono">ai_agent.generate_response()</span>
            <div className="text-slate-200">Streaming tokens at 120 tok/sec</div>
            <span className="text-emerald-400 font-bold block">Latency: 140ms</span>
        </div>
        <div className="pt-1 flex items-center justify-between text-[8px] text-slate-400 border-t border-slate-800">
            <span>Vector Search (Pinecone)</span>
            <span className="text-purple-300 font-bold">Python / Node</span>
        </div>
    </div>
);

// Custom Checkbox Component
const CustomCheckbox = ({ checked, onChange, label, count }) => (
    <label 
        onClick={onChange}
        className="flex items-center justify-between py-1.5 px-1 rounded-lg hover:bg-slate-50 cursor-pointer group transition-colors select-none"
    >
        <div className="flex items-center space-x-2.5 min-w-0">
            <div 
                className={`w-[17px] h-[17px] rounded-[4px] flex items-center justify-center transition-all duration-150 shrink-0 ${
                    checked 
                        ? 'bg-[#2563EB] border-[#2563EB] text-white shadow-xs' 
                        : 'bg-white border border-[#CBD5E1] group-hover:border-slate-400'
                }`}
            >
                {checked && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            <span className={`text-[13px] transition-colors truncate ${
                checked ? 'font-semibold text-[#0F172A]' : 'text-slate-600 group-hover:text-[#0F172A]'
            }`}>
                {label}
            </span>
        </div>
        {typeof count === 'number' && (
            <span className="text-[11px] text-slate-400 font-mono pl-1">
                {count}
            </span>
        )}
    </label>
);

export default function MarketplaceIndex({ initialCategory = 'all', searchQuery = '' }) {
    const { t, lang } = useLanguage();
    const mp = t.marketplacePage || {};
    
    // Search & Sort State
    const [searchInput, setSearchInput] = useState(searchQuery);
    const [activeSearch, setActiveSearch] = useState(searchQuery);
    const [sortBy, setSortBy] = useState('featured');
    
    // Multi-Select Filter States
    const [selectedCategories, setSelectedCategories] = useState(['all']);
    const [selectedLicenses, setSelectedLicenses] = useState(['all']);
    const [selectedPrices, setSelectedPrices] = useState(['all']);
    
    // Mobile Drawer State
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
    
    // Quick View Modal
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Filter Options mapped dynamically to active language
    const categoryOptions = [
        { id: 'all', label: mp.categories?.all || (lang === 'ID' ? 'Semua Produk' : 'All Products') },
        { id: 'saasSystems', label: mp.categories?.saasSystems || (lang === 'ID' ? 'Sistem SaaS' : 'SaaS Systems') },
        { id: 'sourceCode', label: mp.categories?.sourceCode || 'Source Code' },
        { id: 'mobileApps', label: mp.categories?.mobileApps || (lang === 'ID' ? 'Aplikasi Mobile' : 'Mobile Apps') },
        { id: 'uiKits', label: mp.categories?.uiKits || 'UI Kits' },
        { id: 'templates', label: mp.categories?.templates || (lang === 'ID' ? 'Template Web' : 'Web Templates') },
        { id: 'plugins', label: mp.categories?.plugins || 'Plugins & APIs' },
    ];

    const licenseOptions = [
        { id: 'all', label: mp.licenses?.all || (lang === 'ID' ? 'Semua Lisensi' : 'All License') },
        { id: 'regular', label: mp.licenses?.regular || (lang === 'ID' ? 'Lisensi Reguler' : 'Regular License') },
        { id: 'extended', label: mp.licenses?.extended || (lang === 'ID' ? 'Lisensi Extended' : 'Extended License') },
    ];

    const priceOptions = [
        { id: 'all', label: mp.priceRanges?.all || (lang === 'ID' ? 'Semua Harga' : 'All Price') },
        { id: 'under250', label: mp.priceRanges?.under250 || 'Rp 0 – 250.000', min: 0, max: 250000 },
        { id: '250to500', label: mp.priceRanges?.range250to500 || 'Rp 250.000 – 500.000', min: 250000, max: 500000 },
        { id: '500to1000', label: mp.priceRanges?.range500to1000 || 'Rp 500.000 – 1.000.000', min: 500000, max: 1000000 },
        { id: 'above1000', label: mp.priceRanges?.above1000 || 'Rp 1.000.000+', min: 1000000, max: Infinity },
    ];

    // Master Product Catalog
    const catalog = useMemo(() => [
        {
            id: 1,
            title: 'SaaS Multi-Tenant Boilerplate Starter',
            categoryKey: 'saasSystems',
            categoryName: mp.categories?.saasSystems || (lang === 'ID' ? 'Sistem SaaS' : 'SaaS Systems'),
            licenseType: 'regular',
            description: lang === 'ID' 
                ? 'Starter pack SaaS lengkap dengan database multi-tenancy, Stripe billing subscription, role & permission, auth dan tim.'
                : 'Production-ready SaaS starter with database multi-tenancy, Stripe billing subscriptions, roles, permissions, auth & teams.',
            price: 650000,
            priceFormatted: 'Rp 650.000',
            rating: 4.9,
            reviews: 38,
            sales: 142,
            badge: lang === 'ID' ? 'Terlaris' : 'Best Seller',
            tech: ['Laravel 13', 'React 19', 'Inertia.js', 'Stripe', 'MySQL'],
            previewComponent: SaaSPreview,
            features: [
                lang === 'ID' ? 'Isolasi database multi-tenant otomatis' : 'Multi-tenant database tenancy isolation',
                lang === 'ID' ? 'Stripe Customer Portal & webhook langganan' : 'Stripe Customer Portal & automated webhooks',
                lang === 'ID' ? 'Engine tema Dark Mode & Light Mode' : 'Dark mode & Light mode theme engine',
                lang === 'ID' ? 'Role-based permission & audit log sistem' : 'Role-based permissions & audit logs',
                lang === 'ID' ? 'Gratis pembaruan seumur hidup & dokumentasi' : 'Lifetime free updates & documentation'
            ]
        },
        {
            id: 2,
            title: 'E-Commerce Admin & Live POS Terminal Kit',
            categoryKey: 'sourceCode',
            categoryName: mp.categories?.sourceCode || 'Source Code',
            licenseType: 'regular',
            description: lang === 'ID'
                ? 'Backend e-commerce lengkap dengan terminal kasir POS live, stok inventory sinkron, faktur PDF, kupon dan payment gateway.'
                : 'Complete e-commerce backend with live offline-first POS terminal, live inventory, PDF invoices, discounts & payment gateway.',
            price: 450000,
            priceFormatted: 'Rp 450.000',
            rating: 4.8,
            reviews: 24,
            sales: 98,
            badge: lang === 'ID' ? 'Unggulan' : 'Featured',
            tech: ['Laravel', 'Vue 3 / React', 'Tailwind CSS', 'Midtrans'],
            previewComponent: EcommercePreview,
            features: [
                lang === 'ID' ? 'Integrasi printer struk thermal' : 'Thermal receipt printer integration',
                lang === 'ID' ? 'Sinkronisasi inventaris multi-cabang' : 'Multi-branch stock inventory sync',
                lang === 'ID' ? 'Notifikasi pesanan WhatsApp otomatis' : 'Automated WhatsApp order notifications',
                lang === 'ID' ? 'Laporan analisis penjualan lengkap' : 'Complete sales analytics reports'
            ]
        },
        {
            id: 3,
            title: 'Fintech Mobile Banking App Template',
            categoryKey: 'mobileApps',
            categoryName: mp.categories?.mobileApps || (lang === 'ID' ? 'Aplikasi Mobile' : 'Mobile Apps'),
            licenseType: 'extended',
            description: lang === 'ID'
                ? 'Template aplikasi dompet digital mobile dengan pembayaran QRIS, transfer saldo, kartu virtual & riwayat transaksi realtime.'
                : 'Cross-platform mobile wallet template with QR payments, balance transfers, virtual cards & real-time transaction feed.',
            price: 550000,
            priceFormatted: 'Rp 550.000',
            rating: 4.9,
            reviews: 19,
            sales: 76,
            badge: lang === 'ID' ? 'Populer' : 'Popular',
            tech: ['Flutter 3', 'Node.js', 'PostgreSQL', 'Firebase'],
            previewComponent: FintechPreview,
            features: [
                lang === 'ID' ? 'Autentikasi biometrik FaceID & Sidik Jari' : 'Biometric FaceID & Fingerprint auth',
                lang === 'ID' ? 'Generator kartu debit virtual' : 'Virtual debit card generator',
                lang === 'ID' ? 'Scanner kode QRIS & barcode' : 'QRIS / QR Code scanner',
                lang === 'ID' ? 'Push notifikasi instan dengan FCM' : 'Push notifications with FCM'
            ]
        },
        {
            id: 4,
            title: 'Enterprise Design System & UI Component Kit',
            categoryKey: 'uiKits',
            categoryName: mp.categories?.uiKits || 'UI Kits',
            licenseType: 'regular',
            description: lang === 'ID'
                ? 'Lebih dari 200+ komponen modern, token desain dark mode, validasi input formulir, dan layout blok responsif.'
                : 'Over 200+ accessible components, dark mode design tokens, form validation inputs, and responsive layout blocks.',
            price: 350000,
            priceFormatted: 'Rp 350.000',
            rating: 5.0,
            reviews: 42,
            sales: 210,
            badge: lang === 'ID' ? 'Rating Tertinggi' : 'Top Rated',
            tech: ['Figma', 'Tailwind CSS', 'React 19', 'TypeScript'],
            previewComponent: UIComponentsPreview,
            features: [
                lang === 'ID' ? 'File sumber Figma Auto-layout 5.0' : 'Auto-layout 5.0 Figma source file',
                lang === 'ID' ? 'Token desain standar WCAG 2.1' : 'Accessible WCAG 2.1 compliant tokens',
                lang === 'ID' ? 'Komponen siap salin React & Tailwind' : 'Copy-paste React & Tailwind components',
                lang === 'ID' ? 'Dokumentasi interaktif Storybook' : 'Comprehensive interactive Storybook'
            ]
        },
        {
            id: 5,
            title: 'Modern CRM & Sales Pipeline Management',
            categoryKey: 'saasSystems',
            categoryName: mp.categories?.saasSystems || (lang === 'ID' ? 'Sistem SaaS' : 'SaaS Systems'),
            licenseType: 'extended',
            description: lang === 'ID'
                ? 'Aplikasi CRM lengkap dengan Kanban deal pipeline drag-and-drop, otomasi email follow-up, dan integrasi WhatsApp API.'
                : 'Full-featured CRM with drag-and-drop Kanban pipeline, automated email campaigns, lead tracking & WhatsApp API.',
            price: 590000,
            priceFormatted: 'Rp 590.000',
            rating: 4.8,
            reviews: 16,
            sales: 54,
            badge: lang === 'ID' ? 'Rilis Baru' : 'New Release',
            tech: ['Laravel 13', 'React', 'Tailwind', 'Pusher'],
            previewComponent: CRMPreview,
            features: [
                lang === 'ID' ? 'Tahapan deal penjualan sistem Kanban' : 'Kanban sales deal stages',
                lang === 'ID' ? 'Otomasi pesan follow-up pelanggan' : 'Automated customer follow-ups',
                lang === 'ID' ? 'Pelacakan open-rate email & klik' : 'Email open rate & link tracking',
                lang === 'ID' ? 'Manajemen peran & hak akses pengguna' : 'Role-based permissions'
            ]
        },
        {
            id: 6,
            title: 'AI Multi-Model Prompt & Chatbot Engine',
            categoryKey: 'plugins',
            categoryName: mp.categories?.plugins || 'Plugins & APIs',
            licenseType: 'regular',
            description: lang === 'ID'
                ? 'Backend integrasi AI multimodal & frontend streaming respons untuk OpenAI GPT-4o, Claude 3.5, dan Google Gemini.'
                : 'Multimodal AI integration backend & streaming frontend for OpenAI GPT-4o, Claude 3.5, and Google Gemini with token metering.',
            price: 490000,
            priceFormatted: 'Rp 490.000',
            rating: 4.9,
            reviews: 29,
            sales: 118,
            badge: lang === 'ID' ? 'Unggulan' : 'Featured',
            tech: ['Node.js / Python', 'React', 'Vector DB', 'OpenAI'],
            previewComponent: AIPlatformPreview,
            features: [
                lang === 'ID' ? 'Renderer streaming token real-time' : 'Token streaming response renderer',
                lang === 'ID' ? 'Indexing dokumen vektor RAG' : 'RAG document vector indexing',
                lang === 'ID' ? 'Gateway API pengganti model instan' : 'Model switcher API gateway',
                lang === 'ID' ? 'Pengukuran kuota token & rate limit' : 'Token usage metering & rate limiting'
            ]
        }
    ], [lang, mp]);

    // Toggle Handler for Multi-Select Checkboxes
    const handleCategoryToggle = (id) => {
        if (id === 'all') {
            setSelectedCategories(['all']);
            return;
        }
        let updated = selectedCategories.filter(item => item !== 'all');
        if (updated.includes(id)) {
            updated = updated.filter(item => item !== id);
            if (updated.length === 0) updated = ['all'];
        } else {
            updated.push(id);
        }
        setSelectedCategories(updated);
    };

    const handleLicenseToggle = (id) => {
        if (id === 'all') {
            setSelectedLicenses(['all']);
            return;
        }
        let updated = selectedLicenses.filter(item => item !== 'all');
        if (updated.includes(id)) {
            updated = updated.filter(item => item !== id);
            if (updated.length === 0) updated = ['all'];
        } else {
            updated.push(id);
        }
        setSelectedLicenses(updated);
    };

    const handlePriceToggle = (id) => {
        if (id === 'all') {
            setSelectedPrices(['all']);
            return;
        }
        let updated = selectedPrices.filter(item => item !== 'all');
        if (updated.includes(id)) {
            updated = updated.filter(item => item !== id);
            if (updated.length === 0) updated = ['all'];
        } else {
            updated.push(id);
        }
        setSelectedPrices(updated);
    };

    // Reset All Filters
    const handleResetFilter = () => {
        setSelectedCategories(['all']);
        setSelectedLicenses(['all']);
        setSelectedPrices(['all']);
        setSearchInput('');
        setActiveSearch('');
        setSortBy('featured');
    };

    // Filter Logic
    const filteredProducts = useMemo(() => {
        let list = [...catalog];

        // Search Term Filter
        if (activeSearch.trim() !== '') {
            const term = activeSearch.toLowerCase();
            list = list.filter(item => 
                item.title.toLowerCase().includes(term) || 
                item.description.toLowerCase().includes(term) ||
                item.tech.some(t => t.toLowerCase().includes(term))
            );
        }

        // Category Filter (Multi-select)
        if (!selectedCategories.includes('all') && selectedCategories.length > 0) {
            list = list.filter(item => selectedCategories.includes(item.categoryKey));
        }

        // License Filter (Multi-select)
        if (!selectedLicenses.includes('all') && selectedLicenses.length > 0) {
            list = list.filter(item => selectedLicenses.includes(item.licenseType));
        }

        // Price Filter (Multi-select)
        if (!selectedPrices.includes('all') && selectedPrices.length > 0) {
            list = list.filter(item => {
                return selectedPrices.some(priceKey => {
                    const option = priceOptions.find(p => p.id === priceKey);
                    if (!option) return false;
                    return item.price >= option.min && item.price <= option.max;
                });
            });
        }

        // Sort
        if (sortBy === 'price-low') {
            list.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            list.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'rating') {
            list.sort((a, b) => b.rating - a.rating);
        }

        return list;
    }, [catalog, activeSearch, selectedCategories, selectedLicenses, selectedPrices, sortBy]);

    // Active Filter Badges
    const activeFilterBadges = useMemo(() => {
        const badges = [];

        if (!selectedCategories.includes('all')) {
            selectedCategories.forEach(catId => {
                const opt = categoryOptions.find(o => o.id === catId);
                if (opt) badges.push({ type: 'category', id: catId, label: opt.label });
            });
        }

        if (!selectedLicenses.includes('all')) {
            selectedLicenses.forEach(licId => {
                const opt = licenseOptions.find(o => o.id === licId);
                if (opt) badges.push({ type: 'license', id: licId, label: opt.label });
            });
        }

        if (!selectedPrices.includes('all')) {
            selectedPrices.forEach(prId => {
                const opt = priceOptions.find(o => o.id === prId);
                if (opt) badges.push({ type: 'price', id: prId, label: opt.label });
            });
        }

        if (activeSearch.trim() !== '') {
            badges.push({ type: 'search', id: 'search', label: `"${activeSearch}"` });
        }

        return badges;
    }, [selectedCategories, selectedLicenses, selectedPrices, activeSearch, categoryOptions, licenseOptions, priceOptions]);

    const removeBadge = (badge) => {
        if (badge.type === 'category') handleCategoryToggle(badge.id);
        if (badge.type === 'license') handleLicenseToggle(badge.id);
        if (badge.type === 'price') handlePriceToggle(badge.id);
        if (badge.type === 'search') {
            setSearchInput('');
            setActiveSearch('');
        }
    };

    // Sidebar Content Component
    const SidebarFilterContent = () => (
        <div className="bg-white border border-[#E5EAF2] rounded-[18px] p-5 shadow-xs">
            {/* Heading */}
            <div className="flex items-center space-x-2 pb-4 border-b border-[#E5EAF2] mb-4">
                <Sliders className="w-4 h-4 text-[#2563EB]" />
                <h3 className="font-extrabold text-[#0F172A] text-base tracking-tight">{mp.filterTitle || (lang === 'ID' ? 'Filter' : 'Filter')}</h3>
            </div>

            {/* Group 1: Category */}
            <div className="mb-5 pb-4 border-b border-[#F1F5F9]">
                <h4 className="text-[13px] font-bold text-[#0F172A] mb-2 tracking-tight">{mp.categoryTitle || (lang === 'ID' ? 'Kategori' : 'Category')}</h4>
                <div className="space-y-0.5">
                    {categoryOptions.map(cat => (
                        <CustomCheckbox
                            key={cat.id}
                            checked={selectedCategories.includes(cat.id)}
                            onChange={() => handleCategoryToggle(cat.id)}
                            label={cat.label}
                        />
                    ))}
                </div>
            </div>

            {/* Group 2: License Type */}
            <div className="mb-5 pb-4 border-b border-[#F1F5F9]">
                <h4 className="text-[13px] font-bold text-[#0F172A] mb-2 tracking-tight">{mp.licenseTitle || (lang === 'ID' ? 'Tipe Lisensi' : 'License Type')}</h4>
                <div className="space-y-0.5">
                    {licenseOptions.map(lic => (
                        <CustomCheckbox
                            key={lic.id}
                            checked={selectedLicenses.includes(lic.id)}
                            onChange={() => handleLicenseToggle(lic.id)}
                            label={lic.label}
                        />
                    ))}
                </div>
            </div>

            {/* Group 3: Price Range */}
            <div className="mb-6">
                <h4 className="text-[13px] font-bold text-[#0F172A] mb-2 tracking-tight">{mp.priceTitle || (lang === 'ID' ? 'Rentang Harga' : 'Price Range')}</h4>
                <div className="space-y-0.5">
                    {priceOptions.map(pr => (
                        <CustomCheckbox
                            key={pr.id}
                            checked={selectedPrices.includes(pr.id)}
                            onChange={() => handlePriceToggle(pr.id)}
                            label={pr.label}
                        />
                    ))}
                </div>
            </div>

            {/* Reset Filter Button */}
            <button
                onClick={handleResetFilter}
                className="w-full h-[40px] rounded-[10px] bg-white border border-[#2563EB] text-[#2563EB] hover:bg-[#EFF6FF] text-[13px] font-bold shadow-2xs transition-all duration-150 flex items-center justify-center space-x-1.5 cursor-pointer"
            >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{mp.resetFilter || (lang === 'ID' ? 'Reset Filter' : 'Reset Filter')}</span>
            </button>
        </div>
    );

    return (
        <PublicLayout>
            <Head title={mp.pageTitle || (lang === 'ID' ? "Marketplace Produk Digital — KyySolutions" : "Digital Products Marketplace — KyySolutions")} />

            {/* Section 1: Hero & Search Header */}
            <section className="pt-30 sm:pt-34 pb-10 bg-gradient-to-b from-blue-50/40 via-white to-white border-b border-[#E5EAF2] relative">
                <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    
                    {/* Back Link to Home */}
                    <div className="inline-flex items-center mb-5">
                        <Link 
                            href="/" 
                            className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-[#2563EB] bg-white px-3.5 py-1.5 rounded-full border border-[#E5EAF2] shadow-xs transition-colors"
                        >
                            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                            <span>{mp.backToHome || (lang === 'ID' ? 'Kembali ke Beranda' : 'Back to Home')}</span>
                        </Link>
                    </div>

                    {/* Headline */}
                    <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0F172A] tracking-tight mb-3">
                        {mp.headingPart1 || (lang === 'ID' ? 'Marketplace ' : 'Digital Products ')}
                        <span className="text-[#2563EB]">
                            {mp.headingPart2 || (lang === 'ID' ? 'Produk Digital' : 'Marketplace')}
                        </span>
                    </h1>
                    <p className="text-sm sm:text-base text-[#64748B] font-normal max-w-2xl mx-auto mb-7 leading-relaxed">
                        {mp.subheading || (lang === 'ID' ? 'Jelajahi source code siap pakai, boilerplate SaaS, aplikasi mobile, dan UI kit untuk mempercepat peluncuran software Anda hingga 10x lebih cepat.' : 'Explore production-ready SaaS boilerplates, mobile apps, and UI kits to launch your software projects 10x faster.')}
                    </p>

                    {/* Integrated Search Bar */}
                    <div className="max-w-[760px] mx-auto">
                        <form 
                            onSubmit={(e) => { e.preventDefault(); setActiveSearch(searchInput); }}
                            className="flex flex-col sm:flex-row items-center gap-2.5"
                        >
                            <div className="relative flex-1 w-full">
                                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                <input 
                                    type="text"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    placeholder={mp.searchPlaceholder || (lang === 'ID' ? 'Cari source code, template, framework (Laravel, React, Flutter)...' : 'Search source code, templates, tech stack...')}
                                    className="w-full h-[46px] pl-10 pr-4 rounded-[12px] bg-white border border-[#DCE3EF] text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:ring-3 focus:ring-blue-100 transition-all shadow-xs"
                                />
                                {searchInput && (
                                    <button 
                                        type="button"
                                        onClick={() => { setSearchInput(''); setActiveSearch(''); }} 
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            <button 
                                type="submit"
                                className="w-full sm:w-auto h-[46px] px-7 rounded-[12px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-bold shadow-xs transition-colors cursor-pointer shrink-0 flex items-center justify-center"
                            >
                                {mp.searchButton || (lang === 'ID' ? 'Cari' : 'Search')}
                            </button>
                        </form>
                    </div>

                </div>
            </section>

            {/* Section 2: Main Catalog Layout (Sidebar Filter + Product Grid) */}
            <section className="py-10 bg-[#FFFFFF] min-h-[700px]">
                <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Top Controls on Mobile */}
                    <div className="flex items-center justify-between gap-3 mb-6 lg:hidden">
                        <button
                            onClick={() => setMobileFilterOpen(true)}
                            className="flex items-center space-x-2 px-4 py-2 bg-white border border-[#E5EAF2] rounded-xl text-xs font-bold text-[#0F172A] shadow-xs cursor-pointer hover:bg-slate-50"
                        >
                            <Sliders className="w-3.5 h-3.5 text-[#2563EB]" />
                            <span>{mp.filterTitle || (lang === 'ID' ? 'Filter' : 'Filters')} {activeFilterBadges.length > 0 && `(${activeFilterBadges.length})`}</span>
                        </button>

                        <div className="flex items-center space-x-1.5">
                            <span className="text-xs text-[#64748B] font-medium">{mp.sortBy || (lang === 'ID' ? 'Urutkan:' : 'Sort:')}</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-50 border border-[#E2E8F0] text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                            >
                                <option value="featured">{mp.sortOptions?.featured || (lang === 'ID' ? 'Unggulan' : 'Featured')}</option>
                                <option value="rating">{mp.sortOptions?.rating || (lang === 'ID' ? 'Rating Tertinggi' : 'Highest Rated')}</option>
                                <option value="price-low">{mp.sortOptions?.priceLow || (lang === 'ID' ? 'Harga: Rendah ke Tinggi' : 'Price: Low to High')}</option>
                                <option value="price-high">{mp.sortOptions?.priceHigh || (lang === 'ID' ? 'Harga: Tinggi ke Rendah' : 'Price: High to Low')}</option>
                            </select>
                        </div>
                    </div>

                    {/* Desktop 2-Column Structure */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-start">
                        
                        {/* LEFT SIDEBAR (3 cols on lg) */}
                        <div className="hidden lg:block lg:col-span-3 sticky top-24">
                            <SidebarFilterContent />
                        </div>

                        {/* RIGHT PRODUCT GRID (9 cols on lg) */}
                        <div className="lg:col-span-9">
                            
                            {/* Top Controls on Desktop */}
                            <div className="hidden lg:flex items-center justify-between pb-4 border-b border-[#F1F5F9] mb-5">
                                <div className="text-[13px] text-[#64748B] font-medium">
                                    {mp.showing || (lang === 'ID' ? 'Menampilkan' : 'Showing')} <span className="font-bold text-[#0F172A]">{filteredProducts.length}</span> {mp.of || (lang === 'ID' ? 'dari' : 'of')} <span className="font-bold text-[#0F172A]">{catalog.length}</span> {mp.products || (lang === 'ID' ? 'produk' : 'products')}
                                </div>

                                <div className="flex items-center space-x-2">
                                    <span className="text-[13px] text-[#64748B] font-medium">{mp.sortBy || (lang === 'ID' ? 'Urutkan:' : 'Sort by:')}</span>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="px-3 py-1.5 text-xs font-bold rounded-lg bg-white border border-[#E2E8F0] text-[#0F172A] hover:border-slate-300 focus:outline-none focus:border-[#2563EB] cursor-pointer"
                                    >
                                        <option value="featured">{mp.sortOptions?.featured || (lang === 'ID' ? 'Unggulan' : 'Featured')}</option>
                                        <option value="rating">{mp.sortOptions?.rating || (lang === 'ID' ? 'Rating Tertinggi' : 'Highest Rated')}</option>
                                        <option value="price-low">{mp.sortOptions?.priceLow || (lang === 'ID' ? 'Harga: Rendah ke Tinggi' : 'Price: Low to High')}</option>
                                        <option value="price-high">{mp.sortOptions?.priceHigh || (lang === 'ID' ? 'Harga: Tinggi ke Rendah' : 'Price: High to Low')}</option>
                                    </select>
                                </div>
                            </div>

                            {/* Active Filters Indicator Badges */}
                            {activeFilterBadges.length > 0 && (
                                <div className="flex items-center flex-wrap gap-1.5 mb-5 pb-3 border-b border-[#F1F5F9]">
                                    <span className="text-xs text-[#64748B] font-medium mr-1">{mp.activeFilters || (lang === 'ID' ? 'Filter aktif:' : 'Active filters:')}</span>
                                    {activeFilterBadges.map((badge, idx) => (
                                        <span 
                                            key={idx}
                                            className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-[#EFF6FF] text-[#2563EB] text-xs font-semibold"
                                        >
                                            <span>{badge.label}</span>
                                            <button 
                                                onClick={() => removeBadge(badge)}
                                                className="hover:text-blue-800 ml-0.5"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))}
                                    <button 
                                        onClick={handleResetFilter}
                                        className="text-xs font-bold text-[#2563EB] hover:underline ml-2"
                                    >
                                        {mp.clearAll || (lang === 'ID' ? 'Hapus Semua' : 'Clear All')}
                                    </button>
                                </div>
                            )}

                            {/* Product Grid */}
                            {filteredProducts.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                                    {filteredProducts.map((product) => {
                                        const PreviewComponent = product.previewComponent;
                                        return (
                                            <div 
                                                key={product.id}
                                                className="rounded-[16px] bg-white border border-[#E5EAF2] hover:border-[#2563EB]/40 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between group"
                                            >
                                                <div>
                                                    {/* Header Mockup Preview */}
                                                    <div className="h-44 w-full relative overflow-hidden bg-slate-900 border-b border-[#E5EAF2]">
                                                        {PreviewComponent && <PreviewComponent />}

                                                        {/* Badge */}
                                                        <div className="absolute top-2.5 left-2.5 bg-white text-[#0F172A] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs border border-slate-100">
                                                            {product.badge}
                                                        </div>

                                                        {/* Sales count badge */}
                                                        <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded flex items-center">
                                                            <Download className="w-2.5 h-2.5 mr-1 text-emerald-400" />
                                                            <span>{product.sales} {mp.sales || (lang === 'ID' ? 'terjual' : 'sales')}</span>
                                                        </div>

                                                        {/* Hover Quick Action */}
                                                        <div className="absolute inset-0 bg-[#0F172A]/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                                                            <button 
                                                                onClick={() => setSelectedProduct(product)}
                                                                className="px-3.5 py-1.5 bg-white text-[#0F172A] text-xs font-bold rounded-xl shadow-md hover:bg-slate-50 transition-transform hover:scale-105 inline-flex items-center cursor-pointer"
                                                            >
                                                                <Eye className="w-3.5 h-3.5 mr-1.5 text-[#2563EB]" />
                                                                <span>{mp.quickView || (lang === 'ID' ? 'Lihat Detail' : 'Quick View')}</span>
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Card Body */}
                                                    <div className="p-4 sm:p-4.5">
                                                        {/* Category & Rating */}
                                                        <div className="flex items-center justify-between text-xs mb-2">
                                                            <span className="text-[11px] font-semibold text-[#2563EB] bg-[#EFF6FF] px-2 py-0.5 rounded">
                                                                {product.categoryName}
                                                            </span>
                                                            <div className="flex items-center text-amber-500 font-bold text-xs">
                                                                <Star className="w-3.5 h-3.5 fill-current mr-1 text-amber-400" />
                                                                <span>{product.rating}</span>
                                                                <span className="text-slate-400 font-normal ml-1">({product.reviews})</span>
                                                            </div>
                                                        </div>

                                                        {/* Title */}
                                                        <h3 
                                                            onClick={() => setSelectedProduct(product)}
                                                            className="font-bold text-[#0F172A] text-[15px] group-hover:text-[#2563EB] transition-colors line-clamp-1 mb-1.5 cursor-pointer leading-snug"
                                                        >
                                                            {product.title}
                                                        </h3>

                                                        {/* Description */}
                                                        <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed mb-3.5 font-normal">
                                                            {product.description}
                                                        </p>

                                                        {/* Tech Stack Pills */}
                                                        <div className="flex flex-wrap gap-1 mb-1">
                                                            {product.tech.slice(0, 4).map((t) => (
                                                                <span key={t} className="text-[10px] font-medium bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] px-1.5 py-0.5 rounded">
                                                                    {t}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Card Footer: Price & Buy Now */}
                                                <div className="px-4 py-3 bg-[#F8FAFC] border-t border-[#E5EAF2] flex items-center justify-between">
                                                    <div>
                                                        <span className="text-[9px] text-[#64748B] block uppercase font-bold tracking-wider">{mp.priceLabel || (lang === 'ID' ? 'Harga' : 'Price')}</span>
                                                        <span className="text-[15px] font-extrabold text-[#0F172A]">
                                                            {product.priceFormatted}
                                                        </span>
                                                    </div>
                                                    <a
                                                        href={`https://wa.me/6281234567890?text=Halo%20KyySolutions,%20saya%20tertarik%20membeli%20produk:%20${encodeURIComponent(product.title)}%20(${product.priceFormatted})`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="px-3.5 py-1.5 rounded-[10px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-xs transition-colors inline-flex items-center"
                                                    >
                                                        <span>{mp.buyNow || (lang === 'ID' ? 'Beli Sekarang' : 'Buy Now')}</span>
                                                        <ArrowRight className="w-3 h-3 ml-1" />
                                                    </a>
                                                </div>

                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-16 bg-[#F8FAFC] rounded-2xl border border-[#E5EAF2]">
                                    <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                    <h3 className="text-base font-bold text-[#0F172A] mb-1">
                                        {mp.noProductsTitle || (lang === 'ID' ? 'Produk Tidak Ditemukan' : 'No Products Found')}
                                    </h3>
                                    <p className="text-xs text-[#64748B] mb-4">
                                        {mp.noProductsSubtitle || (lang === 'ID' ? 'Coba ubah kata kunci pencarian atau reset filter.' : 'Try adjusting your search criteria or resetting filters.')}
                                    </p>
                                    <button
                                        onClick={handleResetFilter}
                                        className="px-4 py-2 bg-[#2563EB] text-white text-xs font-bold rounded-xl"
                                    >
                                        {mp.resetButton || (lang === 'ID' ? 'Reset Filter' : 'Reset Filter')}
                                    </button>
                                </div>
                            )}

                        </div>

                    </div>

                </div>
            </section>

            {/* Mobile Filter Drawer */}
            <AnimatePresence>
                {mobileFilterOpen && (
                    <div className="fixed inset-0 z-50 lg:hidden flex">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileFilterOpen(false)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
                        />

                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ duration: 0.25 }}
                            className="relative w-4/5 max-w-[320px] bg-white h-full shadow-2xl p-5 overflow-y-auto z-10 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center justify-between pb-4 border-b border-[#E5EAF2] mb-4">
                                    <div className="flex items-center space-x-2">
                                        <Sliders className="w-4 h-4 text-[#2563EB]" />
                                        <span className="font-bold text-[#0F172A]">{mp.filterTitle || (lang === 'ID' ? 'Pilihan Filter' : 'Filter Options')}</span>
                                    </div>
                                    <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-slate-400">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <SidebarFilterContent />
                            </div>

                            <button
                                onClick={() => setMobileFilterOpen(false)}
                                className="w-full py-3 mt-6 bg-[#2563EB] text-white text-xs font-bold rounded-xl shadow-md"
                            >
                                {lang === 'ID' ? `Terapkan Filter (${filteredProducts.length} Hasil)` : `Apply Filters (${filteredProducts.length} Results)`}
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Product Quick View Modal */}
            <AnimatePresence>
                {selectedProduct && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 15 }}
                            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 relative"
                        >
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="mb-6">
                                <span className="text-xs font-bold text-[#2563EB] bg-[#EFF6FF] px-2.5 py-1 rounded-md">
                                    {selectedProduct.categoryName}
                                </span>
                                <h2 className="text-2xl font-extrabold text-[#0F172A] mt-2 mb-2">
                                    {selectedProduct.title}
                                </h2>
                                <p className="text-sm text-[#64748B] leading-relaxed font-normal">
                                    {selectedProduct.description}
                                </p>
                            </div>

                            <div className="mb-6 p-5 rounded-2xl bg-[#F8FAFC] border border-[#E5EAF2]">
                                <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-3">
                                    {mp.modal?.keyFeatures || (lang === 'ID' ? 'Fitur & Keunggulan Utama' : 'Key Features & Specifications')}
                                </h4>
                                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                                    {selectedProduct.features?.map((feat, i) => (
                                        <li key={i} className="flex items-start">
                                            <Check className="w-4 h-4 text-emerald-500 shrink-0 mr-2 mt-0.5" />
                                            <span>{feat}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-6">
                                <h4 className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-2">
                                    {mp.modal?.builtWith || (lang === 'ID' ? 'Teknologi yang Digunakan' : 'Tech Stack')}
                                </h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {selectedProduct.tech.map((t) => (
                                        <span key={t} className="px-2.5 py-1 bg-[#EFF6FF] text-[#2563EB] text-xs font-bold rounded-lg border border-blue-100">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-[#E5EAF2] flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div>
                                    <span className="text-xs text-[#64748B] block font-medium">{mp.modal?.oneTimePayment || (lang === 'ID' ? 'Investasi Sekali Bayar' : 'One-time Investment')}</span>
                                    <span className="text-2xl font-black text-[#0F172A]">
                                        {selectedProduct.priceFormatted}
                                    </span>
                                </div>

                                <a
                                    href={`https://wa.me/6281234567890?text=Halo%20KyySolutions,%20saya%20ingin%20membeli%20produk:%20${encodeURIComponent(selectedProduct.title)}%20(${selectedProduct.priceFormatted})`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-bold shadow-lg shadow-blue-500/25 flex items-center justify-center space-x-2"
                                >
                                    <ShoppingCart className="w-4 h-4" />
                                    <span>{mp.modal?.buyViaWhatsapp || (lang === 'ID' ? 'Beli via WhatsApp' : 'Buy via WhatsApp')}</span>
                                </a>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Section 3: Benefits & Assurance Banner */}
            <section className="py-12 bg-[#0F172A] text-white border-t border-slate-800">
                <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
                        <div className="flex items-center space-x-3.5">
                            <div className="w-11 h-11 rounded-xl bg-blue-600/25 border border-blue-500/30 text-[#3B82F6] flex items-center justify-center shrink-0">
                                <Zap className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold">{mp.benefits?.instantDelivery || (lang === 'ID' ? 'Akses Instan' : 'Instant Delivery')}</h4>
                                <p className="text-xs text-slate-400">{mp.benefits?.instantDeliverySub || (lang === 'ID' ? 'Download source code langsung' : 'Direct digital download')}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3.5">
                            <div className="w-11 h-11 rounded-xl bg-blue-600/25 border border-blue-500/30 text-[#3B82F6] flex items-center justify-center shrink-0">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold">{mp.benefits?.cleanCode || (lang === 'ID' ? 'Kode Bersih & Teruji' : 'Clean & Tested Code')}</h4>
                                <p className="text-xs text-slate-400">{mp.benefits?.cleanCodeSub || (lang === 'ID' ? 'Standar kualitas enterprise' : 'Enterprise grade standards')}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3.5">
                            <div className="w-11 h-11 rounded-xl bg-blue-600/25 border border-blue-500/30 text-[#3B82F6] flex items-center justify-center shrink-0">
                                <FileCode2 className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold">{mp.benefits?.documentation || (lang === 'ID' ? 'Dokumentasi Lengkap' : 'Full Documentation')}</h4>
                                <p className="text-xs text-slate-400">{mp.benefits?.documentationSub || (lang === 'ID' ? 'Panduan instalasi bertahap' : 'Step-by-step setup guides')}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3.5">
                            <div className="w-11 h-11 rounded-xl bg-blue-600/25 border border-blue-500/30 text-[#3B82F6] flex items-center justify-center shrink-0">
                                <Sparkles className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold">{mp.benefits?.freeUpdates || (lang === 'ID' ? 'Gratis Pembaruan' : 'Free Updates')}</h4>
                                <p className="text-xs text-slate-400">{mp.benefits?.freeUpdatesSub || (lang === 'ID' ? 'Pembaruan versi seumur hidup' : 'Lifetime version updates')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </PublicLayout>
    );
}
