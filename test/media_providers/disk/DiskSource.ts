/// <reference path="../../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../../node_modules/@types/chai/index.d.ts" />

/**
* Module dependencies.
*/
import * as chai from 'chai';
import * as chai_as_promised from 'chai-as-promised';
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

delete require.cache[require.resolve('../../../src/media_providers/disk/DiskSource')];
import DiskSource from '../../../src/media_providers/disk/DiskSource';

/**
* Globals
*/
const expect = chai.expect;
chai.use(chai_as_promised);

describe('Disk source', () => {

    it('is able to retrieve song files from disk', () => {
        const da       = new DiskSource();
        const songName = 'thissongexists.mp3';

        return Promise.all([
            expect(da).to.respondTo('getAudio'),
            expect(da.getAudio(songName)).to.be.instanceof(Promise),
            expect(da.getAudio(songName)).to.eventually.be.an.instanceOf(Readable)
        ]);
    });

    it('fails to find non-existant files', () => {
        const da = new DiskSource();

        return expect(da.getAudio('no.wav')).to.eventually.be.rejectedWith(Error, 'unable to find file: no.wav on disk');
    });
});

