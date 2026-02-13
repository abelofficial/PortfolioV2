import {TechStackList} from "@/types";
import {datoCMS} from "@services/datoCMS";
import {queryWrapper, techStacksQuery} from "@/lib/queries";
import Image from "next/image";
import {SectionContainer} from "@components/ui/custom-container";
import {Marquee} from "@components/ui/marquee";

const TechStack = async () => {
    const {allTechstacks}: TechStackList = await datoCMS({query: queryWrapper([techStacksQuery])});

    return (
        <SectionContainer title="Tech stack" disableShine disablePattern>
            <Marquee pauseOnHover className="[--duration:30s] [--gap:2rem]">
                {allTechstacks.map((techStack) => (
                    <div
                        key={techStack.id}
                        className="flex flex-none flex-col items-center justify-center gap-2 w-[80px] sm:w-[100px] xl:w-[150px]"
                    >
                        <div className="relative h-10 w-10 flex items-center justify-center">
                            <Image
                                src={techStack.icon.url}
                                fill
                                alt={`${techStack.title} icon`}
                                className="object-contain"
                            />
                        </div>
                        <blockquote
                            className="text-[10px] font-medium uppercase tracking-widest whitespace-nowrap text-shadow-muted-foreground">
                            {techStack.name}
                        </blockquote>
                    </div>
                ))}
            </Marquee>
        </SectionContainer>
    )
}

export default TechStack;