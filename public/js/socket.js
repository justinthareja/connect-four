var socket = io();

socket.on("play", function(col) {
    EVT.emit("play", col);
});


