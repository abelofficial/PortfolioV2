import {WorkExperienceList} from "@/types";
import {datoCMS} from "@services/datoCMS";
import {queryWrapper, workExperienceQuery} from "@/lib/queries";
import {SectionContainer} from "@components/ui/custom-container";
import {Timeline} from "@components/ui/timeline";
import TimelineCard from "@components/timelineCard";

type TimelineEntry = {
    title: string;
    content: React.ReactNode;
};

const WorkExperience = async () => {
    const {allWorks}: WorkExperienceList = await datoCMS({query: queryWrapper([workExperienceQuery])});
    
    const data: TimelineEntry[] = allWorks
        .reverse()
        .map(experience => ({
        title: experience.startDate + " - " + experience.endDate,
        content:  <TimelineCard data={experience} />
    }));
    return <SectionContainer title="Work Experience" disableShine>
        <Timeline data={data}/>
    </SectionContainer>
}
export default WorkExperience;