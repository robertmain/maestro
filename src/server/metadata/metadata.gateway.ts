import { Inject, Injectable } from '@nestjs/common';
import {
    OnGatewayConnection, WebSocketGateway,
} from '@nestjs/websockets';
import { ListenerMiddlewareInstance, Store } from '@reduxjs/toolkit';
import { Subject } from 'rxjs';
import { SongMetaData, SongMetadataWithId } from 'server/media/types';
import { Socket } from 'socket.io';
import { LISTENER_MIDDLEWARE, STORE } from './types';
import { actions } from './playlist.slice';

type PlaylistEvent = {
    type: string;
    data?: unknown;
};

@WebSocketGateway()
@Injectable()
export class MetadataGateway implements OnGatewayConnection {
    private listenerMiddleware: ListenerMiddlewareInstance<SongMetadataWithId>;

    private store: Store<SongMetadataWithId>;

    public constructor(
    @Inject(LISTENER_MIDDLEWARE)
        middleware: ListenerMiddlewareInstance<SongMetaData>,
        @Inject(STORE)
        store: Store<SongMetadataWithId>
    ) {
        this.listenerMiddleware = middleware;
        this.store = store;
    }

    handleConnection(client: Socket): void {
        const playlist = new Subject<PlaylistEvent>();
        playlist.subscribe({
            next: ({ type, data }) => client.emit(type, data),
        });
        const unsubscribeListeners = Object.values(actions)
            .map((actionCreator) => this.listenerMiddleware.startListening({
                actionCreator,
                effect: ({ type, payload }) => {
                    playlist.next({
                        type,
                        data: payload,
                    });
                },
            }));
        client.on('disconnect', () => {
            playlist.unsubscribe();
            unsubscribeListeners.forEach((unsubscribe) => {
                unsubscribe();
            });
        });
    }
}
