import SongDiskFactory from './media_providers/disk/DiskStrategy';
import * as ffmpeg from 'fluent-ffmpeg';
import * as Speaker from 'speaker';

let f = new SongDiskFactory('path/to/my/music/folder');

let song_object = f.getSong('mysong.mp3');

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