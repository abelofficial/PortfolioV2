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
import { getCodeFromLanguage } from '@/utils/languages';

interface BookSummaryProps {
  locale: string;
  slug: string;
}

const BookSummary = async ({ locale, slug }: BookSummaryProps) => {
  const datoLocale = getCodeFromLanguage(locale) ?? 'en';
  const {
    bookSummary,
    bookSummaryPage,
  }: {
    bookSummary: Summary;
    bookSummaryPage: BookSummariesPage;
  } = await datoCMS({
    query: getCombinedQueryWithSlug([bookSummaryQuery, bookSummariesPageQuery]),
    variables: { locale: datoLocale, slug },
  });

  if (!bookSummary) {
    notFound();
  }

  return (
    <div className="flex min-h-lvh flex-col pb-10">
      <SummaryHeader
        locale={locale}
        bookSummary={bookSummary}
        page={bookSummaryPage}
      />

      <SummaryContent content={bookSummary.introduction} />

      <ChapterNavigation
        locale={locale}
        bookSlugId={bookSummary.slugId}
        chapters={bookSummary.chapters}
        page={bookSummaryPage}
      />
    </div>
  );
};

export default BookSummary;
