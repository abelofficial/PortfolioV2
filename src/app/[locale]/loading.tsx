import { MainPageContainer } from '@components/ui/custom-container';
import LandingSkeleton from '@components/landing/skeleton';

const Loading = () => {
  return (
    <MainPageContainer>
      <LandingSkeleton />
    </MainPageContainer>
  );
};

export default Loading;
