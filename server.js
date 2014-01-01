
var express = require('express');
// var app = express.createServer();
var app = express();
var socket = require('socket.io');
app.configure(function(){
    app.use(express.static(__dirname + '/'));
});
var server = app.listen(8000);
var io = socket.listen(server);
io.set('log level', 2);


setInterval(function(){
    var n = Math.floor((Math.random()*100)+1);
    var msg = {'text': n.toString()}
    io.sockets.emit('message', JSON.stringify(msg))
}, 4000);


io.sockets.on('connection', function (socket) {
    console.log('Client connected from: ' + socket.handshake.address.address);
    setTimeout(function () {
        socket.send(JSON.stringify({'text': 'waited 2 seconds'}) );
    }, 2000);

    socket.on('disconnect', function (socket) {
        console.log("disconnect");
    });
});
