import * as express from 'express';
import Song from './api/controllers/Song';

import DiskFactory from './api/services/media_providers/disk/DiskFactory';
import DiskSource from './api/services/media_providers/disk/DiskSource';

export default class Server {

    private app : express.Application;
    private router : express.Router;
    private static ROUTE_PREFIX : string = '/api';

    public constructor(readonly port: number = 8000) {
        this.app    = express();
        this.router = express.Router();
        let t       = new Song(new DiskFactory('C:\\users\\robert\\Desktop\\jukebox-songs', new DiskSource()));

        this.router.route('/song/:song_name').get((req, res) => t.getSong(req, res))
    }

    public start() :void {
        this.app.use(Server.ROUTE_PREFIX, this.router);
        this.app.listen(this.port, () => {
            console.log('Now listening on port ' + this.port);
        });
    }

}