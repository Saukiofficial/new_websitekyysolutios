import { useState, useEffect } from 'react';
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
    FileText,
    QrCode,
    Building2,
    Wallet,
    ChevronDown,
    ChevronUp,
    Smartphone,
    Info
} from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import { useLanguage } from '@/Context/LanguageContext';

export default function CheckoutSuccess({ order: initialOrder }) {
    const { lang } = useLanguage();
    const [order, setOrder] = useState(initialOrder);
    const [copiedLicense, setCopiedLicense] = useState(false);
    const [copiedVa, setCopiedVa] = useState(false);
    const [copiedAmount, setCopiedAmount] = useState(false);
    const [isChecking, setIsChecking] = useState(false);
    const [checkMessage, setCheckMessage] = useState('');
    const [activeAccordion, setActiveAccordion] = useState('mbanking');
    const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds

    const isPaid = order?.status === 'paid';
    const licenseKey = order?.licenseKey || `KYY-LIC-${order?.orderNumber?.replace('KYY-ORD-', '') || '8842-PRO'}-AUTH`;
    const details = order?.paymentDetails || {};
    const method = order?.paymentMethod || 'qris';

    // 15-Minute Countdown Timer
    useEffect(() => {
        if (isPaid) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [isPaid]);

    // Format Countdown Time MM:SS
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Auto Background Polling for Real-Time Payment Detection
    useEffect(() => {
        if (isPaid) return;

        const interval = setInterval(() => {
            fetchStatusSilent();
        }, 4000);

        return () => clearInterval(interval);
    }, [isPaid, order?.orderNumber]);

    const fetchStatusSilent = async () => {
        if (!order?.orderNumber || isPaid) return;
        try {
            const res = await fetch(`/orders/${order.orderNumber}/check-status`);
            const data = await res.json();
            if (data.is_paid) {
                setOrder((prev) => ({
                    ...prev,
                    status: 'paid',
                    paidAt: data.paid_at || new Date().toLocaleString('id-ID'),
                }));
            }
        } catch (e) {
            // silent fail on polling
        }
    };

    const handleManualCheckStatus = async () => {
        if (isChecking) return;
        setIsChecking(true);
        setCheckMessage('');

        try {
            const res = await fetch(`/orders/${order?.orderNumber}/check-status`);
            const data = await res.json();

            if (data.is_paid) {
                setOrder((prev) => ({
                    ...prev,
                    status: 'paid',
                    paidAt: data.paid_at || new Date().toLocaleString('id-ID'),
                }));
                setCheckMessage(lang === 'ID' ? '✅ Pembayaran berhasil terverifikasi!' : '✅ Payment successfully confirmed!');
            } else {
                setCheckMessage(data.message || (lang === 'ID' ? '⏳ Pembayaran belum terdeteksi. Silakan selesaikan pembayaran terlebih dahulu.' : '⏳ Payment not detected yet.'));
            }
        } catch (e) {
            setCheckMessage(lang === 'ID' ? 'Gagal memeriksa status ke server.' : 'Failed to check server status.');
        } finally {
            setIsChecking(false);
        }
    };

    const handleCopy = (text, type) => {
        navigator.clipboard.writeText(text);
        if (type === 'license') {
            setCopiedLicense(true);
            setTimeout(() => setCopiedLicense(false), 2000);
        } else if (type === 'va') {
            setCopiedVa(true);
            setTimeout(() => setCopiedVa(false), 2000);
        } else if (type === 'amount') {
            setCopiedAmount(true);
            setTimeout(() => setCopiedAmount(false), 2000);
        }
    };

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number || 0);
    };

    const qrImage = details?.qrCodeUrl || `https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=KYY-QRIS-${order?.orderNumber}`;
    const vaNumber = details?.vaNumber || '06880715233366240939765';
    const bankName = details?.bank || (method === 'bca_va' ? 'BCA' : (method === 'mandiri_va' ? 'MANDIRI' : (method === 'bni_va' ? 'BNI' : 'BRI')));

    return (
        <PublicLayout>
            <Head>
                <title>
                    {isPaid 
                        ? (lang === 'ID' ? 'Pembayaran Berhasil — KyySolutions' : 'Payment Success — KyySolutions')
                        : (lang === 'ID' ? 'Menunggu Pembayaran — KyySolutions' : 'Awaiting Payment — KyySolutions')}
                </title>
            </Head>

            <div className="bg-[#F8FAFC] min-h-screen py-10 lg:py-16">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <AnimatePresence mode="wait">
                        
                        {/* ========================================================================= */}
                        {/* 1. STATE: PEMBAYARAN LUNAS & SUKSES (PAID) */}
                        {/* ========================================================================= */}
                        {isPaid ? (
                            <motion.div
                                key="paid-view"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                className="space-y-6"
                            >
                                {/* Header Card */}
                                <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm text-center relative overflow-hidden">
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-28 bg-emerald-400/15 blur-2xl pointer-events-none" />

                                    <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-5 shadow-xs">
                                        <CheckCircle2 className="w-8 h-8" />
                                    </div>

                                    <span className="inline-flex items-center text-xs font-bold text-emerald-700 bg-emerald-100/70 px-3.5 py-1 rounded-full mb-3">
                                        {lang === 'ID' ? 'PEMBAYARAN DIVERIFIKASI & LUNAS' : 'PAYMENT VERIFIED & COMPLETED'}
                                    </span>

                                    <h1 className="text-2xl sm:text-3xl font-black text-[#14213D] tracking-tight mb-2">
                                        {lang === 'ID' ? 'Terima Kasih atas Pesanan Anda!' : 'Thank You for Your Order!'}
                                    </h1>

                                    <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-5">
                                        {lang === 'ID' 
                                            ? 'Pembayaran Anda telah diverifikasi lunas. Akses source code dan sertifikat lisensi komersial Anda telah aktif dan siap diunduh di bawah ini.' 
                                            : 'Your payment has been verified. Your source code and commercial license are active and ready to download below.'}
                                    </p>

                                    <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-700">
                                        <span>Order Ref:</span>
                                        <span className="text-[#2563EB]">{order?.orderNumber}</span>
                                    </div>
                                </div>

                                {/* License & Download Card */}
                                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded">
                                                {order?.product?.category || 'SaaS Systems'}
                                            </span>
                                            <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                                                {order?.product?.version || 'v2.4.0'}
                                            </span>
                                        </div>
                                        <h3 className="text-base sm:text-lg font-black text-[#14213D] mt-2">
                                            {order?.product?.title || 'Digital Software Package'}
                                        </h3>
                                    </div>

                                    {/* License Key Box */}
                                    <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 rounded-xl bg-[#2563EB] text-white flex items-center justify-center shrink-0 shadow-xs">
                                                <KeyRound className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                                                    COMMERCIAL LICENSE KEY
                                                </span>
                                                <span className="text-xs sm:text-sm font-mono font-bold text-[#14213D]">
                                                    {licenseKey}
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleCopy(licenseKey, 'license')}
                                            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors flex items-center justify-center space-x-1.5 cursor-pointer shrink-0 shadow-2xs"
                                        >
                                            {copiedLicense ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                            <span>{copiedLicense ? (lang === 'ID' ? 'Tersalin!' : 'Copied!') : (lang === 'ID' ? 'Salin Kunci' : 'Copy Key')}</span>
                                        </button>
                                    </div>

                                    {/* Action Buttons: ZIP, GitHub, Invoice */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                                        <Link
                                            href="/dashboard/my-products"
                                            className="py-3.5 px-4 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-extrabold flex items-center justify-center space-x-2 transition-all shadow-md shadow-blue-500/20 cursor-pointer"
                                        >
                                            <Download className="w-4 h-4" />
                                            <span>{lang === 'ID' ? 'Unduh (.ZIP)' : 'Download (.ZIP)'}</span>
                                        </Link>

                                        <a
                                            href="https://github.com"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold flex items-center justify-center space-x-2 transition-all shadow-xs cursor-pointer"
                                        >
                                            <FileCode2 className="w-4 h-4" />
                                            <span>GitHub Access</span>
                                        </a>

                                        <a
                                            href={`/orders/${order?.orderNumber}/invoice`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold flex items-center justify-center space-x-2 transition-all shadow-xs cursor-pointer"
                                        >
                                            <FileText className="w-4 h-4" />
                                            <span>{lang === 'ID' ? 'Unduh Invoice PDF' : 'Download Invoice PDF'}</span>
                                        </a>
                                    </div>

                                    {/* Summary Info */}
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100 text-xs">
                                        <div>
                                            <span className="text-[10px] text-slate-400 block font-medium">{lang === 'ID' ? 'Nama Pembeli' : 'Buyer Name'}</span>
                                            <span className="font-bold text-slate-900">{order?.buyer?.name || 'Customer'}</span>
                                        </div>
                                        <div>
                                            <span className="text-[10px] text-slate-400 block font-medium">{lang === 'ID' ? 'Metode Bayar' : 'Payment Method'}</span>
                                            <span className="font-bold text-slate-900 uppercase">{order?.paymentMethod || 'QRIS'}</span>
                                        </div>
                                        <div>
                                            <span className="text-[10px] text-slate-400 block font-medium">{lang === 'ID' ? 'Waktu Bayar' : 'Paid At'}</span>
                                            <span className="font-bold text-slate-900">{order?.paidAt || 'Baru saja'}</span>
                                        </div>
                                        <div>
                                            <span className="text-[10px] text-slate-400 block font-medium">{lang === 'ID' ? 'Total Bayar' : 'Total Paid'}</span>
                                            <span className="font-bold text-[#2563EB] font-mono">{formatRupiah(order?.total)}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="pending-view"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                className="space-y-6"
                            >
                                {/* Header Card */}
                                <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm text-center relative overflow-hidden">
                                    <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                                        <div className="flex items-center space-x-2">
                                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                                            <span className="text-xs font-black uppercase tracking-wider text-amber-700">
                                                {lang === 'ID' ? 'Menunggu Pembayaran' : 'Awaiting Payment'}
                                            </span>
                                        </div>

                                        {/* Countdown Timer */}
                                        <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-mono font-bold">
                                            <Clock className="w-3.5 h-3.5 text-amber-600" />
                                            <span>Sisa Waktu: {formatTime(timeLeft)}</span>
                                        </div>
                                    </div>

                                    <h1 className="text-xl sm:text-2xl font-black text-[#14213D] mb-1">
                                        {lang === 'ID' ? 'Selesaikan Pembayaran Anda' : 'Complete Your Payment'}
                                    </h1>
                                    <p className="text-xs text-slate-500 max-w-md mx-auto">
                                        {lang === 'ID' 
                                            ? 'Lakukan pembayaran sesuai instruksi di bawah. Halaman ini akan otomatis diperbarui begitu pembayaran berhasil.' 
                                            : 'Please complete payment using the details below. This page will update automatically.'}
                                    </p>

                                    <div className="mt-4 inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] font-mono font-semibold text-slate-600">
                                        <span>Order ID:</span>
                                        <span className="text-[#2563EB] font-bold">{order?.orderNumber}</span>
                                    </div>
                                </div>

                                {/* ========================================================= */}
                                {/* TAMPILAN 1: QRIS INSTANT (NATIVE QR CODE SCAN) */}
                                {/* ========================================================= */}
                                {(method === 'qris' || method === 'ewallet' || method === 'gopay') && (
                                    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm text-center">
                                        
                                        {/* QRIS Header */}
                                        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-slate-900 text-white text-[11px] font-bold mb-4">
                                            <QrCode className="w-3.5 h-3.5" />
                                            <span>QRIS — SCAN VIA SEMUA BANK & E-WALLET</span>
                                        </div>

                                        <div className="text-xs text-slate-500 mb-4">
                                            BCA Mobile • Livin Mandiri • BRImo • BNI Mobile • GoPay • OVO • DANA • ShopeePay
                                        </div>

                                        {/* QR Code Container */}
                                        <div className="inline-block p-4 rounded-3xl bg-white border-2 border-[#2563EB]/40 shadow-xl shadow-blue-500/10 relative mx-auto mb-4">
                                            <img
                                                src={qrImage}
                                                alt="QRIS Payment Code"
                                                className="w-56 h-56 sm:w-64 sm:h-64 object-contain rounded-xl"
                                            />
                                            <div className="mt-2 text-[10px] font-mono font-bold text-slate-400">
                                                NMID: ID104906880KYY
                                            </div>
                                        </div>

                                        {/* Total Amount */}
                                        <div className="max-w-xs mx-auto p-3 rounded-2xl bg-slate-50 border border-slate-200 mb-5">
                                            <span className="text-[10px] text-slate-400 font-semibold block">TOTAL NOMINAL YANG HARUS DIBAYAR</span>
                                            <span className="text-xl font-black text-[#2563EB] font-mono">
                                                {formatRupiah(order?.total)}
                                            </span>
                                        </div>

                                        {/* Petunjuk Scan */}
                                        <div className="max-w-md mx-auto text-left text-xs bg-blue-50/60 p-4 rounded-2xl border border-blue-100 space-y-2 text-slate-700">
                                            <div className="font-bold text-blue-900 flex items-center space-x-1.5">
                                                <Smartphone className="w-4 h-4 text-[#2563EB]" />
                                                <span>Cara Pembayaran QRIS:</span>
                                            </div>
                                            <ol className="list-decimal pl-4 space-y-1 text-[11px] text-slate-600">
                                                <li>Buka aplikasi m-Banking atau E-Wallet pilihan Anda di smartphone.</li>
                                                <li>Pilih menu <strong>Scan / Bayar QRIS</strong>.</li>
                                                <li>Arahkan kamera ke QR Code di atas.</li>
                                                <li>Pastikan nama merchant adalah <strong>KyySolutions</strong> dan nominal sesuai.</li>
                                                <li>Konfirmasi pembayaran dan masukkan PIN Anda.</li>
                                            </ol>
                                        </div>

                                    </div>
                                )}

                                {/* ========================================================= */}
                                {/* TAMPILAN 2: VIRTUAL ACCOUNT (BCA / MANDIRI / BNI / BRI) */}
                                {/* ========================================================= */}
                                {(method.includes('va') || method === 'echannel') && (
                                    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
                                        
                                        <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
                                            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-black text-sm">
                                                <Building2 className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-slate-900">Transfer {bankName} Virtual Account</h3>
                                                <p className="text-[11px] text-slate-500">Verifikasi instan otomatis 24 jam</p>
                                            </div>
                                        </div>

                                        {/* VA Number Card */}
                                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                            <div>
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                                                    NOMOR VIRTUAL ACCOUNT
                                                </span>
                                                <span className="text-lg sm:text-xl font-mono font-black text-[#14213D] tracking-wide">
                                                    {vaNumber}
                                                </span>
                                            </div>

                                            <button
                                                onClick={() => handleCopy(vaNumber, 'va')}
                                                className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-bold transition-colors flex items-center justify-center space-x-1.5 cursor-pointer shadow-2xs shrink-0"
                                            >
                                                {copiedVa ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                                <span>{copiedVa ? 'Tersalin!' : 'Salin Nomor VA'}</span>
                                            </button>
                                        </div>

                                        {/* Mandiri Bill Key Specific */}
                                        {details?.billerCode && (
                                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                                                <div>
                                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">KODE PERUSAHAAN (BILLER CODE)</span>
                                                    <span className="text-base font-mono font-bold text-slate-800">{details.billerCode}</span>
                                                </div>
                                                <div>
                                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">BILL KEY</span>
                                                    <span className="text-base font-mono font-bold text-slate-800">{details.billKey}</span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Total Amount Card */}
                                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                                            <div>
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">TOTAL TAGIHAN</span>
                                                <span className="text-lg font-mono font-black text-[#2563EB]">
                                                    {formatRupiah(order?.total)}
                                                </span>
                                            </div>

                                            <button
                                                onClick={() => handleCopy(order?.total.toString(), 'amount')}
                                                className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors flex items-center space-x-1 cursor-pointer shadow-2xs"
                                            >
                                                {copiedAmount ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                                <span>{copiedAmount ? 'Tersalin!' : 'Salin Nominal'}</span>
                                            </button>
                                        </div>

                                        {/* Step-by-Step Accordion */}
                                        <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100 text-xs">
                                            
                                            {/* m-Banking Tab */}
                                            <div>
                                                <button
                                                    onClick={() => setActiveAccordion(activeAccordion === 'mbanking' ? '' : 'mbanking')}
                                                    className="w-full p-3.5 flex items-center justify-between font-bold text-slate-800 hover:bg-slate-50 text-left cursor-pointer"
                                                >
                                                    <span>Petunjuk Transfer Mobile Banking ({bankName} Mobile)</span>
                                                    {activeAccordion === 'mbanking' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                                                </button>
                                                {activeAccordion === 'mbanking' && (
                                                    <div className="p-3.5 bg-slate-50 text-slate-600 text-[11px] space-y-1">
                                                        <p>1. Buka dan login ke aplikasi Mobile Banking Anda.</p>
                                                        <p>2. Pilih menu <strong>Transfer / Bayar &gt; Virtual Account</strong>.</p>
                                                        <p>3. Masukkan nomor VA: <strong className="font-mono">{vaNumber}</strong>.</p>
                                                        <p>4. Masukkan nominal pembayaran tepat <strong>{formatRupiah(order?.total)}</strong>.</p>
                                                        <p>5. Periksa detail transaksi dan masukkan PIN untuk menyelesaikan pembayaran.</p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* ATM Tab */}
                                            <div>
                                                <button
                                                    onClick={() => setActiveAccordion(activeAccordion === 'atm' ? '' : 'atm')}
                                                    className="w-full p-3.5 flex items-center justify-between font-bold text-slate-800 hover:bg-slate-50 text-left cursor-pointer"
                                                >
                                                    <span>Petunjuk Transfer Mesin ATM</span>
                                                    {activeAccordion === 'atm' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                                                </button>
                                                {activeAccordion === 'atm' && (
                                                    <div className="p-3.5 bg-slate-50 text-slate-600 text-[11px] space-y-1">
                                                        <p>1. Masukkan kartu ATM dan PIN Anda di mesin ATM.</p>
                                                        <p>2. Pilih menu <strong>Transaksi Lainnya &gt; Transfer &gt; ke Rek Virtual Account</strong>.</p>
                                                        <p>3. Masukkan nomor Virtual Account: <strong className="font-mono">{vaNumber}</strong>.</p>
                                                        <p>4. Konfirmasi data transaksi dan simpan struk sebagai bukti pembayaran.</p>
                                                    </div>
                                                )}
                                            </div>

                                        </div>

                                    </div>
                                )}

                                {/* Real-time Status Check Action */}
                                <div className="bg-white rounded-3xl border border-slate-200 p-6 text-center shadow-sm space-y-3">
                                    <p className="text-xs text-slate-500 font-medium">
                                        Sudah selesai melakukan pembayaran di aplikasi m-Banking / E-Wallet Anda?
                                    </p>

                                    <button
                                        onClick={handleManualCheckStatus}
                                        disabled={isChecking}
                                        className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-extrabold flex items-center justify-center space-x-2 mx-auto cursor-pointer transition-all shadow-sm disabled:opacity-50"
                                    >
                                        <RefreshCw className={`w-4 h-4 ${isChecking ? 'animate-spin' : ''}`} />
                                        <span>{isChecking ? 'Memeriksa Pembayaran...' : 'Saya Sudah Bayar (Cek Status)'}</span>
                                    </button>

                                    {checkMessage && (
                                        <motion.p 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-xs font-bold text-[#2563EB] pt-1"
                                        >
                                            {checkMessage}
                                        </motion.p>
                                    )}
                                </div>

                            </motion.div>
                        )}

                    </AnimatePresence>

                    {/* Back to Catalog Link */}
                    <div className="text-center mt-8">
                        <Link 
                            href="/marketplace" 
                            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-[#2563EB] transition-colors"
                        >
                            <span>← {lang === 'ID' ? 'Kembali ke Katalog Marketplace' : 'Back to Marketplace Catalog'}</span>
                        </Link>
                    </div>

                </div>
            </div>
        </PublicLayout>
    );
}
