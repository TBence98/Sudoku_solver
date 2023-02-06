import classes from "./BenefitCard.module.css";

const BenefitCard = ({ index, title, text }) => {
    return (
        <li>
            <h2 className={classes.benefit_title}>
                <span className={classes.index}>{index}</span>
                {title}
            </h2>
            <p>{text}</p>
        </li>
    );
};

export default BenefitCard;
