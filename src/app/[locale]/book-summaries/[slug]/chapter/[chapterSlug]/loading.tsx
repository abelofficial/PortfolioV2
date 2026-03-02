import { MainPageContainer } from '@components/ui/custom-container';
import ChapterDetailSkeleton from '@components/bookSummary/ChapterDetail/skeleton';

const Loading = () => {
  return (
    <MainPageContainer className="p-0 md:p-4">
      <ChapterDetailSkeleton />
    </MainPageContainer>
  );
};

export default Loading;
