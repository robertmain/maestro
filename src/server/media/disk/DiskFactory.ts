/**
 * @hidden
 */
import { sep } from 'path';

import { Injectable, Module } from '@nestjs/common';
import ffmpeg, { FfprobeData } from 'fluent-ffmpeg';
import { promisify } from 'util';
import AudioFactory from '../AudioFactory';
import DiskSource from './DiskSource';
import Song from '../../Song';
import { config } from '../../config';

const probe = promisify(ffmpeg.ffprobe);

/**
 * Instanciates [[Song]]s using audio from the filesytem and provides the file system strategy for audio and metadata
 * retrieval
 */
@Module({
    providers: [DiskSource, Song],
})
@Injectable()
export default class DiskFactory implements AudioFactory {
    private readonly _config: any;

    private readonly _diskSource: DiskSource;

    /**
     * Create a new song factory instance that produces songs for files on the local filesystem

     * @param {*}          _config      The contents of [[config.adapters.disk]]
     * @param {DiskSource} _diskSource An implementation of [[AudioSource]] used to generate an audio stream for audio
     *                                  from the local disk
     *
     * @memberof DiskFactory
     */
    public constructor(
        _config: any,
        _diskSource: DiskSource
    ) {
        this._config = config;
        this._diskSource = _diskSource;
    }

    /**
     * Instanciates a [[Song]] for you with the correct metadata and audio retrieval strategy bound. This implementation
     * instanciates songs from the local disk.
     *
     * @param {string} filePath The path to a song relative to [[config.adapters.disk.songs_directory]]
     *
     * @returns {Promise<Song>}
     *
     * @memberof DiskFactory
     */
    public async getSong(filePath: string): Promise<Song> {
        const fullPath = this._config.songsDirectory + sep + filePath;
        const {
            streams: [{
                sample_rate: sampleRate,
            }],
            format: {
                duration,
                tags: {
                    title,
                    artist,
                    album,
                    genre,
                },
            },
        } = await probe(fullPath) as FfprobeData;
        return new Song(
            filePath,
            this._diskSource,
            {
                duration,
                sampleRate,
                title,
                artist,
                album,
                genre: typeof genre === 'undefined'
                    ? undefined : genre.split(';'),
            }
        );
    }
}
