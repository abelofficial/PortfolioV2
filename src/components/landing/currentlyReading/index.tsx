'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { SRCImage } from 'react-datocms';
import { ResponsiveImageType } from '@/types';
import { cn } from '@/lib/utils';

export interface CurrentlyReadingBook {
  id: string;
  slugId: string;
  title: string;
  author: string;
  excerpt: string;
  category: string;
  bookImage: {
    responsiveImage: ResponsiveImageType;
  };
  chapters: {
    isPublished: boolean;
  }[];
}

export interface CurrentlyReadingSectionProps {
  locale: string;
  title: string;
  description: string;
  viewAllLabel: string;
  chaptersLabel: string;
  books: CurrentlyReadingBook[];
}

const CurrentlyReadingSection = ({
  locale,
  title,
  description,
  viewAllLabel,
  chaptersLabel,
  books,
}: CurrentlyReadingSectionProps) => {
  // Filter to only show in-progress books (some chapters published but not all)
  const inProgressBooks = books.filter((book) => {
    const publishedCount = book.chapters.filter((c) => c.isPublished).length;
    return publishedCount > 0 && publishedCount < book.chapters.length;
  });

  // If no in-progress books, show the most recent ones
  const displayBooks =
    inProgressBooks.length > 0
      ? inProgressBooks.slice(0, 3)
      : books.slice(0, 3);

  if (displayBooks.length === 0) {
    return null;
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between px-1">
        <div className="flex flex-col gap-1">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <BookOpen className="text-primary size-5" />
            {title}
          </h2>
          <p className="text-muted-foreground text-xs">{description}</p>
        </div>
        <Link
          href={`/${locale}/book-summaries`}
          className="text-primary hover:text-primary-light flex items-center gap-1 text-xs font-medium transition-colors"
        >
          {viewAllLabel}
          <ArrowUpRight className="size-3" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {displayBooks.map((book, index) => {
          const publishedCount = book.chapters.filter(
            (c) => c.isPublished
          ).length;
          const totalChapters = book.chapters.length;
          const progress = Math.round((publishedCount / totalChapters) * 100);

          return (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.1 }}
            >
              <Link
                href={`/${locale}/book-summaries/${book.slugId}`}
                className="block h-full"
              >
                <motion.article
                  whileHover={{ y: -2 }}
                  className={cn(
                    'group relative flex h-full gap-3 rounded-2xl border p-3',
                    'border-border bg-card transition-colors',
                    'hover:bg-accent/20',
                    'xl:hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]',
                    'dark:xl:hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]'
                  )}
                >
                  {/* Book cover */}
                  <div className="w-16 shrink-0 overflow-hidden rounded-lg shadow-md">
                    <SRCImage
                      data={book.bookImage.responsiveImage}
                      usePlaceholder
                      imgClassName="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-5">
                    <div>
                      <h3 className="group-hover:text-primary line-clamp-2 text-sm font-semibold transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-muted-foreground text-xs">
                        {book.author}
                      </p>
                      {/* Excerpt */}
                      <p className="text-muted-foreground line-clamp-4 text-xs leading-relaxed">
                        {book.excerpt}
                      </p>
                    </div>

                    {/* Progress */}
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-muted-foreground">
                          {publishedCount}/{totalChapters} {chaptersLabel}
                        </span>
                        <span className="text-primary font-medium">
                          {progress}%
                        </span>
                      </div>
                      <div className="bg-muted h-1 w-full overflow-hidden rounded-full">
                        <div
                          className="bg-primary h-full rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Arrow indicator */}
                  <ArrowUpRight className="text-muted-foreground/60 group-hover:text-primary absolute top-2 right-2 size-3 opacity-0 transition-all group-hover:opacity-100" />
                </motion.article>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default CurrentlyReadingSection;
