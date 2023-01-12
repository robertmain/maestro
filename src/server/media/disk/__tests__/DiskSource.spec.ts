/* eslint-disable import/first */
jest.mock('fs', () => ({
    existsSync: jest.fn(),
    createReadStream: jest.fn(),
}));
import * as fs from 'fs';
import { Readable } from 'stream';
import DiskSource from '../DiskSource';

describe('Disk source', (): void => {
    let diskSource: DiskSource;
    let existsSyncSpy: jest.SpyInstance<boolean, [path: fs.PathLike]>;
    let createReadStreamSpy: jest.SpyInstance<ReturnType<typeof fs['createReadStream']>>;
    beforeEach(() => {
        existsSyncSpy = jest.spyOn(fs, 'existsSync');
        createReadStreamSpy = jest.spyOn(fs, 'createReadStream');
        diskSource = new DiskSource();
    });
    afterEach(jest.clearAllMocks);
    it('is able to retrieve song files from disk', (): void => {
        expect.assertions(1);
        existsSyncSpy.mockReturnValue(true);
        createReadStreamSpy
            .mockImplementationOnce(jest.fn()
                .mockReturnValue(Readable.from([])));

        const audio = diskSource.getAudio('mysong.mp3');

        expect(audio).toBeInstanceOf(Readable);
    });

    it('fails to find non-existant files', (): void => {
        existsSyncSpy.mockReturnValue(false);
        expect(() => {
            diskSource.getAudio('no.wav');
        }).toThrow(/no such file or directory/i);
    });

    afterEach(jest.clearAllMocks);
});
