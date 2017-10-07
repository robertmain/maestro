import { Readable } from 'stream';
import * as fs from "fs";

import StreamAdapter from '../StreamAdapter';

export default class DiskAdapter implements StreamAdapter{
    public getAudio(file_path : string): Readable {
        return fs.createReadStream(file_path);
    }
}