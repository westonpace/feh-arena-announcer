"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const util_1 = require("../util");
const ONE_MINUTE_MS = 60 * 1000;
const FIVE_MINUTES_MS = 5 * ONE_MINUTE_MS;
class ReportNextMatchTask {
    constructor(matchScanningService, broadcast) {
        this.matchScanningService = matchScanningService;
        this.broadcast = broadcast;
    }
    register(taskService) {
        taskService.scheduleRepeatingTask(ONE_MINUTE_MS, () => this.checkAndReport());
    }
    checkAndReport() {
        return __awaiter(this, void 0, void 0, function* () {
            let nextMatch = yield this.matchScanningService.scanForMatchesWithin(FIVE_MINUTES_MS);
            if (nextMatch) {
                let now = util_1.getCurrentTimestamp();
                let minutesUntilMatch = Math.round(Math.max(1, moment.duration(nextMatch.startTime - now).asMinutes()));
                this.broadcast.broadcastMessage('A match between ' +
                    nextMatch.contestantOneName +
                    ' and ' + nextMatch.contestantTwoName +
                    ' will be starting in about ' + minutesUntilMatch + ' minutes.' +
                    '  If you want to hear the match make sure to `tune in`');
            }
        });
    }
}
exports.ReportNextMatchTask = ReportNextMatchTask;
//# sourceMappingURL=report-next-match.js.map