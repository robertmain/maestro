import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ZeroConfModule } from './zeroconf/zeroconf.module';
import { MediaModule } from './media/media.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            ignoreEnvFile: true,
            cache: false,
            isGlobal: true,
        }),
        MediaModule,
        ZeroConfModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
