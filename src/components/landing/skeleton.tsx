import { SectionContainer } from '@components/ui/custom-container';
import { Skeleton } from '@components/ui/skeleton';

const LandingSkeleton = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Welcome Section Skeleton */}
      <SectionContainer disablePattern>
        <div className="flex flex-col items-center gap-4 py-8 md:py-12">
          <Skeleton className="h-8 w-64 md:h-10 md:w-80" />
          <Skeleton className="h-4 w-full max-w-2xl" />
          <Skeleton className="h-4 w-3/4 max-w-xl" />
        </div>
      </SectionContainer>

      {/* Currently Reading Section Skeleton */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex flex-col gap-1">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-3 w-56" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="border-border bg-card flex gap-3 rounded-2xl border p-3"
            >
              <Skeleton className="h-24 w-16 shrink-0 rounded-lg" />
              <div className="flex flex-1 flex-col justify-between gap-2">
                <div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="mt-1 h-3 w-20" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between">
                    <Skeleton className="h-2 w-16" />
                    <Skeleton className="h-2 w-8" />
                  </div>
                  <Skeleton className="h-1 w-full rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Findings Section Skeleton */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex flex-col gap-1">
            <Skeleton className="h-6 w-36" />
            <Skeleton className="h-3 w-48" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="border-border bg-card flex flex-col gap-2 rounded-2xl border p-4"
            >
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
              <div className="mt-1 flex gap-3">
                <Skeleton className="h-4 w-16 rounded-full" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Currently Working On Section Skeleton */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex flex-col gap-1">
            <Skeleton className="h-6 w-44" />
            <Skeleton className="h-3 w-52" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="border-border bg-card flex flex-col gap-3 rounded-2xl border p-4"
            >
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
              <div className="flex gap-1">
                {[1, 2, 3].map((j) => (
                  <Skeleton key={j} className="h-4 w-14 rounded-full" />
                ))}
              </div>
              <div className="flex gap-3">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-10" />
                <Skeleton className="ml-auto h-3 w-20" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingSkeleton;
