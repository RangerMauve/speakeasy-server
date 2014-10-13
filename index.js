var WebSocketServer = require('ws').Server
var websocket = require('websocket-stream');
var events = new(require("events").EventEmitter);
var par = require("par");
var dnode = require("dnode");

var nodes = [];

console.log("Listening");
var wss = new WebSocketServer({
	port: process.env.PORT || 8080,
	path: "/speakeasy"
});

wss.on("connection", function(ws) {
	console.log("Got remote stream");
	var stream = websocket(ws);
	var d = dnode({
		say: say_all
	});
	d.on("remote", function(node) {
		add_user(node);
		stream.on("end", par(remove_user, node));
	})
	d.pipe(stream).pipe(d);
});

function say_all(data) {
	console.log("Saying",data);
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
