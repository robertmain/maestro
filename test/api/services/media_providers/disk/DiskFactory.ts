import * as chai from 'chai';
import * as chai_as_promised from 'chai-as-promised';
import * as mock from 'mock-require';
import { Container } from 'inversify';
import { TYPES } from 'Types';

mock('fluent-ffmpeg',  (path : string) => {
    return {
        ffprobe: (cb : any) => {
            if(!path.match(/exists/)){
                cb(Error('unable to find file on disk'));
            } else {
                cb(undefined, {
                    streams: [
                        {
                            duration: 200,
                            sample_rate: 44100
                        }
                    ],
                    format: {
                        tags: {
                            title: 'Test Title',
                            artist: 'My Artist',
                            album: 'My Album',
                            genre: 'Example Genre'
                        }
                    }
                });
            }
        }
    }
});

import DiskFactory from 'media_providers/disk/DiskFactory';
import DiskSource from 'media_providers/disk/DiskSource';
import AudioFactory from 'media_providers/AudioFactory';
import AudioSource from 'media_providers/AudioSource';
import Song from 'Song';

/**
* Globals
*/
const expect = chai.expect;
chai.use(chai_as_promised);

describe('Disk factory', () => {

    let container   : Container;
    let disk_factory: AudioFactory;

    beforeEach(() => {
        container = new Container;
        container.bind<AudioFactory>(TYPES.AudioFactory).to(DiskFactory);
        container.bind<AudioSource>(TYPES.AudioSource).to(DiskSource);
        container.bind(TYPES.Config).toConstantValue({
            "adapters": {
                "disk": {
                    "songs_directory": "C:\\some\\random\\directory"
                }
            }
        });
        disk_factory   = container.get<AudioFactory>(TYPES.AudioFactory);
    })

    it('provides correctly constructed songs', () => {
        const song = disk_factory.getSong('songexists.mp3');

        return Promise.all([
            expect(song).to.be.instanceOf(Promise),
            expect(song).to.eventually.be.instanceof(Song).with.property('identifier', 'songexists.mp3'),
            expect(song).to.eventually.be.instanceof(Song).with.property('title', 'Test Title'),
            expect(song).to.eventually.be.instanceof(Song).with.property('duration', 200),
            expect(song).to.eventually.be.instanceof(Song).with.property('sample_rate', 44100),
            expect(song).to.eventually.be.instanceof(Song).with.property('artist', 'My Artist'),
            expect(song).to.eventually.be.instanceof(Song).with.property('album', 'My Album'),
            expect(song).to.eventually.be.instanceof(Song).with.deep.property('genre', ['Example Genre'])
        ]);
    });

    it('reports errors when trying to find an invalid song on disk', () => {
        const song = disk_factory.getSong('no.wav');

        return expect(song).to.eventually.be.rejectedWith(Error, 'unable to find file on disk');
    });
});
