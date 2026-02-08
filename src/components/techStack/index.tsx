import {TechStackList, TestimonialsList} from "@/graphql/types";
import {datoCMS} from "@services/datoCMS";
import {queryWrapper, techStacksQuery} from "@/graphql/queries";
import {ShineBorder} from "@components/ui/shine-border";
import {Card} from "@components/ui/card";
import Image from "next/image";

const TechStack = async () => {
    const {allTechstacks}: TechStackList = await datoCMS({query: queryWrapper([techStacksQuery])});
    
    return (
        <Card className="w-full relative gap-2 p-2 overflow-hidden">
            <ShineBorder  shineColor={["#A78BFA", "#C4B5FD", "#A78BFA"]} />
            <h1>Tech stack</h1>
            <div className="flex justify-around w-full items-center overflow-x-auto">
                {allTechstacks.map((techStack) => (
                    <div key={techStack.id} className="flex flex-col gap-2 items-center shrink-0 min-w-[60px]">
                        <Image
                            src={techStack.icon.url}
                            width={25}
                            height={25}
                            alt={`${techStack.title} icon`}
                            className="m-0 object-contain"
                        />
                        <blockquote className="text-xs text-center whitespace-nowrap">
                            {techStack.name}
                        </blockquote>
                    </div>
                ))}
            </div>
        </Card>
    )
}

export default TechStack;