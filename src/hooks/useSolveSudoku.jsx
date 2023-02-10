const useSolveSudoku = () => {
    /* There is two solve functions in this solve hook, both implement a backtracking algorithm
    , but one does this with recursion and the other one with iteration. I think the recursive
    one is better, because it is less complex and easier to understand, generally a better fit
    to implement this algorithm, but I made the iterative one anyway just for fun :) */

    function solveIterative(unsolvedBoard) {
        const solvedBoard = unsolvedBoard.map((row) => [...row]);
        /* keep track of the current 2d array traverse mod, if isBacktracking 
        is true, then traverse the array backwards (right to left, bottom to top) */
        let isBacktracking = false;

        for (let i = 0; i < solvedBoard.length; i++) {
            const startJ = isBacktracking ? 8 : 0;
            for (let j = startJ; j < solvedBoard[i].length; j++) {
                /* if a valid cell value is found in this iteration then it will be true */
                let isValidCellValue = false;

                /* if there is a value in the unsolvedBoard and not in backtracking mode then
                just skip this iteration */
                if (unsolvedBoard[i][j] !== "" && !isBacktracking) {
                    continue;
                }

                /* if there is no value in the unsolvedBoard and not in backtracking mode then
                try to find a valid cell value */
                if (unsolvedBoard[i][j] === "" && !isBacktracking) {
                    for (let cellValue = 1; cellValue <= 9; cellValue++) {
                        const possibleSolution = solvedBoard.map((row) => [
                            ...row,
                        ]);
                        possibleSolution[i][j] = cellValue.toString();
                        if (validBoard(possibleSolution)) {
                            solvedBoard[i][j] = cellValue.toString();
                            isValidCellValue = true;
                            break;
                        }
                    }
                }

                /* if there is no value in the unsolvedBoard and at backtracking mode then
                try to find a new valid cell value */
                if (unsolvedBoard[i][j] === "" && isBacktracking) {
                    if (+solvedBoard[i][j] < 9) {
                        for (
                            let cellValue = +solvedBoard[i][j] + 1;
                            cellValue <= 9;
                            cellValue++
                        ) {
                            const possibleSolution = solvedBoard.map((row) => [
                                ...row,
                            ]);
                            possibleSolution[i][j] = cellValue.toString();
                            if (validBoard(possibleSolution)) {
                                solvedBoard[i][j] = cellValue.toString();
                                isValidCellValue = true;
                                isBacktracking = false;
                                break;
                            }
                        }
                    }
                }

                /* if finding a new valid cell value was unsuccessful then start backtracking */
                if (!isValidCellValue) {
                    if (unsolvedBoard[i][j] === "") {
                        solvedBoard[i][j] = "";
                    }
                    isBacktracking = true;
                    if (j === 0) {
                        if (i === 0) {
                            return false;
                        }
                        i -= 2;
                        break;
                    } else {
                        j -= 2;
                    }
                }
            }
        }

        return solvedBoard;
    }

    function solveRecursive(board) {
        // solves the given sudoku board
        // ASSUME the given sudoku board is valid
        if (solved(board)) {
            return board;
        } else {
            const possibilities = nextBoards(board);
            const validBoards = keepOnlyValid(possibilities);
            return searchForSolution(validBoards);
        }
    }

    function searchForSolution(boards) {
        // List[Board] -> Board or false
        // finds a valid solution to the sudoku problem
        if (boards.length < 1) {
            return false;
        } else {
            // backtracking search for solution
            const first = boards.shift();
            const tryPath = solveRecursive(first);
            if (tryPath !== false) {
                return tryPath;
            } else {
                return searchForSolution(boards);
            }
        }
    }

    function solved(board) {
        // Board -> Boolean
        // checks to see if the given puzzle is solved
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] === "") {
                    return false;
                }
            }
        }
        return true;
    }

    function nextBoards(board) {
        // Board -> List[Board]
        // finds the first emply square and generates 9 different boards filling in that square with numbers 1...9
        const res = [];
        const firstEmpty = findEmptySquare(board);
        if (firstEmpty !== undefined) {
            const y = firstEmpty[0];
            const x = firstEmpty[1];
            for (let i = 1; i <= 9; i++) {
                const newBoard = [...board];
                const row = [...newBoard[y]];
                row[x] = i.toString();
                newBoard[y] = row;
                res.push(newBoard);
            }
        }
        return res;
    }

    function findEmptySquare(board) {
        // Board -> [Int, Int]
        // (get the i j coordinates for the first empty square)
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] === "") {
                    return [i, j];
                }
            }
        }
    }

    function keepOnlyValid(boards) {
        // Boards -> Boards
        return boards.filter((b) => validBoard(b));
    }

    function validBoard(board) {
        // Board -> Boolean
        // checks to see if given board is valid
        return rowsGood(board) && columnsGood(board) && boxesGood(board);
    }

    function rowsGood(board) {
        // Board -> Boolean
        // makes sure there are no repeating numbers for each row
        for (let i = 0; i < 9; i++) {
            const cur = [];
            for (let j = 0; j < 9; j++) {
                if (cur.includes(board[i][j])) {
                    return false;
                } else if (board[i][j] !== "") {
                    cur.push(board[i][j]);
                }
            }
        }
        return true;
    }

    function columnsGood(board) {
        // Board -> Boolean
        // makes sure there are no repeating numbers for each column
        for (let i = 0; i < 9; i++) {
            const cur = [];
            for (let j = 0; j < 9; j++) {
                if (cur.includes(board[j][i])) {
                    return false;
                } else if (board[j][i] !== "") {
                    cur.push(board[j][i]);
                }
            }
        }
        return true;
    }

    function boxesGood(board) {
        // transform this everywhere to update res
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
        // Board -> Boolean
        // makes sure there are no repeating numbers for each box
        for (let y = 0; y < 9; y += 3) {
            for (let x = 0; x < 9; x += 3) {
                // each traversal should examine each box
                const cur = [];
                for (let i = 0; i < 9; i++) {
                    const coordinates = [...boxCoordinates[i]];
                    coordinates[0] += y;
                    coordinates[1] += x;
                    if (cur.includes(board[coordinates[0]][coordinates[1]])) {
                        return false;
                    } else if (board[coordinates[0]][coordinates[1]] !== "") {
                        cur.push(board[coordinates[0]][coordinates[1]]);
                    }
                }
            }
        }
        return true;
    }

    return [solveRecursive, solveIterative];
};

export default useSolveSudoku;
