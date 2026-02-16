'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import { TechnicalLedger } from '@/types';

export interface LedgersListProps {
  locale: string;
  technicalLedgersList: TechnicalLedger[];
}
const LedgersList = ({ locale, technicalLedgersList }: LedgersListProps) => {
  return (
    <div className="flex min-h-[calc(100lvh-18rem)] flex-col gap-4 px-4">
      <AnimatePresence mode="popLayout">
        {technicalLedgersList.map((note, index) => (
          <Link href={`/${locale}/technical-ledgers/${note.id}`} key={note.id}>
            <motion.article
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group border-border bg-card hover:bg-accent/20 relative flex max-h-fit flex-col gap-3 rounded-2xl border p-6 transition-colors"
            >
              <div className="text-muted-foreground flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3" /> {note.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3" /> {'8 min read'}
                  </span>
                </div>
                <Badge
                  variant="outline"
                  className="text-[10px] tracking-wider uppercase"
                >
                  {note.category}
                </Badge>
              </div>

              <h2 className="group-hover:text-primary cursor-pointer text-xl font-bold transition-colors">
                {note.title}
              </h2>

              <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                {note.excerpt}
              </p>

              <div className="mt-2 flex gap-2">
                {note.tag?.length &&
                  note.tag.map((tag) => (
                    <span
                      key={tag.id}
                      className="bg-secondary text-secondary-foreground rounded px-2 py-0.5 font-mono text-[10px]"
                    >
                      #{tag.tag}
                    </span>
                  ))}
              </div>
            </motion.article>
          </Link>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default LedgersList;
