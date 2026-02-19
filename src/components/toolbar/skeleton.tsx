import { Skeleton } from '@components/ui/skeleton';

const ToolbarSkeleton = () => {
  return (
    <div className="bg-card flex w-full justify-around rounded-xl border p-2">
      <Skeleton className="h-8 w-8 rounded-full" />
      <Skeleton className="h-8 w-8 rounded-full" />
      <div className="bg-border mx-2 w-px" />
      <Skeleton className="h-8 w-8 rounded-full" />
      <Skeleton className="h-8 w-8 rounded-full" />
    </div>
  );
};

export default ToolbarSkeleton;
