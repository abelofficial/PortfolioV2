import { SectionContainer } from '@components/ui/custom-container';
import { Skeleton } from '@components/ui/skeleton';

const TechStackSkeleton = () => {
  return (
    <SectionContainer disableShine disablePattern>
      {/* Title skeleton */}
      <Skeleton className="mb-2 h-5 w-32" />

      <div className="relative mt-2 rounded-2xl border border-black/5 bg-black/2 px-4 py-6 dark:border-white/10 dark:bg-white/3">
        <div className="flex gap-12 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="flex w-27.5 flex-none flex-col items-center justify-center gap-2 sm:w-32.5 xl:w-37.5"
            >
              <Skeleton className="h-10 w-10 rounded-lg sm:h-12 sm:w-12 lg:h-14 lg:w-14" />
              <Skeleton className="h-3 w-16" />
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
};

export default TechStackSkeleton;
