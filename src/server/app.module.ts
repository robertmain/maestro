import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MediaModule } from './media/media.module';
import { FfmpegModule } from './ffmpeg/ffmpeg.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            ignoreEnvFile: true,
            cache: false,
            isGlobal: true,
        }),
        FfmpegModule,
        MediaModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
