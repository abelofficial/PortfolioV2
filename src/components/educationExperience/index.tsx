import {EducationExperienceList} from "@/types";
import {datoCMS} from "@services/datoCMS";
import {educationExperienceQuery, queryWrapper} from "@/lib/queries";
import {SectionContainer} from "@components/ui/custom-container";
import {Timeline} from "@components/ui/timeline";
import Image from "next/image";

type TimelineEntry = {
    title: string;
    content: React.ReactNode;
};

const EducationExperience = async () => {
    const {allEducations}: EducationExperienceList = await datoCMS({query: queryWrapper([educationExperienceQuery])});
    
    const data: TimelineEntry[] = allEducations
        .reverse()
        .map(experience => ({
        title: experience.startDate + " - " + experience.endDate,
        content: <div className="flex flex-col gap-1">
            <Image src={experience.logo.responsiveImage.src} alt={experience.title} width={50} height={50} />
            <p className="text-sm text-muted-foreground">{experience.title}</p>
            <p className="text-sm">{experience.content}</p>
        </div>
    }));
    
    return <SectionContainer title="Education Experience" disableShine>
        <Timeline data={data}/>
    </SectionContainer>
}
export default EducationExperience;