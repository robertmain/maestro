/// <reference path="../../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../../node_modules/@types/chai/index.d.ts" />

/**
* Module dependencies.
*/
import * as chai from 'chai';
import * as chai_as_promised from 'chai-as-promised';
import * as mock from 'mock-require';
import * as path from 'path';

mock('fluent-ffmpeg',  (path : string) => {
    return {
        ffprobe: (cb : any) => {
            if(!path.match(/exists/)){
                cb(Error('unable to find file on disk'));
            } else {
                cb(undefined, {
                    streams: [
                        {
                            duration: 200,
                            sample_rate: 44100
                        }
                    ],
                    format: {
                        tags: {
                            title: 'Test Title',
                            artist: 'My Artist',
                            album: 'My Album',
                            genre: 'Example Genre'
                        }
                    }
                });
            }
        }
    }
});

import DiskFactory from '../../../src/media_providers/disk/DiskFactory';
import Song from '../../../src/Song';

/**
* Globals
*/
const expect = chai.expect;
chai.use(chai_as_promised);

describe('Disk factory', () => {
    it('provides correctly constructed songs', () => {
        const df  = new DiskFactory('my_music');

        const song = df.getSong('songexists.mp3');

        return Promise.all([
            expect(song).to.be.instanceOf(Promise),
            expect(song).to.eventually.be.instanceof(Song).with.property('identifier', 'my_music' + path.sep + 'songexists.mp3'),
            expect(song).to.eventually.be.instanceof(Song).with.property('title', 'Test Title'),
            expect(song).to.eventually.be.instanceof(Song).with.property('duration', 200),
            expect(song).to.eventually.be.instanceof(Song).with.property('sample_rate', 44100),
            expect(song).to.eventually.be.instanceof(Song).with.property('artist', 'My Artist'),
            expect(song).to.eventually.be.instanceof(Song).with.property('album', 'My Album'),
            expect(song).to.eventually.be.instanceof(Song).with.property('genre', 'Example Genre')
        ]);
    });

    it('reports errors when trying to find song on disk', () => {
        const df = new DiskFactory('my_music');

        const song = df.getSong('no.wav');

        return expect(song).to.eventually.be.rejectedWith(Error, 'unable to find file on disk');
    });
});

