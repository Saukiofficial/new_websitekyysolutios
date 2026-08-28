import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { 
    Bell, 
    ShoppingCart, 
    Package, 
    ArrowDownToLine, 
    ShieldCheck, 
    CheckCircle2,
    Clock
} from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function AdminNotificationsIndex({ notifications = [] }) {
    const [list, setList] = useState(notifications);

    const markAllAsRead = () => {
        setList(list.map(n => ({ ...n, unread: false })));
    };

    return (
        <AdminLayout title="Pusat Notifikasi & Log Sistem" breadcrumb="System > Notifikasi">
            <Head title="Pusat Notifikasi — Super Admin KyySolutions" />

            <div className="max-w-4xl space-y-6">
                
                {/* Header Toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E9EEF5] shadow-xs">
                    <div>
                        <h2 className="text-base font-bold text-[#0F172A]">Pusat Notifikasi & Alert Operasional</h2>
                        <p className="text-xs text-[#64748B] mt-0.5">Semua peringatan transaksi, pengajuan produk seller, dan aktivitas keamanan akun.</p>
                    </div>

                    <button
                        onClick={markAllAsRead}
                        className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer self-start sm:self-auto"
                    >
                        Tandai Semua Dibaca
                    </button>
                </div>

                {/* Notifications List */}
                <div className="bg-white rounded-2xl border border-[#E9EEF5] shadow-xs divide-y divide-slate-100 overflow-hidden">
                    {list.map((n) => (
                        <div 
                            key={n.id} 
                            className={`p-5 flex items-start space-x-4 transition-colors ${
                                n.unread ? 'bg-blue-50/40 hover:bg-blue-50/60' : 'hover:bg-slate-50/70'
                            }`}
                        >
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                                n.type === 'order' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                n.type === 'product' ? 'bg-blue-50 text-[#2563EB] border-blue-100' :
                                n.type === 'withdrawal' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                'bg-slate-50 text-slate-700 border-slate-200'
                            }`}>
                                {n.type === 'order' && <ShoppingCart className="w-5 h-5" />}
                                {n.type === 'product' && <Package className="w-5 h-5" />}
                                {n.type === 'withdrawal' && <ArrowDownToLine className="w-5 h-5" />}
                                {n.type === 'security' && <ShieldCheck className="w-5 h-5" />}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                    <h4 className={`text-xs font-bold ${n.unread ? 'text-[#2563EB]' : 'text-[#0F172A]'}`}>
                                        {n.title}
                                    </h4>
                                    <span className="text-[10px] font-mono text-slate-400 shrink-0">{n.time}</span>
                                </div>
                                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </AdminLayout>
    );
}
