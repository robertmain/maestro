import * as TypeMoq from 'typemoq';
import { Readable } from 'stream';

import Song from '../../src/Song';
import AudioSource from '../../src/services/media/AudioSource';

describe('A song', () => {

    describe('identifier', () => {
        const song = new Song('song.mp3', 30, {} as AudioSource);

        it('represents the location of a single file', () => {
            expect(song).toHaveProperty('identifier');
            expect(song.identifier).toBe('song.mp3');
            expect(typeof song.identifier).toBe('string');
        });
    });

    describe('duration', () => {
        const song = new Song('song.mp3', 30, {} as AudioSource);
        it('represents the length of the song in seconds', () => {
            expect(song).toHaveProperty('duration');
            expect(song.duration).toBe(30);
            expect(song.duration).toBeGreaterThan(0);
        });

        it('is an integral number', () => {
            expect(Number.isInteger(song.duration)).toBeTruthy();
        });
    });

    describe('stream adapter', () => {
        const song = new Song('song.mp3', 30, {} as AudioSource);
        it('provides a mechanism for audio retrieval', () => {
            expect(song).toHaveProperty('audio_source');
        });
    });

    describe('sample rate', () => {
        it('provides the song sample rate', () => {
            const song = new Song('song.mp3', 30, {} as AudioSource, 30);
            expect(song.sample_rate).toBeGreaterThan(0);
            expect(song.sample_rate).toBe(30);
        });

        it('defaults to 44100', () => {
            const song = new Song('song.mp3', 30, {} as AudioSource);
            expect(song.sample_rate).toBe(44100);
        });

        it('is an integral number', () => {
            const song = new Song('song.mp3', 30, {} as AudioSource);
            expect(Number.isInteger(song.sample_rate)).toBeTruthy();
        });
    });

    describe('title', () => {
        it('represents the title field of song metadata', () => {
            const song = new Song('song.mp3', 30, {} as AudioSource, undefined, 'Graceland');
            expect(song.title).toBe('Graceland');
        });

        it('provides a default value if omitted', () => {
            const song = new Song('song.mp3', 30, {} as AudioSource);
            expect(song.title).toBe('Title Unavailable');
        });
    });

    describe('artist', () => {
        it('represents the artist field of song metadata', () => {
            const song = new Song('song.mp3', 30, {} as AudioSource, undefined, undefined, 'Paul Simon');
            expect(song.artist).toBe('Paul Simon');
        });

        it('defaults to "Unknown Artist"', () => {
            const song = new Song('song.mp3', 30, {} as AudioSource);
            expect(song.artist).toBe('Unknown Artist');
        });
    });

    describe('album', () => {
        it('represents the album field of song metadata', () => {
            const song = new Song('song.mp3', 30, {} as AudioSource, undefined, undefined, undefined, 'Graceland');
            expect(song.album).toBe('Graceland');
        });

        it('defaults to "Unknown Album"', () => {
            const song = new Song('song.mp3', 30, {} as AudioSource);
            expect(song.album).toBe('Unknown Album');
        });
    });

    describe('genre', () => {
        it('represents the genre field of song metadata', () => {
            const song = new Song('song.mp3', 30, {} as AudioSource, undefined, undefined, undefined, undefined, ['Pop/Worldbeat']);
            expect(song.genre).toMatchObject(['Pop/Worldbeat']);
        });

        it('defaults to "Unknown Genre"', () => {
            const song = new Song('song.mp3', 30, {} as AudioSource);
            expect(song.genre).toMatchObject(['Unknown Genre']);
        });
    });

    describe('getAudio method', () => {
        it('provides an audio retrieval strategy stream for a given song', () => {
            const mockAdapter: TypeMoq.IMock<AudioSource> = TypeMoq.Mock.ofType<AudioSource>();
            mockAdapter
                .setup(adapter => adapter.getAudio('song.mp3'))
                .returns(() => new Promise<Readable>(() => {}));

            const song = new Song('song.mp3', 30, mockAdapter.object);
            const audio_promise = song.getAudio();

            mockAdapter.verify(adapter => adapter.getAudio('song.mp3'), TypeMoq.Times.once());
            expect(audio_promise).toBeInstanceOf(Promise);
        });
    });

});
