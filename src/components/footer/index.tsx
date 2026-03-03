import { DotPattern } from '@components/ui/dot-pattern';
import { Separator } from '@components/ui/separator';
import { cn } from '@/lib/utils';
import { ContactInfo, FooterData } from '@/types';
import { datoCMS } from '@services/datoCMS';
import { getCombinedQuery, footerQuery, contactsQuery } from '@/lib/queries';
import { SRCImage } from 'react-datocms';

export interface FooterProps {
  locale: string;
}

const Footer = async ({ locale }: FooterProps) => {
  const {
    allContacts,
    homePage,
  }: { allContacts: ContactInfo[]; homePage: FooterData } = await datoCMS({
    query: getCombinedQuery([footerQuery, contactsQuery]),
    variables: { locale: locale },
  });

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background relative w-full">
      <DotPattern
        className={cn(
          'mask-[radial-gradient(300px_circle_at_top_right,white,transparent)]',
          'lg:mask-[radial-gradient(400px_circle_at_right,white,transparent)]'
        )}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="flex flex-col items-center gap-8">
          {/* Tagline & Built With */}
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-muted-foreground text-sm">
              {homePage.footerTagline}
            </p>
            <p className="text-muted-foreground/60 text-xs">
              {homePage.footerBuiltWithLabel}
            </p>
          </div>
          <Separator className="w-full max-w-md bg-black/10 dark:bg-white/10" />

          {/* Connect Section */}
          <div className="flex flex-col items-center gap-4">
            <p className="text-muted-foreground/70 text-xs font-medium tracking-[0.25em] uppercase">
              {homePage.footerConnectLabel}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {allContacts.map((contact) => (
                <a
                  key={contact.id}
                  target="_blank"
                  rel="noreferrer"
                  href={contact.address}
                  className="group text-muted-foreground hover:text-primary inline-flex items-center gap-2 rounded-full border border-black/10 bg-transparent px-3 py-1.5 text-sm transition-all hover:border-black/20 dark:border-white/10 dark:hover:border-white/20"
                >
                  <SRCImage
                    usePlaceholder
                    data={contact.icon.responsiveImage}
                    imgClassName="opacity-70 transition group-hover:opacity-100"
                  />
                  <span>{contact.title}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <p className="text-muted-foreground/50 text-xs">
            © {currentYear} {homePage.name}. {homePage.footer}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
