'use client';

import { motion } from 'framer-motion';
import { Code2, Star, GitFork, ExternalLink } from 'lucide-react';
import { GithubRepository, LanguageColor } from '@/types';
import { cn } from '@/lib/utils';

export interface CurrentlyWorkingOnSectionProps {
  title: string;
  description: string;
  viewProjectLabel: string;
  starsLabel: string;
  forksLabel: string;
  updatedLabel: string;
  languageColors: LanguageColor[];
  repositories: GithubRepository[];
}

const DEFAULT_COLOR = '#6b7280'; // gray-500

const formatRelativeDate = (
  dateString: string,
  updatedLabel: string
): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return `${updatedLabel} today`;
  if (diffDays === 1) return `${updatedLabel} yesterday`;
  if (diffDays < 7) return `${updatedLabel} ${diffDays}d ago`;
  if (diffDays < 30) return `${updatedLabel} ${Math.floor(diffDays / 7)}w ago`;
  if (diffDays < 365)
    return `${updatedLabel} ${Math.floor(diffDays / 30)}mo ago`;
  return `${updatedLabel} ${Math.floor(diffDays / 365)}y ago`;
};

const CurrentlyWorkingOnSection = ({
  title,
  description,
  updatedLabel,
  languageColors,
  repositories,
}: CurrentlyWorkingOnSectionProps) => {
  if (repositories.length === 0) {
    return null;
  }

  const getLanguageColor = (language: string | null): string => {
    if (!language) return DEFAULT_COLOR;
    const found = languageColors.find(
      (lc) => lc.language.toLowerCase() === language.toLowerCase()
    );
    return found?.color?.hex || DEFAULT_COLOR;
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between px-1">
        <div className="flex flex-col gap-1">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <Code2 className="text-primary size-5" />
            {title}
          </h2>
          <p className="text-muted-foreground text-xs">{description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {repositories.map((repo, index) => (
          <motion.div
            key={repo.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: index * 0.1 }}
          >
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full"
            >
              <motion.article
                whileHover={{ y: -2 }}
                className={cn(
                  'group relative flex h-full flex-col gap-3 rounded-2xl border p-4',
                  'border-border bg-card transition-colors',
                  'hover:bg-accent/20',
                  'xl:hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]',
                  'dark:xl:hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]'
                )}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="group-hover:text-primary text-sm font-semibold transition-colors">
                      {repo.name}
                    </h3>
                  </div>
                  <ExternalLink className="text-muted-foreground/60 group-hover:text-primary transition-atransform size-4 shrink-0 opacity-0 group-hover:opacity-100" />
                </div>

                {/* Description */}
                {repo.description && (
                  <p className="text-muted-foreground line-clamp-2 flex-1 text-xs leading-relaxed">
                    {repo.description}
                  </p>
                )}

                {/* Topics */}
                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {repo.topics.slice(0, 4).map((topic) => (
                      <span
                        key={topic}
                        className="text-muted-foreground rounded-full border border-black/10 bg-black/3 px-2 py-0.5 text-[9px] font-medium dark:border-white/10 dark:bg-white/4"
                      >
                        {topic}
                      </span>
                    ))}
                    {repo.topics.length > 4 && (
                      <span className="text-muted-foreground text-[9px]">
                        +{repo.topics.length - 4}
                      </span>
                    )}
                  </div>
                )}

                {/* Footer */}
                <div className="mt-auto flex flex-wrap items-center gap-3 pt-1">
                  {/* Language */}
                  {repo.language && (
                    <span className="text-muted-foreground flex items-center gap-1 text-[10px]">
                      <span
                        className="size-2 rounded-full"
                        style={{
                          backgroundColor: getLanguageColor(repo.language),
                        }}
                      />
                      {repo.language}
                    </span>
                  )}

                  {/* Stars */}
                  {repo.stargazers_count > 0 && (
                    <span className="text-muted-foreground flex items-center gap-1 text-[10px]">
                      <Star className="size-3" />
                      {repo.stargazers_count}
                    </span>
                  )}

                  {/* Forks */}
                  {repo.forks_count > 0 && (
                    <span className="text-muted-foreground flex items-center gap-1 text-[10px]">
                      <GitFork className="size-3" />
                      {repo.forks_count}
                    </span>
                  )}

                  {/* Updated */}
                  <span className="text-muted-foreground ml-auto text-[10px]">
                    {formatRelativeDate(repo.pushed_at, updatedLabel)}
                  </span>
                </div>
              </motion.article>
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CurrentlyWorkingOnSection;
