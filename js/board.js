(function (EVT, Connect4) {
    var $board;
    var connect4 = new Connect4();

    function init() {
        $board = document.querySelector("[rel=js-board]");
        $board.addEventListener("click", handleBoardClick);

        render();
    }

    function handleBoardClick(event) {
        console.log("hi");
    }

    // Takes a board array and returns the corresponding HTML string
    function template(board) {
        var html = "";

        board.forEach(function renderRow(row) {
            html += `<div class="board-row">`;
            
            row.forEach(function renderCell(cell) {
                let classNames = "board-cell"
                if (cell == 1) classNames += " red";
                if (cell == 2) classNames += " yellow";

                html += `<div class="${classNames}" rel="js-cell"></div>`;
            });

            html += `</div>`;
        });

        return html;
    }

    function render() {
        $board.innerHTML = template(connect4.board);
    }

    EVT.on("init", init);
    
    var publicAPI = {};

    return publicAPI

})(EVT, Connect4);
