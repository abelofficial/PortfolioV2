import { CardContent, CardHeader } from '@components/ui/card';
import { getGithubContributions } from '@services/githubFetch';
import { SectionContainer } from '@components/ui/custom-container';
import Image from 'next/image';
import ContributionCalendar from '@components/profile/contributionCalendar';
import React from 'react';
import { ContactInfo, HomePage } from '@/types';
import { datoCMS } from '@services/datoCMS';
import { getCombinedQuery, contactsQuery, homePageQuery } from '@/lib/queries';
import { Separator } from '@components/ui/separator';

export interface ProfileProps {
  locale: string;
}

const Profile = async ({ locale }: ProfileProps) => {
  const {
    allContacts,
    homePage,
  }: { allContacts: ContactInfo[]; homePage: HomePage } = await datoCMS({
    query: getCombinedQuery([homePageQuery, contactsQuery]),
    variables: { locale: locale },
  });

  const contributions = await getGithubContributions('abelofficial');

  return (
    <SectionContainer disablePattern>
      <CardHeader className="flex flex-col items-center gap-3 pt-12 md:pt-10">
        <Image
          src={homePage.avatar.responsiveImage.src}
          alt={homePage.name}
          width={150}
          height={150}
          priority
          sizes="150px"
          preload
          className="aspect-square rounded-full border-2 border-black/10 object-cover dark:border-white/20"
        />

        <h2 className="text-lg font-bold md:text-2xl">{homePage.name}</h2>

        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-primary text-base font-semibold md:text-lg">
            {homePage.jobTitle}
          </p>

          <Separator className="w-full max-w-md bg-black/10 dark:bg-white/10" />

          <p className="text-muted-foreground dark:text-muted-foreground max-w-2xl text-sm leading-relaxed md:text-base">
            {homePage.intro}
          </p>
        </div>
      </CardHeader>

      <CardContent className="flex max-w-full flex-col items-center self-center p-1">
        <div className="mt-5 flex w-full flex-col items-center gap-2 md:mt-7 md:gap-3">
          <p className="text-muted-foreground/70 dark:text-muted-foreground/50 text-[10px] font-medium tracking-[0.25em] uppercase md:text-xs">
            {homePage.connect}
          </p>

          <div className="flex w-full max-w-xl flex-wrap items-center justify-center gap-2 md:max-w-2xl md:gap-4">
            {allContacts.map((contact) => (
              <a
                key={contact.id}
                target="_blank"
                rel="noreferrer"
                href={contact.address}
                className="group text-muted-foreground hover:text-foreground inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-4 py-1 text-sm transition hover:bg-black/10 md:px-5 md:py-2 md:text-base dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <Image
                  src={contact.icon.responsiveImage.src}
                  alt={`${contact.title} icon`}
                  width={15}
                  height={15}
                  className="opacity-80 transition group-hover:opacity-100 md:h-5 md:w-5"
                />
                <span className="font-small">
                  {contact.title === 'Github' ? 'GitHub' : contact.title}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 w-full opacity-95 md:mt-10 dark:opacity-90">
          <Separator className="w-full bg-black/10 dark:bg-white/10" />
          <ContributionCalendar
            data={contributions.contributionsByDate}
            totalContributions={contributions.totalContributions}
            label={homePage.totalContributionLabel}
          />
        </div>
      </CardContent>
    </SectionContainer>
  );
};

export default Profile;
