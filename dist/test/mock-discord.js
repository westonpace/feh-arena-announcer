"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MockDiscord {
    constructor() {
        this.sentMessages = [];
        this.sentReplies = [];
    }
}
exports.MockDiscord = MockDiscord;
class MockGuild {
    constructor() {
        this.id = 'mockGuildId';
        this.name = 'mockGuildName';
    }
}
exports.MockGuild = MockGuild;
class MockChannel {
    constructor(discord) {
        this.discord = discord;
        this.id = 'mockChannelId';
        this.name = 'mockChannelName';
        this.guild = new MockGuild();
    }
    send(message) {
        this.discord.sentMessages.push(message);
    }
}
exports.MockChannel = MockChannel;
class MockMessage {
    constructor(content, discord) {
        this.content = content;
        this.discord = discord;
        this.channel = new MockChannel(this.discord);
    }
    reply(message) {
        this.discord.sentReplies.push(message);
    }
}
exports.MockMessage = MockMessage;
//# sourceMappingURL=mock-discord.js.map