# 1. MASTER OBJECTIVE

Build a **premium, highly polished, international-quality Buyer Dashboard** for KyySolutions.

This page is the logged-in buyer's software ownership portal.

Main purpose:

```text
Buyer Hub
→ Produk Saya
→ Lisensi Saya
→ Unduhan / Akses Produk
→ Riwayat Transaksi

The page should allow buyers to:

view all purchased software and digital assets,
see license status,
copy license keys,
download purchased files,
access linked repositories/resources,
review products,
browse transaction history,
feel confident that their purchases are secure and professionally managed.

This is not a generic dashboard.

This is not an admin page.

This is not a marketplace browsing page.

This is a customer ownership portal for purchased digital products.

The page must feel like a premium international SaaS customer panel.

2. OFFICIAL KYY SOLUTIONS LOGO

Use the official KyySolutions logo.

Local project path:

C:\laragon\www\New Kyysolutions\public\images\logo\logo_no_bg.png

Browser path:

/images/logo/logo_no_bg.png

React / Inertia usage:

<img
    src="/images/logo/logo_no_bg.png"
    alt="KyySolutions"
/>

Do NOT recreate the logo.

Do NOT use:

generated K logo
placeholder logo
Lucide icon as logo
text-only fake logo
AI-generated logo

The logo must remain the official asset.

Preserve transparency.

3. PAGE IDENTITY

The page should visually communicate:

ownership
security
customer trust
premium product access
professional software delivery
verified licensing
modern international SaaS experience

The buyer should feel:

my products are safe
my licenses are valid
my downloads are easy to access
this platform is trustworthy
4. DESIGN DIRECTION

Target style:

Modern SaaS customer portal
+
Digital product ownership center
+
Premium software account area

The page should feel:

clean
structured
high-end
calm
smart
customer-first
trustworthy
elegant

Avoid:

generic ecommerce account page
crowded marketplace card layout
old Bootstrap dashboard
busy admin-like tables
overly playful UI
too much gradient
glassmorphism
crypto dashboard aesthetic
5. GLOBAL COLOR SYSTEM
Primary Blue
#2563EB

Use for:

main CTA buttons,
active tabs,
active view toggles,
focus rings,
links,
key highlights.

Suggested blue scale:

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
6. PAGE SURFACE COLORS

App/page background:

#F8FAFC

Alternative:

#F7F9FC

Card background:

#FFFFFF

Primary text:

#0F172A

Secondary text:

#475569

Muted text:

#94A3B8

Border:

#E2E8F0

Soft border:

#EDF2F7
7. SEMANTIC COLORS

Verified / active / success:

#10B981

Verified background:

#ECFDF5

Badge green border:

#A7F3D0

Warning:

#F59E0B

Purple tag:

#7C3AED

Teal tag:

#0EA5A4

Navy license module:

#071A38

License dark gradient:

linear-gradient(135deg, #071A38 0%, #0A2350 55%, #06152E 100%);
8. TYPOGRAPHY

Preferred font:

Inter

Fallback:

Inter,
ui-sans-serif,
system-ui,
-apple-system,
BlinkMacSystemFont,
"Segoe UI",
sans-serif

Page title:

24px–28px
font-weight: 700
line-height: 1.2

Section title:

16px
font-weight: 700

Card title:

15px–16px
font-weight: 700

Body:

13px–14px

Badge:

11px–12px
font-weight: 600

License key:

18px–20px
font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace
font-weight: 700
letter-spacing: 0.02em
9. BORDER RADIUS

Use a premium, controlled radius system:

Main cards:           14px
Small utility cards:  12px
Inputs:               10px
Buttons:              10px
Pills / badges:       999px
Top nav buttons:      10px
License module:       14px

Do not over-round beyond brand consistency.

10. SHADOW SYSTEM

Use subtle soft elevation only.

Recommended:

box-shadow:
0 1px 2px rgba(15,23,42,0.03),
0 8px 24px rgba(15,23,42,0.04);

Hover shadow:

box-shadow:
0 10px 28px rgba(15,23,42,0.06);

Do not use aggressive shadows.

11. GLOBAL PAGE LAYOUT

Desktop layout:

┌───────────────────────────────────────────────────────────────────────────┐
│ TOP NAV                                                                   │
├───────────────────────────────────────────────────────────────────────────┤
│ LEFT ICON RAIL │ MAIN CONTENT                                             │
│                │                                                          │
│                │ BREADCRUMB                                               │
│                │ TITLE + STATUS                                           │
│                │ TABS                                                     │
│                │ SUMMARY CARDS                                            │
│                │ FILTERS                                                  │
│                │ PRODUCT / LICENSE CARD GRID                              │
│                │ FOOTER                                                   │
└───────────────────────────────────────────────────────────────────────────┘

This is not a full admin sidebar.

Use a slim buyer utility rail on the left.

12. TOP NAVIGATION BAR

Height:

68px–72px

Layout:

Logo | Marketplace Link | Search | CTA | Cart | Notifications | Buyer Profile

This bar should feel premium, calm, and ecommerce-meets-SaaS.

13. TOP NAV — LEFT SECTION

Show official logo and brand.

Then a subtle divider.

Then a marketplace link:

Katalog Marketplace

Optionally with small icon:

Store / ShoppingBag

Use understated styling.

14. TOP NAV — CENTER SEARCH

Search field placeholder:

Cari software, template, atau fitur...

Width desktop:

420px–540px

Height:

42px

Style:

background: white
border: 1px solid #E2E8F0
border-radius: 12px

Leading icon:

Search

Right utility hint:

⌘K

The search must look premium but lightweight.

15. TOP NAV — CTA BUTTON

Text:

Eksplor Software Baru

Style:

background: #2563EB
color: white
height: 42px
padding: 0 18px
border-radius: 10px
font-weight: 600

Optional leading or trailing icon:

Sparkles
ArrowRight

This is the main top-nav action.

16. TOP NAV — RIGHT UTILITIES

Icons:

Cart
Bell

Then buyer profile dropdown.

Profile structure:

[Avatar Initial]
User Buyer
Verified Buyer

Small down chevron at the end.

Use compact clean spacing.

17. LEFT ICON RAIL

A slim vertical navigation rail for buyer account tools.

Width:

72px–84px

Background:

transparent or subtle white column

Items should be centered and spaced vertically.

Recommended icons:

Home
Produk Saya (active)
Dokumen / Riwayat
Analitik / Aktivitas
Unduhan
Settings
Help
Theme Toggle
Logout
18. LEFT ICON RAIL STYLE

Each icon button:

44px × 44px
border-radius: 12px

Default:

background: transparent
color: #64748B

Active:

background: #EFF6FF
color: #2563EB

Hover:

background: #F8FAFC
color: #2563EB

Do not overcomplicate this rail.

19. MAIN CONTENT WIDTH

Use a generous content container.

Suggested:

max-width: 1360px

or fluid with safe padding.

Main content padding:

24px 28px 32px
20. BREADCRUMB

Use above the main title.

Example:

Beranda > Buyer Hub > Produk & Lisensi Saya

Breadcrumb size:

12px

Breadcrumb color:

#94A3B8

Active/current text:

#475569
21. PAGE TITLE SECTION

Page title:

Produk & Lisensi Saya

Subtitle:

Kelola lisensi, unduh software, dan akses sumber daya digital Anda.

The title should be the strongest visual anchor in the content area.

22. RIGHT SIDE PAGE STATUS

At the title level, show:

Akun Pembeli Terverifikasi
Status Akun: Aktif

These should be horizontally aligned on desktop.

23. VERIFIED BUYER BADGE

Text:

Akun Pembeli Terverifikasi

Style:

background: #ECFDF5
color: #047857
border: 1px solid #A7F3D0
border-radius: 999px
height: 36px
padding: 0 14px

Icon:

ShieldCheck
24. ACCOUNT STATUS PILL

Text:

Status Akun: Aktif

Layout:

Status Akun:   ● Aktif

Style:

background: #FFFFFF
border: 1px solid #E2E8F0
color: #475569
border-radius: 999px
height: 36px
padding: 0 14px

Dot:

#10B981
25. PRIMARY TAB ROW

Place below title and subtitle.

Tabs:

Produk & Lisensi Saya
Riwayat Faktur Transaksi
Aktivitas Akun

Optional fourth tab:

Pengaturan Lisensi

Tabs must feel like top-level buyer hub navigation.

26. TAB STYLE

Use pills or underlined-tab hybrid.

Active tab:

background: #EFF6FF
color: #2563EB

Alternative:

white background with blue underline

Preferred style:
A soft filled active tab button with icon.

Height:

40px–42px

Padding:

0 14px–16px

Radius:

10px
27. TAB ICONS

Recommended:

Produk & Lisensi Saya → PackageCheck / BadgeCheck
Riwayat Faktur Transaksi → FileText / Receipt
Aktivitas Akun → Activity / Pulse

Use one consistent icon library:

Lucide React
28. SUMMARY CARDS ROW

Place below tabs.

Use exactly 4 summary cards.

Layout desktop:

4 columns

Tablet:

2 columns

Mobile:

1 column

Gap:

16px
29. SUMMARY CARD BASE

Each summary card:

height: 108px–120px
padding: 18px
background: white
border: 1px solid #E8EDF3
border-radius: 14px

Content layout:

[Icon]  Label
        Main Value
        Helper Text
30. SUMMARY CARD 1

Label:

Total Software Dimiliki

Value:

3

Helper:

Produk digital Anda

Icon:

Package / Box / Cuboid

Icon accent:

Blue
31. SUMMARY CARD 2

Label:

Lisensi Aktif

Value:

3

Helper:

Semua lisensi aktif

Icon:

ShieldCheck

Accent:

Green
32. SUMMARY CARD 3

Label:

Pembelian Terakhir

Value:

28 Agu 2026

Helper:

E-Commerce Admin Kit

Icon:

Calendar

Accent:

Purple
33. SUMMARY CARD 4

Label:

Akun Terverifikasi

Value:

Verified Buyer

Helper:

Pembeli terverifikasi

Icon:

BadgeCheck / Shield

Accent:

Blue
34. FILTER / UTILITY ROW

Below summary cards.

Layout:

Search Owned Products | Status Filter | Category Filter | Sort | View Toggle

This row should feel calm and very functional.

35. OWNED PRODUCTS SEARCH

Placeholder:

Cari produk atau lisensi...

Desktop width:

360px–460px

Height:

40px–42px

Style:

background: white
border: 1px solid #E2E8F0
border-radius: 10px

Leading icon:

Search
36. FILTER DROPDOWNS

Use:

Semua Status
Semua Kategori
Terbaru

Height:

40px

Radius:

10px

Border:

#E2E8F0

Text:

13px–14px

Each should feel like a premium selector.

37. VIEW TOGGLE

Show:

Grid view
List view

Compact two-button group.

Active:

blue icon and subtle filled background

Inactive:

gray icon
38. PRODUCT GRID LAYOUT

The core content must be a premium product ownership grid.

Desktop:

2 columns

Gap:

18px

If odd number of products, allow the final card to occupy one column while the remaining space stays clean.

Do not force a stretched ugly card unless needed.

39. PRODUCT CARD BASE

Each product card must be a polished ownership card.

Card style:

background: white
border: 1px solid #E8EDF3
border-radius: 16px
padding: 18px–20px

Min height:

250px–280px

Use a very clean content hierarchy.

40. PRODUCT CARD STRUCTURE

Inside each card:

1. top metadata row
2. product title
3. dark license module
4. metadata row (order ref + purchase date)
5. action row

Do not place unnecessary marketplace clutter here.

41. PRODUCT CARD — TOP METADATA ROW

Left:

Category badge
Version badge

Right:

Aktif status badge

This row establishes quick readability.

42. CATEGORY BADGE STYLE

Examples:

SAAS SYSTEMS
SOURCE CODE
MOBILE APPS

Style:

background: #EFF6FF
color: #2563EB
border-radius: 999px
padding: 4px 10px
font-size: 11px
font-weight: 700

Optional variant colors are allowed but must stay subtle.

43. VERSION BADGE

Examples:

v2.4.0
v1.8.2
v3.1.0

Style:

background: #F8FAFC
color: #64748B
border: 1px solid #E2E8F0
border-radius: 999px
padding: 4px 8px
font-size: 11px
font-weight: 600
44. ACTIVE STATUS BADGE

Text:

Aktif

Style:

background: #ECFDF5
color: #047857
border: 1px solid #A7F3D0
border-radius: 999px
padding: 4px 10px
font-size: 11px
font-weight: 700

Add a small shield or dot icon if desired.

45. PRODUCT TITLE

Large and prominent.

Examples:

SaaS Multi-Tenant Boilerplate Starter
E-Commerce Admin & Live POS Terminal Kit
Fintech Mobile Banking App Template

Style:

font-size: 15px–17px
font-weight: 700
color: #0F172A
line-height: 1.35

Allow title to wrap to two lines if needed.

46. DARK LICENSE MODULE

This is the visual heart of the card.

It must feel premium and secure.

Background:

linear-gradient(135deg, #071A38 0%, #0A2350 55%, #06152E 100%);

Radius:

14px

Padding:

18px

Min height:

88px–100px

Use subtle internal glow or gradient depth.

47. LICENSE MODULE CONTENT

Top row:

[Key Icon] Kunci Lisensi Resmi (Commercial Standard)
                              Verified Commercial

Second row:

KYY-LIC-WCV4-PJ7J-5887        [ Salin ]

License key should be dominant.

48. LICENSE MODULE — LABELS

Title:

Kunci Lisensi Resmi (Commercial Standard)

Color:

#F8FAFC

Secondary verification text:

Verified Commercial

Color:

#34D399 or #6EE7B7

Use a shield-check or badge-check icon.

49. LICENSE KEY TYPOGRAPHY

Example:

KYY-LIC-WCV4-PJ7J-5887

Style:

monospace
18px–20px
font-weight: 700
color: #FACC15 or #F8FAFC with accent

Recommended accent:

#FACC15

This makes the key look important and copy-friendly.

50. COPY BUTTON

Text:

Salin

Icon:

Copy

Style:

background: rgba(255,255,255,0.10)
color: white
border: 1px solid rgba(255,255,255,0.12)
border-radius: 10px
padding: 8px 12px

Hover:

background: rgba(255,255,255,0.16)
51. PRODUCT METADATA ROW

Below the dark license module.

Two items:

Order Ref: KYY-ORD-QVJ66E
Tanggal Beli: 28 Agu 2026

Icons:

Receipt
Calendar

Text size:

12px–13px

Secondary text color:

#64748B

Strong value color:

#475569 or #334155
52. ACTION ROW

Bottom row must include 3 actions:

Unduh ZIP
Akses GitHub
Beri Ulasan

The layout should feel balanced.

53. PRIMARY PRODUCT ACTION
Unduh ZIP

Style:

background: #2563EB
color: white
height: 40px
padding: 0 14px
border-radius: 10px
font-weight: 600

Icon:

Download

This is the dominant button.

54. SECONDARY PRODUCT ACTION
Akses GitHub

Style:

background: white
border: 1px solid #E2E8F0
color: #0F172A
height: 40px
padding: 0 14px
border-radius: 10px

Icon:

Github

If GitHub is not the right destination, label can be:

Akses Source
Akses Resource
Akses Dokumentasi

depending on product.

55. TERTIARY ACTION
Beri Ulasan

This may be aligned to the far right.

Style:

background: transparent
color: #475569
font-weight: 500

Icon:

Star

Hover:

color: #2563EB
56. FOOTER

Footer should be clean and elegant.

Left side:

© 2026 KyySolutions Platform. Seluruh hak cipta dilindungi.

Right side:

Kebijakan Privasi
Syarat & Ketentuan
Bantuan
Bahasa Indonesia

Use separators or compact spacing.

Footer must not dominate the page.

57. OPTIONAL ENHANCEMENTS

Allowed enhancements:

recently updated product chip
license expiry or lifetime indicator
download count
documentation link
support contact shortcut

But these must remain secondary.

Do not overload cards.

58. MICRO-INTERACTION GOAL

The page should feel alive and premium through subtle motion.

Use motion for:

card hover
tab switch
copy button feedback
summary card entrance
button hover
status pulse (very subtle)

Do not use distracting animation loops.

59. PAGE ENTRANCE ANIMATION

Recommended on first load:

header content → fade up
summary cards → stagger fade up
product cards → gentle fade up

Timing:

300ms–500ms

Do not bounce.

60. PRODUCT CARD HOVER

Hover state:

translateY(-2px)
slightly stronger shadow

Duration:

180ms–220ms

This should feel soft and premium.

61. COPY BUTTON FEEDBACK

After pressing:

Salin → Tersalin

Optional mini check icon.

Use a brief success state.

Do not use a giant toast unless system-wide toasts already exist.

62. VERIFIED BADGE MICRO-MOTION

The verified account badge may use a subtle static glow or gentle sheen.

Do not make it pulse aggressively.

63. FOCUS STATES

All interactive controls must have visible focus.

Recommended:

box-shadow: 0 0 0 3px rgba(37,99,235,0.14);
border-color: #93C5FD;

This includes:

buttons,
inputs,
tabs,
view toggles,
copy button,
dropdowns.
64. RESPONSIVE DESIGN — DESKTOP >= 1440px

Layout:

top nav full width
left utility rail visible
main content 2-column product grid
4 summary cards in one row

Search and filters remain on one line if possible.

65. RESPONSIVE DESIGN — LAPTOP 1024px–1439px

Maintain:

left utility rail
top nav
main content

Summary cards:

2 columns × 2 rows

Product grid:

2 columns

Filter row may wrap to two lines.

66. RESPONSIVE DESIGN — TABLET 768px–1023px

Left icon rail may collapse or transform.

Recommended:

hide the left rail or collapse it

Top nav remains, but tighter.

Summary cards:

2 columns

Product grid:

1 column

Search + filters can wrap into stacked rows.

67. RESPONSIVE DESIGN — MOBILE < 768px

The page must become a true mobile buyer portal.

Do not simply shrink desktop.

Use:

single-column layout

Top nav:

logo
menu / profile
search may move below

Hide the left rail.

Tabs become scrollable pills.

Summary cards stack.

Product cards full width.

Footer stacks vertically.

68. MOBILE PRODUCT CARD

On mobile:

title
badges
status
license module
metadata
buttons stacked or wrapped

License key may shrink slightly but must remain readable.

Copy button remains accessible.

69. MOBILE ACTION BUTTONS

Preferred order:

Unduh ZIP
Akses GitHub
Beri Ulasan

Use wrapping layout:

primary on first row
secondary and tertiary below or beside when space allows

Touch target height:

44px minimum
70. SEARCH / FILTER BEHAVIOR

Product search should filter owned products.

Filters may include:

status
category
sort

Optional extra filter:

Semua Lisensi
Lifetime
Commercial
Extended

Only add if supported by product logic.

71. EMPTY STATE

If buyer has no purchased products:

Belum ada produk yang dimiliki.

Supportive text:

Mulai jelajahi marketplace untuk membeli software pertama Anda.

Button:

Eksplor Marketplace

Use a polished illustration or icon.

Do not leave the area blank.

72. ERROR STATE

If product data fails to load:

Produk Anda gagal dimuat.
Silakan coba lagi.

CTA:

Coba Lagi

Use inline elegant error card.

Do not crash the whole page.

73. LOADING STATE

Use skeleton loaders for:

summary cards
filter row
product cards
license module area

Do not use centered “Loading...” text for the primary experience.

74. ACCOUNT TRUST SIGNALS

The page should surface trust without clutter.

Allowed signals:

Verified Buyer
Akun Aktif
Verified Commercial
Lisensi Resmi

These signals should reinforce confidence.

75. DATA EXAMPLES

Use these products for UI examples:

SaaS Multi-Tenant Boilerplate Starter
E-Commerce Admin & Live POS Terminal Kit
Fintech Mobile Banking App Template

Use these categories:

SAAS SYSTEMS
SOURCE CODE
MOBILE APPS

Use example versions:

v2.4.0
v1.8.2
v3.1.0

Use example order ref:

KYY-ORD-QVJ66E

Use example dates:

28 Agu 2026

These are mock examples only.

76. COMPONENT SYSTEM

Recommended reusable components:

BuyerLayout
TopBuyerNav
BuyerUtilityRail
PageBreadcrumb
PageTitleSection
VerifiedBuyerBadge
StatusPill
HubTabs
SummaryCard
OwnedProductsToolbar
FilterSelect
ViewToggle
ProductLicenseCard
LicenseModule
CopyButton
ProductActionRow
PageFooter
SkeletonProductCard
EmptyState
ErrorState

Do not manually duplicate large chunks of markup.

77. COMPONENT TREE

Recommended structure:

BuyerProductsPage
│
├── BuyerLayout
│   ├── TopBuyerNav
│   ├── BuyerUtilityRail
│   └── MainContent
│
├── PageBreadcrumb
├── PageTitleSection
│   ├── Title
│   ├── Subtitle
│   └── StatusGroup
│       ├── VerifiedBuyerBadge
│       └── AccountStatusPill
│
├── HubTabs
│   ├── Produk & Lisensi Saya
│   ├── Riwayat Faktur Transaksi
│   └── Aktivitas Akun
│
├── SummaryCardsGrid
│   ├── TotalSoftwareCard
│   ├── ActiveLicenseCard
│   ├── LatestPurchaseCard
│   └── VerifiedBuyerCard
│
├── OwnedProductsToolbar
│   ├── ProductSearch
│   ├── StatusFilter
│   ├── CategoryFilter
│   ├── SortSelect
│   └── ViewToggle
│
├── ProductGrid
│   └── ProductLicenseCard × N
│       ├── CardBadges
│       ├── ProductTitle
│       ├── LicenseModule
│       │   ├── LicenseHeader
│       │   ├── LicenseKey
│       │   └── CopyButton
│       ├── MetadataRow
│       └── ProductActionRow
│
└── PageFooter
78. ACCESSIBILITY

Must include:

semantic headings
button labels
aria-label for icon buttons
accessible tabs
clear focus states
keyboard navigation
sufficient text contrast
descriptive link/button text

License copy action must be usable by keyboard.

79. SECURITY UX PRINCIPLE

The page should visually feel secure.

Allowed security visuals:

shield badge
verified commercial label
account active status
license panel
copy button feedback

Do not make fake security promises.

Do not use fear-based messaging.

80. PRODUCT OWNERSHIP EXPERIENCE

The buyer should immediately understand:

how many products I own
which licenses are active
which product I bought last
how to download my files
how to access source/resources
how to copy my license key
where to see invoices

The layout must support that clarity within seconds.

81. UI LANGUAGE

Use Bahasa Indonesia.

Recommended labels:

Produk & Lisensi Saya
Riwayat Faktur Transaksi
Aktivitas Akun
Cari produk atau lisensi...
Unduh ZIP
Akses GitHub
Beri Ulasan
Akun Pembeli Terverifikasi
Status Akun: Aktif

Avoid mixing random English except for unavoidable product/category terms.

82. DATE AND NUMBER FORMATTING

Date format:

28 Agu 2026

Count format:

3
894

Do not use US comma-based formatting where not needed.

83. PERFORMANCE

Do not fetch unnecessary dashboard data.

Recommended page data groups:

buyer profile
verification status
summary stats
owned products
filters

If transaction history is another tab, lazy-load it when needed.

84. AUTHORIZATION

Only the authenticated buyer should see their own products and licenses.

Do not expose:

other buyers’ license keys
other buyers’ downloads
admin-only data
seller-only data
private delivery URLs in public APIs

All private access must be authorized server-side.

85. LICENSE SECURITY NOTE

Display license keys as part of the buyer portal only after authorization.

Do not render product delivery URLs into public page source if they are protected.

Product access actions such as:

Unduh ZIP
Akses GitHub
Akses Source

must remain tied to ownership permissions.

86. DO NOT

AI Agent must NOT:

- redesign this into an admin dashboard
- use a large dark sidebar like super admin
- create a cluttered ecommerce grid
- remove the official KyySolutions logo
- create fake logos
- use neon colors
- use glassmorphism
- make every section blue
- use random gradients everywhere
- place giant illustrations above purchased products
- hide the license module
- make download actions hard to find
- expose protected delivery URLs in the UI layer
- mix multiple icon libraries
- use emoji icons
- build desktop-only layout
87. FINAL DESKTOP COMPOSITION

The final desktop screen should approximate this structure:

┌───────────────────────────────────────────────────────────────────────────┐
│ Logo | Marketplace | Search...               [Eksplor Software Baru] U  │
├───────────────────────────────────────────────────────────────────────────┤
│ Icon │ Beranda > Buyer Hub > Produk & Lisensi Saya                       │
│ Rail │                                                                   │
│      │ Produk & Lisensi Saya                    [Verified] [Status Aktif]│
│      │ Kelola lisensi, unduh software...                                 │
│      │                                                                   │
│      │ [Produk & Lisensi Saya] [Riwayat Faktur] [Aktivitas Akun]         │
│      │                                                                   │
│      │ [Total Software] [Lisensi Aktif] [Pembelian Terakhir] [Verified]  │
│      │                                                                   │
│      │ [Cari produk/lisensi...] [Semua Status] [Semua Kategori] [Sort]   │
│      │                                                    [Grid] [List]  │
│      │                                                                   │
│      │ ┌────────────────────────────┐ ┌────────────────────────────┐      │
│      │ │ SaaS Multi-Tenant...       │ │ E-Commerce Admin & POS...  │      │
│      │ │ [License Panel]            │ │ [License Panel]            │      │
│      │ │ Order ref / date           │ │ Order ref / date           │      │
│      │ │ [Unduh ZIP] [Akses GitHub] │ │ [Unduh ZIP] [Akses GitHub] │      │
│      │ │                 BeriUlasan │ │                 BeriUlasan │      │
│      │ └────────────────────────────┘ └────────────────────────────┘      │
│      │                                                                   │
│      │ ┌────────────────────────────┐                                     │
│      │ │ Fintech Mobile Banking...  │                                     │
│      │ │ [License Panel]            │                                     │
│      │ │ Order ref / date           │                                     │
│      │ │ [Unduh ZIP] [Akses GitHub] │                                     │
│      │ │                 BeriUlasan │                                     │
│      │ └────────────────────────────┘                                     │
│      │                                                                   │
│      │ Footer                                                            │
└───────────────────────────────────────────────────────────────────────────┘
88. UX QUALITY TARGET

The buyer should feel that this page is:

organized
secure
easy to use
premium
professional
international
trustworthy

It should feel like a software ownership center, not just a list of downloads.

89. MASTER PROMPT FOR AI CODING AGENT

Use this prompt:

Build the KyySolutions Buyer Dashboard page based on buyer_hub_design.md.

Treat this document as the primary source of truth for the Buyer Hub / Produk Saya page.

Create a premium international-quality buyer portal for owned digital products and licenses. Use a bright light SaaS interface with subtle borders, soft shadows, strong spacing, Inter typography, primary blue #2563EB, white cards, and a refined customer-dashboard feel.

Use the official KyySolutions logo from /images/logo/logo_no_bg.png. Do not recreate or replace the logo.

Build a top navigation bar containing the logo, a Katalog Marketplace link, a central search field with placeholder Cari software, template, atau fitur..., a primary CTA button Eksplor Software Baru, cart and notification icons, and a buyer profile dropdown.

Add a slim left icon utility rail for buyer tools, not a full admin sidebar. Include icons such as Home, Produk Saya, Riwayat, Aktivitas, Unduhan, Settings, Help, Theme Toggle, and Logout. Highlight the current Produk Saya section.

The main page content must begin with the breadcrumb Beranda > Buyer Hub > Produk & Lisensi Saya, followed by the title Produk & Lisensi Saya and the subtitle Kelola lisensi, unduh software, dan akses sumber daya digital Anda.. On the right side, display a verified buyer badge and an account status pill indicating the buyer account is active.

Below the title create top-level buyer hub tabs: Produk & Lisensi Saya, Riwayat Faktur Transaksi, and Aktivitas Akun. The active tab should use a soft blue selected style.

Below the tabs create four summary cards: Total Software Dimiliki, Lisensi Aktif, Pembelian Terakhir, and Akun Terverifikasi. Each card must contain an icon, label, dominant value, and helper text.

Then create an owned-products toolbar containing a search field Cari produk atau lisensi..., filters Semua Status and Semua Kategori, a sort selector Terbaru, and a compact grid/list view toggle.

The core section must be a premium two-column product grid of owned products. Each product card must contain a category badge, version badge, active status badge, product title, a dark premium license module, an order reference row, purchase date, and action buttons.

The dark license module must visually stand out and include the label Kunci Lisensi Resmi (Commercial Standard), a large visible monospace license key, a Verified Commercial indicator, and a Salin button. Use a dark navy gradient background and ensure the license key is the focal point.

Include the following sample products for UI development: SaaS Multi-Tenant Boilerplate Starter, E-Commerce Admin & Live POS Terminal Kit, and Fintech Mobile Banking App Template. Use category examples SAAS SYSTEMS, SOURCE CODE, and MOBILE APPS, version examples v2.4.0, v1.8.2, and v3.1.0, and order reference example KYY-ORD-QVJ66E.

Each product card should contain these actions: a primary button Unduh ZIP, a secondary button Akses GitHub, and a tertiary text action Beri Ulasan.

Keep the page in Bahasa Indonesia, preserve KyySolutions branding, and ensure the design looks more professional and complete than a typical marketplace account page.

Add subtle micro-interactions such as summary-card entrance, card hover elevation, tab hover feedback, copy-button feedback, and soft button transitions. Do not use distracting animation loops or flashy effects.

Implement loading skeletons, empty states, error states, visible focus states, responsive behavior, keyboard accessibility, and proper server-authorized ownership behavior. Do not expose protected delivery URLs publicly.

Desktop should use a slim left utility rail and a two-column product grid. Tablet collapses the utility rail and uses a single-column product layout. Mobile becomes a single-column buyer portal with scrollable tabs and stacked action buttons.

This page must feel like a premium software ownership hub and customer portal, not an admin dashboard or a plain ecommerce downloads page.

90. IMPLEMENTATION PRIORITY

When priorities conflict:

1. Security / ownership rules
2. Data correctness
3. Business rules
4. buyer_hub_design.md
5. Approved global design system
6. Motion polish
7. AI assumptions
91. FINAL NOTE FOR AI AGENT

Do not implement this page as a generic “My Downloads” screen.

Implement it as a Buyer Hub for premium digital product ownership.

The buyer must immediately understand:

what I own
whether my licenses are active
how to download
how to access source/resources
how to trust the platform

The final result must look world-class, highly polished, and clearly part of the KyySolutions ecosystem.