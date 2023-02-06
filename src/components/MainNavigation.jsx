import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.links_container}>
                    <li className={classes.logo_container}>
                        <NavLink
                            to="/"
                            className={`${classes.nav_link} ${classes.logo}`}
                            end
                        >
                            <span>Logo</span>
                        </NavLink>
                    </li>
                    <div className={classes.page_links}>
                        <li>
                            <NavLink
                                to="/sudoku-solver"
                                className={({ isActive }) =>
                                    `${classes.nav_link} ${
                                        isActive ? classes.active : ""
                                    }`
                                }
                                end
                            >
                                Sudoku Solver
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/subscribe"
                                className={({ isActive }) =>
                                    `${classes.nav_link} ${
                                        isActive ? classes.active : ""
                                    }`
                                }
                                end
                            >
                                Subscribe
                            </NavLink>
                        </li>
                    </div>
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;
