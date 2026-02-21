import { Prompt, PromptContext } from '@/types';

export const getSystemPrompt = (prompt: Prompt) =>
  `
${prompt.coreRule}

${prompt.safetyLimitations}

${prompt.toneAndStyle}

${prompt.formattingAndStructure}

${prompt.contextualKnowledge}
`.trim();

function normalizeWhitespace(s: string) {
  return s
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function extractSection(text: string) {
  // tries to pull [X] : [SectionName]
  const m = text.match(/:\s*\[([^\]]+)\]/);
  return m?.[1]?.trim();
}

export function formatContextCompact(context: PromptContext[]) {
  if (!context?.length) return 'CONTEXT: (none)';

  // group by fullLink (best) else title
  const groups = new Map<string, PromptContext[]>();
  for (const c of context) {
    const key = c.fullLink ?? c.title ?? 'unknown';
    groups.set(key, [...(groups.get(key) ?? []), c]);
  }

  const blocks: string[] = [];
  let idx = 1;

  for (const [key, items] of groups) {
    const first = items[0];

    // collect unique sections
    const sections = items
      .map((it) => {
        if (!it.text) return null;
        const section = extractSection(it.text) ?? 'Notes';
        const cleaned = normalizeWhitespace(
          it.text
            .replace(/\[\s*published\s*\]\s*:\s*\[[^\]]+\]\s*/gi, '')
            .replace(/\[\s*category\s*\]\s*:\s*\[[^\]]+\]\s*/gi, '')
            .replace(/\[\s*readMinutes\s*\]\s*:\s*\[[^\]]+\]\s*/gi, '')
        );
        const body = cleaned.split('\n').slice(1).join('\n').trim() || cleaned;
        return `* [${section}]:\n ${body}`;
      })
      .filter(Boolean);

    blocks.push(
      normalizeWhitespace(`
        Ledger ${idx++}
        Title: ${first.title ?? 'Unknown'}
        Published: ${first.published ?? 'Unknown'}
        ${first.category ? `Category: ${first.category}\n` : ''}${first.fullLink ? `FullLink: ${first.fullLink}\n` : ''}
        Notes:
        ${sections.join('\n')}
        `)
    );
  }

  return `CONTEXT (Top Matching Ledgers):\n\n${blocks.join('\n\n---\n\n')}`;
}
