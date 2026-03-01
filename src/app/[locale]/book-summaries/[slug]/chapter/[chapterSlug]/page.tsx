import { Suspense } from 'react';
import { MainPageContainer } from '@components/ui/custom-container';
import ChapterDetail from '@components/bookSummary/ChapterDetail';
import { Metadata } from 'next';
import type { BookSummary } from '@/types';
import { datoCMS } from '@services/datoCMS';
import { getCombinedQueryWithSlug, bookSummaryQuery } from '@/lib/queries';
import ChapterDetailSkeleton from '@components/bookSummary/ChapterDetail/skeleton';
import getMetadataFromSEOConfig, {
  SeoType,
} from '@/utils/getMetadataFromSEOConfig';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string; chapterSlug: string }>;
}): Promise<Metadata> {
  const { locale, slug, chapterSlug } = await params;

  const { bookSummary }: { bookSummary: BookSummary } = await datoCMS({
    query: getCombinedQueryWithSlug([bookSummaryQuery]),
    variables: { locale, slug },
  });
  const chapter = bookSummary?.chapters?.find((c) => c.slugId === chapterSlug);
  const seo = bookSummary.seo;
  const metaData = getMetadataFromSEOConfig(locale, SeoType.ARTICLE, seo);
  metaData.title = `Chapter ${chapter?.chapter}: ${bookSummary.title}`;
  metaData.description = bookSummary?.excerpt;

  return metaData;
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
