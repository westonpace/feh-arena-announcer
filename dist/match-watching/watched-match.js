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
class WatchedMatch {
    constructor(matchId, channelId, client, broadcastService) {
        this.matchId = matchId;
        this.client = client;
        this.broadcastService = broadcastService;
        this.channels = new Set();
        this.lastTimestamp = -1;
        this.messageQueue = [];
        this.finished = false;
        this.channels.add(channelId);
    }
    addChannel(channelId) {
        this.channels.add(channelId);
    }
    poll() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.channels.size === 0) {
                this.finished = true;
                return this.finished;
            }
            if (!this.finished) {
                yield this.checkServerForMessages();
            }
            if (this.thereAreMessagesToReport()) {
                this.reportMessage();
                return false;
            }
            else {
                return this.finished;
            }
        });
    }
    thereAreMessagesToReport() {
        return this.messageQueue.length > 0;
    }
    popMessage() {
        return this.messageQueue.splice(0, 1)[0];
    }
    reportMessage() {
        let message = this.popMessage();
        this.broadcastService.sendMessageToChannels(message.body, Array.from(this.channels));
    }
    checkServerForMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            let messages = yield this.client.getMessagesForMatchSinceTimestamp(this.matchId, this.lastTimestamp);
            if (messages.length > 0) {
                let lastMessage = messages[messages.length - 1];
                this.finished = lastMessage.last;
                this.lastTimestamp = lastMessage.timestamp;
            }
            for (let message of messages) {
                this.messageQueue.push(message);
            }
        });
    }
}
exports.WatchedMatch = WatchedMatch;
//# sourceMappingURL=watched-match.js.map