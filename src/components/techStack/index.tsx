import { HomePage, TechStack as TechnologyStack } from '@/types';
import { datoCMS } from '@services/datoCMS';
import {
  getCombinedQuery,
  homePageQuery,
  techStacksQuery,
} from '@/lib/queries';
import Image from 'next/image';
import { SectionContainer } from '@components/ui/custom-container';
import { Marquee } from '@components/ui/marquee';

export interface TechStackProps {
  locale: string;
}

const TechStack = async ({ locale }: TechStackProps) => {
  const {
    allTechstacks,
    homePage,
  }: { allTechstacks: TechnologyStack[]; homePage: HomePage } = await datoCMS({
    query: getCombinedQuery([techStacksQuery, homePageQuery]),
    variables: { locale: locale },
  });

  return (
    <SectionContainer
      title={homePage.techStackTitle}
      disableShine
      disablePattern
    >
      <Marquee pauseOnHover className="[--duration:30s] [--gap:2rem]">
        {allTechstacks.map((techStack) => (
          <div
            key={techStack.id}
            className="flex w-[80px] flex-none flex-col items-center justify-center gap-2 sm:w-[100px] xl:w-[150px]"
          >
            <div className="relative flex h-10 w-10 items-center justify-center">
              <Image
                src={techStack.icon.url}
                fill
                alt={`${techStack.title} icon`}
                className="object-contain"
              />
            </div>
            <blockquote className="text-shadow-muted-foreground text-[10px] font-medium tracking-widest whitespace-nowrap uppercase">
              {techStack.name}
            </blockquote>
          </div>
        ))}
      </Marquee>
    </SectionContainer>
  );
};

export default TechStack;
