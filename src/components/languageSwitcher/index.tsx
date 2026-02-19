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
  if (pathSegments[2] === 'technical-ledgers' && pathSegments?.length > 3) {
    return null;
  }

  const currentLocale = pathSegments[1];

  const handleLocaleChange = async (newLocale: string) => {
    const path = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(path);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <GlobeIcon className={className} aria-label="Change language" />
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
