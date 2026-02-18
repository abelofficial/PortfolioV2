import Work from './work';
import Education from './education';

export interface ExperienceTimelineProps {
  locale: string;
}

const ExperienceTimeline = ({ locale }: ExperienceTimelineProps) => {
  return (
    <>
      <Work locale={locale} />
      <Education locale={locale} />
    </>
  );
};
export default ExperienceTimeline;
