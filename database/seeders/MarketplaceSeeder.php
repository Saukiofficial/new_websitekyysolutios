<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Store;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductLink;
use App\Models\Review;
use Illuminate\Support\Facades\Hash;

class MarketplaceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Create / Update Admin and Official Seller User
        $admin = User::firstOrCreate(
            ['email' => 'admin@kyysolutions.com'],
            [
                'name' => 'KyySolutions Admin',
                'password' => Hash::make('password123'),
                'role' => 'admin',
                'status' => 'active',
                'phone' => '+6281234567890',
            ]
        );

        $seller = User::firstOrCreate(
            ['email' => 'official@kyysolutions.com'],
            [
                'name' => 'KyySolutions Official',
                'password' => Hash::make('password123'),
                'role' => 'seller',
                'status' => 'active',
                'phone' => '+6281234567890',
            ]
        );

        // 2. Create Official Store Profile
        $store = Store::firstOrCreate(
            ['user_id' => $seller->id],
            [
                'name' => 'KyySolutions Official',
                'username' => 'kyysolutions',
                'slug' => 'kyysolutions-official',
                'description' => 'Official enterprise digital products, boilerplate systems, and production-tested source codes crafted by KyySolutions engineering team.',
                'is_official' => true,
                'is_verified' => true,
                'rating' => 5.00,
                'response_time' => '< 15 Menit',
                'status' => 'active',
            ]
        );

        // 3. Create Master Categories
        $categories = [
            'saasSystems' => [
                'name' => 'SaaS Systems',
                'slug' => 'saas-systems',
                'category_key' => 'saasSystems',
                'description' => 'Multi-tenant, subscription billing, and cloud web applications.',
            ],
            'sourceCode' => [
                'name' => 'Source Code',
                'slug' => 'source-code',
                'category_key' => 'sourceCode',
                'description' => 'Fullstack web scripts, POS terminal backends, and modular CMS.',
            ],
            'mobileApps' => [
                'name' => 'Mobile Apps',
                'slug' => 'mobile-apps',
                'category_key' => 'mobileApps',
                'description' => 'Cross-platform Flutter & React Native native mobile apps.',
            ],
            'uiKits' => [
                'name' => 'UI Kits',
                'slug' => 'ui-kits',
                'category_key' => 'uiKits',
                'description' => 'Figma design tokens, Auto-layout systems, and Tailwind components.',
            ],
            'plugins' => [
                'name' => 'Plugins & APIs',
                'slug' => 'plugins-apis',
                'category_key' => 'plugins',
                'description' => 'AI orchestration gateways, payment modules, and microservices.',
            ],
        ];

        $categoryModels = [];
        foreach ($categories as $key => $catData) {
            $categoryModels[$key] = Category::firstOrCreate(
                ['slug' => $catData['slug']],
                $catData
            );
        }

        // 4. Create Master Products Catalog
        $products = [
            [
                'title' => 'SaaS Multi-Tenant Boilerplate Starter',
                'slug' => 'saas-multi-tenant-starter',
                'category_id' => $categoryModels['saasSystems']->id,
                'badge' => 'Best Seller',
                'price' => 650000,
                'extended_price' => 1450000,
                'version' => 'v2.4.0',
                'demo_url' => 'https://saas-demo.kyysolutions.com',
                'rating' => 4.90,
                'reviews_count' => 38,
                'sales_count' => 142,
                'short_description' => 'Production-ready Laravel 13 & React 19 multi-tenancy boilerplate with automated subdomain provisioning, team roles, Stripe & Midtrans billing, and dark mode.',
                'description' => 'A robust, enterprise-grade SaaS starter kit designed for developers and agencies building subscription-based software. Includes automated database tenancy separation, team permission matrix, comprehensive billing portal, and high-performance frontend components.',
                'features' => [
                    'Automated Subdomain & Custom Domain Tenancy Separation (Multi-Database or Single-DB Tenancy)',
                    'Pre-built Subscription Billing with Stripe & Midtrans Webhook support',
                    'Role-Based Access Control (RBAC) with granular team member invitation system',
                    'Dark / Light mode ready UI with Tailwind CSS v4 & Lucide Icons',
                    'Authentication with Socialite (Google & GitHub OAuth), 2FA, and Passwordless Magic Links',
                    'Activity Logs, Audit Trail, and Server Health Monitoring endpoints',
                    'Comprehensive Automated Tests (Pest PHP & Jest)',
                ],
                'tech_stack' => ['Laravel 13', 'React 19', 'Inertia.js v2', 'Tailwind CSS', 'PostgreSQL / MySQL', 'Redis', 'Docker Compose'],
                'requirements' => [
                    'PHP >= 8.2',
                    'Node.js >= 18.0 & NPM / PNPM',
                    'MySQL 8.0+ or PostgreSQL 14+',
                    'Composer >= 2.6',
                    'Redis for queue workers (optional but recommended)',
                ],
                'files_included' => [
                    'Complete Clean Laravel 13 & React Source Code',
                    'MySQL & PostgreSQL Tenancy Schema Dumps',
                    'Docker Compose Local Setup File',
                    'Figma Component Kit & Design Tokens',
                    'Step-by-step Setup & Deployment PDF Guide',
                ],
                'changelog' => [
                    ['version' => 'v2.4.0', 'date' => '15 Aug 2026', 'changes' => ['Upgraded to React 19 and Inertia.js v2', 'Added Midtrans QRIS instant webhook listener', 'Improved tenant database migration speed by 40%']],
                    ['version' => 'v2.3.1', 'date' => '02 Jun 2026', 'changes' => ['Added Two-Factor Authentication (2FA) via TOTP', 'Fixed subdomain SSL cookie isolation on local dev']],
                    ['version' => 'v2.0.0', 'date' => '10 Jan 2026', 'changes' => ['Initial enterprise multi-tenant release with Stripe billing']],
                ],
                'delivery_url' => 'https://github.com/kyysolutions/saas-boilerplate-starter-private',
            ],
            [
                'title' => 'E-Commerce Admin & Live POS Terminal Kit',
                'slug' => 'ecommerce-pos-terminal-kit',
                'category_id' => $categoryModels['sourceCode']->id,
                'badge' => 'Featured',
                'price' => 450000,
                'extended_price' => 1100000,
                'version' => 'v1.8.2',
                'demo_url' => 'https://pos-demo.kyysolutions.com',
                'rating' => 4.80,
                'reviews_count' => 24,
                'sales_count' => 98,
                'short_description' => 'Complete Point of Sale & Retail Omnichannel system with thermal printer support, offline sync, real-time inventory alerts, and cashier shift management.',
                'description' => 'A production-tested POS terminal and store management suite built for retail, F&B, and franchise outlets. Supports offline transaction queuing, barcode scanning, Bluetooth/USB thermal printing, and centralized multi-outlet inventory sync.',
                'features' => [
                    'Real-time Cashier Checkout with Barcode Scanner & Touchscreen Quick Grid',
                    'ESC/POS Thermal Printing (Bluetooth, USB, Network LAN) with custom receipt logo',
                    'Multi-Outlet & Multi-Warehouse Stock Transfer with low-stock SMS/WhatsApp alert',
                    'Cashier Shift Opening, Cash Count, and End-of-Day X/Z Report generation',
                    'Customer Loyalty Points, Discount Rules, and Split Bill calculations',
                    'Offline Mode with IndexedDB sync when internet reconnects',
                ],
                'tech_stack' => ['Laravel 13', 'React / Vue 3', 'Tailwind CSS', 'IndexedDB', 'Pusher WebSockets', 'MySQL'],
                'requirements' => [
                    'PHP >= 8.2',
                    'Node.js >= 18.0',
                    'MySQL 8.0+',
                    'Modern Web Browser with Web Bluetooth / Web Serial API (Chrome / Edge)',
                ],
                'files_included' => [
                    'Laravel Backend POS API Source Code',
                    'React & Vue Cashier Frontend Applications',
                    'Thermal Printing Driver Helper Scripts',
                    'Sample Database with 500+ SKU inventory items',
                    'Installation & Hardware Compatibility Guide',
                ],
                'changelog' => [
                    ['version' => 'v1.8.2', 'date' => '20 Aug 2026', 'changes' => ['Added QRIS dynamic customer-facing screen support', 'Improved offline cashier queue reliability']],
                ],
                'delivery_url' => 'https://github.com/kyysolutions/ecommerce-pos-terminal-private',
            ],
            [
                'title' => 'Fintech Mobile Banking App Template',
                'slug' => 'fintech-mobile-banking-app',
                'category_id' => $categoryModels['mobileApps']->id,
                'badge' => 'Popular',
                'price' => 550000,
                'extended_price' => 1350000,
                'version' => 'v3.1.0',
                'demo_url' => 'https://fintech-demo.kyysolutions.com',
                'rating' => 4.90,
                'reviews_count' => 19,
                'sales_count' => 76,
                'short_description' => 'Cross-platform Flutter 3 iOS and Android digital wallet template with biometric FaceID login, transfer animations, transaction cards, and charts.',
                'description' => 'A cutting-edge fintech mobile app template built in Flutter 3. Designed with ultra-smooth 60fps micro-animations, clean Bloc state management, and ready-to-wire API models for transfers, QR payments, bill payments, and card management.',
                'features' => [
                    'Biometric Security (FaceID, TouchID, PIN pad with shuffle numbers)',
                    'Interactive Account Balance Card with Quick Transfer shortcuts',
                    'Real-time Spending Analytics & Categorized Expense Charts',
                    'QR Payment Scanner UI with flashlight and gallery upload',
                    'Virtual Card Flip Animation with CVV hide/show toggle',
                    '60+ Screens across Auth, Home, Transfer, Pay Bills, Cards, and Settings',
                ],
                'tech_stack' => ['Flutter 3.22+', 'Dart 3.4+', 'Bloc Pattern', 'Dio HTTP', 'Figma Assets'],
                'requirements' => [
                    'Flutter SDK >= 3.22.0',
                    'Android Studio / Xcode 15+',
                    'Dart SDK >= 3.4.0',
                ],
                'files_included' => [
                    'Complete Flutter Source Code (iOS & Android)',
                    'Figma 100% Vector Mobile UI Kit',
                    'Postman API Collection for Backend Integration',
                    'Step-by-step App Store & Play Store Build Guide',
                ],
                'changelog' => [
                    ['version' => 'v3.1.0', 'date' => '10 Aug 2026', 'changes' => ['Updated to Flutter 3.22 with Impeller engine optimization', 'Added dark theme support']],
                ],
                'delivery_url' => 'https://github.com/kyysolutions/fintech-flutter-app-private',
            ],
            [
                'title' => 'Enterprise Design System & UI Component Kit',
                'slug' => 'enterprise-design-system-ui-kit',
                'category_id' => $categoryModels['uiKits']->id,
                'badge' => 'Top Rated',
                'price' => 350000,
                'extended_price' => 850000,
                'version' => 'v2.0.1',
                'demo_url' => 'https://ui-kit-demo.kyysolutions.com',
                'rating' => 5.00,
                'reviews_count' => 42,
                'sales_count' => 210,
                'short_description' => '800+ Figma components with auto-layout 5.0, tokens, variables, and matching Tailwind CSS / React component library.',
                'description' => 'A comprehensive design system created for high-growth tech companies. Features scalable color palettes, typography scale, 800+ responsive UI components, interactive states, and pixel-perfect coded React Tailwind components.',
                'features' => [
                    '800+ Atomic Components with Figma Auto-Layout 5.0 & Component Properties',
                    'Figma Variables for Light / Dark Mode & Multi-Brand Themes',
                    'Matching React 19 + Tailwind CSS Component Library (Copy-Paste Ready)',
                    'Data Tables, Charts, Form Controls, Modals, Drawers, and Navigation Sets',
                    'Accessibility (WCAG 2.1 AA) compliant color contrasts',
                ],
                'tech_stack' => ['Figma', 'Tailwind CSS v4', 'React 19', 'TypeScript', 'Storybook'],
                'requirements' => [
                    'Figma Account (Free or Professional)',
                    'Node.js >= 18.0 (for React coded components)',
                ],
                'files_included' => [
                    '.FIG File with 800+ Organized Components & Variables',
                    'React + TypeScript Component Source Code Package',
                    'Tailwind Theme Config File (`tokens.js`)',
                    'Storybook Documentation Site',
                ],
                'changelog' => [
                    ['version' => 'v2.0.1', 'date' => '18 Aug 2026', 'changes' => ['Added Figma Variables for dynamic border radii and color tokens']],
                ],
                'delivery_url' => 'https://drive.google.com/drive/folders/kyysolutions-design-tokens',
            ],
            [
                'title' => 'Modern CRM & Sales Pipeline Management',
                'slug' => 'modern-crm-sales-pipeline',
                'category_id' => $categoryModels['saasSystems']->id,
                'badge' => 'New Release',
                'price' => 590000,
                'extended_price' => 1390000,
                'version' => 'v1.2.0',
                'demo_url' => 'https://crm-demo.kyysolutions.com',
                'rating' => 4.80,
                'reviews_count' => 16,
                'sales_count' => 54,
                'short_description' => 'Kanban lead tracking, automated email cadences, WhatsApp blast API integration, and deal closing analytics.',
                'description' => 'An end-to-end CRM solution designed for B2B sales teams. Features drag-and-drop Kanban pipeline boards, customer interaction history, automated follow-up reminders, and executive revenue forecasting.',
                'features' => [
                    'Drag-and-Drop Kanban Deal Pipeline with custom stages',
                    'WhatsApp Webhook & Cloud API integration for 1-click chatting',
                    'Email Sequences & Automated Meeting Schedule links',
                    'Commission Calculator & Sales Rep Leaderboard',
                ],
                'tech_stack' => ['Laravel 13', 'React', 'Tailwind CSS', 'Pusher WebSockets', 'MySQL'],
                'requirements' => ['PHP >= 8.2', 'Node.js >= 18.0', 'MySQL 8.0+'],
                'files_included' => [
                    'Full CRM Laravel Backend & React Frontend',
                    'WhatsApp Gateway API connector module',
                    'Database Seeder with demo companies and leads',
                ],
                'changelog' => [
                    ['version' => 'v1.2.0', 'date' => '22 Aug 2026', 'changes' => ['Added WhatsApp interactive templates support']],
                ],
                'delivery_url' => 'https://github.com/kyysolutions/modern-crm-private',
            ],
            [
                'title' => 'AI Multi-Model Prompt & Chatbot Engine',
                'slug' => 'ai-prompt-chatbot-engine',
                'category_id' => $categoryModels['plugins']->id,
                'badge' => 'Featured',
                'price' => 490000,
                'extended_price' => 1190000,
                'version' => 'v2.0.0',
                'demo_url' => 'https://ai-demo.kyysolutions.com',
                'rating' => 4.90,
                'reviews_count' => 29,
                'sales_count' => 118,
                'short_description' => 'Multi-LLM wrapper (OpenAI, Claude, Gemini) with document RAG vector indexing, token rate limiting, and chat widgets.',
                'description' => 'A scalable AI orchestration middleware and embeddable chatbot widget. Connect your PDF / Notion documents into Pinecone or ChromaDB vector store and deploy custom AI assistants with token usage quotas.',
                'features' => [
                    'Unified API for OpenAI GPT-4o, Anthropic Claude 3.5, and Google Gemini Pro',
                    'RAG Document Q&A with Vector Embeddings (PDF, DOCX, TXT)',
                    'Embeddable Web Chat Widget with streaming SSE responses',
                    'User Token Quota & Subscription Metering system',
                ],
                'tech_stack' => ['Node.js / Express', 'Python FastAPI', 'React Chat UI', 'Pinecone Vector DB'],
                'requirements' => ['Node.js >= 18.0 or Python >= 3.10', 'API Key (OpenAI / Claude / Gemini)'],
                'files_included' => [
                    'FastAPI / Node.js AI Engine Source Code',
                    'React Streaming Chat Component Library',
                    'Vector Indexing Pipeline Scripts',
                ],
                'changelog' => [
                    ['version' => 'v2.0.0', 'date' => '25 Aug 2026', 'changes' => ['Added Gemini 1.5 Pro support and streaming SSE fixes']],
                ],
                'delivery_url' => 'https://github.com/kyysolutions/ai-multi-model-engine-private',
            ]
        ];

        foreach ($products as $pData) {
            $deliveryUrl = $pData['delivery_url'];
            unset($pData['delivery_url']);

            $pData['store_id'] = $store->id;
            $pData['seller_id'] = $seller->id;
            $pData['status'] = 'published';
            $pData['published_at'] = now();

            $product = Product::updateOrCreate(
                ['slug' => $pData['slug']],
                $pData
            );

            // Create / update delivery link
            ProductLink::updateOrCreate(
                ['product_id' => $product->id, 'type' => 'github'],
                [
                    'url' => $deliveryUrl,
                    'version' => $product->version,
                    'status' => 'active',
                ]
            );

            // Add sample review
            Review::firstOrCreate(
                ['product_id' => $product->id, 'reviewer_name' => 'Aditya F.'],
                [
                    'reviewer_role' => 'CTO at TechNusantara',
                    'rating' => 5,
                    'comment' => 'Source code sangat rapi, arsitekturnya mudah dikembangkan dan dokumentasi sangat jelas. Menghemat waktu development tim kami minimal 3 bulan.',
                    'status' => 'approved',
                ]
            );
        }
    }
}
