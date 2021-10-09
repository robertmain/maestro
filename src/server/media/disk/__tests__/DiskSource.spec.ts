import { Readable } from 'stream';
import fs from 'fs';

import DiskSource from '../DiskSource';

describe('Disk source', (): void => {

    it('is able to retrieve song files from disk', (): void => {
        expect.assertions(1);

        jest.spyOn(fs, 'createReadStream')
            .mockImplementationOnce((): Readable => new Readable());

        const diskSource = new DiskSource();
        const audio = diskSource.getAudio('mysong.mp3');

        expect(audio).toBeInstanceOf(Readable);
    });

    it('fails to find non-existant files', (done): void => {
        expect.assertions(1);

        const diskSource = new DiskSource();

        const audio = diskSource.getAudio('no.wav');

        audio.on('error', (error): void => {
            expect(error.message).toContain('no such file or directory');
            done();
        });
    });

    afterEach(jest.clearAllMocks);
});
