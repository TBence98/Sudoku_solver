import { useState, useEffect } from "react";
import useSolveSudoku from "../hooks/useSolveSudoku";

import classes from "./SudokuSolver.module.css";

let inputsChangedByUser = [];

const SudokuSolver = () => {
    const [tableElements, setTableElements] = useState([]);
    const [tableValues, setTableValues] = useState([]);
    const [isInitialRender, setIsInitialRender] = useState(true);
    const solve = useSolveSudoku();

    useEffect(() => {
        if (localStorage.getItem("inputsChangedByUser")) {
            inputsChangedByUser = JSON.parse(
                localStorage.getItem("inputsChangedByUser")
            );
            createDefaultValues(inputsChangedByUser);
        } else {
            createDefaultValues();
        }
    }, []);

    function createDefaultValues(inputsByUser = []) {
        const blankCell = "";
        const defaultValues = [];
        for (let i = 0; i <= 8; i++) {
            const row = [];
            for (let j = 0; j <= 8; j++) {
                const changedByUsercell = inputsByUser.find(
                    (input) =>
                        input.x === j.toString() && input.y === i.toString()
                );
                row.push(
                    changedByUsercell ? changedByUsercell.value : blankCell
                );
            }
            defaultValues.push(row);
        }
        setTableValues(defaultValues);
    }

    useEffect(() => {
        if (tableValues.length > 0) {
            createTableElements();
            setIsInitialRender(false);
        }
    }, [tableValues]);

    function createTableElements() {
        let shiftX = 0;
        let shiftY = 0;
        const tableElements = [];
        for (let i = 1; i < 4; i++) {
            for (let j = 1; j < 4; j++) {
                const subgrid = [];
                for (let y = shiftY; y < 3 + shiftY; y++) {
                    const subgridRow = [];
                    for (let x = shiftX; x < 3 + shiftX; x++) {
                        const isHighlighted =
                            isValueSetByUser(x, y) && !isInitialRender;

                        subgridRow.push(
                            <input
                                type="number"
                                className={`${classes.cell} ${
                                    isHighlighted ? classes.cell__active : ""
                                }`}
                                onChange={cellChangeHandler}
                                data-x={x}
                                data-y={y}
                                defaultValue={tableValues[y][x]}
                            />
                        );
                    }
                    subgrid.push(...subgridRow);
                }
                shiftX += 3;
                tableElements.push(
                    <div className={classes.grid} key={Math.random()}>
                        {...subgrid}
                    </div>
                );
            }
            shiftX = 0;
            shiftY += 3;
        }

        function isValueSetByUser(x, y) {
            return inputsChangedByUser.some(
                (input) => input.x === x.toString() && input.y === y.toString()
            );
        }

        setTableElements(tableElements);
    }

    function cellChangeHandler(event) {
        const y = event.target.dataset.y;
        const x = event.target.dataset.x;
        const value = event.target.value;

        const isChangedValue = inputsChangedByUser.some(
            (input) => input.x === x && input.y === y
        );

        if (value === "" && isChangedValue) {
            //remove from the array to prevent memory leak
            console.log("remove from array");
            inputsChangedByUser = inputsChangedByUser.filter(
                (input) => input.x !== x || input.y !== y
            );
        } else if (value !== "") {
            // add to the array
            inputsChangedByUser.push({ x, y, value });
        }
    }

    function submitHandler(event) {
        event.preventDefault();
        const toBeSolvedTable = Array.from({ length: 9 }, () => []);
        const formElements = event.target.elements;

        for (let i = 0; i < formElements.length; i++) {
            const input = formElements[i];

            if (input.type === "number") {
                toBeSolvedTable[input.dataset.y][input.dataset.x] = input.value;
            }
        }

        localStorage.setItem(
            "inputsChangedByUser",
            JSON.stringify(inputsChangedByUser)
        );

        setTableValues(solve(toBeSolvedTable));
    }

    function resetHandler() {
        inputsChangedByUser = [];
        createDefaultValues();
    }

    return (
        <>
            <h1>SudokuSolver</h1>
            <form onSubmit={submitHandler}>
                <div className={`${classes.grid} ${classes.sudoku_container}`}>
                    {tableElements}
                </div>
                <button type="submit">Solve</button>
            </form>
            <button type="button" onClick={resetHandler}>
                Reset
            </button>
        </>
    );
};

export default SudokuSolver;
