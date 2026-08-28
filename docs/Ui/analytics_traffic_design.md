# KyySolutions — Aktivitas & Analitik Pengunjung Design Specification

**File:** `analytics_traffic_design.md`  
**Project:** KyySolutions  
**Module:** Super Admin → Marketplace → Aktivitas & Traffic  
**Purpose:** Master UI/UX, layout, visual, motion, and implementation specification for AI coding agents.

---

# 1. MASTER OBJECTIVE

Build a **professional, premium, international-quality analytics dashboard page** for:

```text
Super Admin
→ Marketplace
→ Aktivitas & Traffic
```

Page title:

```text
Aktivitas & Analitik Pengunjung
```

The page is used to monitor:

- realtime visitors,
- pageviews,
- buyer intent,
- click-to-buy events,
- conversion funnel,
- visitor devices,
- traffic referrers,
- most-viewed products,
- click-through rate,
- checkout events,
- successful payments,
- realtime visitor activity.

The visual must feel like a **modern SaaS analytics product**, not a generic CRUD dashboard.

The page should look appropriate for:

- production admin operations,
- investor demos,
- client presentations,
- internal monitoring,
- startup growth analytics.

---

# 2. OFFICIAL KYY SOLUTIONS LOGO

Use the official KyySolutions logo file.

Local project path:

```text
C:\laragon\www\New Kyysolutions\public\images\logo\logo_no_bg.png
```

Browser path:

```text
/images/logo/logo_no_bg.png
```

React / Inertia:

```jsx
<img
    src="/images/logo/logo_no_bg.png"
    alt="KyySolutions"
/>
```

Do NOT generate or recreate a logo.

Do NOT use:

```text
fake K logo
placeholder brand mark
CSS logo
AI-generated logo
Lucide icon as the KyySolutions logo
```

---

# 3. VISUAL DIRECTION

Target quality:

```text
Professional International SaaS
+
Enterprise Analytics
+
Marketplace Operations
+
Realtime Monitoring
```

Design feeling:

```text
clean
alive
dynamic
premium
trustworthy
high information clarity
high operational value
modern
minimal but not empty
```

Do not make it:

```text
overly futuristic
gaming-like
crypto-like
glassmorphism-heavy
neon
over-saturated
flat generic CRUD
old ERP
```

---

# 4. GLOBAL COLOR SYSTEM

## Primary

```text
Primary Blue: #2563EB
```

Scale:

```text
Blue 50  #EFF6FF
Blue 100 #DBEAFE
Blue 200 #BFDBFE
Blue 300 #93C5FD
Blue 400 #60A5FA
Blue 500 #3B82F6
Blue 600 #2563EB
Blue 700 #1D4ED8
Blue 800 #1E40AF
Blue 900 #1E3A8A
```

---

# 5. SIDEBAR COLORS

Background:

```text
#06152E
```

Recommended gradient:

```css
background:
linear-gradient(
    180deg,
    #06152E 0%,
    #071A38 55%,
    #041126 100%
);
```

Sidebar text:

```text
#D8E2F1
```

Muted sidebar text:

```text
#8496B2
```

Active menu:

```text
#2563EB
```

Active gradient optional:

```css
linear-gradient(90deg, #2563EB 0%, #1D4ED8 100%);
```

Hover:

```text
rgba(37,99,235,0.14)
```

---

# 6. MAIN APPLICATION COLORS

Page background:

```text
#F8FAFC
```

Card background:

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

Card border:

```text
#E2E8F0
```

Soft inner border:

```text
#EEF2F7
```

---

# 7. SEMANTIC DATA COLORS

Use colors intentionally by data role.

Primary analytics blue:

```text
#2563EB
```

Purple interaction:

```text
#7C3AED
```

Cyan / cart intent:

```text
#06B6D4
```

Emerald / conversion:

```text
#10B981
```

Amber / checkout:

```text
#F59E0B
```

Danger:

```text
#EF4444
```

Do not randomly swap semantic colors between cards.

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

Page title:

```text
24px
font-weight: 700
line-height: 32px
```

Section title:

```text
15px–16px
font-weight: 600–700
```

Card metric:

```text
24px
font-weight: 700
```

KPI label:

```text
11px–12px
font-weight: 600
letter-spacing: 0.02em
text-transform: uppercase where appropriate
```

Body:

```text
13px–14px
```

Table:

```text
12px–13px
```

---

# 9. GLOBAL LAYOUT

Desktop structure:

```text
┌────────────────┬──────────────────────────────────────────────────────────┐
│                │ HEADER                                                   │
│   SIDEBAR      ├──────────────────────────────────────────────────────────┤
│                │                                                          │
│                │ PAGE CONTENT                                             │
│                │                                                          │
│                │ HERO / STATUS                                            │
│                │ KPI                                                      │
│                │ FUNNEL + DEVICE                                          │
│                │ PRODUCTS TABLE + LIVE FEED                               │
│                │                                                          │
└────────────────┴──────────────────────────────────────────────────────────┘
```

Sidebar:

```text
240px
```

Collapsed:

```text
72px
```

Header:

```text
72px
```

Content padding desktop:

```text
20px 24px 28px
```

Main gap:

```text
16px
```

---

# 10. PAGE MAX WIDTH

Use fluid dashboard width.

Recommended:

```text
max-width: none
```

or optionally:

```text
max-width: 1720px
margin: 0 auto
```

Do not constrain analytics to a narrow blog-like width.

---

# 11. SIDEBAR STRUCTURE

Use existing Super Admin sidebar.

Navigation order:

```text
MENU UTAMA
Dashboard

MANAJEMEN
Users
Seller
Produk
Kategori

TRANSAKSI
Order
Pembayaran
Komisi
Withdrawal

MARKETPLACE
Aktivitas & Traffic
Review
Laporan

BUSINESS
Services
Portfolio
Blog / CMS

SYSTEM
Notifikasi
Pengaturan
```

Active page:

```text
Aktivitas & Traffic
```

---

# 12. ACTIVE MENU STYLE

```text
height: 42px
border-radius: 8px
background: #2563EB
color: #FFFFFF
```

Optional glow:

```css
box-shadow:
0 6px 16px rgba(37,99,235,0.22);
```

Do not use neon glow.

---

# 13. HEADER LAYOUT

Desktop:

```text
┌───────────────────────────────────────────────────────────────────────────┐
│ [☰]  Aktivitas & Analitik Pengunjung       Search        🔔  Super Admin │
│      Marketplace > Aktivitas & Traffic                               ▼   │
└───────────────────────────────────────────────────────────────────────────┘
```

Left:

```text
sidebar toggle
page title
breadcrumb
```

Center-right:

```text
global search
```

Right:

```text
notification
profile dropdown
```

---

# 14. GLOBAL SEARCH

Placeholder:

```text
Cari sesuatu (order, seller, produk)...
```

Desktop width:

```text
330px–380px
```

Height:

```text
40px
```

Border:

```text
#E2E8F0
```

Radius:

```text
10px
```

---

# 15. MAIN CONTENT ORDER

The page must strictly follow this hierarchy:

```text
1. Page summary / live status strip
2. KPI row
3. Funnel conversion + visitor device analytics
4. Top product interaction table + realtime activity stream
```

Do not move the realtime feed above KPI cards.

Do not move the product table above the funnel.

---

# 16. HERO SUMMARY STRIP

Position:

```text
Immediately under the header.
```

Layout:

```text
┌──────────────────────────────────────────────────────────────┐
│ Aktivitas Pengunjung & Performa Konversi      LIVE STATUS   │
│ Pantau data trafik realtime...                mini sparkline │
└──────────────────────────────────────────────────────────────┘
```

Height:

```text
68px–76px
```

Padding:

```text
16px
```

Border radius:

```text
12px
```

---

# 17. HERO TITLE

Text:

```text
Aktivitas Pengunjung & Performa Konversi
```

Subtitle:

```text
Pantau data trafik realtime, interaksi klik tombol beli,
dan funnel konversi pembeli.
```

Title:

```text
15px–16px
font-weight: 700
```

Subtitle:

```text
12px–13px
color: #64748B
```

---

# 18. LIVE VISITOR BADGE

Right side:

```text
● 12 Pengunjung Aktif Online
```

Background:

```text
#ECFDF5
```

Border:

```text
#A7F3D0
```

Text:

```text
#047857
```

Status dot:

```text
#10B981
```

The dot should visually pulse.

CSS example:

```css
@keyframes livePulse {
  0%   { transform: scale(1); opacity: 1; }
  50%  { transform: scale(1.5); opacity: .45; }
  100% { transform: scale(1); opacity: 1; }
}
```

Duration:

```text
1.8s–2.2s
```

---

# 19. LIVE SPARKLINE

Place right of the badge when desktop space allows.

Use:

```text
small smooth emerald line
```

Recommended:

```text
width: 130px
height: 34px
```

No visible axes.

Animate line entrance only.

---

# 20. KPI GRID

Four KPI cards.

Desktop >=1280px:

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

Grid gap:

```text
14px–16px
```

---

# 21. KPI CARD BASE DESIGN

Each card:

```text
height: 108px–118px
padding: 18px
border: 1px solid #E8EDF3
border-radius: 12px
background: #FFFFFF
```

Card layout:

```text
┌─────────────────────────────────────┐
│ [ICON] LABEL                SPARK   │
│        VALUE                        │
│        DESCRIPTION / TREND          │
└─────────────────────────────────────┘
```

Use subtle hover:

```text
translateY(-2px)
shadow increase
```

Duration:

```text
180ms
```

---

# 22. KPI 1 — PAGEVIEWS

Label:

```text
PAGEVIEWS (HARI INI)
```

Metric:

```text
14
```

Trend:

```text
+24% vs kemarin
```

Icon:

```text
Eye
```

Accent:

```text
Blue
```

Icon background:

```text
#EFF6FF
```

Mini sparkline:

```text
blue
```

---

# 23. KPI 2 — BUY CLICKS

Label:

```text
KLIK "BELI SEKARANG"
```

Metric:

```text
4
```

Description:

```text
Interaksi tombol checkout
```

Icon:

```text
MousePointerClick
```

Accent:

```text
Purple
```

Background:

```text
#F5F3FF
```

Sparkline:

```text
Purple
```

---

# 24. KPI 3 — CUSTOMERS

Label:

```text
TOTAL CUSTOMER TERDAFTAR
```

Metric:

```text
894
```

Trend:

```text
+12 customer baru minggu ini
```

Icon:

```text
UsersRound
```

Accent:

```text
Teal
```

---

# 25. KPI 4 — CONVERSION

Label:

```text
TINGKAT KONVERSI (CR)
```

Metric:

```text
8.4%
```

Description:

```text
Dari pengunjung menjadi pembeli
```

Icon:

```text
TrendingUp
```

Accent:

```text
Emerald
```

---

# 26. KPI MICRO ANIMATION

On first load:

```text
opacity 0 → 1
translateY 6px → 0
```

Stagger:

```text
50ms–80ms between cards
```

Total duration:

```text
350ms–500ms
```

Do not use bouncing animation.

---

# 27. MAIN ANALYTICS GRID

Desktop:

```text
Funnel Conversion: 2fr
Device Analytics: 1fr
```

CSS suggestion:

```css
grid-template-columns:
  minmax(0, 2fr)
  minmax(330px, 1fr);
gap: 16px;
```

---

# 28. FUNNEL CARD POSITION

Left side.

Minimum desktop height:

```text
285px–320px
```

Card padding:

```text
18px
```

Title:

```text
Funnel Konversi Pembelian Marketplace
```

Subtitle:

```text
Jalur perjalanan pengunjung dari membuka website hingga menyelesaikan transaksi.
```

Top-right badge:

```text
Conversion: 8.4%
```

---

# 29. CONVERSION BADGE

Style:

```text
background: #EFF6FF
color: #2563EB
border: 1px solid #DBEAFE
border-radius: 7px
font-size: 11px
font-weight: 600
```

---

# 30. FUNNEL MODEL

The funnel has exactly five primary steps:

```text
1. Kunjungan Website (Visitors)
2. Lihat Detail Produk Software
3. Klik "Beli Sekarang" / Keranjang
4. Mulai Proses Checkout
5. Pembayaran Selesai (Lunas)
```

---

# 31. FUNNEL STEP LAYOUT

Each row:

```text
[ICON] Label                       Count     Percentage
       ───────────────────────────────────────────────
       progress bar
```

Height per step:

```text
38px–42px
```

Gap:

```text
8px–10px
```

---

# 32. FUNNEL STEP 1

Color:

```text
#2563EB
```

Icon:

```text
UsersRound
```

Sample:

```text
1482 aksi
100%
```

Progress:

```text
100%
```

---

# 33. FUNNEL STEP 2

Color:

```text
#7C3AED
```

Icon:

```text
Search
```

Sample:

```text
920 aksi
62%
```

Important:
Use realistic counts consistent with the percentage.

Do not show:

```text
7 aksi = 62%
```

if visitor count is 1482.

Data must be mathematically coherent.

---

# 34. FUNNEL STEP 3

Color:

```text
#06B6D4
```

Icon:

```text
ShoppingCart
```

Example:

```text
341 aksi
23%
```

---

# 35. FUNNEL STEP 4

Color:

```text
#F59E0B
```

Icon:

```text
CircleArrowRight
```

Example:

```text
208 aksi
14%
```

---

# 36. FUNNEL STEP 5

Color:

```text
#10B981
```

Icon:

```text
CircleCheck
```

Example:

```text
124 aksi
8.4%
```

---

# 37. FUNNEL BAR DESIGN

Track:

```text
height: 8px
background: #F1F5F9
border-radius: 999px
```

Fill:

```text
height: 8px
border-radius: 999px
```

On mount:

```text
width 0 → actual percentage
```

Duration:

```text
700ms–900ms
```

Easing:

```text
cubic-bezier(.22,1,.36,1)
```

---

# 38. FUNNEL HOVER INTERACTION

Hover a funnel row:

```text
background: #F8FAFC
```

Show optional tooltip:

```text
Tahap:
Klik Beli Sekarang

Jumlah:
341

Drop-off:
579 user

Conversion dari tahap sebelumnya:
37%
```

Do not make tooltip necessary to understand the base data.

---

# 39. DEVICE ANALYTICS CARD

Right side.

Title:

```text
Perangkat Pengunjung
```

Sections:

```text
Device distribution
Referrer source
```

---

# 40. DEVICE DISTRIBUTION

Data:

```text
Desktop (PC/Laptop)   64%
Mobile (Smartphone)   31%
Tablet & Lainnya       5%
```

Icons:

```text
Monitor
Smartphone
Tablet
```

---

# 41. DEVICE BAR COLORS

Desktop:

```text
#2563EB
```

Mobile:

```text
#7C3AED
```

Tablet:

```text
#10B981
```

Track:

```text
#F1F5F9
```

Height:

```text
7px
```

---

# 42. DEVICE ROW LAYOUT

```text
[ICON] Device Name                    64%
       ────────────────────────────────
```

Row spacing:

```text
16px
```

---

# 43. REFERRER BOX

Position:

```text
bottom of device card
```

Background:

```text
#FAFBFD
```

Border:

```text
#EEF2F7
```

Radius:

```text
10px
```

Padding:

```text
14px
```

---

# 44. REFERRER DATA

Use:

```text
Direct        45%
Google        28%
GitHub        18%
Media Sosial   9%
```

Use colored bullets.

---

# 45. REFERRER DONUT

Place right side of referrer box.

Recommended:

```text
88px × 88px
```

Use medium ring thickness.

Colors:

```text
Direct       #2563EB
Google       #7C3AED
GitHub       #10B981
Media Sosial #F59E0B
```

Animate on mount:

```text
0 → actual segments
```

Do not continuously rotate.

---

# 46. LOWER GRID

Desktop:

```text
Top Products: 1.65fr
Realtime Feed: 1fr
```

CSS:

```css
grid-template-columns:
  minmax(0, 1.65fr)
  minmax(360px, 1fr);
gap: 16px;
```

---

# 47. TOP PRODUCTS CARD

Title:

```text
Produk Paling Banyak Dilihat & Diklik
```

Subtitle:

```text
Statistik interaksi tombol dan rasio klik (CTR) per software.
```

---

# 48. PRODUCT TABLE COLUMNS

Use:

```text
SOFTWARE
VIEWS
KLIK BELI
RASIO CTR
```

Column ratio:

```text
Software: 56%
Views:    14%
Klik:     14%
CTR:      16%
```

---

# 49. PRODUCT TABLE ROW

Example:

```text
[icon] E-Commerce Admin & Live POS Terminal Kit
       Source Code

       Views: 780
       Klik: 143
       CTR: 18.3%
```

Use product category as secondary text.

---

# 50. PRODUCT TABLE SAMPLE DATA

```text
E-Commerce Admin & Live POS Terminal Kit
780
143
18.3%

Fintech Mobile Banking App Template
547
141
25.8%

SaaS Multi-Tenant Boilerplate Starter
727
132
18.2%

Modern CRM & Sales Pipeline Management
591
115
19.5%

AI Multi-Model Prompt & Chatbot Engine
570
45
7.9%

Enterprise Design System & UI Component Kit
758
43
5.7%
```

---

# 51. PRODUCT TABLE COLORS

Views:

```text
#334155
```

Buy clicks:

```text
#4F46E5
font-weight: 600
```

CTR:

```text
#059669
font-weight: 600
```

---

# 52. PRODUCT ICONS

Use small category icons:

```text
32px × 32px
```

Background may use semantic soft colors.

Do not use large product images in this analytics table.

---

# 53. TABLE ROW DESIGN

Row height:

```text
52px–58px
```

Border:

```text
1px bottom #F1F5F9
```

Hover:

```text
background: #F8FAFC
```

Hover motion:

```text
none or max translateX(1px)
```

---

# 54. TABLE FOOTER

Center or right:

```text
Lihat semua produk →
```

Color:

```text
#2563EB
```

Font:

```text
12px
font-weight: 600
```

---

# 55. REALTIME STREAM CARD

Title:

```text
Stream Aktivitas Realtime
```

Top-right:

```text
● Live Feed
```

Dot:

```text
#10B981
```

Pulse animation allowed.

---

# 56. REALTIME FEED STRUCTURE

Use a vertical timeline.

```text
●── Melihat Produk
│
●── Melihat Produk
│
●── Mulai Checkout
│
●── Melihat Produk
│
●── Pembayaran Berhasil
```

Timeline line:

```text
#E2E8F0
```

---

# 57. ACTIVITY ITEM STYLE

Each item:

```text
background: #FAFBFD
border: 1px solid #EEF2F7
border-radius: 10px
padding: 11px–12px
```

Hover:

```text
background: #F8FAFC
border-color: #DBEAFE
```

---

# 58. ACTIVITY ITEM 1

Event:

```text
Melihat Produk
```

Product:

```text
Katalog Marketplace
```

Metadata:

```text
Jakarta, ID • Desktop
```

Timestamp:

```text
1 menit lalu
```

Icon:

```text
Eye
```

Color:

```text
Blue
```

---

# 59. ACTIVITY ITEM 2

Event:

```text
Melihat Produk
```

Product:

```text
Modern CRM & Sales Pipeline Management
```

Metadata:

```text
Bali, ID • Desktop • macOS
```

---

# 60. ACTIVITY ITEM 3

Event:

```text
Mulai Checkout
```

Product:

```text
Fintech Mobile Banking App Template
```

Metadata:

```text
Bandung, ID • Mobile • iPhone
```

Icon:

```text
ShoppingCart
```

Color:

```text
Amber
```

---

# 61. ACTIVITY ITEM 4

Event:

```text
Melihat Produk
```

Product:

```text
Modern CRM & Sales Pipeline Management
```

Metadata:

```text
Medan, ID • Mobile • iPhone
```

---

# 62. ACTIVITY ITEM 5

Event:

```text
Pembayaran Berhasil
```

Product:

```text
E-Commerce Admin & Live POS Terminal Kit
```

Metadata:

```text
Surabaya, ID • Desktop
```

Icon:

```text
CircleCheck
```

Color:

```text
Emerald
```

---

# 63. LIVE FEED HEIGHT

Desktop:

```text
360px–390px
```

Use internal scroll when needed.

Scrollbar:

```text
thin
subtle
```

Do not make entire dashboard page height expand infinitely.

---

# 64. NEW ACTIVITY ANIMATION

When a new realtime event appears:

```text
opacity: 0 → 1
translateY: -6px → 0
background highlight: #EFF6FF → normal
```

Duration:

```text
400ms
```

Do not flash aggressively.

---

# 65. LIVE FEED UPDATE BEHAVIOR

Preferred technologies:

```text
WebSocket
Laravel Reverb
Pusher
SSE
```

Fallback:

```text
polling every 10–30 seconds
```

Do not poll every second unless required.

---

# 66. PAGE CARD DESIGN

All main cards:

```text
background: #FFFFFF
border: 1px solid #E6ECF3
border-radius: 12px–14px
```

Shadow:

```css
box-shadow:
0 1px 2px rgba(15,23,42,0.025),
0 6px 18px rgba(15,23,42,0.035);
```

---

# 67. CARD HOVER

Only interactive cards should hover.

Use:

```text
translateY(-1px)
shadow slightly stronger
```

Do not animate static charts when hovered unnecessarily.

---

# 68. SECTION SPACING

Desktop:

```text
Hero → KPI: 14px
KPI → Analytics: 16px
Analytics → Lower grid: 16px
```

Main content bottom:

```text
28px
```

---

# 69. CARD HEADER PATTERN

Use:

```text
Title                               Action/Badge
Subtitle
```

Title:

```text
15px
font-weight: 700
```

Subtitle:

```text
12px
color: #94A3B8
```

---

# 70. CHART TOOLTIP STYLE

All chart tooltips:

```text
background: #FFFFFF
border: 1px solid #E2E8F0
border-radius: 8px
padding: 10px
shadow: subtle
```

Tooltip title:

```text
12px
font-weight: 600
```

Tooltip value:

```text
13px
font-weight: 700
```

---

# 71. ANIMATION SYSTEM

Animation should make the page feel alive without reducing professionalism.

Use animation for:

```text
KPI entrance
sparkline drawing
funnel bars
live status pulse
live feed arrivals
hover transitions
donut entrance
```

Do not animate:

```text
sidebar constantly
all icons constantly
numbers bouncing
large page sections looping
```

---

# 72. MOTION DURATION

Micro interaction:

```text
150ms–220ms
```

Card entrance:

```text
350ms–500ms
```

Chart entrance:

```text
500ms–900ms
```

Realtime highlight:

```text
350ms–500ms
```

---

# 73. MOTION EASING

Recommended:

```text
ease-out
```

or:

```text
cubic-bezier(.22,1,.36,1)
```

---

# 74. REDUCED MOTION

Support:

```css
@media (prefers-reduced-motion: reduce)
```

Disable non-essential animations.

---

# 75. LOADING STATE

Page must have skeleton states.

KPI:

```text
4 skeleton cards
```

Funnel:

```text
5 horizontal skeleton bars
```

Table:

```text
6 row skeleton
```

Live feed:

```text
5 feed item skeleton
```

Do not show a blank page spinner.

---

# 76. EMPTY STATE

Funnel:

```text
Belum ada data konversi untuk periode ini.
```

Products:

```text
Belum ada data interaksi produk.
```

Live feed:

```text
Belum ada aktivitas realtime.
```

Use neutral illustrations/icons.

---

# 77. ERROR STATE

Example:

```text
Data analitik gagal dimuat.

[Coba Lagi]
```

Use inline card-level errors.

Do not replace all content if only one endpoint fails.

---

# 78. TIME RANGE FILTER

Recommended page-level filter:

```text
Hari Ini
7 Hari
30 Hari
90 Hari
Custom
```

Default:

```text
Hari Ini
```

for realtime traffic page.

Optional secondary:

```text
30 Hari
```

for historical conversion.

---

# 79. AUTO REFRESH CONTROL

Optional:

```text
Auto Refresh: On
```

Refresh options:

```text
Realtime
30 detik
1 menit
Off
```

Do not overload page header.

---

# 80. RESPONSIVE — LARGE DESKTOP >=1440px

Sidebar:

```text
240px
```

KPI:

```text
4 columns
```

Analytics:

```text
2fr / 1fr
```

Lower:

```text
1.65fr / 1fr
```

Everything visible without excessive scrolling.

---

# 81. RESPONSIVE — LAPTOP 1200–1439px

Sidebar:

```text
220px–240px
```

KPI:

```text
4 columns if width allows
otherwise 2 × 2
```

Analytics:

```text
1.7fr / 1fr
```

Lower:

```text
1.45fr / 1fr
```

---

# 82. RESPONSIVE — TABLET 768–1199px

Sidebar:

```text
collapsed or drawer
```

KPI:

```text
2 columns
```

Analytics:

```text
1 column
```

Order:

```text
Funnel
Device
Top Products
Realtime Feed
```

---

# 83. RESPONSIVE — MOBILE <768px

Sidebar:

```text
off-canvas drawer
```

Header:

```text
hamburger
page title
notifications
avatar
```

Search:

```text
full-width second row
```

Hero:

```text
stack title and live badge
```

KPI:

```text
1 column
```

or:

```text
2 compact columns >=480px
```

Analytics:

```text
1 column
```

---

# 84. MOBILE FUNNEL

Do not shrink labels until unreadable.

Use:

```text
label on row 1
count + percentage on row 2
progress bar on row 3
```

Each step card-like if needed.

---

# 85. MOBILE PRODUCT TABLE

Do not force a four-column table below 640px.

Transform rows into cards:

```text
Product Name
Category

Views       Klik Beli       CTR
780         143             18.3%
```

---

# 86. MOBILE REALTIME FEED

Full width.

Internal scroll optional.

Metadata may wrap naturally.

---

# 87. ACCESSIBILITY

Must include:

```text
semantic headings
aria-label for icon buttons
accessible tables
visible focus states
keyboard accessible filters
status text beyond color alone
chart legends
screen-reader-friendly summary values
```

---

# 88. ICON SYSTEM

Use one library:

```text
Lucide React
```

Recommended icons:

```text
LayoutDashboard
UsersRound
Store
Package
Tags
ShoppingCart
CreditCard
Percent
Download
Activity
Star
ChartNoAxesCombined
Layers
BriefcaseBusiness
FileText
Bell
Settings
Monitor
Smartphone
Tablet
Eye
MousePointerClick
TrendingUp
CircleCheck
Search
```

Do not mix multiple icon families.

---

# 89. PAGE DATA INTEGRITY

Analytics values must be coherent.

Example:

```text
Visitors: 1482
Product Detail: 920
Buy Clicks: 341
Checkout: 208
Paid: 124
```

Conversion:

```text
124 / 1482 ≈ 8.4%
```

Do not show contradictory numbers.

---

# 90. BUSINESS EVENT DEFINITIONS

Define events consistently:

```text
page_view
product_view
buy_click
cart_add
checkout_started
payment_success
```

Optional:

```text
wishlist_add
search
filter_used
demo_click
```

---

# 91. REALTIME EVENT PAYLOAD

Suggested structure:

```json
{
  "event": "product_view",
  "product_id": 123,
  "product_name": "Laravel POS",
  "user_id": null,
  "session_id": "anonymous-session",
  "device": "desktop",
  "os": "Windows",
  "city": "Jakarta",
  "country": "ID",
  "created_at": "..."
}
```

Do not expose sensitive personal information in the activity stream.

---

# 92. PRIVACY RULE

Realtime visitor analytics should avoid showing:

```text
passwords
emails
full IP addresses
payment details
private tokens
delivery URLs
```

Use coarse location where appropriate.

---

# 93. COMPONENT SYSTEM

Recommended reusable components:

```text
AdminLayout
AdminSidebar
AdminHeader
PageHeader
LiveVisitorsBadge
KpiCard
Sparkline
AnalyticsCard
ConversionFunnel
ConversionStep
DeviceDistribution
ReferrerDonut
TopProductTable
RealtimeActivityFeed
ActivityItem
StatusDot
TimeRangeFilter
SkeletonCard
EmptyState
ErrorState
```

---

# 94. PAGE COMPONENT TREE

```text
TrafficAnalyticsPage
│
├── AdminLayout
│   ├── AdminSidebar
│   └── AdminHeader
│
├── TrafficSummaryStrip
│   ├── SummaryCopy
│   ├── LiveVisitorsBadge
│   └── LiveSparkline
│
├── KpiGrid
│   ├── PageviewsCard
│   ├── BuyClicksCard
│   ├── CustomersCard
│   └── ConversionRateCard
│
├── AnalyticsGrid
│   ├── ConversionFunnelCard
│   │   └── ConversionStep × 5
│   └── VisitorDeviceCard
│       ├── DeviceBar × 3
│       └── ReferrerSummary
│
└── LowerGrid
    ├── TopProductsCard
    │   └── ProductAnalyticsTable
    └── RealtimeFeedCard
        └── ActivityItem × N
```

---

# 95. DATA FETCHING

Prefer:

```text
one optimized page analytics endpoint
```

or grouped server response.

Suggested:

```text
GET /admin/analytics/traffic
```

Response groups:

```text
summary
kpis
funnel
devices
referrers
products
activities
```

Realtime stream may use separate channel.

---

# 96. SERVER-SIDE AUTHORIZATION

Only admin/super admin may access:

```text
/admin/analytics/*
```

Never rely only on frontend route hiding.

---

# 97. PERFORMANCE

Do not:

```text
fetch 10 endpoints simultaneously without reason
re-render all charts every live event
load hundreds of activity rows initially
```

Use:

```text
memoized chart data
paginated products
limited live feed
optimized queries
indexes
```

---

# 98. INITIAL LIVE FEED LIMIT

Recommended:

```text
10–20 events
```

Visible:

```text
5–7 items
```

Older events:

```text
internal scroll
```

---

# 99. DASHBOARD INTERACTION QUALITY

Admin should be able to answer within seconds:

```text
Berapa pengunjung aktif sekarang?
Apakah traffic naik?
Berapa orang klik beli?
Berapa konversi ke pembayaran?
Device apa paling dominan?
Traffic datang dari mana?
Produk apa paling menarik?
Aktivitas apa yang sedang terjadi?
```

---

# 100. DO NOT

AI Agent must NOT:

```text
- redesign the sidebar into a white sidebar
- change KyySolutions primary branding
- create random gradient cards
- use neon effects
- create giant KPI cards
- display funnel as a confusing 3D diagram
- use pie charts for every metric
- use random semantic colors
- show fake live data in production
- expose PII
- expose buyer delivery URLs
- hardcode production analytics values
- make all animations continuous
- build desktop-only layout
- use emoji icons
- mix icon libraries
```

---

# 101. FINAL DESKTOP COMPOSITION

Target:

```text
┌───────────────┬──────────────────────────────────────────────────────────┐
│ KyySolutions  │ ☰ Aktivitas & Analitik Pengunjung     Search   🔔 Admin│
│               ├──────────────────────────────────────────────────────────┤
│ Dashboard     │ ┌──────────────────────────────────────────────────────┐ │
│ Users         │ │ Aktivitas Pengunjung & Performa Konversi      LIVE │ │
│ Seller        │ └──────────────────────────────────────────────────────┘ │
│ Produk        │                                                          │
│ Kategori      │ [Pageviews] [Klik Beli] [Customer] [Conversion]         │
│ Order         │                                                          │
│ Pembayaran    │ ┌──────────────────────────────────┬───────────────────┐ │
│ Komisi        │ │ Funnel Konversi                  │ Perangkat         │ │
│ Withdrawal    │ │                                  │ Pengunjung        │ │
│               │ │ Step 1 ██████████████████████   │ Desktop ████████ │ │
│ Aktivitas     │ │ Step 2 ██████████████           │ Mobile  ████     │ │
│ & Traffic     │ │ Step 3 ███████                  │ Tablet  █        │ │
│               │ │ Step 4 ████                     │                   │ │
│ Review        │ │ Step 5 ██                       │ Referrer Donut    │ │
│ Laporan       │ └──────────────────────────────────┴───────────────────┘ │
│ Services      │                                                          │
│ Portfolio     │ ┌────────────────────────────────────┬─────────────────┐ │
│ Blog / CMS    │ │ Produk Paling Banyak Dilihat      │ Realtime Stream │ │
│ Notifikasi    │ │                                    │ ● View Product  │ │
│ Pengaturan    │ │ Product rows                       │ ● Checkout      │ │
│               │ │                                    │ ● Payment       │ │
│ Super Admin   │ └────────────────────────────────────┴─────────────────┘ │
└───────────────┴──────────────────────────────────────────────────────────┘
```

---

# 102. MASTER PROMPT FOR AI CODING AGENT

Use this prompt:

> Build the KyySolutions Super Admin page `Aktivitas & Analitik Pengunjung` according to `analytics_traffic_design.md`.
>
> Treat this document as the primary visual and interaction source of truth for this page.
>
> Preserve the existing KyySolutions Super Admin layout with a dark navy sidebar, white top header, light gray `#F8FAFC` main background, white analytics cards, primary blue `#2563EB`, subtle borders, premium spacing, and Inter typography.
>
> Use the official KyySolutions logo from `/images/logo/logo_no_bg.png`. Do not generate or recreate the logo.
>
> The page must use the following strict section order:
>
> 1. activity/performance summary strip with a realtime online visitors badge,
> 2. four KPI cards,
> 3. conversion funnel and visitor device/referrer analytics,
> 4. top-product analytics table and realtime activity feed.
>
> Build four KPI cards for `Pageviews Hari Ini`, `Klik Beli Sekarang`, `Total Customer Terdaftar`, and `Tingkat Konversi`. Each card must have a semantic icon, clearly dominant metric, supporting text, and a small sparkline.
>
> Build the central analytics grid using approximately `2fr / 1fr`. The left card is `Funnel Konversi Pembelian Marketplace` with five steps: website visit, product detail, buy/cart click, checkout start, and payment success. Display consistent action counts, percentages, horizontal progress bars, and a conversion badge.
>
> Animate the funnel bars from zero to their actual widths only on initial render or meaningful filter changes. Use restrained 700–900ms motion and respect `prefers-reduced-motion`.
>
> The right analytics card is `Perangkat Pengunjung`, showing Desktop, Mobile, and Tablet distribution with horizontal bars. Add a `Sumber Referrer Utama` summary below it using Direct, Google, GitHub, and Media Sosial plus a compact donut chart.
>
> Build the lower grid using approximately `1.65fr / 1fr`. On the left, create `Produk Paling Banyak Dilihat & Diklik` as a professional analytics table with columns Software, Views, Klik Beli, and Rasio CTR. On the right, create `Stream Aktivitas Realtime` using a vertical timeline/feed layout with event icons, product name, city/device metadata, relative timestamps, and a green live status indicator.
>
> Add tasteful micro-interactions: KPI entrance, sparkline drawing, live-dot pulse, funnel progress animation, donut entrance, subtle row hover, and realtime event insertion highlight. Do not make animations continuous or distracting.
>
> Use reusable React components such as `LiveVisitorsBadge`, `KpiCard`, `Sparkline`, `ConversionFunnel`, `ConversionStep`, `DeviceDistribution`, `ReferrerDonut`, `ProductAnalyticsTable`, `RealtimeActivityFeed`, and `ActivityItem`.
>
> Keep all analytics values backend-ready. Do not permanently hardcode production data. When using mock data for UI development, keep funnel counts mathematically coherent.
>
> Implement loading skeletons, card-level error states, empty states, responsive behavior, keyboard focus states, accessible tables, chart legends, and reduced-motion support.
>
> Desktop >=1440px uses four KPI columns, 2fr/1fr central analytics, and 1.65fr/1fr lower layout. Tablet stacks analytics. Mobile uses an off-canvas sidebar, single-column cards, mobile-friendly funnel rows, and transforms the product table into analytics cards where necessary.
>
> Only authorized admin/super-admin users may access the analytics page. Enforce authorization server-side.
>
> Realtime activity must never expose passwords, email addresses, complete IP addresses, payment credentials, product delivery URLs, tokens, or other sensitive data.
>
> Use one consistent icon library, preferably Lucide React. Do not use emojis.
>
> The final page must look like a premium international SaaS analytics interface and remain clearly part of the existing KyySolutions Super Admin ecosystem.

---

# 103. IMPLEMENTATION PRIORITY

When priorities conflict:

```text
1. Security / privacy
2. Data correctness
3. Business rules
4. Page information architecture
5. analytics_traffic_design.md
6. Global design system
7. Motion polish
8. AI assumptions
```

---

# 104. FINAL EXPECTATION

This page should feel like:

```text
KyySolutions Marketplace Traffic Command Center
```

It should feel alive because the data is alive.

It should not feel alive because the interface is constantly moving.

The visual hierarchy must make realtime traffic and conversion performance immediately understandable while preserving a professional international SaaS aesthetic.

---

**End of `analytics_traffic_design.md`**
