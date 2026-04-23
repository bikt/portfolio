import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Nav from '@/components/Nav';
import PageTransition from '@/components/PageTransition';
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
  title: 'Евгений Бикташев — Product Designer',
  description: 'Product UX/UI Designer — fintech, b2b, consumer apps',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-bg text-text-primary font-sans">
        <NextIntlClientProvider messages={messages}>
          <Nav />
          <main>
            <PageTransition>{children}</PageTransition>
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
