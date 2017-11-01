import { Message, GuildChannel } from 'discord.js';

import { ChannelsRepository } from '../channels';
import { Router } from '../router';

export class ReportChannelStatusCommand {

    constructor(private channelsRepository: ChannelsRepository) {

    }

    register(router: Router) {
        router.addRoute(['channel', 'status'], (message) => this.reportChannelStatus(message));
    }

    private reportChannelStatus(message: Message) {
        let channel = message.channel;
        if ('guild' in channel) {
            message.reply(this.getChannelStatus(channel as GuildChannel));
        } else {
            message.reply('This channel is certifiable sewer garbage.');
        }
        return Promise.resolve();
    }

    private getChannelStatus(channel: GuildChannel) {
        let channelRecord = this.channelsRepository.findById(channel.id);
        if (channelRecord) {
            if(channelRecord.broadcast) {
                return 'Make noise.  Check.  Screaming.  Check.  I do it all';
            } else {
                return 'I can annoy you as long as I do it relatively quietly';
            }
        } else {
            return 'I\'m not talking but I want to.  Can I talk?  Pleeeeeease!';
        }
    }

}