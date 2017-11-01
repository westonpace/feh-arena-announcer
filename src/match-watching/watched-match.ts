import { Message, ArenaClient } from '../client';
import { BroadcastService } from '../channels';

export class WatchedMatch {

    private channels = new Set<string>();
    private lastTimestamp = -1;
    private messageQueue: Message[] = [];
    private finished: boolean = false;

    constructor(private matchId: number, channelId: string, private client: ArenaClient, private broadcastService: BroadcastService) {
        this.channels.add(channelId);
    }

    addChannel(channelId: string) {
        this.channels.add(channelId);
    }

    async poll() {

        if(this.channels.size === 0) {
            this.finished = true;
            return this.finished;
        }

        if(!this.finished) {
            await this.checkServerForMessages();
        }

        if(this.thereAreMessagesToReport()) {
            this.reportMessage();
            return false;
        } else {
            return this.finished;
        }
    }

    private thereAreMessagesToReport() {
        return this.messageQueue.length > 0;
    }

    private popMessage() {
        return this.messageQueue.splice(0, 1)[0];
    }

    private reportMessage() {
        let message = this.popMessage();
        this.broadcastService.sendMessageToChannels(message.body, Array.from(this.channels));
    }

    private async checkServerForMessages() {
        let messages = await this.client.getMessagesForMatchSinceTimestamp(this.matchId, this.lastTimestamp);
        if(messages.length > 0) {
            let lastMessage = messages[messages.length - 1];
            this.finished = lastMessage.last;
            this.lastTimestamp = lastMessage.timestamp;
        }
        for(let message of messages) {
            this.messageQueue.push(message);
        }
    }

}