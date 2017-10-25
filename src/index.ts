import { Container } from 'inversify';
import { interfaces, InversifyExpressServer, TYPE } from 'inversify-express-utils';

import Song from './api/controllers/Song';
import { TYPES } from './Types';
import AudioFactory from './api/services/media_providers/AudioFactory';
import DiskFactory from './api/services/media_providers/disk/DiskFactory';

let container = new Container();

container.bind<interfaces.Controller>(TYPE.Controller).to(Song).whenTargetNamed('Song');
container.bind<AudioFactory>(TYPES.AudioFactory).to(DiskFactory);

// create server
let server = new InversifyExpressServer(container);

server
    .build()
    .listen(3000);