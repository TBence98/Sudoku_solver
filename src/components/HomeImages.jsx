import classes from "./HomeImages.module.css";

const HomeImages = ({ images }) => {
    return (
        <div className={classes.images}>
            {images.map((image, index) => (
                <img
                    src={image.src}
                    className={classes.image}
                    key={index}
                    alt={image.alt}
                />
            ))}
        </div>
    );
};

export default HomeImages;
