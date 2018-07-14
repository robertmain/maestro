import DiskFactory from '../../../../../src/services/media/disk/DiskFactory';
import DiskSource from '../../../../../src/services/media/disk/DiskSource';
import AudioFactory from '../../../../../src/services/media/AudioFactory';
import Song from '../../../../../src/Song';
import { Readable } from 'stream';
// tslint:disable-next-line:no-var-requires
const ffmpeg = require('fluent-ffmpeg');

describe('Disk factory', () => {
    let disk_factory: AudioFactory;

    beforeEach(() => {
        disk_factory = new DiskFactory({
            songs_directory: 'C:\\some\\random\\directory',
        }, new DiskSource());
    });

    it('provides correctly constructed songs', () => {
        expect.assertions(9);

        jest.spyOn(ffmpeg, 'ffprobe').mockImplementationOnce((path: string, cb: any) => {
            cb(null, {
                format: {
                    tags: {
                        title: 'Test Title',
                        artist: 'My Artist',
                        album: 'My Album',
                        genre: 'Example Genre',
                    },
                },
                streams: [
                    {
                        duration: 200,
                    },
                ],
            });
        });

        const song = disk_factory.getSong('songexists.mp3');

        return Promise.all([
            expect(song).toBeInstanceOf(Promise),
            expect(song).resolves.toBeInstanceOf(Song),
            expect(song).resolves.toHaveProperty('identifier', 'songexists.mp3'),
            expect(song).resolves.toHaveProperty('title', 'Test Title'),
            expect(song).resolves.toHaveProperty('duration', 200),
            expect(song).resolves.toHaveProperty('sample_rate', 44100),
            expect(song).resolves.toHaveProperty('artist', 'My Artist'),
            expect(song).resolves.toHaveProperty('album', 'My Album'),
            expect(song).resolves.toHaveProperty('genre', ['Example Genre']),
        ]);
    });

    it('reports errors when trying to find an invalid song on disk', () => {
        jest.spyOn(ffmpeg, 'ffprobe').mockImplementationOnce((path: string, cb: any) => {
            cb(() => {
                throw new Error('unable to find file on disk');
            });
        });

        const song = disk_factory.getSong('no.wav');

        return expect(song).rejects.toThrowError('unable to find file on disk');
    });
});
