import { Readable } from 'stream';

export default interface AudioSource {
    getAudio(url: string): Readable;
}
