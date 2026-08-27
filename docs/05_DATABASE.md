# 05 — Database Concept

## Core Entities

### Users
Semua akun platform.

### Stores
Storefront seller.

### Products
Produk digital yang dijual.

### Categories
Kategori marketplace.

### Product Media
Thumbnail/gallery/preview.

### Product Links
Delivery link eksternal yang dikelola secara aman.

### Orders
Header transaksi buyer.

### Order Items
Detail produk yang dibeli.

### Payments
Data pembayaran dan status payment gateway.

### Product Access
Hak akses buyer terhadap produk yang dibeli.

### Reviews
Review buyer.

### Wishlists
Produk favorit buyer.

### Commissions
Catatan komisi platform.

### Seller Balances
Saldo seller.

### Withdrawals
Pengajuan pencairan seller.

### Services Requests
Request jasa custom.

### Portfolio
Portfolio KyySolutions.

### Notifications
Notifikasi sistem.

### Reports
Pelaporan produk/seller/review jika diperlukan.

## Important Relationship

```text
User
 ├── Store
 │    └── Product
 │         └── Product Link
 │
 ├── Order
 │    └── Order Item
 │         └── Product
 │
 ├── Product Access
 ├── Review
 └── Wishlist

Order
 └── Payment

Order Item
 └── Commission

Seller
 └── Balance
      └── Withdrawal
```
