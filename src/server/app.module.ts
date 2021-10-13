import { Module } from '@nestjs/common';
import { FfmpegModule } from './ffmpeg/Ffmpeg.module';

@Module({
    imports: [
        FfmpegModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
