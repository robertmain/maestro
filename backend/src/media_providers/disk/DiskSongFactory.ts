import * as ffprobe from 'ffprobe';

import SongFactory from '../SongFactory'
import Song from '../../Song'
import DiskAdapter from './DiskAdapter'

export default class DiskSongFactory implements SongFactory{

    getSong(file_path: string): Promise<Song> {
        async function getSongData(){ 
            let song_metadata = await ffprobe(file_path);
            return new Song(
                file_path,
                'Title Unavailable',
                'Description Unavailable',
                song_metadata.streams[0].duration,
                new DiskAdapter()
            );
        };
        return getSongData();
    }

}