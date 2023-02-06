import { NavLink } from "react-router-dom";

import classes from "./Introduction.module.css";

const Introduction = () => {
    return (
        <div className={classes.introduction_container}>
            <section className={classes.introduction}>
                <h1 className={classes.title}>Lorem Ipsum Dolor Sit Amet</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Praesent faucibus tempor quam at gravida. Integer vel augue
                    malesuada, porta diam a, dictum lacus. Nam porta orci sed
                    sagittis laoreet. Curabitur tincidunt enim sed lacinia
                    imperdiet.
                </p>
                <div className={classes.link_container}>
                    <NavLink to="/sudoku-solver" className={classes.link} end>
                        Solve Sudoku
                    </NavLink>
                    <NavLink to="/subscribe" className={classes.link} end>
                        Subscribe
                    </NavLink>
                </div>
            </section>
            <iframe
                className={classes.video}
                src="https://www.youtube.com/embed/QgkVz9sdHEs"
                title="The Sudoku Trick All Expert Solvers Know"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default Introduction;
