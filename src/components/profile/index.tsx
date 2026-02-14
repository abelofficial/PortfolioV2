import { CardContent, CardHeader } from '@components/ui/card';
import { getGithubContributions } from '@services/githubFetch';
import { SectionContainer } from '@components/ui/custom-container';
import Image from 'next/image';
import ContributionCalendar from '@components/profile/contributionCalendar';
import React from 'react';
import { ContactInfo, HomePage } from '@/types';
import { datoCMS } from '@services/datoCMS';
import { queryWrapper, contactsQuery, homePageQuery } from '@/lib/queries';

const Profile = async () => {
  const {
    allContacts,
    homePage,
  }: { allContacts: ContactInfo[]; homePage: HomePage } = await datoCMS({
    query: queryWrapper([homePageQuery, contactsQuery]),
  });
  const contributions = await getGithubContributions('abelofficial');

  return (
    <SectionContainer disablePattern>
      <CardHeader className="flex flex-col items-center gap-2 pt-10">
        <Image
          src={homePage.avatar.responsiveImage.src}
          alt={homePage.name}
          width={150}
          height={150}
          className="aspect-square rounded-full border-2 border-gray-300 object-cover"
        />
        <h2 className="text-lg font-bold">{homePage.name}</h2>
        <div className="flex gap-1">
          <p className="text-primary text-sm font-bold">{homePage.jobTitle}</p>
          <span className="text text-sm">
            {' '}
            {homePage.at} {homePage.workPlace}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex max-w-full flex-col items-center self-center p-1">
        <div className="flex w-full justify-around gap-2">
          {allContacts.map((contact) => (
            <a
              key={contact.id}
              target="_blank"
              rel="noreferrer"
              href={contact.address}
              className="flex flex-col items-center gap-2 pt-5"
            >
              <Image
                src={contact.icon.responsiveImage.src}
                alt={contact.title + ' icon'}
                width={25}
                height={25}
              />
              <p className="text-shadow-muted-foreground text-sm">
                {' '}
                {contact.title}{' '}
              </p>
            </a>
          ))}
        </div>
        <ContributionCalendar
          data={contributions.contributionsByDate}
          totalContributions={contributions.totalContributions}
          label={homePage.totalContributionLabel}
        />
      </CardContent>
    </SectionContainer>
  );
};
export default Profile;
