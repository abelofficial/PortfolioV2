import {
  MainPageContainer,
  MultiSectionLayout,
  SidebarContainer,
} from '@components/ui/custom-container';
import TechnicalLedgerSkeleton from '@components/technicalLedger/skeleton';
import ToolbarSkeleton from '@components/toolbar/skeleton';
import { DotPattern } from '@components/ui/dot-pattern';
import { cn } from '@/lib/utils';

const LedgerLoading = () => {
  return (
    <MultiSectionLayout
      sidebar={
        <SidebarContainer>
          <div className="py-auto flex w-full flex-col gap-4 xl:h-full">
            <div className="shrink-0">
              <ToolbarSkeleton />
            </div>
          </div>
        </SidebarContainer>
      }
    >
      <MainPageContainer className="p-0 md:p-4">
        <TechnicalLedgerSkeleton />
      </MainPageContainer>

      {/* Footer skeleton */}
      <div className="bg-background relative w-full gap-2 py-15 text-center">
        <DotPattern
          className={cn(
            'mask-[radial-gradient(300px_circle_at_top_right,white,transparent)]',
            'lg:mask-[radial-gradient(400px_circle_at_right,white,transparent)]'
          )}
        />
        <div className="bg-muted mx-auto h-4 w-24 animate-pulse rounded py-5" />
      </div>
    </MultiSectionLayout>
  );
};

export default LedgerLoading;
