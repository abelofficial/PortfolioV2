import { datoCMS } from '@services/datoCMS';
import { allTechnicalLedgersQuery, getCombinedQuery } from '@/lib/queries';
import { TechnicalLedgerList } from '@/types';
import FilteredLedgersList from '@components/technicalLedgersList/filteredLedgersList';

export interface TechnicalLedgersListProps {
  locale: string;
}
const TechnicalLedgersList = async ({ locale }: TechnicalLedgersListProps) => {
  const { allTechnicalLedgers }: TechnicalLedgerList = await datoCMS({
    query: getCombinedQuery([allTechnicalLedgersQuery]),
    variables: { locale: 'en' },
  });

  return (
    <FilteredLedgersList
      locale={locale}
      categories={allTechnicalLedgers.map((l) => l.category)}
      technicalLedgersList={allTechnicalLedgers}
    />
  );
};

export default TechnicalLedgersList;
