import { Message } from 'discord.js';

import { Router } from '../../router';
import { ArenaClient } from '../../client';

export class WhoAmICommand {

    constructor(private arenaClient: ArenaClient) {

    }

    register(router: Router) {
        router.addRoute(['whoami'], (message) => this.printName(message));
    }

    private async printName(message: Message) {
        let user = await this.arenaClient.getCurrentUser();
        message.reply('You are ' + user.name);
        message.channel.sendMessage('What kind of moron doesn\'t know their own name?');
    }

}