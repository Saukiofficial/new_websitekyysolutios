import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    Store, 
    ShieldCheck, 
    Star, 
    Package, 
    ShoppingBag, 
    ArrowRight, 
    CheckCircle2, 
    Search,
    ExternalLink
} from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function StoreShow({ store = {}, products = [] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = products.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <PublicLayout>
            <Head title={`${store.name} — Toko Mitra Resmi KyySolutions`} />

            <div className="pt-24 sm:pt-28 pb-16 bg-[#F8FAFC] min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Store Hero Banner Card */}
                    <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-6 sm:p-10 space-y-6 relative overflow-hidden">
                        
                        {/* Background subtle decoration */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                            
                            <div className="flex items-start space-x-5">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] text-white flex items-center justify-center font-black text-2xl shadow-lg shadow-blue-500/20 shrink-0">
                                    <Store className="w-8 h-8 sm:w-10 sm:h-10" />
                                </div>

                                <div className="space-y-1.5">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h1 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight">
                                            {store.name}
                                        </h1>
                                        {store.isVerified && (
                                            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                                <span>Mitra Terverifikasi</span>
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                                        {store.bio || 'Mitra pengembang software resmi dan terverifikasi di KyySolutions Marketplace.'}
                                    </p>
                                </div>
                            </div>

                            {/* Store Stats */}
                            <div className="flex items-center space-x-4 self-start md:self-auto bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                                <div className="text-center px-3 border-r border-slate-200">
                                    <div className="text-lg font-black font-mono text-[#0F172A]">{store.productsCount}</div>
                                    <div className="text-[11px] font-semibold text-slate-400">Software</div>
                                </div>
                                <div className="text-center px-3 border-r border-slate-200">
                                    <div className="text-lg font-black font-mono text-[#0F172A]">{store.salesCount}</div>
                                    <div className="text-[11px] font-semibold text-slate-400">Terjual</div>
                                </div>
                                <div className="text-center px-3">
                                    <div className="text-lg font-black font-mono text-amber-500 flex items-center justify-center">
                                        <Star className="w-4 h-4 fill-current mr-1" />
                                        <span>{store.rating}</span>
                                    </div>
                                    <div className="text-[11px] font-semibold text-slate-400">Rating</div>
                                </div>
                            </div>

                        </div>

                    </div>

                    {/* Catalog Header & Search */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-lg font-bold text-[#0F172A]">Katalog Software dari Toko Ini</h2>
                            <p className="text-xs text-slate-500">Semua produk siap pakai dengan lisensi komersial terverifikasi</p>
                        </div>

                        <div className="relative w-full sm:w-72">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input 
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Cari software toko..."
                                className="w-full h-10 pl-10 pr-4 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#2563EB]"
                            />
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((p) => (
                            <div 
                                key={p.id}
                                className="bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all p-6 flex flex-col justify-between space-y-4"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB] bg-blue-50 px-2.5 py-0.5 rounded-full">
                                            {p.category}
                                        </span>
                                        <div className="flex items-center space-x-1 text-xs font-bold text-amber-500">
                                            <Star className="w-3.5 h-3.5 fill-current" />
                                            <span>{p.rating}</span>
                                        </div>
                                    </div>

                                    <Link 
                                        href={`/products/${p.slug}`}
                                        className="font-extrabold text-base text-[#0F172A] hover:text-[#2563EB] transition-colors leading-snug block line-clamp-2"
                                    >
                                        {p.title}
                                    </Link>

                                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                        {p.shortDescription}
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                    <div>
                                        <span className="text-[10px] text-slate-400 block font-medium">Harga Reguler</span>
                                        <span className="font-black font-mono text-base text-[#0F172A]">{p.priceFormatted}</span>
                                    </div>

                                    <Link
                                        href={`/checkout/${p.id}`}
                                        className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center space-x-1 transition-colors"
                                    >
                                        <span>Beli Sekarang</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </PublicLayout>
    );
}
