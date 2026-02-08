// @/lib/github.ts
import "server-only";
import {IGithubOrgs, IGithubProfile} from "@/types"; // Ensures this code never accidentally runs on the client

const GITHUB_API_URL = "https://api.github.com";

async function githubFetch<T>(endpoint: string, revalidate = 3600): Promise<T> {
    const response = await fetch(`${GITHUB_API_URL}/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_KEYS}`, // No 'NEXT_PUBLIC_' prefix!
            Accept: "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
        },
        // Next.js 15/16 caching logic
        next: { revalidate },
    });

    if (!response.ok) {
        throw new Error(`GitHub API Error: ${response.statusText}`);
    }

    return response.json();
}

export const getGithubProfile = () => githubFetch<IGithubProfile>("user");
export const getGithubOrgs = () => githubFetch<IGithubOrgs[]>("user/orgs");