import { datoCMS } from '@services/datoCMS';
import {
  getCombinedQuery,
  allTechnicalLedgersQuery,
  technicalLedgerPageQuery,
} from '@/lib/queries';
import {
  TechnicalLedger,
  TechnicalLedgerForPrompt,
  TechnicalLedgerPage,
} from '@/types';
import { embedAndSeedChunksToVectorDb } from '@/scripts/seed';
import {
  TechnicalLedgerPageSeedChunk,
  TechnicalLedgerPromptNoteSeedChunk,
} from '@/scripts/types';

async function seed() {
  console.log('🚀 Starting Technical Ledger seed process...');

  try {
    // 1. Fetch the data from DatoCMS
    const {
      allTechnicalLedgers,
      technicalLedgersPage,
    }: {
      allTechnicalLedgers: TechnicalLedgerForPrompt[];
      technicalLedgersPage: TechnicalLedgerPage;
    } = await datoCMS({
      query: getCombinedQuery([
        allTechnicalLedgersQuery,
        technicalLedgerPageQuery,
      ]),
      variables: { locale: 'en' },
    });

    if (!allTechnicalLedgers || allTechnicalLedgers.length === 0) {
      console.log('⚠️ No ledger notes found. Check your CMS query.');
      return;
    }

    // 2. Format the notes for embedding
    const seedChunks = allTechnicalLedgers.flatMap((note) =>
      getLedgersPromptNotesSeedData(note)
    );

    await embedAndSeedChunksToVectorDb(seedChunks);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

const getLedgersPageSeedData = (
  ledgersList: TechnicalLedgerForPrompt[],
  page: TechnicalLedgerPage
): TechnicalLedgerPageSeedChunk[] => {
  const categories = `[${new Set(ledgersList.map((ledger) => ledger.category))
    .values()
    .map((category) => category + ', ')}]`;

  const titles = ledgersList.map((ledger) => `- ${ledger.title}\n`);

  return ledgersList.map((ledger) => ({
    metadata: {
      id: page.id,
      type: 'technical-ledger-page',
    },
    text: `[Type]: Page\n
    [Page Title]: ${page.title}\n 
    [Page Description]: [${page.description}]\n
    [Categories]: ${categories}\n
    [Ledgers Count]: ${ledgersList.length}\n
    [Ledgers Titles]: [${titles}]`,
  }));
};

const getLedgersPromptNotesSeedData = (
  note: TechnicalLedgerForPrompt
): TechnicalLedgerPromptNoteSeedChunk[] => {
  return note.promptNotes.map((block) => ({
    metadata: {
      id: note.id + '-' + block.id,
      type: 'technical-ledger-note',
      title: note.title,
      noteTitle: block.contextTitle,
      fullLink: process.env.BASE_URL + '/en/technical-ledgers/' + note?.slugId,
    },
    text: `[ledgerTitle]: [${note.title}]\n
    [noteTitle]: [${block.contextTitle}]\n 
    [content]: [${block.contextContent}]`,
  }));
};

seed()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
