import { getTranslations } from 'next-intl/server';

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return (
    <div className="pt-40 px-12 pb-32 max-w-[900px]">

      {/* Title with counterform */}
      <div className="relative mb-24">
        <div
          aria-hidden
          className="absolute right-0 top-1/2 -translate-y-1/2 text-[clamp(100px,18vw,180px)] font-black text-text-ghost select-none leading-none tracking-ultra-tight"
        >
          01
        </div>
        <h1 className="text-[clamp(48px,6vw,80px)] font-bold tracking-super-tight leading-[0.92]">
          {t('title')}
        </h1>
      </div>

      {/* Bio */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_240px] gap-12 md:gap-20 mb-24">
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
            { label: 'mr.bikt89@gmail.com', href: 'mailto:mr.bikt89@gmail.com' },
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
