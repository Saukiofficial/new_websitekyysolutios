<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Invoice {{ $order->order_number }} — KyySolutions</title>
    <style>
        @page {
            margin: 30px 40px;
        }
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #1e293b;
            font-size: 12px;
            line-height: 1.5;
            margin: 0;
            padding: 0;
        }
        .header-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 25px;
            border-bottom: 2px solid #2563eb;
            padding-bottom: 15px;
        }
        .logo-title {
            font-size: 24px;
            font-weight: 900;
            color: #0f172a;
            letter-spacing: -0.5px;
        }
        .logo-title span {
            color: #2563eb;
        }
        .tagline {
            font-size: 10px;
            color: #64748b;
            margin-top: 2px;
        }
        .invoice-badge {
            text-align: right;
        }
        .invoice-title {
            font-size: 20px;
            font-weight: 800;
            color: #0f172a;
            text-transform: uppercase;
        }
        .invoice-ref {
            font-size: 11px;
            font-family: 'Courier New', Courier, monospace;
            font-weight: bold;
            color: #2563eb;
            margin-top: 2px;
        }
        .status-paid {
            display: inline-block;
            background-color: #ecfdf5;
            color: #059669;
            border: 1px solid #a7f3d0;
            padding: 3px 10px;
            border-radius: 4px;
            font-size: 10px;
            font-weight: bold;
            text-transform: uppercase;
            margin-top: 5px;
        }
        .meta-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 25px;
        }
        .meta-table td {
            width: 50%;
            vertical-align: top;
        }
        .meta-box {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 12px 16px;
        }
        .meta-box-title {
            font-size: 10px;
            font-weight: bold;
            color: #64748b;
            text-transform: uppercase;
            margin-bottom: 6px;
            letter-spacing: 0.5px;
        }
        .meta-line {
            font-size: 11px;
            margin-bottom: 3px;
        }
        .meta-line strong {
            color: #0f172a;
        }
        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        .items-table th {
            background-color: #0f172a;
            color: #ffffff;
            font-size: 10px;
            font-weight: bold;
            text-transform: uppercase;
            padding: 10px 12px;
            text-align: left;
            letter-spacing: 0.5px;
        }
        .items-table td {
            padding: 12px;
            border-bottom: 1px solid #e2e8f0;
            font-size: 11px;
        }
        .item-title {
            font-weight: bold;
            color: #0f172a;
            font-size: 12px;
        }
        .item-subtitle {
            font-size: 10px;
            color: #64748b;
            margin-top: 2px;
        }
        .total-section {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 25px;
        }
        .total-section td {
            vertical-align: top;
        }
        .total-table {
            width: 100%;
            border-collapse: collapse;
        }
        .total-table td {
            padding: 6px 12px;
            font-size: 11px;
        }
        .total-table .grand-total {
            background-color: #f1f5f9;
            font-size: 14px;
            font-weight: bold;
            color: #0f172a;
            border-top: 2px solid #cbd5e1;
        }
        .license-card {
            background-color: #eff6ff;
            border: 1px dashed #3b82f6;
            border-radius: 6px;
            padding: 12px 16px;
            margin-bottom: 25px;
        }
        .license-title {
            font-size: 10px;
            font-weight: bold;
            color: #1d4ed8;
            text-transform: uppercase;
            margin-bottom: 4px;
        }
        .license-key {
            font-family: 'Courier New', Courier, monospace;
            font-size: 13px;
            font-weight: bold;
            color: #0f172a;
        }
        .footer {
            border-top: 1px solid #e2e8f0;
            padding-top: 15px;
            font-size: 10px;
            color: #94a3b8;
            text-align: center;
        }
        .verified-seal {
            border: 2px solid #059669;
            color: #059669;
            padding: 4px 12px;
            display: inline-block;
            font-weight: 900;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 1px;
            border-radius: 4px;
        }
    </style>
</head>
<body>

    <!-- Header Section -->
    <table class="header-table">
        <tr>
            <td style="width: 55%; vertical-align: middle;">
                <div class="logo-title">Kyy<span>Solutions</span></div>
                <div class="tagline">Digital Software Marketplace & Enterprise Tech Studio</div>
                <div style="font-size: 10px; color: #64748b; margin-top: 4px;">
                    Website: https://kyysolutions.com &bull; Email: support@kyysolutions.com
                </div>
            </td>
            <td class="invoice-badge" style="width: 45%; vertical-align: middle;">
                <div class="invoice-title">OFFICIAL RECEIPT</div>
                <div class="invoice-ref">No: {{ $order->order_number }}</div>
                <div class="status-paid">
                    &bull; {{ strtoupper($order->status) }} — LUNAS
                </div>
            </td>
        </tr>
    </table>

    <!-- Meta Information: Billed To & Order Details -->
    <table class="meta-table">
        <tr>
            <td style="padding-right: 10px;">
                <div class="meta-box">
                    <div class="meta-box-title">Diterbitkan Untuk (Bill To)</div>
                    <div class="meta-line"><strong>Nama:</strong> {{ $order->customer_name }}</div>
                    <div class="meta-line"><strong>Email:</strong> {{ $order->customer_email }}</div>
                    <div class="meta-line"><strong>Telepon:</strong> {{ $order->customer_phone ?: '-' }}</div>
                </div>
            </td>
            <td style="padding-left: 10px;">
                <div class="meta-box">
                    <div class="meta-box-title">Rincian Transaksi</div>
                    <div class="meta-line"><strong>Tanggal Bayar:</strong> {{ $order->paid_at ? $order->paid_at->format('d F Y, H:i') . ' WIB' : $order->created_at->format('d F Y, H:i') . ' WIB' }}</div>
                    <div class="meta-line"><strong>Metode:</strong> {{ strtoupper($order->payment_method ?? 'MIDTRANS') }}</div>
                    <div class="meta-line"><strong>Status:</strong> Terverifikasi Otomatis</div>
                </div>
            </td>
        </tr>
    </table>

    <!-- Purchased Items Table -->
    <table class="items-table">
        <thead>
            <tr>
                <th style="width: 50%;">Deskripsi Produk & Lisensi</th>
                <th style="width: 20%; text-align: center;">Tipe Lisensi</th>
                <th style="width: 30%; text-align: right;">Harga (IDR)</th>
            </tr>
        </thead>
        <tbody>
            @foreach($order->items as $item)
            <tr>
                <td>
                    <div class="item-title">{{ $item->product_title_snapshot }}</div>
                    <div class="item-subtitle">Kategori: {{ $item->product->category->name ?? 'Software' }} &bull; Versi: {{ $item->product->version ?? 'v1.0.0' }}</div>
                </td>
                <td style="text-align: center;">
                    <span style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: bold; text-transform: uppercase;">
                        {{ $item->license_type ?? 'REGULAR' }}
                    </span>
                </td>
                <td style="text-align: right; font-weight: bold; color: #0f172a;">
                    Rp {{ number_format($item->price, 0, ',', '.') }}
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <!-- Total Calculations -->
    <table class="total-section">
        <tr>
            <td style="width: 50%;">
                <div style="margin-top: 10px;">
                    <div class="verified-seal">&#10003; PAYMENT AUTHENTICATED</div>
                    <p style="font-size: 9px; color: #64748b; margin-top: 6px; line-height: 1.4;">
                        Dokumen ini adalah bukti transaksi sah yang diterbitkan secara elektronik oleh platform KyySolutions. Berlaku sebagai faktur pembelian dan lisensi hak pakai software.
                    </p>
                </div>
            </td>
            <td style="width: 50%; padding-left: 20px;">
                <table class="total-table">
                    <tr>
                        <td style="color: #64748b;">Subtotal Produk:</td>
                        <td style="text-align: right; font-weight: bold;">Rp {{ number_format($order->subtotal, 0, ',', '.') }}</td>
                    </tr>
                    @if($order->discount > 0)
                    <tr>
                        <td style="color: #059669;">Kupon Diskon:</td>
                        <td style="text-align: right; font-weight: bold; color: #059669;">- Rp {{ number_format($order->discount, 0, ',', '.') }}</td>
                    </tr>
                    @endif
                    <tr>
                        <td style="color: #64748b;">Biaya Transaksi / Gateway:</td>
                        <td style="text-align: right; font-weight: bold;">Rp {{ number_format($order->payment_fee, 0, ',', '.') }}</td>
                    </tr>
                    <tr class="grand-total">
                        <td>TOTAL PEMBAYARAN:</td>
                        <td style="text-align: right; color: #2563eb;">Rp {{ number_format($order->total, 0, ',', '.') }}</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

    <!-- Commercial DRM & License Key Authentication Box -->
    @php
        $firstAccess = $order->accesses->first();
        $licenseKey = $firstAccess?->license_key ?? ('KYY-LIC-' . strtoupper(substr(md5($order->order_number), 0, 8)) . '-AUTH');
    @endphp
    <div class="license-card">
        <div class="license-title">&#128273; Kunci Otentikasi Lisensi Komersial (Software DRM Key)</div>
        <div class="license-key">{{ $licenseKey }}</div>
        <div style="font-size: 9px; color: #64748b; margin-top: 4px;">
            Gunakan lisensi ini untuk aktivasi deployment proyek komersial atau validasi instalasi software Anda.
        </div>
    </div>

    <!-- Footer -->
    <div class="footer">
        <div><strong>KyySolutions Technology Inc.</strong> &bull; Hak Cipta Dilindungi Undang-Undang.</div>
        <div style="margin-top: 2px;">Butuh bantuan atau pertanyaan teknis? Hubungi <strong>support@kyysolutions.com</strong> atau WhatsApp resmi kami.</div>
    </div>

</body>
</html>
