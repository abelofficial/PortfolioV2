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
import { SRCImage } from 'react-datocms';

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
        <SRCImage
          data={homePage.avatar.responsiveImage}
          priority
          sizes="150px"
          usePlaceholder
          imgClassName="aspect-square rounded-full p-1"
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
          <p className="text-muted-foreground/70 dark:text-primary-light text-[10px] font-medium tracking-[0.25em] uppercase md:text-xs">
            {homePage.connect}
          </p>

          <div className="flex w-full max-w-xl flex-wrap items-center justify-around gap-2 md:max-w-2xl md:gap-4">
            {allContacts.map((contact) => (
              <a
                key={contact.id}
                target="_blank"
                rel="noreferrer"
                href={contact.address}
                className="group text-muted-foreground hover:text-primary-light inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-2 py-1 text-sm transition hover:bg-black/10 md:text-base dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
              >
                <SRCImage
                  usePlaceholder
                  data={contact.icon.responsiveImage}
                  imgClassName="opacity-80 transition group-hover:opacity-100"
                />
                <span className="hover:text-primary text-sm">
                  {contact.title}
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
