import Work from './work';
import Education from './education';

export interface ExperienceTimelineProps {
  locale: string;
}

const ExperienceTimeline = ({ locale }: ExperienceTimelineProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Work locale={locale} />
      <Education locale={locale} />
    </div>
  );
};
export default ExperienceTimeline;
