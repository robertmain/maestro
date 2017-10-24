import * as express from 'express';
import { inject } from "inversify";
import "reflect-metadata";

import AudioFactory from '../services/media_providers/AudioFactory';
import { TYPES } from '../../Types';

export default class Song {
    private _df : AudioFactory;

    public constructor(
        @inject(TYPES.AudioFactory) DiskFactory : AudioFactory,
    ) {
        this._df = DiskFactory;
    }

    public getSong (req : express.Request, res : express.Response) : void {
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