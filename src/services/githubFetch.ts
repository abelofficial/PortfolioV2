import 'server-only';
import {
  ContributionData,
  ContributionLevel,
  GithubGraphQLResponse,
} from '@/types';

const GITHUB_API_URL = 'https://api.github.com';

async function githubGraphQL<T>(
  query: string,
  variables: Record<string, unknown>,
  token?: string
): Promise<T> {
  const response = await fetch(`${GITHUB_API_URL}/graphql`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token ?? process.env.NEXT_PUBLIC_GITHUB_KEYS}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 86400 },
  });
  if (!response.ok)
    throw new Error(`GitHub GraphQL Error: ${response.statusText}`);
  return response.json();
}

const levelMap: Record<ContributionLevel, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

export const getGithubContributions = async (
  username: string
): Promise<ContributionData> => {
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

  const res = await githubGraphQL<GithubGraphQLResponse>(
    query,
    { login: username },
    process.env.GITHUB_COMMIT_STATUES
  );

  const weeks =
    res.data.viewer.contributionsCollection.contributionCalendar.weeks;

  return {
    totalContributions:
      res.data.viewer.contributionsCollection.contributionCalendar
        .totalContributions,
    contributionsByDate: weeks.flatMap((week) =>
      week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
        level: levelMap[day.contributionLevel] ?? 0,
      }))
    ),
  };
};
