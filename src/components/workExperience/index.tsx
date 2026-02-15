import {
  Experience,
  HomePage,
  TimelineEntry,
  WorkExperienceList,
} from '@/types';
import { datoCMS } from '@services/datoCMS';
import {
  getCombinedQuery,
  homePageQuery,
  workExperienceQuery,
} from '@/lib/queries';
import { SectionContainer } from '@components/ui/custom-container';
import { Timeline } from '@components/ui/timeline';
import TimelineCard from '@components/timelineCard';

export interface WorkExperienceProps {
  locale: string;
}

const WorkExperience = async ({ locale }: WorkExperienceProps) => {
  const { allWorks, homePage }: { allWorks: Experience[]; homePage: HomePage } =
    await datoCMS({
      query: getCombinedQuery([workExperienceQuery, homePageQuery]),
      variables: { locale: locale },
    });

  const data: TimelineEntry[] = allWorks.reverse().map((experience) => ({
    title: experience.startDate + ' - ' + experience.endDate,
    content: <TimelineCard data={experience} />,
    order: experience.order,
  }));

  return (
    <SectionContainer title={homePage.workExperience} disableShine>
      <Timeline data={data} />
    </SectionContainer>
  );
};
export default WorkExperience;
