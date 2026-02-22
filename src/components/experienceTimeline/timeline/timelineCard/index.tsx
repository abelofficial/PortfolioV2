import Image from 'next/image';
import { Experience } from '@/types';
import { SRCImage } from 'react-datocms';

export interface TimelineCardProps {
  data: Experience;
}

const TimelineCard = ({ data }: TimelineCardProps) => {
  return (
    <div className="flex flex-col gap-1">
      <SRCImage usePlaceholder data={data.logo.responsiveImage} />
      <p className="text-primary py-2 text-xs">
        {data.title}
        <span className="text-muted-foreground text-xs"> | {data.place}</span>
      </p>
      {data.content.split('*').map((content, index) =>
        content ? (
          <p className="max-w-4xl text-justify text-sm" key={data.id + index}>
            -{content}
          </p>
        ) : null
      )}
    </div>
  );
};

export default TimelineCard;
