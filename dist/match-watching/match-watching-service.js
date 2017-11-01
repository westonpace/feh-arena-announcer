"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const watched_match_1 = require("./watched-match");
class MatchWatchingService {
    constructor(arenaClient, broadcastService) {
        this.arenaClient = arenaClient;
        this.broadcastService = broadcastService;
        this.watchedMatches = {};
    }
    tuneIntoMatch(matchId, channelId) {
        let watch = this.watchedMatches[matchId];
        if (watch) {
            watch.addChannel(channelId);
        }
        else {
            this.createWatch(matchId, channelId);
        }
    }
    createWatch(matchId, channelId) {
        let watch = new watched_match_1.WatchedMatch(matchId, channelId, this.arenaClient, this.broadcastService);
        this.watchedMatches[matchId] = watch;
    }
    poll() {
        let finishedMatchIds = [];
        return Promise.all(Object.keys(this.watchedMatches).map(watchedMatchIdStr => {
            let watchedMatchId = parseInt(watchedMatchIdStr, 10);
            let watchedMatch = this.watchedMatches[watchedMatchId];
            return watchedMatch.poll().then(finished => {
                if (finished) {
                    finishedMatchIds.push(watchedMatchId);
                }
            });
        })).then(() => {
            for (let finishedMatchId of finishedMatchIds) {
                delete this.watchedMatches[finishedMatchId];
            }
        });
    }
}
exports.MatchWatchingService = MatchWatchingService;
//# sourceMappingURL=match-watching-service.js.map