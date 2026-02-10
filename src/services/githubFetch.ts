import "server-only";
import {ContributionDay, ContributionLevel, GithubGraphQLResponse, IGithubOrgs, IGithubProfile} from "@/types";

const GITHUB_API_URL = "https://api.github.com";

async function githubFetch<T>(endpoint: string, revalidate = 3600): Promise<T> {
    const response = await fetch(`${GITHUB_API_URL}/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_KEYS}`,
            Accept: "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
        },
        next: {revalidate},
    });
    if (!response.ok) throw new Error(`GitHub REST Error: ${response.statusText}`);
    return response.json();
}

async function githubGraphQL<T>(query: string, variables: Record<string, any>, token?: string): Promise<T> {
    const response = await fetch(`${GITHUB_API_URL}/graphql`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token ?? process.env.NEXT_PUBLIC_GITHUB_KEYS}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({query, variables}),
        next: {revalidate: 86400},
    });
    if (!response.ok) throw new Error(`GitHub GraphQL Error: ${response.statusText}`);
    return response.json();
}

export const getGithubProfile = () => githubFetch<IGithubProfile>("user");
export const getGithubOrgs = () => githubFetch<IGithubOrgs[]>("user/orgs");

const levelMap: Record<ContributionLevel, number> = {
    NONE: 0,
    FIRST_QUARTILE: 1,
    SECOND_QUARTILE: 2,
    THIRD_QUARTILE: 3,
    FOURTH_QUARTILE: 4,
};

export const getGithubContributions = async (username: string): Promise<ContributionDay[]> => {
    const query = `
      query {
          viewer {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                    contributionLevel
                  }
                }
              }
            }
          }
        }
    `;

    const res = await githubGraphQL<GithubGraphQLResponse>(query, {login: username}, process.env.GITHUB_COMMIT_STATUES);

    const weeks = res.data.viewer.contributionsCollection.contributionCalendar.weeks;

    return weeks.flatMap((week) =>
        week.contributionDays.map((day) => ({
            date: day.date,
            count: day.contributionCount,
            level: levelMap[day.contributionLevel] ?? 0,
        }))
    );
};