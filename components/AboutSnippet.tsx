// components/AboutSnippet.tsx
import { useTranslations } from 'next-intl';

export default function AboutSnippet() {
  const t = useTranslations('home');

  return (
    <section className="px-12 py-20 border-t border-white/[0.06] grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
      <p className="text-[20px] leading-relaxed font-light tracking-tight text-text-secondary">
        {t('about_text')}
      </p>

      <div className="flex flex-col gap-4 justify-center">
        {[
          { label: 'mr.bikt89@gmail.com', href: 'mailto:mr.bikt89@gmail.com' },
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
