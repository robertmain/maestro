import * as express from 'express';
import DiskFactory from './api/services/media_providers/disk/DiskFactory';

export default class Server {

    private app : express.Application;
    private router : express.Router
    // private controllers_directory : string = 'api' + path.sep + 'controllers';

    public constructor(readonly port: number = 8000) {
        this.app = express();
        this.router = express.Router();

        const songs_dir = 'C:\\Users\\robert\\Desktop\\jukebox-songs';
        let df = new DiskFactory(songs_dir);


        this.router.route('/song/:song_name')
        .get((req : express.Request, res : express.Response) => {
            let song = df.getSong(req.params['song_name']);
            console.log('New request from ' + req.ip + ' for ' + req.params['song_name']);
            song.then((song) => res.json(song));
            song.catch((e : Error) => {
                console.log(e);
                res.send('Something broke....');
            });
        });
    }

    public start() :void {
        this.app.use('/api', this.router);
        this.app.listen(this.port, () => {
            console.log('Now listening on port ' + this.port);
        });
    }

}