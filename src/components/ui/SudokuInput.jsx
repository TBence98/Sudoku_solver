import { useState } from "react";

import classes from "./SudokuInput.module.css";

const SudokuInput = ({
    value,
    isHighlightedByDefault,
    x,
    y,
    valueChangeHandler,
}) => {
    const [isHighlighted, setIsHighlighted] = useState(isHighlightedByDefault);

    function changeHandler(event) {
        const value = event.target.value;
        const x = event.target.dataset.x;
        const y = event.target.dataset.y;

        valueChangeHandler(value, x, y);

        if (value === "" && isHighlighted) {
            setIsHighlighted(false);
        } else if (value !== "") {
            setIsHighlighted(true);
        }
    }

    return (
        <input
            type="number"
            className={`${classes.cell} ${
                isHighlighted ? classes.cell__active : ""
            }`}
            onChange={changeHandler}
            data-x={x}
            data-y={y}
            defaultValue={value}
            min="1"
            max="9"
        />
    );
};

export default SudokuInput;
