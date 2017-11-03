import "reflect-metadata";
import { Container } from 'inversify';
import { interfaces as IExpressUtils, InversifyExpressServer, TYPE } from 'inversify-express-utils';
import * as bodyParser from 'body-parser';
import * as jayson from 'jayson';
import * as socket from 'socket.io';

import Song from './api/controllers/Song';
import { TYPES } from './Types';
import config from './config';
import AudioSource from './api/services/media_providers/AudioSource';
import AudioFactory from './api/services/media_providers/AudioFactory';
import DiskSource from './api/services/media_providers/disk/DiskSource';
import DiskFactory from './api/services/media_providers/disk/DiskFactory';

let container = new Container();

container.bind<IExpressUtils.Controller>(TYPE.Controller).to(Song);
container.bind<AudioSource>(TYPES.AudioSource).to(DiskSource);
container.bind<AudioFactory>(TYPES.AudioFactory).to(DiskFactory);
container.bind<any>(TYPES.Config).toConstantValue(config);

let songController = container.get<Song>(TYPE.Controller);
let ExpressServer = new InversifyExpressServer(container);

/////////////////////////////////////////////////////////////////////
/// Server Bootstrapping
/////////////////////////////////////////////////////////////////////

//Spin up an RPC server
let RPCServer = jayson.server({
    getSong: (args: any, cb: Function) => songController.getSong(args, cb)
});

//Bring up the express HTTP server
ExpressServer
    .setConfig((app) => {
        app.use(bodyParser.json())
        app.use(RPCServer.middleware())
    })
    .build()
    .listen(config.webServer.port, config.webServer.bind_address, () => {
        console.log('Now listening on ' + config.webServer.bind_address + ':' + config.webServer.port);
    });

//Bootstrap our socket.io server
socket(config.webServer.port);