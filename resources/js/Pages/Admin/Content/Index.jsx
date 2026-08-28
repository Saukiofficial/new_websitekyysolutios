import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { 
    Briefcase, 
    Newspaper, 
    Plus, 
    Eye, 
    Trash2, 
    Calendar,
    User,
    ExternalLink
} from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function AdminContentIndex({ type = 'portfolio', title = 'Manajemen Konten', items = [] }) {
    return (
        <AdminLayout title={title} breadcrumb={`Business > ${type.toUpperCase()}`}>
            <Head title={`${title} — Super Admin KyySolutions`} />

            <div className="space-y-6">
                
                {/* Header Toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E9EEF5] shadow-xs">
                    <div>
                        <h2 className="text-base font-bold text-[#0F172A]">{title}</h2>
                        <p className="text-xs text-[#64748B] mt-0.5">
                            {type === 'portfolio' 
                                ? 'Kelola showcase proyek enterprise dan studi kasus rekayasa software.' 
                                : 'Kelola publikasi artikel teknik, arsitektur software, dan update platform.'}
                        </p>
                    </div>

                    <button
                        onClick={() => alert(`Fitur tambah ${type} baru.`)}
                        className="px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center justify-center space-x-2 transition-all cursor-pointer shrink-0"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Tambah {type === 'portfolio' ? 'Proyek Baru' : 'Artikel Baru'}</span>
                    </button>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl border border-[#E9EEF5] shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-[#FAFBFD] text-[#64748B] font-bold border-b border-slate-100 uppercase tracking-wider text-[11px]">
                                <tr>
                                    <th className="py-3.5 px-4">{type === 'portfolio' ? 'Nama Proyek Klien' : 'Judul Artikel'}</th>
                                    <th className="py-3.5 px-4">{type === 'portfolio' ? 'Klien / Industri' : 'Penulis'}</th>
                                    <th className="py-3.5 px-4">{type === 'portfolio' ? 'Kategori' : 'Views'}</th>
                                    <th className="py-3.5 px-4">Status</th>
                                    <th className="py-3.5 px-4">Tanggal Rilis</th>
                                    <th className="py-3.5 px-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-700">
                                {items.map((it) => (
                                    <tr key={it.id} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="py-3.5 px-4 font-bold text-[#0F172A]">
                                            <div className="flex items-center space-x-2.5">
                                                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold">
                                                    {type === 'portfolio' ? <Briefcase className="w-4 h-4" /> : <Newspaper className="w-4 h-4" />}
                                                </div>
                                                <span>{it.title}</span>
                                            </div>
                                        </td>
                                        <td className="py-3.5 px-4 text-slate-600 font-medium">
                                            {it.client || it.author}
                                        </td>
                                        <td className="py-3.5 px-4 font-mono font-medium text-slate-700">
                                            {it.category || it.views}
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                                {it.status}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                                            {it.date}
                                        </td>
                                        <td className="py-3.5 px-4 text-right">
                                            <div className="inline-flex items-center space-x-1.5">
                                                <button className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer">
                                                    <Eye className="w-3.5 h-3.5" />
                                                </button>
                                                <button className="w-7 h-7 rounded-lg bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
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
