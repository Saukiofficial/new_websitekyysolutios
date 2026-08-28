import { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Users, 
    Plus, 
    Search, 
    Shield, 
    ShoppingBag, 
    Store, 
    Check, 
    Ban, 
    X, 
    Mail, 
    Phone,
    UserCheck,
    UserX
} from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function AdminUsersIndex({ users, counts, filters }) {
    const [selectedRole, setSelectedRole] = useState(filters.role || 'all');
    const [searchQuery, setSearchQuery] = useState(filters.q || '');
    const [showCreateModal, setShowCreateModal] = useState(false);

    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        email: '',
        password: '',
        role: 'buyer',
        phone: '',
    });

    const handleFilterChange = (role) => {
        setSelectedRole(role);
        router.get('/admin/users', { role: role, q: searchQuery }, { preserveState: true, replace: true });
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        router.get('/admin/users', { role: selectedRole, q: searchQuery }, { preserveState: true, replace: true });
    };

    const handleToggleStatus = (id) => {
        router.patch(`/admin/users/${id}/toggle-status`);
    };

    const handleCreateUser = (e) => {
        e.preventDefault();
        post('/admin/users', {
            onSuccess: () => {
                setShowCreateModal(false);
                reset();
            }
        });
    };

    return (
        <AdminLayout title="Manajemen Pengguna (Users)" breadcrumb="Management > Users">
            <Head title="Kelola Pengguna — Super Admin KyySolutions" />

            <div className="space-y-6">
                
                {/* Header Toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E9EEF5] shadow-xs">
                    <div>
                        <h2 className="text-base font-bold text-[#0F172A]">Daftar Akun Pengguna Platform</h2>
                        <p className="text-xs text-[#64748B] mt-0.5">Kelola seluruh data buyer, seller developer, dan tim administrator.</p>
                    </div>

                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center justify-center space-x-2 transition-all cursor-pointer shrink-0"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Tambah User Baru</span>
                    </button>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                        {[
                            { key: 'all', label: 'Semua User', count: counts.all },
                            { key: 'buyer', label: 'Buyer', count: counts.buyer, badgeColor: 'bg-blue-100 text-blue-800' },
                            { key: 'seller', label: 'Seller Developer', count: counts.seller, badgeColor: 'bg-purple-100 text-purple-800' },
                            { key: 'admin', label: 'Super Admin', count: counts.admin, badgeColor: 'bg-emerald-100 text-emerald-800' },
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => handleFilterChange(tab.key)}
                                className={`h-10 px-4 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer shrink-0 border ${
                                    selectedRole === tab.key
                                        ? 'bg-[#1557C8] text-white border-[#1557C8] shadow-sm'
                                        : 'bg-white text-slate-600 border-[#E2E8F0] hover:bg-slate-50'
                                }`}
                            >
                                <span>{tab.label}</span>
                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                                    selectedRole === tab.key ? 'bg-white/20 text-white' : (tab.badgeColor || 'bg-slate-100 text-slate-600')
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
                            placeholder="Cari nama atau email..."
                            className="w-full h-10 pl-9 pr-3 text-xs bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#93C5FD] transition-colors"
                        />
                    </form>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-2xl border border-[#E9EEF5] shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-[#FAFBFD] text-[#64748B] font-bold border-b border-slate-100 uppercase tracking-wider text-[11px]">
                                <tr>
                                    <th className="py-3.5 px-4">Nama Pengguna</th>
                                    <th className="py-3.5 px-4">Email</th>
                                    <th className="py-3.5 px-4">Role Akses</th>
                                    <th className="py-3.5 px-4">Nomor HP</th>
                                    <th className="py-3.5 px-4">Status</th>
                                    <th className="py-3.5 px-4">Bergabung</th>
                                    <th className="py-3.5 px-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-700">
                                {users.map((u) => (
                                    <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                                        
                                        <td className="py-3.5 px-4">
                                            <div className="flex items-center space-x-2.5">
                                                <div className="w-8 h-8 rounded-lg bg-blue-600/10 text-[#2563EB] font-bold flex items-center justify-center text-xs">
                                                    {u.name.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="font-bold text-[#0F172A]">{u.name}</span>
                                            </div>
                                        </td>

                                        <td className="py-3.5 px-4 font-mono text-slate-600">{u.email}</td>

                                        <td className="py-3.5 px-4">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                                                u.role === 'admin' ? 'bg-emerald-100 text-emerald-800' :
                                                u.role === 'seller' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                                            }`}>
                                                {u.role.toUpperCase()}
                                            </span>
                                        </td>

                                        <td className="py-3.5 px-4 font-mono text-slate-500">{u.phone}</td>

                                        <td className="py-3.5 px-4">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                                u.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                                            }`}>
                                                {u.status === 'active' ? 'Aktif' : 'Diblokir'}
                                            </span>
                                        </td>

                                        <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">{u.createdAt}</td>

                                        <td className="py-3.5 px-4 text-right">
                                            <button
                                                onClick={() => handleToggleStatus(u.id)}
                                                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors cursor-pointer ${
                                                    u.status === 'active' 
                                                        ? 'bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white' 
                                                        : 'bg-emerald-50 hover:bg-emerald-600 text-emerald-600 hover:text-white'
                                                }`}
                                            >
                                                {u.status === 'active' ? 'Blokir' : 'Aktifkan'}
                                            </button>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            {/* Modal Tambah User Baru */}
            <AnimatePresence>
                {showCreateModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowCreateModal(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="relative w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 z-10"
                        >
                            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                                <h3 className="text-sm font-bold text-[#0F172A]">Tambah Pengguna Baru</h3>
                                <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleCreateUser} className="space-y-3.5 text-xs">
                                <div>
                                    <label className="font-bold text-[#0F172A] block mb-1">Nama Lengkap *</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Nama Pengguna"
                                        className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="font-bold text-[#0F172A] block mb-1">Email *</label>
                                    <input 
                                        type="email" 
                                        required
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="user@example.com"
                                        className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                                    />
                                    {errors.email && <p className="text-red-500 mt-1">{errors.email}</p>}
                                </div>

                                <div>
                                    <label className="font-bold text-[#0F172A] block mb-1">Password *</label>
                                    <input 
                                        type="password" 
                                        required
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="font-bold text-[#0F172A] block mb-1">Role Akses *</label>
                                    <select
                                        value={data.role}
                                        onChange={(e) => setData('role', e.target.value)}
                                        className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
                                    >
                                        <option value="buyer">Buyer (Pembeli)</option>
                                        <option value="seller">Seller (Developer)</option>
                                        <option value="admin">Super Admin</option>
                                    </select>
                                </div>

                                <div className="pt-3 flex items-center justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowCreateModal(false)}
                                        className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold cursor-pointer disabled:opacity-50"
                                    >
                                        {processing ? 'Menyimpan...' : 'Simpan User'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </AdminLayout>
    );
}
