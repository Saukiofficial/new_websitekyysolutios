# KyySolutions — Super Admin Login Design Specification

**File:** `design_login_admin.md`  
**Project:** KyySolutions  
**Module:** Super Admin Authentication  
**Purpose:** Master UI/UX prompt and implementation specification for AI coding/design agents.

---

# 1. MASTER GOAL

Build a **high-fidelity, premium, secure-looking Super Admin Login Page** for **KyySolutions**.

KyySolutions is a digital technology startup with three connected business areas:

1. Digital Technology Services
2. Digital Products
3. Multi-vendor Marketplace

The login page is specifically for:

```text
Super Admin / Administrator
```

It is not a buyer login page.

It is not a seller login page.

It is not a generic user authentication page.

The page must immediately communicate:

- secure administrative access,
- professional startup infrastructure,
- premium SaaS quality,
- operational control,
- trustworthy platform management,
- strong KyySolutions branding.

The page should visually feel like the entry point to the KyySolutions operational command center.

---

# 2. DESIGN DIRECTION

Use a **split-screen desktop layout**.

Recommended composition:

```text
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  DARK BRAND / HERO PANEL        │        LOGIN AREA                 │
│                                 │                                   │
│  KyySolutions                   │      Secure Admin Access          │
│                                 │                                   │
│  Panel Super Admin              │      ┌───────────────────────┐    │
│  KyySolutions                   │      │                       │    │
│                                 │      │  Masuk Super Admin    │    │
│  Description                    │      │                       │    │
│                                 │      │  Email                │    │
│  Feature cards                  │      │  Password             │    │
│                                 │      │  OTP                  │    │
│  Analytics illustration         │      │                       │    │
│                                 │      │  Login Button         │    │
│                                 │      │                       │    │
│                                 │      └───────────────────────┘    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

Recommended desktop ratio:

```text
Left visual panel: 58%
Right login area: 42%
```

Acceptable range:

```text
Left: 55%–60%
Right: 40%–45%
```

---

# 3. DESIGN CHARACTER

The page should feel:

```text
Modern
Premium
Secure
Minimal
Corporate
Technology-focused
Startup-grade
Professional
Operational
```

Avoid:

```text
Gaming
Cyberpunk
Neon
Glass-heavy
Crypto dashboard
Overly colorful
Old Bootstrap admin template
Generic login template
```

---

# 4. BRAND COLOR SYSTEM

## Primary Blue

```text
#2563EB
```

Use this for:

- primary buttons,
- active controls,
- links,
- security accents,
- icons,
- focus states.

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

# 5. LEFT HERO PANEL COLORS

Primary background:

```text
#06152E
```

Gradient option:

```css
background:
linear-gradient(
    180deg,
    #06152E 0%,
    #071A38 52%,
    #041126 100%
);
```

Subtle blue highlight:

```text
#0A2A57
```

Text:

```text
Primary white: #FFFFFF
Secondary:     #D5DEEB
Muted:         #8EA0B8
```

Decorative lines:

```text
rgba(37, 99, 235, 0.16)
```

Decorative dots:

```text
rgba(96, 165, 250, 0.20)
```

---

# 6. RIGHT PAGE COLORS

Main page background:

```text
#F8FAFC
```

Alternative:

```text
#F7F9FC
```

Login card:

```text
#FFFFFF
```

Card border:

```text
#E2E8F0
```

Primary text:

```text
#0F172A
```

Secondary text:

```text
#64748B
```

Muted text:

```text
#94A3B8
```

Input background:

```text
#FFFFFF
```

---

# 7. SEMANTIC COLORS

Success:

```text
#22C55E
```

Warning:

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

Purple accent:

```text
#7C3AED
```

Teal accent:

```text
#0D9488
```

These colors should appear only as supporting accents.

Blue remains the main brand color.

---

# 8. TYPOGRAPHY

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

---

# 9. TYPOGRAPHY SCALE

Hero eyebrow:

```text
12px
font-weight: 600
letter-spacing: 0.03em
```

Hero title:

```text
42px–48px
font-weight: 700
line-height: 1.15
```

Hero description:

```text
16px
line-height: 1.7
color: #D5DEEB
```

Login heading:

```text
24px
font-weight: 700
line-height: 32px
```

Login supporting text:

```text
14px
line-height: 20px
color: #64748B
```

Form label:

```text
13px
font-weight: 500
color: #0F172A
```

Input text:

```text
14px
```

Helper text:

```text
12px
color: #94A3B8
```

---

# 10. PAGE CONTAINER

Desktop page:

```text
min-height: 100vh
```

Outer page padding:

```text
18px–24px
```

Recommended:

```css
.auth-page {
    min-height: 100vh;
    background: #F8FAFC;
    padding: 20px;
}
```

Main split panel:

```text
width: 100%
min-height: calc(100vh - 40px)
```

---

# 11. LEFT PANEL

The left panel is the main brand experience.

Recommended:

```text
border-radius: 18px
padding: 46px–54px
overflow: hidden
position: relative
```

Desktop content should have 3 layers:

```text
1. Brand
2. Marketing / positioning copy
3. Admin analytics/security visual
```

---

# 12. LEFT PANEL BRAND AREA

Top-left:

```text
[K Logo] KyySolutions
```

Logo size:

```text
36px–40px
```

Brand text:

```text
18px–20px
font-weight: 700
color: white
```

Spacing:

```text
gap: 12px
```

---

# 13. HERO EYEBROW BADGE

Below logo after generous spacing:

```text
[Shield Icon] PANEL SUPER ADMIN
```

Badge style:

```text
height: 32px
padding: 0 12px
border-radius: 7px
background: rgba(37,99,235,0.20)
border: 1px solid rgba(96,165,250,0.14)
```

Text:

```text
12px
font-weight: 600
color: #60A5FA
```

Icon:

```text
ShieldCheck
```

---

# 14. HERO TITLE

Use:

```text
Panel Super Admin
KyySolutions
```

Recommended:

```text
font-size: 46px
font-weight: 700
color: white
```

Maximum width:

```text
500px
```

Do not make the heading span the full panel.

---

# 15. HERO DESCRIPTION

Text:

```text
Kelola marketplace, layanan, produk digital, seller,
transaksi, dan operasional platform dalam satu
pusat kontrol.
```

Recommended width:

```text
430px–500px
```

Style:

```text
font-size: 16px
line-height: 1.7
color: #D5DEEB
```

---

# 16. FEATURE CARDS

Create 3 compact admin value cards.

Layout:

```text
Vertical stack
```

Each card approximately:

```text
width: 360px–390px
min-height: 86px
padding: 16px
border-radius: 10px
```

Background:

```text
rgba(255,255,255,0.035)
```

Border:

```text
1px solid rgba(255,255,255,0.07)
```

Hover:

```text
background: rgba(255,255,255,0.055)
```

---

# 17. FEATURE CARD 1

Title:

```text
Monitoring Revenue
```

Description:

```text
Pantau pendapatan, order, dan performa
platform secara real-time.
```

Icon:

```text
ChartNoAxesCombined
```

Icon color:

```text
#60A5FA
```

Icon container:

```text
44px × 44px
background: rgba(37,99,235,0.20)
```

---

# 18. FEATURE CARD 2

Title:

```text
Moderasi Produk & Seller
```

Description:

```text
Kelola dan moderasi produk, seller, serta
konten untuk menjaga kualitas platform.
```

Icon:

```text
UsersRound / ShieldCheck
```

Accent:

```text
#A78BFA
```

Icon background:

```text
rgba(124,58,237,0.18)
```

---

# 19. FEATURE CARD 3

Title:

```text
Kontrol Pembayaran & Withdrawal
```

Description:

```text
Kontrol pembayaran, komisi, dan withdrawal
dengan sistem yang aman dan transparan.
```

Icon:

```text
WalletCards
```

Accent:

```text
#4ADE80
```

Icon background:

```text
rgba(34,197,94,0.16)
```

---

# 20. LEFT VISUAL ILLUSTRATION AREA

Use a premium layered dashboard illustration.

It must visually reinforce:

```text
Revenue
Orders
Marketplace
Security
```

Recommended composition:

```text
                 ┌──────────────┐
                 │ Total Orders │
                 │ 3.842        │
                 └──────────────┘

        ┌───────────────────────────┐
        │ Total Revenue             │
        │ Rp 1.248.750.000          │
        │                           │
        │       LINE CHART          │
        │                           │
        └───────────────────────────┘

        ┌─────────────────┐
        │ Sumber Revenue  │
        │   DONUT CHART   │
        └─────────────────┘

                    [Shield Check]
```

Do not overload the illustration.

---

# 21. REVENUE MINI CARD

Recommended:

```text
width: 340px
height: 210px
```

Style:

```text
background: rgba(255,255,255,0.95)
border-radius: 16px
transform: rotate(-2deg)
box-shadow: 0 25px 50px rgba(0,0,0,0.22)
```

Content:

```text
Total Revenue
Rp 1.248.750.000
+18.6%
```

Mini chart:

```text
smooth upward blue line
```

Do not use full dashboard complexity.

---

# 22. TOTAL ORDER FLOATING CARD

Small floating card:

```text
Total Orders

3.842

+12.4%
```

Recommended:

```text
width: 140px
height: 92px
```

Position:

```text
top-right of revenue card
```

Slight rotate:

```text
-4deg to +4deg
```

---

# 23. MINI DONUT CARD

Display:

```text
Sumber Revenue
```

Legend:

```text
Produk Digital  63%
Services        25%
Marketplace     12%
```

Colors:

```text
Blue
Green
Amber
```

---

# 24. SECURITY SHIELD

Use a strong shield-check visual.

Recommended:

```text
large blue gradient shield
```

Colors:

```text
#2563EB
#60A5FA
```

Use subtle light reflection.

Do not make it cartoonish.

---

# 25. LEFT PANEL DECORATION

Allowed:

```text
thin curved lines
small square dot pattern
soft circles
soft blue radial glows
```

Do not use:

```text
stars
neon lightning
complex 3D scene
busy illustrations
```

Decoration must remain behind the content.

---

# 26. LEFT FOOTER SECURITY TEXT

At bottom:

```text
[Shield Icon]
Keamanan tingkat enterprise untuk melindungi data dan operasional platform.
```

Style:

```text
font-size: 11px–12px
color: #8EA0B8
```

---

# 27. RIGHT LOGIN AREA

Use a calm and bright login region.

Desktop:

```text
display: flex
align-items: center
justify-content: center
```

Login card width:

```text
520px–580px
```

Recommended:

```text
560px
```

---

# 28. TOP RIGHT PAGE CONTROLS

Place above login card:

```text
[Lock] Secure Admin Access

[Globe] ID ▼
```

These controls should be compact and subtle.

Recommended:

```text
height: 36px
border-radius: 9px
border: 1px solid #E2E8F0
background: white
```

Do not distract from login.

---

# 29. LOGIN CARD

Card style:

```text
background: #FFFFFF
border: 1px solid #E2E8F0
border-radius: 18px
padding: 40px–44px
```

Shadow:

```css
box-shadow:
0 8px 30px rgba(15,23,42,0.06),
0 2px 8px rgba(15,23,42,0.03);
```

---

# 30. LOGIN SECURITY ICON

Top center of login card:

```text
ShieldCheck
```

Icon circle:

```text
68px × 68px
border-radius: 50%
background: #EFF6FF
```

Icon:

```text
32px
color: #2563EB
```

Optional outer soft ring:

```text
rgba(37,99,235,0.08)
```

---

# 31. LOGIN HEADING

Title:

```text
Masuk Super Admin
```

Subtitle:

```text
Masuk untuk mengakses panel administrasi KyySolutions.
```

Centered alignment is recommended.

Spacing:

```text
icon → heading: 18px
heading → subtitle: 8px
subtitle → form: 28px–32px
```

---

# 32. FORM STRUCTURE

Form order:

```text
Email

Password

Kode Verifikasi / OTP (Opsional)

Remember Me        Forgot Password

Primary Login Button

Secondary Website Button

Security Note
```

---

# 33. EMAIL FIELD

Label:

```text
Email
```

Placeholder / sample:

```text
admin@kyysolutions.com
```

Icon:

```text
Mail
```

Input height:

```text
44px–46px
```

Input radius:

```text
10px
```

Border:

```text
#CBD5E1
```

Focus:

```text
border-color: #60A5FA
box-shadow: 0 0 0 3px rgba(37,99,235,0.08)
```

---

# 34. PASSWORD FIELD

Label:

```text
Password
```

Leading icon optional.

Trailing icon:

```text
Eye / EyeOff
```

Input must support:

```text
show/hide password
```

Do not use text-only toggle.

---

# 35. OTP FIELD

Label:

```text
Kode Verifikasi / OTP
```

Supporting state:

```text
Opsional
```

Placeholder:

```text
Masukkan kode OTP
```

Leading icon:

```text
ShieldCheck / KeyRound
```

Right action:

```text
Kirim OTP
```

The action can be inside the input group.

Recommended:

```text
button style: text / subtle
color: #2563EB
```

Do not make it equal visual weight to the primary login button.

---

# 36. OTP DESIGN RULE

If the backend does not support OTP yet:

```text
Do not fake successful OTP verification.
```

Instead:

```text
- hide OTP,
or
- show disabled placeholder,
or
- implement only after the authentication flow exists.
```

UI must reflect real backend capabilities.

---

# 37. REMEMBER ME

Left side:

```text
[✓] Ingat saya
```

Checkbox:

```text
16px
rounded: 4px
checked background: #2563EB
```

---

# 38. FORGOT PASSWORD

Right side:

```text
Lupa password?
```

Style:

```text
font-size: 13px
font-weight: 500
color: #2563EB
```

Hover:

```text
text-decoration: underline
```

---

# 39. PRIMARY LOGIN BUTTON

Text:

```text
Masuk ke Dashboard
```

Leading icon:

```text
LockKeyhole
```

Height:

```text
46px–48px
```

Width:

```text
100%
```

Background:

```text
#2563EB
```

Hover:

```text
#1D4ED8
```

Pressed:

```text
#1E40AF
```

Text:

```text
white
font-size: 14px
font-weight: 600
```

Radius:

```text
9px–10px
```

---

# 40. PRIMARY BUTTON LOADING STATE

When submitting:

```text
[spinner] Memverifikasi...
```

Disable the button.

Do not allow double submit.

---

# 41. SECONDARY BUTTON

Text:

```text
Kembali ke Website
```

Icon:

```text
Globe2 / ArrowLeft
```

Style:

```text
background: white
border: 1px solid #CBD5E1
color: #0F172A
```

Hover:

```text
background: #F8FAFC
```

---

# 42. SECURITY NOTE

Bottom:

```text
[Lock]
Akses terbatas hanya untuk administrator yang berwenang.
```

Centered.

Style:

```text
font-size: 12px
color: #64748B
```

---

# 43. FORM SPACING

Recommended:

```text
label → input:     7px
field → field:     18px
form → helper row: 16px
helper → primary:  18px
primary → secondary: 10px
secondary → note:  20px
```

---

# 44. INPUT ICON POSITIONING

Left icon:

```text
16px–18px
```

Padding left:

```text
44px
```

Right icon:

```text
16px–18px
```

Padding right:

```text
44px
```

---

# 45. ERROR STATE — FIELD

Example:

```text
Email atau password tidak valid.
```

Input:

```text
border-color: #EF4444
```

Error text:

```text
font-size: 12px
color: #DC2626
```

Optional icon:

```text
CircleAlert
```

---

# 46. LOGIN FAILURE MESSAGE

Display a compact alert above form:

```text
Login gagal

Email atau password yang Anda masukkan tidak sesuai.
```

Style:

```text
background: #FEF2F2
border: 1px solid #FECACA
color: #991B1B
border-radius: 10px
```

Do not expose:

```text
whether email exists
```

when security rules require generic errors.

---

# 47. LOGIN SUCCESS

After successful authentication:

```text
redirect → /admin/dashboard
```

Optional short state:

```text
Login berhasil. Mengarahkan ke dashboard...
```

Do not show a long success animation.

---

# 48. RATE LIMIT STATE

Admin login should support rate-limit messaging.

Example:

```text
Terlalu banyak percobaan login.
Silakan coba kembali beberapa saat lagi.
```

Use warning/danger visual.

---

# 49. SESSION SECURITY

Admin authentication should support server-side:

```text
session authentication
CSRF protection
rate limiting
secure cookies
session regeneration
authorization
```

UI design must not imply security that does not exist.

---

# 50. AUTHORIZATION RULE

Successful login is not sufficient by itself.

Server must verify:

```text
user has admin or super_admin permission
```

If a normal user logs in successfully but is not admin:

```text
deny /admin access
```

Do not rely only on hidden frontend routes.

---

# 51. RESPONSIVE DESIGN — DESKTOP >= 1440px

Use split-screen.

```text
Left: 58%
Right: 42%
```

Left panel retains:

```text
brand
hero
feature cards
analytics illustration
```

Login card centered vertically.

---

# 52. RESPONSIVE DESIGN — LAPTOP 1024px–1439px

Use approximately:

```text
Left: 52%
Right: 48%
```

Reduce hero title:

```text
38px–42px
```

Reduce visual illustration size.

Feature cards:

```text
width: 320px
```

Login card:

```text
width: min(480px, 90%)
```

---

# 53. TABLET 768px–1023px

Two recommended patterns.

Preferred:

```text
Hide large illustration.
Keep compact left brand area.
```

Layout:

```text
40% hero
60% login
```

or stack vertically if needed.

Feature cards can be reduced to:

```text
icons + short titles
```

---

# 54. MOBILE < 768px

Do not force split screen.

Use:

```text
single-column login experience
```

Recommended:

```text
KyySolutions Logo

Super Admin badge

Masuk Super Admin
Subtitle

Login form

Security note
```

The large left hero area should be hidden.

Optional compact top brand strip:

```text
dark navy
height: 120px–160px
```

Do not render analytics illustration on mobile.

---

# 55. MOBILE PAGE BACKGROUND

Use:

```text
#F8FAFC
```

Login card:

```text
width: 100%
border-radius: 14px
```

Outer padding:

```text
16px
```

Form controls:

```text
min-height: 46px
```

Touch targets should remain accessible.

---

# 56. MOBILE TOP BRAND

Example:

```text
[K Logo] KyySolutions

[Shield] Panel Super Admin
```

Use dark navy top section.

Do not include large paragraphs on narrow screens.

---

# 57. FOCUS STATES

All interactive elements must have visible focus state.

Example:

```css
outline: none;
box-shadow: 0 0 0 3px rgba(37,99,235,0.15);
```

Keyboard users must clearly see focus.

---

# 58. ACCESSIBILITY

Must include:

```text
semantic <form>
input labels
autocomplete attributes
aria-label on icon buttons
aria-live for authentication errors
keyboard support
contrast-compliant text
```

Password eye button must be keyboard accessible.

---

# 59. AUTOCOMPLETE

Use:

```text
Email:
autocomplete="username"

Password:
autocomplete="current-password"

OTP:
autocomplete="one-time-code"
```

---

# 60. SECURITY UI PRINCIPLE

The design should visually communicate security without making false claims.

Allowed security visuals:

```text
shield
lock
secure access badge
OTP
admin-only note
```

Avoid language like:

```text
100% unhackable
military-grade impossible to breach
```

---

# 61. PAGE DECORATION

Keep subtle.

Allowed:

```text
gradient curves
dot patterns
soft radial blue glows
thin line patterns
```

Opacity:

```text
0.05–0.18
```

Decoration must never reduce text readability.

---

# 62. CARD RADIUS SYSTEM

Left hero panel:

```text
18px
```

Login card:

```text
18px
```

Inputs:

```text
10px
```

Buttons:

```text
9px–10px
```

Feature cards:

```text
10px
```

Badges:

```text
7px–999px depending type
```

---

# 63. SHADOW SYSTEM

Login card:

```css
box-shadow:
0 8px 30px rgba(15,23,42,0.06),
0 2px 8px rgba(15,23,42,0.03);
```

Illustration cards:

```css
box-shadow:
0 20px 50px rgba(0,0,0,0.20);
```

Buttons:

```text
No large shadow required.
```

---

# 64. LOGIN COMPONENT TREE

Recommended:

```text
SuperAdminLoginPage
│
├── AuthSplitLayout
│   ├── AdminAuthHero
│   │   ├── BrandLogo
│   │   ├── AdminBadge
│   │   ├── HeroCopy
│   │   ├── AdminFeatureList
│   │   │   ├── FeatureItem
│   │   │   ├── FeatureItem
│   │   │   └── FeatureItem
│   │   ├── AdminAnalyticsIllustration
│   │   └── SecurityFooter
│   │
│   └── AdminLoginSection
│       ├── AuthTopControls
│       └── AdminLoginCard
│           ├── SecurityIcon
│           ├── LoginHeading
│           ├── LoginAlert
│           ├── LoginForm
│           │   ├── EmailField
│           │   ├── PasswordField
│           │   ├── OTPField
│           │   ├── RememberForgotRow
│           │   ├── LoginButton
│           │   └── WebsiteButton
│           └── SecurityNote
```

---

# 65. REUSABLE COMPONENTS

AI Agent should prefer reusable components:

```text
AuthInput
PasswordInput
OtpInput
AuthAlert
PrimaryButton
SecondaryButton
BrandLogo
SecurityBadge
FeatureCard
AdminAuthIllustration
```

Do not duplicate form field markup.

---

# 66. LOGIN PAGE STATES

Required states:

```text
Default
Hover
Focus
Typing
Invalid field
Submitting
Login failed
Rate limited
OTP sending
OTP sent
OTP invalid
Success redirect
```

---

# 67. OTP SEND STATE

Default:

```text
Kirim OTP
```

Sending:

```text
Mengirim...
```

Sent:

```text
Kirim ulang 59s
```

Do not allow repeated spam requests.

---

# 68. LOGIN BUTTON STATES

Default:

```text
Masuk ke Dashboard
```

Hover:

```text
darker blue
```

Loading:

```text
spinner + Memverifikasi...
```

Disabled:

```text
opacity: 0.65
cursor: not-allowed
```

---

# 69. REMEMBER ME SECURITY

Remember-me behavior must use backend-supported secure persistent session mechanisms.

Do not manually store admin password/token in:

```text
localStorage
```

Do not store plaintext authentication credentials.

---

# 70. PASSWORD FIELD RULES

Never log password values.

Never send password to analytics.

Never expose password in error messages.

---

# 71. AUTH LAYOUT BEHAVIOR

The login page should not include the full admin sidebar.

It is a dedicated authentication screen.

Do not show:

```text
Dashboard sidebar
admin navigation
dashboard charts as real navigable content
```

Only use simplified illustration cards in the left visual.

---

# 72. LANGUAGE

Primary interface language:

```text
Bahasa Indonesia
```

Top-right language selector may display:

```text
ID
```

Future support:

```text
ID
EN
```

Do not mix random English labels inside the form.

"Secure Admin Access" is acceptable as a small security badge.

---

# 73. LOGIN URL

Recommended:

```text
/admin/login
```

After successful login:

```text
/admin/dashboard
```

If an authenticated admin visits login:

```text
redirect to /admin/dashboard
```

---

# 74. FORGOT PASSWORD URL

Recommended:

```text
/admin/forgot-password
```

or shared authentication reset flow with admin guards.

Do not send users into buyer-oriented UI.

---

# 75. RETURN TO WEBSITE

Button:

```text
Kembali ke Website
```

Destination:

```text
/
```

or approved KyySolutions public homepage.

---

# 76. SECURITY BADGE

Top-right:

```text
[Lock] Secure Admin Access
```

Style:

```text
background: white
border: 1px solid #E2E8F0
color: #334155
```

Small and professional.

---

# 77. FORM WIDTH

Input width:

```text
100%
```

Form content max width inside card:

```text
100%
```

Do not use narrow centered inputs inside a wide card.

---

# 78. LOGIN PAGE DATA RULE

Do not hardcode real production admin credentials.

Placeholder:

```text
admin@kyysolutions.com
```

is only an example UI placeholder.

Never seed a production password into frontend code.

---

# 79. ERROR COPY

Recommended generic authentication message:

```text
Email atau password tidak valid.
```

For inactive admin:

```text
Akun administrator tidak dapat digunakan saat ini.
Silakan hubungi administrator utama.
```

For OTP failure:

```text
Kode verifikasi tidak valid atau sudah kedaluwarsa.
```

---

# 80. SUCCESS REDIRECT

After successful login:

```text
Dashboard Super Admin
```

Do not redirect to marketplace homepage.

---

# 81. PAGE PERFORMANCE

Authentication page should load quickly.

Avoid:

```text
large animation libraries
heavy video background
multi-megabyte hero image
unnecessary dashboard API requests
```

Illustration should be:

```text
CSS
SVG
lightweight component
or optimized static visual
```

---

# 82. ANIMATION

Allowed animation:

```text
fade
slight translate
subtle illustration float
button spinner
```

Recommended duration:

```text
150ms–400ms
```

Optional hero floating cards:

```text
very slow subtle movement
```

Do not animate continuously in a distracting way.

---

# 83. LOGIN ENTRY ANIMATION

Desktop:

```text
Hero content:
opacity 0 → 1
translateY 8px → 0

Login card:
opacity 0 → 1
translateY 6px → 0
```

Duration:

```text
350ms–450ms
```

---

# 84. VISUAL BALANCE

The left side must not overpower the login card.

The right side must remain the obvious actionable area.

Visual priority:

```text
1. Login form
2. KyySolutions brand
3. Admin security
4. Hero information
5. Decorative analytics illustration
```

---

# 85. DESIGN QUALITY RULES

The design must NOT look like:

```text
a generic auth template
a WordPress admin login
a basic centered card with no identity
a dark hacker login page
a crypto exchange login
a game login screen
```

It should look custom-built for KyySolutions.

---

# 86. DO NOT

AI Agent must NOT:

```text
- use random primary purple
- remove KyySolutions branding
- replace navy panel with bright gradient
- use neon effects
- use glassmorphism for the main card
- place the login form inside the dark hero panel on desktop
- use huge rounded 30px inputs
- use emoji icons
- expose admin credentials
- store password in localStorage
- implement frontend-only authentication
- show different error text that reveals whether an email exists
- create a fake OTP flow unsupported by backend
- use dashboard sidebar on login page
```

---

# 87. FINAL DESKTOP COMPOSITION

The final desktop screen should approximate:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                                                Secure Admin Access  ID │
│ ┌────────────────────────────────┐   ┌───────────────────────────────┐ │
│ │                                │   │                               │ │
│ │  KyySolutions                  │   │        [Shield]               │ │
│ │                                │   │                               │ │
│ │  [Panel Super Admin]           │   │      Masuk Super Admin        │ │
│ │                                │   │                               │ │
│ │  Panel Super Admin             │   │  Email                        │ │
│ │  KyySolutions                  │   │  [admin@kyysolutions.com]     │ │
│ │                                │   │                               │ │
│ │  Kelola marketplace...         │   │  Password                     │ │
│ │                                │   │  [••••••••••••      Eye]      │ │
│ │  [Monitoring Revenue]          │   │                               │ │
│ │                                │   │  Kode OTP                     │ │
│ │  [Moderasi Produk & Seller]    │   │  [Masukkan kode     Kirim]    │ │
│ │                                │   │                               │ │
│ │  [Kontrol Pembayaran]          │   │  ☑ Ingat saya   Lupa password │ │
│ │                                │   │                               │ │
│ │        [Revenue Chart]         │   │  [ Masuk ke Dashboard ]       │ │
│ │      [Donut] [Shield]          │   │                               │ │
│ │                                │   │  [ Kembali ke Website ]       │ │
│ │ Security note                  │   │                               │ │
│ └────────────────────────────────┘   └───────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

---

# 88. FINAL UX EXPECTATION

The page should make the admin feel:

```text
This is a secure, controlled administrative gateway.
```

The form should be simple enough to log in quickly while the overall visual supports:

```text
trust
brand
security
operational scale
```

---

# 89. IMPLEMENTATION PRIORITY

Prioritize:

```text
1. Authentication correctness
2. Admin authorization
3. Form usability
4. Responsive layout
5. Error handling
6. Security states
7. KyySolutions visual consistency
8. Decorative illustration
```

Decorative visuals must never be prioritized over authentication reliability.

---

# 90. MASTER PROMPT — READY FOR AI CODING AGENT

Use the following prompt:

> Build the KyySolutions Super Admin login page based on `design_login_admin.md`.
>
> Treat this document as the primary source of truth for the Super Admin authentication UI.
>
> Create a premium SaaS-style split-screen login page. On desktop, use a dark navy KyySolutions brand panel on the left and a bright, centered login area on the right.
>
> The left hero panel must use a deep navy gradient based on `#06152E`, KyySolutions branding, a `PANEL SUPER ADMIN` security badge, the heading `Panel Super Admin KyySolutions`, a short description explaining that the admin manages marketplace, services, digital products, sellers, transactions, and platform operations, and three feature cards: `Monitoring Revenue`, `Moderasi Produk & Seller`, and `Kontrol Pembayaran & Withdrawal`.
>
> Add a lightweight premium analytics illustration in the left panel containing a Revenue card, Total Orders floating card, Revenue Source donut chart, and Shield Check visual. These are decorative admin visuals only and must not trigger real dashboard API requests.
>
> The right side must use page background `#F8FAFC` and contain a white login card with subtle `#E2E8F0` border, approximately 18px radius, and soft professional shadow.
>
> The login card must include a blue shield icon, heading `Masuk Super Admin`, subtitle `Masuk untuk mengakses panel administrasi KyySolutions.`, Email field, Password field with show/hide button, optional OTP field if supported by the backend, `Ingat saya`, `Lupa password?`, a primary blue `Masuk ke Dashboard` button, a secondary `Kembali ke Website` action, and an admin-only security note.
>
> Use Inter typography, primary blue `#2563EB`, main text `#0F172A`, secondary text `#64748B`, muted text `#94A3B8`, white inputs, 10px input radius, 44–46px input height, and clear focus rings.
>
> Use Lucide icons consistently. Do not use emojis.
>
> Implement the page responsively. Desktop uses approximately 58/42 split layout. Laptop reduces hero content. Tablet simplifies or hides the large analytics illustration. Mobile must become a single-column login page and hide the large hero illustration.
>
> Implement real form states: default, focus, invalid, submitting, login error, rate-limited, OTP sending/sent/invalid if OTP exists, and successful redirect.
>
> The login button must disable while submitting and show a spinner with `Memverifikasi...`.
>
> Do not hardcode real admin credentials. `admin@kyysolutions.com` may only be used as placeholder/demo text.
>
> Never store passwords or raw admin authentication credentials in localStorage.
>
> Authentication, rate limiting, session handling, and Super Admin authorization must be enforced server-side. A successful authentication for a non-admin user must not grant access to `/admin/*`.
>
> Use the route `/admin/login` for the login page and redirect authenticated authorized admins to `/admin/dashboard`.
>
> If OTP is not actually supported by the backend, do not implement a fake OTP success flow. Hide or disable the OTP UI until backend support exists.
>
> Reuse existing KyySolutions design-system components where possible. Keep form logic separate from visual components. Do not refactor unrelated application code.
>
> Do not redesign the brand, change the primary palette, add excessive gradients, glassmorphism, neon effects, giant headings, oversized input controls, or a full dashboard sidebar to the login page.
>
> The final page must visually feel like the secure entry point to the KyySolutions operations command center, not a generic login template.

---

# 91. DOCUMENT PRIORITY

If implementation instructions conflict:

```text
1. Authentication / Security Requirements
2. PRD / Business Rules
3. design_login_admin.md
4. Approved Global Design System
5. Individual AI Agent Prompt
6. AI Agent Assumptions
```

Security requirements always override decorative design.

---

# 92. FINAL NOTE FOR AI AGENT

Do not implement the page only to visually match a screenshot.

Implement:

```text
real responsive structure
real form behavior
real validation states
real server authentication
real authorization
real accessible controls
```

Visual fidelity and application correctness are both required.

---

**End of `design_login_admin.md`**
