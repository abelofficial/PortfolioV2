import { MainPageContainer } from '@components/ui/custom-container';
import TechStack from '@components/techStack';
import Profile from '@components/profile';
import WorkExperience from '@components/workExperience';
import EducationExperience from '@components/educationExperience';
import Testimonials from '@components/testimonials';

const Home = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  return (
    <MainPageContainer>
      <div id="profile" className="scroll-mt-24">
        <Profile locale={locale} />
      </div>

      <div id="tech" className="scroll-mt-24">
        <TechStack locale={locale} />
      </div>

      <div id="work" className="scroll-mt-24">
        <WorkExperience locale={locale} />
      </div>

      <div id="education" className="scroll-mt-24">
        <EducationExperience locale={locale} />
      </div>

      <div id="testimonials" className="scroll-mt-24">
        <Testimonials locale={locale} />
      </div>
    </MainPageContainer>
  );
};

export default Home;
