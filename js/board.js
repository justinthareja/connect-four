var Board = (function MakeBoard(EVT) {
    var $board;

    EVT.on("init", init);
    EVT.on("render", render);
    EVT.on("animate-piece", animatePiece);

    function init() {
        $board = document.querySelector("[rel=js-board]");
        $board.addEventListener("click", handleBoardClick);
    }

    function handleBoardClick(event) {
        let $row;
        let $cell;

        if (event.target.matches("[rel*=js-cell]")) {
            $row = event.target.parentElement;
            $cell = event.target;
        } else if (event.target.matches(".piece")) {
            $row = event.target.parentElement.parentElement;
            $cell = event.target.parentElement;
        }

        if (!$row || $cell) return;

        event.preventDefault();

        let columnIndex = Array.from($row.children).findIndex(function matchCell(cell){
            return cell == $cell;
        });

        EVT.emit('play', columnIndex);
    }

    // Takes a board array and returns the corresponding HTML string
    function template(board) {
        var html = "";

        board.forEach(function renderRow(row) {
            html += `<div class="board-row">`;
            
            row.forEach(function renderCell(cell, i) {
                let classNames = "board-cell"
                if (cell == 1) classNames += " red";
                if (cell == 2) classNames += " yellow";

                html += (`
                    <div class="${classNames}" rel="js-cell-${i}"></div>
                `)
            });

            html += `</div>`;
        });

        return html;
    }

    function render(board) {
        $board.innerHTML = template(board);
    }


    function animatePiece(currentPlayer, coords) {
        // This needs to correspond to the .board-cell total box height
        const CELL_HEIGHT = 60; 
        const [rowIndex, columnIndex] = coords;
        const distance = rowIndex * CELL_HEIGHT;
        const color = currentPlayer == 1 ? "red" : "yellow";
        
        // The board must already be rendered before animating
        const $firstRow = $board.children[0];
        const $col = $firstRow.children[columnIndex];
        
        let $piece = document.createElement("div");

        $piece.classList.toggle("piece");
        $piece.classList.toggle(color);
        $col.appendChild($piece);

        // Bump the transform to the callback queue to ensure the 
        // $piece is appended before updating its style property
        // to trigger the animation
        setTimeout(() => {
            $piece.style.transform = `translateY(${distance}px)`;
        }, 0);
    }
    
    var publicAPI = {};
    
    return publicAPI
})(EVT);
