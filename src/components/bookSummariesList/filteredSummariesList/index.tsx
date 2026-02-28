'use client';

import SummariesListHeader from '@components/bookSummariesList/summariesListHeader';
import SummariesList, {
  BookSummary,
} from '@components/bookSummariesList/summariesList';
import { BookSummariesPage } from '@/types';
import { useState } from 'react';

export interface FilteredBookSummariesListProps {
  locale: string;
  categories: string[];
  bookSummariesList: BookSummary[];
  page: BookSummariesPage;
}

const FilteredSummariesList = ({
  locale,
  categories,
  bookSummariesList,
  page,
}: FilteredBookSummariesListProps) => {
  const [activeCategory, setActiveCategory] = useState(page.all);
  const distinctCategories = [page.all, ...new Set<string>(categories)];

  const filteredSummaries =
    activeCategory === page.all
      ? bookSummariesList
      : bookSummariesList.filter((s) => s.category === activeCategory);

  return (
    <div className="flex flex-col gap-6">
      <SummariesListHeader
        categories={distinctCategories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        page={page}
      />
      <SummariesList locale={locale} bookSummariesList={filteredSummaries} />
    </div>
  );
};

export default FilteredSummariesList;
