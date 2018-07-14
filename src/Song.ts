import { Readable } from 'stream';
import { Injectable } from '@nestjs/common';
import AudioSource from 'services/media/AudioSource';

@Injectable()
export default class Song {

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
     * @param audio_source Every song should know how to play itself, so an implementation of [[AudioSource]] is
     *                     attached to every song object facilitate this
     * @param sample_rate  The sample rate of a song, this is usually safe to leave at 44100
     *                     (just pass `undefined` in and it will default to 44100)
     * @param title        The song title (song metadata - this is displayed to the user)
     * @param artist       The song artist (song metadata - this is displayed to the user)
     * @param album        The song album (song metadata - this is displayed to the user)
     * @param genre        The song genre(s) (song metadata - this is displayed to the user). Some songs do have more
     *                     than one genre, which is why this is an array of strings, rather than just a string.
     */
    public constructor(
        readonly identifier  : string,
        readonly duration    : number,
        readonly audio_source: AudioSource,
        readonly sample_rate : number   = 44100,
        readonly title       : string   = 'Title Unavailable',
        readonly artist      : string   = 'Unknown Artist',
        readonly album       : string   = 'Unknown Album',
        readonly genre       : string[] = ['Unknown Genre'],
    ) {

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
        return this.audio_source.getAudio(this.identifier);
    }
}
