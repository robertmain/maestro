var youtube = require('youtube-feeds');
playlist = [];
var now_playing = 0;
function init(server, io){
	io.sockets.on('connection', function(socket){
		io.sockets.emit('sync', {now_playing: now_playing, playlist: playlist});

		socket.on('add_song', function(video_id){
			youtube.video(video_id, function(err, video){
				playlist.push(video);
				io.sockets.emit('sync', {now_playing: now_playing, playlist: playlist});
			});
		});

		socket.on('remove_song', function(video){
			var indexOfVideo = playlist.indexOf(video);
			if(now_playing == indexOfVideo){
				if(now_playing < playlist.length){
					now_playing += 1;
				}
			}
			playlist.splice(indexOfVideo, 1);
			io.sockets.emit('sync', {now_playing: now_playing, playlist: playlist});
		});
	});
}

exports.init = init;