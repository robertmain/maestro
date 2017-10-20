import * as ffmpeg from 'fluent-ffmpeg';
import * as path from 'path';

import AudioFactory from '../AudioFactory';
import Song from '../../Song';
import DiskSource from './DiskSource';

export default class DiskFactory implements AudioFactory{

    constructor(readonly songs_directory : string){
    }

    public getSong(file_path: string): Promise<Song> {
        return new Promise((resolve, reject) => ffmpeg(this.songs_directory + path.sep + file_path).ffprobe( (err, stream_metadata) => {
            if (err) {
                reject(err)
            } else {
                let id3_data = stream_metadata.format.tags;
                resolve(new Song(
                    this.songs_directory + path.sep + file_path,
                    stream_metadata.streams[0].duration,
                    new DiskSource(),
                    stream_metadata.streams[0].sample_rate,
                    id3_data.title,
                    id3_data.artist,
                    id3_data.album,
                    id3_data.genre
                ));
            }
        }))
    }

}
