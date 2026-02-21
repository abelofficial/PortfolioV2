// scripts/seed.ts
import { Index } from '@upstash/vector';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
import { datoCMS } from '@services/datoCMS';
import { getCombinedQuery, allTechnicalLedgersQuery } from '@/lib/queries';
import { TechnicalLedgerForPrompt } from '@/types';

dotenv.config({ path: '.env' });

const index = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL!,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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
    const seedData = allTechnicalLedgers.map((note) => getLedgerSeedData(note));

    console.log(
      `Vectorizing ${seedData.length} items via OpenAI (text-embedding-3-small)...`
    );

    // 3. Generate Embeddings
    const embeddingsResponse = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: seedData.map((item) => item.text),
    });

    // 4. Map to Upstash Records
    const records = seedData.map((item, i) => ({
      id: item.id,
      vector: embeddingsResponse.data[i].embedding,
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
const getLedgerSeedData = (note: TechnicalLedgerForPrompt) => {
  // Join all promptNotes into a structured string
  const flattenedContext = note.promptNotes
    .map((block) => `[${block.contextTitle}]\n${block.contextContent}`)
    .join('\n\n');

  return {
    id: note.id,
    text: flattenedContext,
    metadata: {
      slug: note.slugId,
      category: note.category,
      title: note.title,
      readMinutes: note.readMinutes,
      published: note.date,
      fullLink: process.env.BASE_URL + '/en/technical-ledgers/' + note?.slugId,
      type: ['ledger', 'blog', 'knowledge-base'],
    },
  };
};

seed()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
