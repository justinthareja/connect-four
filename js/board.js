(function (EVT, Connect4) {
    var $board;
    var connect4 = new Connect4();

    function init() {
        $board = document.querySelector("[rel=js-board]");
        $board.addEventListener("click", handleBoardClick);
    }

    function handleBoardClick(event) {
        console.log("board clicked!");
    }
    
    EVT.on("init", init);
    
    var publicAPI = {};

    return publicAPI

})(EVT, Connect4);
