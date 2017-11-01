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
const util_1 = require("../util");
class MatchScanningService {
    constructor(arenaClient) {
        this.arenaClient = arenaClient;
        this.lastReportedMatchId = -1;
    }
    getLastReportedMatchId() {
        return this.lastReportedMatchId;
    }
    scanForMatchesWithin(ms) {
        return __awaiter(this, void 0, void 0, function* () {
            let unfinishedMatches = yield this.arenaClient.getUnfinishedMatches();
            let nextMatch = unfinishedMatches[0];
            if (nextMatch.id === this.lastReportedMatchId) {
                return null;
            }
            let now = util_1.getCurrentTimestamp();
            if (nextMatch.startTime - now < ms) {
                this.lastReportedMatchId = nextMatch.id;
                return nextMatch;
            }
            return null;
        });
    }
}
exports.MatchScanningService = MatchScanningService;
//# sourceMappingURL=match-scanning-service.js.map