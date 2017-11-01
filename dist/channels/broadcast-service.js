"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class BroadcastService {
    constructor(channelsRepository, discordClient) {
        this.channelsRepository = channelsRepository;
        this.discordClient = discordClient;
    }
    broadcastMessage(message) {
        for (let channel of this.channelsRepository.getAllChannels()) {
            this.sendMessageToChannel(message, channel);
        }
    }
    sendMessageToChannels(message, channelIds) {
        for (let channelId of channelIds) {
            let storedChannel = this.channelsRepository.findById(channelId);
            if (storedChannel) {
                this.sendMessageToChannel(message, storedChannel);
            }
            else {
                console.log('Cannot send message to channel with id ' + channelId + ' because it no longer exists');
            }
        }
    }
    sendMessageToChannel(message, channel) {
        if (channel.broadcast) {
            message = '@here ' + message;
        }
        let guild = this.discordClient.guilds.get(channel.serverId);
        if (!guild) {
            console.log('Could not locate server named: ' + channel.serverName + ' (' + channel.serverId + ') I should probably clean up or something at this point');
            return;
        }
        let discordChannel = this.discordClient.channels.get(channel.id);
        if (!discordChannel) {
            console.log('Could not locate channel ' + channel.name + ' (' + channel.id + ') but we were able to locate the server ' + channel.serverName + ' so there is that');
            return;
        }
        if (discordChannel instanceof discord_js_1.TextChannel) {
            discordChannel.send(message);
        }
        else {
            console.log('Uh...you want me to send a message to what?  The channel ' + channel.name + ' on the server ' + channel.serverName + ' is not a text based channel');
        }
    }
}
exports.BroadcastService = BroadcastService;
//# sourceMappingURL=broadcast-service.js.map