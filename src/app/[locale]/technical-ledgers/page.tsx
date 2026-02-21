import { Suspense } from 'react';
import {
  MainPageContainer,
  MultiSectionLayout,
  SidebarContainer,
} from '@components/ui/custom-container';
import { AnimatedPageContent } from '@components/ui/animated-page-content';
import TechnicalLedgersList from '@components/technicalLedgersList';
import { Metadata } from 'next';
import { TechnicalLedgerPage } from '@/types';
import { datoCMS } from '@services/datoCMS';
import { getCombinedQuery, technicalLedgerPageQuery } from '@/lib/queries';
import Toolbar from '@components/toolbar';
import ChatAI from '@components/chatAI';
import Footer from '@components/footer';
import getMetadataFromSEOConfig, {
  SeoType,
} from '@/utils/getMetadataFromSEOConfig';
import TechnicalLedgersListSkeleton from '@components/technicalLedgersList/skeleton';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const {
    technicalLedgersPage,
  }: { technicalLedgersPage: TechnicalLedgerPage } = await datoCMS({
    query: getCombinedQuery([technicalLedgerPageQuery]),
    variables: { locale: locale },
  });

  const seo = technicalLedgersPage.seo;

  return getMetadataFromSEOConfig(locale, SeoType.ARTICLE, seo);
}

const TechnicalLedgersPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;

  return (
    <MainPageContainer className="p-0 md:p-4">
      <Suspense fallback={<TechnicalLedgersListSkeleton />}>
        <TechnicalLedgersList locale={locale} />
      </Suspense>
    </MainPageContainer>
  );
};

export default TechnicalLedgersPage;
