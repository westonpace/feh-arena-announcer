"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ChannelsRepository {
    constructor() {
        this.channels = {};
    }
    getAllChannels() {
        return Object.keys(this.channels).map(key => this.channels[key]);
    }
    findChannel(channel) {
        return this.channels[channel.id];
    }
    findById(channelId) {
        return this.channels[channelId];
    }
    findOrCreateChannel(channel) {
        let existingChannel = this.findChannel(channel);
        if (existingChannel) {
            return existingChannel;
        }
        let newChannel = {
            id: channel.id,
            name: channel.name,
            serverId: channel.serverId,
            serverName: channel.serverName,
            broadcast: false
        };
        this.channels[newChannel.id] = newChannel;
        return newChannel;
    }
    registerChannel(channel, broadcast) {
        let existingChannel = this.findOrCreateChannel(channel);
        existingChannel.broadcast = broadcast;
    }
    unregisterChannel(channel) {
        delete this.channels[channel.id];
    }
}
exports.ChannelsRepository = ChannelsRepository;
//# sourceMappingURL=channels-repo.js.map