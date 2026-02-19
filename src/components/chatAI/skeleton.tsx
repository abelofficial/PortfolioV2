import { SectionContainer } from '@components/ui/custom-container';
import { Skeleton } from '@components/ui/skeleton';

const ChatAISkeleton = () => {
  return (
    <SectionContainer fullHeight className="p-4">
      {/* Chat header skeleton */}
      <div className="flex items-center gap-2 px-4 pt-3 pb-2">
        <Skeleton className="h-3 w-full max-w-xs" />
      </div>

      {/* Chat suggestions area */}
      <div className="flex flex-1 flex-col gap-3 px-4 py-4">
        <Skeleton className="h-4 w-24" />
        <div className="flex flex-col gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-lg" />
          ))}
        </div>
      </div>

      {/* Chat input skeleton */}
      <div className="px-4 pb-4">
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
    </SectionContainer>
  );
};

export default ChatAISkeleton;
