import * as mock from 'mock-require';

mock('fluent-ffmpeg', (path: string) => {
    return {
        ffprobe: (cb: any) => {
            if (!path.match(/exists/)) {
                cb(Error('unable to find file on disk'));
            } else {
                cb(undefined, {
                    streams: [
                        {
                            duration: 200,
                            sample_rate: 44100,
                        },
                    ],
                    format: {
                        tags: {
                            title: 'Test Title',
                            artist: 'My Artist',
                            album: 'My Album',
                            genre: 'Example Genre',
                        },
                    },
                });
            }
        },
    };
});

import DiskFactory from '../../../../../../src/api/services/media_providers/disk/DiskFactory';
import DiskSource from '../../../../../../src/api/services/media_providers/disk/DiskSource';
import AudioFactory from '../../../../../../src/api/services/media_providers/AudioFactory';
import AudioSource from '../../../../../../src/api/services/media_providers/AudioSource';
import Song from '../../../../../../src/Song';

describe('Disk factory', () => {
    let disk_factory: AudioFactory;

    beforeEach(() => {
        container.bind(TYPES.Config).toConstantValue({
            "adapters": {
                "disk": {
                    "songs_directory": "C:\\some\\random\\directory"
                }
            }
        });
        disk_factory = container.get<AudioFactory>(TYPES.AudioFactory);
    });

    it('provides correctly constructed songs', () => {
        const song = disk_factory.getSong('songexists.mp3');

        return Promise.all([
            expect(song).toBeInstanceOf(Song),
            expect(song).resolves.toHaveProperty('identifier', 'songexists.mp3'), // .with.property('identifier', 'songexists.mp3'),
            expect(song).resolves.toHaveProperty('title', 'Test Title'),
            expect(song).resolves.toHaveProperty('duration', 200),
            expect(song).resolves.toHaveProperty('sample_rate', 44100),
            expect(song).resolves.toHaveProperty('artist', 'My Artist'),
            expect(song).resolves.toHaveProperty('album', 'My Album'),
            expect(song).resolves.toHaveProperty('genre', ['Example Genre']),
        ]);
    });

    it('reports errors when trying to find an invalid song on disk', () => {
        const song = disk_factory.getSong('no.wav');

        return expect(song).rejects.toThrowError('unable to find file on disk');
    });
});
