import {
    Inject, Module, OnApplicationBootstrap, OnApplicationShutdown,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    getResponder,
    ServiceType,
    Responder,
    CiaoService,
} from '@homebridge/ciao';

export enum ZEROCONF {
    SERVICE = 'SERVICE',
    RESPONDER = 'RESPONDER',
}

@Module({
    imports: [],
    controllers: [],
    providers: [
        {
            provide: ZEROCONF.RESPONDER,
            useFactory: getResponder,
        },
        {
            provide: ZEROCONF.SERVICE,
            inject: [ConfigService, ZEROCONF.RESPONDER],
            useFactory: (
                config: ConfigService,
                responder: Responder
            ) => responder.createService({
                name: config.get('APP_NAME'),
                port: config.get('PORT'),
                type: ServiceType.HTTP,
                subtypes: [
                    ServiceType.DACP,
                    ServiceType.RAOP,
                    ServiceType.AIRPLAY,
                ],
            }),
        },
    ],
    exports: [
        ZEROCONF.SERVICE,
    ],
})
export class ZeroConfModule implements OnApplicationBootstrap,
    OnApplicationShutdown {
    private service: CiaoService;

    private responder: Responder;

    public constructor(
    @Inject(ZEROCONF.SERVICE) service: CiaoService,
        @Inject(ZEROCONF.RESPONDER) responder: Responder
    ) {
        this.service = service;
        this.responder = responder;
    }

    public onApplicationShutdown(): Promise<void> {
        return this.responder.shutdown();
    }

    public onApplicationBootstrap(): Promise<void> {
        return this.service.advertise();
    }
}
