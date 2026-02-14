import { EducationExperienceList } from '@/types';
import { datoCMS } from '@services/datoCMS';
import { educationExperienceQuery, queryWrapper } from '@/lib/queries';
import { SectionContainer } from '@components/ui/custom-container';
import { Timeline } from '@components/ui/timeline';
import TimelineCard from '@components/timelineCard';

type TimelineEntry = {
  title: string;
  content: React.ReactNode;
};

const EducationExperience = async () => {
  const { allEducations }: EducationExperienceList = await datoCMS({
    query: queryWrapper([educationExperienceQuery]),
  });

  const data: TimelineEntry[] = allEducations.reverse().map((experience) => ({
    title: experience.startDate + ' - ' + experience.endDate,
    content: <TimelineCard data={experience} />,
  }));

  return (
    <SectionContainer title="Education" disableShine>
      <Timeline data={data} />
    </SectionContainer>
  );
};
export default EducationExperience;
