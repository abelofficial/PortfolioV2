'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionContainer } from '@components/ui/custom-container';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

// 1. Mock Data with Categories
const NOTES_DATA = [
  {
    id: 1,
    title: 'System Architecture: Scalable RAG Pipelines',
    excerpt:
      'Exploring the nuances of vector database selection and embedding optimization for AI agents...',
    date: '2026-02-10',
    readTime: '8 min',
    category: 'Architecture',
    tags: ['AI', 'VectorDB', 'Node.js'],
  },
  {
    id: 2,
    title: 'Next.js 16 Proxy Patterns',
    excerpt:
      'Deep dive into the new Proxy implementation and how it handles localized middleware conflicts...',
    date: '2026-01-24',
    readTime: '5 min',
    category: 'Frontend',
    tags: ['Next.js', 'Vercel', 'Auth'],
  },
  {
    id: 3,
    title: 'PostgreSQL Indexing Strategies',
    excerpt:
      'How to reduce query latency by 40% using partial indexes and GIN specialized for JSONB...',
    date: '2025-12-15',
    readTime: '12 min',
    category: 'Database',
    tags: ['SQL', 'Performance', 'Backend'],
  },
  {
    id: 4,
    title: 'System Architecture: Scalable RAG Pipelines',
    excerpt:
      'Exploring the nuances of vector database selection and embedding optimization for AI agents...',
    date: '2026-02-10',
    readTime: '8 min',
    category: 'Architecture',
    tags: ['AI', 'VectorDB', 'Node.js'],
  },
  {
    id: 5,
    title: 'Next.js 16 Proxy Patterns',
    excerpt:
      'Deep dive into the new Proxy implementation and how it handles localized middleware conflicts...',
    date: '2026-01-24',
    readTime: '5 min',
    category: 'Frontend',
    tags: ['Next.js', 'Vercel', 'Auth'],
  },
  {
    id: 6,
    title: 'PostgreSQL Indexing Strategies',
    excerpt:
      'How to reduce query latency by 40% using partial indexes and GIN specialized for JSONB...',
    date: '2025-12-15',
    readTime: '12 min',
    category: 'Database',
    tags: ['SQL', 'Performance', 'Backend'],
  },
];

const CATEGORIES = ['All', 'Architecture', 'Frontend', 'Database', 'AI'];

const TechnicalLedger = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredNotes =
    activeCategory === 'All'
      ? NOTES_DATA
      : NOTES_DATA.filter((n) => n.category === activeCategory);

  return (
    <div className="flex flex-col gap-6 xl:pt-4">
      <SectionContainer
        disableShine
        disablePattern
        className="w-full rounded-none border-t-0 py-8 shadow-none"
      >
        <h1 className="text-3xl font-bold tracking-tight">Technical Ledger</h1>
        <p className="text-muted-foreground mt-2">
          Documenting the process, architectural decisions, and field notes.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200',
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground border-primary shadow-md'
                  : 'bg-secondary/50 text-muted-foreground hover:border-border border-transparent'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </SectionContainer>

      <div className="flex min-h-[calc(100lvh-18rem)] flex-col gap-4 px-4">
        <AnimatePresence mode="popLayout">
          {filteredNotes.map((note, index) => (
            <motion.article
              key={note.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group border-border bg-card hover:bg-accent/50 relative flex max-h-fit flex-col gap-3 rounded-2xl border p-6 transition-colors"
            >
              <div className="text-muted-foreground flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3" /> {note.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3" /> {note.readTime}
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
                {note.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-secondary text-secondary-foreground rounded px-2 py-0.5 font-mono text-[10px]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TechnicalLedger;
