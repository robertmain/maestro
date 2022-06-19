import Song from './Song';

/**
 * An abstraction of a [[Song]] factory. Implementations of this interface must instanciate songs in such a way as
 * to provide them with the appropriate song metadata as well as a strategy for audio retreival.
 *
 * @export
 * @interface AudioFactory
 */
export default interface AudioFactory{
    getSong(id: string): Promise<Song>;
}
