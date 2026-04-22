import HeroSection from '@/components/HeroSection';
import CaseIndex from '@/components/CaseIndex';
import AboutSnippet from '@/components/AboutSnippet';
import { getAllCases } from '@/lib/cases';

interface HomeProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  const cases = getAllCases(locale);

  return (
    <>
      <HeroSection />
      <CaseIndex cases={cases} />
      <AboutSnippet />
    </>
  );
}
