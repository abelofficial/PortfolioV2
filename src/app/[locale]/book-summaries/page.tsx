import { Suspense } from 'react';
import { MainPageContainer } from '@components/ui/custom-container';
import BookSummariesList from '@components/bookSummariesList';
import { Metadata } from 'next';
import type { BookSummariesPage } from '@/types';
import { datoCMS } from '@services/datoCMS';
import {
  getCombinedQuery,
  bookSummariesPageQuery,
  siteMetaTagsQuery,
} from '@/lib/queries';
import getMetadataFromDatoCMS, {
  SiteMetaTags,
} from '@/utils/getMetadataFromSEOConfig';
import BookSummariesListSkeleton from '@components/bookSummariesList/skeleton';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const data: { bookSummaryPage: BookSummariesPage } & SiteMetaTags =
    await datoCMS({
      query: getCombinedQuery([bookSummariesPageQuery, siteMetaTagsQuery]),
      variables: { locale: locale },
    });

  return getMetadataFromDatoCMS(
    data.bookSummaryPage._seoMetaTags,
    data._site.faviconMetaTags
  );
}

const BookSummariesPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;

  return (
    <MainPageContainer className="p-0 md:p-4">
      <Suspense fallback={<BookSummariesListSkeleton />}>
        <BookSummariesList locale={locale} />
      </Suspense>
    </MainPageContainer>
  );
};

export default BookSummariesPage;
