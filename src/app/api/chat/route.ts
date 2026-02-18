import { Index } from '@upstash/vector';
import { openai } from '@ai-sdk/openai';
import { streamText, convertToModelMessages, type UIMessage, embed } from 'ai';
import { getAssistantPrompt } from '@/utils/ai-prompts';
import { Prompt, PromptContext } from '@/types';
import { datoCMS } from '@services/datoCMS';
import {
  getCombinedQueryWithoutLocalization,
  promptQuery,
} from '@/lib/queries';

const index = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL!,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
});

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  const { prompt }: { prompt: Prompt } = await datoCMS({
    query: getCombinedQueryWithoutLocalization([promptQuery]),
  });

  const lastUserMessage = messages[messages.length - 1];
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
    topK: 3,
    includeMetadata: true,
  });

  const context = queryResult.map(
    (match) =>
      ({
        title: match.metadata?.title,
        category: match.metadata?.category,
        slug: match.metadata?.slug,
        readMinutes: match.metadata?.readMinutes,
        excerpt: match.metadata?.excerpt,
        published: match.metadata?.published,
        text: match.metadata?.text,
        fullLink: match.metadata?.fullLink,
      }) as PromptContext
  );

  const finalPrompt = getAssistantPrompt(context, prompt);

  const result = streamText({
    model: openai('gpt-4o-mini'),
    system: finalPrompt,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
