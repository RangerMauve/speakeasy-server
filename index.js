var express = require("express");
var app = express();
var server = require('http').Server(app);
var fs = require('fs');

app.disable('x-powered-by');

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', "*");
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.header('Access-Control-Allow-Credentials', false);
	next();
});

var io = require('socket.io').listen(server, {
	origins: "*"
});

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

console.log("Listening")
app.listen(process.env.PORT || 8080);
