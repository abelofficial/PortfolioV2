import { SectionContainer } from '@components/ui/custom-container';
import { Skeleton } from '@components/ui/skeleton';

const LedgerCardSkeleton = () => {
  return (
    <div className="flex h-full flex-col gap-2 rounded-2xl border border-black/10 p-4 dark:border-white/10">
      {/* Title */}
      <Skeleton className="h-5 w-4/5 md:h-4" />

      {/* Excerpt */}
      <div className="flex flex-col gap-1">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-3 w-3/4" />
      </div>

      {/* Meta row: Category, Read Time, Date */}
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-3 w-14" />
        <Skeleton className="h-3 w-20" />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-5 w-14 rounded-full" />
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-12 rounded-full" />
      </div>
    </div>
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

          {/* Description */}
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-full max-w-xl" />
            <Skeleton className="h-4 w-3/4 max-w-md" />
          </div>

          {/* Filter section */}
          <div className="my-2 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-12" />
            </div>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-6 w-16 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* Ledger cards - responsive grid matching actual layout */}
      <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <LedgerCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default TechnicalLedgersListSkeleton;
