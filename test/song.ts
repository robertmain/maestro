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
            expect(song.duration).to.be.a('number');
        })
    });

    describe('stream adapter', () => {
        const song = new Song('song.mp3', 30, <MediaProvider>{});
        it('provides a mechanism for audio retrieval', () => {
            expect(song).to.have.property('stream_adapter');
            expect(song).to.respondTo('getAudio');
        })
    });

});