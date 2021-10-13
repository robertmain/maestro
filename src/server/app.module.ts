import { Module } from '@nestjs/common';
import { FfmpegModule } from './ffmpeg/ffmpeg.module';

@Module({
    imports: [
        FfmpegModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
