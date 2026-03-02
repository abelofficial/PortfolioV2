import { Skeleton } from '@components/ui/skeleton';

const ChapterNavigationSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 px-5 py-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Skeleton className="size-4" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>

      {/* Chapter items grid */}
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-3 rounded-lg border border-black/10 p-3 dark:border-white/10"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="size-8 shrink-0 rounded-full" />
              <Skeleton className="h-4 w-32 md:w-40" />
            </div>
            <Skeleton className="size-4 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChapterNavigationSkeleton;
