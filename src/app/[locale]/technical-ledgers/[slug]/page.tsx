import { Suspense } from 'react';
import {
  MainPageContainer,
  MultiSectionLayout,
  SidebarContainer,
} from '@components/ui/custom-container';
import { AnimatedPageContent } from '@components/ui/animated-page-content';
import TechnicalLedger from '@components/technicalLedger';
import { Metadata } from 'next';
import { SingleTechnicalLedger } from '@/types';
import { datoCMS } from '@services/datoCMS';
import { getCombinedQueryWithSlug, technicalLedgersQuery } from '@/lib/queries';
import Toolbar from '@components/toolbar';
import ChatAI from '@components/chatAI';
import Footer from '@components/footer';
import getMetadataFromSEOConfig, {
  SeoType,
} from '@/utils/getMetadataFromSEOConfig';
import TechnicalLedgerSkeleton from '@components/technicalLedger/skeleton';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> => {
  const { locale, slug } = await params;

  const data: SingleTechnicalLedger = await datoCMS({
    query: getCombinedQueryWithSlug([technicalLedgersQuery]),
    variables: { locale, slug },
  });

  const seo = data.technicalLedger.seo;

  return getMetadataFromSEOConfig(locale, SeoType.ARTICLE, seo);
};

const LedgerPage = async ({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) => {
  const { locale, slug } = await params;
  const { technicalLedger }: SingleTechnicalLedger = await datoCMS({
    query: getCombinedQueryWithSlug([technicalLedgersQuery]),
    variables: { locale, slug },
  });

  return (
    <MultiSectionLayout
      sidebar={
        <SidebarContainer>
          <div className="py-auto flex w-full flex-col gap-4 xl:h-full">
            <div className="shrink-0">
              <Toolbar />
            </div>
            <div className="min-h-0 flex-1">
              <ChatAI chatBoxInfo={technicalLedger.chatBox} />
            </div>
          </div>
        </SidebarContainer>
      }
    >
      <AnimatedPageContent>
        <MainPageContainer className="p-0 md:p-4">
          <Suspense fallback={<TechnicalLedgerSkeleton />}>
            <TechnicalLedger locale={locale} slug={slug} />
          </Suspense>
        </MainPageContainer>
        <Footer />
      </AnimatedPageContent>
    </MultiSectionLayout>
  );
};

export default LedgerPage;
