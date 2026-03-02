import { SectionContainer } from '@components/ui/custom-container';
import { Skeleton } from '@components/ui/skeleton';
import { ContentSkeleton } from '@components/ui/content-skeleton';

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
      <ContentSkeleton paragraphCount={4} hasCodeBlock />
    </div>
  );
};

export default TechnicalLedgerSkeleton;
