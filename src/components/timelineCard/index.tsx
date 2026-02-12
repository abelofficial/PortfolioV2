import Image from "next/image";
import {Experience} from "@/types";

export interface TimelineCardProps {
    data: Experience
}

const TimelineCard = ({data}: TimelineCardProps) => {
    return <div className="flex flex-col gap-1">
        <Image src={data.logo.responsiveImage.src} alt={data.title} width={50} height={50}/>
        <p className="text-xs text-primary py-2">{data.title} 
            <span
            className="text-xs text-muted-foreground"> | {data.place}
            </span>
        </p>
        {data.content.split("*").map((content, index) => (content ?
            <p className="text-sm text-justify max-w-4xl" key={data.id + index}>-{content}</p> : null))}
    </div>
}

export default TimelineCard;