var app = require('http').createServer()
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(process.env.PORT || 8080);

io.on('connection', function(socket) {
	socket.on('speak', function(data) {
		var voice = data.voice
		var message = "" + data.message;
		socket.broadcast.emit("speaking", {
			voice: voice,
			message: message
		});
	});
});
