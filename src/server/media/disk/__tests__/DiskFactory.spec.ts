import { Test, TestingModule } from '@nestjs/testing';
import { SCANNER } from 'server/ffmpeg/ffmpeg.module';
import { ConfigService } from '@nestjs/config';
import { DiskFactoryConfiguration } from 'server/media/types';
import DiskFactory from '../DiskFactory';
import DiskSource from '../DiskSource';
import Song from '../../../Song';

const fakeConfigService = {
    get: jest.fn(),
};

describe('Disk factory', (): void => {
    let diskFactory: DiskFactory;
    let fakeFfProbe;
    beforeEach(async (): Promise<void> => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DiskSource,
                DiskFactory,
                {
                    provide: DiskFactoryConfiguration,
                    useValue: {
                        libraryDirectory: '',
                    } as DiskFactoryConfiguration,
                },
                {
                    provide: ConfigService,
                    useValue: fakeConfigService,
                },
                {
                    provide: SCANNER.FFPROBE,
                    useValue: jest.fn(),
                },
            ],
            controllers: [],
        })
            .compile();

        diskFactory = module.get<DiskFactory>(DiskFactory);
        fakeFfProbe = module.get<SCANNER.FFPROBE>(SCANNER.FFPROBE);
    });

    it('provides correctly constructed songs', async (): Promise<void> => {
        fakeFfProbe.mockResolvedValueOnce({
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
        fakeFfProbe.mockRejectedValueOnce(
            new Error('unable to find file on disk')
        );

        expect(() => diskFactory.getSong('no.wav'))
            .rejects.toThrow(/unable to find file on disk/i);
    });
});
