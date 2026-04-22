'use client';

import { HomePage, Testimonial } from '@/types';
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { SectionContainer } from '@components/ui/custom-container';
import { Quote } from 'lucide-react';

export interface TestimonialCarouselProps {
  allTestimonials: Testimonial[];
  homePage: HomePage;
}

const TestimonialCarousel = ({
  allTestimonials,
  homePage,
}: TestimonialCarouselProps) => {
  const plugin = React.useMemo(
    () => Autoplay({ delay: 5000, stopOnInteraction: true }),
    []
  );

  return (
    <Carousel
      plugins={[plugin]}
      className="w-full"
      onMouseEnter={() => plugin.stop()}
      onMouseLeave={() => plugin.reset()}
    >
      <CarouselContent className="items-stretch gap-3">
        {allTestimonials.map((testimonial) => (
          <CarouselItem key={testimonial.id} className="flex">
            <SectionContainer
              disablePattern
              className="flex h-full flex-1 bg-black/3 dark:bg-white/3"
            >
              <div className="flex max-w-2xl flex-1 flex-col items-center justify-center gap-4 self-center px-4 py-4">
                {/* Quote icon */}
                <Quote className="text-primary/40 h-6 w-6 rotate-180" />

                {/* Testimonial text */}
                <blockquote className="text-foreground/90 text-center text-xs leading-relaxed md:text-sm">
                  {testimonial.text}
                </blockquote>

                {/* Author info */}
                <div className="flex flex-col items-center gap-0.5">
                  <p className="text-foreground text-xs font-semibold">
                    {testimonial.name}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {testimonial.workPosition} {homePage.at}{' '}
                    <span className="text-primary-light font-medium">
                      {testimonial.workPlace}
                    </span>
                  </p>
                </div>
              </div>
            </SectionContainer>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default TestimonialCarousel;
