'use client';

import { SectionContainer } from '@components/ui/custom-container';
import { CategoryFilter } from '@components/ui/category-filter';
import { BookSummariesPage } from '@/types';

export interface SummariesListHeaderProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  page: BookSummariesPage;
  resultCount: number;
}

const SummariesListHeader = ({
  categories,
  activeCategory,
  setActiveCategory,
  page,
  resultCount,
}: SummariesListHeaderProps) => {
  return (
    <SectionContainer
      disableShine
      disablePattern
      className="w-full rounded-none border-t-0"
    >
      {/* HERO */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              {page.title}
            </h1>
          </div>
        </div>

        <p className="text-muted-foreground max-w-3xl text-sm leading-relaxed md:text-base">
          {page.description}
        </p>
      </div>

      {/* FILTERS */}
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        selectedLabel={page.selected}
        resultsLabel={page.results}
        resultCount={resultCount}
      />
    </SectionContainer>
  );
};

export default SummariesListHeader;
