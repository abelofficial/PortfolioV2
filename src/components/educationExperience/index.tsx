import { Experience, HomePage, TimelineEntry } from '@/types';
import { datoCMS } from '@services/datoCMS';
import {
  educationExperienceQuery,
  getCombinedQuery,
  homePageQuery,
} from '@/lib/queries';
import { SectionContainer } from '@components/ui/custom-container';
import { Timeline } from '@components/ui/timeline';
import TimelineCard from '@components/timelineCard';

interface EducationExperienceProps {
  locale: string;
}

const EducationExperience = async ({ locale }: EducationExperienceProps) => {
  const {
    allEducations,
    homePage,
  }: { allEducations: Experience[]; homePage: HomePage } = await datoCMS({
    query: getCombinedQuery([educationExperienceQuery, homePageQuery]),
    variables: { locale: locale },
  });

  const data: TimelineEntry[] = allEducations.map((experience) => ({
    title: experience.startDate + ' - ' + experience.endDate,
    content: <TimelineCard data={experience} />,
    order: experience.order,
  }));

  return (
    <SectionContainer title={homePage.education} disableShine>
      <Timeline data={data} />
    </SectionContainer>
  );
};
export default EducationExperience;
