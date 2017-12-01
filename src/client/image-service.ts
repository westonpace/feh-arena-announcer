import { ArenaClient } from './arena-client';
import { Image } from './arena-model';

export class ImageService {

    private images: {[key: string]: Image} = {};

    constructor(private client: ArenaClient) {

    }

    getImage(name: string) {
        let result = this.images[name];
        if (result) {
            return Promise.resolve(result);
        }
        
        return this.client.getImages().then(images => {
            for(let image of images) {
                this.images[image.name] = image;
            }
            let result = this.images[name];
            if (result) {
                return result;
            }
            throw new Error('No image found with name: ' + name);
        });
    }

}