import { Module } from '@nestjs/common';
import ffmpeg, { ffprobe } from 'fluent-ffmpeg';
import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg';
import { path as ffProbePath } from '@ffprobe-installer/ffprobe';
import { promisify } from 'util';

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
            useValue: promisify(ffmpeg),
        },
        {
            provide: SCANNER.FFPROBE,
            useValue: promisify(ffprobe),
        },
    ],
    exports: [
        {
            provide: SCANNER.FFMPEG,
            useValue: promisify(ffmpeg),
        },
        {
            provide: SCANNER.FFPROBE,
            useValue: promisify(ffprobe),
        },
    ],
})
export class FfmpegModule {
    public onModuleInit(): void {
        ffmpeg.setFfmpegPath(ffmpegPath);
        ffmpeg.setFfprobePath(ffProbePath);
    }
}
