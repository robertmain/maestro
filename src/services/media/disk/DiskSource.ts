import fs from 'fs';

import AudioSource from '../AudioSource';
import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';

@Injectable()
export default class DiskSource implements AudioSource {

    public getAudio(file_path: string): Readable {
        return fs.createReadStream(file_path);
    }
}
