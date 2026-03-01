import { SectionContainer } from '@components/ui/custom-container';
import { Skeleton } from '@components/ui/skeleton';

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
      <div className="flex flex-col gap-4 p-4">
        {/* Paragraphs */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        ))}

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

export default ChapterDetailSkeleton;
