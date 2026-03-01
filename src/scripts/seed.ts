import { SeedChunk } from '@/scripts/types';
import { embedMany } from 'ai';
import { openai } from '@ai-sdk/openai';
import * as dotenv from 'dotenv';
import { Index } from '@upstash/vector';

dotenv.config({ path: '.env' });

const index = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL!,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
});

const MODEL_NAME = 'text-embedding-3-small';

export const embedAndSeedChunksToVectorDb = async (seedChunks: SeedChunk[]) => {
  console.log(
    `Vectorizing ${seedChunks.length} items via OpenAI (${MODEL_NAME})`
  );

  const { embeddings } = await embedMany({
    model: openai.embedding(MODEL_NAME),
    values: seedChunks.map((chunk) => chunk.text),
  });

  if (embeddings.length !== seedChunks.length) {
    throw new Error(
      `Embedding mismatch: got ${embeddings.length} vectors for ${seedChunks.length} chunks`
    );
  }

  const records = seedChunks.map((item, i) => ({
    id: item.metadata.id,
    vector: embeddings[i],
    metadata: {
      ...item.metadata,
      text: item.text,
    },
  }));

  console.log('Pushing to Upstash Vector...');
  await index.upsert(records);
  console.log('✅ Success! All chunks are now seeded with modular context.');
};
