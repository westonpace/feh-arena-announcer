"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RegisterChannelCommand {
    constructor(channelsRepository) {
        this.channelsRepository = channelsRepository;
    }
    register(router) {
        router.addRoute(['channel', 'register'], (message, _, args) => this.registerChannel(message, args));
    }
    registerChannel(message, args) {
        let channel = message.channel;
        if ('guild' in channel) {
            let guildChannel = channel;
            if (args.length > 0 && args[0].toLowerCase() === 'broadcast') {
                this.registerForBroadcast(guildChannel);
                message.reply('I get to yell at you?!  Yay!');
            }
            else if (args.length > 0 && args[0].toLowerCase() === 'off') {
                this.unregister(guildChannel);
                message.reply('Only speak when spoken to, got it!');
            }
            else {
                this.registerForNormal(guildChannel);
                message.reply('I\'m gonna talk your ear off.  I\'ll never stop talking.  I am just going to go on and on and on and on and...');
            }
        }
        else {
            message.reply('Can only register on normal server channels.  You can shove this dumb channel up your ass.');
        }
        return Promise.resolve();
    }
    getChannelRequest(channel) {
        return {
            id: channel.id,
            name: channel.name,
            serverId: channel.guild.id,
            serverName: channel.guild.name
        };
    }
    registerForBroadcast(channel) {
        this.channelsRepository.registerChannel(this.getChannelRequest(channel), true);
    }
    unregister(channel) {
        this.channelsRepository.unregisterChannel(this.getChannelRequest(channel));
    }
    registerForNormal(channel) {
        this.channelsRepository.registerChannel(this.getChannelRequest(channel), false);
    }
}
exports.RegisterChannelCommand = RegisterChannelCommand;
//# sourceMappingURL=register-channel.js.map