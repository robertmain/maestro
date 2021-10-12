import { Readable } from 'stream';
import { Injectable } from '@nestjs/common';
import AudioSource from './media/AudioSource';

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

    /**
     *
     * Initialize a song object to be passeda around the application
     *
     * @example
     * ```ts
     * const s = new Song('song.mp3', 200, new DiskSource(), undefined, 'Graceland', 'Paul Simon', 'Graceland', ['Worldbeat']);
     * ```
     *
     * @param identifier   Song identifier (for example the filename or URL)
     * @param duration     The duration of the song in seconds
     * @param audioSource Every song should know how to play itself, so an implementation of [[AudioSource]] is
     *                     attached to every song object facilitate this
     * @param sampleRate  The sample rate of a song, this is usually safe to leave at 44100
     *                     (just pass `undefined` in and it will default to 44100)
     * @param title        The song title (song metadata - this is displayed to the user)
     * @param artist       The song artist (song metadata - this is displayed to the user)
     * @param album        The song album (song metadata - this is displayed to the user)
     * @param genre        The song genre(s) (song metadata - this is displayed to the user). Some songs do have more
     *                     than one genre, which is why this is an array of strings, rather than just a string.
     */
    public constructor(
        identifier: string,
        duration: number,
        audioSource: AudioSource,
        sampleRate = 44100,
        title = 'Title Unavailable',
        artist = 'Unknown Artist',
        album = 'Unknown Album',
        genre: string[] = ['Unknown Genre']
    ) {
        this.identifier = identifier;
        this.duration = duration;
        this.audioSource = audioSource;
        this.sampleRate = sampleRate;
        this.title = title;
        this.artist = artist;
        this.album = album;
        this.genre = genre;
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
