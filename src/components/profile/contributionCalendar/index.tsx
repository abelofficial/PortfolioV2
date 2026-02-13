"use client";
import {
    ContributionGraph,
    ContributionGraphBlock,
    ContributionGraphCalendar
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
                        'data-[level="0"]:fill-card',
                        'data-[level="3"]:fill-primary/50',
                        'data-[level="4"]:fill-primary',
                    )}
                    dayIndex={dayIndex}
                    weekIndex={weekIndex}
                />
            )}
        </ContributionGraphCalendar>
    </ContributionGraph>
}

export default ContributionCalendar;