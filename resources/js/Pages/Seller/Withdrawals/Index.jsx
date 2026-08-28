import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Wallet, 
    ArrowUpRight, 
    Building2, 
    CreditCard, 
    CheckCircle2, 
    Clock, 
    X,
    ShieldCheck,
    DollarSign
} from 'lucide-react';
import SellerLayout from '@/Layouts/SellerLayout';

export default function SellerWithdrawalsIndex({ wallet = {}, withdrawals = [], store = {} }) {
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);

    const { data, setData, post, processing, reset, errors } = useForm({
        amount: '',
        bank_name: 'BCA (Bank Central Asia)',
        account_number: '',
        account_name: store.name || '',
    });

    const submitWithdrawForm = (e) => {
        e.preventDefault();
        post('/seller/withdrawals', {
            onSuccess: () => {
                setShowWithdrawModal(false);
                reset();
            }
        });
    };

    return (
        <SellerLayout title="Saldo & Penarikan Dana" store={store}>
            <Head title="Saldo & Penarikan Dana — KyySolutions Studio" />

            <div className="space-y-6">
                
                {/* Header Row */}
                <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
                            Saldo Dompet & Penarikan Dana
                        </h1>
                        <p className="text-xs text-slate-500 mt-1">
                            Kelola saldo penghasilan bersih penjualan software dan ajukan pencairan dana ke rekening bank.
                        </p>
                    </div>

                    <button
                        onClick={() => setShowWithdrawModal(true)}
                        className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm shadow-emerald-600/20 flex items-center space-x-1.5 transition-colors cursor-pointer self-start sm:self-auto"
                    >
                        <ArrowUpRight className="w-4 h-4" />
                        <span>Tarik Saldo Sekarang</span>
                    </button>
                </div>

                {/* Wallet Balance Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    
                    {/* Card 1: Available Balance */}
                    <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-xs flex flex-col justify-between space-y-3 bg-gradient-to-br from-white to-emerald-50/30">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Saldo Siap Tarik</span>
                            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                                <Wallet className="w-4 h-4" />
                            </div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold font-mono text-emerald-700 leading-none">
                                {wallet.availableBalanceFormatted}
                            </div>
                            <span className="text-[11px] text-slate-400 block mt-1.5">Dapat ditarik kapan saja</span>
                        </div>
                    </div>

                    {/* Card 2: Total Withdrawn */}
                    <div className="bg-white p-5 rounded-2xl border border-[#E8EDF3] shadow-xs flex flex-col justify-between space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Sudah Ditarik</span>
                            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
                                <CheckCircle2 className="w-4 h-4" />
                            </div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold font-mono text-[#0F172A] leading-none">
                                {wallet.totalWithdrawnFormatted}
                            </div>
                            <span className="text-[11px] text-slate-400 block mt-1.5">Pencairan sukses ke rekening</span>
                        </div>
                    </div>

                    {/* Card 3: Gross Earnings */}
                    <div className="bg-white p-5 rounded-2xl border border-[#E8EDF3] shadow-xs flex flex-col justify-between space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Akumulasi Penghasilan Bersih</span>
                            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold">
                                <DollarSign className="w-4 h-4" />
                            </div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold font-mono text-[#2563EB] leading-none">
                                {wallet.grossEarningsFormatted}
                            </div>
                            <span className="text-[11px] text-slate-400 block mt-1.5">90% bagi hasil developer</span>
                        </div>
                    </div>

                </div>

                {/* Withdrawals History Table */}
                <div className="bg-white rounded-2xl border border-[#E8EDF3] shadow-xs overflow-hidden">
                    <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                        <h3 className="font-bold text-[#0F172A] text-sm">Riwayat Penarikan Dana</h3>
                        <span className="text-xs font-mono text-slate-400">Proses pencairan 1x24 jam kerja</span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-[#FAFBFD] text-[#64748B] font-bold border-b border-slate-100 uppercase tracking-wider text-[11px]">
                                <tr>
                                    <th className="py-4 px-5">Kode Referensi</th>
                                    <th className="py-4 px-5">Nominal Penarikan</th>
                                    <th className="py-4 px-5">Rekening Bank Tujuan</th>
                                    <th className="py-4 px-5">Status</th>
                                    <th className="py-4 px-5">Tanggal Pengajuan</th>
                                    <th className="py-4 px-5 text-right">Tanggal Selesai</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-700">
                                {withdrawals.map((w) => (
                                    <tr key={w.id} className="hover:bg-slate-50/80 transition-colors">
                                        
                                        <td className="py-4 px-5 font-mono font-bold text-[#2563EB]">
                                            {w.reference}
                                        </td>

                                        <td className="py-4 px-5 font-mono font-bold text-emerald-700 text-sm">
                                            {w.amountFormatted}
                                        </td>

                                        <td className="py-4 px-5">
                                            <div className="font-semibold text-slate-800">{w.bankName}</div>
                                            <div className="text-[11px] text-slate-400 font-mono">{w.accountNumber} a/n {w.accountName}</div>
                                        </td>

                                        <td className="py-4 px-5">
                                            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 border border-emerald-200 text-emerald-800">
                                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                                <span>Selesai / Ditransfer</span>
                                            </span>
                                        </td>

                                        <td className="py-4 px-5 text-slate-500 font-mono text-[11px]">
                                            {w.createdAt}
                                        </td>

                                        <td className="py-4 px-5 text-right text-slate-500 font-mono text-[11px]">
                                            {w.paidAt}
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            {/* Modal Tarik Saldo */}
            <AnimatePresence>
                {showWithdrawModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowWithdrawModal(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="relative w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 z-10 space-y-4"
                        >
                            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                                <div>
                                    <h3 className="text-base font-bold text-[#0F172A]">Tarik Saldo Dompet</h3>
                                    <p className="text-xs text-slate-500">Saldo siap ditarik: {wallet.availableBalanceFormatted}</p>
                                </div>
                                <button onClick={() => setShowWithdrawModal(false)} className="text-slate-400 hover:text-slate-600">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={submitWithdrawForm} className="space-y-4 text-xs">
                                
                                <div>
                                    <label className="font-bold text-[#0F172A] block mb-1">Nominal Penarikan (IDR) *</label>
                                    <input 
                                        type="number" 
                                        required
                                        min={50000}
                                        max={wallet.availableBalance}
                                        value={data.amount}
                                        onChange={(e) => setData('amount', e.target.value)}
                                        placeholder="Min Rp 50.000"
                                        className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                                    />
                                    {errors.amount && <p className="text-red-500 mt-1">{errors.amount}</p>}
                                </div>

                                <div>
                                    <label className="font-bold text-[#0F172A] block mb-1">Bank / E-Wallet Tujuan *</label>
                                    <select
                                        value={data.bank_name}
                                        onChange={(e) => setData('bank_name', e.target.value)}
                                        className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer font-semibold"
                                    >
                                        <option value="BCA (Bank Central Asia)">BCA (Bank Central Asia)</option>
                                        <option value="Bank Mandiri">Bank Mandiri</option>
                                        <option value="BRI (Bank Rakyat Indonesia)">BRI (Bank Rakyat Indonesia)</option>
                                        <option value="BNI (Bank Negara Indonesia)">BNI (Bank Negara Indonesia)</option>
                                        <option value="Bank Jago">Bank Jago</option>
                                        <option value="GoPay / OVO / Dana">GoPay / OVO / Dana</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="font-bold text-[#0F172A] block mb-1">Nomor Rekening / HP *</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={data.account_number}
                                        onChange={(e) => setData('account_number', e.target.value)}
                                        placeholder="Contoh: 8820194829"
                                        className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                                    />
                                </div>

                                <div>
                                    <label className="font-bold text-[#0F172A] block mb-1">Nama Pemilik Rekening *</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={data.account_name}
                                        onChange={(e) => setData('account_name', e.target.value)}
                                        placeholder="Nama sesuai buku tabungan"
                                        className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div className="pt-3 flex items-center justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowWithdrawModal(false)}
                                        className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer disabled:opacity-50"
                                    >
                                        {processing ? 'Memproses...' : 'Kirim Permohonan'}
                                    </button>
                                </div>

                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </SellerLayout>
    );
}
