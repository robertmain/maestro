import * as ffmpeg from 'fluent-ffmpeg';
import * as fs from "fs";
import { Readable } from 'stream';

import SongFactory from '../SongFactory'
import Song from '../../Song'
import StreamAdapter from '../StreamAdapter';

class DiskSongFactory implements SongFactory{
    
    getSong(file_path: string): Promise<Song> {
        return new Promise((resolve, reject) => ffmpeg(file_path).ffprobe( (err, stream_metadata) => {
            if (err) {
                reject(err)
            } else {
                let id3_data = stream_metadata.format.tags;
                resolve(new Song(
                    file_path,
                    id3_data.title || '',
                    id3_data.artist || '',
                    id3_data.album || '',
                    id3_data.genre || '',
                    stream_metadata.streams[0].duration,
                    new DiskAdapter()
                ));
            }
        }))
    }
    
}

class DiskAdapter implements StreamAdapter{
    public getAudio(file_path : string): Readable {
        if(fs.existsSync(file_path)) {
            return fs.createReadStream(file_path);
        } else {
            throw new Error('Unable to locate file ' + file_path + ' on disk')
        }
    }
}

export default DiskSongFactory;