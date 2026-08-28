import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    CheckCircle2, 
    Download, 
    FileCode2, 
    ArrowRight, 
    Copy, 
    Check, 
    ExternalLink, 
    ShieldCheck, 
    ShoppingBag, 
    Home,
    KeyRound,
    Clock,
    RefreshCw,
    AlertCircle,
    CreditCard,
    FileText
} from 'lucide-react';
import { useState, useEffect } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { useLanguage } from '@/Context/LanguageContext';

export default function CheckoutSuccess({ order: initialOrder, midtransClientKey, midtransSnapUrl }) {
    const { lang } = useLanguage();
    const [order, setOrder] = useState(initialOrder);
    const [copied, setCopied] = useState(false);
    const [isChecking, setIsChecking] = useState(false);
    const [checkMessage, setCheckMessage] = useState('');

    const isPaid = order?.status === 'paid';
    const licenseKey = order?.licenseKey || `KYY-LIC-${order?.orderNumber?.replace('KYY-ORD-', '') || '8842-PRO'}-AUTH`;

    // Load Midtrans Snap JS dynamically if pending and snapToken is available
    useEffect(() => {
        if (!isPaid && order?.snapToken && midtransSnapUrl) {
            const scriptId = 'midtrans-snap-script';
            if (!document.getElementById(scriptId)) {
                const script = document.createElement('script');
                script.id = scriptId;
                script.src = midtransSnapUrl;
                script.setAttribute('data-client-key', midtransClientKey || '');
                script.async = true;
                document.body.appendChild(script);
            }
        }
    }, [isPaid, order?.snapToken, midtransSnapUrl, midtransClientKey]);

    const handleCopy = () => {
        navigator.clipboard.writeText(licenseKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handlePayNow = () => {
        if (window.snap && order?.snapToken) {
            window.snap.pay(order.snapToken, {
                onSuccess: function () {
                    handleCheckStatus();
                },
                onPending: function () {
                    handleCheckStatus();
                },
                onError: function () {
                    handleCheckStatus();
                },
                onClose: function () {
                    handleCheckStatus();
                }
            });
        } else if (order?.paymentUrl) {
            window.open(order.paymentUrl, '_blank');
        }
    };

    const handleCheckStatus = async () => {
        if (isChecking) return;
        setIsChecking(true);
        setCheckMessage('');

        try {
            const response = await fetch(`/orders/${order?.orderNumber}/check-status`);
            const data = await response.json();

            if (data.is_paid) {
                setOrder(prev => ({
                    ...prev,
                    status: 'paid',
                    paidAt: data.paid_at || new Date().toLocaleString('id-ID'),
                }));
                setCheckMessage(lang === 'ID' ? 'Pembayaran berhasil dikonfirmasi!' : 'Payment successfully confirmed!');
            } else {
                setCheckMessage(data.message || (lang === 'ID' ? 'Menunggu pembayaran...' : 'Waiting for payment...'));
            }
        } catch (e) {
            setCheckMessage(lang === 'ID' ? 'Gagal menghubungi server status.' : 'Failed to connect to status server.');
        } finally {
            setIsChecking(false);
        }
    };

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number || 0);
    };

    return (
        <PublicLayout>
            <Head>
                <title>
                    {isPaid 
                        ? (lang === 'ID' ? 'Pembayaran Berhasil — KyySolutions' : 'Payment Success — KyySolutions')
                        : (lang === 'ID' ? 'Menunggu Pembayaran — KyySolutions' : 'Awaiting Payment — KyySolutions')}
                </title>
            </Head>

            <div className="bg-[#F8FAFC] min-h-screen py-12 lg:py-20">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Status Header Card */}
                    <AnimatePresence mode="wait">
                        {isPaid ? (
                            <motion.div 
                                key="paid-card"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-md text-center mb-8 relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-emerald-400/15 blur-2xl pointer-events-none" />

                                <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-6 shadow-sm">
                                    <CheckCircle2 className="w-8 h-8" />
                                </div>

                                <span className="inline-flex items-center text-xs font-bold text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full mb-3">
                                    {lang === 'ID' ? 'PEMBAYARAN DIVERIFIKASI & LUNAS' : 'PAYMENT VERIFIED & COMPLETED'}
                                </span>

                                <h1 className="text-2xl sm:text-3xl font-black text-[#14213D] tracking-tight mb-2">
                                    {lang === 'ID' ? 'Terima Kasih atas Pesanan Anda!' : 'Thank You for Your Order!'}
                                </h1>

                                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6">
                                    {lang === 'ID' 
                                        ? 'Pembayaran Anda telah diverifikasi lunas. Akses source code dan lisensi komersial Anda telah aktif dan siap diunduh di bawah ini.' 
                                        : 'Your payment has been verified. Your source code files and commercial license are active and ready to download below.'}
                                </p>

                                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-700">
                                    <span>Order Ref:</span>
                                    <span className="text-[#2563EB]">{order?.orderNumber}</span>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="pending-card"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white rounded-3xl border border-amber-200 p-8 sm:p-10 shadow-md text-center mb-8 relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-amber-400/15 blur-2xl pointer-events-none" />

                                <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto mb-6 shadow-sm">
                                    <Clock className="w-8 h-8 animate-pulse" />
                                </div>

                                <span className="inline-flex items-center text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full mb-3">
                                    {lang === 'ID' ? 'MENUNGGU PEMBAYARAN MIDTRANS' : 'AWAITING PAYMENT CONFIRMATION'}
                                </span>

                                <h1 className="text-2xl sm:text-3xl font-black text-[#14213D] tracking-tight mb-2">
                                    {lang === 'ID' ? 'Selesaikan Pembayaran Anda' : 'Complete Your Payment'}
                                </h1>

                                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6">
                                    {lang === 'ID' 
                                        ? 'Silakan selesaikan pembayaran sesuai petunjuk gateway Midtrans. Sistem akan memverifikasi pembayaran Anda secara otomatis.' 
                                        : 'Please complete your payment via Midtrans. The system will automatically confirm your transaction.'}
                                </p>

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                                    {(order?.snapToken || order?.paymentUrl) && (
                                        <button
                                            onClick={handlePayNow}
                                            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 flex items-center justify-center space-x-2 cursor-pointer transition-all"
                                        >
                                            <CreditCard className="w-4 h-4" />
                                            <span>{lang === 'ID' ? 'Buka Gateway Midtrans' : 'Open Midtrans Gateway'}</span>
                                        </button>
                                    )}

                                    <button
                                        onClick={handleCheckStatus}
                                        disabled={isChecking}
                                        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 cursor-pointer transition-all disabled:opacity-50"
                                    >
                                        <RefreshCw className={`w-4 h-4 ${isChecking ? 'animate-spin' : ''}`} />
                                        <span>{isChecking ? (lang === 'ID' ? 'Memeriksa...' : 'Checking...') : (lang === 'ID' ? 'Cek Status Pembayaran' : 'Check Payment Status')}</span>
                                    </button>
                                </div>

                                {checkMessage && (
                                    <p className="mt-4 text-xs font-semibold text-blue-600 animate-fade-in">
                                        {checkMessage}
                                    </p>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Product Access & License Card (If Paid) */}
                    {isPaid ? (
                        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 shadow-sm mb-8 space-y-6">
                            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                                <div>
                                    <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded">
                                        {order?.product?.category || 'SaaS Systems'}
                                    </span>
                                    <h3 className="text-base sm:text-lg font-black text-[#14213D] mt-1">
                                        {order?.product?.title || 'SaaS Multi-Tenant Boilerplate Starter'}
                                    </h3>
                                </div>
                                <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100">
                                    {order?.product?.version || 'v2.4.0'}
                                </span>
                            </div>

                            {/* License Key Box */}
                            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                                        <KeyRound className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold uppercase text-slate-500 block">
                                            {lang === 'ID' ? 'Kunci Lisensi Komersial' : 'Commercial License Key'}
                                        </span>
                                        <span className="text-xs sm:text-sm font-mono font-bold text-[#14213D]">
                                            {licenseKey}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCopy}
                                    className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200 shadow-2xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer self-start sm:self-auto"
                                >
                                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                    <span>{copied ? (lang === 'ID' ? 'Tersalin!' : 'Copied!') : (lang === 'ID' ? 'Salin Kunci' : 'Copy Key')}</span>
                                </button>
                            </div>

                            {/* Direct Download, Repository, & Invoice Buttons */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <button
                                    onClick={() => alert(lang === 'ID' ? 'Mengunduh paket arsip source code...' : 'Downloading source code package...')}
                                    className="w-full py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-md shadow-blue-500/25 flex items-center justify-center space-x-2 transition-all cursor-pointer"
                                >
                                    <Download className="w-4 h-4" />
                                    <span>{lang === 'ID' ? 'Unduh Source Code (.ZIP)' : 'Download (.ZIP)'}</span>
                                </button>

                                <button
                                    onClick={() => alert(lang === 'ID' ? 'Akses repositori GitHub telah dikirimkan ke email Anda.' : 'GitHub repository invite sent to your email.')}
                                    className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer"
                                >
                                    <FileCode2 className="w-4 h-4" />
                                    <span>{lang === 'ID' ? 'Akses Repositori GitHub' : 'GitHub Access'}</span>
                                </button>

                                <a
                                    href={`/orders/${order?.orderNumber}/invoice`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/25 flex items-center justify-center space-x-2 transition-all cursor-pointer"
                                >
                                    <FileText className="w-4 h-4" />
                                    <span>{lang === 'ID' ? 'Unduh Invoice PDF' : 'Download Invoice PDF'}</span>
                                </a>
                            </div>

                            {/* Order Summary Details */}
                            <div className="pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                                <div>
                                    <span className="text-slate-400 block text-[11px]">{lang === 'ID' ? 'Nama Pembeli' : 'Buyer Name'}</span>
                                    <span className="font-bold text-[#14213D]">{order?.buyer?.name || 'Customer'}</span>
                                </div>
                                <div>
                                    <span className="text-slate-400 block text-[11px]">{lang === 'ID' ? 'Email Terdaftar' : 'Email Address'}</span>
                                    <span className="font-bold text-[#14213D] truncate block">{order?.buyer?.email || 'customer@example.com'}</span>
                                </div>
                                <div>
                                    <span className="text-slate-400 block text-[11px]">{lang === 'ID' ? 'Metode Pembayaran' : 'Payment Method'}</span>
                                    <span className="font-bold text-[#14213D] uppercase">{order?.paymentMethod || 'Midtrans'}</span>
                                </div>
                                <div>
                                    <span className="text-slate-400 block text-[11px]">{lang === 'ID' ? 'Total Terbayar' : 'Total Paid'}</span>
                                    <span className="font-mono font-bold text-[#2563EB]">{formatRupiah(order?.total || 650000)}</span>
                                </div>
                            </div>
                        </div>
                    ) : null}

                    {/* Navigation Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/marketplace" className="w-full sm:w-auto">
                            <button className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-bold shadow-2xs flex items-center justify-center space-x-2 transition-all cursor-pointer">
                                <ShoppingBag className="w-4 h-4 text-[#2563EB]" />
                                <span>{lang === 'ID' ? 'Jelajahi Produk Lain' : 'Browse More Products'}</span>
                            </button>
                        </Link>

                        <Link href="/" className="w-full sm:w-auto">
                            <button className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer">
                                <Home className="w-4 h-4" />
                                <span>{lang === 'ID' ? 'Kembali ke Beranda' : 'Back to Home'}</span>
                            </button>
                        </Link>
                    </div>

                </div>
            </div>
        </PublicLayout>
    );
}
