import {MainPageContainer} from "@components/ui/custom-container";
import TechStack from "@components/techStack";
import GithubPreview from "@components/githubPreview";
import WorkExperience from "@components/workExperience";
import EducationExperience from "@components/educationExperience";
import Testimonials from "@components/testimonials";

const Home = () => {
    return <MainPageContainer>
        <GithubPreview/>
        <Testimonials/>
        <EducationExperience/>
        <WorkExperience/>
        <TechStack/>
    </MainPageContainer>
}

export default Home;