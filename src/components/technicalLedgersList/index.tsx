import { datoCMS } from '@services/datoCMS';
import {
  allTechnicalLedgersQuery,
  getCombinedQuery,
  technicalLedgerPageQuery,
} from '@/lib/queries';
import { TechnicalLedger, TechnicalLedgerPage } from '@/types';
import FilteredLedgersList from '@components/technicalLedgersList/filteredLedgersList';

export interface TechnicalLedgersListProps {
  locale: string;
}
const TechnicalLedgersList = async ({ locale }: TechnicalLedgersListProps) => {
  const {
    allTechnicalLedgers,
    technicalLedgersPage,
  }: {
    allTechnicalLedgers: TechnicalLedger[];
    technicalLedgersPage: TechnicalLedgerPage;
  } = await datoCMS({
    query: getCombinedQuery([
      allTechnicalLedgersQuery,
      technicalLedgerPageQuery,
    ]),
    variables: { locale },
  });

  return (
    <FilteredLedgersList
      locale={locale}
      categories={allTechnicalLedgers.map((l) => l.category)}
      technicalLedgersList={allTechnicalLedgers}
      page={technicalLedgersPage}
    />
  );
};

export default TechnicalLedgersList;
