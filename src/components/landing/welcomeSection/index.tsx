import { SectionContainer } from '@components/ui/custom-container';
import { CardContent } from '@components/ui/card';

export interface WelcomeSectionProps {
  title: string;
  subtitle: string;
}

const WelcomeSection = ({ title, subtitle }: WelcomeSectionProps) => {
  return (
    <SectionContainer disablePattern>
      <CardContent className="flex flex-col items-center gap-4 py-8 text-center md:py-12">
        <h1 className="text-2xl font-bold md:text-4xl">{title}</h1>
        <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed md:text-base">
          {subtitle}
        </p>
      </CardContent>
    </SectionContainer>
  );
};

export default WelcomeSection;
