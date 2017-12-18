import { Message } from 'discord.js';

import { Router } from '../../router';

export class PrintNameCommand {

    constructor(private name: string) {

    }

    register(router: Router) {
        router.addRoute(['whodis'], (message) => this.printName(message));
    }

    private printName(message: Message) {
        message.reply('This is ' + this.name);
        return Promise.resolve();
    }

}