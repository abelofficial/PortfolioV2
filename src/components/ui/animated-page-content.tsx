import { ReactNode } from 'react';

interface AnimatedPageContentProps {
  children: ReactNode;
}

export const AnimatedPageContent = ({ children }: AnimatedPageContentProps) => {
  return <div className="animate-fade-in-up">{children}</div>;
};
