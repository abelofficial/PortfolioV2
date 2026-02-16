import { MainPageContainer } from '@components/ui/custom-container';
import TechnicalLedger from '@components/technicalLedger';
import { Metadata } from 'next';
import { SingleTechnicalLedger } from '@/types';
import { datoCMS } from '@services/datoCMS';
import { getCombinedQueryWithSlug, technicalLedgersQuery } from '@/lib/queries';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> => {
  const { locale, slug } = await params;

  const data: SingleTechnicalLedger = await datoCMS({
    query: getCombinedQueryWithSlug([technicalLedgersQuery]),
    variables: { locale, slug },
  });

  const seo = data?.technicalLedger?.seo;

  if (!seo) return { title: 'Note Not Found | Abel Sintaro' };

  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: 'article',
    },
  };
};

const LedgerPage = async ({
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

export default LedgerPage;
