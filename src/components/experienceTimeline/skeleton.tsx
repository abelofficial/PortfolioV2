import { SectionContainer } from '@components/ui/custom-container';
import { Skeleton } from '@components/ui/skeleton';

const TimelineCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      {/* Company/Institution name */}
      <Skeleton className="h-5 w-40" />
      {/* Position/Degree */}
      <Skeleton className="h-4 w-32" />
      {/* Description */}
      <div className="flex flex-col gap-1">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-3 w-4/5" />
      </div>
    </div>
  );
};

interface ExperienceSectionSkeletonProps {
  title?: string;
  itemCount?: number;
}

const ExperienceSectionSkeleton = ({
  itemCount = 3,
}: ExperienceSectionSkeletonProps) => {
  return (
    <SectionContainer disableShine>
      {/* Section title skeleton */}
      <Skeleton className="mb-4 h-5 w-36" />

      <div className="relative flex flex-col gap-6 pl-6">
        {/* Timeline line */}
        <div className="bg-border absolute top-0 left-2 h-full w-0.5" />

        {Array.from({ length: itemCount }).map((_, i) => (
          <div key={i} className="relative flex gap-4">
            {/* Timeline dot */}
            <div className="bg-muted absolute -left-4.5 h-4 w-4 rounded-full" />

            <div className="flex flex-1 flex-col gap-2">
              {/* Date */}
              <Skeleton className="h-4 w-28" />

              <TimelineCardSkeleton />
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
};

const ExperienceTimelineSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* Work experience section */}
      <ExperienceSectionSkeleton itemCount={3} />

      {/* Education section */}
      <ExperienceSectionSkeleton itemCount={2} />
    </div>
  );
};

export default ExperienceTimelineSkeleton;
