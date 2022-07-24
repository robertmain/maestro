import { Inject } from '@nestjs/common';
import {
    OnGatewayConnection, WebSocketGateway,
} from '@nestjs/websockets';
import { ListenerMiddlewareInstance } from '@reduxjs/toolkit';
import { Subject } from 'rxjs';
import { Socket } from 'socket.io';
import { addToPlaylist } from './playlist.slice';
import { LISTENER_MIDDLEWARE, STORE } from './types';

type PlaylistEvent = {
    type: string;
    data?: unknown;
};

@WebSocketGateway()
export class MetadataGateway implements OnGatewayConnection {
    @Inject(LISTENER_MIDDLEWARE)
    private listenerMiddleware: ListenerMiddlewareInstance;

    handleConnection(client: Socket): void {
        const playlist = new Subject<PlaylistEvent>();
        playlist.subscribe({
            next: ({ type, data }) => client.emit(type, data),
        });
        const unsubscribeListeners = [
            addToPlaylist,
        ].map((actionCreator) => this.listenerMiddleware.startListening({
            actionCreator,
            effect: ({ type, payload }) => {
                const eventType = type.toUpperCase().replace('/', '_');
                playlist.next({ type: eventType, data: payload });
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
