"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReportChannelStatusCommand {
    constructor(channelsRepository) {
        this.channelsRepository = channelsRepository;
    }
    register(router) {
        router.addRoute(['channel', 'status'], (message) => this.reportChannelStatus(message));
    }
    reportChannelStatus(message) {
        let channel = message.channel;
        if ('guild' in channel) {
            message.reply(this.getChannelStatus(channel));
        }
        else {
            message.reply('This channel is certifiable sewer garbage.');
        }
        return Promise.resolve();
    }
    getChannelStatus(channel) {
        let channelRecord = this.channelsRepository.findById(channel.id);
        if (channelRecord) {
            if (channelRecord.broadcast) {
                return 'Make noise.  Check.  Screaming.  Check.  I do it all';
            }
            else {
                return 'I can annoy you as long as I do it relatively quietly';
            }
        }
        else {
            return 'I\'m not talking but I want to.  Can I talk?  Pleeeeeease!';
        }
    }
}
exports.ReportChannelStatusCommand = ReportChannelStatusCommand;
//# sourceMappingURL=report-channel-status.js.map