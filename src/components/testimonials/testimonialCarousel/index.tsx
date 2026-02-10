"use client";
import {TestimonialsList} from "@/types";
import React from "react";
import {Carousel, CarouselContent, CarouselItem} from "@components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import {CardContent, CardFooter} from "@components/ui/card";
import {SectionContainer} from "@components/ui/custom-container";

const TestimonialCarousel = ({allTestimonials}: TestimonialsList) => {
    const plugin = React.useRef(
        Autoplay({delay: 5000, stopOnInteraction: true})
    )
    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent className="gap-1">
                {allTestimonials.map((testimonial) => (
                    <CarouselItem key={testimonial.id}>
                        <SectionContainer disableShine>
                            <CardContent className="flex flex-col px-2 pb-4 m-0">
                                <blockquote
                                    className="text-sm italic text-justify">&quot;{testimonial.text}&quot;</blockquote>
                            </CardContent>
                            <CardFooter className="flex justify-center">
                                <p className="text-xs text-muted-foreground">{testimonial.name} <span
                                    className="text-xs text-primary font-bold">{testimonial.workPosition} at {testimonial.workPlace}</span>
                                </p>
                            </CardFooter>
                        </SectionContainer>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>

    )
}

export default TestimonialCarousel;