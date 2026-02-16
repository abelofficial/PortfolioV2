import { MainPageContainer } from '@components/ui/custom-container';
import TechnicalLedger from '@components/technicalLedger';

const TechnicalLedgers = async ({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) => {
  const { locale, slug } = await params;
  return (
    <MainPageContainer className="p-0">
      <TechnicalLedger locale={locale} slug={slug} />
    </MainPageContainer>
  );
};

export default TechnicalLedgers;
