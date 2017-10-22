import * as chai from 'chai';
import * as TypeMoq from 'typemoq';
import {Readable} from 'stream';

import Song from '../src/Song';
import AudioSource from '../src/api/services/media_providers/AudioSource';

const expect = chai.expect;

describe('A song', () => {

    describe('identifier', () => {
        const song = new Song('song.mp3', 30, <AudioSource>{});
        it('represents the location of a single file', () => {
            expect(song).to.have.property('identifier');
            expect(song.identifier).to.equal('song.mp3')
            expect(song.identifier).to.be.a('string');
        });
    });

    describe('duration', () => {
        const song = new Song('song.mp3', 30, <AudioSource>{});
        it('represents the length of the song in seconds', () => {
            expect(song).to.have.property('duration');
            expect(song.duration).to.equal(30);
            expect(song.duration).to.be.above(0);
        })

        it('is an integral number', () => {
            expect(song.duration).to.be.a('number');
            expect(song.duration % 1).to.equal(0);
        });
    });

    describe('stream adapter', () => {
        const song = new Song('song.mp3', 30, <AudioSource>{});
        it('provides a mechanism for audio retrieval', () => {
            expect(song).to.have.property('audio_source');
        })
    });

    describe('sample rate', () => {
        it('provides the song sample rate', () => {
            const song = new Song('song.mp3', 30, <AudioSource>{}, 30);
            expect(song.sample_rate).to.be.greaterThan(0);
            expect(song.sample_rate).to.equal(30);
        });

        it('defaults to 44100', () => {
            const song = new Song('song.mp3', 30, <AudioSource>{});
            expect(song.sample_rate).to.equal(44100);
        });

        it('is an integral number', () => {
            const song = new Song('song.mp3', 30, <AudioSource>{});
            expect(song.sample_rate).to.be.a('number');
            expect(song.sample_rate % 1).to.equal(0);
        });
    });

    describe ('title', () => {
        it('represents the title field of song metadata', () => {
            const song = new Song('song.mp3', 30, <AudioSource>{}, undefined, 'Graceland');
            expect(song.title).to.equal('Graceland');
        });

        it('provides a default value if omitted', () => {
            const song = new Song('song.mp3', 30, <AudioSource>{});
            expect(song.title).to.equal('Title Unavailable');
        });
    });

    describe ('artist', () => {
        it('represents the artist field of song metadata', () => {
            const song = new Song('song.mp3', 30, <AudioSource>{}, undefined, undefined, 'Paul Simon');
            expect(song.artist).to.equal('Paul Simon');
        });

        it('defaults to "Unknown Artist"', () => {
            const song = new Song('song.mp3', 30, <AudioSource>{});
            expect(song.artist).to.equal('Unknown Artist');
        });
    });

    describe ('album', () => {
        it('represents the album field of song metadata', () => {
            const song = new Song('song.mp3', 30, <AudioSource>{}, undefined, undefined, undefined, 'Graceland');
            expect(song.album).to.equal('Graceland');
        });

        it('defaults to "Unknown Album"', () => {
            const song = new Song('song.mp3', 30, <AudioSource>{});
            expect(song.album).to.equal('Unknown Album');
        });
    });

    describe ('genre', () => {
        it('represents the genre field of song metadata', () => {
            const song = new Song('song.mp3', 30, <AudioSource>{}, undefined, undefined, undefined, undefined, 'Pop/Worldbeat');
            expect(song.genre).to.equal('Pop/Worldbeat');
        });

        it('defaults to "Unknown Genre"', () => {
            const song = new Song('song.mp3', 30, <AudioSource>{});
            expect(song.genre).to.equal('Unknown Genre');
        });
    });

    describe('getAudio method', () => {
        it('provides an audio retrieval strategy stream for a given song', () => {
            const mockAdapter : TypeMoq.IMock<AudioSource> = TypeMoq.Mock.ofType<AudioSource>();
            mockAdapter
                .setup(mockAdapter => mockAdapter.getAudio('song.mp3'))
                .returns(() => new Promise<Readable>(() => {}));

            const song = new Song('song.mp3', 30, mockAdapter.object);
            let audio_promise = song.getAudio();

            mockAdapter.verify(mockAdapter => mockAdapter.getAudio('song.mp3'), TypeMoq.Times.once());
            expect(song).to.respondTo('getAudio');
            expect(audio_promise).to.be.instanceOf(Promise);
        });
    });

});