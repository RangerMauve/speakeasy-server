var express = require("express");
var app = express();
var server = require('http').Server(app);
var shoe = require("shoe");
var events = new(require("events").EventEmitter);
var par = require("par");

var nodes = [];

app.disable('x-powered-by');

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', "*");
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.header('Access-Control-Allow-Credentials', false);
	next();
});

var sock = shoe(function(stream) {
	var node = dnode({
		say: say_all
	});
	add_user(node);
	stream.on("end", par(remove_user, node));
	node.pipe(stream).pipe(node);
});

function say_all(data) {
	nodes.forEach(node.handle_speak.bind(node, data));
}

function add_user(node) {
	nodes.push(node);
}

function remove_user(node) {
	nodes = nodes.filter(function(n) {
		return n !== node;
	})
}

// Installing dnode
sock.install(server, '/speakeasy');

console.log("Listening");
app.listen(process.env.PORT || 8080);
