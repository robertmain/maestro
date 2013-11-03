/**
* Includes and imports
*/
var express = require('express')
	, ip = require('ip')
	, config = require('./config/config.js')
	, cons = require('consolidate')
	, app = express()
	, server = require('http').createServer(app)
	, io = require('socket.io').listen(server);

/**
* Global vars
*/
var data = {};
var clients = [];

/**
* Socket.IO Event Handlers
*/
io.sockets.on('connection', function(socket){
	clients.push(socket);
	socket.on('search', function(data){
		console.log(data);
	});	
	socket.on('test-connection', function(data){
		console.log("Success!");
		socket.emit('result', {result: "success!"});
	})
	socket.on('disconnect', function(){
		clients.splice(clients.indexOf(socket), 1);
	});
});

/**
* Express Framework Stuff
*/
app.configure(function(){
	app.engine('htm', cons.just);
	app.set('view_engine', 'htm');
	app.set('views', __dirname + '/public');
	app.use(express.static("public"));
});

app.get("/", function(req, res){
	data.config = config;
	res.render("index.htm", data);
});

/**
* Set the server up and spit out the IP and port
*/
server.listen(config.webserver.port);
console.log("Server Now Listening On Port " + ip.address() + ":" + config.webserver.port);