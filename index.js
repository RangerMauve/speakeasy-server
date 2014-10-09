var express = require("express");
var app = express();
var server = require('http').Server(app);

app.disable('x-powered-by');

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', "*");
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.header('Access-Control-Allow-Credentials', false);
	next();
});

console.log("Listening")
app.listen(process.env.PORT || 8080);
