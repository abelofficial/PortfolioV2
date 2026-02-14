import { EducationExperienceList, TimelineEntry } from '@/types';
import { datoCMS } from '@services/datoCMS';
import { educationExperienceQuery, getCombinedQuery } from '@/lib/queries';
import { SectionContainer } from '@components/ui/custom-container';
import { Timeline } from '@components/ui/timeline';
import TimelineCard from '@components/timelineCard';

interface EducationExperienceProps {
  locale: string;
}

const EducationExperience = async ({ locale }: EducationExperienceProps) => {
  const { allEducations }: EducationExperienceList = await datoCMS({
    query: getCombinedQuery([educationExperienceQuery]),
    variables: { locale: locale },
  });

  const data: TimelineEntry[] = allEducations.map((experience) => ({
    title: experience.startDate + ' - ' + experience.endDate,
    content: <TimelineCard data={experience} />,
    order: experience.order,
  }));

  return (
    <SectionContainer title="Education" disableShine>
      <Timeline data={data} />
    </SectionContainer>
  );
};
export default EducationExperience;
