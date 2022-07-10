/**
 * @hidden
 */
import { resolve } from 'path';
import { Inject, Injectable } from '@nestjs/common';
import { FFProbe, SCANNER } from 'server/ffmpeg/ffmpeg.module';
import AudioFactory from '../AudioFactory';
import DiskSource from './DiskSource';
import Song from '../Song';
import { LIBRARY_URL } from '../types';

@Injectable()
export default class DiskFactory implements AudioFactory {
    @Inject(LIBRARY_URL)
    private library = '';

    @Inject(DiskSource)
    private diskSource: DiskSource;

    @Inject(SCANNER.FFPROBE)
    private probe: FFProbe;

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
        const fullPath = resolve(this.library, filePath);
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
            this.diskSource,
            {
                duration,
                sampleRate,
                title: title?.toString(),
                artist: artist?.toString(),
                album: album?.toString(),
                genre: genre?.toString()?.split(';') ?? undefined,
            }
        );
    }
}
