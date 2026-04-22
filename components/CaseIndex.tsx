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
              className="group relative grid grid-cols-[40px_1fr] md:grid-cols-[64px_1fr_140px_80px] items-center py-5 border-b border-white/[0.06] hover:bg-white/[0.02] transition-colors px-2 -mx-2"
            >
              <span className="text-[11px] tracking-[0.1em] tabular-nums text-text-muted">
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="flex flex-col gap-1">
                <span className="text-[20px] font-bold tracking-tight text-white/85 group-hover:text-white transition-colors leading-tight">
                  {c.title}
                </span>
                <span className="text-[11px] text-text-muted">{c.subtitle}</span>
              </div>

              <div className="hidden md:flex gap-1.5 flex-wrap">
                {c.tags.slice(0, 2).map(tag => (
                  <span
                    key={tag}
                    className="text-[10px] text-text-muted border border-white/[0.08] rounded-sm px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <span className="hidden md:block text-[11px] text-white/20 text-right tabular-nums">
                {c.year}
              </span>

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
