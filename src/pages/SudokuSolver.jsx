import { useState, useEffect } from "react";
import useSolveSudoku from "../hooks/useSolveSudoku";
import Modal from "../components/ui/Modal";

import classes from "./SudokuSolver.module.css";

let inputsChangedByUser = [];
let formBeenSubmitted = false;

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

                        const isHighlighted =
                            isValueSetByUser(computedX, computedY) &&
                            formBeenSubmitted;

                        subgrid.push(
                            <input
                                type="number"
                                className={`${classes.cell} ${
                                    isHighlighted ? classes.cell__active : ""
                                }`}
                                onChange={cellChangeHandler}
                                data-x={computedX}
                                data-y={computedY}
                                defaultValue={tableValues[computedY][computedX]}
                                min="1"
                                max="9"
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

        const result = solve(toBeSolvedTable);
        console.log(toBeSolvedTable);
        console.log(result);

        if (result) {
            setTableValues(result);
        } else {
            setModalText("Can't be solved");
        }

        formBeenSubmitted = true;
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
