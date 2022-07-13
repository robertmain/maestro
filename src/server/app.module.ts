import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ZeroConfModule } from './zeroconf/zeroconf.module';
import { MediaModule } from './media/media.module';
import { MetadataModule } from './metadata/metadata.module';
import { State } from './state/state.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            ignoreEnvFile: true,
            cache: false,
            isGlobal: true,
        }),
        MediaModule,
        ZeroConfModule,
        State,
        MetadataModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
