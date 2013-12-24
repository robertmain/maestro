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
	request('http://www.youtube.com/get_video_info?video_id='  + video_id, function (error, response, video_info) {
		if (!error && response.statusCode == 200) {
			video_info = querystring.parse(video_info);
			video_info.url_encoded_fmt_stream_map = querystring.parse(querystring.unescape(video_info.url_encoded_fmt_stream_map));
			video_info.dashmpd = querystring.unescape(video_info.dashmpd);
			request(video_info.dashmpd, function(error, response, mpdXML){
				parseString(mpdXML, function(err, result){
					//video_info.keywords = video_info.keywords.split(",");
					callback({
						'title': video_info.title,
						'author': video_info.author,
						'duration' : (result.MPD.Period[0].AdaptationSet[0].Representation[0].BaseURL[0].$["yt:contentLength"]),
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
	// request(video_info.audioURL).pipe(new lame.Decoder).on('format', console.log).pipe(new speaker); //Plays a remote MP3 perfectly, just not an m4a
	var proc = new ffmpeg({ source: video_info.audioURL, nolog: true })
	.toFormat('wav')
	.writeToStream(new speaker, function(retcode, error){
		if(error){
			console.log(error);
		}
		else{
			console.log("Conversion completed");
		}
	});
	// .saveToFile(video_info.title + ".wav", function(retcode, error){
	// 	if(error){
	// 		console.error(error);
	// 	}
	// 	else{	
	// 		consoe.log('file has been converted succesfully');
	// 	}
	// });
}

exports.getInfo = getInfo;
exports.play = play;