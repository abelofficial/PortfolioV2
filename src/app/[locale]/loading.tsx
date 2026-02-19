import {
  MainPageContainer,
  MultiSectionLayout,
  SidebarContainer,
} from '@components/ui/custom-container';
import ProfileSkeleton from '@components/profile/skeleton';
import TechStackSkeleton from '@components/techStack/skeleton';
import ExperienceTimelineSkeleton from '@components/experienceTimeline/skeleton';
import TestimonialsSkeleton from '@components/testimonials/skeleton';
import ToolbarSkeleton from '@components/toolbar/skeleton';
import { DotPattern } from '@components/ui/dot-pattern';
import { cn } from '@/lib/utils';

const HomeLoading = () => {
  return (
    <MultiSectionLayout
      sidebar={
        <SidebarContainer>
          <div className="py-auto flex w-full flex-col gap-4 xl:h-full">
            <div className="shrink-0">
              <ToolbarSkeleton />
            </div>
          </div>
        </SidebarContainer>
      }
    >
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

      {/* Footer skeleton */}
      <div className="bg-background relative w-full gap-2 py-15 text-center">
        <DotPattern
          className={cn(
            'mask-[radial-gradient(300px_circle_at_top_right,white,transparent)]',
            'lg:mask-[radial-gradient(400px_circle_at_right,white,transparent)]'
          )}
        />
        <div className="bg-muted mx-auto h-4 w-24 animate-pulse rounded py-5" />
      </div>
    </MultiSectionLayout>
  );
};

export default HomeLoading;
