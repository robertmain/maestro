import AudioSource from './api/services/media_providers/AudioSource'
import { Readable } from 'stream';

export default class Song{

    public constructor (
        readonly identifier     : string,
        readonly duration       : number,
        readonly audio_source   : AudioSource,
        readonly sample_rate    : number = 44100,
        readonly title          : string = 'Title Unavailable',
        readonly artist         : string = 'Unknown Artist',
        readonly album          : string = 'Unknown Album',
        readonly genre          : string = 'Unknown Genre'
    ){

    }

    public getAudio() : Promise<Readable>{
        return this.audio_source.getAudio(this.identifier);
    }
}