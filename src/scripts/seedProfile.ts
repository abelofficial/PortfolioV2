import {
  EducationExperienceList,
  Experience,
  WorkExperienceList,
} from '@/types';
import { datoCMS } from '@services/datoCMS';
import {
  educationExperienceQuery,
  getCombinedQuery,
  workExperienceQuery,
} from '@/lib/queries';
import { embedAndSeedChunksToVectorDb } from '@/scripts/seed';
import { ProfileSeedChunk } from '@/scripts/types';

const BASE_URL = process.env.BASE_URL || 'https://abelsintaro.com';

async function seed() {
  console.log('🚀 Starting Profile seed process...');

  try {
    const [educationExperiences, workExperiences] = await Promise.all([
      datoCMS({
        query: getCombinedQuery([educationExperienceQuery]),
        variables: { locale: 'en' },
      }) as Promise<EducationExperienceList>,
      datoCMS({
        query: getCombinedQuery([workExperienceQuery]),
        variables: { locale: 'en' },
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

    await embedAndSeedChunksToVectorDb(allSeedData);
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
}): ProfileSeedChunk => {
  const cleanContent = experience.content.replace(/\* /g, '').trim();

  const text = `[Type]: Profile - ${type}
[Title]: ${experience.title}
[Place]: ${experience.place}
[Period]: ${experience.startDate} - ${experience.endDate}
[Description]: ${cleanContent}`;

  return {
    text,
    metadata: {
      id: `profile-${type.toLowerCase()}-${experience.id}`,
      type: 'profile',
      title: experience.title,
      institution: experience.place,
      experienceType: type,
      fullLink: `${BASE_URL}/en`,
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
