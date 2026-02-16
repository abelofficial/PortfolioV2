'use client';
import React, { useState } from 'react';
import { SectionContainer } from '@components/ui/custom-container';
import { cn } from '@/lib/utils';

export interface LedgersListHeaderProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const LedgersListHeader = ({
  categories,
  activeCategory,
  setActiveCategory,
}: LedgersListHeaderProps) => {
  return (
    <SectionContainer
      disableShine
      disablePattern
      className="w-full rounded-none border-t-0 py-8 shadow-none"
    >
      <h1 className="text-3xl font-bold tracking-tight">Technical Ledgers</h1>
      <p className="text-muted-foreground mt-2">
        Documenting the process, architectural decisions, and field notes.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              'rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200',
              activeCategory === cat
                ? 'bg-primary text-primary-foreground border-primary shadow-md'
                : 'bg-secondary/50 text-muted-foreground hover:border-border border-transparent'
            )}
          >
            {cat}
          </button>
        ))}
      </div>
    </SectionContainer>
  );
};
export default LedgersListHeader;
