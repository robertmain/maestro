import * as express from 'express';
import { inject, injectable } from "inversify";
import { interfaces, controller, httpGet, queryParam, response } from 'inversify-express-utils';
import "reflect-metadata";

import AudioFactory from '../services/media_providers/AudioFactory';
import { TYPES } from '../../Types';

@injectable()
@controller('/song')
export default class Song  implements interfaces.Controller{

    public constructor(@inject(TYPES.AudioFactory) private _df : AudioFactory) {}

    @httpGet('/')
    public getSong (@queryParam("song_name") song_name : string, @response() res : express.Response) {
        let song = this._df.getSong(song_name);

        song.then((song) => res.json(song));
        song.catch((e : Error) => {
            console.log(e.message);
            res.send('Something broke....');
        });
    }
}
