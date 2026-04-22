import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllCases, getCase } from '@/lib/cases';
import { Problem, Research, FinalDesign, Metrics, Quote } from '@/components/mdx';

const mdxComponents = { Problem, Research, FinalDesign, Metrics, Quote };

interface CasePageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const ruCases = getAllCases('ru');
  return ruCases.flatMap(c => [
    { locale: 'ru', slug: c.slug },
    { locale: 'en', slug: c.slug },
  ]);
}

export default async function CasePage({ params }: CasePageProps) {
  const { locale, slug } = await params;
  const caseData = getCase(slug, locale);
  if (!caseData) notFound();

  const allCases = getAllCases(locale);
  const currentIndex = allCases.findIndex(c => c.slug === slug);
  const nextCase = allCases[currentIndex + 1] ?? allCases[0];

  return (
    <article className="pt-32 px-12 pb-32 max-w-[900px] mx-auto">

      <Link
        href={`/${locale}`}
        className="text-[11px] tracking-wide-label uppercase text-text-muted hover:text-text-secondary transition-colors mb-16 block"
      >
        {locale === 'ru' ? '← Работы' : '← Work'}
      </Link>

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

      <MDXRemote source={caseData.content} components={mdxComponents} />

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
