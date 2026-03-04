import { Suspense } from 'react';
import { MainPageContainer } from '@components/ui/custom-container';
import TechnicalLedgersList from '@components/technicalLedgersList';
import { Metadata } from 'next';
import { TechnicalLedgerPage } from '@/types';
import { datoCMS } from '@services/datoCMS';
import {
  getCombinedQuery,
  technicalLedgerPageQuery,
  siteMetaTagsQuery,
} from '@/lib/queries';
import getMetadataFromDatoCMS, {
  SiteMetaTags,
} from '@/utils/getMetadataFromSEOConfig';
import TechnicalLedgersListSkeleton from '@components/technicalLedgersList/skeleton';
import { getCodeFromLanguage } from '@/utils/languages';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const datoLocale = getCodeFromLanguage(locale) ?? 'en';

  const data: { technicalLedgersPage: TechnicalLedgerPage } & SiteMetaTags =
    await datoCMS({
      query: getCombinedQuery([technicalLedgerPageQuery, siteMetaTagsQuery]),
      variables: { locale: datoLocale },
    });

  return getMetadataFromDatoCMS(
    data.technicalLedgersPage._seoMetaTags,
    data._site.faviconMetaTags
  );
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
