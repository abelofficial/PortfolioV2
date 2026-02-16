import { SectionContainer } from '@components/ui/custom-container';
import { Badge, Calendar, ChevronLeft, TagIcon } from 'lucide-react';
import Link from 'next/link';
import { TechnicalLedger, TechnicalLedgerPage } from '@/types';

export interface LedgerHeaderProps {
  locale: string;
  technicalLedger: TechnicalLedger;
  page: TechnicalLedgerPage;
}
const LedgerHeader = ({ locale, technicalLedger, page }: LedgerHeaderProps) => {
  return (
    <SectionContainer
      disableShine
      disablePattern
      className="p0 w-full rounded-none border-t-0"
    >
      <Link
        href={`/${locale}/technical-ledgers`} // Navigates back to your listing page
        className="group text-muted-foreground hover:text-primary mb-4 flex w-fit items-center gap-1 text-sm font-medium transition-colors"
      >
        <ChevronLeft className="size-4 transition-transform group-hover:-translate-x-1" />
        {page.backButtonLabel}
      </Link>

      <h1 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl">
        {technicalLedger.title}
      </h1>

      <div className="flex items-center gap-1">
        <Badge className="tracking-widest" size={15} />
        <span className="text-primary text-sm font-bold capitalize">
          {technicalLedger.category}
        </span>
      </div>

      <div className="text-muted-foreground flex flex-wrap items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <Calendar className="size-4" />
          {new Date(technicalLedger.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>

        {technicalLedger.tag && technicalLedger.tag.length > 0 && (
          <div className="flex items-center gap-2">
            <TagIcon className="size-4" />
            <div className="flex gap-2">
              {technicalLedger.tag.map((tag) => (
                <span
                  key={tag.id}
                  className="hover:text-primary cursor-default"
                >
                  #{tag.tag || 'tech'}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </SectionContainer>
  );
};

export default LedgerHeader;
