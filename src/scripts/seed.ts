// scripts/seed.ts
import { Index } from '@upstash/vector';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
import {
  EducationExperienceList,
  Experience,
  WorkExperienceList,
} from '@/types';
import { datoCMS } from '@services/datoCMS';
import {
  educationExperienceQuery,
  queryWrapper,
  workExperienceQuery,
} from '@/lib/queries';

dotenv.config({ path: '.env' });

const index = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL!,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function seed() {
  console.log('🚀 Starting seed process...');

  try {
    const [educationExperiences, workExperiences] = await Promise.all([
      datoCMS({
        query: queryWrapper([educationExperienceQuery]),
      }) as Promise<EducationExperienceList>,
      datoCMS({
        query: queryWrapper([workExperienceQuery]),
      }) as Promise<WorkExperienceList>,
    ]);

    const educationsSeedData = educationExperiences.allEducations.map((edu) =>
      getExperienceSeedData({ type: 'Education', experience: edu })
    );
    const workExperiencesSeedData = workExperiences.allWorks.map((work) =>
      getExperienceSeedData({ type: 'Work', experience: work })
    );

    const allSeedData = [...workExperiencesSeedData, ...educationsSeedData];

    if (allSeedData.length === 0) {
      console.log('⚠️ No data found to seed. Check your CMS queries.');
      return;
    }

    console.log(`Vectorizing ${allSeedData.length} items via OpenAI...`);
    const inputTexts = allSeedData.map((item) => item.text);

    const embeddingsResponse = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: inputTexts,
    });

    const records = allSeedData.map((item, i) => ({
      id: item.id,
      vector: embeddingsResponse.data[i].embedding,
      metadata: {
        ...item.metadata,
        text: item.text,
      },
    }));

    console.log('Pushing records to Upstash Vector...');
    await index.upsert(records);

    console.log('✅ Seed successful! Your portfolio AI now has its context.');
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

/**
 * Helper to clean Markdown and format text for the Embedding Model
 */
const getExperienceSeedData = ({
  type,
  experience,
}: {
  type: string;
  experience: Experience;
}) => {
  const cleanContent = experience.content.replace(/\* /g, '').trim();

  const contentForEmbedding = `
        Category: ${type}
        Title: ${experience.title}
        Place: ${experience.place}
        Period: ${experience.startDate} - ${experience.endDate}
        Description: ${cleanContent}
    `.trim();

  return {
    id: experience.id,
    text: contentForEmbedding,
    metadata: {
      type: type,
      institution: experience.place,
      logo: experience.logo.responsiveImage.src,
    },
  };
};

seed()
  .then(() => {
    console.log('Process completed successfully.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Fatal error during seeding:', err);
    process.exit(1);
  });
