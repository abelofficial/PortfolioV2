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
                        'data-[level="0"]:fill-[#ebedf0] dark:data-[level="0"]:fill-[#161b22]',
                        'data-[level="1"]:fill-[#9be9a8] dark:data-[level="1"]:fill-[#0e4429]',
                        'data-[level="2"]:fill-[#40c463] dark:data-[level="2"]:fill-[#006d32]',
                        'data-[level="3"]:fill-[#30a14e] dark:data-[level="3"]:fill-[#26a641]',
                        'data-[level="4"]:fill-[#216e39] dark:data-[level="4"]:fill-[#39d353]'
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