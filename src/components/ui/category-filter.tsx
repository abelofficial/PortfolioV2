'use client';

import { cn } from '@/lib/utils';
import { Filter } from 'lucide-react';

export interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  selectedLabel: string;
  resultsLabel: string;
  resultCount: number;
}

const CategoryFilter = ({
  categories,
  activeCategory,
  setActiveCategory,
  selectedLabel,
  resultsLabel,
  resultCount,
}: CategoryFilterProps) => {
  return (
    <div className="my-5">
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Filter className="text-primary/80 h-4 w-4" />
          <p className="text-sm font-semibold">Filter</p>
        </div>

        {/* selected indicator */}
        <p className="text-muted-foreground text-xs">
          {selectedLabel}{' '}
          <span className="text-primary-light font-semibold">
            {activeCategory}
          </span>
          {' · '}
          {resultCount} {resultsLabel}
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
                'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition',
                'focus-visible:ring-primary/40 focus-visible:ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                !isActive &&
                  'text-muted-foreground hover:border-primary/30 hover:bg-primary/5 hover:text-foreground border border-black/10 bg-black/2 dark:border-white/10 dark:bg-white/3',
                isActive &&
                  'bg-primary-light shadow-primary/25 text-neutral-800 shadow-sm'
              )}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export { CategoryFilter };
