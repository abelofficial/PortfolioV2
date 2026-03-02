import { MainPageContainer } from '@components/ui/custom-container';
import TechnicalLedgersListSkeleton from '@components/technicalLedgersList/skeleton';

const Loading = () => {
  return (
    <MainPageContainer className="p-0 md:p-4">
      <TechnicalLedgersListSkeleton />
    </MainPageContainer>
  );
};

export default Loading;
