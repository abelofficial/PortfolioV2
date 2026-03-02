import { MainPageContainer } from '@components/ui/custom-container';
import BookSummariesListSkeleton from '@components/bookSummariesList/skeleton';

const Loading = () => {
  return (
    <MainPageContainer className="p-0 md:p-4">
      <BookSummariesListSkeleton />
    </MainPageContainer>
  );
};

export default Loading;
