import { Readable } from 'stream';
import * as fs from "fs";

import StreamAdapter from '../StreamAdapter';

class Disk implements StreamAdapter{
    public getAudio(file_path : string): Readable {
        return fs.createReadStream(file_path);
    }
}