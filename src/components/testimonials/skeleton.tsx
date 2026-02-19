import { CardContent, CardFooter } from '@components/ui/card';
import { SectionContainer } from '@components/ui/custom-container';
import { Skeleton } from '@components/ui/skeleton';

const TestimonialsSkeleton = () => {
  return (
    <div className="w-full">
      <SectionContainer disablePattern className="bg-black/3 dark:bg-white/3">
        <CardContent className="m-0 max-w-3xl self-center px-4 pt-2 pb-4">
          {/* Quote skeleton */}
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-4 w-full max-w-2xl" />
            <Skeleton className="h-4 w-5/6 max-w-xl" />
            <Skeleton className="h-4 w-4/5 max-w-lg" />
          </div>
        </CardContent>

        <CardFooter className="flex justify-center pb-6">
          {/* Author info skeleton */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>
        </CardFooter>
      </SectionContainer>
    </div>
  );
};

export default TestimonialsSkeleton;
