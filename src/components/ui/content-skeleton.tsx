import { Skeleton } from '@components/ui/skeleton';

export interface ContentSkeletonProps {
  paragraphCount?: number;
  hasCodeBlock?: boolean;
}

const ContentSkeleton = ({
  paragraphCount = 4,
  hasCodeBlock = false,
}: ContentSkeletonProps) => {
  return (
    <div className="flex min-h-[calc(100lvh-18rem)] flex-col gap-6 px-5 py-4">
      {/* Heading skeleton */}
      <Skeleton className="h-7 w-2/5" />

      {/* Paragraphs */}
      {Array.from({ length: Math.ceil(paragraphCount / 2) }).map((_, i) => (
        <div key={`p1-${i}`} className="flex flex-col gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      ))}

      {/* Subheading */}
      <Skeleton className="h-6 w-1/3" />

      {/* More paragraphs */}
      {Array.from({ length: Math.floor(paragraphCount / 2) }).map((_, i) => (
        <div key={`p2-${i}`} className="flex flex-col gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      ))}

      {/* Code block skeleton */}
      {hasCodeBlock && (
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-32 w-full rounded-lg" />
        </div>
      )}

      {/* Final paragraph */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
};

export { ContentSkeleton };
