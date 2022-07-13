import { Module } from '@nestjs/common';
import { State } from 'server/state/state.module';
import { MetadataGateway } from './metadata.gateway';

@Module({
    imports: [
        State,
    ],
    providers: [
        MetadataGateway,
    ],
})
export class MetadataModule { }
