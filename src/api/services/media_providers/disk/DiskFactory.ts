import * as ffmpeg from 'fluent-ffmpeg';
import * as path from 'path';
import { injectable, inject} from 'inversify';
import 'reflect-metadata';
import * as fs from 'fs';

import AudioFactory from '../AudioFactory';
import AudioSource from '../AudioSource';
import { TYPES } from '../../../../Types';
import Song from '../../../../Song';

@injectable()
export default class DiskFactory implements AudioFactory{

    @inject(TYPES.AudioSource) private _disk_source : AudioSource
    @inject(TYPES.Config) private _config : any

    public getSong(file_path: string): Promise<Song> {
        return new Promise(
            (resolve, reject) => ffmpeg(
                this._config.adapters.disk.songs_directory
                + path.sep
                + file_path
            ).ffprobe((err, stream_metadata) => {
                if (err) {
                    reject(err)
                } else {
                    let id3_data = stream_metadata.format.tags || {};
                    resolve(new Song(
                        file_path,
                        stream_metadata.streams[0].duration,
                        this._disk_source,
                        stream_metadata.streams[0].sample_rate,
                        id3_data.title || undefined,
                        id3_data.artist || undefined,
                        id3_data.album || undefined,
                        (typeof id3_data.genre === 'undefined') ? undefined : id3_data.genre.split(';')
                    ));
                }
            })
        );
    }

    public listSongs(file_path: string): Promise<Song[]> {
        return new Promise((resolve, reject) => {
            let requestpath = path.resolve(
                this._config.adapters.disk.songs_directory,
                file_path
            );

            // Check to make sure requested path is actually within the songs_directory
            let songdir_abs = path.resolve(this._config.adapters.disk.songs_directory);
            if (requestpath.indexOf(songdir_abs) !== 0)
                return reject("Requested object does not exist");

            fs.readdir(requestpath, (err, files) => {
                if (err)
                    return reject("Failed while attempting to read object.");

                let results : Promise<Song>[] = [];

                files.forEach((file) => {
                    results.push(new Promise((resolve) => {
                        ffmpeg(
                            path.resolve(requestpath, file)
                        ).ffprobe((err, stream_metadata) => {
                            if (err) {
                                resolve();
                            } else if (!err) {
                                let id3_data = stream_metadata.format.tags || {};
                                resolve(new Song(
                                    file,
                                    stream_metadata.streams[0].duration,
                                    this._disk_source,
                                    stream_metadata.streams[0].sample_rate,
                                    id3_data.title || undefined,
                                    id3_data.artist || undefined,
                                    id3_data.album || undefined,
                                    (typeof id3_data.genre === 'undefined') ? undefined : id3_data.genre.split(';')
                                ));
                            }
                        });
                    }));
                });

                Promise.all(results).then((songs) => {
                    resolve(songs);
                });
            });
        });
    }
}
