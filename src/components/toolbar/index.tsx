'use client';
import Link from 'next/link';
import { Dock, DockIcon } from '@components/ui/dock';
import { Separator } from '@components/ui/separator';
import { BookOpenIcon, LucideHistory, UserRoundPen } from 'lucide-react';
import { AnimatedThemeToggler } from '@components/ui/animated-theme-toggler';
import { useParams, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LanguageSwitcher } from '@components/languageSwitcher';
import languages from '@/utils/languages';

const Toolbar = () => {
  const pathname = usePathname();
  const { locale } = useParams();
  const isHome = languages.some(
    (lang) =>
      pathname.endsWith(`/${lang.code}`) || pathname === `/${lang.code}/`
  );
  return (
    <Dock direction="middle" className="bg-card flex w-full justify-around p-0">
      <DockIcon>
        <Link href={`/${locale}`}>
          <UserRoundPen
            className={cn(
              ['size-5'],
              isHome ? ['stroke-primary'] : ['hover:stroke-primary-light']
            )}
          />
        </Link>
      </DockIcon>
      <DockIcon>
        <Link href={`/${locale}/timeline`}>
          <LucideHistory
            className={cn(
              ['size-5'],
              pathname.includes('/timeline')
                ? ['stroke-primary']
                : ['hover:stroke-primary-light']
            )}
          />
        </Link>
      </DockIcon>
      <DockIcon>
        <Link href={`/${locale}/blogs`}>
          <BookOpenIcon
            className={cn(
              ['size-5'],
              pathname.includes('/blogs')
                ? ['stroke-primary']
                : ['hover:stroke-primary-light']
            )}
          />
        </Link>
      </DockIcon>
      <Separator orientation="vertical" />
      <DockIcon>
        <LanguageSwitcher className="size-5" />
      </DockIcon>
      <DockIcon>
        <AnimatedThemeToggler className="size-5" />
      </DockIcon>
    </Dock>
  );
};

export default Toolbar;
