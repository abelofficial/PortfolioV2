import { TechnicalLedgerForPrompt } from '@/types';

export interface SeedChunk {
  text: string;
  metadata: SeedChunkMetadata;
}

export interface SeedChunkMetadata {
  id: string;
  type: 'technical-ledger-page' | 'technical-ledger-note' | 'page' | 'profile';
}

export interface TechnicalLedgerPromptNoteSeedChunk extends SeedChunk {
  text: string;
  metadata: {
    id: string;
    type: 'technical-ledger-note';
    title: string;
    noteTitle: string;
    fullLink: string;
  };
}

export interface TechnicalLedgerPageSeedChunk extends SeedChunk {
  text: string;
  metadata: {
    id: string;
    type: 'technical-ledger-page';
  };
}
