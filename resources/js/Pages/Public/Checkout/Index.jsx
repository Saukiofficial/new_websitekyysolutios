import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    ShieldCheck, 
    Lock, 
    ArrowLeft, 
    Check, 
    Download, 
    CreditCard, 
    QrCode, 
    Building2, 
    Wallet, 
    FileText, 
    HelpCircle, 
    Tag, 
    CheckCircle2, 
    AlertCircle,
    ArrowRight
} from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import { useLanguage } from '@/Context/LanguageContext';

export default function CheckoutIndex({ product, productId }) {
    const { lang } = useLanguage();

    const [paymentMethod, setPaymentMethod] = useState('qris');
    const [couponCode, setCouponCode] = useState('');
    const [appliedDiscount, setAppliedDiscount] = useState(0);
    const [couponMessage, setCouponMessage] = useState('');
    const [couponError, setCouponError] = useState('');

    const { data, setData, post, processing, errors } = useForm({
        product_id: product?.id || productId || 1,
        name: '',
        email: '',
        phone: '',
        payment_method: 'qris',
        agree_terms: false,
    });

    const paymentOptions = [
        {
            id: 'qris',
            name: 'QRIS Instant',
            desc: lang === 'ID' ? 'Scan real-time dari semua bank & e-wallet' : 'Real-time scan from all banking apps & e-wallets',
            icon: QrCode,
            badge: lang === 'ID' ? 'Bebas Biaya' : '0% Fee',
            fee: 0,
        },
        {
            id: 'bca_va',
            name: 'BCA Virtual Account',
            desc: lang === 'ID' ? 'Verifikasi otomatis 24/7 instan' : 'Automated 24/7 instant confirmation',
            icon: Building2,
            fee: 4000,
        },
        {
            id: 'mandiri_va',
            name: 'Mandiri Virtual Account',
            desc: lang === 'ID' ? 'Verifikasi otomatis 24/7 instan' : 'Automated 24/7 instant confirmation',
            icon: Building2,
            fee: 4000,
        },
        {
            id: 'ewallet',
            name: 'GoPay / OVO / DANA / ShopeePay',
            desc: lang === 'ID' ? 'Direct checkout via aplikasi e-wallet' : 'Direct checkout via e-wallet apps',
            icon: Wallet,
            fee: 2500,
        },
        {
            id: 'cc',
            name: 'Credit / Debit Card (Visa / Mastercard)',
            desc: lang === 'ID' ? 'Pembayaran internasional 3DS aman' : 'Secure 3DS international cards',
            icon: CreditCard,
            fee: 5000,
        },
    ];

    const currentFee = paymentOptions.find(p => p.id === paymentMethod)?.fee || 0;
    const basePrice = product?.price || 650000;
    const discountAmount = appliedDiscount > 0 ? (basePrice * appliedDiscount) / 100 : 0;
    const totalPrice = basePrice - discountAmount + currentFee;

    const handleApplyCoupon = (e) => {
        e.preventDefault();
        setCouponError('');
        setCouponMessage('');
        
        if (couponCode.toUpperCase() === 'KYYSPECIAL') {
            setAppliedDiscount(10);
            setCouponMessage(lang === 'ID' ? 'Kupon KYYSPECIAL diterapkan: Diskon 10%!' : 'Coupon KYYSPECIAL applied: 10% OFF!');
        } else if (couponCode.toUpperCase() === 'LAUNCH50') {
            setAppliedDiscount(15);
            setCouponMessage(lang === 'ID' ? 'Kupon LAUNCH50 diterapkan: Diskon 15%!' : 'Coupon LAUNCH50 applied: 15% OFF!');
        } else {
            setCouponError(lang === 'ID' ? 'Kode voucher tidak valid atau sudah kedaluwarsa.' : 'Invalid or expired coupon code.');
        }
    };

    const handlePaymentMethodSelect = (id) => {
        setPaymentMethod(id);
        setData('payment_method', id);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('checkout.store'));
    };

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
    };

    return (
        <PublicLayout>
            <Head>
                <title>{lang === 'ID' ? `Checkout — ${product?.title || 'Produk Digital'}` : `Checkout — ${product?.title || 'Digital Product'}`}</title>
            </Head>

            <div className="bg-[#F8FAFC] min-h-screen py-10 lg:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Top Breadcrumb & Security Guarantee */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200/80">
                        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
                            <Link href="/" className="hover:text-[#2563EB] transition-colors">{lang === 'ID' ? 'Beranda' : 'Home'}</Link>
                            <span>/</span>
                            <Link href="/marketplace" className="hover:text-[#2563EB] transition-colors">{lang === 'ID' ? 'Marketplace' : 'Marketplace'}</Link>
                            <span>/</span>
                            <span className="text-[#2563EB] font-bold">{lang === 'ID' ? 'Checkout Aman' : 'Secure Checkout'}</span>
                        </div>

                        <div className="flex items-center space-x-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200/80 shadow-2xs self-start sm:self-auto">
                            <Lock className="w-3.5 h-3.5 text-emerald-600" />
                            <span>256-Bit SSL Encrypted & Verified Checkout</span>
                        </div>
                    </div>

                    {/* Main Checkout Form & Summary Grid */}
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            
                            {/* Left Column: Buyer Info, Payment Methods, Terms (8 cols) */}
                            <div className="lg:col-span-7 space-y-6">
                                
                                {/* Step 1: Buyer Information Card */}
                                <div className="bg-white rounded-2xl border border-slate-200/85 p-6 sm:p-8 shadow-xs">
                                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#2563EB] font-extrabold flex items-center justify-center text-sm shadow-2xs">
                                                1
                                            </div>
                                            <h2 className="text-base sm:text-lg font-extrabold text-[#14213D]">
                                                {lang === 'ID' ? 'Informasi Pembeli & Lisensi' : 'Buyer Information & License Delivery'}
                                            </h2>
                                        </div>
                                        <span className="text-xs text-slate-400 font-medium">
                                            {lang === 'ID' ? 'Akses instan via email' : 'Instant access via email'}
                                        </span>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs font-bold text-[#14213D] block mb-1.5">
                                                {lang === 'ID' ? 'Nama Lengkap *' : 'Full Name *'}
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                placeholder={lang === 'ID' ? 'cth: Budi Santoso' : 'e.g. John Doe'}
                                                className="w-full h-11 px-4 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all"
                                            />
                                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs font-bold text-[#14213D] block mb-1.5">
                                                    {lang === 'ID' ? 'Alamat Email (Untuk Pengiriman File) *' : 'Email Address (For File Delivery) *'}
                                                </label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={data.email}
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    placeholder="email@example.com"
                                                    className="w-full h-11 px-4 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all"
                                                />
                                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                            </div>

                                            <div>
                                                <label className="text-xs font-bold text-[#14213D] block mb-1.5">
                                                    {lang === 'ID' ? 'Nomor WhatsApp / HP *' : 'Phone / WhatsApp Number *'}
                                                </label>
                                                <input
                                                    type="tel"
                                                    required
                                                    value={data.phone}
                                                    onChange={(e) => setData('phone', e.target.value)}
                                                    placeholder="081234567890"
                                                    className="w-full h-11 px-4 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all"
                                                />
                                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 2: Payment Method Selection */}
                                <div className="bg-white rounded-2xl border border-slate-200/85 p-6 sm:p-8 shadow-xs">
                                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#2563EB] font-extrabold flex items-center justify-center text-sm shadow-2xs">
                                                2
                                            </div>
                                            <h2 className="text-base sm:text-lg font-extrabold text-[#14213D]">
                                                {lang === 'ID' ? 'Pilih Metode Pembayaran' : 'Select Payment Method'}
                                            </h2>
                                        </div>
                                        <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-md">
                                            {lang === 'ID' ? 'Otomatis Terverifikasi' : 'Instant Verification'}
                                        </span>
                                    </div>

                                    <div className="space-y-3">
                                        {paymentOptions.map((opt) => {
                                            const Icon = opt.icon;
                                            const isSelected = paymentMethod === opt.id;
                                            return (
                                                <div
                                                    key={opt.id}
                                                    onClick={() => handlePaymentMethodSelect(opt.id)}
                                                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                                                        isSelected 
                                                            ? 'border-[#2563EB] bg-blue-50/40 shadow-xs' 
                                                            : 'border-slate-200/90 hover:border-slate-300 bg-white'
                                                    }`}
                                                >
                                                    <div className="flex items-center space-x-3.5">
                                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                                            isSelected ? 'bg-[#2563EB] text-white' : 'bg-slate-100 text-slate-600'
                                                        }`}>
                                                            <Icon className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center space-x-2">
                                                                <span className="text-xs sm:text-sm font-extrabold text-[#14213D]">{opt.name}</span>
                                                                {opt.badge && (
                                                                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100/70 px-2 py-0.5 rounded">
                                                                        {opt.badge}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">{opt.desc}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center space-x-3">
                                                        <span className="text-xs font-mono font-bold text-slate-600">
                                                            {opt.fee === 0 ? (lang === 'ID' ? 'Gratis' : 'Free') : `+ ${formatRupiah(opt.fee)}`}
                                                        </span>
                                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                                                            isSelected ? 'border-[#2563EB] bg-[#2563EB] text-white' : 'border-slate-300'
                                                        }`}>
                                                            {isSelected && <Check className="w-3 h-3" />}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Step 3: Terms & Agreement */}
                                <div className="bg-white rounded-2xl border border-slate-200/85 p-6 shadow-xs">
                                    <label className="flex items-start space-x-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            required
                                            checked={data.agree_terms}
                                            onChange={(e) => setData('agree_terms', e.target.checked)}
                                            className="w-4.5 h-4.5 rounded border-slate-300 text-[#2563EB] focus:ring-blue-500 mt-0.5 cursor-pointer"
                                        />
                                        <span className="text-xs text-slate-600 leading-relaxed">
                                            {lang === 'ID' ? (
                                                <>Saya menyetujui <span className="font-bold text-[#14213D]">Ketentuan Lisensi Komersial KyySolutions</span> dan menyetujui bahwa produk digital source code ini akan dikirimkan secara instan setelah pembayaran berhasil.</>
                                            ) : (
                                                <>I agree to the <span className="font-bold text-[#14213D]">KyySolutions Commercial License Terms</span> and acknowledge that this digital product will be delivered immediately upon payment completion.</>
                                            )}
                                        </span>
                                    </label>
                                    {errors.agree_terms && <p className="text-red-500 text-xs mt-2">{errors.agree_terms}</p>}
                                </div>

                            </div>

                            {/* Right Column: Order Summary & Pay Action (5 cols) */}
                            <div className="lg:col-span-5 sticky top-24 space-y-6">
                                
                                <div className="bg-white rounded-2xl border border-slate-200/85 p-6 sm:p-8 shadow-sm">
                                    <h3 className="text-base font-extrabold text-[#14213D] mb-5 pb-3 border-b border-slate-100 flex items-center justify-between">
                                        <span>{lang === 'ID' ? 'Ringkasan Pesanan' : 'Order Summary'}</span>
                                        <span className="text-xs font-mono text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded font-bold">{product?.version || 'v2.4.0'}</span>
                                    </h3>

                                    {/* Product Snapshot */}
                                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 mb-6">
                                        <div className="flex items-start space-x-3.5">
                                            <div className="w-12 h-12 rounded-xl bg-[#2563EB] text-white flex items-center justify-center shrink-0 font-mono font-bold text-sm shadow-2xs">
                                                SRC
                                            </div>
                                            <div>
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB] bg-blue-100/70 px-2 py-0.5 rounded">
                                                    {product?.category || 'SaaS Systems'}
                                                </span>
                                                <h4 className="text-xs sm:text-sm font-extrabold text-[#14213D] mt-1.5 leading-snug">
                                                    {product?.title || 'SaaS Multi-Tenant Boilerplate Starter'}
                                                </h4>
                                                <p className="text-[11px] text-slate-500 mt-1 font-medium">
                                                    {lang === 'ID' ? 'Lisensi:' : 'License:'} <span className="text-slate-700 font-bold">{product?.license || 'Regular License'}</span>
                                                </p>
                                            </div>
                                        </div>

                                        {/* Tech Tags */}
                                        {product?.tech && (
                                            <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-slate-200/70">
                                                {product.tech.map((t) => (
                                                    <span key={t} className="text-[9px] font-semibold bg-white border border-slate-200 text-slate-600 px-1.5 py-0.5 rounded">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Coupon / Voucher Form */}
                                    <div className="mb-6">
                                        <label className="text-xs font-bold text-[#14213D] block mb-1.5 flex items-center">
                                            <Tag className="w-3.5 h-3.5 mr-1 text-[#2563EB]" />
                                            <span>{lang === 'ID' ? 'Punya Kode Promo / Voucher?' : 'Have a Promo / Voucher Code?'}</span>
                                        </label>
                                        <div className="flex space-x-2">
                                            <input
                                                type="text"
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value)}
                                                placeholder="cth: KYYSPECIAL"
                                                className="w-full h-10 px-3 text-xs uppercase rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563EB]"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleApplyCoupon}
                                                className="px-4 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer shrink-0"
                                            >
                                                {lang === 'ID' ? 'Pakai' : 'Apply'}
                                            </button>
                                        </div>
                                        {couponMessage && (
                                            <p className="text-emerald-600 text-xs font-bold mt-1.5 flex items-center">
                                                <Check className="w-3.5 h-3.5 mr-1" /> {couponMessage}
                                            </p>
                                        )}
                                        {couponError && (
                                            <p className="text-red-500 text-xs mt-1.5 flex items-center">
                                                <AlertCircle className="w-3.5 h-3.5 mr-1" /> {couponError}
                                            </p>
                                        )}
                                    </div>

                                    {/* Cost Breakdown */}
                                    <div className="space-y-3 pb-5 border-b border-slate-100 text-xs">
                                        <div className="flex justify-between text-slate-600 font-medium">
                                            <span>{lang === 'ID' ? 'Harga Produk' : 'Product Price'}</span>
                                            <span className="font-mono text-slate-900 font-bold">{formatRupiah(basePrice)}</span>
                                        </div>

                                        {appliedDiscount > 0 && (
                                            <div className="flex justify-between text-emerald-600 font-bold">
                                                <span>{lang === 'ID' ? `Diskon Kupon (${appliedDiscount}%)` : `Coupon Discount (${appliedDiscount}%)`}</span>
                                                <span className="font-mono">- {formatRupiah(discountAmount)}</span>
                                            </div>
                                        )}

                                        <div className="flex justify-between text-slate-600 font-medium">
                                            <span>{lang === 'ID' ? 'Biaya Layanan Pembayaran' : 'Payment Gateway Fee'}</span>
                                            <span className="font-mono text-slate-900 font-bold">
                                                {currentFee === 0 ? (lang === 'ID' ? 'Rp 0 (Gratis)' : 'Rp 0 (Free)') : formatRupiah(currentFee)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Total Calculation */}
                                    <div className="flex items-center justify-between py-4">
                                        <div>
                                            <span className="text-xs text-slate-500 font-medium block">{lang === 'ID' ? 'Total Tagihan' : 'Total Amount'}</span>
                                            <span className="text-xl sm:text-2xl font-black text-[#2563EB] font-mono">
                                                {formatRupiah(totalPrice)}
                                            </span>
                                        </div>
                                        <div className="text-right text-[10px] text-slate-400">
                                            {lang === 'ID' ? 'Termasuk Pajak' : 'Tax Included'}
                                        </div>
                                    </div>

                                    {/* Submit Order Action Button */}
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full py-4 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#2563EB] text-white text-sm font-extrabold shadow-lg shadow-blue-500/25 flex items-center justify-center space-x-2 transition-all duration-200 cursor-pointer disabled:opacity-50"
                                    >
                                        <Lock className="w-4 h-4 mr-1.5" />
                                        <span>{processing ? (lang === 'ID' ? 'Memproses...' : 'Processing...') : (lang === 'ID' ? 'Bayar Sekarang' : 'Complete Payment Now')}</span>
                                        <ArrowRight className="w-4 h-4 ml-1.5" />
                                    </button>

                                    {/* Assurance List */}
                                    <div className="mt-6 pt-5 border-t border-slate-100 space-y-2 text-[11px] text-slate-500 font-medium">
                                        <div className="flex items-center space-x-2">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                            <span>{lang === 'ID' ? 'Download Instan setelah pembayaran terkonfirmasi' : 'Instant download after payment is confirmed'}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                            <span>{lang === 'ID' ? 'Lisensi Komersial Seumur Hidup & Pembaruan Gratis' : 'Lifetime Commercial License & Free Updates'}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                            <span>{lang === 'ID' ? 'Dukungan teknis setup & panduan lengkap' : 'Technical setup support & full guides'}</span>
                                        </div>
                                    </div>

                                </div>

                                <div className="text-center">
                                    <Link href="/marketplace" className="inline-flex items-center text-xs font-bold text-slate-500 hover:text-[#2563EB] transition-colors">
                                        <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                                        <span>{lang === 'ID' ? '← Kembali ke Katalog Marketplace' : '← Back to Marketplace Catalog'}</span>
                                    </Link>
                                </div>

                            </div>

                        </div>
                    </form>

                </div>
            </div>
        </PublicLayout>
    );
}
