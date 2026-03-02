'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { TechnicalLedger, TechnicalLedgerPage } from '@/types';
import { cn } from '@/lib/utils';

export interface LedgersListProps {
  locale: string;
  technicalLedgersList: TechnicalLedger[];
  page: TechnicalLedgerPage;
}

const LedgersList = ({
  locale,
  technicalLedgersList,
  page,
}: LedgersListProps) => {
  return (
    <div className="flex min-h-[calc(100lvh-18rem)] flex-col gap-4 px-4 pb-10">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <AnimatePresence mode="sync" initial={false}>
          {technicalLedgersList.map((note, index) => (
            <motion.div
              key={note.id}
              initial={false}
              layout="position"
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link
                href={`/${locale}/technical-ledgers/${note.slugId}`}
                aria-label={`Open ledger: ${note.title}`}
                className="block h-full"
              >
                <motion.article
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  whileHover={{ y: -2 }}
                  className={cn(
                    'group relative flex h-full flex-col gap-2 rounded-2xl border p-4',
                    'border-border bg-card transition-colors',
                    'hover:bg-accent/20',
                    'xl:hover:shadow-[0_18px_50px_rgba(0,0,0,0.10)]',
                    'dark:xl:hover:shadow-[0_18px_50px_rgba(0,0,0,0.40)]'
                  )}
                >
                  {/* Arrow icon - top right */}
                  <div className="absolute top-3 right-3">
                    <ArrowUpRight className="text-muted-foreground/60 group-hover:text-primary size-4 shrink-0 opacity-0 transition-transform group-hover:opacity-100" />
                  </div>

                  {/* Content */}
                  <div className="flex min-w-0 flex-col gap-2">
                    {/* Title */}
                    <h2 className="group-hover:text-primary line-clamp-2 pr-8 text-base leading-snug font-bold transition-colors md:text-sm">
                      {note.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-muted-foreground line-clamp-5 text-justify text-xs leading-relaxed">
                      {note.excerpt}
                    </p>
                  </div>

                  {/* Meta row: Category, Read Time, Date */}
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                    <Badge
                      variant="outline"
                      className="text-primary-light border-primary-light rounded-full bg-transparent px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase"
                    >
                      {note.category}
                    </Badge>
                    <div className="text-muted-foreground flex items-center gap-1 text-[10px]">
                      <Clock className="h-3 w-3" />
                      <span className="font-medium">
                        {note.readMinutes} {page.minRead}
                      </span>
                    </div>
                    <span className="text-muted-foreground inline-flex items-center gap-1 text-[10px] font-medium">
                      <Calendar className="size-3" />
                      {note.date}
                    </span>
                  </div>

                  {/* Tags */}
                  {note.tag?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {note.tag.map((tag) => (
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

export default LedgersList;
