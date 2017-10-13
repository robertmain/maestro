import MediaProvider from "./media_providers/MediaProvider"
import { Readable } from "stream";

export default class Song{

    public readonly url : string;
    public readonly title : string;
    public readonly artist : string;
    public readonly album : string;
    public readonly genre : string; 
    public readonly duration : number;
    private stream_adapter : MediaProvider;

    public constructor(url : string, title : string, artist : string, album : string, genre : string, duration : number, stream_adapter : MediaProvider){
        this.url            = url;
        this.title          = title || 'Title Unavailable';
        this.artist         = artist || 'Unknown Artist';
        this.album          = album || 'Unknown Album';
        this.genre          = genre || 'Unknown Genre';
        this.duration       = duration;
        this.stream_adapter = stream_adapter;
    }

    public getAudio() : Promise<Readable>{
        return this.stream_adapter.getAudio(this.url);
    }
}