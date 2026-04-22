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
