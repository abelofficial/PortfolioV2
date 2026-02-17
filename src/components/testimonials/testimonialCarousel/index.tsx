'use client';

import { HomePage, Testimonial } from '@/types';
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { CardContent, CardFooter } from '@components/ui/card';
import { SectionContainer } from '@components/ui/custom-container';

export interface TestimonialCarouselProps {
  allTestimonials: Testimonial[];
  homePage: HomePage;
}

const TestimonialCarousel = ({
  allTestimonials,
  homePage,
}: TestimonialCarouselProps) => {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="gap-3">
        {allTestimonials.map((testimonial) => (
          <CarouselItem key={testimonial.id}>
            <SectionContainer disableShine disablePattern>
              <CardContent className="m-0 max-w-3xl self-center px-4 pt-2 pb-4">
                <blockquote className="text-foreground/90 text-center text-[15px] leading-relaxed italic md:text-base">
                  <span className="text-primary/70">&ldquo;</span>
                  {testimonial.text}
                  <span className="text-primary/70">&rdquo;</span>
                </blockquote>
              </CardContent>

              <CardFooter className="flex justify-center pb-6">
                <p className="text-muted-foreground text-sm">
                  <span className="font-medium">{testimonial.name}</span>{' '}
                  <span className="text-primary font-semibold">
                    {testimonial.workPosition} {homePage.at}{' '}
                    {testimonial.workPlace}
                  </span>
                </p>
              </CardFooter>
            </SectionContainer>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default TestimonialCarousel;
