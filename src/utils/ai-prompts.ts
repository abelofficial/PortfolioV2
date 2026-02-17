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
  ${c.category && `Category: ${c.category}\n`}
  ${c.slug && `Slug: ${c.slug}\n`}
  ${c.readMinutes && `Read Time: ${c.readMinutes}\n`}
  ${c.excerpt && `Excerpt: ${c.excerpt}\n`}
  ${c.published && `Published: ${c.published}\n`}
  ${c.fullLink && `Published: ${c.fullLink}\n`}
  ${c.text && `Text: ${c.text}\n\n`}
  `
  )}
`;
