import "reflect-metadata";
import { Container } from 'inversify';
import { interfaces as IExpressUtils, InversifyExpressServer, TYPE } from 'inversify-express-utils';
import * as bodyParser from 'body-parser';
import * as jayson from 'jayson';
import { Server } from 'http';
import * as socketio from 'socket.io';

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

// RPC server
let RPCServer = jayson.server({
    getSong: (args: any, cb: Function) => songController.getSong(args, cb)
});

// Inversify Express server
ExpressServer
    .setConfig(app => {
        app.use(bodyParser.json())
        app.use(RPCServer.middleware())
    });

// Construct a new raw HTTP server to bind socket.io to
const http = new Server(<any>ExpressServer.build());
http.listen(config.http, () => console.log(`Now listening on ${config.http.host}:${config.http.port}`));

// Socket.io Server
socketio(http).on("connection", connection => {
    connection.on("rpc", (_rpc) => {

    });
});
