import { ArenaClient } from '../client';
import { getCurrentTimestamp } from '../util';

export class MatchScanningService {

    private lastReportedMatchId = -1;

    constructor(private arenaClient: ArenaClient) {

    }

    getLastReportedMatchId() {
        return this.lastReportedMatchId;
    }

    async scanForMatchesWithin(ms: number) {
        let unfinishedMatches = await this.arenaClient.getUnfinishedMatches();
        let nextMatch = unfinishedMatches[0];

        if(nextMatch.id === this.lastReportedMatchId) {
            return null;
        }

        let now = getCurrentTimestamp();
        if(nextMatch.startTime - now < ms) {
            this.lastReportedMatchId = nextMatch.id;
            return nextMatch;
        }

        return null;
    }

}