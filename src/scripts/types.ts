export type SeedChunkType =
  | 'technical-ledger-page'
  | 'technical-ledger-note'
  | 'book-summary-intro'
  | 'book-summary-chapter'
  | 'page'
  | 'profile';

export interface SeedChunk {
  text: string;
  metadata: SeedChunkMetadata;
}

export interface SeedChunkMetadata {
  id: string;
  type: SeedChunkType;
  [key: string]: unknown; // Allow additional properties
}

export interface TechnicalLedgerPromptNoteSeedChunk extends SeedChunk {
  text: string;
  metadata: {
    id: string;
    type: 'technical-ledger-note';
    title: string;
    noteTitle: string;
    fullLink: string;
  };
}

export interface TechnicalLedgerPageSeedChunk extends SeedChunk {
  text: string;
  metadata: {
    id: string;
    type: 'technical-ledger-page';
  };
}

export interface BookSummaryIntroSeedChunk extends SeedChunk {
  text: string;
  metadata: {
    id: string;
    type: 'book-summary-intro';
    title: string;
    author: string;
    category: string;
    tags: string[];
    fullLink: string;
    totalChapters: number;
    publishedChapters: number;
    chapterTitles: string[];
  };
}

export interface BookSummaryChapterSeedChunk extends SeedChunk {
  text: string;
  metadata: {
    id: string;
    type: 'book-summary-chapter';
    bookTitle: string;
    bookSlugId: string;
    chapterNumber: number;
    chapterTitle: string;
    fullLink: string;
  };
}

export interface ProfileSeedChunk extends SeedChunk {
  text: string;
  metadata: {
    id: string;
    type: 'profile';
    title: string;
    institution: string;
    experienceType: string;
    fullLink: string;
  };
}

export interface PageSeedChunk extends SeedChunk {
  text: string;
  metadata: {
    id: string;
    type: 'page';
    pageTitle: string;
    pageType: string;
    fullLink: string;
  };
}
