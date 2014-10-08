var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

app.listen(process.env.PORT || 8080);

app.disable('x-powered-by');

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', "http://" + req.headers.host + ':8000');

	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	next();
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
