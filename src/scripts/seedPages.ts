import { datoCMS } from '@services/datoCMS';
import { getGithubRepositories } from '@services/githubFetch';
import {
  getCombinedQuery,
  landingPageQuery,
  homePageQuery,
  technicalLedgerPageQuery,
  bookSummariesPageQuery,
  latestTechnicalLedgersQuery,
  currentlyReadingBooksQuery,
  techStacksQuery,
  testimonialsQuery,
  contactsQuery,
} from '@/lib/queries';
import {
  LandingPage,
  HomePage,
  TechnicalLedgerPage,
  BookSummariesPage,
  GithubRepository,
  TechStack,
  Testimonial,
  ContactInfo,
} from '@/types';
import { embedAndSeedChunksToVectorDb } from '@/scripts/seed';
import { PageSeedChunk, SeedChunk } from '@/scripts/types';

const BASE_URL = process.env.BASE_URL || 'https://abelsintaro.com';

// Types for content data
interface LatestLedger {
  id: string;
  slugId: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readMinutes: number;
}

interface CurrentlyReadingBook {
  id: string;
  slugId: string;
  title: string;
  author: string;
  excerpt: string;
  category: string;
  chapters: {
    isPublished: boolean;
  }[];
}

interface LandingPageQueryResponse {
  landingPage: LandingPage;
  allTechnicalLedgers: LatestLedger[];
  allBookSummaries: CurrentlyReadingBook[];
}

interface AboutPageQueryResponse {
  homePage: HomePage;
  allTechstacks: TechStack[];
  allTestimonials: Testimonial[];
  allContacts: ContactInfo[];
}

interface ListPagesQueryResponse {
  technicalLedgersPage: TechnicalLedgerPage;
  bookSummaryPage: BookSummariesPage;
}

async function seed() {
  console.log('🚀 Starting Pages seed process...');

  try {
    // Fetch landing page data with actual content
    const landingData: LandingPageQueryResponse = await datoCMS({
      query: getCombinedQuery([
        landingPageQuery,
        latestTechnicalLedgersQuery,
        currentlyReadingBooksQuery,
      ]),
      variables: { locale: 'en' },
    });

    // Fetch about page data with tech stack and testimonials
    const aboutData: AboutPageQueryResponse = await datoCMS({
      query: getCombinedQuery([
        homePageQuery,
        techStacksQuery,
        testimonialsQuery,
        contactsQuery,
      ]),
      variables: { locale: 'en' },
    });

    // Fetch list pages data
    const listPagesData: ListPagesQueryResponse = await datoCMS({
      query: getCombinedQuery([
        technicalLedgerPageQuery,
        bookSummariesPageQuery,
      ]),
      variables: { locale: 'en' },
    });

    // Fetch GitHub repositories
    let repositories: GithubRepository[] = [];
    try {
      repositories = await getGithubRepositories('abelofficial', 10);
      console.log(`Fetched ${repositories.length} GitHub repositories`);
    } catch (error) {
      console.error('Failed to fetch GitHub repositories:', error);
    }

    // Filter hidden repositories
    const hiddenRepoNames = landingData.landingPage.hiddenPublicRepositories
      ? landingData.landingPage.hiddenPublicRepositories
          .split(',')
          .map((name) => name.trim().toLowerCase())
          .filter(Boolean)
      : [];

    const visibleRepositories = repositories.filter(
      (repo) => !hiddenRepoNames.includes(repo.name.toLowerCase())
    );

    const seedChunks: SeedChunk[] = [];

    // 1. Landing Page with actual content
    const landingPageChunk = getLandingPageSeedChunk(landingData.landingPage);
    seedChunks.push(landingPageChunk);

    // 2. About Page with actual content
    const aboutPageChunk = getAboutPageSeedChunk(
      aboutData.homePage,
      aboutData.allTechstacks,
      aboutData.allTestimonials,
      aboutData.allContacts
    );
    seedChunks.push(aboutPageChunk);

    // 3. Technical Ledgers List Page
    const technicalLedgersPageChunk = getTechnicalLedgersPageSeedChunk(
      listPagesData.technicalLedgersPage,
      landingData.allTechnicalLedgers
    );
    seedChunks.push(technicalLedgersPageChunk);

    // 4. Book Summaries List Page
    const bookSummariesPageChunk = getBookSummariesPageSeedChunk(
      listPagesData.bookSummaryPage,
      landingData.allBookSummaries
    );
    seedChunks.push(bookSummariesPageChunk);

    console.log(`Generated ${seedChunks.length} page seed chunks`);

    // Embed and seed to vector DB
    await embedAndSeedChunksToVectorDb(seedChunks);
  } catch (error) {
    console.error('❌ Pages seed failed:', error);
    process.exit(1);
  }
}

/**
 * Generate seed chunk for the Landing Page with actual content
 */
const getLandingPageSeedChunk = (landingPage: LandingPage): PageSeedChunk => {
  const landingSectionLinks = {
    welcome: `${BASE_URL}/en#welcome`,
    latestFindings: `${BASE_URL}/en#latest-findings`,
    currentlyReading: `${BASE_URL}/en#currently-reading`,
    currentlyWorkingOn: `${BASE_URL}/en#public-projects`,
  };

  const text = `[Type]: Landing Page
[Page Title]: ${landingPage.welcomeTitle}
[Page Description]: ${landingPage.welcomeSubtitle}

This is the main landing page of Abel's personal website. It showcases what Abel is currently working on and reading.

[Sections & Full Links]:
- Welcome: fullLink => ${landingSectionLinks.welcome}
- Latest Findings: fullLink => ${landingSectionLinks.latestFindings}
- Currently Reading: fullLink => ${landingSectionLinks.currentlyReading}
- Public GitHUb projects: fullLink => ${landingSectionLinks.currentlyWorkingOn}

[Purpose]: This page introduces visitors to Abel's personal, showing real-time updates on current reading, technical writing, and coding projects.`;

  return {
    metadata: {
      id: `page-landing-${landingPage.id}`,
      type: 'page',
      pageTitle: landingPage.welcomeTitle,
      pageType: 'landing',
      fullLink: `${BASE_URL}/en`,
    },
    text,
  };
};

/**
 * Generate seed chunk for the About Page with actual content
 */
const getAboutPageSeedChunk = (
  homePage: HomePage,
  techStacks: TechStack[],
  testimonials: Testimonial[],
  contacts: ContactInfo[]
): PageSeedChunk => {
  // Format tech stack by category
  const techStackList = techStacks.map((tech) => `  - ${tech.name}`).join('\n');

  const contactList = contacts
    .map((contact) => `  - [PlatForm]: ${contact.title} => ${contact.address}`)
    .join('\n');

  // Format testimonials
  const testimonialsList = testimonials
    .map(
      (t) => `  - ${t.name} (${t.workPosition} at ${t.workPlace}): "${t.text}"`
    )
    .join('\n');

  const sectionLinks = {
    profile: `${BASE_URL}/en/about#profile`,
    tech: `${BASE_URL}/en/about#tech`,
    experience: `${BASE_URL}/en/about#experience`,
    testimonials: `${BASE_URL}/en/about#testimonials`,
  };

  const text = `[Type]: About Page
[Page Title]: About ${homePage.name}

This is the about page providing detailed information about Abel Sintaro.

[Introduction]:
${homePage.intro}

[Tech Stack - Technologies & Tools]: 
${techStackList || '  - No tech stack listed'}

[What Colleagues Say - Testimonials]: 
${testimonialsList || '  - No testimonials yet'}

[Sections FullLinks]:
- Profile fullLink: ${sectionLinks.profile}
- Tech Stack fullLink: ${sectionLinks.tech}
- Work and Education Experience  fullLink: ${sectionLinks.experience}
- Testimonials fullLink: ${sectionLinks.testimonials}

[Contact]:
${contactList}

[Purpose]: This page provides comprehensive information about Abel's professional background, technical skills, and what colleagues say about working with him.`;

  return {
    metadata: {
      id: `page-about-${homePage.id}`,
      type: 'page',
      pageTitle: `About ${homePage.name}`,
      pageType: 'about',
      fullLink: `${BASE_URL}/en/about`,
    },
    text,
  };
};

/**
 * Generate seed chunk for the Technical Ledgers List Page with actual content
 */
const getTechnicalLedgersPageSeedChunk = (
  technicalLedgersPage: TechnicalLedgerPage,
  ledgers: LatestLedger[]
): PageSeedChunk => {
  // Group ledgers by category
  const categories = [...new Set(ledgers.map((l) => l.category))];
  const categorySummary = categories
    .map((cat) => {
      const count = ledgers.filter((l) => l.category === cat).length;
      return `  - ${cat}: ${count} notes`;
    })
    .join('\n');

  // Format all ledgers
  const ledgersList = ledgers
    .map(
      (ledger) =>
        `  - "${ledger.title}" (${ledger.category}) - ${ledger.readMinutes} min read`
    )
    .join('\n');

  const text = `[Type]: Technical Ledgers List Page
[Page Title]: ${technicalLedgersPage.title}
[Page Description]: ${technicalLedgersPage.description}
[Page Explanation]: ${technicalLedgersPage.explanation}

This page displays all technical notes and documentation written by Abel.

[Terminology]:
- "Technical Ledger" refers to a detailed technical note or documentation about a specific topic
- These are in-depth technical articles covering programming concepts, tools, and best practices

[Categories]:
${categorySummary || '  - No categories yet'}

[All Technical Ledgers]:
${ledgersList || '  - No technical ledgers yet'}

[Statistics]:
- Total Technical Notes: ${ledgers.length}
- Categories: ${categories.length}

[Purpose]: This page serves as a catalog of all technical documentation and notes. Users can browse, filter by category, and access detailed technical content.`;

  return {
    metadata: {
      id: `page-technical-ledgers-${technicalLedgersPage.id}`,
      type: 'page',
      pageTitle: technicalLedgersPage.title,
      pageType: 'technical-ledgers-list',
      fullLink: `${BASE_URL}/en/technical-ledgers`,
    },
    text,
  };
};

/**
 * Generate seed chunk for the Book Summaries List Page with actual content
 */
const getBookSummariesPageSeedChunk = (
  bookSummaryPage: BookSummariesPage,
  books: CurrentlyReadingBook[]
): PageSeedChunk => {
  // Categorize books by reading status
  const inProgressBooks = books.filter((book) => {
    const publishedCount = book.chapters.filter((c) => c.isPublished).length;
    return publishedCount > 0 && publishedCount < book.chapters.length;
  });

  const finishedBooks = books.filter((book) => {
    const publishedCount = book.chapters.filter((c) => c.isPublished).length;
    return publishedCount === book.chapters.length && book.chapters.length > 0;
  });

  const notStartedBooks = books.filter((book) => {
    const publishedCount = book.chapters.filter((c) => c.isPublished).length;
    return publishedCount === 0;
  });

  // Group by category
  const categories = [...new Set(books.map((b) => b.category))];
  const categorySummary = categories
    .map((cat) => {
      const count = books.filter((b) => b.category === cat).length;
      return `  - ${cat}: ${count} books`;
    })
    .join('\n');

  // Format books by status
  const formatBookList = (bookList: CurrentlyReadingBook[]) =>
    bookList
      .map((book) => {
        const published = book.chapters.filter((c) => c.isPublished).length;
        const total = book.chapters.length;
        return `  - "${book.title}" by ${book.author} (${book.category}) - ${published}/${total} chapters`;
      })
      .join('\n');

  const text = `[Type]: Book Summaries List Page
[Page Title]: ${bookSummaryPage.title}
[Page Description]: ${bookSummaryPage.description}

This page displays all book summaries written by Abel.

[Terminology]:
- "Book Summary" refers to a detailed summary and notes from a book Abel has read
- Each summary includes chapters with key takeaways and insights

[Categories]:
${categorySummary || '  - No categories yet'}

[Books In Progress]:
${formatBookList(inProgressBooks) || '  - No books in progress'}

[Finished Books]:
${formatBookList(finishedBooks) || '  - No finished books yet'}

[Not Started]:
${formatBookList(notStartedBooks) || '  - No books waiting to start'}

[Statistics]:
- Total Book Summaries: ${books.length}
- In Progress: ${inProgressBooks.length}
- Completed: ${finishedBooks.length}
- Not Started: ${notStartedBooks.length}
- Categories: ${categories.length}

[Purpose]: This page serves as a library of book summaries. Users can browse books by category, see reading progress, and access detailed chapter summaries.`;

  return {
    metadata: {
      id: `page-book-summaries-${bookSummaryPage.id}`,
      type: 'page',
      pageTitle: bookSummaryPage.title,
      pageType: 'book-summaries-list',
      fullLink: `${BASE_URL}/en/book-summaries`,
    },
    text,
  };
};

seed()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
