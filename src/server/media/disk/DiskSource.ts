import fs from 'fs';
import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';
import AudioSource from '../AudioSource';

/**
 * Provides a mechanism to allow for the retrieval of audio from the filesystem. This class should not be used directly
 * but should instead be used by [[DiskFactory]] or a similar implementation of [[AudioFactory]]
 */
@Injectable()
export default class DiskSource implements AudioSource {
    /**
     * Retrieves the audio of the file specified by `file_path` as a readable stream. This method is wrapped by [[Song]]
     * when retrieving audio for a file on disk
     *
     * @param {string} filePath The path to the song to create an audio stream for. Relative to [[config.adapters.disk.songs_directory]]
     *
     * @returns {Readable}
     *
     * @memberof DiskSource
     */
    public getAudio(filePath: string): Readable {
        return fs.createReadStream(filePath);
    }
}
