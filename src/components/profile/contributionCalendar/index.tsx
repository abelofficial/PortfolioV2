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
    totalContributions: number;
    label: string;
}

const ContributionCalendar = ({data, totalContributions, label}: ContributionCalendarProps) => {
    return <ContributionGraph data={data} className="w-fit" blockRadius={5} totalCount={50} >
        <ContributionGraphCalendar className="w-fit" hideMonthLabels>
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
        <p className="text-sm text-shadow-gray-400">
            <span className="text-primary">{totalContributions}</span> {label}
        </p>
    </ContributionGraph>
}

export default ContributionCalendar;