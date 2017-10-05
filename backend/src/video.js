var querystring = require('querystring'),
	parseString = require('xml2js').parseString,
	http = require('http'),
	stream = require('stream'),
	request = require('request'),
	fs = require('fs'),
	ffmpeg = require('fluent-ffmpeg'),
	lame = require('lame'),
	speaker = require('speaker');

function getInfo (video_id, callback){
	console.log(video_id);
	request('http://www.youtube.com/get_video_info?video_id='  + video_id, function (error, response, video_info) {
		if (!error && response.statusCode == 200) {
			video_info = querystring.parse(video_info);
			
			if(video_info.status == 'fail'){
				//socket.emit('error', function(){message: video_info.reason});
				console.log(video_info.reason);
			}
			else{
				video_info.url_encoded_fmt_stream_map = querystring.parse(querystring.unescape(video_info.url_encoded_fmt_stream_map));
				video_info.dashmpd = querystring.unescape(video_info.dashmpd);
				request(video_info.dashmpd, function(error, response, mpdXML){
					parseString(mpdXML, function(err, result){
						video_info.keywords = video_info.keywords.split(",");
						callback({
							'title': video_info.title,
							'author': video_info.author,
							'duration' : (result.MPD.Period[0].AdaptationSet[0].Representation[0].BaseURL[0].$["yt:contentLength"]),
							'audioURL': (result.MPD.Period[0].AdaptationSet[0].Representation[0].BaseURL[0]._),
							'keywords': video_info.keywords
						});
					});
				});
			}
		}
		else{
			console.log("Error Fetching Video Info", error)
		}
	});

	return this;
}

function play(video_info){
	console.log("Now Playing: " + video_info.title);
	var stream = request(video_info.audioURL);
	var speaker_instance = new speaker();
	var proc = new ffmpeg({source: stream, nolog: true}).toFormat('wav').writeToStream(speaker_instance);
	speaker_instance.on('error', function(err){
		console.error("ERROR: " + err);
	});
}

exports.getInfo = getInfo;
exports.play = play;