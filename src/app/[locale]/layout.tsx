import '../globals.css';
import { ThemeProvider } from 'next-themes';
import { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import languages from '@/utils/languages';
import {
  MainPageContainer,
  MultiSectionLayout,
  SidebarContainer,
} from '@components/ui/custom-container';
import Toolbar from '@components/toolbar';
import ChatAI from '@components/chatAI';
import { AnimatedPageContent } from '@components/ui/animated-page-content';
import { Suspense } from 'react';
import ProfileSkeleton from '@components/profile/skeleton';
import Profile from '@components/profile';
import TechStackSkeleton from '@components/techStack/skeleton';
import TechStack from '@components/techStack';
import ExperienceTimelineSkeleton from '@components/experienceTimeline/skeleton';
import ExperienceTimeline from '@components/experienceTimeline';
import TestimonialsSkeleton from '@components/testimonials/skeleton';
import Testimonials from '@components/testimonials';
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
  return [{ locale: 'en' }, { locale: 'sv_SE' }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const lang = languages.find((l) => l.code === locale)?.language;

  const chatBoxData: FullChatBoxData = await datoCMS({
    query: getCombinedQuery([fullChatBoxQuery]),
    variables: { locale: locale },
  });

  return (
    <html lang={lang} suppressHydrationWarning>
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
              <Footer />
            </AnimatedPageContent>
          </MultiSectionLayout>
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
