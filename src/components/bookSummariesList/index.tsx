import { datoCMS } from '@services/datoCMS';
import {
  allBookSummaries,
  bookSummariesPageQuery,
  getCombinedQuery,
} from '@/lib/queries';
import { BookSummariesPage, BookSummary } from '@/types';
import FilteredSummariesList from '@components/bookSummariesList/filteredSummariesList';
import { getCodeFromLanguage } from '@/utils/languages';

export interface BookSummariesListProps {
  locale: string;
}

const BookSummariesList = async ({ locale }: BookSummariesListProps) => {
  const datoLocale = getCodeFromLanguage(locale) ?? 'en';
  const {
    bookSummaryPage,
    allBookSummaries: bookSummariesList,
  }: {
    bookSummaryPage: BookSummariesPage;
    allBookSummaries: BookSummary[];
  } = await datoCMS({
    query: getCombinedQuery([bookSummariesPageQuery, allBookSummaries]),
    variables: { locale: datoLocale },
  });

  return (
    <FilteredSummariesList
      locale={locale}
      categories={bookSummariesList.map((s) => s.category)}
      bookSummariesList={bookSummariesList}
      page={bookSummaryPage}
    />
  );
};

export default BookSummariesList;
