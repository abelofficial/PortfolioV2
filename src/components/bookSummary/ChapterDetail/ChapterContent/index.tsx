import { micromark } from 'micromark';
import { gfm, gfmHtml } from 'micromark-extension-gfm';

export interface ChapterContentProps {
  content: string;
}

const ChapterContent = ({ content }: ChapterContentProps) => {
  // Parse markdown to HTML using micromark with GFM extension
  const htmlContent = micromark(content, {
    extensions: [gfm()],
    htmlExtensions: [gfmHtml()],
  });

  return (
    <div className="flex min-h-[calc(100lvh-18rem)] flex-col gap-4 px-5 py-4">
      <article
        className="prose prose-sm dark:prose-invert [&_blockquote]:border-primary/50 [&_blockquote]:bg-primary/5 [&_a]:text-primary [&_th]:border-border [&_th]:bg-muted/50 [&_td]:border-border max-w-none [&_a]:hover:underline [&_blockquote]:my-3 [&_blockquote]:border-l-4 [&_blockquote]:pl-4 [&_blockquote]:italic [&_code]:rounded [&_code]:bg-black/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm dark:[&_code]:bg-white/10 [&_em]:italic [&_h1]:my-4 [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:my-3 [&_h2]:text-xl [&_h2]:font-bold [&_h3]:my-2 [&_h3]:text-lg [&_h3]:font-semibold [&_h4]:my-2 [&_h4]:text-base [&_h4]:font-semibold [&_hr]:my-4 [&_hr]:border-black/10 dark:[&_hr]:border-white/10 [&_li]:my-1 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:text-sm [&_p]:my-2 [&_p]:text-sm [&_p]:leading-relaxed [&_pre]:my-3 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-black/5 [&_pre]:p-4 dark:[&_pre]:bg-white/5 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_strong]:font-bold [&_table]:my-3 [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:px-3 [&_td]:py-2 [&_td]:text-sm [&_th]:border [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:text-sm [&_th]:font-semibold [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-sm"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
};

export default ChapterContent;
