import { Prompt, PromptContext } from '@/types';

export const getAssistantPrompt = (
  context: PromptContext[],
  prompt: Prompt
) => `
  ${prompt.coreRule}

  ${prompt.safetyLimitations}
  
  ${prompt.toneAndStyle}
  
  ${prompt.formattingAndStructure}
  
  ${prompt.contextualKnowledge}

  CONTEXT: (Top Matching Results)
  ${context.map(
    (c, i) => `
    Results ${i + 1} \n
  ${c.title && `Title: ${c.title}\n`}
  ${c.readMinutes && `Read Time: ${c.readMinutes}\n`}
  ${c.published && `Published: ${c.published}\n`}
  ${c.fullLink && `FullLink: ${c.fullLink}\n`}
  ${c.text && `Text: ${c.text}\n\n`}
  `
  )}
`;
