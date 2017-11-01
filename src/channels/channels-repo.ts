export interface ChannelRequest {
    name: string;
    id: string;
    serverName: string;
    serverId: string;
}

export type StoredChannel = ChannelRequest & { broadcast: boolean };

export class ChannelsRepository {

    private channels: {[key: string]: StoredChannel} = {};

    getAllChannels() {
        return Object.keys(this.channels).map(key => this.channels[key]);
    }

    findChannel(channel: ChannelRequest) {
        return this.channels[channel.id];
    }

    findById(channelId: string) {
        return this.channels[channelId];
    }

    private findOrCreateChannel(channel: ChannelRequest) {
        let existingChannel = this.findChannel(channel);
        if (existingChannel) {
            return existingChannel;
        }
        
        let newChannel: StoredChannel = {
            id: channel.id,
            name: channel.name,
            serverId: channel.serverId,
            serverName: channel.serverName,
            broadcast: false
        };

        this.channels[newChannel.id] = newChannel;
        return newChannel;
    }

    registerChannel(channel: ChannelRequest, broadcast: boolean) {
        let existingChannel = this.findOrCreateChannel(channel);
        existingChannel.broadcast = broadcast;
    }

    unregisterChannel(channel: ChannelRequest) {
        delete this.channels[channel.id];
    }

}