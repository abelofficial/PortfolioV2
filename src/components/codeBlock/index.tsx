import { codeToHtml } from 'shiki';

interface CodeBlockProps {
  code: string;
  language: string;
}

const CodeBlock = async ({ code, language }: CodeBlockProps) => {
  const html = await codeToHtml(code, {
    lang: language,
    theme: 'github-dark',
  });

  return (
    <div className="relative my-8 w-full overflow-hidden rounded-xl border border-white/10 bg-[#0d1117] shadow-2xl">
      {/* IDE Window Header */}
      <div className="flex items-center justify-between border-b border-white/5 bg-white/5 px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="size-2.5 rounded-full bg-[#ff5f56]" />
            <div className="size-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="size-2.5 rounded-full bg-[#27c93f]" />
          </div>
        </div>
        <span className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase">
          {language}
        </span>
      </div>

      <div
        className="shiki-container overflow-x-auto bg-[#24292e] p-4 text-sm leading-relaxed"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

export default CodeBlock;
