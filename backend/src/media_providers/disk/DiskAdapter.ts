import { Readable } from 'stream';
import * as fs from "fs";

import StreamAdapter from '../StreamAdapter';

export default class DiskAdapter implements StreamAdapter{
    public getAudio(file_path : string): Readable {
        if(fs.existsSync(file_path)) {
            return fs.createReadStream(file_path);
        } else {
            throw new Error('Unable to locate file ' + file_path + ' on disk')
        }
    }
}