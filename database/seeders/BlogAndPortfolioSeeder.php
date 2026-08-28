<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\BlogPost;
use App\Models\PortfolioProject;

class BlogAndPortfolioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Seed Blog Posts
        $posts = [
            [
                'title' => 'Arsitektur Multi-Tenant Database Terisolasi pada Laravel 11 & PostgreSQL',
                'slug' => 'arsitektur-multi-tenant-laravel-postgresql',
                'category' => 'Engineering',
                'excerpt' => 'Panduan komprehensif merancang database tenancy terisolasi dengan schema-per-tenant, automatic tenant resolver middleware, dan proteksi cross-tenant data leaks.',
                'content' => "## Mengapa Arsitektur Multi-Tenant Terisolasi Sangat Krusial?

Ketika membangun sistem SaaS B2B, tantangan terbesar bukan hanya skalabilitas horizontal, melainkan kepatuhan regulasi data (data compliance) dan keamanan isolasi antar-perusahaan. Pendekatan single database dengan `tenant_id` rentan terhadap human error saat developer lupa menyertakan scope query.

### 1. Schema-per-Tenant vs Database-per-Tenant
PostgreSQL menyediakan fitur schema yang sangat efisien untuk memisahkan data tanpa overhead memelihara ratusan koneksi TCP database yang berbeda:

- **Schema Isolation**: Setiap tenant memiliki namespace tabel sendiri (`tenant_alpha`, `tenant_beta`).
- **Connection Pooling**: Memanfaatkan pgbouncer secara efisien tanpa kehabisan connection pool.
- **Migration Orchestrator**: Menjalankan migrasi database terdistribusi secara parallel batch.

```php
// Middleware Tenant Resolver Otomatis
public function handle(Request \$request, Closure \$next)
{
    \$tenant = Tenant::findByDomain(\$request->getHost());
    abort_if(!\$tenant, 404, 'Tenant not found');

    DB::statement(\"SET search_path TO tenant_{\$tenant->id}, public\");
    return \$next(\$request);
}
```

### 2. Monitoring & Backup Otomatis
Dengan schema terisolasi, pencadangan (backup) dan pemulihan data spesifik pelanggan dapat dilakukan dalam hitungan detik tanpa mengganggu operasional tenant lain.",
                'cover_image' => 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80',
                'read_time' => '7 min baca',
                'views_count' => 1420,
                'author_name' => 'Rizky Kurniawan',
                'author_role' => 'Principal Software Architect',
                'is_featured' => true,
                'status' => 'published',
                'published_at' => now()->subDays(2),
            ],
            [
                'title' => 'Strategi Optimasi Query Eloquent & Redis Caching untuk 10.000 QPS',
                'slug' => 'optimasi-query-eloquent-redis-caching-10000-qps',
                'category' => 'Performance',
                'excerpt' => 'Bedah tuntas cara mengatasi N+1 queries, memanfaatkan eager loading subquery joins, serta arsitektur cache tag Redis multi-layer untuk menangani lonjakan traffic ekstrem.',
                'content' => "## Menghilangkan Bottleneck N+1 Queries

Problem utama performa pada aplikasi Laravel skala besar hampir selalu berakar pada query N+1 yang tidak terdeteksi selama masa pengujian lokal.

### Eager Loading dengan Constraint Spesifik
Alih-alih meload seluruh relasi, gunakan subquery join untuk agregasi langsung di database engine:

```php
\$users = User::query()
    ->with(['orders' => function(\$q) {
        \$q->latest()->limit(5);
    }])
    ->withCount('completedTransactions')
    ->paginate(25);
```

### Arsitektur Redis Layering & Cache Invalidation
Gunakan Cache Tags untuk memudahkan invalidasi batch ketika ada perubahan stok produk atau harga katalog.",
                'cover_image' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',
                'read_time' => '5 min baca',
                'views_count' => 980,
                'author_name' => 'Ahmad Fathoni',
                'author_role' => 'Backend Lead',
                'is_featured' => false,
                'status' => 'published',
                'published_at' => now()->subDays(5),
            ],
            [
                'title' => 'Panduan Keamanan Web API: Rate Limiting, JWT Rotation, & Proteksi Replay Attack',
                'slug' => 'panduan-keamanan-web-api-jwt-rotation-replay-attack',
                'category' => 'Security',
                'excerpt' => 'Implementasi standar keamanan OWASP API Security Top 10, HMAC request signature verification, dan token refresh rotation pada REST API modern.',
                'content' => "## Standar Keamanan OWASP API Top 10

REST API adalah pintu gerbang utama aplikasi mobile dan integrasi pihak ketiga. Tanpa proteksi ketat, API rentan terhadap brute-force dan data scraping liar.

### Token Rotation & Blacklisting
Saat access token kadaluarsa, refresh token lama harus segera dianulir (revoked) dan digantikan dengan token baru dalam satu siklus atomik.",
                'cover_image' => 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop&q=80',
                'read_time' => '6 min baca',
                'views_count' => 1150,
                'author_name' => 'Dimas Prasetyo',
                'author_role' => 'Security Engineer',
                'is_featured' => false,
                'status' => 'published',
                'published_at' => now()->subDays(8),
            ],
            [
                'title' => 'State Management Mulus pada Flutter 3 Menggunakan BLoC Pattern & Clean Architecture',
                'slug' => 'state-management-flutter-bloc-clean-architecture',
                'category' => 'Mobile App',
                'excerpt' => 'Memisahkan Business Logic, Presentation Layer, dan Data Source repository pattern agar kode aplikasi mobile siap diuji (unit tested) dan mudah dikembangkan dalam tim besar.',
                'content' => "## Mengapa BLoC Pattern Terbaik untuk Enterprise Mobile?

BLoC (Business Logic Component) memisahkan seluruh state aplikasi dari antarmuka widget. Ini menjamin UI bersifat reaktif murni terhadap event dan state yang dipancarkan.",
                'cover_image' => 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&auto=format&fit=crop&q=80',
                'read_time' => '8 min baca',
                'views_count' => 840,
                'author_name' => 'Bayu Wicaksono',
                'author_role' => 'Mobile Architect',
                'is_featured' => false,
                'status' => 'published',
                'published_at' => now()->subDays(12),
            ],
            [
                'title' => 'Integrasi AI LLM & RAG Pipeline pada Sistem ERP untuk Otomatisasi Dokumen',
                'slug' => 'integrasi-ai-llm-rag-pipeline-erp-otomatisasi-dokumen',
                'category' => 'AI & Cloud',
                'excerpt' => 'Eksplorasi pembuatan pipeline Retrieval-Augmented Generation (RAG) berbasis vector database untuk ekstraksi faktur PDF dan chatbot asisten operasional cerdas.',
                'content' => "## Memanfaatkan AI Generatif untuk Efisiensi Bisnis

Dengan mengintegrasikan model embedding dan vector database, sistem ERP dapat menjawab pertanyaan audit laporan keuangan dalam hitungan milidetik secara akurat tanpa halusinasi.",
                'cover_image' => 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&auto=format&fit=crop&q=80',
                'read_time' => '6 min baca',
                'views_count' => 1650,
                'author_name' => 'Rizky Kurniawan',
                'author_role' => 'Principal Software Architect',
                'is_featured' => false,
                'status' => 'published',
                'published_at' => now()->subDays(15),
            ],
            [
                'title' => 'Design System Scalable: Membangun Komponen UI Reusable Menggunakan React & Tailwind',
                'slug' => 'design-system-scalable-react-tailwind-css',
                'category' => 'Frontend',
                'excerpt' => 'Tips menyusun token warna, skala tipografi, aksesibilitas keyboard navigation, dan komponen UI library modular dengan arsitektur headless component.',
                'content' => "## Konsistensi Visual & Kecepatan Delivery Tim

Design System yang matang mempercepat iterasi fitur frontend hingga 3x lipat, sekaligus menjamin konsistensi UX di semua halaman produk.",
                'cover_image' => 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80',
                'read_time' => '4 min baca',
                'views_count' => 720,
                'author_name' => 'Siti Nurhaliza',
                'author_role' => 'Lead UI/UX Designer',
                'is_featured' => false,
                'status' => 'published',
                'published_at' => now()->subDays(18),
            ],
        ];

        foreach ($posts as $post) {
            BlogPost::updateOrCreate(['slug' => $post['slug']], $post);
        }

        // 2. Seed Portfolio Projects
        $projects = [
            [
                'title' => 'SmartLogistics ERP: Platform Manajemen Rantai Pasok Multi-Gudang',
                'slug' => 'smartlogistics-erp-multi-gudang',
                'category' => 'ERP & Logistik',
                'client_name' => 'PT Logistik Nusantara Prima',
                'industry' => 'Supply Chain & Distribusi',
                'duration' => '10 Minggu',
                'banner_image' => 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=80',
                'problem_statement' => 'Klien mengelola 18 gudang di berbagai pulau dengan pencatatan manual yang menyebabkan selisih inventaris 12% dan keterlambatan pengiriman barang.',
                'solution_overview' => 'KyySolutions membangun sistem ERP berbasis web terintegrasi dengan pelacakan RFID/Barcode realtime, algoritma dispatching rute kurir otomatis, dan rekonsiliasi stok instan.',
                'architecture_summary' => 'Microservices backend dengan Laravel 11, PostgreSQL cluster, Redis caching, Kafka message queue, dan antarmuka web SPA React.',
                'impact_metrics' => [
                    ['label' => 'Akurasi Stok', 'value' => '99.8%', 'change' => '+11.8%'],
                    ['label' => 'Waktu Dispatch', 'value' => '15 Menit', 'change' => '-70%'],
                    ['label' => 'Total Gudang Terhubung', 'value' => '18 Hub', 'change' => '100% Online'],
                ],
                'tech_stack' => ['Laravel 11', 'React 19', 'PostgreSQL', 'Redis', 'Docker', 'TailwindCSS'],
                'deliverables' => [
                    'Dashboard Manajemen Inventaris Multi-Gudang',
                    'Aplikasi Scanner Barcode Kurir Android & iOS',
                    'Modul Rekonsiliasi Faktur & Pajak Otomatis',
                    'REST API Gateway untuk Integrasi Marketplace',
                ],
                'testimonial' => [
                    'quote' => 'Platform ERP dari KyySolutions mengubah total efisiensi operasional 18 gudang kami. Selisih inventaris berhasil ditekan mendekati nol.',
                    'author' => 'Hendrawan Kusuma',
                    'role' => 'Chief Operations Officer',
                ],
                'featured' => true,
                'status' => 'published',
            ],
            [
                'title' => 'HealthHub Pro: Sistem Informasi Manajemen Rumah Sakit & Rekam Medis (RME)',
                'slug' => 'healthhub-pro-simrs-rekam-medis-elektronik',
                'category' => 'Kesehatan (HealthTech)',
                'client_name' => 'RS Medika Sejahtera Group',
                'industry' => 'Healthcare & Medis',
                'duration' => '12 Minggu',
                'banner_image' => 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1200&auto=format&fit=crop&q=80',
                'problem_statement' => 'Kebutuhan integrasi rekam medis elektronik (RME) yang mematuhi standar SATUSEHAT Kemenkes RI dengan volume 2.500+ pasien harian.',
                'solution_overview' => 'Membangun SIMRS modular dengan modul pendaftaran online, antrean cerdas poli, integrasi bridging BPJS V-Claim & SATUSEHAT, serta billing kasir otomatis.',
                'architecture_summary' => 'High-availability backend dengan sistem enkripsi data medis tingkat bank (AES-256) dan sinkronisasi real-time WebSocket.',
                'impact_metrics' => [
                    ['label' => 'Waktu Tunggu Pasien', 'value' => '12 Menit', 'change' => '-65%'],
                    ['label' => 'Pasien Terlayani', 'value' => '40.000+/bln', 'change' => '+45%'],
                    ['label' => 'Kepatuhan Regulasi', 'value' => '100%', 'change' => 'SATUSEHAT Ready'],
                ],
                'tech_stack' => ['Laravel', 'Vue 3', 'MySQL Cluster', 'HL7 FHIR API', 'TailwindCSS'],
                'deliverables' => [
                    'Modul Rekam Medis Elektronik Terstandarisasi FHIR',
                    'Sistem Antrean Poli & Farmasi Terintegrasi Suara',
                    'Bridging BPJS Kesehatan & SATUSEHAT Kemenkes RI',
                    'Portal Pasien Mobile untuk Jadwal Dokter',
                ],
                'testimonial' => [
                    'quote' => 'Proses integrasi SATUSEHAT berjalan lancar tanpa kendala berkat tim engineer KyySolutions yang sangat memahami regulasi medis.',
                    'author' => 'dr. Amanda Clarissa, Sp.A',
                    'role' => 'Direktur Pelayanan Medis',
                ],
                'featured' => true,
                'status' => 'published',
            ],
            [
                'title' => 'PayNest FinTech: Dompet Digital & Payment Hub Multi-Biller',
                'slug' => 'paynest-fintech-dompet-digital-payment-hub',
                'category' => 'Fintech & Keuangan',
                'client_name' => 'PayNest Financial Global',
                'industry' => 'Financial Technology',
                'duration' => '14 Minggu',
                'banner_image' => 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=80',
                'problem_statement' => 'Klien membutuhkan engine pembayaran dompet digital dengan throughput tinggi yang sanggup memproses ribuan transaksi QRIS dan PPOB per detik.',
                'solution_overview' => 'Pengembangan core payment engine berbasis event-driven architecture dengan sistem ledger double-entry bookkeeping berkeamanan tinggi.',
                'architecture_summary' => 'Microservices Golang & Laravel, Redis lock untuk pencegahan double-spending, Kafka message broker, dan database PostgreSQL terisolasi.',
                'impact_metrics' => [
                    ['label' => 'Volume Transaksi', 'value' => 'Rp 45 Milyar/bln', 'change' => '+320%'],
                    ['label' => 'Latensi Transaksi', 'value' => '180ms', 'change' => 'Instant QRIS'],
                    ['label' => 'Tingkat Sukses', 'value' => '99.98%', 'change' => 'High SLA'],
                ],
                'tech_stack' => ['Laravel', 'Flutter', 'PostgreSQL', 'Redis', 'Kafka', 'QRIS Open API'],
                'deliverables' => [
                    'Aplikasi Dompet Digital iOS & Android (Flutter)',
                    'Core Ledger Engine Double-Entry Accounting',
                    'Modul Integrasi 200+ Produk Tagihan PPOB',
                    'Dashboard Anti-Fraud & Realtime Alerting',
                ],
                'testimonial' => [
                    'quote' => 'Kecepatan dan stabilitas transaksi PayNest luar biasa. Kami berhasil menangani lonjakan transaksi payday tanpa downtime.',
                    'author' => 'Kevin Sanjaya',
                    'role' => 'VP of Engineering',
                ],
                'featured' => false,
                'status' => 'published',
            ],
            [
                'title' => 'EduLearn Enterprise: Platform LMS & Ujian Online Anti-Curang',
                'slug' => 'edulearn-enterprise-lms-ujian-online',
                'category' => 'Education & LMS',
                'client_name' => 'Yayasan Pendidikan Utama',
                'industry' => 'Pendidikan & Pelatihan',
                'duration' => '6 Minggu',
                'banner_image' => 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&auto=format&fit=crop&q=80',
                'problem_statement' => 'Pelaksanaan ujian online 15.000 siswa serentak sering server crash dan rentan kecurangan membuka tab browser lain.',
                'solution_overview' => 'Membangun LMS modern dengan modul ujian secure browser lockdown, acak soal dinamis, dan autoscaling server yang tangguh.',
                'architecture_summary' => 'Laravel backend teroptimasi dengan Redis session store, frontend React interaktif, dan CDN video streaming terenkripsi.',
                'impact_metrics' => [
                    ['label' => 'Siswa Aktif', 'value' => '25.000+ Akun', 'change' => '+150%'],
                    ['label' => 'Concurrent Users', 'value' => '15.000 Siswa', 'change' => 'Zero Downtime'],
                    ['label' => 'Kecepatan Muat Soal', 'value' => '< 1 Detik', 'change' => 'Super Fast'],
                ],
                'tech_stack' => ['Laravel', 'React', 'Redis', 'AWS Autoscaling', 'WebRTC'],
                'deliverables' => [
                    'Engine Ujian Online Anti-Curang dengan Face Detection',
                    'Modul Kelas Interaktif & Live Video Conference',
                    'Koreksi Otomatis Soal Pilihan Ganda & Analisis Nilai',
                    'Portal Orang Tua untuk Pemantauan Nilai',
                ],
                'testimonial' => [
                    'quote' => 'Ujian semester dengan belasan ribu siswa serentak berjalan sangat lancar. Tidak ada lagi keluhan server lemot atau gagal submit.',
                    'author' => 'Drs. Bambang Sudirman',
                    'role' => 'Ketua Tim IT Akademik',
                ],
                'featured' => false,
                'status' => 'published',
            ],
            [
                'title' => 'EstateFlow: Sistem Manajemen Properti & Sewa Unit Apartemen',
                'slug' => 'estateflow-manajemen-properti-sewa-apartemen',
                'category' => 'Property & Real Estate',
                'client_name' => 'Grand Horizon Residences',
                'industry' => 'Real Estate & Hospitality',
                'duration' => '8 Minggu',
                'banner_image' => 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80',
                'problem_statement' => 'Pengelolaan 4 tower apartemen dengan 1.200 unit masih menggunakan spreadsheet untuk penagihan IPL dan keluhan penghuni.',
                'solution_overview' => 'Aplikasi tenant portal mobile & web manajemen gedung untuk tagihan IPL otomatis via Virtual Account, laporan perbaikan (ticketing), dan booking fasilitas.',
                'architecture_summary' => 'Inertia.js full-stack dengan integrasi payment gateway otomatis dan push notification real-time.',
                'impact_metrics' => [
                    ['label' => 'Kolektibilitas IPL', 'value' => '98.5%', 'change' => '+28% Tepat Waktu'],
                    ['label' => 'Penyelesaian Tiket', 'value' => '< 4 Jam', 'change' => '-60% Lebih Cepat'],
                    ['label' => 'Unit Terkelola', 'value' => '1.200 Unit', 'change' => '100% Digital'],
                ],
                'tech_stack' => ['Laravel', 'React', 'MySQL', 'Midtrans VA', 'Firebase FCM'],
                'deliverables' => [
                    'Tenant Mobile App untuk Bayar Tagihan & Laporan Kerusakan',
                    'Building Management Panel untuk Petugas Maintenance & Kasir',
                    'Sistem Auto-Generate Invoice IPL & Tagihan Listrik Air',
                    'Fitur Booking Fasilitas Gedung (Gym, Kolam Renang, Hall)',
                ],
                'testimonial' => [
                    'quote' => 'Penghuni sangat senang karena bayar tagihan dan lapor perbaikan sekarang semudah menggunakan aplikasi di genggaman tangan.',
                    'author' => 'Maya Anggraini',
                    'role' => 'Building Property Manager',
                ],
                'featured' => false,
                'status' => 'published',
            ],
            [
                'title' => 'AutoParts B2B Marketplace: Distributor Suku Cadang Otomotif',
                'slug' => 'autoparts-b2b-marketplace-distributor',
                'category' => 'B2B Marketplace',
                'client_name' => 'Mega Otomotif Nusantara',
                'industry' => 'Automotive Parts & B2B',
                'duration' => '10 Minggu',
                'banner_image' => 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=1200&auto=format&fit=crop&q=80',
                'problem_statement' => 'Rantai distribusi 50.000 SKU suku cadang ke 3.000 bengkel mitra lambat karena pesanan manual via chat dan pencarian nomor part yang rumit.',
                'solution_overview' => 'Platform B2B e-commerce dengan sistem pencarian nomor part (OEM Part Search), tier harga grosir dinamis per kategori bengkel, dan integrasi kurir kargo.',
                'architecture_summary' => 'Elasticsearch untuk pencarian instan katalog 50.000 SKU dalam 50ms dan sistem manajemen kredit piutang toko (TOP payment).',
                'impact_metrics' => [
                    ['label' => 'Omzet Pesanan', 'value' => '+210%', 'change' => 'Pertumbuhan 6 Bln'],
                    ['label' => 'Bengkel Terdaftar', 'value' => '3.200 Mitra', 'change' => '+180% Bengkel'],
                    ['label' => 'Kecepatan Cari Part', 'value' => '45ms', 'change' => 'Instant Catalog'],
                ],
                'tech_stack' => ['Laravel 11', 'React 19', 'PostgreSQL', 'Elasticsearch', 'Redis'],
                'deliverables' => [
                    'Katalog B2B dengan Filter Nomor Seri OEM Otomotif',
                    'Sistem Dynamic Pricing & Plafon Kredit Toko (Term of Payment)',
                    'Portal Manajemen Gudang & Resi Pengiriman Kargo',
                    'Aplikasi Pemesanan Kilat Khusus Montir Bengkel',
                ],
                'testimonial' => [
                    'quote' => 'Bengkel mitra kami sekarang bisa memesan onderdil secara mandiri kapan saja. Efisiensi tim sales kami naik berlipat ganda.',
                    'author' => 'Surya Wicaksana',
                    'role' => 'Managing Director',
                ],
                'featured' => false,
                'status' => 'published',
            ],
        ];

        foreach ($projects as $project) {
            PortfolioProject::updateOrCreate(['slug' => $project['slug']], $project);
        }
    }
}
