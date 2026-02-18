import {
  MainPageContainer,
  MultiSectionLayout,
  SidebarContainer,
} from '@components/ui/custom-container';
import TechStack from '@components/techStack';
import Profile from '@components/profile';
import Testimonials from '@components/testimonials';
import Toolbar from '@components/toolbar';
import ChatAI from '@components/chatAI';
import Footer from '@components/footer';
import { getCombinedQuery, homePageQuery } from '@/lib/queries';
import { HomePage } from '@/types';
import { datoCMS } from '@services/datoCMS';
import { Metadata } from 'next';
import getMetadataFromSEOConfig, {
  SeoType,
} from '@/utils/getMetadataFromSEOConfig';
import ExperienceTimeline from '@components/experienceTimeline';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const { homePage }: { homePage: HomePage } = await datoCMS({
    query: getCombinedQuery([homePageQuery]),
    variables: { locale: locale },
  });

  return getMetadataFromSEOConfig(locale, SeoType.PROFILE, homePage.seo);
};

const Home = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const { homePage }: { homePage: HomePage } = await datoCMS({
    query: getCombinedQuery([homePageQuery]),
    variables: { locale: locale },
  });

  return (
    <MultiSectionLayout
      sidebar={
        <SidebarContainer>
          <div className="py-auto flex w-full flex-col gap-4 xl:h-full">
            <div className="shrink-0">
              <Toolbar />
            </div>
            <div className="min-h-0 flex-1">
              <ChatAI chatBoxInfo={homePage.chatBox} />
            </div>
          </div>
        </SidebarContainer>
      }
    >
      <MainPageContainer>
        <div id="profile" className="scroll-mt-24">
          <Profile locale={locale} />
        </div>

        <div id="tech" className="scroll-mt-24">
          <TechStack locale={locale} />
        </div>

        <div id="experience" className="scroll-mt-24">
          <ExperienceTimeline locale={locale} />
        </div>
        <div id="testimonials" className="scroll-mt-24">
          <Testimonials locale={locale} />
        </div>
      </MainPageContainer>
      <Footer />
    </MultiSectionLayout>
  );
};

export default Home;
