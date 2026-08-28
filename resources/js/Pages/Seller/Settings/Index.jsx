import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { 
    Store, 
    Save, 
    ExternalLink, 
    ShieldCheck, 
    Globe
} from 'lucide-react';
import SellerLayout from '@/Layouts/SellerLayout';

export default function SellerSettingsIndex({ store = {} }) {
    const { data, setData, post, processing, errors } = useForm({
        name: store.name || '',
        bio: store.bio || '',
    });

    const submitStoreForm = (e) => {
        e.preventDefault();
        post('/seller/settings');
    };

    return (
        <SellerLayout title="Pengaturan Toko" store={store}>
            <Head title="Pengaturan Toko Mitra — KyySolutions Studio" />

            <div className="space-y-6 max-w-3xl">
                
                {/* Header Row */}
                <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
                            Profil Toko & Pengaturan Developer
                        </h1>
                        <p className="text-xs text-slate-500 mt-1">
                            Kelola identitas publik toko dan deskripsi studio Anda di marketplace.
                        </p>
                    </div>

                    <a
                        href={`/stores/${store.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center space-x-1.5 transition-colors self-start sm:self-auto"
                    >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Lihat Toko Publik</span>
                    </a>
                </div>

                {/* Settings Form */}
                <div className="bg-white p-6 rounded-2xl border border-[#E8EDF3] shadow-xs space-y-6">
                    
                    <form onSubmit={submitStoreForm} className="space-y-4 text-xs">
                        
                        <div>
                            <label className="font-bold text-[#0F172A] block mb-1">Nama Toko / Developer Studio *</label>
                            <input 
                                type="text" 
                                required
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Contoh: KyySolutions Studio"
                                className="w-full h-10 px-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 font-semibold"
                            />
                            {errors.name && <p className="text-red-500 mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="font-bold text-[#0F172A] block mb-1">Bio & Deskripsi Studio</label>
                            <textarea 
                                rows={4}
                                value={data.bio}
                                onChange={(e) => setData('bio', e.target.value)}
                                placeholder="Jelaskan spesialisasi tim Anda, teknologi yang dikuasai, atau portofolio..."
                                className="w-full p-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 leading-relaxed"
                            />
                        </div>

                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                            <div className="font-bold text-[#0F172A]">Informasi Komisi Platform</div>
                            <div className="flex justify-between text-slate-500">
                                <span>Bagi Hasil Penjualan</span>
                                <span className="font-bold font-mono text-emerald-600">90% untuk Mitra Developer</span>
                            </div>
                            <div className="flex justify-between text-slate-500">
                                <span>Biaya Komisi Platform</span>
                                <span className="font-bold font-mono text-slate-700">10% Platform Fee</span>
                            </div>
                        </div>

                        <div className="pt-3 flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold flex items-center space-x-1.5 shadow-md shadow-blue-500/20 cursor-pointer disabled:opacity-50"
                            >
                                <Save className="w-4 h-4" />
                                <span>{processing ? 'Menyimpan...' : 'Simpan Profil'}</span>
                            </button>
                        </div>

                    </form>

                </div>

            </div>
        </SellerLayout>
    );
}
