import { Readable } from 'stream';
import { Injectable } from '@nestjs/common';
import AudioSource from './AudioSource';
import { SongMetaData } from './types';

/**
 * Provides an encapsulation layer for both song metadata and the audio stream of a given song.
 *
 * **Note:** It is highly recommended to use an [[AudioFactory]] implementation to instanciate this class rather than
 *           doing it manually. This is to ensure that the correct metadata and audio stream retrieval method(s) are
 *           bound correctly.
 */
@Injectable()
export default class Song {
    public readonly identifier: string;

    public readonly duration: number;

    public readonly audioSource: AudioSource;

    public readonly sampleRate: number;

    public readonly title: string;

    public readonly artist: string;

    public readonly album: string;

    public readonly genre: string[];

    public constructor(
        identifier: string,
        audioSource: AudioSource,
        {
            duration,
            sampleRate,
            title,
            artist,
            album,
            genre,
        }: SongMetaData
    ) {
        this.identifier = identifier;
        this.audioSource = audioSource;
        this.duration = duration;
        this.sampleRate = sampleRate || 44100;
        this.title = title || 'Title Unavailable';
        this.artist = artist || 'Unknown Artist';
        this.album = album || 'Unknown Album';
        this.genre = genre || ['Unknown Genre'];
    }

    /**
     * Wraps an implementation of [[AudioSource]] to provide a stream of audio for any given song.
     *
     * @example
     * ```ts
     * const speaker = require('speaker');
     * const s = new Song('song.mp3', 200, new DiskSource());
     *
     * s.getAudio().pipe(speaker);
     * ```
     *
     * @returns {Readable} A readable stream of audio for the current song
     * @memberof Song
     */
    public getAudio(): Readable {
        return this.audioSource.getAudio(this.identifier);
    }
}
