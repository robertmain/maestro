import { Global, Module } from '@nestjs/common';
import {
    configureStore, createListenerMiddleware,
} from '@reduxjs/toolkit';
import playlist from './playlist.slice';

export const STORE = 'STORE';
export const LISTENER_MIDDLEWARE = 'LISTENER_MIDDLEWARE';


@Global()
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
    ],
    exports: [
        STORE,
        LISTENER_MIDDLEWARE,
    ],
})
export class State {}
