/**
 *
 * @param sampleRate  The sample rate of a song, this is usually safe to leave at 44100
 * @param title       The song title (song metadata - this is displayed to the user)
 * @param artist      The song artist (song metadata - this is displayed to the user)
 * @param album       The song album (song metadata - this is displayed to the user)
 * @param genre       The song genre(s) (song metadata - this is displayed to the user). Some songs do have more
 *                    than one genre, which is why this is an array of strings, rather than just a string.
 */
export interface SongMetaData {
    duration: number;

    sampleRate?: number;

    title?: string;

    artist?: string;

    album?: string;

    genre?: string[];
}

/**
 * Token used to inject the music library path into the DiskModule
 */
export const LIBRARY_URL = 'library_url';
