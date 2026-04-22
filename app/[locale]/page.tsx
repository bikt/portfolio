import HeroSection from '@/components/HeroSection';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  await params;
  return <HeroSection />;
}
