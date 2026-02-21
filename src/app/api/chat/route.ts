import { Index } from '@upstash/vector';
import { openai } from '@ai-sdk/openai';
import { streamText, convertToModelMessages, type UIMessage, embed } from 'ai';
import { formatContextCompact, getSystemPrompt } from '@/utils/ai-prompts';
import { Prompt, PromptContext } from '@/types';
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
  limiter: Ratelimit.slidingWindow(5, '1 h'),
  analytics: true,
  prefix: 'chat-api',
});

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

  const context = queryResult.map(
    (match) =>
      ({
        title: match.metadata?.title,
        category: match.metadata?.category,
        published: match.metadata?.published,
        text: match.metadata?.text,
        fullLink: match.metadata?.fullLink,
      }) as PromptContext
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
