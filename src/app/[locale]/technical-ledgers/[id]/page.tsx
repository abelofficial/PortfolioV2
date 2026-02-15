import { MainPageContainer } from '@components/ui/custom-container';
import TechnicalLedger from '@components/technicalLedger';

const TechnicalLedgers = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  return (
    <MainPageContainer className="p-0">
      <TechnicalLedger locale={locale} />
    </MainPageContainer>
  );
};

export default TechnicalLedgers;
