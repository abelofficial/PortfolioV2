import { datoCMS } from '@services/datoCMS';
import {
  getCombinedQuery,
  homePageQuery,
  testimonialsQuery,
} from '@/lib/queries';
import { HomePage, Testimonial, TestimonialsList } from '@/types';
import React from 'react';
import TestimonialCarousel from '@components/testimonials/testimonialCarousel';

export interface TestimonialsProps {
  locale: string;
}

const Testimonials = async ({ locale }: TestimonialsProps) => {
  const {
    allTestimonials,
    homePage,
  }: { allTestimonials: Testimonial[]; homePage: HomePage } = await datoCMS({
    query: getCombinedQuery([testimonialsQuery, homePageQuery]),
    variables: { locale: locale },
  });

  return (
    <TestimonialCarousel
      allTestimonials={allTestimonials}
      homePage={homePage}
    />
  );
};

export default Testimonials;
