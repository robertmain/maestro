import { Readable } from "stream";

export default interface MediaProvider {
    getAudio(url : string) : Promise<Readable>;
}