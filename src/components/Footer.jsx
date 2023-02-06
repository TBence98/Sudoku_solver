import classes from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className={classes.footer}>
            <p className={classes.copyright_text}>
                &#169; <span>{new Date().getFullYear()}</span> Copyright Text
            </p>
        </footer>
    );
};

export default Footer;
