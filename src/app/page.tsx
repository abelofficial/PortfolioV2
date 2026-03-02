import { Suspense } from 'react';
import { MainPageContainer } from '@components/ui/custom-container';
import TechStack from '@components/techStack';
import Profile from '@components/profile';
import Testimonials from '@components/testimonials';
import {
  getCombinedQuery,
  homePageQuery,
  siteMetaTagsQuery,
} from '@/lib/queries';
import { HomePage } from '@/types';
import { datoCMS } from '@services/datoCMS';
import { Metadata } from 'next';
import getMetadataFromDatoCMS, {
  SiteMetaTags,
} from '@/utils/getMetadataFromSEOConfig';
import ExperienceTimeline from '@components/experienceTimeline';
import ProfileSkeleton from '@components/profile/skeleton';
import TechStackSkeleton from '@components/techStack/skeleton';
import ExperienceTimelineSkeleton from '@components/experienceTimeline/skeleton';
import TestimonialsSkeleton from '@components/testimonials/skeleton';

export async function generateMetadata(): Promise<Metadata> {
  const locale = 'en'; // Default to English if locale is not provided
  const data: { homePage: HomePage } & SiteMetaTags = await datoCMS({
    query: getCombinedQuery([homePageQuery, siteMetaTagsQuery]),
    variables: { locale: locale },
  });

  return getMetadataFromDatoCMS(
    data.homePage._seoMetaTags,
    data._site.faviconMetaTags
  );
}

const DefaultHome = async () => {
  const locale = 'en'; // Default to English if locale is not provided

  return (
    <MainPageContainer>
      <div id="profile" className="scroll-mt-24">
        <Suspense fallback={<ProfileSkeleton />}>
          <Profile locale={locale} />
        </Suspense>
      </div>

      <div id="tech" className="scroll-mt-24">
        <Suspense fallback={<TechStackSkeleton />}>
          <TechStack locale={locale} />
        </Suspense>
      </div>

      <div id="experience" className="scroll-mt-24">
        <Suspense fallback={<ExperienceTimelineSkeleton />}>
          <ExperienceTimeline locale={locale} />
        </Suspense>
      </div>
      <div id="testimonials" className="scroll-mt-24">
        <Suspense fallback={<TestimonialsSkeleton />}>
          <Testimonials locale={locale} />
        </Suspense>
      </div>
    </MainPageContainer>
  );
};

export default DefaultHome;
