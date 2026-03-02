import { Experience } from '@/types';
import { SRCImage } from 'react-datocms';

export interface TimelineCardProps {
  data: Experience;
}

const TimelineCard = ({ data }: TimelineCardProps) => {
  return (
    <div className="flex flex-col gap-2">
      {/* Logo */}
      <div className="w-16 overflow-hidden rounded-lg">
        <SRCImage usePlaceholder data={data.logo.responsiveImage} />
      </div>

      {/* Title and Place */}
      <div className="flex flex-col items-start gap-1.5">
        <span className="text-primary-light text-sm font-semibold">
          {data.title}
        </span>
        <span className="text-muted-foreground text-xs">{data.place}</span>
      </div>

      {/* Content bullets */}
      <ul className="text-foreground/80 space-y-1.5 text-sm leading-relaxed">
        {data.content.split('*').map((content, index) =>
          content.trim() ? (
            <li key={data.id + index} className="flex gap-2">
              <span className="text-primary/60">•</span>
              <span>{content.trim()}</span>
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
};

export default TimelineCard;
