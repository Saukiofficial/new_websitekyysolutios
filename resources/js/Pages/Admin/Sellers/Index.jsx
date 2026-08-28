import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { 
    Store, 
    Search, 
    ShieldCheck, 
    Star, 
    CheckCircle2, 
    XCircle, 
    Package, 
    Clock, 
    Mail, 
    ExternalLink 
} from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function AdminSellersIndex({ sellers, counts, filters }) {
    const [selectedStatus, setSelectedStatus] = useState(filters.status || 'all');
    const [searchQuery, setSearchQuery] = useState(filters.q || '');

    const handleFilterChange = (status) => {
        setSelectedStatus(status);
        router.get('/admin/sellers', { status: status, q: searchQuery }, { preserveState: true, replace: true });
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        router.get('/admin/sellers', { status: selectedStatus, q: searchQuery }, { preserveState: true, replace: true });
    };

    const handleToggleVerification = (id) => {
        router.patch(`/admin/sellers/${id}/verify`);
    };

    return (
        <AdminLayout title="Manajemen & Verifikasi Seller" breadcrumb="Management > Seller">
            <Head title="Kelola Seller & Toko — Super Admin KyySolutions" />

            <div className="space-y-6">
                
                {/* Header Toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E9EEF5] shadow-xs">
                    <div>
                        <h2 className="text-base font-bold text-[#0F172A]">Daftar Toko & Developer Penjual</h2>
                        <p className="text-xs text-[#64748B] mt-0.5">Kelola verifikasi toko mitra, performa penjualan, rating, dan moderasi profil seller.</p>
                    </div>

                    <div className="flex items-center space-x-2 text-xs font-mono font-bold text-slate-700 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                        <span>Total Seller:</span>
                        <span className="text-[#2563EB]">{counts.all}</span>
                    </div>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                        {[
                            { key: 'all', label: 'Semua Seller', count: counts.all },
                            { key: 'active', label: 'Toko Aktif', count: counts.active, badgeColor: 'bg-emerald-100 text-emerald-800' },
                            { key: 'verified', label: 'Terverifikasi', count: counts.verified, badgeColor: 'bg-blue-100 text-blue-800' },
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => handleFilterChange(tab.key)}
                                className={`h-10 px-4 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer shrink-0 border ${
                                    selectedStatus === tab.key
                                        ? 'bg-[#1557C8] text-white border-[#1557C8] shadow-sm'
                                        : 'bg-white text-slate-600 border-[#E2E8F0] hover:bg-slate-50'
                                }`}
                            >
                                <span>{tab.label}</span>
                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                                    selectedStatus === tab.key ? 'bg-white/20 text-white' : (tab.badgeColor || 'bg-slate-100 text-slate-600')
                                }`}>
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSearchSubmit} className="relative w-full lg:w-72">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari nama toko / username..."
                            className="w-full h-10 pl-9 pr-3 text-xs bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#93C5FD] transition-colors"
                        />
                    </form>
                </div>

                {/* Sellers Table */}
                <div className="bg-white rounded-2xl border border-[#E9EEF5] shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-[#FAFBFD] text-[#64748B] font-bold border-b border-slate-100 uppercase tracking-wider text-[11px]">
                                <tr>
                                    <th className="py-3.5 px-4">Nama Toko & Username</th>
                                    <th className="py-3.5 px-4">Kontak Pemilik</th>
                                    <th className="py-3.5 px-4 text-center">Total Produk</th>
                                    <th className="py-3.5 px-4 text-center">Rating</th>
                                    <th className="py-3.5 px-4">Lencana Verifikasi</th>
                                    <th className="py-3.5 px-4">Status Toko</th>
                                    <th className="py-3.5 px-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-700">
                                {sellers.map((s) => (
                                    <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                                        
                                        <td className="py-3.5 px-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 font-black text-xs flex items-center justify-center shrink-0 border border-purple-100">
                                                    {s.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-[#0F172A] flex items-center space-x-1.5">
                                                        <span>{s.name}</span>
                                                        {s.isOfficial && (
                                                            <span className="text-[9px] font-bold bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded">Official</span>
                                                        )}
                                                    </div>
                                                    <div className="text-[10px] text-slate-400 font-mono">@{s.username}</div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="py-3.5 px-4">
                                            <div className="font-mono text-slate-700">{s.email}</div>
                                            <div className="text-[10px] text-slate-400 font-mono">{s.phone}</div>
                                        </td>

                                        <td className="py-3.5 px-4 text-center font-bold font-mono text-slate-900">
                                            {s.totalProducts} item
                                        </td>

                                        <td className="py-3.5 px-4 text-center">
                                            <div className="text-[11px] text-amber-500 font-bold flex items-center justify-center">
                                                <Star className="w-3.5 h-3.5 fill-current mr-0.5 text-amber-400" />
                                                <span>{s.rating}</span>
                                            </div>
                                        </td>

                                        <td className="py-3.5 px-4">
                                            <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                                s.isVerified ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-600'
                                            }`}>
                                                <ShieldCheck className="w-3 h-3" />
                                                <span>{s.isVerified ? 'Verified Partner' : 'Unverified'}</span>
                                            </span>
                                        </td>

                                        <td className="py-3.5 px-4">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                                Aktif
                                            </span>
                                        </td>

                                        <td className="py-3.5 px-4 text-right">
                                            <button
                                                onClick={() => handleToggleVerification(s.id)}
                                                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 text-[10px] font-bold transition-colors cursor-pointer"
                                            >
                                                {s.isVerified ? 'Cabut Verifikasi' : 'Beri Verifikasi'}
                                            </button>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </AdminLayout>
    );
}
