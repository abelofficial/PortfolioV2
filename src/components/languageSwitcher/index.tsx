'use client';

import * as React from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { GlobeIcon, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import languages from '@/utils/languages';

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const { locale } = useParams();
  const router = useRouter();

  const pathSegments = pathname?.split('/');
  const currentLocale = pathSegments[1];

  const getRedirectPath = (newLocale: string): string => {
    // Check if on technical ledgers detail page (more than 3 segments: /locale/technical-ledgers/slug)
    if (pathSegments[2] === 'technical-ledgers' && pathSegments?.length > 3) {
      return `/${newLocale}/technical-ledgers`;
    }

    // Check if on book summaries detail page or chapter page
    // Detail: /locale/book-summaries/slug (4 segments)
    // Chapter: /locale/book-summaries/slug/chapter/chapterSlug (6 segments)
    if (pathSegments[2] === 'book-summaries' && pathSegments?.length > 3) {
      return `/${newLocale}/book-summaries`;
    }

    // Default: replace locale in current path
    return pathname.replace(`/${locale}`, `/${newLocale}`);
  };

  const handleLocaleChange = async (newLocale: string) => {
    const path = getRedirectPath(newLocale);
    router.push(path);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Change language"
          className={className}
        >
          <GlobeIcon className="size-5" aria-hidden="true" focusable="false" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className="flex cursor-pointer items-center justify-between"
            onClick={() => handleLocaleChange(lang.code)}
          >
            <span className="font-geist flex items-center gap-2">
              <span>{lang.flag}</span>
              {lang.label}
            </span>
            {currentLocale === lang.code && (
              <Check className="size-4 opacity-50" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
