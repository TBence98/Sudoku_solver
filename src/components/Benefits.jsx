import BenefitCard from "./BenefitCard";

import classes from "./Benefits.module.css";

const Benefits = () => {
    const benefits = Array.from({ length: 6 }, () => null);

    return (
        <section className={classes.benefits_container}>
            <ul className={classes.benefits_list}>
                {benefits.map((_, index) => (
                    <BenefitCard
                        index={index + 1}
                        title="Lorem Ipsum"
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent faucibus tempor quam at gravida. Integer vel augue malesuada, porta diam a, dictum lacus. Nam porta orci sed sagittis laoreet. Curabitur tincidunt enim sed lacinia imperdiet. Integer faucibus nibh felis, vel imperdiet risus molestie ac. Proin sit amet efficitur libero, vel scelerisque elit."
                        key={index}
                    />
                ))}
            </ul>
        </section>
    );
};

export default Benefits;
