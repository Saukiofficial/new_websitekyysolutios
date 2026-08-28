# KyySolutions — Seller Studio Dashboard Design Specification

**File:** `seller_dashboard_design.md`  
**Project:** KyySolutions  
**Module:** Seller Studio / Seller Dashboard  
**Purpose:** Master UI/UX, layout, component, motion, and implementation specification for AI coding agents.

---

# 1. MASTER OBJECTIVE

Build a **premium, professional, international-quality Seller Studio Dashboard** for KyySolutions.

This dashboard is specifically for:

```text
Seller / Developer / Mitra Developer
```

It is not a buyer dashboard.

It is not a super admin panel.

It is the seller's operational workspace for:

- monitoring sales,
- monitoring net earnings,
- checking withdrawable balance,
- seeing recent software sales,
- tracking software performance,
- uploading new products,
- managing products,
- managing store settings,
- managing withdrawals.

The visual direction must feel like a **modern international SaaS seller portal**, similar in quality to premium merchant dashboards and software marketplaces.

The Seller Studio should communicate:

```text
professional
trustworthy
financially transparent
developer-friendly
modern
premium
easy to operate
growth-oriented
```

---

# 2. OFFICIAL KYY SOLUTIONS LOGO

Use the official KyySolutions logo.

Local project path:

```text
C:\laragon\www\New Kyysolutions\public\images\logo\logo_no_bg.png
```

Browser path:

```text
/images/logo/logo_no_bg.png
```

React / Inertia usage:

```jsx
<img
    src="/images/logo/logo_no_bg.png"
    alt="KyySolutions"
/>
```

Do NOT generate or recreate the logo.

Do NOT use:

```text
fake logo
generated K logo
CSS recreation
Lucide icon as brand
placeholder logo
AI generated symbol
```

Use the official asset only.

---

# 3. PAGE IDENTITY

The dashboard should visually feel like:

```text
KyySolutions Seller Studio
```

Sub-brand text may appear under the logo:

```text
SELLER STUDIO
```

This should be subtle and smaller than the primary brand.

The overall feeling should be:

```text
merchant dashboard
+
developer marketplace portal
+
earnings and product management center
```

---

# 4. GLOBAL DESIGN DIRECTION

Use a bright professional SaaS layout.

Recommended composition:

```text
┌─────────────────────────────────────────────────────────────────────────┐
│ TOP HEADER                                                              │
├──────────────────┬──────────────────────────────────────────────────────┤
│ SELLER SIDEBAR   │                                                      │
│                  │ HERO / OVERVIEW                                      │
│ Store Profile    │                                                      │
│                  │ KPI CARDS                                            │
│ Dashboard        │                                                      │
│ Produk Saya      │ REVENUE CHART               RECENT SALES             │
│ Saldo            │                                                      │
│ Settings         │                                                      │
│                  │                                                      │
│ Revenue Share    │                                                      │
└──────────────────┴──────────────────────────────────────────────────────┘
```

Do not use a dark admin sidebar.

Seller Studio should feel lighter and friendlier than Super Admin.

---

# 5. COLOR SYSTEM

## Primary Blue

```text
#2563EB
```

Use for:

- active navigation,
- primary CTA,
- links,
- charts,
- icons,
- highlights.

Blue scale:

```text
Blue 50   #EFF6FF
Blue 100  #DBEAFE
Blue 200  #BFDBFE
Blue 300  #93C5FD
Blue 400  #60A5FA
Blue 500  #3B82F6
Blue 600  #2563EB
Blue 700  #1D4ED8
Blue 800  #1E40AF
Blue 900  #1E3A8A
```

---

# 6. PAGE COLORS

App background:

```text
#F8FAFC
```

Card:

```text
#FFFFFF
```

Sidebar:

```text
#FFFFFF
```

Primary text:

```text
#0F172A
```

Secondary text:

```text
#475569
```

Muted text:

```text
#94A3B8
```

Border:

```text
#E2E8F0
```

Soft border:

```text
#EDF2F7
```

---

# 7. SEMANTIC COLORS

Success / withdrawable balance:

```text
#10B981
```

Revenue:

```text
#2563EB
```

Product sold:

```text
#7C3AED
```

Rating:

```text
#F59E0B
```

Danger:

```text
#EF4444
```

Info:

```text
#0EA5E9
```

---

# 8. TYPOGRAPHY

Preferred:

```text
Inter
```

Fallback:

```text
Inter,
ui-sans-serif,
system-ui,
-apple-system,
BlinkMacSystemFont,
"Segoe UI",
sans-serif
```

Main page title:

```text
26px–30px
font-weight: 700
line-height: 1.2
```

Section title:

```text
16px
font-weight: 700
```

KPI value:

```text
24px–28px
font-weight: 700
```

Body:

```text
13px–14px
```

Badge:

```text
11px–12px
font-weight: 600
```

---

# 9. BORDER RADIUS

Use:

```text
Header buttons: 10px
Cards: 14px–16px
Inputs: 10px
Sidebar active item: 10px
Hero: 16px
KPI cards: 14px
Badges: 999px
```

---

# 10. SHADOW SYSTEM

Cards:

```css
box-shadow:
0 1px 2px rgba(15,23,42,0.03),
0 8px 24px rgba(15,23,42,0.04);
```

Hero:

```css
box-shadow:
0 8px 32px rgba(37,99,235,0.06);
```

Hover:

```css
box-shadow:
0 12px 30px rgba(15,23,42,0.06);
```

Avoid excessive depth.

---

# 11. GLOBAL LAYOUT

Desktop:

```text
Top Header
+
Left Seller Sidebar
+
Main Content
```

Recommended widths:

```text
Header height: 68px
Sidebar width: 260px
Main content: fluid
```

Desktop content padding:

```text
28px–32px
```

---

# 12. TOP HEADER

Top header should be light and minimal.

Layout:

```text
Logo / Seller Studio                                  Actions / Profile
```

Left:

```text
KyySolutions
SELLER STUDIO
```

Right:

```text
Verified Seller badge
Lihat Marketplace
Notifications
Seller Avatar
Profile menu
```

---

# 13. VERIFIED SELLER BADGE

Text:

```text
Mitra Developer Terverifikasi
```

Style:

```text
background: #ECFDF5
border: 1px solid #A7F3D0
color: #047857
border-radius: 999px
height: 36px
padding: 0 14px
```

Icon:

```text
ShieldCheck
```

---

# 14. MARKETPLACE BUTTON

Text:

```text
Lihat Marketplace
```

Style:

```text
background: #FFFFFF
border: 1px solid #E2E8F0
color: #334155
height: 38px
border-radius: 10px
```

Icon:

```text
Store
```

Hover:

```text
background: #F8FAFC
border-color: #BFDBFE
```

---

# 15. SELLER PROFILE MENU

Profile avatar:

```text
36px × 36px
```

Display:

```text
K
```

or seller initial.

Optional seller info in dropdown:

```text
KyySolutions Official
seller account
```

Menu:

```text
Profil
Pengaturan Toko
Lihat Toko
Keluar
```

---

# 16. LEFT SIDEBAR

Sidebar should be white and elegant.

Width:

```text
250px–270px
```

Border right:

```text
1px solid #E2E8F0
```

Padding:

```text
16px
```

---

# 17. SELLER STORE PROFILE CARD

At the top of sidebar.

Content:

```text
TOKO AKTIF

KyySolutions Official
Mitra Resmi
```

Recommended visual:

```text
[Store Icon / Seller Avatar]
Store Name
Verification status
```

Card:

```text
background: #F8FAFC
border: 1px solid #E2E8F0
border-radius: 14px
padding: 16px
```

---

# 18. STORE PROFILE CARD LABEL

Label:

```text
TOKO AKTIF
```

Style:

```text
font-size: 10px
font-weight: 700
letter-spacing: .06em
color: #94A3B8
```

Store name:

```text
KyySolutions Official
```

Style:

```text
font-size: 15px
font-weight: 700
```

Seller type:

```text
Mitra Resmi
```

Color:

```text
#2563EB
```

---

# 19. SIDEBAR MENU

Required items:

```text
Dashboard
Produk Saya
Saldo & Penarikan
Pengaturan Toko
```

Recommended icons:

```text
Dashboard → LayoutDashboard
Produk Saya → Package
Saldo & Penarikan → WalletCards
Pengaturan Toko → Settings
```

---

# 20. ACTIVE SIDEBAR ITEM

Active:

```text
Dashboard
```

Style:

```text
height: 44px
background: #2563EB
color: #FFFFFF
border-radius: 10px
```

Optional shadow:

```text
0 6px 16px rgba(37,99,235,0.18)
```

Inactive:

```text
color: #475569
```

Hover:

```text
background: #F8FAFC
color: #2563EB
```

---

# 21. REVENUE SHARE CARD

Place at bottom of sidebar.

Content:

```text
Bagi Hasil 90%

Anda menerima 90% dari setiap penjualan software secara instan.
```

Use:

```text
blue soft card
```

Background:

```text
linear-gradient(135deg, #EFF6FF 0%, #F5F8FF 100%);
```

Border:

```text
#BFDBFE
```

Optional graphic:

```text
PieChart / CirclePercent
```

---

# 22. MAIN CONTENT STRUCTURE

Strict order:

```text
1. Hero overview card
2. KPI row
3. Revenue chart + recent sales
4. Future lower widgets if needed
```

Do not place recent sales before KPI.

---

# 23. HERO OVERVIEW CARD

Main hero at top.

Layout:

```text
Left:
Store indicator
Title
Description

Right:
Upload Software CTA
Subtle chart decoration
```

Recommended height:

```text
160px–180px
```

Card:

```text
background: white
border: 1px solid #E2E8F0
border-radius: 16px
```

---

# 24. HERO LABEL

Text:

```text
KyySolutions Official
```

Icon:

```text
Store
```

Color:

```text
#2563EB
```

---

# 25. HERO TITLE

Text:

```text
Ringkasan Penjualan & Pendapatan Mitra
```

Style:

```text
28px
font-weight: 700
color: #0F172A
```

---

# 26. HERO DESCRIPTION

Text:

```text
Pantau performa penjualan software, pendapatan bersih (90%), dan saldo siap tarik Anda.
```

Style:

```text
14px
color: #64748B
```

---

# 27. HERO DECORATIVE ANALYTICS

Right-center background area may have a subtle mini analytics visual.

Examples:

```text
soft bars
thin revenue line
blue gradient glow
```

Opacity:

```text
0.08–0.18
```

Do not reduce text readability.

---

# 28. PRIMARY CTA

Text:

```text
Unggah Software Baru
```

Icon:

```text
CirclePlus
```

Style:

```text
height: 48px
padding: 0 20px
background: #2563EB
color: white
font-weight: 600
border-radius: 12px
```

Optional shadow:

```text
0 8px 20px rgba(37,99,235,0.22)
```

Hover:

```text
#1D4ED8
translateY(-1px)
```

---

# 29. KPI GRID

Use 4 cards.

Desktop:

```text
4 columns
```

Laptop:

```text
2 columns
```

Mobile:

```text
1 column
```

Gap:

```text
16px
```

---

# 30. KPI CARD BASE

Each:

```text
height: 150px–160px
padding: 20px
background: white
border: 1px solid #E8EDF3
border-radius: 14px
```

Layout:

```text
[Icon] Label

Value

Helper / Action
```

---

# 31. KPI 1 — SALDO SIAP TARIK

Label:

```text
Saldo Siap Tarik
```

Value:

```text
Rp 263.250
```

Accent:

```text
Emerald
```

Icon:

```text
WalletCards
```

Action:

```text
Ajukan Penarikan →
```

Value color:

```text
#059669
```

---

# 32. KPI 2 — TOTAL PENDAPATAN

Label:

```text
Total Pendapatan (90%)
```

Value:

```text
Rp 585.000
```

Helper:

```text
Akumulasi bagi hasil bersih
```

Accent:

```text
Blue
```

Icon:

```text
DollarSign / BadgeDollarSign
```

---

# 33. KPI 3 — SOFTWARE TERJUAL

Label:

```text
Software Terjual
```

Value:

```text
1 Unit
```

Trend:

```text
+18% bulan ini
```

Accent:

```text
Purple
```

Icon:

```text
PackageCheck / ShoppingBag
```

Trend color:

```text
#059669
```

---

# 34. KPI 4 — RATING TOKO

Label:

```text
Rating Toko
```

Value:

```text
5.00 / 5.0
```

Helper:

```text
Dari 6 review pembeli
```

Accent:

```text
Amber
```

Icon:

```text
Star
```

---

# 35. KPI ICON CONTAINERS

Size:

```text
48px × 48px
```

Radius:

```text
14px
```

Use soft colored background.

Examples:

```text
Green  → #ECFDF5
Blue   → #EFF6FF
Purple → #F5F3FF
Amber  → #FFFBEB
```

---

# 36. KPI CARD MOTION

On load:

```text
opacity: 0 → 1
translateY: 8px → 0
```

Stagger:

```text
60ms–90ms
```

Duration:

```text
400ms
```

Do not bounce.

---

# 37. LOWER ANALYTICS GRID

Desktop layout:

```text
Revenue Chart: 1.65fr
Recent Sales: 1fr
```

CSS:

```css
grid-template-columns:
minmax(0, 1.65fr)
minmax(360px, 1fr);
gap: 18px;
```

---

# 38. REVENUE CHART CARD

Title:

```text
Pertumbuhan Pendapatan Bulanan
```

Subtitle:

```text
Total pendapatan bersih 6 bulan terakhir
```

Top-right badge:

```text
90% Revenue Share
```

---

# 39. REVENUE SHARE BADGE

Style:

```text
background: #EFF6FF
color: #2563EB
border-radius: 999px
padding: 6px 10px
font-size: 11px
font-weight: 600
```

---

# 40. CHART TYPE

Use a **premium vertical bar chart**.

Data period:

```text
Mar
Apr
Mei
Jun
Jul
Agu
```

Each bar should show:

```text
gross revenue track / capacity
+
seller net revenue fill
```

Recommended visual:

```text
light gray background bar
blue filled foreground bar
```

This reinforces the seller share.

---

# 41. CHART AXIS

Y-axis example:

```text
Rp 0
Rp 200K
Rp 400K
Rp 600K
Rp 800K
```

X-axis:

```text
Mar
Apr
Mei
Jun
Jul
Agu
```

Axis text:

```text
11px–12px
color: #64748B
```

Grid:

```text
horizontal dashed
#EDF2F7
```

---

# 42. BAR CHART COLOR

Seller revenue:

```text
linear-gradient(180deg, #60A5FA 0%, #2563EB 100%)
```

Background capacity:

```text
#F1F5F9
```

Radius:

```text
8px 8px 0 0
```

---

# 43. BAR CHART ANIMATION

On first load:

```text
height 0 → actual height
```

Duration:

```text
650ms–850ms
```

Easing:

```text
cubic-bezier(.22,1,.36,1)
```

Respect:

```text
prefers-reduced-motion
```

---

# 44. REVENUE TOOLTIP

Example:

```text
Agustus 2026

Gross
Rp 650.000

Pendapatan Mitra (90%)
Rp 585.000
```

Style:

```text
white
border: #E2E8F0
radius: 10px
soft shadow
```

---

# 45. RECENT SALES CARD

Title:

```text
Penjualan Terkini
```

Action:

```text
Lihat Semua
```

Use compact clean list.

---

# 46. RECENT SALE ITEM

Example:

```text
[Product Icon]

SaaS Multi-Tenant Boilerplate Starter
KyySolutions Admin • 28 Agu 2026, 07:23

+Rp 585.000
Gross: Rp 650.000
```

---

# 47. RECENT SALE VISUAL HIERARCHY

Product title:

```text
13px–14px
font-weight: 600
```

Metadata:

```text
11px–12px
color: #94A3B8
```

Net earning:

```text
13px–14px
font-weight: 700
color: #059669
```

Gross:

```text
11px
color: #94A3B8
```

---

# 48. RECENT SALES ITEM CARD

Use:

```text
border-top or subtle inner card
```

Recommended:

```text
padding: 14px 0
border-bottom: 1px solid #F1F5F9
```

Optional product icon container:

```text
44px × 44px
border: 1px solid #DBEAFE
background: #F8FBFF
```

---

# 49. EMPTY RECENT SALES

If none:

```text
Belum ada penjualan terbaru.
```

Supporting text:

```text
Penjualan baru akan muncul di sini.
```

Use a soft neutral icon.

---

# 50. FUTURE SELLER MODULES

The design system should allow additional dashboard modules later:

```text
Produk Terlaris
Conversion Rate
Product Views
Review Terbaru
Pending Withdrawals
Saldo History
Store Performance
```

Do not implement them in the base dashboard unless required.

---

# 51. SELLER NAVIGATION EXPANSION

Future sidebar modules may include:

```text
Dashboard
Produk Saya
Pesanan
Saldo & Penarikan
Review
Analitik
Pengaturan Toko
```

The current MVP may remain:

```text
Dashboard
Produk Saya
Saldo & Penarikan
Pengaturan Toko
```

---

# 52. HOVER INTERACTIONS

Cards:

```text
translateY(-2px)
slightly stronger shadow
```

Buttons:

```text
background shift
```

Sidebar:

```text
soft fill
```

Do not animate everything.

---

# 53. LIVE FEEL

The page should feel alive through:

```text
small KPI entrances
bar chart animation
balance number transition
notification pulse
button hover
recent sale arrival highlight
```

Do not use constant moving elements.

---

# 54. BALANCE NUMBER ANIMATION

Optional:

```text
count-up animation
```

Duration:

```text
600ms
```

Only on first load.

Do not run repeatedly.

---

# 55. NEW SALE HIGHLIGHT

When realtime sale arrives:

```text
background: #ECFDF5 → white
opacity 0 → 1
translateY(-4px) → 0
```

Duration:

```text
450ms
```

---

# 56. RESPONSIVE — LARGE DESKTOP >=1440px

Layout:

```text
Sidebar: 260px
KPI: 4 columns
Lower grid: 1.65fr / 1fr
Hero fully horizontal
```

---

# 57. RESPONSIVE — LAPTOP 1024–1439px

Sidebar:

```text
230px–250px
```

KPI:

```text
2 × 2
```

Lower grid:

```text
1.4fr / 1fr
```

Hero remains horizontal.

---

# 58. RESPONSIVE — TABLET 768–1023px

Sidebar:

```text
collapsed or drawer
```

Hero:

```text
stack title and CTA
```

KPI:

```text
2 columns
```

Lower grid:

```text
1 column
```

Order:

```text
Revenue chart
Recent sales
```

---

# 59. RESPONSIVE — MOBILE <768px

Use:

```text
single-column layout
```

Sidebar becomes:

```text
drawer
```

Header:

```text
logo
verified badge simplified
notifications
profile
```

Hero:

```text
title
description
CTA full width
```

KPI:

```text
1 column
```

Chart:

```text
full width
```

Recent sales:

```text
full width
```

---

# 60. MOBILE SELLER PROFILE

Do not show the full seller sidebar profile card permanently.

Move store identity into:

```text
mobile drawer
```

or compact header profile section.

---

# 61. MOBILE CTA

Upload button:

```text
width: 100%
height: 46px
```

Text:

```text
Unggah Software Baru
```

Keep this easy to find.

---

# 62. LOADING STATES

Use skeletons.

Hero:

```text
title skeleton
subtitle skeleton
button skeleton
```

KPI:

```text
4 skeleton cards
```

Chart:

```text
chart skeleton
```

Sales:

```text
3 list item skeletons
```

Do not use plain “Loading...”.

---

# 63. ERROR STATES

Card-level.

Examples:

```text
Data pendapatan gagal dimuat.

[Coba Lagi]
```

and:

```text
Penjualan terkini gagal dimuat.
```

Do not take down the whole page if one module fails.

---

# 64. EMPTY STATES

For chart:

```text
Belum ada data pendapatan untuk periode ini.
```

For sales:

```text
Belum ada penjualan.
```

For products:

```text
Anda belum memiliki software yang dipublikasikan.
```

CTA:

```text
Unggah Software Pertama
```

---

# 65. WITHDRAWAL ACTION

`Ajukan Penarikan` should only be active if:

```text
available balance >= minimum withdrawal
```

If not:

```text
disabled
```

with helper text:

```text
Minimum penarikan belum tercapai.
```

---

# 66. FINANCIAL DATA RULE

Seller financial values must be calculated server-side.

Never trust frontend-calculated:

```text
commission
seller share
available balance
gross revenue
```

These values must come from trusted backend logic.

---

# 67. REVENUE SHARE RULE

Example:

```text
Gross Sale: Rp 650.000
Seller Share: 90%
Seller Net: Rp 585.000
Platform Fee: Rp 65.000
```

The dashboard must remain mathematically consistent.

---

# 68. SELLER BALANCE STATES

Support:

```text
Pending Balance
Available Balance
Withdrawn
```

The dashboard KPI specifically displays:

```text
Saldo Siap Tarik
```

which maps to:

```text
available balance
```

---

# 69. SELLER AUTHORIZATION

Only authenticated sellers can access:

```text
/seller/*
```

Seller may only view:

```text
their own store
their own products
their own sales
their own balance
their own withdrawals
their own reviews
```

Enforce server-side authorization.

---

# 70. SECURITY

Do not expose:

```text
other seller balances
buyer personal data
payment tokens
raw payment credentials
private product delivery URLs
admin-only financial data
```

---

# 71. PAGE COMPONENT SYSTEM

Recommended:

```text
SellerLayout
SellerHeader
SellerSidebar
SellerStoreCard
SellerNavItem
RevenueShareCard
SellerHero
PrimarySellerAction
SellerKpiCard
SellerRevenueChart
RecentSalesCard
RecentSaleItem
VerifiedSellerBadge
MarketplaceButton
SkeletonCard
EmptyState
ErrorState
```

---

# 72. COMPONENT TREE

```text
SellerDashboardPage
│
├── SellerLayout
│   ├── SellerHeader
│   │   ├── BrandLogo
│   │   ├── VerifiedSellerBadge
│   │   ├── MarketplaceButton
│   │   ├── NotificationButton
│   │   └── SellerProfileMenu
│   │
│   ├── SellerSidebar
│   │   ├── SellerStoreCard
│   │   ├── SellerNavigation
│   │   │   ├── Dashboard
│   │   │   ├── ProdukSaya
│   │   │   ├── SaldoPenarikan
│   │   │   └── PengaturanToko
│   │   └── RevenueShareCard
│   │
│   └── MainContent
│       ├── SellerHero
│       ├── SellerKpiGrid
│       │   ├── AvailableBalanceCard
│       │   ├── TotalRevenueCard
│       │   ├── SoldSoftwareCard
│       │   └── StoreRatingCard
│       └── SellerAnalyticsGrid
│           ├── RevenueGrowthCard
│           │   └── RevenueBarChart
│           └── RecentSalesCard
│               └── RecentSaleItem × N
```

---

# 73. ICON SYSTEM

Use:

```text
Lucide React
```

Recommended icons:

```text
LayoutDashboard
Package
WalletCards
Settings
Store
ShieldCheck
CirclePlus
DollarSign
ShoppingBag
Star
ChartNoAxesColumnIncreasing
ArrowUpRight
Bell
ChevronDown
LogOut
CirclePercent
ReceiptText
```

Do not use emojis.

Do not mix icon libraries.

---

# 74. ACCESSIBILITY

Must support:

```text
keyboard navigation
visible focus states
semantic buttons
proper headings
aria-label for icon buttons
accessible chart summary
color + textual status
```

Financial data must not rely only on color.

---

# 75. FOCUS STATES

Use:

```css
box-shadow:
0 0 0 3px rgba(37,99,235,0.14);
```

for:

```text
CTA
sidebar items
profile actions
withdrawal link/button
marketplace button
```

---

# 76. SELLER DASHBOARD URL

Recommended:

```text
/seller/dashboard
```

Product management:

```text
/seller/products
```

Balance:

```text
/seller/wallet
```

or:

```text
/seller/withdrawals
```

Store settings:

```text
/seller/store/settings
```

---

# 77. USER LANGUAGE

Use Bahasa Indonesia.

Recommended labels:

```text
Ringkasan Penjualan & Pendapatan Mitra
Saldo Siap Tarik
Total Pendapatan (90%)
Software Terjual
Rating Toko
Pertumbuhan Pendapatan Bulanan
Penjualan Terkini
Unggah Software Baru
Ajukan Penarikan
Lihat Semua
```

---

# 78. DATE FORMAT

Use:

```text
28 Agu 2026, 07:23
```

or:

```text
28 Agustus 2026
```

Keep date formatting consistent.

---

# 79. RUPIAH FORMAT

Use:

```text
Rp 585.000
Rp 263.250
Rp 650.000
```

Do not use:

```text
IDR 585000
Rp585,000
```

---

# 80. DESIGN QUALITY RULES

The Seller Studio must NOT look like:

```text
a generic marketplace seller page
a WordPress seller plugin
an admin template
a crypto finance dashboard
an accounting ERP
a plain white CRUD screen
```

It should feel specifically designed for software developers selling digital products.

---

# 81. SELLER EXPERIENCE PRIORITY

The seller should understand within seconds:

```text
berapa saldo siap tarik?
berapa total pendapatan?
berapa software terjual?
bagaimana rating toko?
apakah pendapatan tumbuh?
apa penjualan terbaru?
bagaimana unggah produk baru?
```

The visual hierarchy must answer those questions quickly.

---

# 82. STORE TRUST SIGNAL

The seller's verified status should be visible but not excessive.

Use:

```text
Mitra Developer Terverifikasi
Mitra Resmi
```

Do not duplicate verification badges in every card.

---

# 83. HERO DESIGN PRIORITY

Visual priority:

```text
1. Page title
2. Upload Software CTA
3. Store identity
4. Supporting description
5. Decorative analytics
```

Do not let decoration overpower CTA.

---

# 84. CARD DENSITY

Cards should be data-rich but calm.

Do not use excessive whitespace.

Do not overfill every card with secondary metrics.

Each KPI should communicate one primary idea.

---

# 85. CHART DATA EXAMPLE

Example seller net revenue:

```text
Mar: Rp 210.000
Apr: Rp 320.000
Mei: Rp 380.000
Jun: Rp 455.000
Jul: Rp 520.000
Agu: Rp 585.000
```

Gross values:

```text
Mar: Rp 233.000
Apr: Rp 356.000
Mei: Rp 422.000
Jun: Rp 506.000
Jul: Rp 578.000
Agu: Rp 650.000
```

Mock only.

Use dynamic backend data in production.

---

# 86. REALTIME SALES

If supported, seller dashboard may update recent sales in realtime.

Preferred:

```text
Laravel Reverb
WebSocket
Pusher
SSE
```

Fallback:

```text
30–60 second polling
```

Do not poll every second.

---

# 87. NOTIFICATION EXAMPLES

Seller notifications may include:

```text
Produk berhasil terjual
Withdrawal diproses
Produk disetujui admin
Produk ditolak
Review baru diterima
Saldo tersedia
```

---

# 88. FUTURE ANALYTICS

The visual system should be ready for:

```text
Product views
Conversion rate
Traffic source
Top-selling products
Revenue by category
Review analytics
```

Do not add these into MVP unless requested.

---

# 89. ANIMATION PRINCIPLES

Allowed:

```text
KPI entrance
bar chart fill
soft balance count-up
new sale highlight
button hover
sidebar hover
verified badge micro sheen
```

Do not:

```text
continuously float cards
bounce charts
pulse all icons
animate every number every refresh
```

---

# 90. REDUCED MOTION

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

Disable:

```text
bar animations
count-ups
entrance translation
```

Keep state feedback instant.

---

# 91. PERFORMANCE

Avoid:

```text
multiple redundant seller finance requests
rendering large historical sales lists on dashboard
rebuilding charts on unrelated state changes
```

Recommended server response groups:

```text
store
summary
revenue_chart
recent_sales
notifications
```

---

# 92. DASHBOARD DATA RESPONSE

Suggested shape:

```json
{
  "store": {},
  "summary": {
    "available_balance": 263250,
    "net_revenue": 585000,
    "software_sold": 1,
    "rating": 5
  },
  "revenue_chart": [],
  "recent_sales": []
}
```

This is conceptual only.

---

# 93. DO NOT

AI Agent must NOT:

```text
- use the Super Admin dark sidebar
- make Seller Studio look like Buyer Hub
- remove store identity
- remove withdrawable balance
- hide revenue share
- create fake revenue
- calculate seller money only in frontend
- use random commission percentages
- show other seller data
- use fake verification
- use emojis
- mix icon libraries
- use neon gradients
- create giant charts
- make every card full width
- build desktop-only layout
```

---

# 94. FINAL DESKTOP COMPOSITION

Target layout:

```text
┌──────────────────────────────────────────────────────────────────────────┐
│ KyySolutions SELLER STUDIO          [Verified] [Marketplace] 🔔 Avatar │
├─────────────────────┬────────────────────────────────────────────────────┤
│ TOKO AKTIF          │                                                    │
│ KyySolutions        │ ┌────────────────────────────────────────────────┐ │
│ Official            │ │ KyySolutions Official                          │ │
│ Mitra Resmi         │ │ Ringkasan Penjualan & Pendapatan Mitra        │ │
│                     │ │ Pantau performa...       [Unggah Software Baru]│ │
│ Dashboard           │ └────────────────────────────────────────────────┘ │
│ Produk Saya         │                                                    │
│ Saldo & Penarikan   │ [Saldo] [Pendapatan] [Terjual] [Rating]           │
│ Pengaturan Toko     │                                                    │
│                     │ ┌────────────────────────────┬───────────────────┐ │
│                     │ │ Pertumbuhan Pendapatan     │ Penjualan Terkini │ │
│                     │ │                            │                   │ │
│                     │ │ Bar Chart                  │ Product Sale      │ │
│                     │ │ Mar Apr Mei Jun Jul Agu    │ +Rp 585.000       │ │
│                     │ │                            │                   │ │
│                     │ └────────────────────────────┴───────────────────┘ │
│                     │                                                    │
│ ┌─────────────────┐ │                                                    │
│ │ Bagi Hasil 90%  │ │                                                    │
│ │ Anda menerima...│ │                                                    │
│ └─────────────────┘ │                                                    │
└─────────────────────┴────────────────────────────────────────────────────┘
```

---

# 95. FINAL UX EXPECTATION

The page should feel like:

```text
a professional seller command center
```

but lighter and friendlier than Super Admin.

The seller should feel:

```text
I know how much I earned.
I know what I can withdraw.
I can immediately upload a product.
I can see whether sales are growing.
I can trust the revenue calculation.
```

---

# 96. MASTER PROMPT FOR AI CODING AGENT

Use the following prompt:

> Build the KyySolutions Seller Studio Dashboard according to `seller_dashboard_design.md`.
>
> Treat this document as the primary source of truth for Seller Studio layout, visual style, components, motion, and responsive behavior.
>
> Use the official KyySolutions logo from `/images/logo/logo_no_bg.png`. Do not recreate or generate the brand logo.
>
> Create a premium international SaaS seller portal using a bright light theme, white seller sidebar, page background `#F8FAFC`, white cards, primary blue `#2563EB`, emerald financial success accents, restrained purple and amber secondary accents, subtle borders, clean shadows, and Inter typography.
>
> The top header must show KyySolutions Seller Studio branding on the left and on the right a `Mitra Developer Terverifikasi` badge, `Lihat Marketplace` action, notification icon, and seller profile menu.
>
> The left sidebar must contain a store identity card showing `TOKO AKTIF`, `KyySolutions Official`, and `Mitra Resmi`. Below it create navigation items `Dashboard`, `Produk Saya`, `Saldo & Penarikan`, and `Pengaturan Toko`. The Dashboard item is active and uses a premium blue selected state.
>
> At the bottom of the sidebar create a `Bagi Hasil 90%` information card that explains that the seller receives 90% from each software sale.
>
> The main dashboard content must start with a wide hero card. Display `KyySolutions Official`, the heading `Ringkasan Penjualan & Pendapatan Mitra`, and the description `Pantau performa penjualan software, pendapatan bersih (90%), dan saldo siap tarik Anda.`. On the right place the primary CTA `Unggah Software Baru`. Add a very subtle analytics/chart decoration in the hero background without reducing readability.
>
> Below the hero create four KPI cards in this order:
> 1. `Saldo Siap Tarik` with value such as `Rp 263.250` and action `Ajukan Penarikan`,
> 2. `Total Pendapatan (90%)` with value such as `Rp 585.000`,
> 3. `Software Terjual` with value such as `1 Unit` and positive monthly trend,
> 4. `Rating Toko` with value such as `5.00 / 5.0`.
>
> Use a green accent for withdrawable balance, blue for total revenue, purple for sold software, and amber for store rating.
>
> Below the KPI row create a two-column layout approximately `1.65fr / 1fr`.
>
> The left card must be `Pertumbuhan Pendapatan Bulanan` with subtitle `Total pendapatan bersih 6 bulan terakhir`. Create a premium vertical bar chart for `Mar, Apr, Mei, Jun, Jul, Agu`. Use light neutral gross-revenue/background bars with blue seller net-revenue fills. Add a `90% Revenue Share` badge in the chart header. Include Rupiah Y-axis labels and clean horizontal grid lines.
>
> The right card must be `Penjualan Terkini`. Show recent product sales as compact professional rows containing product icon, product title, buyer/date metadata, seller net earning in green, and gross amount as muted secondary text. Include a `Lihat Semua` link in the card header.
>
> Implement restrained animation: KPI cards fade upward on entry, chart bars animate once from zero to value, withdrawal and primary buttons use subtle hover transitions, and newly received sales may briefly highlight. Respect `prefers-reduced-motion`.
>
> Create reusable components such as `SellerLayout`, `SellerHeader`, `SellerSidebar`, `SellerStoreCard`, `RevenueShareCard`, `SellerHero`, `SellerKpiCard`, `SellerRevenueChart`, `RecentSalesCard`, and `RecentSaleItem`.
>
> All financial values must come from trusted backend calculations. Do not calculate commission, gross revenue, net seller earnings, or available balance solely in the frontend.
>
> Enforce seller authorization server-side. Sellers must only access their own store, products, sales, balances, and withdrawals.
>
> Implement loading skeletons, empty states, error states, visible focus states, responsive behavior, accessibility, and coherent Rupiah formatting.
>
> On desktop use a 250–270px light seller sidebar, four KPI columns, and `1.65fr / 1fr` analytics layout. On laptop use a 2×2 KPI grid. On tablet stack the analytics cards and collapse the sidebar. On mobile use a navigation drawer, single-column KPI cards, full-width upload CTA, chart, and recent sales.
>
> Do not use the Super Admin dark navy sidebar, do not convert the page into a Buyer Hub, do not use neon effects, glassmorphism, emojis, random gradients, or generic CRUD styling.
>
> The final result must feel like a premium global SaaS seller dashboard designed specifically for developers selling digital software products through KyySolutions.

---

# 97. IMPLEMENTATION PRIORITY

When requirements conflict:

```text
1. Security
2. Financial correctness
3. Seller ownership rules
4. Business rules
5. seller_dashboard_design.md
6. Approved global design system
7. Motion polish
8. AI assumptions
```

---

# 98. FINAL NOTE FOR AI AGENT

This dashboard is not merely a visual sales report.

It is the seller's daily operational workspace.

Design and implement it so a developer can immediately:

```text
understand earnings
understand available balance
see sales growth
see latest sales
upload another software product
manage their store
```

The final result must look polished enough for a real international software marketplace.

---

**End of `seller_dashboard_design.md`**
