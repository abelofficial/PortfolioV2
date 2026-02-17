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
      <div className="/* ✨ center-focus fade */ relative mt-2 rounded-2xl border border-black/5 bg-black/2 mask-[linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] px-4 py-6 [-webkit-mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] dark:border-white/10 dark:bg-white/3">
        <div className="pointer-events-none absolute inset-y-0 left-1/2 z-10 hidden w-[35%] -translate-x-1/2 bg-linear-to-r from-transparent via-white/20 to-transparent blur-2xl max-lg:block dark:via-white/10" />

        <Marquee pauseOnHover className="[--duration:28s] [--gap:3rem]">
          {allTechstacks.map((techStack) => (
            <div
              key={techStack.id}
              className="group flex w-[110px] flex-none flex-col items-center justify-center gap-2 sm:w-[130px] xl:w-[150px]"
            >
              <div className="relative h-10 w-10 transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12 lg:h-14 lg:w-14">
                <Image
                  src={techStack.icon.url}
                  fill
                  alt={`${techStack.title} icon`}
                  className="object-contain opacity-90 transition-all duration-300 group-hover:opacity-100"
                />
              </div>

              <p className="text-muted-foreground/80 group-hover:text-foreground text-xs font-medium tracking-wide transition-colors">
                {techStack.name}
              </p>
            </div>
          ))}
        </Marquee>
      </div>
    </SectionContainer>
  );
};

export default TechStack;
