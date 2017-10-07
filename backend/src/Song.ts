import StreamAdapter from "./media_providers/StreamAdapter"

export default class Song{

    public readonly url : string;
    public readonly title : string;
    public readonly description : string;
    public readonly length : number;
    private stream_adapter : StreamAdapter;

    public constructor(url : string, title : string, description : string, length : number, stream_adapter : StreamAdapter){
        this.url            = url;
        this.title          = title;
        this.description    = description;
        this.length         = length;
        this.stream_adapter = stream_adapter;
    }

    public getAudio() {
        this.stream_adapter.getAudio(this.url);
    }
}