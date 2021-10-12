import { Readable } from 'stream';
import { mocked } from 'ts-jest/utils';
import fs from 'fs';
import { MockedObjectDeep } from 'ts-jest/dist/utils/testing';
import DiskSource from '../DiskSource';

jest.mock('fs');
describe('Disk source', (): void => {
    let diskSource: DiskSource;
    let mockFs: MockedObjectDeep<typeof fs>;
    beforeEach(() => {
        mockFs = mocked(fs, true);
        diskSource = new DiskSource();
    });
    it('is able to retrieve song files from disk', (): void => {
        expect.assertions(1);
        mockFs.existsSync.mockImplementationOnce(() => true);
        mockFs.createReadStream
            .mockImplementationOnce(jest.fn()
                .mockImplementationOnce(() => Readable.from([])));

        const audio = diskSource.getAudio('mysong.mp3');

        expect(audio).toBeInstanceOf(Readable);
    });

    it('fails to find non-existant files', (): void => {
        mockFs.existsSync.mockImplementationOnce(() => false);
        expect(() => {
            diskSource.getAudio('no.wav');
        }).toThrow(/no such file or directory/i);
    });

    afterEach(jest.clearAllMocks);
});
