export interface TestimonialsList {
    allTestimonials: Testimonial[];
}

export interface Testimonial {
    id: string;
    name: string;
    text: string;
    workPlace: string;
    workPosition: string;
}