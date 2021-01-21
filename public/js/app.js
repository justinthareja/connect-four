var EVT = new EventEmitter2();

window.addEventListener("DOMContentLoaded", function init() {
    EVT.emit("init");
});
