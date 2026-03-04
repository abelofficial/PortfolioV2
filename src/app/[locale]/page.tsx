import { Suspense } from 'react';
import { MainPageContainer } from '@components/ui/custom-container';
import LandingContent from '@components/landing';
import LandingSkeleton from '@components/landing/skeleton';
import { datoCMS } from '@services/datoCMS';
import {
  getCombinedQuery,
  landingPageQuery,
  siteMetaTagsQuery,
} from '@/lib/queries';
import { LandingPage } from '@/types';
import { Metadata } from 'next';
import getMetadataFromDatoCMS, {
  SiteMetaTags,
} from '@/utils/getMetadataFromSEOConfig';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const data: { landingPage: LandingPage } & SiteMetaTags = await datoCMS({
    query: getCombinedQuery([landingPageQuery, siteMetaTagsQuery]),
    variables: { locale: locale },
  });

  return getMetadataFromDatoCMS(
    data.landingPage._seoMetaTags,
    data._site.faviconMetaTags
  );
}

const Home = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;

  return (
    <MainPageContainer>
      <Suspense fallback={<LandingSkeleton />}>
        <LandingContent locale={locale} />
      </Suspense>
    </MainPageContainer>
  );
};

export default Home;
