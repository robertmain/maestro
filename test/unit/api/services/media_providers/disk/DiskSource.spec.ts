import * as mock from 'mock-require';
import { Readable } from 'stream';

mock('fs', {
    existsSync: (path: any) => {
        return path.match(/exists/);
    },
    createReadStream: () => {
        return new Readable();
    },
});

delete require.cache[require.resolve('../../../../../src/api/services/media_providers/disk/DiskSource')];
import DiskSource from '../../../../../../src/api/services/media_providers/disk/DiskSource';

describe('Disk source', () => {

    it('is able to retrieve song files from disk', () => {
        const da = new DiskSource();
        const songName = 'thissongexists.mp3';

        return Promise.all([
            expect(da).toHaveProperty('getAudio'),
            expect(da.getAudio(songName)).toBeInstanceOf(Promise),
            expect(da.getAudio(songName)).resolves.toBeInstanceOf(Readable),
        ]);
    });

    it('fails to find non-existant files', () => {
        const da = new DiskSource();

        return expect(da.getAudio('no.wav')).rejects.toThrowError('unable to find file: no.wav on disk');
    });
});
