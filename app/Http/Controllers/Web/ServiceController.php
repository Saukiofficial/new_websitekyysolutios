<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    /**
     * Display the comprehensive custom software services page.
     */
    public function index(Request $request): Response
    {
        $services = [
            [
                'id' => 'web-saas',
                'slug' => 'web-saas-development',
                'title' => 'Web Application & SaaS Development',
                'category' => 'Web & Cloud',
                'icon' => 'Globe',
                'badge' => 'Paling Populer',
                'tagline' => 'Aplikasi web berkinerja tinggi, responsif, dan siap melayani jutaan pengguna.',
                'description' => 'Kami merancang dan mengembangkan sistem web kustom dari awal hingga siap rilis menggunakan arsitektur modern (Laravel, React, Next.js, Vue). Cocok untuk platform SaaS multi-tenant, portal perusahaan, dan sistem manajemen internal.',
                'deliverables' => [
                    'Arsitektur Multi-Tenant & Database Terisolasi',
                    'Single Page Application (SPA) Cepat & SEO-Friendly',
                    'Panel Admin Dashboard Lengkap dengan Analitik',
                    'Integrasi Payment Gateway & Langganan Otomatis',
                    'Dokumentasi API & Kode Sumber Bersih 100% Hak Milik'
                ],
                'techStack' => ['Laravel', 'React', 'Next.js', 'PostgreSQL', 'TailwindCSS', 'Redis', 'Docker'],
                'startingPrice' => 'Rp 7.500.000',
                'timeline' => '2–4 Minggu',
            ],
            [
                'id' => 'mobile-app',
                'slug' => 'mobile-app-development',
                'title' => 'Mobile App Development (Android & iOS)',
                'category' => 'Mobile Solutions',
                'icon' => 'Smartphone',
                'badge' => 'Cross-Platform',
                'tagline' => 'Aplikasi mobile native & cross-platform dengan UI/UX mulus 60fps.',
                'description' => 'Membangun aplikasi mobile Android dan iOS menggunakan Flutter atau React Native yang stabil, hemat memori, dan teroptimasi untuk performa tinggi dengan sinkronisasi data offline-first.',
                'deliverables' => [
                    'Build APK, AAB (Play Store) & IPA (App Store) Siap Rilis',
                    'Push Notification Firebase Real-Time',
                    'Mode Offline-First dengan Local Database Sync',
                    'Integrasi Sensor (GPS, Kamera, Biometrik Fingerprint/Face ID)',
                    'Garansi Lolos Review Google Play Store & Apple App Store'
                ],
                'techStack' => ['Flutter', 'Dart', 'React Native', 'Kotlin', 'Swift', 'Firebase', 'SQLite'],
                'startingPrice' => 'Rp 9.500.000',
                'timeline' => '3–6 Minggu',
            ],
            [
                'id' => 'erp-pos',
                'slug' => 'erp-pos-finance-systems',
                'title' => 'Enterprise ERP, POS & Inventory Systems',
                'category' => 'Enterprise Solutions',
                'icon' => 'Layers',
                'badge' => 'Enterprise Grade',
                'tagline' => 'Sistem automasi operasional, kasir kas, dan pergudangan multi-cabang.',
                'description' => 'Solusi software terpadu untuk menyederhanakan alur kerja bisnis Anda. Mencakup manajemen stok barang barcode/QR, pencatatan transaksi POS, invoice otomatis, dan laporan neraca laba-rugi akuntansi.',
                'deliverables' => [
                    'Multi-Outlet & Multi-Gudang dengan Sinkronisasi Stok Real-Time',
                    'Sistem Kasir POS Cepat dengan Cetak Struk Thermal Bluetooth/USB',
                    'Laporan Keuangan Otomatis (Neraca, Jurnal, Arus Kas, P&L)',
                    'Manajemen Hak Akses Karyawan (RBAC Berjenjang)',
                    'Export Data Lengkap ke Excel, PDF, dan CSV'
                ],
                'techStack' => ['Laravel', 'Vue.js', 'MySQL', 'Node.js', 'TailwindCSS', 'WebSockets'],
                'startingPrice' => 'Rp 12.000.000',
                'timeline' => '4–8 Minggu',
            ],
            [
                'id' => 'ai-automation',
                'slug' => 'ai-integration-automation',
                'title' => 'AI Integration, OCR & WhatsApp Bot',
                'category' => 'Artificial Intelligence',
                'icon' => 'Bot',
                'badge' => 'Teknologi Mutakhir',
                'tagline' => 'Tingkatkan efisiensi bisnis hingga 10x dengan agen AI & otomasi cerdas.',
                'description' => 'Integrasikan kecerdasan buatan canggih (Gemini / OpenAI / Claude) langsung ke dalam alur kerja perusahaan Anda. Mulai dari chatbot WhatsApp customer service 24/7, ekstraksi data KTP/faktur (OCR), hingga klasifikasi dokumen otomatis.',
                'deliverables' => [
                    'Chatbot WhatsApp / Telegram Interaktif Terhubung ke Database',
                    'Ekstraksi Teks Otomatis dari Dokumen/Foto (OCR Engine)',
                    'Sistem Rekomendasi Pintar & Analisis Sentimen Pelanggan',
                    'Automasi Alur Kerja (Workflow Triggers & Webhooks)',
                    'Dashboard Monitoring Penggunaan Token & Keakuratan AI'
                ],
                'techStack' => ['Python', 'Gemini API', 'OpenAI', 'LangChain', 'FastAPI', 'Node.js', 'PostgreSQL'],
                'startingPrice' => 'Rp 6.000.000',
                'timeline' => '1–3 Minggu',
            ],
            [
                'id' => 'api-cloud',
                'slug' => 'api-backend-cloud-infrastructure',
                'title' => 'API Backend, Microservices & DevOps',
                'category' => 'Cloud & Architecture',
                'icon' => 'Server',
                'badge' => 'High Concurrency',
                'tagline' => 'Infrastruktur cloud tangguh dengan uptime 99.9% dan keamanan teruji.',
                'description' => 'Pengembangan RESTful API dan GraphQL yang skalabel, aman, serta setup server cloud (VPS / AWS / GCP / Cloudflare) dengan pipeline CI/CD otomatis untuk deployment tanpa downtime.',
                'deliverables' => [
                    'RESTful API / GraphQL Standar Industri dengan Autentikasi JWT/OAuth2',
                    'Setup Server Cloud, Auto-Scaling & Load Balancing',
                    'Konfigurasi Docker Containers & CI/CD Pipeline (GitHub Actions)',
                    'Audit Keamanan, Rate Limiting & Proteksi DDoS Cloudflare',
                    'Dokumentasi API Interaktif dengan Swagger / Postman Collection'
                ],
                'techStack' => ['Go (Golang)', 'Laravel', 'Node.js', 'Docker', 'AWS', 'GCP', 'Cloudflare', 'Nginx'],
                'startingPrice' => 'Rp 5.500.000',
                'timeline' => '1–3 Minggu',
            ],
            [
                'id' => 'ui-ux-design',
                'slug' => 'ui-ux-design-prototyping',
                'title' => 'UI/UX Product Design & Figma System',
                'category' => 'Design & Research',
                'icon' => 'Layout',
                'badge' => 'Pixel-Perfect',
                'tagline' => 'Desain antarmuka modern yang memikat pengguna dan meningkatkan konversi.',
                'description' => 'Perancangan desain antarmuka pengguna (UI) dan pengalaman pengguna (UX) berbasis riset mendalam. Disertai design system Figma yang rapi dan clickable prototype interaktif sebelum masuk tahap coding.',
                'deliverables' => [
                    'Riset Persona Pengguna & User Journey Mapping',
                    'Wireframe Rendah & Desain Visual High-Fidelity (Figma)',
                    'Design System Komprehensif (Warna, Tipografi, Komponen UI)',
                    'Clickable Prototype Interaktif untuk Demo ke Investor / Klien',
                    'Developer Handoff Rapi dengan Aset SVG & Panduan CSS Token'
                ],
                'techStack' => ['Figma', 'FigJam', 'Design Tokens', 'TailwindCSS System', 'Prototyping'],
                'startingPrice' => 'Rp 3.500.000',
                'timeline' => '1–2 Minggu',
            ],
        ];

        $workflow = [
            [
                'step' => '01',
                'title' => 'Konsultasi & Analisis Kebutuhan',
                'desc' => 'Kami mendengarkan visi bisnis Anda, menganalisis tantangan teknis, dan merumuskan dokumen spesifikasi kebutuhan sistem (SRS) yang terstruktur.',
                'icon' => 'Search',
            ],
            [
                'step' => '02',
                'title' => 'UI/UX & Interactive Prototype',
                'desc' => 'Merancang alur wireframe dan visual prototype di Figma agar Anda dapat melihat dan mencoba pengalaman aplikasi sebelum baris kode pertama ditulis.',
                'icon' => 'Layout',
            ],
            [
                'step' => '03',
                'title' => 'Pengembangan Agile & Clean Code',
                'desc' => 'Tim senior engineer KyySolutions mengeksekusi coding dalam sprint berkala dengan arsitektur bersih, modular, dan standar keamanan tinggi.',
                'icon' => 'Code2',
            ],
            [
                'step' => '04',
                'title' => 'Quality Assurance (QA) & Security Testing',
                'desc' => 'Pengujian performa secara ketat di berbagai perangkat, audit keamanan dari celah SQL Injection / XSS, serta pengujian beban pengguna (Stress Test).',
                'icon' => 'ShieldCheck',
            ],
            [
                'step' => '05',
                'title' => 'Deployment & Garansi Pemeliharaan',
                'desc' => 'Peluncuran ke server cloud / app store publik, serah terima kode sumber 100%, disertai garansi pemeliharaan gratis hingga 6 bulan.',
                'icon' => 'Rocket',
            ],
        ];

        return Inertia::render('Public/Services/Index', [
            'services' => $services,
            'workflow' => $workflow,
        ]);
    }
}
