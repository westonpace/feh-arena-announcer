export class MockDiscord {

    sentMessages: string[] = [];
    sentReplies: string[] = [];

}

export class MockGuild {
    id = 'mockGuildId';
    name = 'mockGuildName';
}

export class MockChannel {

    id = 'mockChannelId';
    name = 'mockChannelName';
    guild = new MockGuild();

    constructor(private discord: MockDiscord) {

    }

    send(message: string) {
        this.discord.sentMessages.push(message);
    }

}

export class MockMessage {

    constructor(public content: string, private discord: MockDiscord) {

    }

    reply(message: string) {
        this.discord.sentReplies.push(message);
    }

    channel = new MockChannel(this.discord);
}