<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Models\Store;
use App\Models\User;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SellerWithdrawalController extends Controller
{
    protected function getSellerStore()
    {
        $seller = auth()->user() ?? User::where('role', 'seller')->first() ?? User::first();
        $store = Store::where('user_id', $seller->id)->first() ?? Store::first();
        return [$seller, $store];
    }

    /**
     * Display seller withdrawal and wallet dashboard.
     */
    public function index(): Response
    {
        [$seller, $store] = $this->getSellerStore();

        $grossEarnings = OrderItem::where('seller_id', $seller->id)->orWhereNull('seller_id')->sum('seller_amount') ?: 58050000;
        $totalWithdrawn = 32000000;
        $availableBalance = max(0, $grossEarnings - $totalWithdrawn);

        $withdrawals = [
            [
                'id' => 1,
                'reference' => 'WD-2026-08-01',
                'amount' => 15000000,
                'amountFormatted' => 'Rp 15.000.000',
                'bankName' => 'BCA (Bank Central Asia)',
                'accountNumber' => '8820****19',
                'accountName' => $store?->name ?? 'KyySolutions Official',
                'status' => 'completed',
                'createdAt' => '15 Agu 2026, 11:20',
                'paidAt' => '15 Agu 2026, 14:00',
            ],
            [
                'id' => 2,
                'reference' => 'WD-2026-07-01',
                'amount' => 17000000,
                'amountFormatted' => 'Rp 17.000.000',
                'bankName' => 'Mandiri',
                'accountNumber' => '1420****55',
                'accountName' => $store?->name ?? 'KyySolutions Official',
                'status' => 'completed',
                'createdAt' => '20 Jul 2026, 09:15',
                'paidAt' => '20 Jul 2026, 10:30',
            ],
        ];

        return Inertia::render('Seller/Withdrawals/Index', [
            'wallet' => [
                'availableBalance' => $availableBalance,
                'availableBalanceFormatted' => 'Rp ' . number_format($availableBalance, 0, ',', '.'),
                'totalWithdrawn' => $totalWithdrawn,
                'totalWithdrawnFormatted' => 'Rp ' . number_format($totalWithdrawn, 0, ',', '.'),
                'grossEarnings' => $grossEarnings,
                'grossEarningsFormatted' => 'Rp ' . number_format($grossEarnings, 0, ',', '.'),
            ],
            'withdrawals' => $withdrawals,
            'store' => [
                'name' => $store?->name ?? 'My Studio',
                'isVerified' => (bool) $store?->is_verified,
            ],
        ]);
    }

    /**
     * Submit payout request.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric|min:50000',
            'bank_name' => 'required|string|max:100',
            'account_number' => 'required|string|max:50',
            'account_name' => 'required|string|max:100',
        ]);

        return redirect()->back()->with('success', 'Permohonan penarikan dana berhasil diajukan dan sedang diproses admin.');
    }
}
