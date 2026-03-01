import SummaryHeader from '@components/bookSummary/SummaryHeader';
import SummaryContent from '@components/bookSummary/SummaryContent';
import ChapterNavigation from '@components/bookSummary/ChapterNavigation';
import { BookSummary as Summary, BookSummariesPage } from '@/types';
import { datoCMS } from '@services/datoCMS';
import {
  getCombinedQueryWithSlug,
  bookSummariesPageQuery,
  bookSummaryQuery,
} from '@/lib/queries';
import { notFound } from 'next/navigation';

interface BookSummaryProps {
  locale: string;
  slug: string;
}

const BookSummary = async ({ locale, slug }: BookSummaryProps) => {
  const {
    bookSummary,
    bookSummaryPage,
  }: {
    bookSummary: Summary;
    bookSummaryPage: BookSummariesPage;
  } = await datoCMS({
    query: getCombinedQueryWithSlug([bookSummaryQuery, bookSummariesPageQuery]),
    variables: { locale, slug },
  });

  if (!bookSummary) {
    notFound();
  }

  return (
    <div className="flex flex-col pb-2">
      <SummaryHeader
        locale={locale}
        bookSummary={bookSummary}
        page={bookSummaryPage}
      />

      <ChapterNavigation
        locale={locale}
        bookSlugId={bookSummary.slugId}
        chapters={bookSummary.chapters}
      />

      <SummaryContent content={bookSummary.introduction} />
    </div>
  );
};

export default BookSummary;
