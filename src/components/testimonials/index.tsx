import { datoCMS } from '@services/datoCMS';
import {
  getCombinedQuery,
  homePageQuery,
  testimonialsQuery,
} from '@/lib/queries';
import { HomePage, Testimonial } from '@/types';
import React from 'react';
import TestimonialCarousel from '@components/testimonials/testimonialCarousel';
import { getCodeFromLanguage } from '@/utils/languages';

export interface TestimonialsProps {
  locale: string;
}

const Testimonials = async ({ locale }: TestimonialsProps) => {
  const datoLocale = getCodeFromLanguage(locale) ?? 'en';
  const {
    allTestimonials,
    homePage,
  }: { allTestimonials: Testimonial[]; homePage: HomePage } = await datoCMS({
    query: getCombinedQuery([testimonialsQuery, homePageQuery]),
    variables: { locale: datoLocale },
  });

  return (
    <TestimonialCarousel
      allTestimonials={allTestimonials}
      homePage={homePage}
    />
  );
};

export default Testimonials;
