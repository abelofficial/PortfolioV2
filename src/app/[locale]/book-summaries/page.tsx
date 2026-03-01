import { Suspense } from 'react';
import { MainPageContainer } from '@components/ui/custom-container';
import BookSummariesList from '@components/bookSummariesList';
import { Metadata } from 'next';
import type { BookSummariesPage } from '@/types';
import { datoCMS } from '@services/datoCMS';
import { getCombinedQuery, bookSummariesPageQuery } from '@/lib/queries';
import getMetadataFromSEOConfig, {
  SeoType,
} from '@/utils/getMetadataFromSEOConfig';
import BookSummariesListSkeleton from '@components/bookSummariesList/skeleton';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const { bookSummaryPage }: { bookSummaryPage: BookSummariesPage } =
    await datoCMS({
      query: getCombinedQuery([bookSummariesPageQuery]),
      variables: { locale: locale },
    });

  const seo = bookSummaryPage.seo;

  return getMetadataFromSEOConfig(locale, SeoType.ARTICLE, seo);
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
