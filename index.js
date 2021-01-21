const express = require("express");
const app = express();
const port = 3000;
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });

    socket.on("play", (...args) => {
        io.emit("play", ...args);
    });
});

http.listen(port, () => {
    console.log('listening on *:3000');
});