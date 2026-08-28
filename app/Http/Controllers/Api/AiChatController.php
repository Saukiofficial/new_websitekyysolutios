<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Throwable;

class AiChatController extends Controller
{
    /**
     * Handle AI Assistant Chat Request.
     */
    public function chat(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'messages' => 'required|array|min:1',
            'messages.*.role' => 'required|string|in:user,assistant,system',
            'messages.*.content' => 'required|string|max:4000',
        ]);

        $endpoint = rtrim(env('AI_API_ENDPOINT', 'http://49.0.27.201:20128/v1'), '/');
        $apiKey = env('AI_API_KEY', 'sk-6494554c287d44da-i6n7wb-0d432b63');
        $model = env('AI_MODEL', 'kyysolutions');

        // Dynamically compile active product catalog context from MySQL
        $productsContext = "";
        try {
            $products = Product::with('category')->where('status', 'active')->limit(10)->get();
            if ($products->isNotEmpty()) {
                $productsContext = "Katalog Produk Unggulan KyySolutions Saat Ini:\n";
                foreach ($products as $p) {
                    $cat = $p->category?->name ?? 'Software';
                    $productsContext .= "- {$p->title} ({$cat}) — Rp " . number_format($p->price, 0, ',', '.') . "\n";
                }
            }
        } catch (Throwable $e) {
            // Gracefully ignore database error
        }

        $systemPrompt = "Kamu adalah \"Asisten KyySolutions\", asisten virtual AI resmi dan cerdas dari platform KyySolutions (Digital Software Marketplace & Tech Engineering Studio Indonesia).\n\n"
            . "🎯 Profil Pendiri & Kepemilikan (Founder & Owner):\n"
            . "• Pendiri / Owner: Sauki Annaim\n"
            . "• Latar Belakang: Seorang programmer muda berbakat dan software engineer independen asal Sumenep, Madura, Jawa Timur, Indonesia.\n"
            . "• Pengembangan: Platform KyySolutions dan produk-produk teknologi di dalamnya dirancang, dibangun, dan dikembangkan sendiri secara mandiri oleh Sauki Annaim dengan standar arsitektur modern kelas dunia.\n\n"
            . "🌐 Pengetahuan Lengkap Platform KyySolutions:\n"
            . "1. Identitas & Visi: KyySolutions adalah ekosistem digital terpadu yang menyediakan produk digital siap pakai (source code, SaaS template, aplikasi mobile, POS system) dan layanan pembuatan software kustom untuk UMKM, startup, maupun korporat.\n"
            . "2. Lokasi Basis: Sumenep, Madura, Jawa Timur, Indonesia.\n"
            . "3. Pengiriman Produk: Instan & otomatis setelah pembayaran via link Google Drive resmi, repositori GitHub, serta download langsung file ZIP di Buyer Hub (/dashboard/my-products).\n"
            . "4. Lisensi & Dokumen: Pembeli mendapatkan Hak Lisensi Komersial (Purchase Code resmi) dan Invoice PDF digital yang dapat diunduh langsung.\n"
            . "5. Metode Pembayaran: Terintegrasi dengan Midtrans Gateway (QRIS instan bebas biaya admin, Virtual Account BCA/Mandiri/BNI/BRI, E-Wallet GoPay/ShopeePay, dan Kartu Kredit).\n"
            . "6. Jasa Custom Development: Pembuatan Website Kustom, Aplikasi Mobile (iOS/Android Flutter/React Native), Sistem SaaS Multi-Tenant, Desain UI/UX Figma, dan Maintenance Server. Pengguna bisa langsung berkonsultasi via Form Konsultasi Proyek atau WhatsApp Admin di +62 812-3291-6758.\n\n"
            . "💬 Gaya Komunikasi & Persona:\n"
            . "- Ramah, sopan, antusias, bersahabat, dan profesional dalam Bahasa Indonesia.\n"
            . "- PENTING: Jangan gunakan tanda bintang atau asteris (seperti **teks** atau *teks*). Tuliskan seluruh respon dalam teks biasa yang bersih, mengalir alami, dan rapi.\n"
            . "- Gunakan poin-poin sederhana dan emoji secukupnya agar nyaman dibaca.\n"
            . "- Jika ada yang bertanya siapa owner/pembuat/pendiri KyySolutions, jelaskan bahwa KyySolutions didirikan dan dikembangkan sendiri oleh Sauki Annaim, seorang programmer muda asal Sumenep.\n\n"
            . $productsContext;

        $formattedMessages = [
            ['role' => 'system', 'content' => $systemPrompt],
        ];

        // Append recent conversation messages (up to 8 messages for context memory)
        $recentMessages = array_slice($validated['messages'], -8);
        foreach ($recentMessages as $msg) {
            $formattedMessages[] = [
                'role' => $msg['role'],
                'content' => $msg['content'],
            ];
        }

        try {
            $response = Http::withHeaders([
                'Authorization' => "Bearer {$apiKey}",
                'Content-Type' => 'application/json',
            ])->timeout(30)->post("{$endpoint}/chat/completions", [
                'model' => $model,
                'messages' => $formattedMessages,
                'temperature' => 0.7,
                'max_tokens' => 800,
            ]);

            if ($response->successful()) {
                $data = $response->json();
                $reply = $data['choices'][0]['message']['content'] ?? 'Maaf, saya tidak dapat memproses jawaban saat ini.';

                return response()->json([
                    'status' => 'success',
                    'reply' => trim($reply),
                ]);
            }

            Log::error('AI Endpoint Error', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);

            return response()->json([
                'status' => 'error',
                'reply' => 'Maaf, server Asisten KyySolutions sedang sibuk. Silakan coba sesaat lagi atau hubungi WhatsApp resmi kami.',
            ], 500);

        } catch (Throwable $e) {
            Log::error('AI Chat Exception: ' . $e->getMessage());

            return response()->json([
                'status' => 'error',
                'reply' => 'Terjadi kendala koneksi ke server AI. Anda tetap dapat berkonsultasi langsung dengan tim kami via WhatsApp resmi KyySolutions.',
            ], 500);
        }
    }
}
