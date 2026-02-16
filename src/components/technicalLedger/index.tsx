import LedgerHeader from '@components/technicalLedger/LedgerHeader';
import LedgerContent from '@components/technicalLedger/LedgerContent';
import { SingleTechnicalLedger } from '@/types';
import { datoCMS } from '@services/datoCMS';
import { getCombinedQueryWithSlug, technicalLedgersQuery } from '@/lib/queries';
import { notFound } from 'next/navigation';

interface TechnicalNotePageProps {
  locale: string;
  slug: string;
}

const TechnicalLedger = async ({ locale, slug }: TechnicalNotePageProps) => {
  console.log(slug);
  const { technicalLedger }: SingleTechnicalLedger = await datoCMS({
    query: getCombinedQueryWithSlug([technicalLedgersQuery]),
    variables: { locale, slug },
  });

  if (!technicalLedger) {
    notFound();
  }
  return (
    <div className="flex flex-col pb-2">
      <LedgerHeader locale={locale} technicalLedger={technicalLedger} />

      <LedgerContent content={technicalLedger.fullNote} />
    </div>
  );
};

export default TechnicalLedger;
