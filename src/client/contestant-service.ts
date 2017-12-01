import { ArenaClient } from './arena-client';
import { Contestant } from './arena-model';

export class ContestantService {

    private contestants: {[key: string]: Contestant} = {};

    constructor(private client: ArenaClient) {

    }

    getContestant(name: string) {
        let result = this.contestants[name];
        if (result) {
            return Promise.resolve(result);
        }
        
        return this.client.getContestants().then(contestants => {
            for(let contestant of contestants) {
                this.contestants[contestant.name] = contestant;
            }
            let result = this.contestants[name];
            if (result) {
                return result;
            }
            throw new Error('No contestant found with name: ' + name);
        });
    }

}