import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ShoppingBag, 
    FileText, 
    Activity, 
    ShieldCheck, 
    Package, 
    Calendar, 
    BadgeCheck, 
    Search, 
    ChevronDown, 
    ArrowUpDown, 
    LayoutGrid, 
    List, 
    Download, 
    ExternalLink, 
    Star, 
    X,
    FolderGit2,
    HardDrive,
    CheckCircle2
} from 'lucide-react';
import BuyerLayout from '@/Layouts/BuyerLayout';

export default function MyProducts({ products = [], user = {} }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [viewMode, setViewMode] = useState('grid');
    const [reviewModalProduct, setReviewModalProduct] = useState(null);
    const [hoverRating, setHoverRating] = useState(0);

    const { data, setData, post, processing, reset, errors } = useForm({
        product_id: '',
        rating: 5,
        comment: '',
    });

    const openReviewModal = (product) => {
        setReviewModalProduct(product);
        setData({
            product_id: product.productId,
            rating: 5,
            comment: '',
        });
    };

    const submitReviewForm = (e) => {
        e.preventDefault();
        post('/dashboard/reviews', {
            onSuccess: () => {
                setReviewModalProduct(null);
                reset();
            }
        });
    };

    // Filter products
    const filteredProducts = products.filter((item) => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              (item.deliveryProvider && item.deliveryProvider.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = selectedCategory === 'all' || item.category.toLowerCase().includes(selectedCategory.toLowerCase());
        return matchesSearch && matchesCategory;
    });

    return (
        <BuyerLayout activeTab="products">
            <Head title="Produk & Unduhan Saya — KyySolutions Buyer Hub" />

            <div className="space-y-6">
                
                {/* 1. BREADCRUMB & HEADER SECTION */}
                <div>
                    <div className="flex items-center space-x-2 text-xs text-slate-400 font-medium mb-1.5">
                        <Link href="/" className="hover:text-[#2563EB] transition-colors">Beranda</Link>
                        <span>&gt;</span>
                        <span>Buyer Hub</span>
                        <span>&gt;</span>
                        <span className="text-slate-600 font-semibold">Produk & Unduhan Saya</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
                        <div>
                            <h1 className="text-2xl sm:text-[28px] font-bold text-[#0F172A] tracking-tight">
                                Produk & Unduhan Saya
                            </h1>
                            <p className="text-xs sm:text-[13px] text-slate-500 mt-1">
                                Akses dan unduh file source code, aset desain, dan modul digital yang telah Anda beli.
                            </p>
                        </div>

                        {/* Right Status Badges */}
                        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
                            <div className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-xs font-bold shadow-2xs">
                                <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                                <span>Akun Pembeli Terverifikasi</span>
                            </div>

                            <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-slate-600 text-xs font-semibold shadow-2xs">
                                <span>Status Akun:</span>
                                <span className="flex items-center space-x-1 font-bold text-slate-800">
                                    <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                                    <span>Aktif</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. PRIMARY HUB NAVIGATION TABS */}
                <div className="flex items-center space-x-2 border-b border-[#E2E8F0] pb-px overflow-x-auto scrollbar-none">
                    <Link
                        href="/dashboard/my-products"
                        className="px-4 py-2.5 text-xs font-bold flex items-center space-x-2 text-[#2563EB] border-b-2 border-[#2563EB] -mb-px transition-colors shrink-0"
                    >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Produk & Unduhan Saya</span>
                    </Link>

                    <Link
                        href="/dashboard/orders"
                        className="px-4 py-2.5 text-xs font-semibold flex items-center space-x-2 text-slate-500 hover:text-slate-900 border-b-2 border-transparent -mb-px transition-colors shrink-0"
                    >
                        <FileText className="w-4 h-4" />
                        <span>Riwayat Faktur Transaksi</span>
                    </Link>

                    <Link
                        href="/dashboard/my-products"
                        className="px-4 py-2.5 text-xs font-semibold flex items-center space-x-2 text-slate-500 hover:text-slate-900 border-b-2 border-transparent -mb-px transition-colors shrink-0"
                    >
                        <Activity className="w-4 h-4" />
                        <span>Aktivitas Akun</span>
                    </Link>
                </div>

                {/* 3. FOUR SUMMARY CARDS ROW */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    
                    {/* Card 1: Total Software */}
                    <div className="bg-white p-4.5 rounded-2xl border border-[#E8EDF3] shadow-xs flex items-center space-x-3.5">
                        <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
                            <Package className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="text-[11px] font-semibold text-slate-500 block leading-tight">Total Software Dimiliki</span>
                            <span className="text-xl font-black text-[#0F172A] font-mono leading-snug">{products.length}</span>
                            <span className="text-[11px] text-slate-400 block">Produk digital Anda</span>
                        </div>
                    </div>

                    {/* Card 2: Akses Siap Unduh */}
                    <div className="bg-white p-4.5 rounded-2xl border border-[#E8EDF3] shadow-xs flex items-center space-x-3.5">
                        <div className="w-11 h-11 rounded-xl bg-[#ECFDF5] text-[#10B981] flex items-center justify-center shrink-0">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="text-[11px] font-semibold text-slate-500 block leading-tight">Akses Siap Unduh</span>
                            <span className="text-xl font-black text-[#0F172A] font-mono leading-snug">{products.length}</span>
                            <span className="text-[11px] text-slate-400 block">Semua link terverifikasi</span>
                        </div>
                    </div>

                    {/* Card 3: Pembelian Terakhir */}
                    <div className="bg-white p-4.5 rounded-2xl border border-[#E8EDF3] shadow-xs flex items-center space-x-3.5">
                        <div className="w-11 h-11 rounded-xl bg-[#F5F3FF] text-[#7C3AED] flex items-center justify-center shrink-0">
                            <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="text-[11px] font-semibold text-slate-500 block leading-tight">Pembelian Terakhir</span>
                            <span className="text-sm font-bold text-[#0F172A] leading-snug">28 Agu 2026</span>
                            <span className="text-[11px] text-slate-400 block truncate max-w-[140px]">E-Commerce Admin Kit</span>
                        </div>
                    </div>

                    {/* Card 4: Akun Terverifikasi */}
                    <div className="bg-white p-4.5 rounded-2xl border border-[#E8EDF3] shadow-xs flex items-center space-x-3.5">
                        <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
                            <BadgeCheck className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="text-[11px] font-semibold text-slate-500 block leading-tight">Akun Terverifikasi</span>
                            <span className="text-sm font-bold text-[#0F172A] leading-snug">Verified Buyer</span>
                            <span className="text-[11px] text-slate-400 block">Pembeli terverifikasi</span>
                        </div>
                    </div>

                </div>

                {/* 4. FILTER / UTILITY TOOLBAR */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-1">
                    
                    {/* Left: Search input */}
                    <div className="relative w-full lg:w-[380px]">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Cari produk software atau penyedia file..."
                            className="w-full h-10 pl-10 pr-4 bg-white border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#2563EB] transition-all"
                        />
                    </div>

                    {/* Right: Filter dropdowns & View toggle */}
                    <div className="flex flex-wrap items-center gap-2 self-stretch lg:self-auto">
                        
                        {/* Status Filter */}
                        <div className="relative">
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="h-10 pl-3 pr-8 bg-white border border-[#E2E8F0] rounded-xl text-xs font-semibold text-slate-700 appearance-none cursor-pointer focus:outline-none focus:border-[#2563EB]"
                            >
                                <option value="all">Semua Status</option>
                                <option value="active">Aktif</option>
                            </select>
                            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                        </div>

                        {/* Category Filter */}
                        <div className="relative">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="h-10 pl-3 pr-8 bg-white border border-[#E2E8F0] rounded-xl text-xs font-semibold text-slate-700 appearance-none cursor-pointer focus:outline-none focus:border-[#2563EB]"
                            >
                                <option value="all">Semua Kategori</option>
                                <option value="saas">SaaS Systems</option>
                                <option value="source code">Source Code</option>
                                <option value="mobile">Mobile Apps</option>
                            </select>
                            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                        </div>

                        {/* Sort */}
                        <div className="relative">
                            <button className="h-10 px-3 bg-white border border-[#E2E8F0] rounded-xl text-xs font-semibold text-slate-700 flex items-center space-x-1.5 cursor-pointer">
                                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                                <span>Terbaru</span>
                                <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
                            </button>
                        </div>

                        {/* View Toggle (Grid / List) */}
                        <div className="flex items-center bg-white border border-[#E2E8F0] rounded-xl p-0.5 ml-1">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                                    viewMode === 'grid' ? 'bg-[#EFF6FF] text-[#2563EB]' : 'text-slate-400 hover:text-slate-600'
                                }`}
                                title="Grid View"
                            >
                                <LayoutGrid className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                                    viewMode === 'list' ? 'bg-[#EFF6FF] text-[#2563EB]' : 'text-slate-400 hover:text-slate-600'
                                }`}
                                title="List View"
                            >
                                <List className="w-4 h-4" />
                            </button>
                        </div>

                    </div>

                </div>

                {/* 5. TWO-COLUMN PRODUCT GRID (Tailored Dynamically to Seller Delivery Type) */}
                <div className={`grid gap-5 ${viewMode === 'grid' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
                    {filteredProducts.map((item) => (
                        <div
                            key={item.accessId}
                            className="bg-white rounded-2xl border border-[#E8EDF3] shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between"
                        >
                            <div className="space-y-4">
                                
                                {/* Top Row: Category + Version + Active Status */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-[10px] font-black uppercase tracking-wider text-[#2563EB] bg-[#EFF6FF] px-2.5 py-0.5 rounded-full">
                                            {item.category}
                                        </span>
                                        <span className="text-[10px] font-mono font-bold text-slate-500 bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded-full">
                                            {item.version}
                                        </span>
                                    </div>

                                    <span className="text-[10px] font-bold text-[#047857] bg-[#ECFDF5] border border-[#A7F3D0] px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                                        <ShieldCheck className="w-3 h-3 text-[#10B981]" />
                                        <span>Aktif</span>
                                    </span>
                                </div>

                                {/* Product Title */}
                                <Link
                                    href={`/products/${item.slug}`}
                                    className="font-bold text-[15px] sm:text-base text-[#0F172A] hover:text-[#2563EB] transition-colors leading-snug block truncate"
                                >
                                    {item.title}
                                </Link>

                                {/* DYNAMIC DELIVERY ACCESS PANEL (Tailored to Seller Input) */}
                                <div 
                                    className="p-4 rounded-xl text-white space-y-3 border"
                                    style={{
                                        background: item.deliveryType === 'gdrive' 
                                            ? 'linear-gradient(135deg, #06281E 0%, #08382B 55%, #041F17 100%)' 
                                            : 'linear-gradient(135deg, #071A38 0%, #0A2350 55%, #06152E 100%)',
                                        borderColor: item.deliveryType === 'gdrive' ? '#065F46' : '#1E3A8A'
                                    }}
                                >
                                    <div className="flex items-center justify-between text-xs">
                                        <div className="flex items-center space-x-2">
                                            {item.deliveryType === 'gdrive' ? (
                                                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                                                    <HardDrive className="w-3.5 h-3.5" />
                                                </div>
                                            ) : (
                                                <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center">
                                                    <FolderGit2 className="w-3.5 h-3.5" />
                                                </div>
                                            )}
                                            <div>
                                                <span className="font-bold text-white text-xs block">
                                                    Penyedia File: {item.deliveryProvider}
                                                </span>
                                                <span className="text-[10px] text-slate-300">
                                                    {item.deliveryType === 'gdrive' ? 'Folder Cloud Google Drive Resmi' : 'Repository Privat GitHub Resmi'}
                                                </span>
                                            </div>
                                        </div>

                                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded-full flex items-center space-x-1">
                                            <CheckCircle2 className="w-3 h-3" />
                                            <span>Siap Unduh</span>
                                        </span>
                                    </div>

                                    {/* Direct 1-Click Access Button */}
                                    <div className="pt-1">
                                        <a
                                            href={item.deliveryUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all shadow-md cursor-pointer ${
                                                item.deliveryType === 'gdrive'
                                                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-900/30'
                                                    : 'bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#3B82F6] hover:to-[#2563EB] text-white shadow-blue-900/30'
                                            }`}
                                        >
                                            {item.deliveryType === 'gdrive' ? (
                                                <HardDrive className="w-4 h-4" />
                                            ) : (
                                                <FolderGit2 className="w-4 h-4" />
                                            )}
                                            <span>{item.deliveryActionLabel}</span>
                                            <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-80" />
                                        </a>
                                    </div>
                                </div>

                                {/* Order Ref & Purchase Date */}
                                <div className="flex items-center justify-between text-xs text-slate-500 font-medium pt-0.5">
                                    <div className="flex items-center space-x-1.5">
                                        <FileText className="w-3.5 h-3.5 text-slate-400" />
                                        <span>Order Ref: <span className="font-mono text-slate-700 font-semibold">{item.orderNumber}</span></span>
                                    </div>
                                    <div className="flex items-center space-x-1.5">
                                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                        <span>Tanggal Beli: <span className="text-slate-700 font-semibold">{item.purchasedAt}</span></span>
                                    </div>
                                </div>

                            </div>

                            {/* Action Row */}
                            <div className="pt-3.5 mt-3.5 border-t border-slate-100 flex items-center justify-between">
                                
                                <div className="text-[11px] text-slate-400 font-medium">
                                    Tautan cloud langsung dari penjual
                                </div>

                                <button
                                    onClick={() => openReviewModal(item)}
                                    className="text-xs font-semibold text-slate-500 hover:text-amber-500 flex items-center space-x-1 transition-colors cursor-pointer"
                                >
                                    <Star className="w-3.5 h-3.5 text-slate-400 hover:text-amber-400" />
                                    <span>{item.hasReviewed ? 'Ubah Ulasan' : 'Beri Ulasan'}</span>
                                </button>

                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* Modal Beri Rating & Ulasan */}
            <AnimatePresence>
                {reviewModalProduct && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setReviewModalProduct(null)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="relative w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 z-10 space-y-4"
                        >
                            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                                <div>
                                    <h3 className="text-base font-bold text-[#0F172A]">Beri Rating & Ulasan</h3>
                                    <p className="text-xs text-slate-500 truncate max-w-xs">{reviewModalProduct.title}</p>
                                </div>
                                <button onClick={() => setReviewModalProduct(null)} className="text-slate-400 hover:text-slate-600">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={submitReviewForm} className="space-y-4 text-xs">
                                
                                <div>
                                    <label className="font-bold text-[#0F172A] block mb-2">Penilaian Bintang *</label>
                                    <div className="flex items-center space-x-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setData('rating', star)}
                                                onMouseEnter={() => setHoverRating(star)}
                                                onMouseLeave={() => setHoverRating(0)}
                                                className="p-1 cursor-pointer transition-transform hover:scale-110"
                                            >
                                                <Star 
                                                    className={`w-7 h-7 ${
                                                        (hoverRating || data.rating) >= star 
                                                            ? 'text-amber-400 fill-amber-400' 
                                                            : 'text-slate-200'
                                                    }`} 
                                                />
                                            </button>
                                        ))}
                                        <span className="text-xs font-bold font-mono text-amber-600 ml-2">
                                            {hoverRating || data.rating}.0 / 5.0
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <label className="font-bold text-[#0F172A] block mb-1">Feedback & Ulasan Anda *</label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={data.comment}
                                        onChange={(e) => setData('comment', e.target.value)}
                                        placeholder="Ceritakan pengalaman Anda menggunakan software ini, kualitas kode, kemudahan instalasi, dll..."
                                        className="w-full p-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-blue-500 leading-relaxed text-xs"
                                    />
                                    {errors.comment && <p className="text-red-500 mt-1">{errors.comment}</p>}
                                </div>

                                <div className="pt-3 flex items-center justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => setReviewModalProduct(null)}
                                        className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-5 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold cursor-pointer disabled:opacity-50"
                                    >
                                        {processing ? 'Mengirim...' : 'Kirim Ulasan'}
                                    </button>
                                </div>

                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </BuyerLayout>
    );
}
