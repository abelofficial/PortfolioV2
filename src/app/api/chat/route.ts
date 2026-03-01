import { Index } from '@upstash/vector';
import { openai } from '@ai-sdk/openai';
import { streamText, convertToModelMessages, type UIMessage, embed } from 'ai';
import { formatContextCompact, getSystemPrompt } from '@/utils/ai-prompts';
import {
  Prompt,
  PromptContext,
  TechnicalLedgerNoteContext,
  BookSummaryIntroContext,
  BookSummaryChapterContext,
  BasePromptContext,
} from '@/types';
import { datoCMS } from '@services/datoCMS';
import { getCombinedQuery, promptQuery } from '@/lib/queries';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { headers } from 'next/headers';
import {
  getClientIp,
  getLocale,
  LOCALHOST_IP,
  manualUIMessageStreamResponse,
  UNKNOWN_IP_RESPONSE,
} from '@/utils/chatAPIUtils';

const MAX_MESSAGES_MEMORY = 5;

const index = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL!,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
});

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '1 h'),
  analytics: true,
  prefix: 'chat-api',
});

/**
 * Map vector DB metadata to typed PromptContext based on the type field
 */
function mapMetadataToPromptContext(
  metadata: Record<string, unknown>
): PromptContext {
  const type = metadata?.type as string;

  switch (type) {
    case 'technical-ledger-note':
      return {
        type: 'technical-ledger-note',
        title: metadata.title as string,
        noteTitle: metadata.noteTitle as string,
        fullLink: metadata.fullLink as string,
        text: metadata.text as string,
      } as TechnicalLedgerNoteContext;

    case 'book-summary-intro':
      return {
        type: 'book-summary-intro',
        title: metadata.title as string,
        author: metadata.author as string,
        category: metadata.category as string,
        tags: (metadata.tags as string[]) || [],
        totalChapters: metadata.totalChapters as number,
        publishedChapters: metadata.publishedChapters as number,
        chapterTitles: (metadata.chapterTitles as string[]) || [],
        fullLink: metadata.fullLink as string,
        text: metadata.text as string,
      } as BookSummaryIntroContext;

    case 'book-summary-chapter':
      return {
        type: 'book-summary-chapter',
        bookTitle: metadata.bookTitle as string,
        bookSlugId: metadata.bookSlugId as string,
        chapterNumber: metadata.chapterNumber as number,
        chapterTitle: metadata.chapterTitle as string,
        fullLink: metadata.fullLink as string,
        text: metadata.text as string,
      } as BookSummaryChapterContext;

    default:
      // Fallback for legacy or unknown types
      return {
        type: type as BasePromptContext['type'],
        fullLink: metadata.fullLink as string,
        text: metadata.text as string,
      } as BasePromptContext;
  }
}

export async function POST(req: Request) {
  const headersList = await headers();
  const ip = await getClientIp(headersList);

  if (!ip) {
    return manualUIMessageStreamResponse(UNKNOWN_IP_RESPONSE);
  }

  const { messages }: { messages: UIMessage[] } = await req.json();
  const lastUserMessage = messages[messages.length - 1];
  const { prompt }: { prompt: Prompt } = await datoCMS({
    query: getCombinedQuery([promptQuery]),
    variables: { locale: getLocale(lastUserMessage.metadata) },
  });

  if (ip !== LOCALHOST_IP) {
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return manualUIMessageStreamResponse(prompt.rateLimitMessage);
    }
  }

  const lastMessageText = lastUserMessage.parts
    .filter((part) => part.type === 'text')
    .map((part) => part.text)
    .join(' ');

  const { embedding } = await embed({
    model: openai.embedding('text-embedding-3-small'),
    value: lastMessageText,
  });

  const queryResult = await index.query({
    vector: embedding,
    topK: 5,
    includeMetadata: true,
  });

  // Map metadata to typed PromptContext
  const context: PromptContext[] = queryResult.map((match) =>
    mapMetadataToPromptContext(match.metadata as Record<string, unknown>)
  );

  const systemPrompt = getSystemPrompt(prompt);
  const contextText = formatContextCompact(context);

  const trimmed = messages.slice(-MAX_MESSAGES_MEMORY);

  const modelMessages = await convertToModelMessages(trimmed);

  modelMessages.push({
    role: 'system',
    content: contextText,
  });
  const result = streamText({
    model: openai('gpt-4o-mini'),
    system: systemPrompt,
    messages: modelMessages,
    maxOutputTokens: 400,
  });

  return result.toUIMessageStreamResponse();
}
