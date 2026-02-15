import { Prompt } from '@/types';

export const getAssistantPrompt = (context: string, prompt: Prompt) => `
  ${prompt.coreRules}

  ${prompt.safetyLimitations}
  
  ${prompt.toneAndStyle}
  
  ${prompt.formattingAndStructure}

  CONTEXT:
  ${context}
`;
