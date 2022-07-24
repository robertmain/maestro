import { Module } from '@nestjs/common';
import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import { MetadataGateway } from './metadata.gateway';
import playlist from './playlist.slice';
import { LISTENER_MIDDLEWARE, STORE } from './types';

@Module({
    providers: [
        {
            provide: LISTENER_MIDDLEWARE,
            useValue: createListenerMiddleware(),
        },
        {
            provide: STORE,
            inject: [LISTENER_MIDDLEWARE],
            useFactory: (middleware) => configureStore({
                reducer: {
                    playlist,
                },
                middleware: (getDefaultMiddleware) => getDefaultMiddleware()
                    .prepend(middleware.middleware),
            }),
        },
        MetadataGateway,
    ],
    exports: [],
})
export class MetadataModule { }
