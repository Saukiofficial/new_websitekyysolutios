# 04 — Project Structure

## 1. General Principle

Pisahkan domain berdasarkan tanggung jawab:

- Public
- Buyer
- Seller
- Admin
- Shared

Jangan mencampur business logic ke React component.

## 2. Suggested Laravel Structure

```text
app/
├── Actions/
├── Http/
│   ├── Controllers/
│   ├── Middleware/
│   └── Requests/
├── Models/
├── Services/
├── Policies/
├── Enums/
└── Support/

resources/js/
├── Components/
├── Layouts/
│   ├── PublicLayout
│   ├── BuyerLayout
│   ├── SellerLayout
│   └── AdminLayout
├── Pages/
│   ├── Public/
│   ├── Buyer/
│   ├── Seller/
│   └── Admin/
├── Hooks/
├── Lib/
└── Types/

routes/
├── web.php
├── buyer.php
├── seller.php
└── admin.php
```

Struktur aktual dapat menyesuaikan kebutuhan Laravel/Inertia, tetapi pemisahan domain harus dipertahankan.

## 3. Business Logic

Business logic penting seperti:
- checkout,
- payment verification,
- commission,
- seller balance,
- withdrawal,
- product access

harus berada di server-side/domain layer, bukan hanya frontend.

## 4. Security

- authorization server-side,
- policies/gates,
- validation via Form Request,
- signed/controlled access where applicable,
- never trust client-side price,
- never trust client-submitted payment status.

## 5. Database

Database migration adalah source of truth untuk struktur database. Dokumentasi schema harus diperbarui ketika struktur berubah.
