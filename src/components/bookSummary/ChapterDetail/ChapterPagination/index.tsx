'use client';

import { Chapter } from '@/types';
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
}

const ChapterPagination = ({
  locale,
  bookSlugId,
  prevChapter,
  nextChapter,
  currentChapter,
  totalChapters,
}: ChapterPaginationProps) => {
  // For the first chapter, link back to the book intro page
  const showIntroLink = !prevChapter;

  return (
    <div className="flex items-center justify-between gap-3 px-5 py-4">
      {/* Previous chapter or Intro link */}
      {showIntroLink ? (
        <Link
          href={`/${locale}/book-summaries/${bookSlugId}`}
          className={cn(
            'group flex items-center gap-2 rounded-full border px-4 py-2',
            'border-border bg-card transition-all',
            'hover:border-primary/50 hover:bg-accent/50'
          )}
        >
          <BookOpen className="text-primary size-4 shrink-0" />
          <span className="text-foreground hidden text-sm font-medium md:inline">
            Introduction
          </span>
        </Link>
      ) : (
        <Link
          href={`/${locale}/book-summaries/${bookSlugId}/chapter/${prevChapter.slugId}`}
          className={cn(
            'group flex items-center gap-2 rounded-full border px-4 py-2',
            'border-border bg-card transition-all',
            'hover:border-primary/50 hover:bg-accent/50'
          )}
        >
          <ChevronLeft className="text-muted-foreground group-hover:text-primary size-4 shrink-0 transition-transform group-hover:-translate-x-0.5" />
          <span className="group-hover:text-primary hidden text-sm font-medium transition-colors md:inline">
            {prevChapter.title}
          </span>
        </Link>
      )}

      {/* Intro page link in center */}
      <Link
        href={`/${locale}/book-summaries/${bookSlugId}`}
        className={cn(
          'group flex items-center gap-2 rounded-full px-3 py-1.5',
          'text-muted-foreground transition-all',
          'hover:bg-accent/50 hover:text-foreground'
        )}
      >
        <BookOpen className="size-3.5" />
        <span className="text-xs font-medium">
          {currentChapter} / {totalChapters}
        </span>
      </Link>

      {/* Next chapter */}
      {nextChapter ? (
        nextChapter.isPublished ? (
          <Link
            href={`/${locale}/book-summaries/${bookSlugId}/chapter/${nextChapter.slugId}`}
            className={cn(
              'group flex items-center gap-2 rounded-full border px-4 py-2',
              'border-primary/50 bg-card transition-all',
              'hover:border-primary hover:bg-primary/5'
            )}
          >
            <span className="text-primary line-clamp-1 max-w-32 text-sm font-medium md:max-w-none">
              {nextChapter.title}
            </span>
            <ChevronRight className="text-primary size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
          </Link>
        ) : (
          <div
            className={cn(
              'flex items-center gap-2 rounded-full border px-4 py-2',
              'border-border bg-muted/30 cursor-not-allowed opacity-60'
            )}
          >
            <span className="text-muted-foreground line-clamp-1 max-w-32 text-sm font-medium md:max-w-none">
              {nextChapter.title}
            </span>
            <Lock className="text-muted-foreground size-4 shrink-0" />
          </div>
        )
      ) : (
        <Link
          href={`/${locale}/book-summaries/${bookSlugId}`}
          className={cn(
            'group flex items-center gap-2 rounded-full border px-4 py-2',
            'border-primary/50 bg-card transition-all',
            'hover:border-primary hover:bg-primary/5'
          )}
        >
          <span className="text-primary text-sm font-medium">Finish</span>
          <BookOpen className="text-primary size-4 shrink-0" />
        </Link>
      )}
    </div>
  );
};

export default ChapterPagination;
