import { Suspense } from 'react';
import { MainPageContainer } from '@components/ui/custom-container';
import TechStack from '@components/techStack';
import Profile from '@components/profile';
import Testimonials from '@components/testimonials';
import { getCombinedQuery, homePageQuery } from '@/lib/queries';
import { HomePage } from '@/types';
import { datoCMS } from '@services/datoCMS';
import { Metadata } from 'next';
import getMetadataFromSEOConfig, {
  SeoType,
} from '@/utils/getMetadataFromSEOConfig';
import ExperienceTimeline from '@components/experienceTimeline';
import ProfileSkeleton from '@components/profile/skeleton';
import TechStackSkeleton from '@components/techStack/skeleton';
import ExperienceTimelineSkeleton from '@components/experienceTimeline/skeleton';
import TestimonialsSkeleton from '@components/testimonials/skeleton';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { homePage }: { homePage: HomePage } = await datoCMS({
    query: getCombinedQuery([homePageQuery]),
    variables: { locale: locale },
  });

  return getMetadataFromSEOConfig(locale, SeoType.PROFILE, homePage.seo);
}

const Home = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;

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

export default Home;
