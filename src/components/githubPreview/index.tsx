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
            <Image src={profile.avatar_url} alt={profile.name} width={100} height={100} className="rounded-full"/>
            <h2 className="text-lg font-bold">{profile.name}</h2>
        </CardHeader>
        <CardContent className="max-w-full self-center flex flex-col items-center gap-5 p-1">
            <div className="w-full flex justify-between gap-2">
                <div className="flex flex-col items-center gap-1">
                    <p className="text-primary">{profile.public_repos}</p>
                    <p className="text-xs font-semibold">Public repos</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <p className="text-primary">{profile.total_private_repos}</p>
                    <p className="text-xs font-semibold">Private repos</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <p className="text-primary">{orgs.length}</p>
                    <p className="text-xs font-semibold">Organizations</p>
                </div>
            </div>
            <ContributionCalendar data={contributions}/>
        </CardContent>
    </SectionContainer>
}
export default GithubPreview;