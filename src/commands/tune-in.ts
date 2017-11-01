import { Message } from 'discord.js';

import { Router } from '../router';
import { MatchWatchingService, MatchScanningService } from '../match-watching';

export class TuneInCommand {

    constructor(private matchWatchingService: MatchWatchingService, private matchScanningService: MatchScanningService) {

    }

    register(router: Router) {
        router.addRoute(['tune', 'in'], (message) => this.tuneIn(message));
    }

    private tuneIn(message: Message) {
        let lastReportedMatchId = this.matchScanningService.getLastReportedMatchId();

        if(lastReportedMatchId < 0) {
            message.reply('No matches have been reported yet.  There is nothing to tune into');
            return Promise.resolve();
        }

        let channel = message.channel;
        this.matchWatchingService.tuneIntoMatch(lastReportedMatchId, channel.id);
        message.reply('You have now tuned into the match');
        return Promise.resolve();
    }

}