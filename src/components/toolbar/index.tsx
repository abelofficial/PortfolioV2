'use client';
import Link from 'next/link';
import { Dock, DockIcon } from '@components/ui/dock';
import { Separator } from '@components/ui/separator';
import {
  BookOpenIcon,
  GlobeIcon,
  LucideHistory,
  UserRoundPen,
} from 'lucide-react';
import { AnimatedThemeToggler } from '@components/ui/animated-theme-toggler';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const Toolbar = () => {
  const pathname = usePathname();

  return (
    <Dock direction="middle" className="bg-card flex w-full justify-around p-0">
      <DockIcon>
        <Link href="/">
          <UserRoundPen
            className={cn(
              ['size-5'],
              pathname === '/'
                ? ['stroke-primary']
                : ['hover:stroke-primary-light']
            )}
          />
        </Link>
      </DockIcon>
      <DockIcon>
        <Link href="/timeline">
          <LucideHistory
            className={cn(
              ['size-5'],
              pathname === '/timeline'
                ? ['stroke-primary']
                : ['hover:stroke-primary-light']
            )}
          />
        </Link>
      </DockIcon>
      <DockIcon>
        <Link href="/blogs">
          <BookOpenIcon
            className={cn(
              ['size-5'],
              pathname === '/blogs'
                ? ['stroke-primary']
                : ['hover:stroke-primary-light']
            )}
          />
        </Link>
      </DockIcon>
      <Separator orientation="vertical" />
      <DockIcon>
        <GlobeIcon className="size-5" />
      </DockIcon>
      <DockIcon>
        <AnimatedThemeToggler className="size-5" />
      </DockIcon>
    </Dock>
  );
};

export default Toolbar;
