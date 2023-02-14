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
                    {
                        src: "http://via.placeholder.com/200?text=1",
                        alt: "sudoku",
                    },
                    {
                        src: "http://via.placeholder.com/200?text=2",
                        alt: "sudoku",
                    },
                    {
                        src: "http://via.placeholder.com/200?text=3",
                        alt: "sudoku",
                    },
                    {
                        src: "http://via.placeholder.com/200?text=4",
                        alt: "sudoku",
                    },
                    {
                        src: "http://via.placeholder.com/200?text=5",
                        alt: "sudoku",
                    },
                    {
                        src: "http://via.placeholder.com/200?text=6",
                        alt: "sudoku",
                    },
                    {
                        src: "http://via.placeholder.com/200?text=7",
                        alt: "sudoku",
                    },
                    {
                        src: "http://via.placeholder.com/200?text=8",
                        alt: "sudoku",
                    },
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
