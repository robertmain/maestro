var self
module.exports = exports = self = {};

self.webserver = {
	"ip": "0.0.0.0",
	"port": parseInt(process.argv[2]) || 8000
};

self.application = {
	name: "Node Jukebox",
	slogan: "Use youtube as a JukeBox!"
};