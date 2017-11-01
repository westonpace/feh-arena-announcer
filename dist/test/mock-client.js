"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MockArenaClient {
    constructor() {
        this.getUnfinishedMatchesReply = [];
    }
    getUnfinishedMatches() {
        return Promise.resolve(this.getUnfinishedMatchesReply);
    }
}
exports.MockArenaClient = MockArenaClient;
//# sourceMappingURL=mock-client.js.map