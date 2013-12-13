var querystring = require('querystring'),
	parseString = require('xml2js').parseString,
	stream = require('stream'),
	request = require('request');

function getInfo (video_id, callback){
	request('http://www.youtube.com/get_video_info?video_id='  + video_id, function (error, response, video_info) {
		if (!error && response.statusCode == 200) {
			video_info = querystring.parse(video_info);
			video_info.url_encoded_fmt_stream_map = querystring.parse(querystring.unescape(video_info.url_encoded_fmt_stream_map));
			video_info.dashmpd = querystring.unescape(video_info.dashmpd);
			request(video_info.dashmpd, function(error, response, mpdXML){
				parseString(mpdXML, function(err, result){
					video_info.keywords = video_info.keywords.split(",");
					callback({
						'title': video_info.title,
						'author': video_info.author,
						'duration' : 
						'audioURL': (result.MPD.Period[0].AdaptationSet[0].Representation[0].BaseURL[0]._)
					});
				});
			});
		}
		else{
			console.log("Error Fetching Video Info", error)
		}
	});
	return this;
}

function play(video_info){
	request(video_info.audioURL, function(error, response, responseBody){
		var length = nextSong.duration;
		var bit_rate = 322; //Just a guess to make the fucking thing make some kind of noise.
		var throttle = new Throttle(bit_rate / 8);
		var decoder = new lame.Decoder();
		decoder.on('data', function(data) {
			encoder.write(data);
		});
		fs.createReadStream(nextSong.fullpath).pipe(throttle);
			throttle.pipe(decoder);
		});
}

exports.getInfo = getInfo;
exports.play = play;