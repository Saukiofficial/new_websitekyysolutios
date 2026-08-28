import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { 
    Settings, 
    Save, 
    Percent, 
    Shield, 
    CreditCard, 
    Mail, 
    Phone, 
    CheckCircle2 
} from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function AdminSettingsIndex({ settings }) {
    const [saved, setSaved] = useState(false);

    const { data, setData, post, processing } = useForm({
        platformName: settings.platformName,
        supportEmail: settings.supportEmail,
        whatsappContact: settings.whatsappContact,
        commissionRate: settings.commissionRate,
        autoApproveVerifiedSellers: settings.autoApproveVerifiedSellers,
        paymentGatewayProvider: settings.paymentGatewayProvider,
        sandboxMode: settings.sandboxMode,
    });

    const handleSave = (e) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <AdminLayout title="Pengaturan Sistem" breadcrumb="System > Pengaturan">
            <Head title="Pengaturan Sistem — Super Admin KyySolutions" />

            <div className="max-w-4xl space-y-6">
                
                {/* Header Toolbar */}
                <div className="bg-white p-5 rounded-2xl border border-[#E9EEF5] shadow-xs flex items-center justify-between">
                    <div>
                        <h2 className="text-base font-bold text-[#0F172A]">Konfigurasi Platform & Finansial</h2>
                        <p className="text-xs text-[#64748B] mt-0.5">Kelola persentase komisi bagi hasil, integrasi payment gateway, dan identitas platform.</p>
                    </div>

                    {saved && (
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center space-x-1">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Pengaturan Disimpan</span>
                        </span>
                    )}
                </div>

                <form onSubmit={handleSave} className="space-y-6">
                    
                    {/* Card 1: Platform & Contact */}
                    <div className="bg-white p-6 rounded-2xl border border-[#E9EEF5] shadow-xs space-y-4 text-xs">
                        <h3 className="font-bold text-sm text-[#0F172A] pb-2 border-b border-slate-100 flex items-center space-x-2">
                            <Shield className="w-4 h-4 text-[#2563EB]" />
                            <span>Identitas Platform & Kontak</span>
                        </h3>

                        <div>
                            <label className="font-bold text-[#0F172A] block mb-1">Nama Resmi Platform</label>
                            <input 
                                type="text"
                                value={data.platformName}
                                onChange={(e) => setData('platformName', e.target.value)}
                                className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 font-medium"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="font-bold text-[#0F172A] block mb-1">Email Layanan & Notifikasi</label>
                                <input 
                                    type="email"
                                    value={data.supportEmail}
                                    onChange={(e) => setData('supportEmail', e.target.value)}
                                    className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                                />
                            </div>

                            <div>
                                <label className="font-bold text-[#0F172A] block mb-1">Nomor WhatsApp CS</label>
                                <input 
                                    type="text"
                                    value={data.whatsappContact}
                                    onChange={(e) => setData('whatsappContact', e.target.value)}
                                    className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Commission & Marketplace Rules */}
                    <div className="bg-white p-6 rounded-2xl border border-[#E9EEF5] shadow-xs space-y-4 text-xs">
                        <h3 className="font-bold text-sm text-[#0F172A] pb-2 border-b border-slate-100 flex items-center space-x-2">
                            <Percent className="w-4 h-4 text-[#2563EB]" />
                            <span>Bagi Hasil Komisi & Moderasi Seller</span>
                        </h3>

                        <div>
                            <label className="font-bold text-[#0F172A] block mb-1">Persentase Komisi Platform (%)</label>
                            <div className="flex items-center space-x-3">
                                <input 
                                    type="number"
                                    min="0"
                                    max="50"
                                    value={data.commissionRate}
                                    onChange={(e) => setData('commissionRate', e.target.value)}
                                    className="w-32 h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 font-mono font-bold"
                                />
                                <span className="text-slate-500">% dari total harga kotor setiap penjualan software oleh mitra seller.</span>
                            </div>
                        </div>

                        <div className="pt-2">
                            <label className="flex items-center space-x-2.5 cursor-pointer">
                                <input 
                                    type="checkbox"
                                    checked={data.autoApproveVerifiedSellers}
                                    onChange={(e) => setData('autoApproveVerifiedSellers', e.target.checked)}
                                    className="w-4 h-4 rounded text-[#2563EB] focus:ring-blue-500"
                                />
                                <span className="font-medium text-slate-700">Otomatis publikasikan produk dari Mitra Seller yang telah Terverifikasi (Verified Partner)</span>
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center space-x-2 transition-all cursor-pointer"
                        >
                            <Save className="w-4 h-4" />
                            <span>Simpan Perubahan Pengaturan</span>
                        </button>
                    </div>

                </form>

            </div>
        </AdminLayout>
    );
}
