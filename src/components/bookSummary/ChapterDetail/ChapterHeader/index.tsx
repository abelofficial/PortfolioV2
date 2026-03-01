import { SectionContainer } from '@components/ui/custom-container';
import { Badge, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { BookSummary, BookSummariesPage, Chapter } from '@/types';

export interface ChapterHeaderProps {
  locale: string;
  bookSummary: BookSummary;
  chapter: Chapter;
  prevChapter: Chapter | null;
  page: BookSummariesPage;
}

const ChapterHeader = ({
  locale,
  bookSummary,
  chapter,
  prevChapter,
  page,
}: ChapterHeaderProps) => {
  // Determine back link - previous chapter or intro page
  const backLink = prevChapter
    ? `/${locale}/book-summaries/${bookSummary.slugId}/chapter/${prevChapter.slugId}`
    : `/${locale}/book-summaries/${bookSummary.slugId}`;

  const backLabel = prevChapter ? prevChapter.title : page.backButtonLabel;

  return (
    <SectionContainer
      disableShine
      disablePattern
      className="p0 w-full rounded-none border-t-0"
    >
      <Link
        href={backLink}
        className="group text-muted-foreground hover:text-primary mb-4 flex w-fit items-center gap-1 text-sm font-medium transition-colors"
      >
        <ChevronLeft className="size-4 transition-transform group-hover:-translate-x-1" />
        {backLabel}
      </Link>

      <div className="flex flex-col gap-3">
        {/* Book title */}
        <p className="text-muted-foreground text-sm font-medium">
          {bookSummary.title}
        </p>

        {/* Chapter number badge */}
        <div className="flex items-center gap-2">
          <Badge className="tracking-widest" size={15} />
          <span className="text-primary text-sm font-bold">
            Chapter {chapter.chapter}
          </span>
        </div>

        {/* Chapter title */}
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          {chapter.title}
        </h1>
      </div>
    </SectionContainer>
  );
};

export default ChapterHeader;
