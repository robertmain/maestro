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
describe('A song:', () => {
    const song = new Song('song.mp3', 30, <MediaProvider>{});
    
    describe('identifier', () => {
        it('is required', (done) => {
            expect(song).to.have.property('identifier');
            expect(song.identifier).to.equal('song.mp3')
            expect(song.identifier).to.be.a('string');
            done();
        });
    });

});