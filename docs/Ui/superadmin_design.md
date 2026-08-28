# KyySolutions — Super Admin Panel Design Specification

**File:** `superadmin_design.md`  
**Project:** KyySolutions  
**Module:** Super Admin Panel  
**Purpose:** Master UI/UX prompt and implementation specification for AI coding/design agents.

---

# 1. MASTER INSTRUCTION FOR AI AGENT

Build a **high-fidelity, modern, professional Super Admin Panel** for **KyySolutions**, a digital technology startup that operates three connected business areas:

1. **Digital Technology Services**
   - Website Development
   - Web Application Development
   - Mobile Application Development
   - Custom Software
   - UI/UX Design
   - API Development
   - Integration
   - Maintenance
   - Consultation

2. **Digital Products**
   - Source Code
   - Website Templates
   - UI Kits
   - Plugins
   - Mobile App Source Code
   - SaaS Starter Kits
   - Digital Assets

3. **Multi-vendor Marketplace**
   - Buyers
   - Sellers / Developers
   - Products
   - Orders
   - Payments
   - Commissions
   - Seller Earnings
   - Withdrawals
   - Product Moderation

The Super Admin Panel must look like a **premium SaaS dashboard**, not like a generic CRUD admin template.

The visual experience should communicate:

- trustworthy,
- premium,
- modern,
- technology-focused,
- operational,
- clean,
- data-driven,
- scalable startup platform.

Do not create an overly colorful, childish, gaming-style, glassmorphism-heavy, or visually noisy interface.

The dashboard should prioritize **clarity, hierarchy, operations, financial monitoring, marketplace moderation, and actionable data**.

---

# 2. GLOBAL DESIGN DIRECTION

Use a clean SaaS-style layout:

```text
┌───────────────────────────────────────────────────────────────┐
│ SIDEBAR │                    TOP HEADER                       │
│         ├─────────────────────────────────────────────────────┤
│         │                                                     │
│         │                 MAIN DASHBOARD                      │
│         │                                                     │
│         │ KPI CARDS                                           │
│         │                                                     │
│         │ ANALYTICS / CHARTS                                  │
│         │                                                     │
│         │ TABLES / APPROVALS / ACTIVITY                       │
│         │                                                     │
└───────────────────────────────────────────────────────────────┘
```

The layout must use:

- dark navy sidebar,
- light main background,
- white cards,
- subtle borders,
- subtle shadows,
- rounded corners,
- modern sans-serif typography,
- restrained accent colors,
- strong spacing consistency.

---

# 3. DESIGN TOKENS

## 3.1 Primary Brand Color

Primary Blue:

```text
#2563EB
```

Recommended scale:

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

Use `#2563EB` as the main action color.

---

## 3.2 Sidebar Colors

Sidebar background:

```text
#06152E
```

Optional subtle gradient:

```text
linear-gradient(
  180deg,
  #06152E 0%,
  #071A38 55%,
  #041126 100%
)
```

Sidebar active item:

```text
#1557C8
```

or:

```text
linear-gradient(
  90deg,
  #1D4ED8,
  #1557C8
)
```

Sidebar default text:

```text
#D8E2F1
```

Sidebar muted text:

```text
#8496B2
```

Sidebar hover:

```text
rgba(37, 99, 235, 0.14)
```

Sidebar separators:

```text
rgba(255,255,255,0.06)
```

---

# 4. MAIN PAGE COLORS

Page background:

```text
#F7F9FC
```

Alternative:

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

Border:

```text
#E2E8F0
```

Soft border:

```text
#EEF2F7
```

---

# 5. SEMANTIC COLORS

Success:

```text
#22C55E
```

Success background:

```text
#DCFCE7
```

Warning:

```text
#F59E0B
```

Warning background:

```text
#FEF3C7
```

Danger:

```text
#EF4444
```

Danger background:

```text
#FEE2E2
```

Info:

```text
#0EA5E9
```

Info background:

```text
#E0F2FE
```

Purple accent:

```text
#7C3AED
```

Purple background:

```text
#F3E8FF
```

Teal:

```text
#0D9488
```

Orange:

```text
#F97316
```

---

# 6. TYPOGRAPHY

Preferred font:

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

Typography scale:

### Page Title

```text
font-size: 24px
font-weight: 700
line-height: 32px
color: #0F172A
```

### Section Heading

```text
font-size: 16px
font-weight: 600
line-height: 24px
```

### Card Metric

```text
font-size: 20px–24px
font-weight: 700
```

### Card Label

```text
font-size: 12px–13px
font-weight: 500
color: #64748B
```

### Body

```text
font-size: 14px
line-height: 20px
```

### Table Text

```text
font-size: 12px–13px
```

Do not use excessively large headings.

The dashboard should feel compact, professional, and information-dense without feeling crowded.

---

# 7. BORDER RADIUS

Use consistent rounded corners.

```text
Small controls:       8px
Buttons:             8px–10px
Inputs:              10px
Cards:               12px
Large cards/modals:  14px–16px
Badges:              999px
```

Avoid overly rounded `24px+` cards.

---

# 8. SHADOW SYSTEM

Cards should use subtle shadows only.

Recommended:

```css
box-shadow:
  0 1px 2px rgba(15, 23, 42, 0.03),
  0 4px 14px rgba(15, 23, 42, 0.04);
```

On hover:

```css
box-shadow:
  0 8px 24px rgba(15, 23, 42, 0.07);
```

Do not use dramatic shadows.

---

# 9. MAIN APPLICATION STRUCTURE

Desktop structure:

```text
┌─────────────────────────────────────────────────────────────┐
│ SIDEBAR 240px │ HEADER                                    │
│               ├─────────────────────────────────────────────┤
│               │ MAIN CONTENT                               │
│               │                                             │
│               │ Dashboard                                   │
│               │                                             │
└─────────────────────────────────────────────────────────────┘
```

Desktop sidebar width:

```text
240px
```

Collapsed sidebar:

```text
72px
```

Header height:

```text
72px
```

Main content padding:

```text
20px–24px
```

Maximum content width may remain fluid.

---

# 10. SIDEBAR DESIGN

The left sidebar is a core visual anchor.

## Branding Area

At the top:

```text
[K LOGO] KyySolutions
```

Logo should use KyySolutions blue.

Brand text:

```text
font-size: 18px
font-weight: 700
color: white
```

Logo block height approximately:

```text
72px
```

---

# 11. SIDEBAR MENU STRUCTURE

Use icons from one consistent icon library such as:

- Lucide React
- Heroicons

Do not mix icon styles.

Navigation order:

```text
Dashboard

MANAGEMENT
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

However, section labels may be visually hidden if the interface becomes too tall.

Minimum visible menu:

```text
Dashboard
Users
Seller
Produk
Kategori
Order
Pembayaran
Komisi
Withdrawal
Review
Laporan
Services
Portfolio
Blog / CMS
Notifikasi
Pengaturan
```

---

# 12. SIDEBAR MENU STYLE

Default menu:

```text
height: 42px
padding-left/right: 12px
border-radius: 8px
```

Icon size:

```text
18px–20px
```

Gap between icon and label:

```text
12px
```

Default:

```text
text-color: #D8E2F1
background: transparent
```

Hover:

```text
background: rgba(37,99,235,0.12)
```

Active:

```text
background: #1557C8
color: white
```

Active item may have:

```text
box-shadow: 0 4px 12px rgba(21,87,200,0.25)
```

---

# 13. SIDEBAR NOTIFICATION BADGE

For notification menu:

```text
Notifikasi                12
```

Badge:

```text
background: #2563EB
color: white
font-size: 10px
padding: 2px 6px
border-radius: 999px
```

---

# 14. SIDEBAR FOOTER

At the bottom show admin account:

```text
[Shield Icon]

Super Admin
KyySolutions

                    ⌄
```

Style:

```text
background: rgba(255,255,255,0.035)
border: 1px solid rgba(255,255,255,0.08)
border-radius: 10px
```

This component should remain near the bottom of the sidebar.

---

# 15. TOP HEADER

Desktop header:

```text
┌──────────────────────────────────────────────────────────────┐
│ ☰  Dashboard Super Admin      Search            🔔 Avatar ▼  │
│    Home > Dashboard                                      │
└──────────────────────────────────────────────────────────────┘
```

Header background:

```text
#FFFFFF
```

Bottom border:

```text
1px solid #E8EDF3
```

---

# 16. PAGE TITLE AREA

Left section:

```text
Dashboard Super Admin
Home > Dashboard
```

Title:

```text
24px
font-weight: 700
```

Breadcrumb:

```text
12px
color: #94A3B8
```

Hamburger/collapse sidebar button appears left of title.

---

# 17. SEARCH BAR

Center or center-right header.

Desktop width:

```text
320px–380px
```

Height:

```text
40px
```

Style:

```text
background: white
border: 1px solid #E2E8F0
border-radius: 10px
```

Placeholder:

```text
Cari sesuatu...
```

Leading search icon.

Focus:

```text
border-color: #93C5FD
box-shadow: 0 0 0 3px rgba(37,99,235,0.08)
```

---

# 18. HEADER ADMIN PROFILE

Right area:

```text
🔔     [avatar] Super Admin
                 Administrator   ▼
```

Avatar:

```text
36px × 36px
border-radius: 50%
```

Notification icon should have a small red badge.

Example:

```text
8
```

---

# 19. DASHBOARD CONTENT ORDER

Dashboard hierarchy must be:

```text
1. KPI SUMMARY CARDS
2. FINANCIAL / ORDER ANALYTICS
3. OPERATIONAL TABLES
4. MODERATION / SELLER / SERVICE PANELS
5. ACTIVITY / QUICK ACTIONS
```

---

# 20. KPI SUMMARY SECTION

Use 6 metric cards.

Desktop layout:

```text
┌──────────┐ ┌──────────┐ ┌──────────┐
│ Revenue  │ │ Orders   │ │ Sellers  │
└──────────┘ └──────────┘ └──────────┘

or preferably at wide desktop:

┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
│ Rev  │ │Order │ │Seller│ │Produk│ │Servis│ │Wdrl  │
└──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘
```

Use a responsive CSS grid:

```text
>= 1440px: 6 columns
1200–1439px: 3 columns
768–1199px: 2 columns
<768px: 1 column
```

---

# 21. KPI CARD CONTENT

Card 1:

```text
Total Revenue
Rp 1.248.750.000
↑ 18.6% dari bulan lalu
```

Icon:

```text
Wallet
```

Color:

```text
Green
```

---

Card 2:

```text
Total Orders
3.842
↑ 12.4% dari bulan lalu
```

Icon:

```text
ShoppingBag
```

Color:

```text
Blue
```

---

Card 3:

```text
Active Sellers
215
↑ 15.3% dari bulan lalu
```

Icon:

```text
Users
```

Color:

```text
Purple
```

---

Card 4:

```text
Produk Aktif
1.256
↑ 9.7% dari bulan lalu
```

Icon:

```text
Package
```

Color:

```text
Orange
```

---

Card 5:

```text
Service Requests
128
↑ 20.5% dari bulan lalu
```

Icon:

```text
Headphones / Messages
```

Color:

```text
Teal
```

---

Card 6:

```text
Pending Withdrawals
Rp 78.450.000
↓ 5.2% dari bulan lalu
```

Icon:

```text
Coins / CircleDollarSign
```

Color:

```text
Amber
```

---

# 22. KPI CARD STYLE

Each card:

```text
min-height: 100px
padding: 16px
background: white
border: 1px solid #E9EEF5
border-radius: 12px
```

Layout:

```text
[ICON]  Label
        Value
        Trend
```

Icon container:

```text
44px × 44px
border-radius: 12px
```

Use soft colored background.

Example blue:

```text
background: linear-gradient(135deg,#3B82F6,#2563EB)
color: white
```

Trend positive:

```text
#22C55E
```

Trend negative:

```text
#F97316 or #EF4444
```

---

# 23. ANALYTICS SECTION

Desktop structure:

```text
┌────────────────────────────────────────────┬──────────────────────┐
│ REVENUE OVERVIEW                           │ TREND ORDERS         │
│                                            │                      │
│ Line Chart             Revenue Sources     │ Line Chart           │
│                        Donut Chart          │                      │
└────────────────────────────────────────────┴──────────────────────┘
```

Recommended grid:

```text
Revenue Overview: 2fr
Trend Orders:     1fr
```

Use approximately:

```css
grid-template-columns: minmax(0, 2fr) minmax(320px, 1fr);
```

---

# 24. REVENUE OVERVIEW CARD

Header:

```text
Revenue Overview                      [30 Hari Terakhir ▼]

Total Revenue
Rp 1.248.750.000  ↑18.6%
```

Content:

```text
LEFT:
Revenue Area Line Chart

RIGHT:
Revenue Source Donut Chart
```

Internal desktop ratio:

```text
70% line chart
30% donut chart
```

---

# 25. REVENUE LINE CHART

Chart type:

```text
Smooth line + subtle area fill
```

Use:

- Recharts
- ApexCharts
- Chart.js

Recommended for React:

```text
Recharts
```

Line color:

```text
#2563EB
```

Line width:

```text
2.5px
```

Area fill:

```text
blue gradient
opacity 0.10 → 0.00
```

Curve:

```text
monotone
```

Do not create extreme spline curves.

---

# 26. REVENUE CHART AXIS

Y-axis example:

```text
0
20jt
40jt
60jt
80jt
100jt
```

X-axis example:

```text
20 Apr
24 Apr
28 Apr
2 Mei
6 Mei
10 Mei
14 Mei
18 Mei
```

Axis labels:

```text
11px
#94A3B8
```

Grid:

```text
horizontal only
stroke: #EDF2F7
stroke-dasharray: 3 3
```

Remove heavy vertical grid lines.

---

# 27. CHART TOOLTIP

Tooltip should show:

```text
18 Mei 2026

Revenue
Rp 82.500.000

Orders
245
```

Style:

```text
background: white
border: 1px solid #E2E8F0
border-radius: 8px
shadow: subtle
```

---

# 28. REVENUE SOURCE DONUT CHART

Title:

```text
Sumber Revenue
```

Data:

```text
Produk Digital     63%
Services           25%
Marketplace        12%
```

Colors:

```text
Produk Digital → #2563EB
Services       → #22C55E
Marketplace    → #F59E0B
```

Donut thickness:

```text
medium
```

Do not use a thin ring.

Center may display:

```text
100%
Revenue
```

or may remain empty.

Legend:

```text
● Produk Digital      63%
● Services            25%
● Marketplace         12%
```

Percentage aligned to the right.

---

# 29. TREND ORDERS CARD

Header:

```text
Trend Orders                  [30 Hari Terakhir ▼]
```

Metric:

```text
Total Orders

3.842
↑ 12.4%
```

Chart:

```text
Smooth blue line chart
```

Recommended Y-axis:

```text
0
50
100
150
200
250
300
```

Use the same chart style as Revenue Overview for visual consistency.

---

# 30. MAIN LOWER DASHBOARD GRID

Desktop layout should approximately be:

```text
┌─────────────────┬─────────────────┬───────────────┬───────────────┐
│ Order Terbaru   │ Produk Pending  │ Seller Baru  │ Activity      │
│                 │ Approval        │               │               │
├─────────────────┼─────────────────┼───────────────┼───────────────┤
│                 │                 │               │ Quick Action  │
│                 │                 │               │               │
│                 │                 │               │ Service Req.  │
└─────────────────┴─────────────────┴───────────────┴───────────────┘
```

However, preserve enough width for tables.

Recommended actual layout:

```text
Main Area: 3fr
Right Rail: 1fr
```

Main Area:

```text
Order Terbaru
Produk Menunggu Persetujuan
Seller Terbaru
```

Right Rail:

```text
Aktivitas Terbaru
Quick Actions
Service / Project Requests
```

---

# 31. ORDER TERBARU

Card title:

```text
Order Terbaru                        [Lihat Semua]
```

Table columns:

```text
Order ID
Customer
Produk / Layanan
Total
Status
```

Sample rows:

```text
#ORD-10542 | John Doe      | Premium UI Kit               | Rp 450.000   | Selesai
#ORD-10541 | Jane Smith    | Source Code - POS System     | Rp 750.000   | Selesai
#ORD-10540 | Budi Santoso  | Web Development Service      | Rp 5.000.000 | Proses
#ORD-10539 | Andi Wijaya   | Laravel Starter Kit          | Rp 350.000   | Selesai
#ORD-10538 | Rina Kartika  | Mobile App Service           | Rp 3.250.000 | Proses
```

---

# 32. ORDER STATUS BADGES

Success:

```text
Selesai
```

Style:

```text
background: #DCFCE7
color: #15803D
```

Process:

```text
Proses
```

Style:

```text
background: #DBEAFE
color: #1D4ED8
```

Pending:

```text
Menunggu
```

Style:

```text
background: #FEF3C7
color: #B45309
```

Failed:

```text
Gagal
```

Style:

```text
background: #FEE2E2
color: #B91C1C
```

---

# 33. TABLE DESIGN

Table header:

```text
background: #FAFBFD
font-size: 11px–12px
font-weight: 600
color: #64748B
```

Rows:

```text
height: 48px–54px
border-bottom: 1px solid #F1F5F9
```

Hover:

```text
background: #F8FAFC
```

Avoid large thick table borders.

On mobile, tables must not simply overflow.

Use:

- horizontally scrollable table,
- or transform to stacked cards where appropriate.

---

# 34. PRODUK MENUNGGU PERSETUJUAN

Title:

```text
Produk Menunggu Persetujuan
```

Action:

```text
Lihat Semua
```

Columns:

```text
Produk
Seller
Kategori
Dikirim
```

Rows:

```text
React Admin Template   | CodeCraft    | Template     | 1 jam lalu
Flutter Fitness App    | MobileDev    | Aplikasi     | 2 jam lalu
Laravel Blog System    | DevSolutions | Source Code  | 3 jam lalu
UI Components Library  | UI Market    | Asset        | 4 jam lalu
Next.js SaaS Starter   | SaaSCode     | Source Code  | 5 jam lalu
```

Include a small product thumbnail:

```text
32px × 32px
border-radius: 6px
```

Clicking a product should open product moderation detail.

---

# 35. PRODUCT MODERATION VISUAL PRIORITY

Pending products are operationally important.

Use a subtle amber indicator:

```text
Pending Review
```

Do not make the entire card yellow.

Only badge/indicator should use warning color.

---

# 36. SELLER TERBARU CARD

Title:

```text
Seller Terbaru
```

Rows:

```text
[avatar] DevSolutions
         devsolutions@gmail.com
                                      2 jam lalu
```

Sample seller:

```text
DevSolutions
CodeCraft
WebCreators
PixelStudio
AppBuilders
```

Avatar:

```text
28px–32px
```

Name:

```text
13px
font-weight: 600
```

Email:

```text
11px
color: #94A3B8
```

---

# 37. ACTIVITY FEED

Title:

```text
Aktivitas Terbaru
```

Activity examples:

```text
Order baru #ORD-10542
oleh John Doe
2 menit lalu
```

```text
Pembayaran berhasil
Order #ORD-10541 - Rp 750.000
15 menit lalu
```

```text
Produk baru menunggu review
"React Admin Template"
30 menit lalu
```

```text
Withdrawal request baru
oleh TechStore - Rp 2.500.000
1 jam lalu
```

```text
Seller baru mendaftar
DevSolutions
2 jam lalu
```

---

# 38. ACTIVITY ICON COLORS

Order:

```text
Blue
```

Payment:

```text
Green
```

Product Review:

```text
Pink / Rose
```

Withdrawal:

```text
Blue-violet
```

Seller:

```text
Amber
```

Icon background should be soft and subtle.

---

# 39. QUICK ACTIONS

Title:

```text
Quick Actions
```

Desktop:

```text
3 columns × 2 rows
```

Actions:

```text
Tambah Produk
Buat Pengumuman
Kelola Laporan

Kelola Withdrawals
Atur Komisi
Pengaturan Sistem
```

Each action:

```text
icon
label
```

Button/card style:

```text
height: 72px–82px
background: white
border: 1px solid #E8EDF3
border-radius: 10px
```

Hover:

```text
border-color: #BFDBFE
background: #F8FBFF
transform: translateY(-1px)
```

Do not use large primary-filled buttons here.

---

# 40. SERVICE / PROJECT REQUESTS

Title:

```text
Service / Project Requests
```

Rows:

```text
Company Website Development
oleh PT. Maju Bersama
[Baru]
```

```text
E-commerce Mobile App
oleh Fashion Store
[Proses]
```

```text
Custom Dashboard Development
oleh Finance Corp
[Review]
```

```text
API Integration Services
oleh Logistics ID
[Baru]
```

```text
UI/UX Design for SaaS
oleh StartupX
[Proses]
```

Status badge colors:

```text
Baru    → Purple
Proses  → Blue
Review  → Amber
Selesai → Green
```

---

# 41. RESPONSIVE DESIGN

The Super Admin Panel must be responsive.

Do not implement desktop-only UI.

---

# 42. DESKTOP >= 1440px

Sidebar:

```text
240px fixed
```

Header:

```text
full width excluding sidebar
```

KPI:

```text
6 columns
```

Analytics:

```text
Revenue Overview 2fr
Trend Orders 1fr
```

Lower section:

```text
main content + right rail
```

---

# 43. LAPTOP 1024px–1439px

Sidebar can remain expanded until space becomes tight.

KPI:

```text
3 columns × 2 rows
```

Analytics:

```text
Revenue Overview
Trend Orders
```

May use:

```text
2 columns
```

or stack at lower widths.

Right rail may move below main tables.

---

# 44. TABLET 768px–1023px

Sidebar should collapse to icons or use off-canvas drawer.

Header:

```text
hamburger
title
notifications
avatar
```

Search should move to a second row or become a search icon.

KPI:

```text
2 columns
```

Analytics:

```text
1 column
```

Tables:

```text
horizontal scroll
```

Right panels:

```text
2-column grid where appropriate
```

---

# 45. MOBILE < 768px

Sidebar:

```text
hidden
```

Open via drawer.

Header:

```text
hamburger
KyySolutions / page title
bell
avatar
```

Search:

```text
full-width underneath page heading
```

KPI:

```text
1 column
```

or:

```text
2 compact columns on >= 480px
```

Charts:

```text
full-width
```

Donut chart may appear below line chart.

Tables:

Prefer responsive cards for highly complex tables.

Do not shrink text until unreadable.

---

# 46. MOBILE BOTTOM CONSIDERATIONS

Super admin does not require a permanent bottom navigation.

Use sidebar drawer navigation instead.

---

# 47. CARD SPACING

Page spacing:

```text
24px desktop
16px tablet
12px–16px mobile
```

Grid gap:

```text
16px
```

Card padding:

```text
16px–20px
```

Section vertical gap:

```text
16px–20px
```

---

# 48. FILTER CONTROLS

Analytics cards should support:

```text
Hari ini
7 Hari
30 Hari
3 Bulan
6 Bulan
1 Tahun
Custom
```

Default:

```text
30 Hari Terakhir
```

Filter control style:

```text
height: 32px
font-size: 11px–12px
border: 1px solid #E2E8F0
border-radius: 8px
```

---

# 49. LOADING STATES

Every data-driven panel must support loading.

Use:

```text
Skeleton loaders
```

Do not display raw text:

```text
Loading...
```

for the primary dashboard.

Chart skeleton:

```text
rounded block + subtle shimmer
```

Table skeleton:

```text
5 row placeholders
```

---

# 50. EMPTY STATES

Example:

```text
Tidak ada produk yang menunggu persetujuan.
```

Include small neutral icon.

Do not leave card blank.

---

# 51. ERROR STATES

Example:

```text
Data dashboard gagal dimuat.

[Coba Lagi]
```

Use a compact inline error panel.

Do not replace the entire page unless required.

---

# 52. INTERACTIONS

Cards can have subtle hover feedback.

Do not animate financial values excessively.

Recommended motion:

```text
transition-duration: 150ms–200ms
```

Use:

```text
ease-out
```

---

# 53. ACCESSIBILITY

Must provide:

- keyboard navigation,
- visible focus states,
- proper button semantics,
- proper form labels,
- aria-label for icon buttons,
- sufficient contrast,
- readable chart legends,
- accessible table headers.

---

# 54. ADMIN DASHBOARD INFORMATION PRIORITY

Super Admin should immediately understand:

```text
1. How much money is generated?
2. How many orders exist?
3. How many sellers are active?
4. How many products are active?
5. Are there products waiting for moderation?
6. Are withdrawals waiting?
7. Are payments failing?
8. Are service project requests waiting?
9. What recently happened?
10. What requires admin action?
```

Dashboard design must support these questions.

---

# 55. SUPER ADMIN SIDEBAR MODULE DETAIL

## Dashboard

Overview and analytics.

---

## Users

Manage platform users:

```text
All Users
Buyers
Suspended Users
User Detail
```

---

## Seller

```text
All Sellers
Pending Verification
Verified
Suspended
Seller Detail
Seller Store
Seller Earnings
```

---

## Produk

```text
All Products
Published
Pending Review
Rejected
Draft
Reported
```

---

## Kategori

```text
Product Categories
Subcategories
Tech Stack
Tags
```

---

## Order

```text
All Orders
Paid
Pending
Failed
Expired
Cancelled
Refunded
```

---

## Pembayaran

```text
Payment Transactions
Gateway Status
Failed Payments
Webhook Logs
Refunds
```

---

## Komisi

```text
Platform Commission
Seller Commission Overrides
Commission History
```

---

## Withdrawal

```text
Pending
Approved
Processing
Paid
Rejected
```

---

## Review

```text
Product Reviews
Reported Reviews
Review Moderation
```

---

## Laporan

```text
Sales Reports
Revenue Reports
Seller Reports
Product Reports
Payment Reports
Withdrawal Reports
```

---

## Services

```text
Service Requests
Project Leads
Consultations
Quotation Status
Project Status
```

---

## Portfolio

Manage KyySolutions portfolio.

---

## Blog / CMS

```text
Articles
Categories
Tags
Landing Content
Pages
Announcements
```

---

## Notifikasi

```text
System Notifications
Broadcast
Admin Alerts
```

---

## Pengaturan

```text
General Settings
Marketplace Settings
Payment Settings
Commission Settings
Withdrawal Settings
Email
SEO
Security
Maintenance
```

---

# 56. COMPONENT SYSTEM

AI Agent must create reusable components.

Recommended:

```text
AdminLayout
AdminSidebar
AdminHeader
PageHeader
StatCard
ChartCard
DataTable
StatusBadge
ActivityFeed
QuickActionCard
SellerListItem
ProductApprovalItem
ServiceRequestItem
EmptyState
ErrorState
SkeletonCard
ConfirmDialog
```

Do not repeat card markup manually across pages.

---

# 57. DASHBOARD COMPONENT TREE

Recommended hierarchy:

```text
SuperAdminDashboard
│
├── AdminLayout
│   ├── AdminSidebar
│   └── AdminHeader
│
├── DashboardHeader
│
├── StatsGrid
│   ├── RevenueStatCard
│   ├── OrdersStatCard
│   ├── SellerStatCard
│   ├── ProductStatCard
│   ├── ServiceStatCard
│   └── WithdrawalStatCard
│
├── AnalyticsGrid
│   ├── RevenueOverviewCard
│   │   ├── RevenueLineChart
│   │   └── RevenueSourceDonut
│   └── OrderTrendCard
│       └── OrderTrendChart
│
├── OperationsGrid
│   ├── RecentOrdersCard
│   ├── PendingProductsCard
│   └── RecentSellersCard
│
└── DashboardRightRail
    ├── RecentActivityCard
    ├── QuickActionsCard
    └── ServiceRequestsCard
```

---

# 58. DATA FORMAT

All currency shown as Indonesian Rupiah.

Example:

```text
Rp 1.248.750.000
```

Do not show:

```text
IDR 1248750000
```

unless on export/raw accounting screens.

Use Indonesian formatting:

```text
1.248.750
```

not:

```text
1,248,750
```

---

# 59. DATE FORMAT

Default UI:

```text
28 Agustus 2026
```

Short:

```text
28 Agu 2026
```

Relative timestamps:

```text
2 menit lalu
15 menit lalu
1 jam lalu
2 hari lalu
```

---

# 60. ADMIN DESIGN QUALITY RULES

The design must NOT look like:

- Bootstrap 4 admin template,
- WordPress dashboard,
- old-school ERP,
- plain CRUD generated interface,
- highly saturated crypto dashboard,
- glassmorphism concept,
- neon cyberpunk UI,
- excessive gradients,
- giant empty whitespace,
- oversized cards,
- random inconsistent color palettes.

---

# 61. VISUAL CHARACTER

The target feeling is:

```text
Linear
+
Stripe Dashboard
+
Modern SaaS analytics
+
Professional marketplace operations
```

This is only a directional reference.

Do not clone another brand.

KyySolutions must retain its own visual identity.

---

# 62. DARK MODE

Dark mode is optional for the initial Super Admin MVP.

Do not prioritize dark mode over functional dashboard quality.

If implemented later, use design tokens rather than hardcoded colors.

---

# 63. DASHBOARD WIDTH AND GRID

Recommended main content:

```css
.admin-content {
    padding: 20px 24px 32px;
}
```

Recommended KPI grid:

```css
grid-template-columns: repeat(6, minmax(0, 1fr));
gap: 12px;
```

Recommended analytics:

```css
grid-template-columns: minmax(0, 2fr) minmax(320px, 1fr);
gap: 16px;
```

Recommended main operation grid:

```css
grid-template-columns: minmax(0, 1fr) 320px;
gap: 16px;
```

---

# 64. REVENUE CHART MODEL

Use approximately 30 days of realistic sample data.

The line should show natural fluctuations while trending upward.

Example visual shape:

```text
30jt
  ╲
   ╲__      ___
      ╲____/   ╲__
                   ╲___
                       ╲__
                          ╲___
                              ↑
```

Actual chart should be an upward business growth line with realistic dips.

Avoid random zig-zag noise.

---

# 65. ORDER CHART MODEL

Orders should also show gradual growth.

Example:

```text
120
145
136
168
155
182
175
214
190
225
210
260
244
```

Show natural operational fluctuations.

---

# 66. CHART ANIMATION

Use restrained entrance animation.

Duration:

```text
400ms–700ms
```

Do not continuously animate charts.

---

# 67. PAGE PERFORMANCE

Dashboard should not fetch each KPI through many independent uncoordinated requests where avoidable.

Prefer optimized dashboard summary endpoint/server response.

Lazy-load secondary data only if necessary.

---

# 68. PERMISSION RULE

Only users with Super Admin/Admin authorization can access:

```text
/admin/*
```

Do not protect admin pages only on frontend.

Enforce authorization server-side.

---

# 69. SEARCH BEHAVIOR

Top header global search may search:

```text
Users
Sellers
Products
Orders
Service Requests
```

Search results can use a command-palette style dropdown.

Example:

```text
Cari "laravel"

Products
Laravel POS

Orders
#ORD-10542

Seller
LaravelStudio
```

---

# 70. NOTIFICATION DROPDOWN

Bell opens dropdown.

Sections:

```text
Belum Dibaca
Hari Ini
Sebelumnya
```

Notification examples:

```text
Produk baru menunggu review
Withdrawal baru
Payment failed
Seller verification request
Service lead baru
```

---

# 71. PROFILE DROPDOWN

Admin profile menu:

```text
Profil
Pengaturan
Activity Log
Keluar
```

Logout should use a confirmation only if necessary.

---

# 72. DASHBOARD RIGHT RAIL WIDTH

Recommended:

```text
300px–330px
```

Do not make it wider than necessary.

Activity and quick action panels should remain compact.

---

# 73. CARD HEADER PATTERN

Use consistent card header:

```text
Title                             Action
```

Example:

```text
Order Terbaru                 Lihat Semua
```

Title:

```text
14px–16px
font-weight: 600
```

Action:

```text
11px–12px
color: #2563EB
```

---

# 74. CARD MINIMUM HEIGHT

Do not force all cards to identical height.

Use content-driven heights, while aligning cards in major rows when visually beneficial.

---

# 75. PRODUCT THUMBNAILS

Do not use large marketplace thumbnails in admin tables.

Use:

```text
32px × 32px
```

or:

```text
36px × 36px
```

with:

```text
border-radius: 6px–8px
```

---

# 76. AVATARS

User/Seller avatar:

```text
28px–36px
```

Use initial placeholder if no image.

Example:

```text
DS
```

Background should use deterministic soft colors.

---

# 77. ADMIN STATUS ACTIONS

Important operational actions should be clearly visible.

Examples:

```text
Approve
Reject
Suspend
Refund
Process Withdrawal
```

Dangerous actions require confirmation modal.

---

# 78. MODAL DESIGN

Modal:

```text
max-width: 480px–640px
border-radius: 14px
```

Header:

```text
Title
Description
```

Footer:

```text
Cancel
Primary Action
```

Danger:

```text
Cancel
Reject Product
```

Reject reason should be required where relevant.

---

# 79. FORM INPUT DESIGN

Input height:

```text
40px–42px
```

Textarea:

```text
min-height: 100px
```

Label:

```text
13px
font-weight: 500
```

Required indicator:

```text
*
```

Validation:

```text
border: danger
small error message
```

---

# 80. PAGINATION

Data tables use pagination.

Example:

```text
Menampilkan 1–10 dari 342

‹ 1 2 3 4 ... 35 ›
```

Use compact controls.

---

# 81. ADMIN DASHBOARD SAMPLE CONTENT

The first render may use:

```text
Total Revenue       Rp 1.248.750.000
Total Orders        3.842
Active Sellers      215
Produk Aktif        1.256
Service Requests    128
Pending Withdrawal  Rp 78.450.000
```

These are mock values only.

Real implementation must use dynamic backend data.

---

# 82. AI AGENT IMPLEMENTATION RULES

The AI Agent MUST:

1. Inspect existing components before creating new ones.
2. Reuse existing design-system components.
3. Preserve the KyySolutions color system.
4. Implement responsive behavior.
5. Build real reusable charts.
6. Build realistic loading states.
7. Build empty states.
8. Build error states.
9. Use proper authorization.
10. Avoid hardcoding production dashboard values.
11. Keep business logic outside React presentation components.
12. Avoid unrelated refactoring.
13. Keep chart styles consistent.
14. Keep all cards visually consistent.
15. Maintain Indonesian dashboard language unless product specification says otherwise.

---

# 83. DO NOT

AI Agent must NOT:

```text
- redesign the whole brand without instruction
- use random purple as the main brand color
- turn sidebar into a white sidebar
- remove KyySolutions branding
- add unnecessary gradients everywhere
- use huge 20px radius cards
- create oversized charts
- put every metric in a separate full-width section
- make every button blue-filled
- use emoji as admin icons
- mix multiple icon libraries visibly
- expose marketplace delivery URLs
- show buyer source-code links in admin public responses
- bypass backend authorization
```

---

# 84. FINAL TARGET DASHBOARD COMPOSITION

The final desktop dashboard should visually approximate:

```text
┌────────────────────┬──────────────────────────────────────────────────────────┐
│                    │ ☰ Dashboard Super Admin       Search      🔔 Admin ▼    │
│   KyySolutions     │ Home > Dashboard                                     │
│                    ├──────────────────────────────────────────────────────────┤
│  Dashboard         │                                                          │
│  Users             │ [Revenue] [Orders] [Sellers] [Products] [Service] [WD] │
│  Seller            │                                                          │
│  Produk            │ ┌────────────────────────────┬────────────────────────┐   │
│  Kategori          │ │ Revenue Overview           │ Trend Orders           │   │
│  Order             │ │                            │                        │   │
│  Pembayaran        │ │ LINE CHART   DONUT CHART   │ LINE CHART             │   │
│  Komisi            │ │                            │                        │   │
│  Withdrawal        │ └────────────────────────────┴────────────────────────┘   │
│  Review            │                                                          │
│  Laporan           │ ┌────────────────────────────────────────┬─────────────┐  │
│  Services          │ │ Order Terbaru                           │ Activity    │  │
│  Portfolio         │ │                                        │             │  │
│  Blog/CMS          │ ├─────────────────────┬──────────────────┤ Quick       │  │
│  Notifikasi        │ │ Pending Products    │ Seller Terbaru   │ Actions     │  │
│  Pengaturan        │ │                     │                  │             │  │
│                    │ │                     │                  │ Service Req │  │
│  Super Admin       │ └─────────────────────┴──────────────────┴─────────────┘  │
└────────────────────┴──────────────────────────────────────────────────────────┘
```

---

# 85. FINAL VISUAL EXPECTATION

When the Super Admin opens the dashboard, it should immediately feel like:

> "This is the command center of KyySolutions."

The admin should be able to understand platform health, revenue, orders, sellers, products, withdrawals, moderation workload, and service project leads within seconds.

The interface should look credible enough for:

- real startup operations,
- investor/demo presentation,
- internal daily administration,
- future multi-vendor marketplace scaling.

The dashboard is not only a visual showcase.

It is an **operational control center**.

---

# 86. MASTER PROMPT — READY TO GIVE TO AI CODING AGENT

Use the following prompt when starting implementation:

> Build the KyySolutions Super Admin Panel using the specification in `superadmin_design.md`.
>
> Treat this document as the primary source of truth for visual layout and dashboard UX.
>
> Create a modern SaaS admin dashboard with a fixed dark navy KyySolutions sidebar, a white top header, light gray application background, white bordered cards, subtle shadows, and primary blue `#2563EB`.
>
> The dashboard must contain six KPI cards: Total Revenue, Total Orders, Active Sellers, Produk Aktif, Service Requests, and Pending Withdrawals.
>
> Below the KPI cards create an analytics row. The main Revenue Overview card must contain a smooth blue area-line chart and a revenue-source donut chart showing Produk Digital, Services, and Marketplace. Beside it create a Trend Orders card containing a consistent blue line chart.
>
> Below analytics create operational dashboard sections for Recent Orders, Pending Product Approvals, Recent Sellers, Recent Activity, Quick Actions, and Service / Project Requests.
>
> Use Indonesian labels throughout the admin UI.
>
> The sidebar navigation must contain Dashboard, Users, Seller, Produk, Kategori, Order, Pembayaran, Komisi, Withdrawal, Review, Laporan, Services, Portfolio, Blog / CMS, Notifikasi, and Pengaturan.
>
> Use Inter typography, Lucide icons, approximately 12px card radius, subtle `#E2E8F0` borders, page background `#F8FAFC`, main text `#0F172A`, and restrained semantic colors.
>
> The interface must be responsive. Desktop >=1440px uses six KPI columns, a 2fr/1fr analytics grid, and a compact right rail. Laptop uses three KPI columns. Tablet uses two KPI columns and collapsible sidebar behavior. Mobile uses an off-canvas navigation drawer and single-column content.
>
> Implement proper loading skeletons, empty states, error states, hover states, focus states, tooltips, date range filters, accessible table headers, and accessible icon buttons.
>
> Use reusable components such as AdminLayout, AdminSidebar, AdminHeader, StatCard, ChartCard, DataTable, StatusBadge, ActivityFeed, QuickActionCard, and EmptyState.
>
> Do not implement this as a generic CRUD template. It must visually feel like a premium startup operations dashboard and reflect KyySolutions' three business areas: Services, Digital Products, and Marketplace.
>
> Do not change the documented brand palette without explicit instruction. Do not create excessive gradients, glassmorphism, neon effects, oversized cards, giant headings, or inconsistent icons.
>
> Inspect the existing application architecture before coding. Reuse existing components where possible. Keep business logic server-side and presentation logic inside reusable React components. Never rely on frontend-only authorization for admin resources.
>
> Build the dashboard based on real backend-ready data structures rather than permanently hardcoded statistics. Mock values may only be used during initial UI development.

---

# 87. DOCUMENT PRIORITY

If another prompt conflicts with this design file:

```text
1. PRD / Security / Business rules
2. superadmin_design.md
3. Existing approved Design System
4. Individual implementation prompt
5. AI Agent assumptions
```

AI Agent assumptions always have the lowest priority.

---

**End of `superadmin_design.md`**
