import { Readable } from 'stream';
import fs, { createReadStream } from 'fs';

import DiskSource from '../../../../../src/services/media/disk/DiskSource';

describe('Disk source', () => {

    it('is able to retrieve song files from disk', () => {
        expect.assertions(1);

        jest.spyOn(fs, 'createReadStream').mockImplementationOnce((filename: string) => {
            return new Readable();
        });

        const disk_source = new DiskSource();
        const audio = disk_source.getAudio('mysong.mp3');

        expect(audio).toBeInstanceOf(Readable);
    });

    it('fails to find non-existant files', done => {
        expect.assertions(1);

        const disk_source = new DiskSource();

        const audio = disk_source.getAudio('no.wav');

        audio.on('error', error => {
            expect(error.message).toContain('no such file or directory');
            done();
        });
    });

    afterEach(jest.clearAllMocks);

});
