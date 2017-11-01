"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PrintTierRosterCommand {
    constructor(arenaClient) {
        this.arenaClient = arenaClient;
    }
    register(router) {
        router.addRoute(['tier', ':tierName', 'roster'], (message, params) => this.printTierRoster(message, params.tierName));
    }
    printTierRoster(message, tierName) {
        return this.arenaClient.getTiers().then((tiers) => {
            let matchingTier = tiers.find(tier => tier.name.toLowerCase() === tierName.toLowerCase());
            if (matchingTier) {
                return this.getStats(matchingTier.name).then(stats => {
                    message.reply(this.formatRoster(matchingTier, stats));
                });
            }
            else {
                message.reply('Idiot.  There is no tier named ' + tierName + '.  Stop wasting my time.');
            }
        });
    }
    getStats(tierName) {
        return this.arenaClient.getTierStats(tierName);
    }
    formatRoster(tier, stats) {
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
exports.PrintTierRosterCommand = PrintTierRosterCommand;
//# sourceMappingURL=tier-roster.js.map