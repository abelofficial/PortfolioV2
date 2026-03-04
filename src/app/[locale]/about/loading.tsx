import { MainPageContainer } from '@components/ui/custom-container';
import ProfileSkeleton from '@components/profile/skeleton';
import TechStackSkeleton from '@components/techStack/skeleton';
import ExperienceTimelineSkeleton from '@components/experienceTimeline/skeleton';
import TestimonialsSkeleton from '@components/testimonials/skeleton';

const Loading = () => {
  return (
    <MainPageContainer>
      <div id="profile" className="scroll-mt-24">
        <ProfileSkeleton />
      </div>

      <div id="tech" className="scroll-mt-24">
        <TechStackSkeleton />
      </div>

      <div id="experience" className="scroll-mt-24">
        <ExperienceTimelineSkeleton />
      </div>

      <div id="testimonials" className="scroll-mt-24">
        <TestimonialsSkeleton />
      </div>
    </MainPageContainer>
  );
};

export default Loading;
