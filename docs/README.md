# KyySolutions Documentation

## Overview

KyySolutions adalah startup teknologi yang menggabungkan:

1. **Digital Technology Services** — jasa pembuatan website, web application, mobile application, custom software, UI/UX, API, maintenance, dan konsultasi.
2. **Digital Products** — produk digital milik KyySolutions seperti source code, template, UI kit, plugin, starter kit, dan produk digital lainnya.
3. **Marketplace** — platform untuk menjual dan membeli source code serta produk digital dari KyySolutions maupun seller/developer eksternal.

## Core Principle

KyySolutions bukan hanya toko source code. Platform harus dapat berkembang dari first-party products menjadi multi-vendor marketplace.

## Product Delivery Model

Pada tahap awal, seller tidak wajib mengunggah file source code ke server KyySolutions. Seller dapat menyediakan external delivery link, misalnya Google Drive, Dropbox, GitHub Release, atau storage eksternal lain.

Buyer hanya mendapatkan akses setelah order berstatus **PAID**.

## User Access Principle

- Guest dapat browsing marketplace tanpa login.
- Guest dapat melihat product detail tanpa login.
- Login/register diperlukan saat checkout atau aksi personal.
- Buyer dapat melihat pembelian dan akses produk dari akunnya.
- Seller membutuhkan akun seller untuk mengelola store dan produk.
- Admin mengelola keseluruhan platform.

## Recommended Stack

- Laravel 13
- Inertia.js
- React
- MySQL
- Tailwind CSS
- Payment gateway sesuai kebutuhan implementasi
- Private server/storage untuk data aplikasi; product files dapat tetap berada di external storage pada fase awal.

## Documentation Order

AI Agent wajib memahami dokumentasi berikut sebelum implementasi:

1. `01_PRD.md`
2. `02_BUSINESS_MODEL.md`
3. `03_DESIGN_SYSTEM.md`
4. `04_PROJECT_STRUCTURE.md`
5. `05_DATABASE.md`
6. `06_DATABASE_SCHEMA.md`
7. `07_ERD.md`
8. `08_USER_FLOW.md`
9. `09_BUSINESS_FLOW.md`
10. `10_API_SPECIFICATION.md`
11. Feature documents yang relevan
12. `AI/AI_AGENT_RULES.md`

## Status

Dokumen ini merupakan baseline awal berdasarkan hasil diskusi konsep KyySolutions. Detail teknis dapat diperbarui ketika keputusan bisnis dan implementasi sudah difinalisasi.
