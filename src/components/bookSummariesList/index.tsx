import { datoCMS } from '@services/datoCMS';
import {
  allBookSummaries,
  bookSummariesPageQuery,
  getCombinedQuery,
} from '@/lib/queries';
import { BookSummariesPage, BookSummary } from '@/types';
import FilteredSummariesList from '@components/bookSummariesList/filteredSummariesList';

export interface BookSummariesListProps {
  locale: string;
}

const BookSummariesList = async ({ locale }: BookSummariesListProps) => {
  const {
    bookSummaryPage,
    allBookSummaries: bookSummariesList,
  }: {
    bookSummaryPage: BookSummariesPage;
    allBookSummaries: BookSummary[];
  } = await datoCMS({
    query: getCombinedQuery([bookSummariesPageQuery, allBookSummaries]),
    variables: { locale },
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
