import { MainPageContainer } from '@components/ui/custom-container';
import BookSummarySkeleton from '@components/bookSummary/skeleton';

const Loading = () => {
  return (
    <MainPageContainer className="p-0 md:p-4">
      <BookSummarySkeleton />
    </MainPageContainer>
  );
};

export default Loading;
