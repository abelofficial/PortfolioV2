import ChapterHeader from '@components/bookSummary/ChapterDetail/ChapterHeader';
import ChapterContent from '@components/bookSummary/ChapterDetail/ChapterContent';
import ChapterPagination from '@components/bookSummary/ChapterDetail/ChapterPagination';
import { BookSummary, BookSummariesPage } from '@/types';
import { datoCMS } from '@services/datoCMS';
import {
  getCombinedQueryWithSlug,
  bookSummariesPageQuery,
  bookSummaryQuery,
} from '@/lib/queries';
import { notFound, redirect } from 'next/navigation';

interface ChapterDetailProps {
  locale: string;
  bookSlug: string;
  chapterSlug: string;
}

const ChapterDetail = async ({
  locale,
  bookSlug,
  chapterSlug,
}: ChapterDetailProps) => {
  const {
    bookSummary,
    bookSummaryPage,
  }: {
    bookSummary: BookSummary;
    bookSummaryPage: BookSummariesPage;
  } = await datoCMS({
    query: getCombinedQueryWithSlug([bookSummaryQuery, bookSummariesPageQuery]),
    variables: { locale, slug: bookSlug },
  });

  if (!bookSummary) {
    notFound();
  }

  // Sort all chapters by chapter number
  const allSortedChapters = [...bookSummary.chapters].sort(
    (a, b) => a.chapter - b.chapter
  );

  // Find current chapter in all chapters
  const currentChapter = allSortedChapters.find(
    (c) => c.slugId === chapterSlug
  );

  if (!currentChapter) {
    notFound();
  }

  // Redirect to book intro if chapter is not published
  if (!currentChapter.isPublished) {
    redirect(`/${locale}/book-summaries/${bookSummary.slugId}`);
  }

  // Filter to only published chapters for navigation
  const publishedChapters = allSortedChapters.filter((c) => c.isPublished);
  const currentPublishedIndex = publishedChapters.findIndex(
    (c) => c.slugId === chapterSlug
  );

  // Find current chapter index in all chapters for next chapter navigation
  const currentAllIndex = allSortedChapters.findIndex(
    (c) => c.slugId === chapterSlug
  );

  const prevChapter =
    currentPublishedIndex > 0
      ? publishedChapters[currentPublishedIndex - 1]
      : null;

  // Next chapter comes from all chapters (can be unpublished)
  const nextChapter =
    currentAllIndex < allSortedChapters.length - 1
      ? allSortedChapters[currentAllIndex + 1]
      : null;

  return (
    <div className="flex flex-col pb-2">
      <ChapterHeader
        locale={locale}
        bookSummary={bookSummary}
        chapter={currentChapter}
        prevChapter={prevChapter}
        page={bookSummaryPage}
      />

      <ChapterPagination
        locale={locale}
        bookSlugId={bookSummary.slugId}
        prevChapter={prevChapter}
        nextChapter={nextChapter}
        currentChapter={currentAllIndex + 1}
        totalChapters={allSortedChapters.length}
      />

      <ChapterContent content={currentChapter.content} />
    </div>
  );
};

export default ChapterDetail;
