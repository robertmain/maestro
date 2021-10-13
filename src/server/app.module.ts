import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FfmpegModule } from './ffmpeg/ffmpeg.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            ignoreEnvFile: true,
            cache: false,
            isGlobal: true,
        }),
        FfmpegModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
