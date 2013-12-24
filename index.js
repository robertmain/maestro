/**
* Includes and imports
*/
var express = require('express')
	, ip = require('ip')
	, request = require('request')
	, config = require('./config/config.js')
	, cons = require('consolidate')
	, app = express()
	, server = require('http').createServer(app)
	, io = require('socket.io').listen(server)
	, mdns = require('mdns')
	, stdio = require('stdio') //For help on how to use the stdio mod see this: http://stackoverflow.com/questions/4351521/how-to-pass-command-line-arguments-to-node-js
	, video = require('./video')
	, youtube = require('youtube-feeds')
	, playlist = require('./playlist');

/**
* Global vars
*/
var data = {};
var clients = [];

/**
* Socket.IO Event Handlers for Main Application
*/
io.sockets.on('connection', function(socket){
	clients.push(socket);
	socket.on('search', function(data){
		youtube.feeds.videos({"q": data.query}, function(err, response){
			socket.emit('youtube-search-results', response);
		});
	});
	socket.on('disconnect', function(){
		clients.splice(clients.indexOf(socket), 1);
	});
	socket.on('play', function(data){
		video.getInfo(data, function(data){
			video.play(data);
		});
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
console.log(config.application.name + " Now Listening On " + ip.address() + ":" + config.webserver.port);
server.listen(config.webserver.port);
playlist.init(server, io);

/** 
* Announce ourselves on the network so that clients can find us
*/
mdns.createAdvertisement(
	mdns.tcp("jukebox"),
	config.webserver.port,
	{
		name: config.application.name,
		txtRecord: {}
	}
);