import { Experience, HomePage, TimelineEntry } from '@/types';
import { datoCMS } from '@services/datoCMS';
import {
  educationExperienceQuery,
  getCombinedQuery,
  homePageQuery,
} from '@/lib/queries';
import { SectionContainer } from '@components/ui/custom-container';
import Timeline from '../timeline';
import TimelineCard from '../timeline/timelineCard';

interface EducationProps {
  locale: string;
}

const Education = async ({ locale }: EducationProps) => {
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
export default Education;
