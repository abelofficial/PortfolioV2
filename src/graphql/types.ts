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

export interface TechStackList {
    allTechstacks: TechStack[];
}

export interface TechStack {
    id: string;
    title: string;
    name: string;
    icon: {
        url: string;
    };
}