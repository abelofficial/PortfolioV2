import { SectionContainer } from '@components/ui/custom-container';
import { Skeleton } from '@components/ui/skeleton';

const SummaryCardSkeleton = () => {
  return (
    <SectionContainer disableShine className="p-4">
      <div className="flex gap-4">
        {/* Book cover skeleton */}
        <Skeleton className="aspect-2/3 w-24 shrink-0 rounded-lg md:w-28" />

        {/* Content skeleton */}
        <div className="flex flex-1 flex-col gap-2">
          {/* Category badge */}
          <Skeleton className="h-5 w-16 rounded-full" />

          {/* Title */}
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />

          {/* Author */}
          <Skeleton className="h-3 w-24" />

          {/* Excerpt */}
          <div className="flex flex-col gap-1">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
            <Skeleton className="h-3 w-4/6" />
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-5 w-14 rounded-full" />
        ))}
      </div>
    </SectionContainer>
  );
};

const BookSummariesListSkeleton = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Header skeleton */}
      <SectionContainer disableShine disablePattern className="p-4">
        <div className="flex flex-col gap-4">
          {/* Title */}
          <Skeleton className="h-8 w-48" />

          {/* Description */}
          <Skeleton className="h-4 w-full max-w-3xl" />
          <Skeleton className="h-4 w-2/3 max-w-3xl" />

          {/* Category filter buttons */}
          <div className="mt-2 flex flex-wrap gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-20 rounded-full" />
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* Summary cards - grid layout */}
      <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <SummaryCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default BookSummariesListSkeleton;
