import { Module } from '@nestjs/common';
import ffmpeg, { FfprobeData } from 'fluent-ffmpeg';
import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg';
import { path as ffProbePath } from '@ffprobe-installer/ffprobe';
import { promisify } from 'util';

export interface FFProbe {
    (file: string): Promise<FfprobeData>;
    (file: string, index: number): Promise<FfprobeData>;
    (file: string, options: string[]): Promise<FfprobeData>;
    (file: string, index: number, options: string[]): Promise<FfprobeData>;
}

const ffprobe: FFProbe = promisify(ffmpeg.ffprobe);

export enum SCANNER {
    FFMPEG = 'FFMPEG',
    FFPROBE = 'FFPROBE',
}

@Module({
    imports: [],
    controllers: [],
    providers: [
        {
            provide: SCANNER.FFMPEG,
            useValue: ffmpeg,
        },
        {
            provide: SCANNER.FFPROBE,
            useValue: ffprobe,
        },
    ],
    exports: [
        SCANNER.FFMPEG,
        SCANNER.FFPROBE,
    ],
})
export class FfmpegModule {
    public onModuleInit(): void {
        ffmpeg.setFfmpegPath(ffmpegPath);
        ffmpeg.setFfprobePath(ffProbePath);
    }
}
