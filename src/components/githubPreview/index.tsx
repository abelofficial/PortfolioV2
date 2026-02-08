import {Card, CardContent, CardHeader} from "@components/ui/card";
import {getGithubOrgs, getGithubProfile} from "@services/githubFetch";
import {SectionContainer} from "@components/ui/custom-container";
import Image from "next/image";
import {GitHubCalendar} from "react-github-calendar";

const GithubPreview = async () => {
    const profile = await getGithubProfile();
    const orgs = await getGithubOrgs();
    const calendarTheme = {
        light: ['#f8f9fa', '#40c057'], // gray[0] to green[3]
        dark: ['#adb5bd', '#2b8a3e'],  // gray[5] to green[9]
    };
    
    return <SectionContainer title="Github Account">
        <CardHeader className="flex flex-col items-center gap-2">
            <Image src={profile.avatar_url} alt={profile.name} width={200} height={200} className="rounded-full" />
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
            <GitHubCalendar
                username="abelofficial"
                theme={calendarTheme}
                blockMargin={4}
                blockRadius={5}
                blockSize={12}
                labels={{
                    legend: {
                        less: "Le",
                        more: "Mo",
                    },
                }}
            />
        </CardContent>
    </SectionContainer>
}
export default GithubPreview;