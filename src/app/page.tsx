import {MainPageContainer} from "@components/ui/custom-container";
import TechStack from "@components/techStack";
import Profile from "@components/profile";
import WorkExperience from "@components/workExperience";
import EducationExperience from "@components/educationExperience";
import Testimonials from "@components/testimonials";

const Home = () => {
    return <MainPageContainer>
        <Profile/>
        <Testimonials/>
        <EducationExperience/>
        <WorkExperience/>
        <TechStack/>
    </MainPageContainer>
}

export default Home;