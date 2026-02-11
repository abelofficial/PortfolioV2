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
    console.log(allEducations);
    const data: TimelineEntry[] = allEducations
        .reverse()
        .map(experience => ({
        title: experience.startDate + " - " + experience.endDate,
        content: <div className="flex flex-col gap-1">
            <Image src={experience.logo.responsiveImage.src} alt={experience.title} width={50} height={50} />
            <p className="text-xs text-muted-foreground py-2">{experience.title} | <span className="text-xs text-primary">{experience.place}</span></p>
            {experience.content.split("*").map((content, index) => (content ? <p className="text-sm" key={experience.id + index}>-{content}</p>: null))}
        </div>
    }));
    
    return <SectionContainer title="Education" disableShine>
        <Timeline data={data}/>
    </SectionContainer>
}
export default EducationExperience;