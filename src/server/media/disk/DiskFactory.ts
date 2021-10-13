/**
 * @hidden
 */
import { resolve } from 'path';
import { Inject, Injectable } from '@nestjs/common';
import { FFProbe, SCANNER } from 'server/ffmpeg/ffmpeg.module';
import AudioFactory from '../AudioFactory';
import DiskSource from './DiskSource';
import Song from '../../Song';
import { DiskFactoryConfiguration } from '../types';

@Injectable()
export default class DiskFactory implements AudioFactory {
    private readonly _config: DiskFactoryConfiguration;

    private _diskSource: DiskSource;

    private probe: FFProbe;

    /**
     * Create a new song factory instance that produces songs for files on the local filesystem

     * @param {DiskFactoryConfiguration} config A configuration object that provides the settings for this factory. In this case, just the library loction
     * @param {DiskSource} diskSource An implementation of [[AudioSource]] used to generate an audio stream for audio from the local disk
     * @param {FFProbe} probe An instance of ffprobe for reading file metadata
     *
     * @memberof DiskFactory
     */
    public constructor(
    @Inject(DiskFactoryConfiguration) config: DiskFactoryConfiguration,
        @Inject(DiskSource) diskSource: DiskSource,
        @Inject(SCANNER.FFPROBE) probe: FFProbe
    ) {
        this._config = config;
        this._diskSource = diskSource;
        this.probe = probe;
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
        const fullPath = resolve(this._config.libraryDirectory, filePath);
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
        } = await this.probe(fullPath);

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
