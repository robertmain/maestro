var self
module.exports = exports = self = {};
/* These are relative to the app root */
self.directories = {
	"slides": "./slides",
	"slide_templates": "./slide-templates"
};

self.webserver = {
	"ip": "0.0.0.0",
	"port": parseInt(process.argv[2]) || "8000"
};

self.application = {
	name: "Node Jukebox",
	slogan: "Use youtube as a JukeBox!"
};