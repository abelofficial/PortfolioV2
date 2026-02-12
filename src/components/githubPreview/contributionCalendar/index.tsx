"use client";
import {
    ContributionGraph,
    ContributionGraphBlock,
    ContributionGraphCalendar,
    ContributionGraphFooter
} from "@components/ui/contribution-graph";
import {cn} from "@/lib/utils";
import {ContributionDay} from "@/types";

export interface ContributionCalendarProps {
    data: ContributionDay[];
}

const ContributionCalendar = ({data}: ContributionCalendarProps) => {
    return <ContributionGraph data={data} className="w-fit">
        <ContributionGraphCalendar className="w-fit">
            {({activity, dayIndex, weekIndex}) => (
                <ContributionGraphBlock
                    activity={activity}
                    className={cn(
                        'data-[level="0"]:fill-slate-100 dark:data-[level="0"]:fill-neutral-800',
                        'data-[level="1"]:fill-[oklch(0.85_0.08_45)] dark:data-[level="1"]:fill-[oklch(0.3_0.05_45)]',
                        'data-[level="2"]:fill-[oklch(0.75_0.15_45)] dark:data-[level="2"]:fill-[oklch(0.45_0.1_45)]',
                        'data-[level="3"]:fill-[oklch(0.65_0.22_45)] dark:data-[level="3"]:fill-[oklch(0.6_0.15_45)]',
                        'data-[level="4"]:fill-[oklch(0.6_0.25_45)] dark:data-[level="4"]:fill-[oklch(0.7_0.2_45)]'
                    )}
                    dayIndex={dayIndex}
                    weekIndex={weekIndex}
                />
            )}
        </ContributionGraphCalendar>
        <ContributionGraphFooter/>
    </ContributionGraph>
}

export default ContributionCalendar;