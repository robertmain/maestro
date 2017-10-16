import MediaProvider from "./media_providers/MediaProvider"
import { Readable } from "stream";

export default class Song{

    public constructor (
        readonly identifier     : string,
        readonly duration       : number,
        readonly stream_adapter : MediaProvider, 
        readonly title          : string = 'Title Unavailable',
        readonly artist         : string = 'Unknown Artist',
        readonly album          : string = 'Unknown Album',
        readonly genre          : string = 'Unknown Genre'
    ){
        
    }

    public getAudio() : Promise<Readable>{
        return this.stream_adapter.getAudio(this.identifier);
    }
}