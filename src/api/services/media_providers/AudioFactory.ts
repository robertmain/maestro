import Song from "Song";

export default interface AudioFactory{
    getSong(id : string) : Promise<Song>
}
