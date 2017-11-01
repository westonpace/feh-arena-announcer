"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../router");
const mock_client_1 = require("./mock-client");
const mock_discord_1 = require("./mock-discord");
class TestHarness {
    constructor(callback) {
        this.router = new router_1.Router();
        this.mockDiscord = new mock_discord_1.MockDiscord();
        this.mockArenaClient = new mock_client_1.MockArenaClient();
        callback(this.router, this.mockArenaClient);
    }
    sendMessage(message) {
        let discordMessage = new mock_discord_1.MockMessage(message, this.mockDiscord);
        return this.router.route(discordMessage);
    }
    get sentMessages() {
        return this.mockDiscord.sentMessages;
    }
    get sentReplies() {
        return this.mockDiscord.sentReplies;
    }
}
exports.TestHarness = TestHarness;
//# sourceMappingURL=test-harness.js.map