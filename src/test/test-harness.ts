import { Message } from 'discord.js';

import { ArenaClient } from '../client';
import { Router } from '../router';

import { MockArenaClient } from './mock-client';
import { MockDiscord, MockMessage } from './mock-discord';

export class TestHarness {

    mockArenaClient: MockArenaClient;
    private router: Router = new Router();
    private mockDiscord: MockDiscord = new MockDiscord();

    constructor(callback: (router: Router, arenaClient: ArenaClient) => void) {
        this.mockArenaClient = new MockArenaClient();
        callback(this.router, this.mockArenaClient as any as ArenaClient);
    }

    sendMessage(message: string) {
        let discordMessage = new MockMessage(message, this.mockDiscord);
        return this.router.route(discordMessage as any as Message);
    }

    get sentMessages() {
        return this.mockDiscord.sentMessages;
    }

    get sentReplies() {
        return this.mockDiscord.sentReplies;
    }
}