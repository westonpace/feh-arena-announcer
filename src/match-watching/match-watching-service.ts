import { ArenaClient } from '../client';
import { BroadcastService } from '../channels';

import { WatchedMatch } from './watched-match';

export class MatchWatchingService {

    private watchedMatches: { [key: number]: WatchedMatch } = {};

    constructor(private arenaClient: ArenaClient, private broadcastService: BroadcastService) {

    }

    tuneIntoMatch(matchId: number, channelId: string) {
        let watch = this.watchedMatches[matchId];
        if (watch) {
            watch.addChannel(channelId);
        } else {
            this.createWatch(matchId, channelId);
        }
    }

    private createWatch(matchId: number, channelId: string) {
        let watch = new WatchedMatch(matchId, channelId, this.arenaClient, this.broadcastService);
        this.watchedMatches[matchId] = watch;
    }

    poll() {
        let finishedMatchIds: number[] = [];
        return Promise.all(Object.keys(this.watchedMatches).map(watchedMatchIdStr => {
            let watchedMatchId = parseInt(watchedMatchIdStr, 10);
            let watchedMatch = this.watchedMatches[watchedMatchId];
            return watchedMatch.poll().then(finished => {
                if (finished) {
                    finishedMatchIds.push(watchedMatchId);
                }
            });
        })).then(() => {
            for(let finishedMatchId of finishedMatchIds) {
                delete this.watchedMatches[finishedMatchId];
            }
        });
    }

}