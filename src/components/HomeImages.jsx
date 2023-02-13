import { useState } from "react";

import classes from "./HomeImages.module.css";

const HomeImages = ({ images }) => {
    const [translateX, setTranslateX] = useState(0);
    const prevBtnIsDisabled = false;
    const nextBtnIsDisabled = false;

    function handlePrevious() {
        setTranslateX((prevState) => prevState + 25);
    }

    function handleNext() {
        setTranslateX((prevState) => prevState - 25);
    }

    return (
        <div className={classes.image_carousel}>
            <div className={classes.visible_images}>
                <div
                    className={classes.images}
                    style={{
                        transform: `translateX(${translateX}%)`,
                        transition: "all 0.5s",
                    }}
                >
                    {images.map((image, index) => (
                        <img
                            src={image.src}
                            className={classes.image}
                            key={index}
                            alt={image.alt}
                        />
                    ))}
                </div>
            </div>
            <button
                className={`${classes.arrow} ${classes["arrow--left"]}`}
                onClick={handlePrevious}
                disabled={prevBtnIsDisabled}
            >
                &#60;
            </button>
            <button
                className={`${classes.arrow} ${classes["arrow--right"]}`}
                onClick={handleNext}
                disabled={nextBtnIsDisabled}
            >
                &#62;
            </button>
        </div>
    );
};

export default HomeImages;
