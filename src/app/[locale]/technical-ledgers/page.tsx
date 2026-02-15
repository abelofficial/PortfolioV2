import { MainPageContainer } from '@components/ui/custom-container';
import TechnicalLedgersList from '@components/technicalLedgersList';

const Notes = () => {
  return (
    <MainPageContainer className="p-0">
      <TechnicalLedgersList />
    </MainPageContainer>
  );
};

export default Notes;
