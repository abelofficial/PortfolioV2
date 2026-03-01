import { datoCMS } from '@services/datoCMS';
import { allBookSummaries, getCombinedQuery } from '@/lib/queries';
import { BookSummary } from '@/types';
import { embedAndSeedChunksToVectorDb } from '@/scripts/seed';
import {
  BookSummaryIntroSeedChunk,
  BookSummaryChapterSeedChunk,
  SeedChunk,
} from '@/scripts/types';

const BASE_URL = process.env.BASE_URL || 'https://abelsintaro.com';

async function seed() {
  console.log('🚀 Starting Book Summaries seed process...');

  try {
    // 1. Fetch all book summaries from DatoCMS
    const {
      allBookSummaries: bookSummaries,
    }: {
      allBookSummaries: BookSummary[];
    } = await datoCMS({
      query: getCombinedQuery([allBookSummaries]),
      variables: { locale: 'en' },
    });

    if (!bookSummaries || bookSummaries.length === 0) {
      console.log('⚠️ No book summaries found. Check your CMS query.');
      return;
    }

    console.log(`Found ${bookSummaries.length} book summaries`);

    // 2. Generate seed chunks for intros and chapters
    const seedChunks: SeedChunk[] = [];

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

seed()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
