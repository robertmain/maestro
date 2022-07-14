import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import Io, { Socket } from 'socket.io-client';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { SongMetaData } from 'server/media/types';
import { PLAYLIST_EVENT_TYPES } from '../metadata.gateway';

describe('Metadata websocket gateway', () => {
    let app: INestApplication;
    let socket: Socket;
    let fakePlaylist: { getState: jest.SpyInstance<SongMetaData[]> };

    beforeEach(async () => {
        fakePlaylist = {
            getState: jest.fn().mockReturnValue([]),
        };
        const module: TestingModule = await Test.createTestingModule({
            imports: [MetadataModule],
        })
            .overrideProvider(STORE)
            .useValue(fakePlaylist)
            .compile();
        app = module.createNestApplication();
        app.useWebSocketAdapter(new IoAdapter(app));
        await app.listen(0);
        const address = await app.getUrl();
        socket = Io(address);
    });
    afterEach(async () => {
        socket.close();
        await app.close();
    });
    it('emits the current playlist on connect', (done) => {
        expect.assertions(2);
        fakePlaylist.getState.mockReturnValue([
            { duration: 123 },
        ]);
        socket.on(PLAYLIST_EVENT_TYPES.PLAYLIST_GET, (data: SongMetaData[]) => {
            expect(data).not.toBeNull();
            expect(data).toHaveLength(1);
            done();
        });
    });
});
