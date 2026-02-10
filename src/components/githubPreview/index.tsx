import {CardContent, CardHeader} from "@components/ui/card";
import {getGithubContributions, getGithubOrgs, getGithubProfile} from "@services/githubFetch";
import {SectionContainer} from "@components/ui/custom-container";
import Image from "next/image";
import ContributionCalendar from "@components/githubPreview/contributionCalendar";

const GithubPreview = async () => {
    const profile = await getGithubProfile();
    const orgs = await getGithubOrgs();
    const contributions = await getGithubContributions("abelofficial");

    return <SectionContainer title="Github Account">
        <CardHeader className="flex flex-col items-center gap-2">
            <Image src={profile.avatar_url} alt={profile.name} width={200} height={200} className="rounded-full"/>
            <h2 className="text-lg font-bold">{profile.name}</h2>
        </CardHeader>
        <CardContent className="w-full flex flex-col items-center gap-5">
            <div className="w-full flex justify-between gap-2">
                <div className="flex flex-col items-center gap-1">
                    <p>{profile.public_repos}</p>
                    <h3 className="text-sm font-semibold">Public repos</h3>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <p>{profile.total_private_repos}</p>
                    <h3 className="text-sm font-semibold">Private repos</h3>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <p>{orgs.length}</p>
                    <h3 className="text-sm font-semibold">Organizations</h3>
                </div>
            </div>
            <ContributionCalendar data={contributions}/>
        </CardContent>
    </SectionContainer>
}
export default GithubPreview;