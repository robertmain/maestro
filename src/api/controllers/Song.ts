import * as express from 'express';
import { inject, injectable } from "inversify";
import { interfaces, controller, httpGet } from 'inversify-express-utils';
import "reflect-metadata";

import AudioFactory from '../services/media_providers/AudioFactory';
import { TYPES } from '../../Types';

@injectable()
@controller('/songs')
export default class Song  implements interfaces.Controller{

    public constructor(@inject(TYPES.AudioFactory) private _df : AudioFactory) {}

    @httpGet('/')
    public testing (req : express.Request, res : express.Response) {
        let song_name = req.params['song_name'];
        let song      = this._df.getSong(req.params['song_name']);

        console.log('New request from ' + req.ip + ' for ' + song_name);

        song.then((song) => res.json(song));
        song.catch((e : Error) => {
            console.log(e);
            res.send('Something broke....');
        });
    }
}
