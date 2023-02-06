import TestimonialCard from "./TestimonialCard";

import classes from "./Testimonials.module.css";

const Testimonials = () => {
    const testimonials = Array.from({ length: 2 }, (index) => null);

    return (
        <section className={classes.testimonials_container}>
            <ul className={classes.testimonials_list}>
                {testimonials.map((_, index) => (
                    <TestimonialCard
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent faucibus tempor quam at gravida. Integer vel augue malesuada, porta diam a, dictum lacus. Nam porta orci sed sagittis laoreet. Curabitur tincidunt enim sed lacinia imperdiet. Integer faucibus nibh felis, vel imperdiet risus molestie ac"
                        clientName="John Doe"
                        key={index}
                    />
                ))}
            </ul>
        </section>
    );
};

export default Testimonials;
