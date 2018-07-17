/**
 * @hidden
 */
// tslint:disable-next-line:no-var-requires
const ffmpeg = require('fluent-ffmpeg');
import * as path from 'path';

import { Injectable, Module } from '@nestjs/common';
import AudioFactory from '../AudioFactory';
import DiskSource from './DiskSource';
import Song from 'Song';

/**
 * Instanciates [[Song]]s using audio from the filesytem and provides the file system strategy for audio and metadata
 * retrieval
 */
@Module({
    providers: [DiskSource, Song],
})
@Injectable()
export default class DiskFactory implements AudioFactory {

    /**
     * Create a new song factory instance that produces songs for files on the local filesystem

     * @param {*}          _config      The contents of [[config.adapters.disk]]
     * @param {DiskSource} _disk_source An implementation of [[AudioSource]] used to generate an audio stream for audio
     *                                  from the local disk
     *
     * @memberof DiskFactory
     */
    constructor(
        private readonly _config: any,
        private readonly _disk_source: DiskSource,
    ) { }

    /**
     * Instanciates a [[Song]] for you with the correct metadata and audio retrieval strategy bound. This implementation
     * instanciates songs from the local disk.
     *
     * @param {string} file_path The path to a song relative to [[config.adapters.disk.songs_directory]]
     *
     * @returns {Promise<Song>}
     *
     * @memberof DiskFactory
     */
    public getSong(file_path: string): Promise<Song> {
        const full_path = this._config.songs_directory + path.sep + file_path;
        return new Promise((resolve, reject) => ffmpeg.ffprobe(full_path, (err, stream_metadata) => {
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
