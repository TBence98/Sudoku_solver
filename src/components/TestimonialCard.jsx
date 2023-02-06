import clientImage from "../assets/client_image.jpg";

import classes from "./TestimonialCard.module.css";

const TestimonialCard = ({ text, clientName }) => {
    return (
        <li className={classes.testimonial_container}>
            <img
                src={clientImage}
                className={classes.client_image}
                alt="testimonial client"
            />
            <figure>
                <blockquote>
                    <p className={classes.text}>{text}</p>
                </blockquote>
                <figcaption>{clientName}</figcaption>
            </figure>
        </li>
    );
};

export default TestimonialCard;
