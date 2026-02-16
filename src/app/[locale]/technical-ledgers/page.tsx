import { MainPageContainer } from '@components/ui/custom-container';
import TechnicalLedgersList from '@components/technicalLedgersList';
import { Metadata } from 'next';
import { TechnicalLedgerPage } from '@/types';
import { datoCMS } from '@services/datoCMS';
import { getCombinedQuery, technicalLedgerPageQuery } from '@/lib/queries';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;

  const {
    technicalLedgersPage,
  }: { technicalLedgersPage: TechnicalLedgerPage } = await datoCMS({
    query: getCombinedQuery([technicalLedgerPageQuery]),
    variables: { locale: locale },
  });

  if (!technicalLedgersPage)
    return { title: 'Technical Ledger | Abel Sintaro' };

  const seo = technicalLedgersPage.seo;

  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: 'article',
      images: seo.image?.responsiveImage.src,
    },
  };
};

const TechnicalLedgersPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;

  return (
    <MainPageContainer className="pb-4">
      <TechnicalLedgersList locale={locale} />
    </MainPageContainer>
  );
};

export default TechnicalLedgersPage;
