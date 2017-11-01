"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TuneInCommand {
    constructor(matchWatchingService, matchScanningService) {
        this.matchWatchingService = matchWatchingService;
        this.matchScanningService = matchScanningService;
    }
    register(router) {
        router.addRoute(['tune', 'in'], (message) => this.tuneIn(message));
    }
    tuneIn(message) {
        let lastReportedMatchId = this.matchScanningService.getLastReportedMatchId();
        if (lastReportedMatchId < 0) {
            message.reply('No matches have been reported yet.  There is nothing to tune into');
            return Promise.resolve();
        }
        let channel = message.channel;
        this.matchWatchingService.tuneIntoMatch(lastReportedMatchId, channel.id);
        message.reply('You have now tuned into the match');
        return Promise.resolve();
    }
}
exports.TuneInCommand = TuneInCommand;
//# sourceMappingURL=tune-in.js.map