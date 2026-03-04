import LedgerHeader from '@components/technicalLedger/LedgerHeader';
import LedgerContent from '@components/technicalLedger/LedgerContent';
import { TechnicalLedger as Ledger, TechnicalLedgerPage } from '@/types';
import { datoCMS } from '@services/datoCMS';
import {
  getCombinedQueryWithSlug,
  technicalLedgerPageQuery,
  technicalLedgersQuery,
} from '@/lib/queries';
import { notFound } from 'next/navigation';
import { getCodeFromLanguage } from '@/utils/languages';

interface TechnicalNotePageProps {
  locale: string;
  slug: string;
}

const TechnicalLedger = async ({ locale, slug }: TechnicalNotePageProps) => {
  const datoLocale = getCodeFromLanguage(locale) ?? 'en';
  const {
    technicalLedger,
    technicalLedgersPage,
  }: {
    technicalLedger: Ledger;
    technicalLedgersPage: TechnicalLedgerPage;
  } = await datoCMS({
    query: getCombinedQueryWithSlug([
      technicalLedgersQuery,
      technicalLedgerPageQuery,
    ]),
    variables: { locale: datoLocale, slug },
  });

  if (!technicalLedger) {
    notFound();
  }
  return (
    <div className="flex flex-col pb-2">
      <LedgerHeader
        locale={locale}
        technicalLedger={technicalLedger}
        page={technicalLedgersPage}
      />

      <LedgerContent content={technicalLedger.fullNote} />
    </div>
  );
};

export default TechnicalLedger;
