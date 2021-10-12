import { FfprobeData } from 'fluent-ffmpeg';
import DiskFactory from '../DiskFactory';
import DiskSource from '../DiskSource';
import AudioFactory from '../../AudioFactory';
import Song from '../../../Song';

jest.mock('fluent-ffmpeg');

type ProbeData = {
    streams: FfprobeData['streams'],
    chapters: FfprobeData['chapters'],
    format: {
        duration: FfprobeData['format']['duration'],
        tags: Record<string, string>
    }
};

describe('Disk factory', (): void => {
    let diskFactory: AudioFactory;
    let ffprobe;

    beforeEach((): void => {
        diskFactory = new DiskFactory({
            songs_directory: 'C:\\some\\random\\directory',
        }, new DiskSource());
        ffprobe = jest.mock('fluent-ffmpeg',
            () => jest.genMockFromModule('fluent-ffmpeg'));
    });

    it('provides correctly constructed songs', async (): Promise<void> => {
        ffprobe.mockImplementationOnce((
            _path: string,
            cb: (err: any, data?: FfprobeData) => void
        ) => {
            cb(null, {
                format: {
                    duration: 200,
                    tags: {
                        title: 'Test Title',
                        artist: 'My Artist',
                        album: 'My Album',
                        genre: 'Example Genre',
                    },
                },
                streams: [{
                    index: 0,
                    sample_rate: 44100,
                }],
                chapters: [],
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

    it('reports errors when trying to find an invalid song on disk', async (): Promise<void> => {
        expect.assertions(1);

        ffprobe
            .mockImplementationOnce((
                _path: string,
                cb: (err: any, data?: ProbeData) => void
            ) => {
                cb('unable to find file on disk');
            });

        try {
            await diskFactory.getSong('no.wav');
        } catch (error) {
            expect(error).toMatch('unable to find file on disk');
        }
    });
});
