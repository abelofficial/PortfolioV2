'use client';
import LedgersListHeader from '@components/technicalLedgersList/ledgersListHeader';
import { TechnicalLedger } from '@/types';
import LedgersList from '@components/technicalLedgersList/ledgersList';
import { useState } from 'react';

export interface FilteredTechnicalLedgersListProps {
  locale: string;
  categories: string[];
  technicalLedgersList: TechnicalLedger[];
}
const FilteredLedgersList = ({
  locale,
  categories,
  technicalLedgersList,
}: FilteredTechnicalLedgersListProps) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const distinctCategories = ['All', ...new Set(categories)];

  const filteredNotes =
    activeCategory === 'All'
      ? technicalLedgersList
      : technicalLedgersList.filter((n) => n.category === activeCategory);

  return (
    <div className="flex flex-col gap-6 xl:pt-4">
      <LedgersListHeader
        categories={distinctCategories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <LedgersList locale={locale} technicalLedgersList={filteredNotes} />
    </div>
  );
};

export default FilteredLedgersList;
