import { Suspense } from 'react';
import { MainPageContainer } from '@components/ui/custom-container';
import ChapterDetail from '@components/bookSummary/ChapterDetail';
import { Metadata } from 'next';
import type { BookSummary } from '@/types';
import { datoCMS } from '@services/datoCMS';
import {
  getCombinedQueryWithSlug,
  bookSummaryQuery,
  siteMetaTagsQuery,
} from '@/lib/queries';
import ChapterDetailSkeleton from '@components/bookSummary/ChapterDetail/skeleton';
import getMetadataFromDatoCMS, {
  SiteMetaTags,
} from '@/utils/getMetadataFromSEOConfig';
import { getCodeFromLanguage } from '@/utils/languages';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string; chapterSlug: string }>;
}): Promise<Metadata> {
  const { locale, slug, chapterSlug } = await params;
  const datoLocale = getCodeFromLanguage(locale) ?? 'en';

  const data: { bookSummary: BookSummary } & SiteMetaTags = await datoCMS({
    query: getCombinedQueryWithSlug([bookSummaryQuery, siteMetaTagsQuery]),
    variables: { locale: datoLocale, slug },
  });
  const chapter = data.bookSummary?.chapters?.find(
    (c) => c.slugId === chapterSlug
  );

  // Use chapter's SEO meta tags if available, otherwise fall back to book's SEO
  const seoMetaTags = chapter?._seoMetaTags ?? data.bookSummary._seoMetaTags;

  return getMetadataFromDatoCMS(seoMetaTags, data._site.faviconMetaTags);
}

const ChapterPage = async ({
  params,
}: {
  params: Promise<{ locale: string; slug: string; chapterSlug: string }>;
}) => {
  const { locale, slug, chapterSlug } = await params;

  return (
    <MainPageContainer className="p-0 md:p-4">
      <Suspense fallback={<ChapterDetailSkeleton />}>
        <ChapterDetail
          locale={locale}
          bookSlug={slug}
          chapterSlug={chapterSlug}
        />
      </Suspense>
    </MainPageContainer>
  );
};

export default ChapterPage;
