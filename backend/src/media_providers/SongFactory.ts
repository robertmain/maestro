import Song from "../Song";

export default interface SongFactory{
    getSong(id : string) : Promise<Song>
}