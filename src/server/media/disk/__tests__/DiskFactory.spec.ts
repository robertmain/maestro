const ffmpeg = require('fluent-ffmpeg');
jest.mock('fluent-ffmpeg');

import DiskFactory from '../DiskFactory';
import DiskSource from '../DiskSource';
import AudioFactory from '../../AudioFactory';
import Song from '../../../Song';

describe('Disk factory', (): void => {
    let diskFactory: AudioFactory;

    beforeEach((): void => {
        diskFactory = new DiskFactory({
            songs_directory: 'C:\\some\\random\\directory',
        }, new DiskSource());
    });

    it('provides correctly constructed songs', async (): Promise<any> => {
        expect.assertions(8);

        jest.spyOn(ffmpeg, 'ffprobe')
            .mockImplementationOnce((path: string, cb: Function): void => {
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
        const song = await diskFactory.getSong('songexists.mp3');

        expect(song).toBeInstanceOf(Song);
        expect(song).toHaveProperty('identifier', 'songexists.mp3');
        expect(song).toHaveProperty('title', 'Test Title');
        expect(song).toHaveProperty('duration', 200);
        expect(song).toHaveProperty('sampleRate', 44100);
        expect(song).toHaveProperty('artist', 'My Artist');
        expect(song).toHaveProperty('album', 'My Album');
        expect(song).toHaveProperty('genre', ['Example Genre']);
    });

    it('reports errors when trying to find an invalid song on disk', async (): Promise<any> => {
        expect.assertions(1);

        jest.spyOn(ffmpeg, 'ffprobe')
            .mockImplementationOnce((path: string, cb: Function): void => {
                cb('unable to find file on disk');
            });

        try {
            await diskFactory.getSong('no.wav');
        } catch (error) {
            expect(error).toMatch('unable to find file on disk');
        }
    });
});
