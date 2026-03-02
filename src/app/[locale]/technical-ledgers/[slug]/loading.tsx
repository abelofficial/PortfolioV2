import { MainPageContainer } from '@components/ui/custom-container';
import TechnicalLedgerSkeleton from '@components/technicalLedger/skeleton';

const Loading = () => {
  return (
    <MainPageContainer className="p-0 md:p-4">
      <TechnicalLedgerSkeleton />
    </MainPageContainer>
  );
};

export default Loading;
