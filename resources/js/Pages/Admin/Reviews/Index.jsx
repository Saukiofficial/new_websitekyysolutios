import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { 
    Star, 
    Check, 
    X, 
    Trash2, 
    MessageSquare, 
    ExternalLink, 
    ShieldCheck, 
    ThumbsUp,
    Filter
} from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function AdminReviewsIndex({ reviews = [], counts = {}, filters = {} }) {
    const [selectedStatus, setSelectedStatus] = useState(filters.status || 'all');
    const reviewList = Array.isArray(reviews) ? reviews : [];

    const handleFilterChange = (status) => {
        setSelectedStatus(status);
        router.get('/admin/reviews', { status: status }, { preserveState: true, replace: true });
    };

    const handleUpdateStatus = (id, newStatus) => {
        router.patch(`/admin/reviews/${id}/status`, { status: newStatus });
    };

    const handleDeleteReview = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus ulasan ini?')) {
            router.delete(`/admin/reviews/${id}`);
        }
    };

    return (
        <AdminLayout title="Moderasi Ulasan Pembeli" breadcrumb="Marketplace > Review">
            <Head title="Moderasi Ulasan Pembeli — Super Admin KyySolutions" />

            <div className="space-y-6">
                
                {/* Header Toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E9EEF5] shadow-xs">
                    <div>
                        <h2 className="text-base font-bold text-[#0F172A]">Ulasan & Rating Pembeli</h2>
                        <p className="text-xs text-[#64748B] mt-0.5">Kelola testimoni software digital dan moderasi feedback pembeli terverifikasi.</p>
                    </div>

                    <div className="flex items-center space-x-2 text-xs font-mono font-bold text-slate-700 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                        <span>Total Ulasan:</span>
                        <span className="text-[#2563EB]">{counts.all || reviewList.length}</span>
                    </div>
                </div>

                {/* Status Tabs */}
                <div className="flex items-center space-x-2 overflow-x-auto pb-1">
                    {[
                        { key: 'all', label: 'Semua Ulasan', count: counts.all || reviewList.length },
                        { key: 'approved', label: 'Disetujui (Tampil)', count: counts.approved || reviewList.length, badgeColor: 'bg-emerald-100 text-emerald-800' },
                        { key: 'pending', label: 'Menunggu Moderasi', count: counts.pending || 0, badgeColor: 'bg-amber-100 text-amber-800' },
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

                {/* Reviews List */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {reviewList.map((rev) => (
                        <div key={rev.id} className="bg-white p-5 rounded-2xl border border-[#E9EEF5] shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                            <div>
                                
                                {/* Top Product & Rating */}
                                <div className="flex items-start justify-between gap-2 mb-3">
                                    <div className="min-w-0">
                                        <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Produk Software</span>
                                        <h4 className="font-bold text-xs text-[#0F172A] truncate mt-0.5">
                                            {rev.productTitle}
                                        </h4>
                                    </div>

                                    {/* Star Rating */}
                                    <div className="flex items-center text-amber-500 font-bold text-xs bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-100 shrink-0">
                                        <Star className="w-3.5 h-3.5 fill-current mr-1 text-amber-400" />
                                        <span>{rev.rating}.0</span>
                                    </div>
                                </div>

                                {/* Review Content */}
                                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 my-2">
                                    <p className="text-xs text-slate-700 italic leading-relaxed">
                                        "{rev.comment}"
                                    </p>
                                </div>

                            </div>

                            {/* Reviewer Info & Actions Footer */}
                            <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between">
                                <div className="min-w-0">
                                    <div className="font-bold text-xs text-[#0F172A] flex items-center space-x-1">
                                        <span>{rev.reviewerName}</span>
                                        <ShieldCheck className="w-3 h-3 text-blue-500 shrink-0" />
                                    </div>
                                    <span className="text-[10px] text-slate-400 block">{rev.reviewerRole}</span>
                                </div>

                                <div className="flex items-center space-x-1.5 shrink-0">
                                    <button
                                        onClick={() => handleDeleteReview(rev.id)}
                                        className="w-7 h-7 rounded-lg bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                                        title="Hapus Ulasan"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </AdminLayout>
    );
}
