'use client';

import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
} from '@components/ui/contribution-graph';
import { cn } from '@/lib/utils';
import { ContributionDay } from '@/types';

export interface ContributionCalendarProps {
  data: ContributionDay[];
  totalContributions: number;
  label: string;
}

const ContributionCalendar = ({
  data,
  totalContributions,
  label,
}: ContributionCalendarProps) => {
  return (
    <ContributionGraph
      data={data}
      className="w-fit"
      blockRadius={5}
      totalCount={50}
    >
      <ContributionGraphCalendar className="w-fit" hideMonthLabels>
        {({ activity, dayIndex, weekIndex }) => (
          <ContributionGraphBlock
            activity={activity}
            className={cn(
              'data-[level="0"]:fill-primary/6 dark:data-[level="0"]:fill-primary/2',
              'data-[level="1"]:fill-primary/28 dark:data-[level="1"]:fill-primary/18',
              'data-[level="2"]:fill-primary/48 dark:data-[level="2"]:fill-primary/36',
              'data-[level="3"]:fill-primary/72 dark:data-[level="3"]:fill-primary/70',
              'data-[level="4"]:fill-primary'
            )}
            dayIndex={dayIndex}
            weekIndex={weekIndex}
          />
        )}
      </ContributionGraphCalendar>

      <p className="text-muted-foreground mt-2 text-sm">
        <span className="text-primary font-medium">{totalContributions}</span>{' '}
        {label}
      </p>
    </ContributionGraph>
  );
};

export default ContributionCalendar;
