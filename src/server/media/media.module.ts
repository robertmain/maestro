import { Module } from '@nestjs/common';
import { resolve } from 'path';
import { FfmpegModule } from 'server/ffmpeg/ffmpeg.module';
import { ConfigService } from '@nestjs/config';
import DiskFactory from './disk/DiskFactory';
import DiskSource from './disk/DiskSource';
import { DiskFactoryConfiguration } from './types';

@Module({
    imports: [
        FfmpegModule,
    ],
    controllers: [],
    providers: [
        {
            inject: [ConfigService],
            provide: DiskFactoryConfiguration,
            useFactory: (config): DiskFactoryConfiguration => ({
                libraryDirectory: resolve(config.get('DISK_LBRARY_FOLDER')),
            }),
        },
        DiskFactory,
        DiskSource,
    ],
    exports: [],
})
export class MediaModule { }
