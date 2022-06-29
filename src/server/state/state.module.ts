import { Global, Module } from '@nestjs/common';
import { configureStore } from '@reduxjs/toolkit';
import playlist from './playlist.slice';

export const STORE = 'STORE';
@Global()
@Module({
    providers: [
        {
            provide: STORE,
            useValue: configureStore({
                reducer: {
                    playlist,
                },
            }),
        },
    ],
    exports: [
        STORE,
    ],
})
export class State {}
