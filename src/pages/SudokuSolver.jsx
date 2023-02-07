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
            let shiftX = 0;
            let shiftY = 0;
            for (let i = 1; i < 4; i++) {
                for (let j = 1; j < 4; j++) {
                    const subgrid = [];
                    for (let y = shiftY; y < 3 + shiftY; y++) {
                        const subgridRow = [];
                        for (let x = shiftX; x < 3 + shiftX; x++) {
                            const isHighlighted =
                                isValueSetByUser(x, y) && formBeenSubmitted;

                            subgridRow.push(
                                <input
                                    type="number"
                                    className={`${classes.cell} ${
                                        isHighlighted
                                            ? classes.cell__active
                                            : ""
                                    }`}
                                    onChange={cellChangeHandler}
                                    data-x={x}
                                    data-y={y}
                                    defaultValue={tableValues[y][x]}
                                    min="1"
                                    max="9"
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
