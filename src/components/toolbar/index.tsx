'use client';
import Link from 'next/link';
import { Dock, DockIcon } from '@components/ui/dock';
import { Separator } from '@components/ui/separator';
import { UserRoundPen, NotebookTextIcon } from 'lucide-react';
import { AnimatedThemeToggler } from '@components/ui/animated-theme-toggler';
import { useParams, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LanguageSwitcher } from '@components/languageSwitcher';
import languages from '@/utils/languages';

const Toolbar = () => {
  const pathname = usePathname();
  const { locale } = useParams();
  const isHomePageChecker = () =>
    languages.some(
      (lang) =>
        pathname.endsWith(`/${lang.code}`) || pathname === `/${lang.code}/`
    );

  const getClassName = (checker: () => boolean) => {
    return cn(
      ['size-5'],
      checker() ? ['stroke-primary'] : ['hover:stroke-primary-light']
    );
  };

  return (
    <Dock direction="middle" className="bg-card flex w-full justify-around p-0">
      <DockIcon>
        <Link href={`/${locale}`} aria-label="Go to home">
          <UserRoundPen className={getClassName(isHomePageChecker)} />
        </Link>
      </DockIcon>
      <DockIcon>
        <Link href={`/${locale}/technical-ledgers`}>
          <NotebookTextIcon
            aria-label="Go to technical ledgers"
            className={getClassName(() =>
              pathname.includes('/technical-ledgers')
            )}
          />
        </Link>
      </DockIcon>
      <Separator orientation="vertical" />
      <DockIcon>
        <LanguageSwitcher className="size-5" />
      </DockIcon>
      <DockIcon>
        <AnimatedThemeToggler className="size-5" aria-label="Change theme" />
      </DockIcon>
    </Dock>
  );
};

export default Toolbar;
