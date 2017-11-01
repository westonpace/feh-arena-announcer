"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rp = require("request-promise-native");
class ArenaClient {
    constructor() {
        this.baseUrl = 'http://localhost:3000/';
    }
    apiCall(method, ...parts) {
        var methodString = method;
        var uri = this.baseUrl + parts.join('/');
        return rp({
            uri: uri,
            method: methodString,
            json: true
        }).then(rsp => {
            return rsp;
        });
    }
    getUnfinishedMatches() {
        return this.apiCall('GET', 'matches');
    }
    getMessagesForMatchSinceTimestamp(matchId, timestamp) {
        return this.apiCall('GET', 'matches', matchId.toString(), 'messages?since=' + timestamp);
    }
    getTiers() {
        return this.apiCall('GET', 'tiers');
    }
    getTierStats(tierName) {
        return this.apiCall('GET', 'statistics', 'tiers', tierName);
    }
}
exports.ArenaClient = ArenaClient;
//# sourceMappingURL=arena-client.js.map