import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { 
    Layers, 
    MessageSquare, 
    Clock, 
    Phone, 
    ExternalLink, 
    CheckCircle2, 
    AlertCircle,
    Calendar,
    Briefcase
} from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function AdminServicesIndex({ requests }) {
    return (
        <AdminLayout title="Permintaan Jasa & Konsultasi" breadcrumb="Business > Services">
            <Head title="Permintaan Jasa Klien — Super Admin KyySolutions" />

            <div className="space-y-6">
                
                {/* Header Toolbar */}
                <div className="bg-white p-5 rounded-2xl border border-[#E9EEF5] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-base font-bold text-[#0F172A]">Permintaan Konsultasi & Jasa Klien</h2>
                        <p className="text-xs text-[#64748B] mt-0.5">Daftar inquiry proyek dari modal estimasi dan konsultasi WhatsApp KyySolutions.</p>
                    </div>

                    <span className="text-xs font-mono font-bold bg-blue-50 text-[#2563EB] px-3 py-1.5 rounded-xl border border-blue-100 self-start sm:self-auto">
                        {requests.length} Permintaan Masuk
                    </span>
                </div>

                {/* Services Table */}
                <div className="bg-white rounded-2xl border border-[#E9EEF5] shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-[#FAFBFD] text-[#64748B] font-bold border-b border-slate-100 uppercase tracking-wider text-[11px]">
                                <tr>
                                    <th className="py-3.5 px-4 font-mono">ID Inquiry</th>
                                    <th className="py-3.5 px-4">Nama Klien / Perusahaan</th>
                                    <th className="py-3.5 px-4">Layanan yang Dibutuhkan</th>
                                    <th className="py-3.5 px-4">Estimasi Budget</th>
                                    <th className="py-3.5 px-4">Target Timeline</th>
                                    <th className="py-3.5 px-4">Status</th>
                                    <th className="py-3.5 px-4 text-right">Aksi WhatsApp</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-700">
                                {requests.map((req) => (
                                    <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="py-3.5 px-4 font-mono font-bold text-[#2563EB]">{req.id}</td>
                                        <td className="py-3.5 px-4">
                                            <div className="font-bold text-[#0F172A]">{req.client}</div>
                                            <div className="text-[10px] text-slate-400 font-mono">{req.phone}</div>
                                        </td>
                                        <td className="py-3.5 px-4 font-semibold text-slate-800">{req.service}</td>
                                        <td className="py-3.5 px-4 font-mono font-medium text-slate-900">{req.budget}</td>
                                        <td className="py-3.5 px-4 text-slate-600">{req.timeline}</td>
                                        <td className="py-3.5 px-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                                req.status === 'Baru' ? 'bg-purple-100 text-purple-700' :
                                                req.status === 'Proses' ? 'bg-blue-100 text-blue-700' :
                                                req.status === 'Review' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                                            }`}>
                                                {req.status}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4 text-right">
                                            <a
                                                href={`https://wa.me/${req.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Halo ${req.client}, kami dari tim engineering KyySolutions menindaklanjuti permohonan jasa ${req.service}.`)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white font-bold transition-colors inline-flex items-center space-x-1"
                                            >
                                                <MessageSquare className="w-3.5 h-3.5" />
                                                <span>Hubungi</span>
                                            </a>
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
