var Modal = (function MakeModal(EVT) {
    var $modal, $modalOverlay;
    var $closeButton, $restartButton;
    
    EVT.on("init", init);
    EVT.on("player-wins", playerWins)

    function init () {
        $modal = document.querySelector("[rel=js-modal]");
        $modalOverlay = document.querySelector("[rel=js-modal-overlay]");
        $closeButton = document.querySelector("[rel=js-close]");
        $restartButton = document.querySelector("[rel=js-restart]");

        $closeButton.addEventListener("click", handleCloseButtonClick);
        $modalOverlay.addEventListener("click", handleModalOverlayClick);
        $restartButton.addEventListener("click", handleRestartButtonClick);
    }

    function handleModalOverlayClick(event) {
        event.preventDefault();
        toggleModal();
    }

    function handleCloseButtonClick(event) {
        event.preventDefault();
        toggleModal();
    }

    function handleRestartButtonClick(event) {
        event.preventDefault();
        toggleModal();
        EVT.emit("restart");
    }
    
    function toggleModal() {
        $modal.classList.toggle("closed");
        $modalOverlay.classList.toggle("closed");
    }

    function playerWins() {
        toggleModal();
    }

    var publicAPI = {
        toggleModal,
    };
    
    return publicAPI;

})(EVT);
