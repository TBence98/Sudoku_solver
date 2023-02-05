import { Outlet } from "react-router-dom";

import classes from "./RootLayout.module.css";

const RootLayout = () => {
    return (
        <>
            <main className={classes.rootLayout}>
                <Outlet />
            </main>
        </>
    );
};

export default RootLayout;
