import {MainPageContainer} from "@components/ui/custom-container";
import TechStack from "@components/techStack";
import GithubPreview from "@components/githubPreview";

const Home = () => {
    return <MainPageContainer>
        <GithubPreview />
        <TechStack />
    </MainPageContainer>
}

export default Home;