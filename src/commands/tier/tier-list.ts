import { Message } from 'discord.js';

import { Router } from '../../router';
import { ArenaClient, Tier } from '../../client';

export class PrintTierListCommand {

    constructor(private arenaClient: ArenaClient) {

    }

    register(router: Router) {
        router.addRoute(['tier', 'list'], (message) => this.printTierList(message));
    }

    private printTierList(message: Message) {
        return this.arenaClient.getTiers().then((tiers) => {
            let body = this.formatTiers(tiers);
            message.reply(body);
        });
    }

    private formatTiers(tiers: Tier[]) {
        return tiers.map(tier => '**' + tier.name + '**').join('\n');
    }

}