/// <reference path="../../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../../node_modules/@types/chai/index.d.ts" />

/**
* Module dependencies.
*/
import * as chai from 'chai';
import * as chai_as_promised from 'chai-as-promised'; // tslint: ignore
import * as mock from 'mock-require';
import {Readable}  from 'stream';

// Mocked out filesystem for testing. Must go before the import of `DiskAdapter` in order to
// intercept the call to `fs` and replace it with our mock
mock('fs', {
    existsSync: (path : any) => {
        return path.match(/exists/);
    },
    createReadStream: () => {
        return new Readable();
    }
});

import DiskAdapter from '../../../src/media_providers/disk/DiskAdapter';

/**
* Globals
*/
const expect = chai.expect;
chai.use(chai_as_promised);

describe('A disk adapter', () => {

    it('is able to retrieve song files from disk', () => {
        const da       = new DiskAdapter();
        const songName = 'thissongexists.mp3';

        expect(da).to.respondTo('getAudio');
        expect(da.getAudio(songName)).to.be.instanceof(Promise);
        expect(da.getAudio(songName)).to.eventually.be.an.instanceOf(Readable);
    });

    it('fails to find non-existant files', () => {
        const da = new DiskAdapter();

        expect(da.getAudio('no.wav')).to.eventually.be.rejected;
    });
});

