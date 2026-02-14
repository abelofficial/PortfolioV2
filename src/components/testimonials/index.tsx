import { datoCMS } from '@services/datoCMS';
import { getCombinedQuery, testimonialsQuery } from '@/lib/queries';
import { TestimonialsList } from '@/types';
import React from 'react';
import TestimonialCarousel from '@components/testimonials/testimonialCarousel';

export interface TestimonialsProps {
  locale: string;
}

const Testimonials = async ({ locale }: TestimonialsProps) => {
  const { allTestimonials }: TestimonialsList = await datoCMS({
    query: getCombinedQuery([testimonialsQuery]),
    variables: { locale: locale },
  });

  return <TestimonialCarousel allTestimonials={allTestimonials} />;
};

export default Testimonials;
