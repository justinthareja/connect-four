var Header = (function MakeHeader(EVT) {
    var $header, $restartButton;

    EVT.on("init", init);

    function init () {
        $header = document.querySelector("header");
        $restartButton = document.querySelector("[rel=js-menu-restart]");

        $restartButton.addEventListener("click", handleRestartButtonClick);
    }

    function handleRestartButtonClick(event) {
        event.preventDefault();
        EVT.emit("restart");
    }

    var publicAPI = {};

    return publicAPI;
})(EVT);