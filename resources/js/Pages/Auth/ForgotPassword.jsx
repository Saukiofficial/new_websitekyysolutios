import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { 
    Mail, 
    KeyRound, 
    ArrowLeft, 
    CheckCircle2, 
    ShieldCheck, 
    Loader2 
} from 'lucide-react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/forgot-password');
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] p-4 flex items-center justify-center font-sans antialiased selection:bg-[#2563EB] selection:text-white">
            <Head>
                <title>Lupa Kata Sandi — KyySolutions</title>
            </Head>

            <div className="w-full max-w-md bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-6 sm:p-8 space-y-6">
                
                {/* Brand Logo & Back link */}
                <div className="flex items-center justify-between">
                    <Link href="/" className="inline-flex items-center space-x-2">
                        <img 
                            src="/images/logo/logo_no_bg.png" 
                            alt="KyySolutions" 
                            className="h-8 w-auto object-contain" 
                        />
                        <span className="font-extrabold text-base text-[#0F172A]">
                            Kyy<span className="text-[#2563EB]">Solutions</span>
                        </span>
                    </Link>

                    <Link 
                        href="/login" 
                        className="text-xs font-bold text-slate-500 hover:text-[#2563EB] flex items-center space-x-1 transition-colors"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Kembali Masuk</span>
                    </Link>
                </div>

                {/* Icon & Title */}
                <div className="space-y-2 text-center pt-2">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center mx-auto shadow-xs">
                        <KeyRound className="w-6 h-6" />
                    </div>
                    <h1 className="text-xl font-extrabold text-[#0F172A] tracking-tight">
                        Pulihkan Kata Sandi
                    </h1>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                        Masukkan alamat email akun Anda. Kami akan mengirimkan tautan untuk mengatur ulang kata sandi.
                    </p>
                </div>

                {/* Success Status Alert */}
                {status && (
                    <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{status}</span>
                    </div>
                )}

                {/* Reset Form */}
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                    <div>
                        <label className="font-bold text-[#0F172A] block mb-1.5">
                            Alamat Email Akun *
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="email"
                                required
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="nama@email.com"
                                className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:bg-white focus:outline-none focus:border-[#2563EB] transition-all font-medium"
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-[11px] mt-1">{errors.email}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full h-11 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md shadow-blue-500/20 hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
                    >
                        {processing ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Mengirim Tautan...</span>
                            </>
                        ) : (
                            <span>Kirim Tautan Pemulihan</span>
                        )}
                    </button>
                </form>

                {/* Footer security badge */}
                <div className="pt-2 text-center">
                    <div className="inline-flex items-center space-x-1.5 text-[11px] text-slate-400 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Enkripsi Sesi 256-bit Terproteksi</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
