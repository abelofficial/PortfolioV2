import { DotPattern } from '@components/ui/dot-pattern';
import { cn } from '@/lib/utils';

const Footer = () => {
  return (
    <div className="bg-background relative w-full gap-2 py-15 text-center">
      <DotPattern
        className={cn(
          'mask-[radial-gradient(300px_circle_at_top_right,white,transparent)]',
          'lg:mask-[radial-gradient(400px_circle_at_right,white,transparent)]'
        )}
      />
      <p className="text-shadow-muted-foreground py-5 text-center text-sm">
        Copyright © {new Date().getFullYear()} Abel. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
