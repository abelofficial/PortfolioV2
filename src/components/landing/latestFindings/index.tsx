'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Lightbulb, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@components/ui/badge';
import { cn } from '@/lib/utils';

export interface LatestLedger {
  id: string;
  slugId: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readMinutes: number;
}

export interface LatestFindingsSectionProps {
  locale: string;
  title: string;
  description: string;
  viewAllLabel: string;
  minReadLabel: string;
  ledgers: LatestLedger[];
}

const LatestFindingsSection = ({
  locale,
  title,
  description,
  viewAllLabel,
  minReadLabel,
  ledgers,
}: LatestFindingsSectionProps) => {
  if (ledgers.length === 0) {
    return null;
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between px-1">
        <div className="flex flex-col gap-1">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <Lightbulb className="text-primary size-5" />
            {title}
          </h2>
          <p className="text-muted-foreground text-xs">{description}</p>
        </div>
        <Link
          href={`/${locale}/technical-ledgers`}
          className="text-primary hover:text-primary-light flex items-center gap-1 text-xs font-medium transition-colors"
        >
          {viewAllLabel}
          <ArrowUpRight className="size-3" />
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {ledgers.map((ledger, index) => (
          <motion.div
            key={ledger.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: index * 0.1 }}
          >
            <Link
              href={`/${locale}/technical-ledgers/${ledger.slugId}`}
              className="block"
            >
              <motion.article
                whileHover={{ y: -2 }}
                className={cn(
                  'group relative flex flex-col gap-2 rounded-2xl border p-4',
                  'border-border bg-card transition-colors',
                  'hover:bg-accent/20',
                  'xl:hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]',
                  'dark:xl:hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]'
                )}
              >
                {/* Arrow indicator */}
                <ArrowUpRight className="text-muted-foreground/60 group-hover:text-primary absolute top-3 right-3 size-4 opacity-0 transition-all group-hover:opacity-100" />

                {/* Title */}
                <h3 className="group-hover:text-primary pr-6 text-sm font-semibold transition-colors">
                  {ledger.title}
                </h3>

                {/* Excerpt */}
                <p className="text-muted-foreground line-clamp-2 text-xs leading-relaxed">
                  {ledger.excerpt}
                </p>

                {/* Meta row */}
                <div className="mt-1 flex flex-wrap items-center gap-3">
                  <Badge
                    variant="outline"
                    className="text-primary-light border-primary-light rounded-full bg-transparent px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase"
                  >
                    {ledger.category}
                  </Badge>
                  <span className="text-muted-foreground inline-flex items-center gap-1 text-[10px]">
                    <Clock className="size-3" />
                    {ledger.readMinutes} {minReadLabel}
                  </span>
                  <span className="text-muted-foreground inline-flex items-center gap-1 text-[10px]">
                    <Calendar className="size-3" />
                    {ledger.date}
                  </span>
                </div>
              </motion.article>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LatestFindingsSection;
