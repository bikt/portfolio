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
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_320px] gap-8 md:gap-12 items-end">

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
