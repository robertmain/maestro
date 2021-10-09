import { Readable } from 'stream';

/**
 * Audio retrieval functionality. Classes looking to retrieve an audio stream based on UR(I|L) should implement this
 * interface
 *
 * @export
 *
 * @interface AudioSource
 */
export default interface AudioSource {
    getAudio(url: string): Readable;
};
