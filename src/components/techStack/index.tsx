import {TechStackList} from "@/types";
import {datoCMS} from "@services/datoCMS";
import {queryWrapper, techStacksQuery} from "@/lib/queries";
import {ShineBorder} from "@components/ui/shine-border";
import {Card} from "@components/ui/card";
import Image from "next/image";
import {SectionContainer} from "@components/ui/custom-container";

const TechStack = async () => {
    const {allTechstacks}: TechStackList = await datoCMS({query: queryWrapper([techStacksQuery])});
    
    return (
        <SectionContainer title="Tech stack" disableShine>
            <div className="flex justify-around w-full items-center overflow-x-auto">
                {allTechstacks.map((techStack) => (
                    <div key={techStack.id} className="flex flex-col gap-2 items-center shrink-0 min-w-[60px]">
                        <Image
                            src={techStack.icon.url}
                            width={25}
                            height={25}
                            alt={`${techStack.title} icon`}
                        />
                        <blockquote className="text-xs text-center whitespace-nowrap">
                            {techStack.name}
                        </blockquote>
                    </div>
                ))}
            </div>
        </SectionContainer>
    )
}

export default TechStack;