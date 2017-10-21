import DiskFactory from './media_providers/disk/DiskFactory';
import * as ffmpeg from 'fluent-ffmpeg';
import * as Speaker from 'speaker';


let f = new DiskFactory('C:\\Users\\robert\\Desktop\\jukebox-songs');
let song_object = f.getSong('callonme.mp3');

song_object.then((song) => {
    console.log('Now playing: ' + song.artist + ' - ' + song.title);
    song.getAudio().then((audio_stream) => {
        ffmpeg(audio_stream)
        .toFormat('wav')
        .pipe(new Speaker());
    });
})
.catch(() => {
    console.log('Unable to locate song on disk')
})