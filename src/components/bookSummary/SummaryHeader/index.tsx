import { SectionContainer } from '@components/ui/custom-container';
import { Badge, ChevronLeft, TagIcon, User } from 'lucide-react';
import Link from 'next/link';
import { SRCImage } from 'react-datocms';
import { BookSummary, BookSummariesPage } from '@/types';

export interface SummaryHeaderProps {
  locale: string;
  bookSummary: BookSummary;
  page: BookSummariesPage;
}

const SummaryHeader = ({ locale, bookSummary, page }: SummaryHeaderProps) => {
  return (
    <SectionContainer
      disableShine
      disablePattern
      className="p0 w-full rounded-none border-t-0"
    >
      <Link
        href={`/${locale}/book-summaries`}
        className="group text-muted-foreground hover:text-primary mb-4 flex w-fit items-center gap-1 text-sm font-medium transition-colors"
      >
        <ChevronLeft className="size-4 transition-transform group-hover:-translate-x-1" />
        {page.backButtonLabel}
      </Link>

      <div className="flex flex-col gap-4 md:flex-row md:gap-6">
        {/* Book cover */}
        <div className="w-32 shrink-0 self-center overflow-hidden rounded-lg shadow-lg md:w-40 md:self-start">
          <SRCImage
            data={bookSummary.bookImage.responsiveImage}
            usePlaceholder
            imgClassName="rounded-lg object-cover"
          />
        </div>

        {/* Book info */}
        <div className="flex flex-1 flex-col gap-3">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            {bookSummary.title}
          </h1>

          <div className="flex items-center gap-2">
            <User className="text-muted-foreground size-4" />
            <span className="text-muted-foreground text-sm font-medium">
              {bookSummary.author}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Badge className="tracking-widest" size={15} />
            <span className="text-primary text-sm font-bold capitalize">
              {bookSummary.category}
            </span>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed">
            {bookSummary.excerpt}
          </p>

          {bookSummary.tags && bookSummary.tags.length > 0 && (
            <div className="flex items-center gap-2">
              <TagIcon className="text-muted-foreground size-4" />
              <div className="flex flex-wrap gap-2">
                {bookSummary.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="text-muted-foreground hover:text-primary cursor-default text-sm"
                  >
                    #{tag.tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </SectionContainer>
  );
};

export default SummaryHeader;
