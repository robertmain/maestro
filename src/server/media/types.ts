export interface SongMetaData {
    /**
     * Song duration in seconds
     */
    duration: number;

    /**
     * The sample rate to use for song playback and transcoding. Generally
     * assumed to be 44100 in most contexts
     */
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
