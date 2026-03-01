import { Suspense } from 'react';
import { MainPageContainer } from '@components/ui/custom-container';
import TechnicalLedger from '@components/technicalLedger';
import { Metadata } from 'next';
import { SingleTechnicalLedger } from '@/types';
import { datoCMS } from '@services/datoCMS';
import {
  getCombinedQueryWithSlug,
  technicalLedgersQuery,
  siteMetaTagsQuery,
} from '@/lib/queries';
import getMetadataFromDatoCMS, {
  SiteMetaTags,
} from '@/utils/getMetadataFromSEOConfig';
import TechnicalLedgerSkeleton from '@components/technicalLedger/skeleton';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  const data: SingleTechnicalLedger & SiteMetaTags = await datoCMS({
    query: getCombinedQueryWithSlug([technicalLedgersQuery, siteMetaTagsQuery]),
    variables: { locale, slug },
  });

  return getMetadataFromDatoCMS(
    data.technicalLedger._seoMetaTags,
    data._site.faviconMetaTags
  );
}

const LedgerPage = async ({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) => {
  const { locale, slug } = await params;
  return (
    <MainPageContainer className="p-0 md:p-4">
      <Suspense fallback={<TechnicalLedgerSkeleton />}>
        <TechnicalLedger locale={locale} slug={slug} />
      </Suspense>
    </MainPageContainer>
  );
};

export default LedgerPage;
