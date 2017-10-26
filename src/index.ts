import "reflect-metadata";
import { Container } from 'inversify';
import { interfaces as IExpressUtils, InversifyExpressServer, TYPE } from 'inversify-express-utils';

import Song from './api/controllers/Song';
import { TYPES } from './Types';
import config from './config';
import AudioSource from './api/services/media_providers/AudioSource';
import AudioFactory from './api/services/media_providers/AudioFactory';
import DiskSource from './api/services/media_providers/disk/DiskSource';
import DiskFactory from './api/services/media_providers/disk/DiskFactory';

let container = new Container();

container.bind<IExpressUtils.Controller>(TYPE.Controller).to(Song).whenTargetNamed('Song');
container.bind<AudioSource>(TYPES.AudioSource).to(DiskSource);
container.bind<AudioFactory>(TYPES.AudioFactory).to(DiskFactory);
container.bind<any>(TYPES.Config).toConstantValue(config);

// create server
let server = new InversifyExpressServer(container);

server
    .build()
    .listen(config.webServer.port, config.webServer.bind_address, () => {
        console.log('Now listening on ' + config.webServer.bind_address + ':' + config.webServer.port);
    });
