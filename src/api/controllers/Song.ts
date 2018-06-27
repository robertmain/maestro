import { inject, injectable } from "inversify";
import { interfaces, controller } from 'inversify-express-utils';

import AudioFactory from '../services/media_providers/AudioFactory';
import { TYPES } from '../../Types';

@injectable()
@controller('Song')
export default class Song implements interfaces.Controller {

    public constructor( @inject(TYPES.AudioFactory) private _audio_factory: AudioFactory) { }

    public getSong(args: any, callback: Function) {
        let song = this._audio_factory.getSong(args.song_name);

        song.then((song) => callback(null, song));
        song.catch((error: Error) => {
            callback(error);
        });
    }
}
