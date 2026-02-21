// scripts/seed.ts
import { Index } from '@upstash/vector';
import { openai } from '@ai-sdk/openai';
import * as dotenv from 'dotenv';
import { datoCMS } from '@services/datoCMS';
import { getCombinedQuery, allTechnicalLedgersQuery } from '@/lib/queries';
import { TechnicalLedgerForPrompt } from '@/types';
import { embedMany } from 'ai';

dotenv.config({ path: '.env' });

const index = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL!,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
});

async function seed() {
  console.log('🚀 Starting Technical Ledger seed process...');

  try {
    // 1. Fetch the data from DatoCMS
    const {
      allTechnicalLedgers,
    }: { allTechnicalLedgers: TechnicalLedgerForPrompt[] } = await datoCMS({
      query: getCombinedQuery([allTechnicalLedgersQuery]),
      variables: { locale: 'en' },
    });

    if (!allTechnicalLedgers || allTechnicalLedgers.length === 0) {
      console.log('⚠️ No ledger notes found. Check your CMS query.');
      return;
    }

    // 2. Format the notes for embedding
    const seedChunks = allTechnicalLedgers.flatMap((note) =>
      getLedgerSeedData(note)
    );

    console.log(
      `Vectorizing ${seedChunks.length} items via OpenAI (text-embedding-3-small)...`
    );

    // 3. Generate Embeddings
    const { embeddings } = await embedMany({
      model: openai.embedding('text-embedding-3-small'),
      values: seedChunks.map((chunk) => chunk.text),
    });

    if (embeddings.length !== seedChunks.length) {
      throw new Error(
        `Embedding mismatch: got ${embeddings.length} vectors for ${seedChunks.length} chunks`
      );
    }

    // 4. Map to Upstash Records
    const records = seedChunks.map((item, i) => ({
      id: item.id,
      vector: embeddings[i],
      metadata: {
        ...item.metadata,
        text: item.text,
      },
    }));

    console.log('Pushing to Upstash Vector...');
    await index.upsert(records);

    console.log(
      '✅ Success! Your Ledger AI is now seeded with modular context.'
    );
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

/**
 * Helper to transform Modular promptNotes into a single string
 */

type TechnicalLedgerEmbeddingSeed = {
  id: string;
  text: string;
  metadata: {
    category: string;
    title: string;
    published: string;
    fullLink: string;
  };
};

const getLedgerSeedData = (
  note: TechnicalLedgerForPrompt
): TechnicalLedgerEmbeddingSeed[] => {
  return note.promptNotes.map((block) => ({
    id: note.id + '-' + block.id, // Unique ID for each block
    text: `[${note.title}] : [${block.contextTitle}]\n 
    [published] : [${note.date}]\n
    [category] : [${note.category}]\n
    [readMinutes] : [${note.readMinutes}]\n
    \n\n${block.contextContent}`,
    metadata: {
      category: note.category,
      title: note.title,
      published: note.date,
      fullLink: process.env.BASE_URL + '/en/technical-ledgers/' + note?.slugId,
    },
  }));
};

seed()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
