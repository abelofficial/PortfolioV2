'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { SRCImage } from 'react-datocms';
import { BookSummary } from '@/types';
import { cn } from '@/lib/utils';

export interface SummariesListProps {
  locale: string;
  bookSummariesList: BookSummary[];
}

const SummariesList = ({ locale, bookSummariesList }: SummariesListProps) => {
  return (
    <div className="flex min-h-[calc(100lvh-18rem)] flex-col gap-4 px-4 pb-10">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <AnimatePresence mode="sync" initial={false}>
          {bookSummariesList.map((summary, index) => (
            <motion.div
              key={summary.id}
              initial={false}
              layout="position"
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link
                href={`/${locale}/book-summaries/${summary.slugId}`}
                aria-label={`Open summary: ${summary.title}`}
                className="block h-full"
              >
                <motion.article
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  whileHover={{ y: -2 }}
                  className={cn(
                    'group relative flex h-full flex-col gap-4 rounded-2xl border p-4',
                    'border-border bg-card transition-colors',
                    'hover:bg-accent/20',
                    'xl:hover:shadow-[0_18px_50px_rgba(0,0,0,0.10)]',
                    'dark:xl:hover:shadow-[0_18px_50px_rgba(0,0,0,0.40)]'
                  )}
                >
                  {/* Book cover and content row */}
                  <div className="flex gap-4">
                    {/* Book cover image */}
                    <div className="w-24 shrink-0 overflow-hidden rounded-lg shadow-md md:w-28">
                      <SRCImage
                        data={summary.bookImage.responsiveImage}
                        usePlaceholder
                        imgClassName="rounded-lg object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      {/* Category badge */}
                      <div className="flex items-center justify-between gap-2">
                        <Badge
                          variant="outline"
                          className="bg-primary-light text-muted rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wider uppercase"
                        >
                          {summary.category}
                        </Badge>
                        <ArrowUpRight className="text-muted-foreground/60 group-hover:text-primary size-4 shrink-0 opacity-0 transition-transform group-hover:opacity-100" />
                      </div>

                      {/* Title */}
                      <h2 className="group-hover:text-primary line-clamp-2 text-base leading-snug font-bold transition-colors md:text-sm">
                        {summary.title}
                      </h2>

                      {/* Author */}
                      <p className="text-muted-foreground text-xs font-medium">
                        {summary.author}
                      </p>

                      {/* Excerpt */}
                      <p className="text-muted-foreground line-clamp-5 text-xs leading-relaxed">
                        {summary.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Tags */}
                  {summary.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {summary.tags.map((tag) => (
                        <span
                          key={tag.id}
                          className="text-muted-foreground rounded-full border border-black/10 bg-black/3 px-2.5 py-1 text-[10px] font-medium dark:border-white/10 dark:bg-white/4"
                        >
                          #{tag.tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.article>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SummariesList;
