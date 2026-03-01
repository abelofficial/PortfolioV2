import {
  Prompt,
  PromptContext,
  TechnicalLedgerNoteContext,
  BookSummaryIntroContext,
  BookSummaryChapterContext,
  ProfileContext,
} from '@/types';

export const getSystemPrompt = (prompt: Prompt) =>
  `
${prompt.coreRule}

${prompt.safetyLimitations}

${prompt.toneAndStyle}

${prompt.formattingAndStructure}

${prompt.contextualKnowledge}
`.trim();

function normalizeWhitespace(s: string) {
  return s
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Format a technical ledger note context
 */
function formatTechnicalLedgerNote(
  context: TechnicalLedgerNoteContext,
  index: number
): string {
  return normalizeWhitespace(`
Technical Ledger ${index}
Title: ${context.title}
Section: ${context.noteTitle}
${context.fullLink ? `Link: ${context.fullLink}` : ''}

Content:
${context.text}
  `);
}

/**
 * Format a book summary intro context
 */
function formatBookSummaryIntro(
  context: BookSummaryIntroContext,
  index: number
): string {
  const publishedInfo =
    context.publishedChapters < context.totalChapters
      ? `(${context.publishedChapters} published, ${context.totalChapters - context.publishedChapters} coming soon)`
      : `(all ${context.totalChapters} chapters published)`;

  return normalizeWhitespace(`
Book Summary ${index}
Title: ${context.title}
Author: ${context.author}
Category: ${context.category}
${context.tags?.length ? `Tags: ${context.tags.join(', ')}` : ''}
Chapters: ${context.totalChapters} ${publishedInfo}
${context.fullLink ? `Link: ${context.fullLink}` : ''}

Overview:
${context.text}
  `);
}

/**
 * Format a book summary chapter context
 */
function formatBookSummaryChapter(
  context: BookSummaryChapterContext,
  index: number
): string {
  return normalizeWhitespace(`
Book Chapter ${index}
Book: ${context.bookTitle}
Chapter ${context.chapterNumber}: ${context.chapterTitle}
${context.fullLink ? `Link: ${context.fullLink}` : ''}

Content:
${context.text}
  `);
}

/**
 * Format a profile/experience context
 */
function formatProfile(context: ProfileContext, index: number): string {
  return normalizeWhitespace(`
Profile ${index}
Type: ${context.experienceType}
Title: ${context.title}
Institution: ${context.institution}
${context.fullLink ? `Link: ${context.fullLink}` : ''}

Details:
${context.text}
  `);
}

/**
 * Format a generic/legacy context
 */
function formatGenericContext(context: PromptContext, index: number): string {
  return normalizeWhitespace(`
Result ${index}
${context.fullLink ? `Link: ${context.fullLink}` : ''}

Content:
${context.text}
  `);
}

/**
 * Format a single context item based on its type
 */
function formatContextItem(context: PromptContext, index: number): string {
  switch (context.type) {
    case 'technical-ledger-note':
      return formatTechnicalLedgerNote(
        context as TechnicalLedgerNoteContext,
        index
      );
    case 'book-summary-intro':
      return formatBookSummaryIntro(context as BookSummaryIntroContext, index);
    case 'book-summary-chapter':
      return formatBookSummaryChapter(
        context as BookSummaryChapterContext,
        index
      );
    case 'profile':
      return formatProfile(context as ProfileContext, index);
    default:
      return formatGenericContext(context, index);
  }
}

/**
 * Group contexts by type for better organization
 */
function groupContextsByType(
  contexts: PromptContext[]
): Map<string, PromptContext[]> {
  const groups = new Map<string, PromptContext[]>();

  for (const context of contexts) {
    const type = context.type || 'unknown';
    const existing = groups.get(type) || [];
    groups.set(type, [...existing, context]);
  }

  return groups;
}

/**
 * Get a human-readable label for a context type
 */
function getTypeLabel(type: string): string {
  switch (type) {
    case 'technical-ledger-note':
      return 'Technical Ledger Notes';
    case 'book-summary-intro':
      return 'Book Summaries';
    case 'book-summary-chapter':
      return 'Book Chapters';
    case 'profile':
      return 'Profile & Experience';
    default:
      return 'Other Results';
  }
}

/**
 * Main function to format all contexts for the AI model
 * Groups by type and formats each appropriately
 */
export function formatContextCompact(contexts: PromptContext[]): string {
  if (!contexts?.length) return 'CONTEXT: (none)';

  const groups = groupContextsByType(contexts);
  const sections: string[] = [];

  let globalIndex = 1;

  for (const [type, items] of groups) {
    const typeLabel = getTypeLabel(type);
    const formattedItems = items.map((item) =>
      formatContextItem(item, globalIndex++)
    );

    sections.push(`## ${typeLabel}\n\n${formattedItems.join('\n\n---\n\n')}`);
  }

  return `CONTEXT (Relevant Information):\n\n${sections.join('\n\n===\n\n')}`;
}
