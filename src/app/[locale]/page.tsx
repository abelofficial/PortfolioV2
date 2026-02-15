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
      <Profile locale={locale} />
      <Testimonials locale={locale} />
      <TechStack locale={locale} />
      <WorkExperience locale={locale} />
      <EducationExperience locale={locale} />
    </MainPageContainer>
  );
};

export default Home;
