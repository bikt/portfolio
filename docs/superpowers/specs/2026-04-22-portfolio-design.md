# Portfolio Website — Design Spec
**Date:** 2026-04-22  
**Status:** Approved  

---

## 1. Overview

Personal portfolio website for a Product UX/UI Designer. Functions as a professional business card showcasing case studies. Target audiences: potential clients (freelance), product colleagues, and mixed professional network.

---

## 2. Goals

- Demonstrate product thinking and design quality through case studies
- Create a memorable, distinct identity among designer portfolios
- Support client acquisition and professional networking
- Present work bilingually (Russian primary, English secondary)

---

## 3. Visual Direction

**Style:** Swiss International Typographic Style + Editorial / Index aesthetics  
**Reference sites:** gregorylalle.com, comence.ru, thomasmonavon.com, irene-butenko.com

**Core principles (all 7 must be present throughout):**
1. Много воздуха — generous whitespace, no clutter
2. Контрформы — negative space used as a design element (large ghost numbers/letters)
3. Контраст — extreme scale contrast in typography and shapes
4. Швейцарский стиль — strict grid, Helvetica-adjacent type, systematic layout
5. Минимализм — only what is necessary
6. Нестандартные решения — anti-portfolio aesthetics where other portfolios use grids
7. Асимметрия — intentional asymmetric compositions

**Color palette:**
- Background: `#0a0a0a` (near-black)
- Primary text: `#ffffff`
- Secondary text: `rgba(255,255,255,0.4)`
- Borders/dividers: `rgba(255,255,255,0.08)`
- Counterforms: `rgba(255,255,255,0.025)`
- No accent color — contrast comes from scale, not hue

**Typography:**
- Display: system serif or Playfair Display — for hero name, outline variant
- Body/UI: Helvetica Neue / Inter — for nav, labels, body
- Scale contrast: 96px hero name vs 11px labels (ratio ~9:1)

---

## 4. Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 14 (App Router) | SEO, i18n, file-based routing, Vercel-native |
| Styling | Tailwind CSS | Utility-first, fast iteration |
| Content | MDX (local files) | Flexible per-case structure, no CMS needed for 4–6 cases |
| i18n | next-intl | RU/EN switching, URL-based locale (`/ru/`, `/en/`) |
| Deployment | Vercel | Zero-config, preview deployments |
| Repo | GitHub | Version control + Vercel integration |
| Animations | Framer Motion | Smooth page transitions, hover effects |

---

## 5. Site Structure

```
/                    → Home (hero + case index + about snippet)
/work/[slug]         → Case study page (flexible MDX content)
/about               → About + contact

# With i18n:
/ru/                 → Russian home
/en/                 → English home
/ru/work/[slug]      → Russian case
/en/work/[slug]      → English case
```

---

## 6. Page Designs

### 6.1 Home Page

**Navigation (fixed, top):**
- Left: Designer name (small caps, muted)
- Right: Work · About · `RU / EN` switcher
- Transparent background, no border

**Hero Section (100vh):**
- Role label: 11px uppercase, muted — `Product UX/UI Designer`
- Name: 96px+ bold, tight leading, letter-spacing -0.04em
  - Last word or line rendered as outline (text-stroke) — creates contrast and counterform
- Counterform: large ghost text (`UX` or index number) positioned right, ~28vw, opacity 2.5%
- Right column (asymmetric, ~320px): horizontal rule + 2–3 line description + skill tags
- Scroll hint: small line + `Работы` label, bottom-left

**Case Index:**
- Section label: `Избранные работы` / `Selected Work` — 11px uppercase, muted
- Each row: `[NN] · [Case Title] · [Tags] · [Year] →`
- Grid: `64px | 1fr | 140px | 80px`
- Hover: row background tint + arrow appears + title brightens
- Divider: 1px `rgba(255,255,255,0.06)` between rows

**About Snippet (bottom of home):**
- 2-column grid: left = 1–2 sentence philosophy statement, right = contact links
- Contact links: email, Telegram, LinkedIn — each with `↗` indicator
- Divider above section

### 6.2 Case Page (`/work/[slug]`)

**Structure:** Flexible per case — defined in MDX frontmatter + content  
**Fixed elements every case must have:**
- Case title (large, hero-style)
- Role + year + type tags
- Back navigation `← Work`
- Next case link at bottom

**Optional artifact blocks (mix per case):**
- `<Problem />` — brief statement, muted large text
- `<Research />` — methods, findings, insights
- `<UserJourney />` — journey map or flow diagram
- `<Wireframes />` — image gallery with captions
- `<FinalDesign />` — full-width screenshots
- `<Metrics />` — before/after numbers
- `<Quote />` — pull quote from user research

**Case page visual rules:**
- Same dark background, same type scale
- Images: full-width or constrained to ~840px column, with generous vertical spacing
- No sidebar — linear scroll narrative

### 6.3 About Page

- Short bio (2–3 paragraphs)
- Approach / philosophy
- Experience timeline (minimal, text-only)
- Contact section: email, Telegram, LinkedIn, CV download

---

## 7. Content Strategy

- **Language:** Russian as default, English toggle
- **Cases at launch:** 4–6 (placeholder content in first deploy, replaced progressively)
- **MDX files location:** `content/work/[slug]/index.ru.mdx` + `index.en.mdx`
- **Case metadata** (frontmatter): `title`, `year`, `type`, `tags[]`, `cover`, `role`, `draft`

---

## 8. Key Interactions

| Interaction | Behavior |
|---|---|
| Case row hover | Background tint, arrow slides in, title to white |
| Page transitions | Framer Motion fade+slide (subtle, <300ms) |
| Language switch | Instant, preserves current page |
| Case images | Lazy load, no lightbox (fullscreen is enough) |
| Mobile nav | Hamburger → full-screen overlay menu |

---

## 9. Responsive Breakpoints

| Breakpoint | Changes |
|---|---|
| `< 768px` | Single column, hero name scales down, case rows collapse to 2 cols |
| `768–1024px` | Reduced padding, nav links visible |
| `> 1024px` | Full layout as designed |

---

## 10. Out of Scope (v1)

- Blog / writing section
- Password-protected cases
- CMS / admin panel
- Analytics beyond Vercel
- Dark/light mode toggle (dark only)

---

## 11. Success Criteria

- Loads in < 2s on Vercel
- All 7 visual principles present and recognizable
- Case pages readable on mobile
- Language switch works without page reload feel
- Passes Lighthouse accessibility score > 85
