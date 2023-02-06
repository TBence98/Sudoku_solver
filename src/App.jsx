import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/home";
import SudokuSolver from "./pages/SudokuSolver";
import Subscribe from "./pages/Subscribe";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RootLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/sudoku-solver" element={<SudokuSolver />} />
                    <Route path="/subscribe" element={<Subscribe />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
