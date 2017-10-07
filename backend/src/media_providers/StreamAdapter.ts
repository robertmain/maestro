import { Readable } from "stream";

export default interface StreamAdapter {
    getAudio(url : string) : Readable;
}