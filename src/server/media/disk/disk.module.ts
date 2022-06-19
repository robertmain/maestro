import { DynamicModule, Module } from '@nestjs/common';
import { FfmpegModule } from 'server/ffmpeg/ffmpeg.module';
import { LIBRARY_URL } from '../types';
import DiskFactory from './DiskFactory';
import DiskSource from './DiskSource';

export type DiskStrategyConfiguration = {
    /**
     * Folder containing a music library
     */
    library: string;
};

@Module({})
export class DiskMoudle {
    static register({ library }: DiskStrategyConfiguration): DynamicModule {
        return {
            module: DiskMoudle,
            imports: [FfmpegModule],
            providers: [
                DiskFactory,
                DiskSource,
                {
                    provide: LIBRARY_URL,
                    useValue: library,
                },
            ],
            exports: [
                {
                    provide: LIBRARY_URL,
                    useValue: library,
                },
            ],
        };
    }
}
