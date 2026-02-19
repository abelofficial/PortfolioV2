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
      <AnimatePresence mode="sync" initial={false}>
        {technicalLedgersList.map((note, index) => (
          <motion.div
            key={note.id}
            layout="position"
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link
              href={`/${locale}/technical-ledgers/${note.slugId}`}
              aria-label={`Open ledger: ${note.title}`}
              className="block"
            >
              <motion.article
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                whileHover={{ y: -2 }}
                className={cn(
                  'group relative flex flex-col gap-3 rounded-2xl border p-6',
                  'border-border bg-card transition-colors',
                  'hover:bg-accent/20',
                  'xl:hover:shadow-[0_18px_50px_rgba(0,0,0,0.10)]',
                  'dark:xl:hover:shadow-[0_18px_50px_rgba(0,0,0,0.40)]'
                )}
              >
                {/* Meta row */}
                <div className="text-muted-foreground flex items-center justify-between gap-3 text-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="size-3" />
                      {note.date}
                    </span>

                    <span className="opacity-40">•</span>

                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3" />
                      {note.readMinutes} {page.minRead}
                    </span>
                  </div>

                  <Badge
                    variant="outline"
                    className="rounded-full px-3 py-1 text-[10px] font-semibold tracking-wider uppercase"
                  >
                    {note.category}
                  </Badge>
                </div>

                {/* Title row */}
                <div className="flex items-start justify-between gap-3">
                  <h2 className="group-hover:text-primary text-lg leading-snug font-bold transition-colors md:text-xl">
                    {note.title}
                  </h2>

                  <ArrowUpRight className="text-muted-foreground/60 group-hover:text-primary mt-1 size-4 shrink-0 opacity-0 transition-transform group-hover:opacity-100" />
                </div>

                {/* Excerpt */}
                <p className="text-muted-foreground line-clamp-6 text-sm leading-relaxed md:line-clamp-5">
                  {note.excerpt}
                </p>

                {/* Tags */}
                {note.tag?.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-2">
                    {note.tag.map((tag) => (
                      <span
                        key={tag.id}
                        className="text-muted-foreground rounded-full border border-black/10 bg-black/[0.03] px-2.5 py-1 text-[10px] font-medium dark:border-white/10 dark:bg-white/[0.04]"
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
  );
};

export default LedgersList;
