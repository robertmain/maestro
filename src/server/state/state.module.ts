import { Global, Module } from '@nestjs/common';
import { STORE } from './types';
import { store } from './store';

@Global()
@Module({
    providers: [
        {
            provide: STORE,
            useValue: store,
        },
    ],
    exports: [
        STORE,
    ],
})
export class State {}
