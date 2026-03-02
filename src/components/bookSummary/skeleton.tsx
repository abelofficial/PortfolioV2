import { SectionContainer } from '@components/ui/custom-container';
import { Skeleton } from '@components/ui/skeleton';
import { ContentSkeleton } from '@components/ui/content-skeleton';
import ChapterNavigationSkeleton from '@components/bookSummary/ChapterNavigation/skeleton';

const BookSummarySkeleton = () => {
  return (
    <div className="flex flex-col pb-2">
      {/* Header */}
      <SectionContainer disableShine disablePattern className="p-4">
        <div className="flex flex-col gap-4">
          {/* Back link */}
          <Skeleton className="h-4 w-32" />

          <div className="flex flex-col gap-4 md:flex-row md:gap-6">
            {/* Book cover skeleton */}
            <Skeleton className="h-60 w-32 shrink-0 self-center rounded-lg md:h-60 md:w-40 md:self-start" />

            {/* Book info */}
            <div className="flex flex-1 flex-col gap-3">
              {/* Title */}
              <Skeleton className="h-8 w-4/5" />

              {/* Author */}
              <Skeleton className="h-4 w-32" />

              {/* Category */}
              <Skeleton className="h-5 w-24" />

              {/* Excerpt */}
              <div className="flex flex-col gap-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              {/* Tags */}
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-14" />
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* Content */}
      <ContentSkeleton paragraphCount={4} />

      {/* Chapters List */}
      <ChapterNavigationSkeleton />
    </div>
  );
};

export default BookSummarySkeleton;
