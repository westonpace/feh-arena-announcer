import * as cls from 'cls-hooked';

import { Message, User } from 'discord.js';

export const discordNamespace = cls.createNamespace('discord');
export const DISCORD_USER_KEY = 'discord-user';
export const DISCORD_MESSAGE_KEY = 'discord-message';

export class DiscordContext {

    async beginTx(message: Message, operation: () => Promise<void>) {
        await new Promise((resolve, reject) => {
            discordNamespace.run(() => {
                discordNamespace.set(DISCORD_MESSAGE_KEY, message);
                discordNamespace.set(DISCORD_USER_KEY, message.author);
                operation().then(() => resolve()).catch(err => reject(err));
            });
        });
    }

    get currentMessage(): Message {
        let result = discordNamespace.get(DISCORD_MESSAGE_KEY);
        if (result === undefined || result === null) {
            throw new Error('This operation requires a discord context');
        }
        return result;
    }

    get currentUser(): User {
        let result = discordNamespace.get(DISCORD_USER_KEY);
        if (result === undefined || result === null) {
            throw new Error('This operation requires a discord context');
        }
        return result;
    }

    tryGetCurrentUser(): User {
        return discordNamespace.get(DISCORD_USER_KEY);
    }
    
}

