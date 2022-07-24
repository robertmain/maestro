import { INestApplication } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Test, TestingModule } from '@nestjs/testing';
import io, { Socket } from 'socket.io-client';
import { Store } from 'redux';
import { AbortController, abortableFetch } from 'abortcontroller-polyfill/dist/cjs-ponyfill';
import * as nodeFetch from 'node-fetch';
import { STORE } from '../../../src/server/metadata/types';
import {
    MetadataModule,
} from '../../../src/server/metadata/metadata.module';
import { SongMetaData, SongMetadataWithId } from '../../../src/server/media/types';
import { actions } from '../../../src/server/metadata/playlist.slice';

const { fetch } = abortableFetch(nodeFetch);
global.AbortController = AbortController;
global.fetch = fetch;

describe('Playlist websocket gateway', () => {
    let app: INestApplication;
    let socket: Socket;
    let store: Store<SongMetaData>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [MetadataModule],
        })
            .compile();
        app = module.createNestApplication();
        app.useWebSocketAdapter(new IoAdapter(app));

        await app.init();
        const { address, port } = app.getHttpServer().listen().address();
        socket = await ((url) => new Promise<Socket>((res) => {
            const connection = io(url);
            connection.on('connect', () => {
                res(connection);
            });
        }))(`http://[${address}]:${port}`);
        store = module.get<Store<SongMetadataWithId>>(STORE);
    });
    afterEach(async () => {
        socket.close();
        return app.close();
    });
    it('emits a websocket event for redux dispatches', (done) => {
        socket.on('playlist/add', (data: SongMetaData) => {
            expect(data).not.toBeNull();
            expect(data).toHaveProperty('duration');
            expect(data.duration).toBe(12345);
            done();
        });
        store.dispatch(actions.add({
            duration: 12345,
        }));
    });
});
