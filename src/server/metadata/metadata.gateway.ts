import { Inject } from '@nestjs/common';
import {
    OnGatewayConnection, WebSocketGateway,
} from '@nestjs/websockets';
import { Store } from 'redux';
import { Subject } from 'rxjs';
import { SongMetaData } from 'server/media/types';
import { STORE } from 'server/state/state.module';
import { Socket } from 'socket.io';
import playlistReducer from '../state/playlist.slice';

export enum PLAYLIST_EVENT_TYPES {
    PLAYLIST_GET = 'PLAYLIST_GET',
}

type PlaylistEvent = {
    type: PLAYLIST_EVENT_TYPES;
    data: unknown;
};

@WebSocketGateway()
export class MetadataGateway implements OnGatewayConnection {
    @Inject(STORE)
    private store: Store<SongMetaData[]>;

    private subject: Subject<PlaylistEvent>;

    public constructor() {
        this.subject = new Subject<PlaylistEvent>();
    }

    // handleDisconnect(client: Socket): void {
    //     this.subject.complete();
    // }

    handleConnection(client: Socket): void {
        const subscription = this.subject
            .subscribe({
                next: ({ type, data }) => client.emit(type, data),
            });

        client.emit(PLAYLIST_EVENT_TYPES.PLAYLIST_GET, this.store.getState());
        client.on('disconnect', () => subscription.unsubscribe());
    }
}
