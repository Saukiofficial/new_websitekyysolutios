<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class CheckoutController extends Controller
{
    /**
     * Master catalog products reference.
     */
    protected function getProducts(): array
    {
        return [
            1 => [
                'id' => 1,
                'title' => 'SaaS Multi-Tenant Boilerplate Starter',
                'category' => 'SaaS Systems',
                'categoryKey' => 'saasSystems',
                'price' => 650000,
                'priceFormatted' => 'Rp 650.000',
                'license' => 'Regular License',
                'badge' => 'Best Seller',
                'tech' => ['Laravel 13', 'React 19', 'Inertia.js', 'Stripe', 'MySQL'],
                'version' => 'v2.4.0',
                'filesIncluded' => 'Full Source Code, SQL Tenancy Dump, Documentation, Figma Tokens',
            ],
            2 => [
                'id' => 2,
                'title' => 'E-Commerce Admin & Live POS Terminal Kit',
                'category' => 'Source Code',
                'categoryKey' => 'sourceCode',
                'price' => 450000,
                'priceFormatted' => 'Rp 450.000',
                'license' => 'Regular License',
                'badge' => 'Featured',
                'tech' => ['Laravel', 'Vue 3 / React', 'Tailwind CSS', 'Midtrans'],
                'version' => 'v1.8.2',
                'filesIncluded' => 'Laravel POS Backend, React/Vue Dashboard, Thermal Print Module',
            ],
            3 => [
                'id' => 3,
                'title' => 'Fintech Mobile Banking App Template',
                'category' => 'Mobile Apps',
                'categoryKey' => 'mobileApps',
                'price' => 550000,
                'priceFormatted' => 'Rp 550.000',
                'license' => 'Extended License',
                'badge' => 'Popular',
                'tech' => ['Flutter 3', 'Node.js', 'PostgreSQL', 'Firebase'],
                'version' => 'v3.1.0',
                'filesIncluded' => 'Flutter iOS & Android Project, Node.js Backend, Figma UI Kit',
            ],
            4 => [
                'id' => 4,
                'title' => 'Enterprise Design System & UI Component Kit',
                'category' => 'UI Kits',
                'categoryKey' => 'uiKits',
                'price' => 350000,
                'priceFormatted' => 'Rp 350.000',
                'license' => 'Regular License',
                'badge' => 'Top Rated',
                'tech' => ['Figma', 'Tailwind CSS', 'React 19', 'TypeScript'],
                'version' => 'v2.0.1',
                'filesIncluded' => 'Figma 5.0 Auto-Layout, React Tailwind Components, Storybook',
            ],
            5 => [
                'id' => 5,
                'title' => 'Modern CRM & Sales Pipeline Management',
                'category' => 'SaaS Systems',
                'categoryKey' => 'saasSystems',
                'price' => 590000,
                'priceFormatted' => 'Rp 590.000',
                'license' => 'Extended License',
                'badge' => 'New Release',
                'tech' => ['Laravel 13', 'React', 'Tailwind', 'Pusher'],
                'version' => 'v1.2.0',
                'filesIncluded' => 'Full CRM Source Code, Email Automation Engine, WhatsApp Bot API',
            ],
            6 => [
                'id' => 6,
                'title' => 'AI Multi-Model Prompt & Chatbot Engine',
                'category' => 'Plugins & APIs',
                'categoryKey' => 'plugins',
                'price' => 490000,
                'priceFormatted' => 'Rp 490.000',
                'license' => 'Regular License',
                'badge' => 'Featured',
                'tech' => ['Node.js / Python', 'React', 'Vector DB', 'OpenAI'],
                'version' => 'v2.0.0',
                'filesIncluded' => 'FastAPI / Express Engine, React Chat UI, Pinecone Indexer',
            ],
        ];
    }

    /**
     * Display the checkout page for a selected product.
     */
    public function index(Request $request, ?int $id = null): Response
    {
        $products = $this->getProducts();
        $productId = $id ?? (int) $request->query('product_id', 1);
        $product = $products[$productId] ?? $products[1];

        return Inertia::render('Public/Checkout/Index', [
            'product' => $product,
            'productId' => $product['id'],
        ]);
    }

    /**
     * Process checkout order submission.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|integer',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:30',
            'payment_method' => 'required|string',
            'agree_terms' => 'accepted',
        ]);

        $products = $this->getProducts();
        $product = $products[$validated['product_id']] ?? $products[1];
        
        $orderNumber = 'KYY-ORD-' . date('Ymd') . '-' . strtoupper(Str::random(5));

        return redirect()->route('orders.success', ['orderNumber' => $orderNumber])->with([
            'order' => [
                'orderNumber' => $orderNumber,
                'product' => $product,
                'buyer' => [
                    'name' => $validated['name'],
                    'email' => $validated['email'],
                    'phone' => $validated['phone'],
                ],
                'paymentMethod' => $validated['payment_method'],
                'subtotal' => $product['price'],
                'fee' => $validated['payment_method'] === 'qris' ? 0 : 4500,
                'total' => $product['price'] + ($validated['payment_method'] === 'qris' ? 0 : 4500),
                'status' => 'paid',
                'paidAt' => now()->format('d M Y, H:i') . ' WIB',
            ]
        ]);
    }

    /**
     * Display order success & product download access page.
     */
    public function success(Request $request, string $orderNumber): Response
    {
        $products = $this->getProducts();
        $order = session('order') ?? [
            'orderNumber' => $orderNumber,
            'product' => $products[1],
            'buyer' => [
                'name' => 'Customer',
                'email' => 'customer@example.com',
                'phone' => '+62 812-3456-7890',
            ],
            'paymentMethod' => 'qris',
            'subtotal' => 650000,
            'fee' => 0,
            'total' => 650000,
            'status' => 'paid',
            'paidAt' => now()->format('d M Y, H:i') . ' WIB',
        ];

        return Inertia::render('Public/Checkout/Success', [
            'order' => $order,
        ]);
    }
}
