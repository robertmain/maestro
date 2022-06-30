import { Global, Module } from '@nestjs/common';
import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import playlist from './playlist.slice';

export const STORE = 'STORE';

const listenerMiddleware = createListenerMiddleware();

@Global()
@Module({
    providers: [
        {
            provide: STORE,
            useValue: configureStore({
                reducer: {
                    playlist,
                },
                middleware: (getDefaultMiddleware) => getDefaultMiddleware()
                    .prepend(listenerMiddleware.middleware),
            }),
        },
    ],
    exports: [
        STORE,
    ],
})
export class State {}
