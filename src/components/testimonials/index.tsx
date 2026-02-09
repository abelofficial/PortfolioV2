import {datoCMS} from "@services/datoCMS"
import {queryWrapper, testimonialsQuery} from "@/lib/queries";
import {TestimonialsList} from "@/types";
import React from "react";
import TestimonialCarousel from "@components/testimonials/testimonialCarousel";

const Testimonials = async () => {
    const {allTestimonials}: TestimonialsList = await datoCMS({query: queryWrapper([testimonialsQuery])});
    
    return (
        <TestimonialCarousel allTestimonials={allTestimonials} />
    );
};

export default Testimonials;