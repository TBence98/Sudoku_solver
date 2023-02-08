import { useState, useEffect } from "react";
import useSolveSudoku from "../hooks/useSolveSudoku";
import Modal from "../components/ui/Modal";
import SudokuInput from "../components/ui/SudokuInput";

import classes from "./SudokuSolver.module.css";

let inputsChangedByUser = [];

const SudokuSolver = () => {
    const [tableValues, setTableValues] = useState([]);
    const [modalText, setModalText] = useState("");
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

    function createTableElements() {
        const tableElements = [];
        if (tableValues.length > 0) {
            const boxCoordinates = [
                [0, 0],
                [0, 1],
                [0, 2],
                [1, 0],
                [1, 1],
                [1, 2],
                [2, 0],
                [2, 1],
                [2, 2],
            ];
            for (let y = 0; y < 9; y += 3) {
                for (let x = 0; x < 9; x += 3) {
                    const subgrid = [];
                    for (let i = 0; i < 9; i++) {
                        const coordinates = [...boxCoordinates[i]];
                        const computedY = (coordinates[0] += y);
                        const computedX = (coordinates[1] += x);

                        const isHighlighted = isValueSetByUser(
                            computedX,
                            computedY
                        );

                        subgrid.push(
                            <SudokuInput
                                value={tableValues[computedY][computedX]}
                                isHighlightedByDefault={isHighlighted}
                                x={computedX}
                                y={computedY}
                                valueChangeHandler={cellChangeHandler}
                            />
                        );
                    }
                    tableElements.push(
                        <div className={classes.grid} key={Math.random()}>
                            {...subgrid}
                        </div>
                    );
                }
            }

            function isValueSetByUser(x, y) {
                return inputsChangedByUser.some(
                    (input) =>
                        input.x === x.toString() && input.y === y.toString()
                );
            }
        }

        return tableElements;
    }

    function cellChangeHandler(value, x, y) {
        /* if the input was stored in the inputsChangedByUser
         array then it must be removed with this filter */
        inputsChangedByUser = inputsChangedByUser.filter(
            (input) => input.x !== x || input.y !== y
        );

        if (value !== "") {
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

        const result = solve(toBeSolvedTable);
        console.log(toBeSolvedTable);
        console.log(result);

        localStorage.setItem(
            "inputsChangedByUser",
            JSON.stringify(inputsChangedByUser)
        );

        if (result) {
            setTableValues(result);
        } else {
            setTableValues(toBeSolvedTable);
            setModalText("Can't be solved");
        }
    }

    function resetHandler() {
        inputsChangedByUser = [];
        createDefaultValues();
    }

    function closeModal() {
        setModalText("");
    }

    return (
        <>
            {modalText ? (
                <Modal message={modalText} onClose={closeModal} />
            ) : null}
            <h1 className={classes.title}>Sudoku Solver</h1>
            <form onSubmit={submitHandler} className={classes.form}>
                <div className={`${classes.grid} ${classes.sudoku_container}`}>
                    {createTableElements()}
                </div>
                <div className={classes.actions}>
                    <button
                        type="submit"
                        className={`${classes.btn}  ${classes.btn_primary}`}
                    >
                        Solve
                    </button>
                    <button
                        type="button"
                        className={`${classes.btn}  ${classes.btn_secondary}`}
                        onClick={resetHandler}
                    >
                        Reset
                    </button>
                </div>
            </form>
        </>
    );
};

export default SudokuSolver;
