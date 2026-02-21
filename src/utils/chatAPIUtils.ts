import type { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';
import { simulateReadableStream } from 'ai';

export const LOCALHOST_IP = '127.0.0.1';
export const UNKNOWN_IP_RESPONSE =
  'Sorry but I am unable to give response at the moment';

export const getClientIp = async (
  headers: ReadonlyHeaders
): Promise<string | null> => {
  const rawIP =
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip') ||
    null;

  // For local development, we can return localhost IP if the rawIP is loopback
  if (rawIP === '::1' || rawIP === LOCALHOST_IP) return LOCALHOST_IP;

  if (rawIP) return rawIP;

  return null;
};

type MetadataWithLocale = {
  locale?: unknown;
};

export const getLocale = (metadata: unknown): string => {
  if (
    typeof metadata === 'object' &&
    metadata !== null &&
    'locale' in metadata
  ) {
    const locale = (metadata as MetadataWithLocale).locale;
    if (typeof locale === 'string') {
      return locale;
    }
  }

  return 'en';
};

export const manualUIMessageStreamResponse = (text: string, status = 200) =>
  new Response(createManualUIMessageStream(text), {
    status,
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'x-vercel-ai-ui-message-stream': 'v1',
    },
  });

const jitter = (base: number, variance: number) =>
  base + Math.floor(Math.random() * variance);

const createManualUIMessageStream = (text: string) => {
  const messageId = `msg-${crypto.randomUUID()}`;
  const textId = `text-${crypto.randomUUID()}`;

  return simulateReadableStream({
    initialDelayInMs: jitter(350, 250), // 350–600ms
    // “typing” cadence
    chunkDelayInMs: jitter(200, 300), // 28–46ms
    chunks: [
      `data: ${JSON.stringify({ type: 'start', messageId })}\n\n`,
      `data: ${JSON.stringify({ type: 'text-start', id: textId })}\n\n`,
      `data: ${JSON.stringify({ type: 'text-delta', id: textId, delta: text })}\n\n`,
      `data: ${JSON.stringify({ type: 'text-end', id: textId })}\n\n`,
      `data: ${JSON.stringify({ type: 'finish' })}\n\n`,
      `data: [DONE]\n\n`,
    ],
  }).pipeThrough(new TextEncoderStream());
};
