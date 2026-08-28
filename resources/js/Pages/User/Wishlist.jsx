import { Head, Link, router } from '@inertiajs/react';
import BuyerLayout from '@/Layouts/BuyerLayout';
import { 
    Heart, 
    Trash2, 
    ShoppingCart, 
    Star, 
    Download, 
    ExternalLink, 
    ArrowRight, 
    ShoppingBag, 
    Store,
    ShieldCheck,
    CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Wishlist({ wishlist = [], user = {} }) {
    const handleRemoveFromWishlist = (productId) => {
        router.post('/dashboard/wishlist/toggle', { product_id: productId }, {
            preserveScroll: true,
        });
    };

    return (
        <BuyerLayout>
            <Head title="Wishlist & Software Favorit — Buyer Hub KyySolutions" />

            <div className="space-y-6 max-w-7xl mx-auto pb-12 font-sans">
                
                {/* 1. Header Banner */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs">
                    <div className="space-y-1">
                        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold uppercase tracking-wider">
                            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                            <span>Koleksi Tersimpan ({wishlist.length} Item)</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                            Daftar Keinginan & Software Favorit
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500">
                            Pantau harga promo dan akses cepat untuk checkout software impian Anda.
                        </p>
                    </div>

                    <Link
                        href="/marketplace"
                        className="px-5 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#2563EB] font-bold text-xs transition-colors inline-flex items-center space-x-1.5 shrink-0"
                    >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Eksplor Marketplace</span>
                    </Link>
                </div>

                {/* 2. Wishlist Grid or Empty State */}
                {wishlist.length === 0 ? (
                    <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center my-6 shadow-xs">
                        <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4 border border-rose-100">
                            <Heart className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-bold text-[#0F172A]">Belum Ada Software di Wishlist Anda</h3>
                        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-2 mb-6">
                            Jelajahi ribuan template SaaS, source code web, aplikasi mobile, dan UI kits siap pakai di Marketplace.
                        </p>
                        <Link
                            href="/marketplace"
                            className="px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs shadow-md shadow-blue-500/20 inline-flex items-center space-x-2 transition-all"
                        >
                            <ShoppingCart className="w-4 h-4" />
                            <span>Mulai Cari Software</span>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {wishlist.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all flex flex-col justify-between group"
                            >
                                <div>
                                    
                                    {/* Thumbnail Image Header */}
                                    <div className="relative h-44 bg-gradient-to-br from-slate-800 to-slate-950 overflow-hidden">
                                        <img 
                                            src={item.thumbnail} 
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = '/images/products/saas.png';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                                        
                                        {/* Top Badges */}
                                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                                            <span className="px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-md text-[10px] font-bold text-slate-800 shadow-xs uppercase tracking-wider">
                                                {item.category}
                                            </span>

                                            <button
                                                onClick={() => handleRemoveFromWishlist(item.id)}
                                                className="w-8 h-8 rounded-full bg-white/90 hover:bg-rose-50 text-slate-400 hover:text-rose-600 flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                                                title="Hapus dari Wishlist"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>

                                        {/* Bottom Overlay Store & Rating */}
                                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                                            <div className="flex items-center space-x-1 text-[11px] font-semibold text-slate-200">
                                                <Store className="w-3.5 h-3.5 text-blue-400" />
                                                <span className="truncate max-w-[120px]">{item.storeName}</span>
                                            </div>
                                            <div className="flex items-center space-x-1 px-2 py-0.5 rounded bg-black/40 backdrop-blur-md text-amber-300 text-[10px] font-bold">
                                                <Star className="w-3 h-3 fill-amber-300" />
                                                <span>{item.rating}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Body */}
                                    <div className="p-5 space-y-3">
                                        <Link href={`/products/${item.slug}`} className="block">
                                            <h3 className="text-sm font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors leading-snug line-clamp-2">
                                                {item.title}
                                            </h3>
                                        </Link>

                                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                            {item.shortDescription}
                                        </p>

                                        {/* Price block */}
                                        <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between">
                                            <div>
                                                <span className="text-sm font-extrabold text-[#0F172A]">{item.priceFormatted}</span>
                                                <span className="text-[10px] text-slate-400 line-through ml-1.5">{item.originalPrice}</span>
                                            </div>
                                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                                                {item.discount}
                                            </span>
                                        </div>

                                    </div>

                                </div>

                                {/* Card Footer: Direct Checkout Action */}
                                <div className="p-5 pt-0">
                                    <Link
                                        href={`/checkout/${item.id}`}
                                        className="w-full h-10 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-xs flex items-center justify-center space-x-1.5 transition-all"
                                    >
                                        <ShoppingCart className="w-3.5 h-3.5" />
                                        <span>Beli Sekarang</span>
                                    </Link>
                                </div>

                            </motion.div>
                        ))}
                    </div>
                )}

            </div>
        </BuyerLayout>
    );
}
