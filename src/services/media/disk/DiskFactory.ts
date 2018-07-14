// tslint:disable-next-line:no-var-requires
const ffmpeg = require('fluent-ffmpeg');
import * as path from 'path';

import { Injectable, Module } from '@nestjs/common';
import AudioFactory from '../AudioFactory';
import DiskSource from './DiskSource';
import Song from 'Song';

@Module({
    providers: [DiskSource, Song],
})

@Injectable()
export default class DiskFactory implements AudioFactory {

    constructor(
        private readonly _config: any,
        private readonly _disk_source: DiskSource,
    ) { }

    public getSong(file_path: string): Promise<Song> {
        return new Promise((resolve, reject) => ffmpeg.ffprobe(this._config.songs_directory + path.sep + file_path, (err, stream_metadata) => {
            if (err) {
                reject(err);
            } else {
                const id3_data = stream_metadata.format.tags || {};
                resolve(new Song(
                    file_path,
                    stream_metadata.streams[0].duration,
                    this._disk_source,
                    stream_metadata.streams[0].sample_rate,
                    id3_data.title || undefined,
                    id3_data.artist || undefined,
                    id3_data.album || undefined,
                    (typeof id3_data.genre === 'undefined') ? undefined : id3_data.genre.split(';'),
                ));
            }
        }));
    }

}
