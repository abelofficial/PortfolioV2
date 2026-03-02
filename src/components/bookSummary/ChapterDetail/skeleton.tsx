import { SectionContainer } from '@components/ui/custom-container';
import { Skeleton } from '@components/ui/skeleton';
import { ContentSkeleton } from '@components/ui/content-skeleton';

const ChapterDetailSkeleton = () => {
  return (
    <div className="flex flex-col pb-2">
      {/* Header */}
      <SectionContainer disableShine disablePattern className="p-4">
        <div className="flex flex-col gap-3">
          {/* Back link */}
          <Skeleton className="h-4 w-32" />

          {/* Book title */}
          <Skeleton className="h-4 w-48" />

          {/* Chapter badge */}
          <Skeleton className="h-5 w-24" />

          {/* Chapter title */}
          <Skeleton className="h-8 w-3/4" />
        </div>
      </SectionContainer>

      {/* Pagination */}
      <div className="flex items-center justify-between gap-3 px-5 py-4">
        <Skeleton className="h-9 w-10 rounded-full md:w-32" />
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-9 w-10 rounded-full md:w-28" />
      </div>

      {/* Content */}
      <ContentSkeleton paragraphCount={5} />
    </div>
  );
};

export default ChapterDetailSkeleton;
