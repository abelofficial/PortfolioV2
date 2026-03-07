'use client';

import { BookSummariesPage, Chapter } from '@/types';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, BookOpen, Lock } from 'lucide-react';
import Link from 'next/link';

export interface ChapterPaginationProps {
  locale: string;
  bookSlugId: string;
  prevChapter: Chapter | null;
  nextChapter: Chapter | null;
  currentChapter: number;
  totalChapters: number;
  page: BookSummariesPage;
}

const ChapterPagination = ({
  locale,
  bookSlugId,
  prevChapter,
  nextChapter,
  currentChapter,
  totalChapters,
  page,
}: ChapterPaginationProps) => {
  // For the first chapter, link back to the book intro page
  const showIntroLink = !prevChapter;

  return (
    <div className="flex flex-col gap-1 px-5 py-3">
      {/* Buttons row */}
      <div className="flex items-center justify-between gap-2">
        {/* Previous chapter or Intro link */}
        {showIntroLink ? (
          <Link
            href={`/${locale}/book-summaries/${bookSlugId}`}
            className={cn(
              'group flex items-center gap-1.5 rounded-full border px-3 py-1.5',
              'border-primary dark:border-primary-light bg-transparent transition-transform',
              'hover:bg-primary/10 dark:hover:bg-primary-light/10'
            )}
          >
            <ChevronLeft className="text-primary dark:text-primary-light size-3.5 shrink-0 transition-transform group-hover:-translate-x-0.5" />
            <span className="text-primary dark:text-primary-light text-xs font-medium">
              {page.intro}
            </span>
          </Link>
        ) : (
          <Link
            href={`/${locale}/book-summaries/${bookSlugId}/chapter/${prevChapter.slugId}`}
            className={cn(
              'group flex items-center gap-1.5 rounded-full border px-3 py-1.5',
              'border-primary dark:border-primary-light bg-transparent transition-transform',
              'hover:bg-primary/10 dark:hover:bg-primary-light/10'
            )}
          >
            <ChevronLeft className="text-primary dark:text-primary-light size-3.5 shrink-0 transition-transform group-hover:-translate-x-0.5" />
            <span className="text-primary dark:text-primary-light text-xs font-medium">
              {page.previous}
            </span>
          </Link>
        )}

        {/* Intro page link in center */}
        <Link
          href={`/${locale}/book-summaries/${bookSlugId}`}
          className={cn(
            'group flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1',
            'text-muted-foreground transition-transform',
            'hover:bg-accent/50 hover:text-foreground'
          )}
        >
          <BookOpen className="size-3" />
          <span className="text-[10px] font-medium">
            {currentChapter} {page.of} {totalChapters}
          </span>
        </Link>

        {/* Next chapter */}
        {nextChapter ? (
          nextChapter.isPublished ? (
            <Link
              href={`/${locale}/book-summaries/${bookSlugId}/chapter/${nextChapter.slugId}`}
              className={cn(
                'group flex items-center gap-1.5 rounded-full border px-3 py-1.5',
                'border-primary dark:border-primary-light bg-transparent transition-transform',
                'hover:bg-primary/10 dark:hover:bg-primary-light/10'
              )}
            >
              <span className="text-primary dark:text-primary-light text-xs font-medium">
                {page.next}
              </span>
              <ChevronRight className="text-primary dark:text-primary-light size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </Link>
          ) : (
            <div
              className={cn(
                'flex items-center gap-1.5 rounded-full border px-3 py-1.5',
                'border-border cursor-not-allowed bg-transparent opacity-60'
              )}
            >
              <span className="text-muted-foreground text-xs font-medium">
                {page.next}
              </span>
              <Lock className="text-muted-foreground size-3.5 shrink-0" />
            </div>
          )
        ) : (
          <Link
            href={`/${locale}/book-summaries/${bookSlugId}`}
            className={cn(
              'group flex items-center gap-1.5 rounded-full border px-3 py-1.5',
              'border-primary dark:border-primary-light bg-transparent transition-transform',
              'hover:bg-primary/10 dark:hover:bg-primary-light/10'
            )}
          >
            <span className="text-primary dark:text-primary-light text-xs font-medium">
              {page.intro}
            </span>
            <ChevronRight className="text-primary dark:text-primary-light size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>

      {/* Chapter titles row */}
      <div className="flex items-start justify-between">
        {/* Previous chapter title */}
        <span className="text-muted-foreground max-w-[40%] truncate text-[10px]">
          {prevChapter ? prevChapter.title : ''}
        </span>

        {/* Next chapter title */}
        <span className="text-muted-foreground max-w-[40%] truncate text-right text-[10px]">
          {nextChapter ? nextChapter.title : ''}
        </span>
      </div>
    </div>
  );
};

export default ChapterPagination;
