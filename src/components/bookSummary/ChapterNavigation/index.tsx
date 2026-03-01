'use client';

import { Chapter } from '@/types';
import { cn } from '@/lib/utils';
import { BookOpen, ChevronRight, Lock } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export interface ChapterNavigationProps {
  locale: string;
  bookSlugId: string;
  chapters: Chapter[];
}

const ChapterNavigation = ({
  locale,
  bookSlugId,
  chapters,
}: ChapterNavigationProps) => {
  // Sort all chapters by chapter number (show both published and unpublished)
  const sortedChapters = [...chapters].sort((a, b) => a.chapter - b.chapter);

  if (sortedChapters.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3 px-5 py-4">
      <div className="flex items-center gap-2">
        <BookOpen className="text-primary size-4" />
        <h3 className="text-sm font-semibold">Chapters</h3>
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {sortedChapters.map((chapter, index) => (
          <motion.div
            key={chapter.slugId}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            {chapter.isPublished ? (
              <Link
                href={`/${locale}/book-summaries/${bookSlugId}/chapter/${chapter.slugId}`}
                className={cn(
                  'group flex items-center justify-between gap-3 rounded-lg border p-3',
                  'border-green-500/30 bg-green-500/5 transition-all',
                  'hover:border-green-500/50 hover:bg-green-500/10'
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-sm font-bold text-green-600 dark:text-green-400">
                    {chapter.chapter}
                  </span>
                  <span className="line-clamp-1 text-sm font-medium text-green-700 transition-colors group-hover:text-green-600 dark:text-green-300 dark:group-hover:text-green-200">
                    {chapter.title}
                  </span>
                </div>
                <ChevronRight className="size-4 shrink-0 text-green-500 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ) : (
              <div
                className={cn(
                  'flex items-center justify-between gap-3 rounded-lg border p-3',
                  'border-border bg-muted/30 cursor-not-allowed opacity-60'
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="bg-muted text-muted-foreground flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                    {chapter.chapter}
                  </span>
                  <span className="text-muted-foreground line-clamp-1 text-sm font-medium">
                    {chapter.title}
                  </span>
                </div>
                <Lock className="text-muted-foreground size-4 shrink-0" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ChapterNavigation;
