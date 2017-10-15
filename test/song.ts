/// <reference path="../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../node_modules/@types/chai/index.d.ts" />

/**
 * Module dependencies.
 */
import * as chai from 'chai';

import Song from '../src/Song';
import MediaProvider from '../src/media_providers/MediaProvider';

/**
 * Globals
 */

var expect = chai.expect;

/**
 * Unit tests
 */
describe('A song', () => {
    
    describe('identifier', () => {
        const song = new Song('song.mp3', 30, <MediaProvider>{});
        it('represents the location of a single file', () => {
            expect(song).to.have.property('identifier');
            expect(song.identifier).to.equal('song.mp3')
            expect(song.identifier).to.be.a('string');
        });
    });

    describe('duration', () => {
        const song = new Song('song.mp3', 30, <MediaProvider>{});
        it('represents the length of the song in seconds', () => {
            expect(song).to.have.property('duration');
            expect(song.duration).to.equal(30);
        })
        
        it('is an ordinal number', () => {
            expect(song.duration).to.be.a('number');            
        });
    });

    describe('stream adapter', () => {
        const song = new Song('song.mp3', 30, <MediaProvider>{});
        it('provides a mechanism for audio retrieval', () => {
            expect(song).to.have.property('stream_adapter');
            expect(song).to.respondTo('getAudio');
        })
    });

    describe ('title', () => {
        it('represents the title field of song metadata', () => {
            const song = new Song('song.mp3', 30, <MediaProvider>{}, 'Graceland');
            expect(song.title).to.equal('Graceland');
        });

        it('provides a default value if omitted', () => {
            const song = new Song('song.mp3', 30, <MediaProvider>{});
            expect(song.title).to.equal('Title Unavailable');
        });
    });

    describe ('artist', () => {
        it('represents the artist field of song metadata', () => {
            const song = new Song('song.mp3', 30, <MediaProvider>{}, 'Graceland', 'Paul Simon');
            expect(song.artist).to.equal('Paul Simon');
        });

        it('provides a default value if omitted', () => {
            const song = new Song('song.mp3', 30, <MediaProvider>{});
            expect(song.artist).to.equal('Unknown Artist');
        });
    });

    describe ('album', () => {
        it('represents the album field of song metadata', () => {
            const song = new Song('song.mp3', 30, <MediaProvider>{}, 'Graceland', 'Paul Simon', 'Graceland');
            expect(song.album).to.equal('Graceland');
        });

        it('provides a default value if omitted', () => {
            const song = new Song('song.mp3', 30, <MediaProvider>{});
            expect(song.album).to.equal('Unknown Album');
        });
    });

    describe ('genre', () => {
        it('represents the genre field of song metadata', () => {
            const song = new Song('song.mp3', 30, <MediaProvider>{}, 'Graceland', 'Paul Simon', 'Graceland', 'Pop/Worldbeat');
            expect(song.genre).to.equal('Pop/Worldbeat');
        });

        it('provides a default value if omitted', () => {
            const song = new Song('song.mp3', 30, <MediaProvider>{});
            expect(song.genre).to.equal('Unknown Genre');
        });
    });

});