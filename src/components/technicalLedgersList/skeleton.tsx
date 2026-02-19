import { SectionContainer } from '@components/ui/custom-container';
import { Skeleton } from '@components/ui/skeleton';

const LedgerCardSkeleton = () => {
  return (
    <SectionContainer disableShine className="p-4">
      <div className="flex flex-col gap-3">
        {/* Category badge */}
        <Skeleton className="h-5 w-20 rounded-full" />

        {/* Title */}
        <Skeleton className="h-6 w-3/4" />

        {/* Summary */}
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        {/* Date and read more */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </SectionContainer>
  );
};

const TechnicalLedgersListSkeleton = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Header skeleton */}
      <SectionContainer disableShine disablePattern className="p-4">
        <div className="flex flex-col gap-4">
          {/* Title */}
          <Skeleton className="h-8 w-48" />

          {/* Category filter buttons */}
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-20 rounded-full" />
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* Ledger cards */}
      <div className="flex flex-col gap-4 px-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <LedgerCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default TechnicalLedgersListSkeleton;
