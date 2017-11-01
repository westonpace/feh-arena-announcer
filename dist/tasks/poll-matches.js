"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const THIRTY_SECONDS_MS = 30 * 1000;
class PollMatchesTask {
    constructor(matchWatchingService) {
        this.matchWatchingService = matchWatchingService;
    }
    register(taskService) {
        taskService.scheduleRepeatingTask(THIRTY_SECONDS_MS, () => this.pollMatches());
    }
    pollMatches() {
        return this.matchWatchingService.poll();
    }
}
exports.PollMatchesTask = PollMatchesTask;
//# sourceMappingURL=poll-matches.js.map