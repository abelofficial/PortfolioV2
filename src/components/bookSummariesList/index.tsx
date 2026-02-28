import { datoCMS } from '@services/datoCMS';
import { bookSummariesPageQuery, getCombinedQuery } from '@/lib/queries';
import { BookSummariesPage } from '@/types';
import FilteredSummariesList from '@components/bookSummariesList/filteredSummariesList';
import { BookSummary } from '@components/bookSummariesList/summariesList';

export interface BookSummariesListProps {
  locale: string;
}

const BookSummariesList = async ({ locale }: BookSummariesListProps) => {
  const {
    bookSummaryPage,
  }: {
    bookSummaryPage: BookSummariesPage;
  } = await datoCMS({
    query: getCombinedQuery([bookSummariesPageQuery]),
    variables: { locale },
  });

  // TODO: Fetch actual book summaries when query is available
  // Replace this with: allBookSummariesQuery when defined
  const allBookSummaries: BookSummary[] = [];

  return (
    <FilteredSummariesList
      locale={locale}
      categories={allBookSummaries.map((s) => s.category)}
      bookSummariesList={allBookSummaries}
      page={bookSummaryPage}
    />
  );
};

export default BookSummariesList;
