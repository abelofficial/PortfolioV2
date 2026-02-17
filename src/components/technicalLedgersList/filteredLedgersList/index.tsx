'use client';
import LedgersListHeader from '@components/technicalLedgersList/ledgersListHeader';
import { TechnicalLedger, TechnicalLedgerPage } from '@/types';
import LedgersList from '@components/technicalLedgersList/ledgersList';
import { useState } from 'react';

export interface FilteredTechnicalLedgersListProps {
  locale: string;
  categories: string[];
  technicalLedgersList: TechnicalLedger[];
  page: TechnicalLedgerPage;
}
const FilteredLedgersList = ({
  locale,
  categories,
  technicalLedgersList,
  page,
}: FilteredTechnicalLedgersListProps) => {
  const [activeCategory, setActiveCategory] = useState(page.all);
  const distinctCategories = [page.all, ...new Set<string>(categories)];

  const filteredNotes =
    activeCategory === page.all
      ? technicalLedgersList
      : technicalLedgersList.filter((n) => n.category === activeCategory);

  return (
    <div className="flex flex-col gap-6">
      <LedgersListHeader
        categories={distinctCategories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        page={page}
      />
      <LedgersList
        locale={locale}
        technicalLedgersList={filteredNotes}
        page={page}
      />
    </div>
  );
};

export default FilteredLedgersList;
