import { Suspense } from 'react';
import { MainPageContainer } from '@components/ui/custom-container';
import BookSummary from '@components/bookSummary';
import { Metadata } from 'next';
import type { BookSummary as BookSummaryType } from '@/types';
import { datoCMS } from '@services/datoCMS';
import { getCombinedQueryWithSlug, bookSummaryQuery } from '@/lib/queries';
import getMetadataFromSEOConfig, {
  SeoType,
} from '@/utils/getMetadataFromSEOConfig';
import BookSummarySkeleton from '@components/bookSummary/skeleton';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  const { bookSummary }: { bookSummary: BookSummaryType } = await datoCMS({
    query: getCombinedQueryWithSlug([bookSummaryQuery]),
    variables: { locale, slug },
  });

  const seo = bookSummary.seo;

  return getMetadataFromSEOConfig(locale, SeoType.ARTICLE, seo);
}

const BookSummaryPage = async ({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) => {
  const { locale, slug } = await params;

  return (
    <MainPageContainer className="p-0 md:p-4">
      <Suspense fallback={<BookSummarySkeleton />}>
        <BookSummary locale={locale} slug={slug} />
      </Suspense>
    </MainPageContainer>
  );
};

export default BookSummaryPage;
