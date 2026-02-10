"use client";
import {TestimonialsList} from "@/types";
import React from "react";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import {CardContent, CardDescription, CardHeader, CardTitle} from "@components/ui/card";
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
                            <CardHeader className="flex flex-col px-2 m-0">
                                <CardTitle>{testimonial.name}</CardTitle>
                                <CardDescription>{testimonial.workPosition} at {testimonial.workPlace}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col px-2 pb-4 m-0">
                                <blockquote
                                    className="text-sm italic text-justify">&quot;{testimonial.text}&quot;</blockquote>
                            </CardContent>
                        </SectionContainer>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>

    )
}

export default TestimonialCarousel;