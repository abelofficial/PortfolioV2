import '../globals.css';
import { ThemeProvider } from 'next-themes';
import { Geist, Geist_Mono } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import languages, { getCodeFromLanguage } from '@/utils/languages';
import {
  MultiSectionLayout,
  SidebarContainer,
} from '@components/ui/custom-container';
import Toolbar from '@components/toolbar';
import ChatAI from '@components/chatAI';
import { AnimatedPageContent } from '@components/ui/animated-page-content';
import Footer from '@components/footer';
import { FullChatBoxData } from '@/types';
import { datoCMS } from '@services/datoCMS';
import { getCombinedQuery, fullChatBoxQuery } from '@/lib/queries';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export async function generateStaticParams() {
  return languages.map((lang) => ({ locale: lang.language }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const datoLocale = getCodeFromLanguage(locale) ?? 'en';

  const chatBoxData: FullChatBoxData = await datoCMS({
    query: getCombinedQuery([fullChatBoxQuery]),
    variables: { locale: datoLocale },
  });

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
                <div className="py-auto flex w-full flex-col gap-4 xl:h-full">
                  <div className="shrink-0">
                    <Toolbar />
                  </div>
                  <div className="min-h-0 flex-1">
                    <ChatAI chatBoxData={chatBoxData} locale={locale} />
                  </div>
                </div>
              </SidebarContainer>
            }
          >
            <AnimatedPageContent>
              {children}
              <Footer locale={locale} />
            </AnimatedPageContent>
          </MultiSectionLayout>
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
