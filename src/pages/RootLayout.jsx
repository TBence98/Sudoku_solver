import { Outlet } from "react-router-dom";

import classes from "./RootLayout.module.css";
import MainNavigation from "../components/MainNavigation";
import Footer from "../components/Footer";

const RootLayout = () => {
    return (
        <>
            <div className={classes.page_wrapper}>
                <div className={classes.content_wrap}>
                    <MainNavigation />
                    <main className={classes.root_layout}>
                        <Outlet />
                    </main>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default RootLayout;
