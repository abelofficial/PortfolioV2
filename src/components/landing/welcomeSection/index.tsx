import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionContainer } from '@components/ui/custom-container';
import { CardContent } from '@components/ui/card';

export interface WelcomeSectionProps {
  title: string;
  subtitle: string;
  aboutLinkLabel?: string;
  aboutLinkUrl?: string;
  stats?: {
    publicRepos: number;
    technicalNotes: number;
    bookSummaries: number;
    publicReposLabel: string;
    technicalNotesLabel: string;
    bookSummariesLabel: string;
  };
}

const WelcomeSection = ({
  title,
  subtitle,
  aboutLinkLabel,
  aboutLinkUrl,
  stats,
}: WelcomeSectionProps) => {
  return (
    <SectionContainer disablePattern>
      <CardContent className="flex flex-col items-center gap-6 py-8 text-center md:py-12">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-bold md:text-4xl">{title}</h1>
          <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed md:text-base">
            {subtitle}
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          {aboutLinkLabel && aboutLinkUrl && (
            <Link
              href={aboutLinkUrl}
              className="bg-primary text-primary-foreground hover:bg-primary/90 group inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            >
              {aboutLinkLabel}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          )}

          {stats && (
            <div className="flex items-center justify-center gap-6">
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-lg font-semibold">
                  {stats.publicRepos}
                </span>
                <span className="text-muted-foreground text-xs">
                  {stats.publicReposLabel}
                </span>
              </div>
              <div className="bg-border h-8 w-px" />
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-lg font-semibold">
                  {stats.technicalNotes}
                </span>
                <span className="text-muted-foreground text-xs">
                  {stats.technicalNotesLabel}
                </span>
              </div>
              <div className="bg-border h-8 w-px" />
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-lg font-semibold">
                  {stats.bookSummaries}
                </span>
                <span className="text-muted-foreground text-xs">
                  {stats.bookSummariesLabel}
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </SectionContainer>
  );
};

export default WelcomeSection;
