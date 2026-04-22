# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a bilingual (RU/EN) product designer portfolio with Next.js 14, Swiss-style dark aesthetic, MDX case studies, and Vercel hosting.

**Architecture:** Next.js 14 App Router with `[locale]` dynamic segment for i18n routing via next-intl. Content lives in local MDX files per case per language. Pages: Home (hero + case index + about snippet), Case (`/work/[slug]`), About.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, next-intl, MDX (@next/mdx + gray-matter), Framer Motion, Vercel

---

## File Map

```
portfolio/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx            # Root layout — fonts, i18n provider, nav
│   │   ├── page.tsx              # Home — hero + case index + about snippet
│   │   ├── about/page.tsx        # About page
│   │   └── work/
│   │       └── [slug]/page.tsx   # Case study page
│   └── globals.css               # Tailwind base + custom CSS vars
├── components/
│   ├── Nav.tsx                   # Fixed navigation + language switcher
│   ├── HeroSection.tsx           # Hero with name, counterform, tags
│   ├── CaseIndex.tsx             # Numbered case list with hover
│   ├── AboutSnippet.tsx          # 2-col about + contact links
│   └── mdx/
│       ├── Problem.tsx           # Case artifact: problem statement
│       ├── Research.tsx          # Case artifact: research block
│       ├── FinalDesign.tsx       # Case artifact: full-width images
│       ├── Metrics.tsx           # Case artifact: before/after numbers
│       └── Quote.tsx             # Case artifact: pull quote
├── content/
│   └── work/
│       ├── fintech-payment/
│       │   ├── index.ru.mdx
│       │   └── index.en.mdx
│       └── b2b-saas-onboarding/
│           ├── index.ru.mdx
│           └── index.en.mdx
├── lib/
│   └── cases.ts                  # Read + parse MDX frontmatter, list cases
├── messages/
│   ├── ru.json                   # Russian UI strings
│   └── en.json                   # English UI strings
├── middleware.ts                  # next-intl locale routing
├── i18n.ts                       # next-intl config
├── next.config.mjs               # MDX + next-intl config
└── tailwind.config.ts            # Custom fonts, colors, spacing
```

---

## Task 1: Project Init + GitHub + Vercel

**Files:**
- Create: all root config files (`package.json`, `next.config.mjs`, `tailwind.config.ts`, `tsconfig.json`)
- Create: `app/globals.css`
- Create: `.gitignore`

- [ ] **Step 1: Initialize Next.js project**

```bash
cd C:/Users/mrbik/Desktop/claude/portfolio
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --no-eslint
```

When prompted: Yes to TypeScript, Yes to Tailwind, Yes to App Router, `@/*` for alias.

- [ ] **Step 2: Install dependencies**

```bash
npm install next-intl framer-motion gray-matter @next/mdx @mdx-js/loader @mdx-js/react next-mdx-remote
npm install -D @types/mdx
```

- [ ] **Step 3: Initialize git and push to GitHub**

```bash
git init
git add .
git commit -m "feat: initialize Next.js 14 portfolio project"
gh repo create portfolio --public --source=. --remote=origin --push
```

If `gh` not available, create repo manually at github.com then:
```bash
git remote add origin https://github.com/<your-username>/portfolio.git
git push -u origin main
```

- [ ] **Step 4: Connect to Vercel**

```bash
npx vercel
```

Follow prompts: link to existing project or create new. Choose default settings. Vercel auto-detects Next.js.

Expected output: `✅ Production: https://portfolio-<hash>.vercel.app`

- [ ] **Step 5: Verify deploy**

Open the Vercel URL — should show default Next.js starter page.

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat: connect Vercel deployment"
git push
```

---

## Task 2: i18n Foundation (next-intl)

**Files:**
- Create: `middleware.ts`
- Create: `i18n.ts`
- Create: `messages/ru.json`
- Create: `messages/en.json`
- Modify: `next.config.mjs`

- [ ] **Step 1: Create `i18n.ts`**

```typescript
// i18n.ts
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default
}));
```

- [ ] **Step 2: Create `middleware.ts`**

```typescript
// middleware.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['ru', 'en'],
  defaultLocale: 'ru',
  localePrefix: 'always'
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
```

- [ ] **Step 3: Create `messages/ru.json`**

```json
{
  "nav": {
    "work": "Работы",
    "about": "О себе"
  },
  "home": {
    "role": "Product UX/UI Designer",
    "tagline_line1": "Делаю",
    "tagline_line2": "сложное",
    "tagline_line3": "понятным",
    "description": "Проектирую продуктовый опыт\nв fintech, b2b и consumer apps.\nОт исследования до интерфейса.",
    "selected_work": "Избранные работы",
    "about_text": "Работаю на стыке исследования, стратегии и интерфейса. Верю, что хороший дизайн невидим — он просто работает.",
    "scroll_hint": "Работы"
  },
  "about": {
    "title": "О себе",
    "bio_1": "Product UX/UI дизайнер с фокусом на fintech и b2b продуктах. Работаю от исследования до финального интерфейса.",
    "bio_2": "Подход: сначала понять проблему, потом проектировать решение. Не наоборот.",
    "experience_title": "Опыт",
    "contact_title": "Контакт",
    "cv_download": "Скачать CV"
  },
  "case": {
    "back": "← Работы",
    "next_case": "Следующий кейс"
  }
}
```

- [ ] **Step 4: Create `messages/en.json`**

```json
{
  "nav": {
    "work": "Work",
    "about": "About"
  },
  "home": {
    "role": "Product UX/UI Designer",
    "tagline_line1": "Making",
    "tagline_line2": "complex",
    "tagline_line3": "simple",
    "description": "Designing product experiences\nin fintech, b2b and consumer apps.\nFrom research to interface.",
    "selected_work": "Selected Work",
    "about_text": "I work at the intersection of research, strategy and interface. I believe good design is invisible — it just works.",
    "scroll_hint": "Work"
  },
  "about": {
    "title": "About",
    "bio_1": "Product UX/UI designer focused on fintech and b2b products. I work from research to final interface.",
    "bio_2": "Approach: understand the problem first, then design the solution. Not the other way around.",
    "experience_title": "Experience",
    "contact_title": "Contact",
    "cv_download": "Download CV"
  },
  "case": {
    "back": "← Work",
    "next_case": "Next case"
  }
}
```

- [ ] **Step 5: Update `next.config.mjs` with next-intl plugin**

```javascript
// next.config.mjs
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withNextIntl(nextConfig);
```

- [ ] **Step 6: Move app directory to `app/[locale]/`**

```bash
mkdir -p app/[locale]
mv app/page.tsx "app/[locale]/page.tsx"
mv app/layout.tsx "app/[locale]/layout.tsx"
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add next-intl i18n with RU/EN support"
git push
```

---

## Task 3: Global Layout + Tailwind Config

**Files:**
- Modify: `app/[locale]/layout.tsx`
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`
- Create: `components/Nav.tsx`

- [ ] **Step 1: Update `tailwind.config.ts`**

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0a',
        surface: 'rgba(255,255,255,0.03)',
        border: 'rgba(255,255,255,0.08)',
        'text-primary': '#ffffff',
        'text-secondary': 'rgba(255,255,255,0.4)',
        'text-muted': 'rgba(255,255,255,0.2)',
        'text-ghost': 'rgba(255,255,255,0.025)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      letterSpacing: {
        'ultra-tight': '-0.05em',
        'super-tight': '-0.04em',
        'tight': '-0.03em',
        'wide-label': '0.15em',
      },
    },
  },
  plugins: [],
}
export default config
```

- [ ] **Step 2: Update `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --font-inter: 'Inter', sans-serif;
  --font-playfair: 'Playfair Display', serif;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html {
  background: #0a0a0a;
  color: #ffffff;
  scroll-behavior: smooth;
}

body {
  background: #0a0a0a;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}

::selection {
  background: rgba(255, 255, 255, 0.15);
}

@layer utilities {
  .text-outline {
    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
    color: transparent;
  }
}
```

- [ ] **Step 3: Create `components/Nav.tsx`**

```typescript
// components/Nav.tsx
'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

export default function Nav() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const otherLocale = locale === 'ru' ? 'en' : 'ru';

  // Switch locale while staying on same page
  const switchLocale = () => {
    const segments = pathname.split('/');
    segments[1] = otherLocale;
    router.push(segments.join('/'));
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-12 py-6">
      <Link
        href={`/${locale}`}
        className="text-[11px] tracking-wide-label uppercase text-text-muted hover:text-text-secondary transition-colors"
      >
        Иван Иванов
      </Link>

      <div className="flex items-center gap-8">
        <Link
          href={`/${locale}`}
          className="text-[11px] tracking-[0.1em] uppercase text-text-muted hover:text-text-secondary transition-colors"
        >
          {t('work')}
        </Link>
        <Link
          href={`/${locale}/about`}
          className="text-[11px] tracking-[0.1em] uppercase text-text-muted hover:text-text-secondary transition-colors"
        >
          {t('about')}
        </Link>
        <button
          onClick={switchLocale}
          className="text-[11px] tracking-[0.1em] text-text-muted hover:text-text-secondary transition-colors pl-6 border-l border-white/10"
        >
          <span className="text-text-secondary">{locale.toUpperCase()}</span>
          {' / '}
          {otherLocale.toUpperCase()}
        </button>
      </div>
    </nav>
  );
}
```

- [ ] **Step 4: Update `app/[locale]/layout.tsx`**

```typescript
// app/[locale]/layout.tsx
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Nav from '@/components/Nav';
import '../globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'Иван Иванов — Product Designer',
  description: 'Product UX/UI Designer — fintech, b2b, consumer apps',
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-bg text-text-primary font-sans">
        <NextIntlClientProvider messages={messages}>
          <Nav />
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Verify app runs**

```bash
npm run dev
```

Open http://localhost:3000 — should redirect to `/ru` and show an empty page without errors.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: global layout, nav, tailwind config, fonts"
git push
```

---

## Task 4: Case Data Layer

**Files:**
- Create: `lib/cases.ts`
- Create: `content/work/fintech-payment/index.ru.mdx`
- Create: `content/work/fintech-payment/index.en.mdx`
- Create: `content/work/b2b-saas-onboarding/index.ru.mdx`
- Create: `content/work/b2b-saas-onboarding/index.en.mdx`

- [ ] **Step 1: Create `lib/cases.ts`**

```typescript
// lib/cases.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface CaseMeta {
  slug: string;
  title: string;
  subtitle: string;
  year: number;
  tags: string[];
  type: string;
  cover?: string;
  draft?: boolean;
}

export interface Case extends CaseMeta {
  content: string;
}

const CONTENT_DIR = path.join(process.cwd(), 'content/work');

export function getAllCases(locale: string): CaseMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const slugs = fs.readdirSync(CONTENT_DIR).filter(f =>
    fs.statSync(path.join(CONTENT_DIR, f)).isDirectory()
  );

  const cases = slugs
    .map(slug => {
      const filePath = path.join(CONTENT_DIR, slug, `index.${locale}.mdx`);
      if (!fs.existsSync(filePath)) return null;

      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(raw);

      return {
        slug,
        title: data.title ?? slug,
        subtitle: data.subtitle ?? '',
        year: data.year ?? new Date().getFullYear(),
        tags: data.tags ?? [],
        type: data.type ?? '',
        cover: data.cover,
        draft: data.draft ?? false,
      } as CaseMeta;
    })
    .filter((c): c is CaseMeta => c !== null && !c.draft);

  return cases.sort((a, b) => b.year - a.year);
}

export function getCase(slug: string, locale: string): Case | null {
  const filePath = path.join(CONTENT_DIR, slug, `index.${locale}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    subtitle: data.subtitle ?? '',
    year: data.year ?? new Date().getFullYear(),
    tags: data.tags ?? [],
    type: data.type ?? '',
    cover: data.cover,
    draft: data.draft ?? false,
    content,
  };
}
```

- [ ] **Step 2: Create `content/work/fintech-payment/index.ru.mdx`**

```mdx
---
title: "Redesign платёжного флоу"
subtitle: "Fintech · iOS & Android"
year: 2024
type: "Fintech"
tags: ["UX Research", "Design System"]
draft: false
---

<Problem>
Пользователи не завершали платёж — конверсия флоу составляла 34%. Основная причина: слишком много шагов и непонятные ошибки валидации.
</Problem>

<Research>
Провёл 8 глубинных интервью и анализ сессионных записей. Выявил три критических момента отказа: экран ввода карты, подтверждение суммы, ошибки банка.
</Research>

<FinalDesign
  images={["/cases/fintech-payment/final-1.png", "/cases/fintech-payment/final-2.png"]}
  caption="Новый флоу: 3 шага вместо 7, встроенная валидация в реальном времени"
/>

<Metrics
  items={[
    { label: "Конверсия флоу", before: "34%", after: "71%" },
    { label: "Время завершения", before: "4:20 мин", after: "1:45 мин" },
    { label: "Ошибки пользователей", before: "23%", after: "6%" }
  ]}
/>
```

- [ ] **Step 3: Create `content/work/fintech-payment/index.en.mdx`**

```mdx
---
title: "Payment Flow Redesign"
subtitle: "Fintech · iOS & Android"
year: 2024
type: "Fintech"
tags: ["UX Research", "Design System"]
draft: false
---

<Problem>
Users were abandoning the payment flow — conversion was 34%. Root cause: too many steps and unclear validation errors.
</Problem>

<Research>
Conducted 8 in-depth interviews and session recording analysis. Identified three critical drop-off points: card input screen, amount confirmation, bank error states.
</Research>

<FinalDesign
  images={["/cases/fintech-payment/final-1.png", "/cases/fintech-payment/final-2.png"]}
  caption="New flow: 3 steps instead of 7, real-time inline validation"
/>

<Metrics
  items={[
    { label: "Flow conversion", before: "34%", after: "71%" },
    { label: "Completion time", before: "4:20 min", after: "1:45 min" },
    { label: "User errors", before: "23%", after: "6%" }
  ]}
/>
```

- [ ] **Step 4: Create `content/work/b2b-saas-onboarding/index.ru.mdx`**

```mdx
---
title: "B2B SaaS — онбординг"
subtitle: "Enterprise · Web"
year: 2024
type: "B2B SaaS"
tags: ["Jobs to be Done", "Prototype"]
draft: false
---

<Problem>
Новые команды не активировались в первую неделю — 60% уходили не завершив настройку. Продукт воспринимался как сложный.
</Problem>

<Research>
Jobs to be Done интервью с 12 командами. Ключевой инсайт: пользователи хотят увидеть первую ценность за 5 минут — до заполнения профиля и настроек.
</Research>

<FinalDesign
  images={["/cases/b2b-saas/onboarding-1.png"]}
  caption="Прогрессивный онбординг: ценность сначала, настройки потом"
/>

<Metrics
  items={[
    { label: "Активация (7 дней)", before: "38%", after: "67%" },
    { label: "Время до первой ценности", before: "3 дня", after: "12 мин" }
  ]}
/>
```

- [ ] **Step 5: Create `content/work/b2b-saas-onboarding/index.en.mdx`**

```mdx
---
title: "B2B SaaS — Onboarding"
subtitle: "Enterprise · Web"
year: 2024
type: "B2B SaaS"
tags: ["Jobs to be Done", "Prototype"]
draft: false
---

<Problem>
New teams weren't activating in the first week — 60% left without completing setup. The product felt complex.
</Problem>

<Research>
Jobs to be Done interviews with 12 teams. Key insight: users want to see first value within 5 minutes — before filling profiles and settings.
</Research>

<FinalDesign
  images={["/cases/b2b-saas/onboarding-1.png"]}
  caption="Progressive onboarding: value first, settings later"
/>

<Metrics
  items={[
    { label: "Activation (7 days)", before: "38%", after: "67%" },
    { label: "Time to first value", before: "3 days", after: "12 min" }
  ]}
/>
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: case data layer, lib/cases.ts, placeholder MDX content"
git push
```

---

## Task 5: Hero Section Component

**Files:**
- Create: `components/HeroSection.tsx`

- [ ] **Step 1: Create `components/HeroSection.tsx`**

```typescript
// components/HeroSection.tsx
'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const t = useTranslations('home');

  return (
    <section className="relative min-h-screen flex flex-col justify-end px-12 pb-20 overflow-hidden">

      {/* Counterform ghost text */}
      <div
        aria-hidden
        className="absolute right-[-40px] top-1/2 -translate-y-[60%] text-[clamp(200px,28vw,380px)] font-black leading-none tracking-ultra-tight text-text-ghost select-none pointer-events-none"
      >
        UX
      </div>

      {/* Asymmetric grid */}
      <div className="relative z-10 grid grid-cols-[1fr_320px] gap-12 items-end">

        {/* Left: name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[11px] tracking-wide-label uppercase text-text-muted mb-4">
            {t('role')}
          </p>
          <h1 className="text-[clamp(48px,7vw,96px)] font-extrabold leading-[0.92] tracking-super-tight font-serif">
            <span className="block">{t('tagline_line1')}</span>
            <span className="block">{t('tagline_line2')}</span>
            <span className="block text-outline">{t('tagline_line3')}</span>
          </h1>
        </motion.div>

        {/* Right: description + tags */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="pb-2"
        >
          <div className="w-full h-px bg-white/10 mb-5" />
          <p className="text-[13px] leading-relaxed text-text-secondary mb-6 whitespace-pre-line">
            {t('description')}
          </p>
          <div className="flex gap-2 flex-wrap">
            {['UX Research', 'Product Design', 'Systems'].map(tag => (
              <span
                key={tag}
                className="border border-white/10 rounded-sm px-3 py-1 text-[10px] tracking-[0.08em] text-text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-12 flex items-center gap-3 text-[10px] tracking-wide-label uppercase text-text-muted/50">
        <div className="w-10 h-px bg-white/15" />
        {t('scroll_hint')}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify HeroSection renders without errors**

Add temporarily to `app/[locale]/page.tsx`:
```typescript
import HeroSection from '@/components/HeroSection';
export default function Home() {
  return <HeroSection />;
}
```

Run `npm run dev` and open http://localhost:3000/ru — hero should render.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: HeroSection component with counterform and animations"
git push
```

---

## Task 6: Case Index Component

**Files:**
- Create: `components/CaseIndex.tsx`

- [ ] **Step 1: Create `components/CaseIndex.tsx`**

```typescript
// components/CaseIndex.tsx
'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import type { CaseMeta } from '@/lib/cases';

interface CaseIndexProps {
  cases: CaseMeta[];
}

export default function CaseIndex({ cases }: CaseIndexProps) {
  const t = useTranslations('home');
  const locale = useLocale();

  return (
    <section className="px-12 py-20 border-t border-white/[0.06]">
      <div className="flex justify-between items-baseline mb-12">
        <span className="text-[11px] tracking-wide-label uppercase text-text-muted">
          {t('selected_work')}
        </span>
        <span className="text-[11px] text-white/15">
          {cases.length}
        </span>
      </div>

      <div>
        {cases.map((c, i) => (
          <motion.div
            key={c.slug}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
          >
            <Link
              href={`/${locale}/work/${c.slug}`}
              className="group relative grid grid-cols-[64px_1fr_140px_80px] items-center py-5 border-b border-white/[0.06] hover:bg-white/[0.02] transition-colors px-2 -mx-2"
            >
              {/* Number */}
              <span className="text-[11px] tracking-[0.1em] tabular-nums text-text-muted">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Title + subtitle */}
              <div className="flex flex-col gap-1">
                <span className="text-[20px] font-bold tracking-tight text-white/85 group-hover:text-white transition-colors leading-tight">
                  {c.title}
                </span>
                <span className="text-[11px] text-text-muted">{c.subtitle}</span>
              </div>

              {/* Tags */}
              <div className="flex gap-1.5 flex-wrap">
                {c.tags.slice(0, 2).map(tag => (
                  <span
                    key={tag}
                    className="text-[10px] text-text-muted border border-white/[0.08] rounded-sm px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Year */}
              <span className="text-[11px] text-white/20 text-right tabular-nums">
                {c.year}
              </span>

              {/* Hover arrow */}
              <span className="absolute right-0 text-white/20 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200">
                →
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: CaseIndex component with hover effects"
git push
```

---

## Task 7: About Snippet + Complete Home Page

**Files:**
- Create: `components/AboutSnippet.tsx`
- Modify: `app/[locale]/page.tsx`

- [ ] **Step 1: Create `components/AboutSnippet.tsx`**

```typescript
// components/AboutSnippet.tsx
import { useTranslations } from 'next-intl';

export default function AboutSnippet() {
  const t = useTranslations('home');

  return (
    <section className="px-12 py-20 border-t border-white/[0.06] grid grid-cols-2 gap-20">
      <p className="text-[20px] leading-relaxed font-light tracking-tight text-text-secondary">
        {t.rich('about_text', {
          strong: chunks => (
            <strong className="text-white/85 font-semibold">{chunks}</strong>
          ),
        })}
      </p>

      <div className="flex flex-col gap-4 justify-center">
        {[
          { label: 'hello@example.com', href: 'mailto:hello@example.com' },
          { label: 'Telegram', href: 'https://t.me/yourhandle' },
          { label: 'LinkedIn', href: 'https://linkedin.com/in/yourprofile' },
        ].map(link => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex justify-between items-center pb-4 border-b border-white/[0.06] text-[13px] text-text-muted hover:text-white/70 transition-colors"
          >
            {link.label}
            <span className="opacity-40 group-hover:opacity-70 transition-opacity">↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update `app/[locale]/page.tsx` to assemble home page**

```typescript
// app/[locale]/page.tsx
import HeroSection from '@/components/HeroSection';
import CaseIndex from '@/components/CaseIndex';
import AboutSnippet from '@/components/AboutSnippet';
import { getAllCases } from '@/lib/cases';

interface HomeProps {
  params: { locale: string };
}

export default function Home({ params: { locale } }: HomeProps) {
  const cases = getAllCases(locale);

  return (
    <>
      <HeroSection />
      <CaseIndex cases={cases} />
      <AboutSnippet />
    </>
  );
}
```

- [ ] **Step 3: Run dev and verify home page**

```bash
npm run dev
```

Open http://localhost:3000/ru — should show hero + 2 cases in index + about snippet.
Open http://localhost:3000/en — should show English version.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: complete home page — hero, case index, about snippet"
git push
```

---

## Task 8: MDX Artifact Components

**Files:**
- Create: `components/mdx/Problem.tsx`
- Create: `components/mdx/Research.tsx`
- Create: `components/mdx/FinalDesign.tsx`
- Create: `components/mdx/Metrics.tsx`
- Create: `components/mdx/Quote.tsx`
- Create: `components/mdx/index.ts`

- [ ] **Step 1: Create `components/mdx/Problem.tsx`**

```typescript
// components/mdx/Problem.tsx
export default function Problem({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-16 border-t border-white/[0.06]">
      <span className="text-[10px] tracking-wide-label uppercase text-text-muted block mb-6">
        Проблема / Problem
      </span>
      <p className="text-[28px] font-light leading-relaxed tracking-tight text-white/60 max-w-3xl">
        {children}
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Create `components/mdx/Research.tsx`**

```typescript
// components/mdx/Research.tsx
export default function Research({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-16 border-t border-white/[0.06]">
      <span className="text-[10px] tracking-wide-label uppercase text-text-muted block mb-6">
        Исследование / Research
      </span>
      <div className="text-[16px] leading-relaxed text-text-secondary max-w-2xl space-y-4">
        {children}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create `components/mdx/FinalDesign.tsx`**

```typescript
// components/mdx/FinalDesign.tsx
import Image from 'next/image';

interface FinalDesignProps {
  images: string[];
  caption?: string;
}

export default function FinalDesign({ images, caption }: FinalDesignProps) {
  return (
    <div className="py-16 border-t border-white/[0.06]">
      <span className="text-[10px] tracking-wide-label uppercase text-text-muted block mb-8">
        Решение / Solution
      </span>
      <div className="space-y-4">
        {images.map((src, i) => (
          <div key={i} className="relative w-full aspect-[16/9] bg-white/[0.03] rounded-sm overflow-hidden">
            <Image
              src={src}
              alt={caption ?? `Design ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        ))}
      </div>
      {caption && (
        <p className="mt-4 text-[12px] text-text-muted">{caption}</p>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Create `components/mdx/Metrics.tsx`**

```typescript
// components/mdx/Metrics.tsx
interface MetricItem {
  label: string;
  before: string;
  after: string;
}

interface MetricsProps {
  items: MetricItem[];
}

export default function Metrics({ items }: MetricsProps) {
  return (
    <div className="py-16 border-t border-white/[0.06]">
      <span className="text-[10px] tracking-wide-label uppercase text-text-muted block mb-8">
        Результат / Results
      </span>
      <div className="grid grid-cols-3 gap-8">
        {items.map((item, i) => (
          <div key={i} className="border-t-2 border-white/10 pt-6">
            <p className="text-[11px] text-text-muted mb-4">{item.label}</p>
            <div className="flex items-baseline gap-3">
              <span className="text-[16px] text-white/20 line-through">{item.before}</span>
              <span className="text-[32px] font-bold tracking-tight text-white">{item.after}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Create `components/mdx/Quote.tsx`**

```typescript
// components/mdx/Quote.tsx
export default function Quote({ children, author }: { children: React.ReactNode; author?: string }) {
  return (
    <div className="py-16 border-t border-white/[0.06]">
      <blockquote className="text-[24px] font-light leading-relaxed text-white/50 max-w-3xl">
        <span className="text-[48px] leading-none text-white/10 font-serif">"</span>
        {children}
      </blockquote>
      {author && (
        <cite className="block mt-4 text-[12px] text-text-muted not-italic">— {author}</cite>
      )}
    </div>
  );
}
```

- [ ] **Step 6: Create `components/mdx/index.ts`**

```typescript
// components/mdx/index.ts
export { default as Problem } from './Problem';
export { default as Research } from './Research';
export { default as FinalDesign } from './FinalDesign';
export { default as Metrics } from './Metrics';
export { default as Quote } from './Quote';
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: MDX artifact components — Problem, Research, FinalDesign, Metrics, Quote"
git push
```

---

## Task 9: Case Page

**Files:**
- Modify: `next.config.mjs` (add MDX support)
- Create: `app/[locale]/work/[slug]/page.tsx`

- [ ] **Step 1: Update `next.config.mjs` for MDX**

```javascript
// next.config.mjs
import createNextIntlPlugin from 'next-intl/plugin';
import createMDX from '@next/mdx';

const withNextIntl = createNextIntlPlugin();
const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    domains: [],
  },
};

export default withNextIntl(withMDX(nextConfig));
```

- [ ] **Step 2: Create `app/[locale]/work/[slug]/page.tsx`**

```typescript
// app/[locale]/work/[slug]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllCases, getCase } from '@/lib/cases';
import { Problem, Research, FinalDesign, Metrics, Quote } from '@/components/mdx';

const mdxComponents = { Problem, Research, FinalDesign, Metrics, Quote };

interface CasePageProps {
  params: { locale: string; slug: string };
}

export async function generateStaticParams() {
  // Generate for both locales
  const ruCases = getAllCases('ru');
  return ruCases.flatMap(c => [
    { locale: 'ru', slug: c.slug },
    { locale: 'en', slug: c.slug },
  ]);
}

export default function CasePage({ params: { locale, slug } }: CasePageProps) {
  const caseData = getCase(slug, locale);
  if (!caseData) notFound();

  const allCases = getAllCases(locale);
  const currentIndex = allCases.findIndex(c => c.slug === slug);
  const nextCase = allCases[currentIndex + 1] ?? allCases[0];

  return (
    <article className="pt-32 px-12 pb-32 max-w-[900px] mx-auto">

      {/* Back link */}
      <Link
        href={`/${locale}`}
        className="text-[11px] tracking-wide-label uppercase text-text-muted hover:text-text-secondary transition-colors mb-16 block"
      >
        {locale === 'ru' ? '← Работы' : '← Work'}
      </Link>

      {/* Case header */}
      <header className="mb-4">
        <div className="flex gap-2 mb-6 flex-wrap">
          <span className="text-[11px] text-text-muted border border-white/[0.08] rounded-sm px-2 py-1">
            {caseData.type}
          </span>
          {caseData.tags.map(tag => (
            <span key={tag} className="text-[11px] text-text-muted border border-white/[0.08] rounded-sm px-2 py-1">
              {tag}
            </span>
          ))}
          <span className="text-[11px] text-white/20 px-2 py-1">{caseData.year}</span>
        </div>

        <h1 className="text-[clamp(36px,5vw,72px)] font-bold tracking-super-tight leading-[0.95] mb-4">
          {caseData.title}
        </h1>
        <p className="text-[16px] text-text-secondary">{caseData.subtitle}</p>
      </header>

      <div className="w-full h-px bg-white/[0.06] my-12" />

      {/* MDX content */}
      <MDXRemote source={caseData.content} components={mdxComponents} />

      {/* Next case */}
      <div className="mt-32 pt-12 border-t border-white/[0.06]">
        <p className="text-[11px] tracking-wide-label uppercase text-text-muted mb-4">
          {locale === 'ru' ? 'Следующий кейс' : 'Next case'}
        </p>
        <Link
          href={`/${locale}/work/${nextCase.slug}`}
          className="group flex items-baseline gap-4 hover:opacity-70 transition-opacity"
        >
          <span className="text-[11px] text-white/20">
            {String(allCases.findIndex(c => c.slug === nextCase.slug) + 1).padStart(2, '0')}
          </span>
          <span className="text-[28px] font-bold tracking-tight text-white/85">
            {nextCase.title}
          </span>
          <span className="text-white/20 group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </article>
  );
}
```

- [ ] **Step 3: Verify case page works**

```bash
npm run dev
```

Open http://localhost:3000/ru/work/fintech-payment — should render case with all MDX components.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: case page with MDX rendering and artifact components"
git push
```

---

## Task 10: About Page

**Files:**
- Create: `app/[locale]/about/page.tsx`

- [ ] **Step 1: Create `app/[locale]/about/page.tsx`**

```typescript
// app/[locale]/about/page.tsx
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <div className="pt-40 px-12 pb-32 max-w-[900px]">

      {/* Title with counterform */}
      <div className="relative mb-24">
        <div
          aria-hidden
          className="absolute right-0 top-1/2 -translate-y-1/2 text-[180px] font-black text-text-ghost select-none leading-none tracking-ultra-tight"
        >
          01
        </div>
        <h1 className="text-[clamp(48px,6vw,80px)] font-bold tracking-super-tight leading-[0.92]">
          {t('title')}
        </h1>
      </div>

      {/* Bio */}
      <div className="grid grid-cols-[1fr_320px] gap-20 mb-24">
        <div className="space-y-6">
          <p className="text-[18px] leading-relaxed text-text-secondary">{t('bio_1')}</p>
          <p className="text-[18px] leading-relaxed text-text-secondary">{t('bio_2')}</p>
        </div>
        <div className="text-[12px] text-text-muted space-y-2 pt-2">
          <p className="text-[10px] tracking-wide-label uppercase text-white/20 mb-4">Stack</p>
          {['Figma', 'FigJam', 'Miro', 'Maze', 'Hotjar', 'Next.js'].map(tool => (
            <p key={tool}>{tool}</p>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="border-t border-white/[0.06] pt-12">
        <p className="text-[10px] tracking-wide-label uppercase text-white/20 mb-8">{t('contact_title')}</p>
        <div className="space-y-4 max-w-sm">
          {[
            { label: 'hello@example.com', href: 'mailto:hello@example.com' },
            { label: 'Telegram', href: 'https://t.me/yourhandle' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/yourprofile' },
          ].map(link => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex justify-between items-center pb-4 border-b border-white/[0.06] text-[14px] text-text-muted hover:text-white/70 transition-colors"
            >
              {link.label}
              <span className="opacity-40 group-hover:opacity-70 transition-opacity">↗</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify about page**

Open http://localhost:3000/ru/about — should render about page.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: about page"
git push
```

---

## Task 11: Page Transitions + Mobile Responsive

**Files:**
- Create: `components/PageTransition.tsx`
- Modify: `app/[locale]/layout.tsx`
- Modify: `app/globals.css` (mobile breakpoints)

- [ ] **Step 1: Create `components/PageTransition.tsx`**

```typescript
// components/PageTransition.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Wrap main in `app/[locale]/layout.tsx` with PageTransition**

Replace `<main>{children}</main>` with:
```typescript
import PageTransition from '@/components/PageTransition';
// ...
<main>
  <PageTransition>{children}</PageTransition>
</main>
```

- [ ] **Step 3: Add mobile styles to `app/globals.css`**

```css
/* Mobile — append to globals.css */
@media (max-width: 768px) {
  .hero-grid {
    grid-template-columns: 1fr !important;
  }
  .case-grid {
    grid-template-columns: 40px 1fr !important;
  }
  nav {
    padding: 20px 24px !important;
  }
}
```

Update `components/HeroSection.tsx` — replace `grid-cols-[1fr_320px]` with:
```typescript
className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_320px] gap-8 md:gap-12 items-end"
```

Update `components/CaseIndex.tsx` — replace `grid-cols-[64px_1fr_140px_80px]` with:
```typescript
className="group relative grid grid-cols-[40px_1fr] md:grid-cols-[64px_1fr_140px_80px] items-center ..."
```

Add `hidden md:flex` to tags div and `hidden md:block` to year span inside CaseIndex.

- [ ] **Step 4: Final verify — all pages, both locales, mobile width**

```bash
npm run dev
```

Check:
- http://localhost:3000/ru — home RU ✓
- http://localhost:3000/en — home EN ✓
- http://localhost:3000/ru/work/fintech-payment — case RU ✓
- http://localhost:3000/en/work/fintech-payment — case EN ✓
- http://localhost:3000/ru/about — about RU ✓
- Resize browser to 375px width — layout doesn't break ✓

- [ ] **Step 5: Build check**

```bash
npm run build
```

Expected: no errors. If errors appear, fix before pushing.

- [ ] **Step 6: Final commit + push**

```bash
git add -A
git commit -m "feat: page transitions, mobile responsive layout"
git push
```

Vercel auto-deploys from `main`. Check the Vercel dashboard for production URL.

---

## Task 12: launch.json + Dev Server Config

**Files:**
- Modify: `.claude/launch.json`

- [ ] **Step 1: Update `.claude/launch.json` with Next.js dev server**

```json
{
  "version": "0.0.1",
  "configurations": [
    {
      "name": "Next.js Dev",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "port": 3000
    }
  ]
}
```

- [ ] **Step 2: Commit**

```bash
git add .claude/launch.json
git commit -m "chore: add dev server config to launch.json"
git push
```

---

## Summary

After Task 12 the site is:
- ✅ Live on Vercel
- ✅ Bilingual RU/EN with URL-based locale
- ✅ 2 placeholder cases with all artifact components
- ✅ Swiss-style dark aesthetic with all 7 visual principles
- ✅ Mobile responsive
- ✅ Page transitions

**To add a new case:** create `content/work/<slug>/index.ru.mdx` + `index.en.mdx` with frontmatter and MDX artifact components. No code changes needed.
