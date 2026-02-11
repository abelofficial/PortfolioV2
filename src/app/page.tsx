import {MainPageContainer} from "@components/ui/custom-container";
import TechStack from "@components/techStack";
import GithubPreview from "@components/githubPreview";
import WorkExperience from "@components/workExperience";
import EducationExperience from "@components/educationExperience";

const Home = () => {
    return <MainPageContainer>
        <GithubPreview/>
        <TechStack/>
        <EducationExperience/>
        <WorkExperience/>
    </MainPageContainer>
}

export default Home;