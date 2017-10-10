import { Readable } from "stream";

export default interface MediaProvider {
    getAudio(url : string) : Readable;
}