import { Message } from 'discord.js';

import { Router } from '../../router';
import { ArenaClient, Tier, TierStats } from '../../client';

export class PrintTierRosterCommand {

    constructor(private arenaClient: ArenaClient) {

    }

    register(router: Router) {
        router.addRoute(['tier', ':tierName', 'roster'], (message, params) => this.printTierRoster(message, params.tierName));
    }

    private printTierRoster(message: Message, tierName: string) {
        return this.arenaClient.getTiers().then((tiers) => {
            let matchingTier = tiers.find(tier => tier.name.toLowerCase() === tierName.toLowerCase());
            if (matchingTier) {
                return this.getStats(matchingTier.name).then(stats => {
                    message.reply(this.formatRoster(matchingTier as Tier, stats));
                });
            } else {
                message.reply('Idiot.  There is no tier named ' + tierName + '.  Stop wasting my time.');
            }
        });
    }

    private getStats(tierName: string) {
        return this.arenaClient.getTierStats(tierName);
    }

    private formatRoster(tier: Tier, stats: TierStats) {
        let contestantsWithStats = tier.contestants.map(contestant => {
            let stat = stats[contestant.name];
            return {
                name: contestant.name,
                wins: stat.wins,
                losses: stat.losses,
                score: stat.wins - stat.losses
            };
        });
        contestantsWithStats.sort((a, b) => Math.sign(a.score - b.score));
        return 'Roster for tier **' + tier.name + '**\n' +
        contestantsWithStats.map(contestant => '*' + contestant.name + '* W:' + contestant.wins + ' L: ' + contestant.losses + ' Score: ' + contestant.score).join('\n');
    }

}