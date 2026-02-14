import '../globals.css';
import Toolbar from '@components/toolbar';
import {
  MultiSectionLayout,
  SidebarContainer,
} from '@components/ui/custom-container';
import ChatAI from '@components/chatAI';
import { ThemeProvider } from 'next-themes';
import Footer from '@components/footer';
import { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'sv_SE' }];
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;

  return {
    title:
      locale === 'sv_SE'
        ? 'Abel Sintaro | Mjukvaruingenjör'
        : 'Abel Sintaro | Software Engineer',
    description:
      locale === 'sv_SE'
        ? 'En personlig webbplats...'
        : 'A personal website...',
  };
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MultiSectionLayout
            sidebar={
              <SidebarContainer>
                <Toolbar />
                <ChatAI />
              </SidebarContainer>
            }
          >
            {children}
            <Footer />
          </MultiSectionLayout>
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
