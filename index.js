var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/public', express.static(__dirname + '/public'));

io.on('connection', function(socket) {
	socket.on('chat message', function(msg) {
		io.emit('chat message', msg);
	});
});

io.on('connection', function(socket){
	socket.on('click', function(){
		io.emit('startCount');
	});
});

io.on('connection', function(socket){
	socket.on('fin', function(){
		socket.emit('break');
	});
});

io.on('connection', function(socket){
	socket.on('update', function(){
		socket.emit('updateCount');
	});
});

app.use('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

http.listen(3000, function() {
	console.log('listening on *:3000');
}); 