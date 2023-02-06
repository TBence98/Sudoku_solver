import sudoku_img from "../assets/sudoku_image.jpg";

import Introduction from "../components/Introduction";
import HomeImages from "../components/HomeImages";
import Benefits from "../components/Benefits";
import Testimonials from "../components/Testimonials";
import LineSeparator from "../components/ui/LineSeparator";

const Home = () => {
    return (
        <>
            <Introduction />
            <LineSeparator />
            <HomeImages
                images={[
                    { src: sudoku_img, alt: "sudoku" },
                    { src: sudoku_img, alt: "sudoku" },
                    { src: sudoku_img, alt: "sudoku" },
                    { src: sudoku_img, alt: "sudoku" },
                ]}
            />
            <LineSeparator />
            <Benefits />
            <LineSeparator />
            <Testimonials />
        </>
    );
};

export default Home;
