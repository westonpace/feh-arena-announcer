import { Message, GuildChannel } from 'discord.js';

import { Router } from '../router';
import { ChannelsRepository, ChannelRequest } from '../channels';

export class RegisterChannelCommand {

    constructor(private channelsRepository: ChannelsRepository) {

    }

    register(router: Router) {
        router.addRoute(['channel', 'register'], (message, _, args) => this.registerChannel(message, args));
    }

    private registerChannel(message: Message, args: string[]) {
        let channel = message.channel;
        if ('guild' in channel) {
            let guildChannel = channel as GuildChannel;
            if(args.length > 0 && args[0].toLowerCase() === 'broadcast') {
                this.registerForBroadcast(guildChannel);
                message.reply('I get to yell at you?!  Yay!')
            } else if (args.length > 0 && args[0].toLowerCase() === 'off') {
                this.unregister(guildChannel);
                message.reply('Only speak when spoken to, got it!');
            } else {
                this.registerForNormal(guildChannel);
                message.reply('I\'m gonna talk your ear off.  I\'ll never stop talking.  I am just going to go on and on and on and on and...');
            }
        } else {
            message.reply('Can only register on normal server channels.  You can shove this dumb channel up your ass.');
        }
        return Promise.resolve();
    }

    private getChannelRequest(channel: GuildChannel): ChannelRequest {
        return {
            id: channel.id,
            name: channel.name,
            serverId: channel.guild.id,
            serverName: channel.guild.name
        };
    }

    private registerForBroadcast(channel: GuildChannel) {
        this.channelsRepository.registerChannel(this.getChannelRequest(channel), true);
    }

    private unregister(channel: GuildChannel) {
        this.channelsRepository.unregisterChannel(this.getChannelRequest(channel));
    }

    private registerForNormal(channel: GuildChannel) {
        this.channelsRepository.registerChannel(this.getChannelRequest(channel), false);
    }

}