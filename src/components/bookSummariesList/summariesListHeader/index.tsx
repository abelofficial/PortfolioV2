'use client';

import { SectionContainer } from '@components/ui/custom-container';
import { cn } from '@/lib/utils';
import { BookSummariesPage } from '@/types';
import { Filter } from 'lucide-react';

export interface SummariesListHeaderProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  page: BookSummariesPage;
}

const SummariesListHeader = ({
  categories,
  activeCategory,
  setActiveCategory,
  page,
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
      <div className="my-5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Filter className="text-primary/80 h-4 w-4" />
            <p className="text-sm font-semibold">Filter</p>
          </div>

          {/* smaller, less dominant selected indicator */}
          <p className="text-muted-foreground text-xs">
            Selected:{' '}
            <span className="text-foreground font-semibold">
              {activeCategory}
            </span>
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={isActive}
                className={cn(
                  'inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition',
                  'focus-visible:ring-primary/40 focus-visible:ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                  !isActive &&
                    'text-muted-foreground hover:border-primary/30 hover:bg-primary/5 hover:text-foreground border border-black/10 bg-black/2 dark:border-white/10 dark:bg-white/3',
                  isActive &&
                    'bg-primary text-primary-foreground shadow-primary/25 shadow-sm'
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </SectionContainer>
  );
};

export default SummariesListHeader;
