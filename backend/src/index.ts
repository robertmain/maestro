import SongDiskFactory from './media_providers/disk/DiskStrategy';
import * as ffmpeg from 'fluent-ffmpeg';
import * as Speaker from 'speaker';

let f = new SongDiskFactory();

let song_object = f.getSong('C:\\Users\\robert\\Desktop\\jukebox-songs\\ATC - Around The World (HQ).mp3');

song_object.then((song) => {
    console.log('Now playing: ' + song.artist + ' - ' + song.title);
    song.getAudio().then((audio_stream) => {
        ffmpeg(audio_stream)
        .toFormat('wav')
        .pipe(new Speaker());
    });
})
.catch((e : Error) => {
    console.log(e)
})