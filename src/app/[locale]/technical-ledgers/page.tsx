import { MainPageContainer } from '@components/ui/custom-container';
import TechnicalLedgersList from '@components/technicalLedgersList';

const Notes = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;

  return (
    <MainPageContainer className="p-0">
      <TechnicalLedgersList locale={locale} />
    </MainPageContainer>
  );
};

export default Notes;
