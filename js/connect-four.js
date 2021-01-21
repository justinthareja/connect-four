var Connect4 = (function MakeConnect4(EVT) {
    var isPlayerOnesTurn = true;
    var board = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
    ];

    EVT.on("init", init);
    EVT.on("play", play);
    EVT.on("restart", restart);

    function init() {
        EVT.emit("render", board);
    }

    function checkCols() {
        var columns = [];

        for (let col = 0; col <= 6; col++) {
            let column = [];

            for (let row = board.length - 1; row >= 0; row--) {
                let piece = getPiece([row, col]);
                column.push(piece)
            }

            columns.push(column);
        }

        columns = columns.map(hasFourInARow);

        return columns.includes(true);
    }

    function checkRows() {
        var rows = board;

        rows = rows.map(hasFourInARow);

        return rows.includes(true);
    }

    function checkDiagonals() {
        var diagonals = [
            // BOTTOM LEFT -> TOP RIGHT
            [[3, 0], [2, 1], [1, 2], [0, 3]],
            [[4, 0], [3, 1], [2, 2], [1, 3], [0, 4]],
            [[5, 0], [4, 1], [3, 2], [2, 3], [1, 4], [0, 5]],
            [[5, 1], [4, 2], [3, 3], [2, 4], [1, 5], [0, 6]],
            [[5, 2], [4, 3], [3, 4], [2, 5], [1, 6]],
            [[5, 3], [4, 4], [3, 5], [2, 6]],

            // TOP LEFT -> BOTTOM RIGHT
            [[2, 0], [3, 1], [4, 2], [5, 3]],
            [[1, 0], [2, 1], [3, 2], [4, 3], [5, 4]],
            [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5]],
            [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]],
            [[0, 2], [1, 3], [2, 4], [3, 5], [4, 6]],
            [[0, 3], [1, 4], [2, 5], [3, 6]]
        ];

        diagonals = diagonals.map(getPieces);
        diagonals = diagonals.map(hasFourInARow);

        return diagonals.includes(true);
    }

    function printBoard() {
        var print = "";

        board.forEach(function printRow(col) {
            print += JSON.stringify(col);
            print += "\n";
        });

        console.log(print);
    }

    function hasWinner() {
        return checkCols() || checkRows() || checkDiagonals();
    }

    function isValidColumn(col) {
        for (let row = board.length - 1; row >= 0; row--) {
            if (board[row][col] == 0) {
                return true;
            }
        }

        return false;
    }

    function hasFourInARow(array) {
        var count = 0;
        var max = 0;
        var target = getPlayer();

        array.forEach(function countVal(val) {
            if (val == target) {
                count++;
            } else {
                count = 0;
            }

            if (count > max) {
                max = count;
            }
        });

        return max >= 4;
    }

    function getPieces(coords) {
        return coords.map(getPiece);
    }

    function getPiece(coord) {
        var [row, col] = coord;

        if (row == null || col == null) {
            throw new Error("Cannot get piece, invalid coordinate");
        }

        return board[row][col];
    }

    function setPiece(col) {
        for (let row = board.length - 1; row >= 0; row--) {
            if (board[row][col] == 0) {
                board[row][col] = getPlayer();
                return;
            }
        }

        throw new Error ("Couldn't set piece");
    }

    function getPlayer() {
        return isPlayerOnesTurn ? 1 : 2;
    }

    function togglePlayerTurn() {
        isPlayerOnesTurn = !isPlayerOnesTurn;
    }

    function play(col) {
        if (hasWinner()) {
            EVT.emit("game-over");
            return;
        }

        if (!isValidColumn(col)) {
            EVT.emit("column-full");
            return;
        } 

        setPiece(col);
        EVT.emit("render", board);

        if (hasWinner()) {
            EVT.emit("player-wins", getPlayer());
            return;
        } 

        togglePlayerTurn();
        EVT.emit("player-turn", getPlayer());
        return;
    };

    function clearBoard() {
        board = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
        ];
    }
    
    function restart() {
        isPlayerOnesTurn = true;
        
        clearBoard();

        EVT.emit("render", board);
    }

    var publicAPI = {};

    return publicAPI;
})(EVT);