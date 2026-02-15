import { DotPattern } from '@components/ui/dot-pattern';
import { cn } from '@/lib/utils';
import { HomePage } from '@/types';

interface FooterProps {
  homePage: HomePage;
}

const Footer = ({ homePage }: FooterProps) => {
  return (
    <div className="bg-background relative w-full gap-2 py-15 text-center">
      <DotPattern
        className={cn(
          'mask-[radial-gradient(300px_circle_at_top_right,white,transparent)]',
          'lg:mask-[radial-gradient(400px_circle_at_right,white,transparent)]'
        )}
      />
      <p className="text-shadow-muted-foreground py-5 text-center text-sm">
        {homePage.footer.replace('%%YEAR%%', `${new Date().getFullYear()}`)}
      </p>
    </div>
  );
};

export default Footer;
