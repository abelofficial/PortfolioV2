import { datoCMS } from '@services/datoCMS';
import {
  allBookSummaries,
  bookSummariesPageQuery,
  getCombinedQuery,
} from '@/lib/queries';
import { BookSummary, BookSummariesPage } from '@/types';
import { embedAndSeedChunksToVectorDb } from '@/scripts/seed';
import {
  BookSummaryIntroSeedChunk,
  BookSummaryChapterSeedChunk,
  PageSeedChunk,
  SeedChunk,
} from '@/scripts/types';

const BASE_URL = process.env.BASE_URL || 'https://abelsintaro.com';

async function seed() {
  console.log('🚀 Starting Book Summaries seed process...');

  try {
    // 1. Fetch all book summaries and page info from DatoCMS
    const {
      allBookSummaries: bookSummaries,
      bookSummaryPage,
    }: {
      allBookSummaries: BookSummary[];
      bookSummaryPage: BookSummariesPage;
    } = await datoCMS({
      query: getCombinedQuery([allBookSummaries, bookSummariesPageQuery]),
      variables: { locale: 'en' },
    });

    if (!bookSummaries || bookSummaries.length === 0) {
      console.log('⚠️ No book summaries found. Check your CMS query.');
      return;
    }

    console.log(`Found ${bookSummaries.length} book summaries`);

    // 2. Generate seed chunks for list page, intros, and chapters
    const seedChunks: SeedChunk[] = [];

    // Add list page chunk
    const listPageChunk = getBookSummariesListPageSeedChunk(
      bookSummaryPage,
      bookSummaries
    );
    seedChunks.push(listPageChunk);

    for (const book of bookSummaries) {
      // Add intro chunk for each book
      const introChunk = getBookIntroSeedChunk(book);
      seedChunks.push(introChunk);

      // Add chapter chunks for published chapters only
      const publishedChapters = book.chapters.filter((c) => c.isPublished);
      const chapterChunks = publishedChapters.map((chapter) =>
        getChapterSeedChunk(book, chapter)
      );
      seedChunks.push(...chapterChunks);
    }

    console.log(`Generated ${seedChunks.length} seed chunks`);

    // 3. Embed and seed to vector DB
    await embedAndSeedChunksToVectorDb(seedChunks);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

/**
 * Generate seed chunk for book intro/overview
 * Includes metadata about the book and all chapters (published/unpublished)
 */
const getBookIntroSeedChunk = (
  book: BookSummary
): BookSummaryIntroSeedChunk => {
  const sortedChapters = [...book.chapters].sort(
    (a, b) => a.chapter - b.chapter
  );
  const publishedChapters = sortedChapters.filter((c) => c.isPublished);
  const unpublishedChapters = sortedChapters.filter((c) => !c.isPublished);

  const tags = book.tags?.map((t) => t.tag) || [];
  const chapterTitles = sortedChapters.map((c) => c.title);

  // Build chapter list with status
  const chapterList = sortedChapters
    .map(
      (c) =>
        `  - Chapter ${c.chapter}: ${c.title} (${c.isPublished ? 'published' : 'coming soon'})`
    )
    .join('\n');

  const text = `[Type]: Book Summary Introduction
[Book Title]: ${book.title}
[Author]: ${book.author}
[Category]: ${book.category}
[Tags]: ${tags.join(', ')}
[Excerpt]: ${book.excerpt}
[Total Chapters]: ${sortedChapters.length}
[Published Chapters]: ${publishedChapters.length}
[Upcoming Chapters]: ${unpublishedChapters.length}
[Chapter Overview]:
${chapterList}`;

  return {
    text,
    metadata: {
      id: `book-intro-${book.id}`,
      type: 'book-summary-intro',
      title: book.title,
      author: book.author,
      category: book.category,
      tags,
      fullLink: `${BASE_URL}/en/book-summaries/${book.slugId}`,
      totalChapters: sortedChapters.length,
      publishedChapters: publishedChapters.length,
      chapterTitles,
    },
  };
};

/**
 * Generate seed chunk for a single chapter
 * Only called for published chapters
 */
const getChapterSeedChunk = (
  book: BookSummary,
  chapter: BookSummary['chapters'][0]
): BookSummaryChapterSeedChunk => {
  // Truncate content if too long for embedding (keep first ~2000 chars for context)
  const maxContentLength = 2000;
  const truncatedContent =
    chapter.content.length > maxContentLength
      ? chapter.content.substring(0, maxContentLength) + '...'
      : chapter.content;

  const text = `[Type]: Book Summary Chapter
[Book Title]: ${book.title}
[Author]: ${book.author}
[Category]: ${book.category}
[Chapter Number]: ${chapter.chapter}
[Chapter Title]: ${chapter.title}
[Chapter Content]:
${truncatedContent}`;

  return {
    text,
    metadata: {
      id: `book-chapter-${book.id}-${chapter.slugId}`,
      type: 'book-summary-chapter',
      bookTitle: book.title,
      bookSlugId: book.slugId,
      chapterNumber: chapter.chapter,
      chapterTitle: chapter.title,
      fullLink: `${BASE_URL}/en/book-summaries/${book.slugId}/chapter/${chapter.slugId}`,
    },
  };
};

/**
 * Generate seed chunk for the book summaries list page
 * Includes overview of all available book summaries
 */
const getBookSummariesListPageSeedChunk = (
  page: BookSummariesPage,
  books: BookSummary[]
): PageSeedChunk => {
  const categories = [...new Set(books.map((book) => book.category))];
  const bookTitles = books
    .map((book) => `  - "${book.title}" by ${book.author}`)
    .join('\n');

  const text = `[Type]: Page - Book Summaries List
[Page Title]: ${page.title}
[Page Description]: ${page.description}
[Total Books]: ${books.length}
[Categories]: ${categories.join(', ')}
[Available Book Summaries]:
${bookTitles}`;

  return {
    text,
    metadata: {
      id: `page-book-summaries-${page.id}`,
      type: 'page',
      pageTitle: page.title,
      pageType: 'book-summaries-list',
      fullLink: `${BASE_URL}/en/book-summaries`,
    },
  };
};

seed()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
