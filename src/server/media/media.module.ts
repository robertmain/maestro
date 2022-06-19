import { Module } from '@nestjs/common';
import { DiskMoudle } from './disk/disk.module';

@Module({
    imports: [
        DiskMoudle.register({
            library: './music',
        }),
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class MediaModule { }
