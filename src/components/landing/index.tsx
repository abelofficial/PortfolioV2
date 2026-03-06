import { datoCMS } from '@services/datoCMS';
import { getGithubRepositories } from '@services/githubFetch';
import {
  getCombinedQuery,
  landingPageQuery,
  latestTechnicalLedgersQuery,
  currentlyReadingBooksQuery,
} from '@/lib/queries';
import { LandingPage, GithubRepository } from '@/types';
import WelcomeSection from '@components/landing/welcomeSection';
import CurrentlyReadingSection, {
  CurrentlyReadingBook,
} from '@components/landing/currentlyReading';
import LatestFindingsSection, {
  LatestLedger,
} from '@components/landing/latestFindings';
import CurrentlyWorkingOnSection from '@components/landing/currentlyWorkingOn';
import { getCodeFromLanguage } from '@/utils/languages';

export interface LandingContentProps {
  locale: string;
}

interface LandingPageQueryResponse {
  landingPage: LandingPage;
  allTechnicalLedgers: LatestLedger[];
  allBookSummaries: CurrentlyReadingBook[];
}

const LandingContent = async ({ locale }: LandingContentProps) => {
  const datoLocale = getCodeFromLanguage(locale) ?? 'en';
  const data: LandingPageQueryResponse = await datoCMS({
    query: getCombinedQuery([
      landingPageQuery,
      latestTechnicalLedgersQuery,
      currentlyReadingBooksQuery,
    ]),
    variables: { locale: datoLocale },
  });

  // Fetch GitHub repositories
  let repositories: GithubRepository[] = [];
  try {
    repositories = await getGithubRepositories('abelofficial', 6);
  } catch (error) {
    console.error('Failed to fetch GitHub repositories:', error);
  }

  const { landingPage, allTechnicalLedgers, allBookSummaries } = data;

  // Filter out hidden repositories
  const hiddenRepoNames = landingPage.hiddenPublicRepositories
    ? landingPage.hiddenPublicRepositories
        .split(',')
        .map((name) => name.trim().toLowerCase())
        .filter(Boolean)
    : [];

  const visibleRepositories = repositories.filter(
    (repo) => !hiddenRepoNames.includes(repo.name.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-10">
      <div id="welcome">
        <WelcomeSection
          title={landingPage.welcomeTitle}
          subtitle={landingPage.welcomeSubtitle}
          aboutLinkLabel={landingPage.aboutLinkLabel}
          aboutLinkUrl={`/${locale}/about`}
          stats={{
            publicRepos: visibleRepositories.length,
            technicalNotes: allTechnicalLedgers.length,
            bookSummaries: allBookSummaries.length,
            publicReposLabel: landingPage.publicReposLabel,
            technicalNotesLabel: landingPage.technicalNotesLabel,
            bookSummariesLabel: landingPage.bookSummariesLabel,
          }}
        />
      </div>

      <div id="latest-findings">
        <LatestFindingsSection
          locale={locale}
          title={landingPage.latestFindingsTitle}
          description={landingPage.latestFindingsDescription}
          viewAllLabel={landingPage.viewAllLabel}
          minReadLabel="min"
          ledgers={allTechnicalLedgers}
        />
      </div>

      <div id="currently-reading">
        <CurrentlyReadingSection
          locale={locale}
          title={landingPage.currentlyReadingTitle}
          description={landingPage.currentlyReadingDescription}
          viewAllLabel={landingPage.viewAllLabel}
          chaptersLabel={landingPage.chaptersLabel}
          books={allBookSummaries}
        />
      </div>

      <div id="public-projects">
        <CurrentlyWorkingOnSection
          title={landingPage.currentlyWorkingOnTitle}
          description={landingPage.currentlyWorkingOnDescription}
          viewProjectLabel={landingPage.viewProjectLabel}
          starsLabel={landingPage.starsLabel}
          forksLabel={landingPage.forksLabel}
          updatedLabel={landingPage.updatedLabel}
          languageColors={landingPage.languageColors}
          repositories={visibleRepositories}
        />
      </div>
    </div>
  );
};

export default LandingContent;
