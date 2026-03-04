import React from 'react';
import { DotPattern } from '@components/ui/dot-pattern';
import { cn } from '@/lib/utils';
import { Card } from '@components/ui/card';
import { ShineBorder } from '@components/ui/shine-border';

export interface SidebarContainerProps {
  children: React.ReactNode;
}

export const SidebarContainer = ({ children }: SidebarContainerProps) => {
  return (
    <div className="relative flex h-full w-full justify-center xl:h-full">
      <DotPattern
        className={cn(
          'mask-[radial-gradient(300px_circle_at_top_right,white,transparent)]',
          'xl:mask-[radial-gradient(400px_circle_at_center,white,transparent)]'
        )}
      />
      <>{children}</>
    </div>
  );
};

export interface MainPageContainerProps {
  className?: string;
  children: React.ReactNode;
}

export const MainPageContainer = ({
  className,
  children,
}: MainPageContainerProps) => {
  return (
    <div
      className={cn([
        'mx-auto flex w-full max-w-6xl flex-col gap-4 p-4 md:p-5',
        className,
      ])}
    >
      {children}
    </div>
  );
};

export interface MultiSectionLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export const MultiSectionLayout = ({
  sidebar,
  children,
}: MultiSectionLayoutProps) => {
  return (
    <main className="grid min-h-svh w-full grid-cols-1 grid-rows-[auto_1fr] xl:grid-cols-[1fr_minmax(320px,33.333%)] xl:grid-rows-1">
      <section className="order-1 w-full xl:order-2 xl:h-svh xl:overflow-hidden">
        {sidebar}
      </section>
      <section className="custom-scrollbar bg-secondary order-2 min-h-0 w-full xl:order-1 xl:h-svh xl:overflow-y-auto">
        {children}
      </section>
    </main>
  );
};

export interface SectionContainerProps {
  children?: React.ReactNode;
  title?: string;
  disableShine?: boolean;
  disablePattern?: boolean;
  fullHeight?: boolean;
  headerAction?: React.ReactNode;
  className?: string;
}

export const SectionContainer = ({
  title,
  disableShine,
  disablePattern,
  fullHeight,
  headerAction,
  className,
  children,
}: SectionContainerProps) => {
  return (
    <Card
      className={cn([
        `relative ${fullHeight ? 'h-full' : ''} w-full gap-1 overflow-hidden p-4 py-4`,
        className,
      ])}
    >
      {disablePattern || (
        <DotPattern
          className={cn(
            'mask-[radial-gradient(300px_circle_at_top_right,white,transparent)]',
            'lg:mask-[radial-gradient(400px_circle_at_right,white,transparent)]'
          )}
        />
      )}
      {disableShine || (
        <ShineBorder
          shineColor={[
            'color-mix(in oklab, var(--color-primary) 45%, transparent)',
            'oklch(0.92 0.05 60)',
            'color-mix(in oklab, var(--color-primary) 45%, transparent)',
          ]}
          className="[--shine-opacity:0.85] dark:[--shine-opacity:0.9]"
        />
      )}
      <div className="flex justify-between">
        {title && <h2 className="text-sm font-bold">{title}</h2>}
        {headerAction}
      </div>
      {children}
    </Card>
  );
};
