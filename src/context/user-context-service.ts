import { DiscordContext } from './discord-context';

export class UserContextService {

    private discordContext = new DiscordContext();
    private contextObjects: {[key: string]: {[key: string]: any}} = {};

    set(key: string, value: any) {
        this.findOrCreateUserContext()[key] = value;
    }

    get(key: string) {

        return this.findOrCreateUserContext()[key];
    }

    private findOrCreateUserContext() {
        let userId = this.discordContext.currentUser.id;
        let userContext = this.contextObjects[userId];
        if (userContext === undefined) {
            userContext = {};
            this.contextObjects[userId] = userContext;
        }

        return userContext;
    }

}