import { IMock, Mock, Times } from 'typemoq';
import { Readable } from 'stream';

import Song from '../Song';
import AudioSource from '../media/AudioSource';

describe('A song', (): void => {
    let mockAdapter: IMock<AudioSource>;

    beforeEach((): void => {
        mockAdapter = Mock.ofType<AudioSource>();
    });

    afterEach((): void => {
        mockAdapter.reset();
    });

    describe('identifier', (): void => {
        it('represents the location of a single file', (): void => {
            const song = new Song('song.mp3', mockAdapter.object, {
                duration: 30,
            });
            expect(song).toHaveProperty('identifier');
            expect(song.identifier).toBe('song.mp3');
            expect(typeof song.identifier).toBe('string');
        });
    });

    describe('duration', (): void => {
        it('represents the length of the song in seconds', (): void => {
            const song = new Song('song.mp3', mockAdapter.object, {
                duration: 30,
            });

            expect(song).toHaveProperty('duration');
            expect(song.duration).toBe(30);
            expect(song.duration).toBeGreaterThan(0);
        });

        it('is an integral number', (): void => {
            const {
                duration,
            } = new Song('song.mp3', mockAdapter.object, {
                duration: 30,
            });

            expect(Number.isInteger(duration)).toBeTruthy();
        });
    });

    describe('stream adapter', (): void => {
        it('provides a mechanism for audio retrieval', (): void => {
            const song = new Song('song.mp3', mockAdapter.object, {
                duration: 30,
            });
            expect(song).toHaveProperty('audioSource');
        });
    });

    describe('sample rate', (): void => {
        it('provides the song sample rate', (): void => {
            const {
                sampleRate,
            } = new Song('song.mp3', mockAdapter.object, {
                duration: 30,
                sampleRate: 30,
            });
            expect(sampleRate).toBeGreaterThan(0);
            expect(sampleRate).toBe(30);
        });

        it('defaults to 44100', (): void => {
            const { sampleRate } = new Song('song.mp3', mockAdapter.object, {
                duration: 30,
            });
            expect(sampleRate).toBe(44100);
        });

        it('is an integral number', (): void => {
            const { sampleRate } = new Song('song.mp3', mockAdapter.object, {
                duration: 30,
            });
            expect(Number.isInteger(sampleRate)).toBeTruthy();
        });
    });

    describe('title', (): void => {
        it('represents the title field of song metadata', (): void => {
            const song = new Song('song.mp3', mockAdapter.object, {
                duration: 30,
                title: 'Graceland',
            });
            expect(song.title).toBe('Graceland');
        });

        it('provides a default value if omitted', (): void => {
            const song = new Song('song.mp3', mockAdapter.object, {
                duration: 30,
            });
            expect(song.title).toBe('Title Unavailable');
        });
    });

    describe('artist', (): void => {
        it('represents the artist field of song metadata', (): void => {
            const song = new Song('song.mp3', mockAdapter.object, {
                duration: 30,
                artist: 'Paul Simon',
            });
            expect(song.artist).toBe('Paul Simon');
        });

        it('defaults to "Unknown Artist"', (): void => {
            const song = new Song('song.mp3', mockAdapter.object, {
                duration: 30,
            });
            expect(song.artist).toBe('Unknown Artist');
        });
    });

    describe('album', (): void => {
        it('represents the album field of song metadata', (): void => {
            const song = new Song('song.mp3', mockAdapter.object, {
                duration: 30,
                album: 'Graceland',
            });
            expect(song.album).toBe('Graceland');
        });

        it('defaults to "Unknown Album"', (): void => {
            const song = new Song('song.mp3', mockAdapter.object, {
                duration: 30,
            });
            expect(song.album).toBe('Unknown Album');
        });
    });

    describe('genre', (): void => {
        it('represents the genre field of song metadata', (): void => {
            const song = new Song('song.mp3', mockAdapter.object, {
                duration: 30,
                genre: ['Pop/WorldBeat'],
            });
            expect(song.genre).toMatchObject(['Pop/WorldBeat']);
        });

        it('defaults to "Unknown Genre"', (): void => {
            const song = new Song('song.mp3', mockAdapter.object, {
                duration: 30,
            });
            expect(song.genre).toMatchObject(['Unknown Genre']);
        });
    });

    describe('getAudio method', (): void => {
        it('provides an audio stream for a given song', (): void => {
            mockAdapter
                .setup((adapter): Readable => adapter.getAudio('song.mp3'))
                .returns((): Readable => new Readable());

            const song = new Song('song.mp3', mockAdapter.object, {
                duration: 30,
            });
            const audioPromise = song.getAudio();

            mockAdapter.verify((adapter): Readable => adapter.getAudio('song.mp3'), Times.once());
            expect(audioPromise).toBeInstanceOf(Readable);
        });
    });
});
