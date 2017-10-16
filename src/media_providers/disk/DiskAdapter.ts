import * as fs from 'fs';

import { Readable } from 'stream';
import MediaProvider from '../MediaProvider';

export default class DiskAdapter implements MediaProvider {

    public getAudio(file_path : string): Promise<Readable> {
        return new Promise((resolve, reject) => {
            if(fs.existsSync(file_path)) {
                resolve(fs.createReadStream(file_path));
            } else {
                reject('unable to find file: ' + file_path  + ' on disk');
            }
        })
    }

}