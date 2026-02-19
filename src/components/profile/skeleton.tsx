import { CardContent, CardHeader } from '@components/ui/card';
import { SectionContainer } from '@components/ui/custom-container';
import { Separator } from '@components/ui/separator';
import { Skeleton } from '@components/ui/skeleton';

const ProfileSkeleton = () => {
  return (
    <SectionContainer disablePattern>
      <CardHeader className="flex flex-col items-center gap-3 pt-12 md:pt-10">
        {/* Avatar skeleton */}
        <Skeleton className="h-37.5 w-37.5 rounded-full" />

        {/* Name skeleton */}
        <Skeleton className="h-7 w-48 md:h-8" />

        <div className="flex flex-col items-center gap-3 text-center">
          {/* Job title skeleton */}
          <Skeleton className="h-6 w-36" />

          <Separator className="w-full max-w-md bg-black/10 dark:bg-white/10" />

          {/* Intro skeleton */}
          <div className="flex w-full max-w-2xl flex-col items-center gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex max-w-full flex-col items-center self-center p-1">
        <div className="mt-5 flex w-full flex-col items-center gap-2 md:mt-7 md:gap-3">
          {/* Connect label skeleton */}
          <Skeleton className="h-3 w-24" />

          {/* Contact links skeleton */}
          <div className="flex w-full max-w-xl flex-wrap items-center justify-center gap-2 md:max-w-2xl md:gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-9 w-28 rounded-full md:h-10" />
            ))}
          </div>
        </div>

        <div className="mt-8 w-full md:mt-10">
          <Separator className="w-full bg-black/10 dark:bg-white/10" />
          {/* Contribution calendar skeleton */}
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex flex-wrap gap-1">
              {Array.from({ length: 52 * 7 }).map((_, i) => (
                <Skeleton key={i} className="h-3 w-3 rounded-sm" />
              ))}
            </div>
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
      </CardContent>
    </SectionContainer>
  );
};

export default ProfileSkeleton;
