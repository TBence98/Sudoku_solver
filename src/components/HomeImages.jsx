import { useState, useEffect } from "react";

import classes from "./HomeImages.module.css";

const HomeImages = ({ images }) => {
    const [renderedImages, setRenderedImages] = useState([]);
    const [cachedImages, setCachedImages] = useState([]);

    useEffect(() => {
        const renderedImages = [];
        const cachedImages = [];
        for (let i = 0; i < images.length; i++) {
            if (i < 5) {
                renderedImages.push({ ...images[i], left: 25 * i });
            } else if (i === images.length - 1) {
                renderedImages.unshift({ ...images[i], left: -25 });
            } else {
                cachedImages.push({ ...images[i], left: null });
            }
        }

        setRenderedImages(renderedImages);
        setCachedImages(cachedImages);
    }, []);

    useEffect(() => {
        const slideImages = setInterval(handleNext, 4000);

        return () => clearInterval(slideImages);
    }, [renderedImages]);

    function handlePrevious() {
        const newRenderedImages = renderedImages.map((renderedImage) => {
            return { ...renderedImage, left: renderedImage.left + 25 };
        });
        const newCachedImages = [...cachedImages];

        newRenderedImages.unshift(newCachedImages.pop());
        newCachedImages.unshift(newRenderedImages.pop());

        newRenderedImages[0].left = -25;

        setRenderedImages(newRenderedImages);
        setCachedImages(newCachedImages);
    }

    function handleNext() {
        const newRenderedImages = renderedImages.map((renderedImage) => {
            return { ...renderedImage, left: renderedImage.left - 25 };
        });
        const newCachedImages = [...cachedImages];

        newRenderedImages.push(newCachedImages.shift());
        newCachedImages.push(newRenderedImages.shift());

        newRenderedImages.at(-1).left = newRenderedImages.at(-2).left + 25;

        setRenderedImages(newRenderedImages);
        setCachedImages(newCachedImages);
    }

    return (
        <div className={classes.image_carousel}>
            <div className={classes.visible_images}>
                <div className={classes.images}>
                    {images.map((image, index) => {
                        const visibleImage = renderedImages.find(
                            (renderedImage) => renderedImage.src === image.src
                        );
                        if (visibleImage) {
                            return (
                                <img
                                    src={image.src}
                                    className={classes.image}
                                    key={index}
                                    alt={image.alt}
                                    style={{
                                        left: `${visibleImage.left}%`,
                                        transition: "all 0.7s",
                                    }}
                                />
                            );
                        }
                        return (
                            <img
                                src={image.src}
                                className={classes.image}
                                key={index}
                                alt={image.alt}
                                style={{
                                    top: "100%",
                                }}
                            />
                        );
                    })}
                </div>
            </div>
            <button
                className={`${classes.arrow} ${classes["arrow--left"]}`}
                onClick={handlePrevious}
            >
                &#60;
            </button>
            <button
                className={`${classes.arrow} ${classes["arrow--right"]}`}
                onClick={handleNext}
            >
                &#62;
            </button>
        </div>
    );
};

export default HomeImages;
