import { SectionContainer } from '@components/ui/custom-container';
import { Skeleton } from '@components/ui/skeleton';

const TechnicalLedgerSkeleton = () => {
  return (
    <div className="flex flex-col pb-2">
      {/* Header */}
      <SectionContainer disableShine disablePattern className="p-4">
        <div className="flex flex-col gap-4">
          {/* Back link */}
          <Skeleton className="h-4 w-32" />

          {/* Category badge */}
          <Skeleton className="h-6 w-24 rounded-full" />

          {/* Title */}
          <Skeleton className="h-10 w-4/5" />

          {/* Date */}
          <Skeleton className="h-4 w-40" />
        </div>
      </SectionContainer>

      {/* Content */}
      <div className="flex flex-col gap-4 p-4">
        {/* Paragraphs */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        ))}

        {/* Code block skeleton */}
        <Skeleton className="h-40 w-full rounded-lg" />

        {/* More paragraphs */}
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnicalLedgerSkeleton;
