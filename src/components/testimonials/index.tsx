import {datoCMS} from "@services/datoCMS"
import {queryWrapper, testimonialsQuery} from "@/lib/queries";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Marquee} from "@components/ui/marquee";
import {TestimonialsList} from "@/types";
import {SectionContainer} from "@components/ui/custom-container";

export interface TestimonialCardProps {
    name: string
    workPlace: string
    workPosition: string
    body: string
}

const TestimonialReviewCard = ({ name, workPlace, workPosition, body }: TestimonialCardProps) => {
    return (
        <Card className="max-w-sm gap-1">
            <CardHeader className="flex flex-col gap-1">
                <CardTitle>{name}</CardTitle>
                <CardDescription>{workPosition} at {workPlace}</CardDescription>
            </CardHeader>
            <CardContent>
                <blockquote className="text-sm italic">&quot;{body}&quot;</blockquote>
            </CardContent>
        </Card>
    )
}

const Testimonials = async () => {
    const {allTestimonials}: TestimonialsList = await datoCMS({query: queryWrapper([testimonialsQuery])});
    return (
        <div className="max-w-130 w-full mx-auto">
            <Marquee pauseOnHover className="[--duration:40s] ">
                {allTestimonials.map((testimonial) => (
                    <TestimonialReviewCard key={testimonial.id}
                                           name={testimonial.name}
                                           workPlace={testimonial.workPlace}
                                           workPosition={testimonial.workPosition}
                                           body={testimonial.text}/>
                ))}
            </Marquee>
        </div>

    );
};

export default Testimonials;