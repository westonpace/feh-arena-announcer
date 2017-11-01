"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PrintTierListCommand {
    constructor(arenaClient) {
        this.arenaClient = arenaClient;
    }
    register(router) {
        router.addRoute(['tier', 'list'], (message) => this.printTierList(message));
    }
    printTierList(message) {
        return this.arenaClient.getTiers().then((tiers) => {
            let body = this.formatTiers(tiers);
            message.reply(body);
        });
    }
    formatTiers(tiers) {
        return tiers.map(tier => '**' + tier.name + '**').join('\n');
    }
}
exports.PrintTierListCommand = PrintTierListCommand;
//# sourceMappingURL=tier-list.js.map