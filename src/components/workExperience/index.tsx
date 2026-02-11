import {WorkExperienceList} from "@/types";
import {datoCMS} from "@services/datoCMS";
import {queryWrapper, workExperienceQuery} from "@/lib/queries";
import {SectionContainer} from "@components/ui/custom-container";
import {Timeline} from "@components/ui/timeline";
import Image from "next/image";

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
        content: <div className="flex flex-col gap-1">
            <Image src={experience.logo.responsiveImage.src} alt={experience.title} width={50} height={50} />
            <p className="text-xs text-muted-foreground py-2">{experience.title} | <span className="text-xs text-primary">{experience.place}</span></p>
            <p className="text-sm">{experience.content}</p>
        </div>
    }));
    return <SectionContainer title="Work Experience" disableShine>
        <Timeline data={data}/>
    </SectionContainer>
}
export default WorkExperience;