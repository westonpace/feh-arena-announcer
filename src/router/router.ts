import * as Discord from 'discord.js';

import { DiscordContext, TxContext } from '../context';

type RouteCallback = (message: Discord.Message, params: { [key: string]: string }, args: string[]) => Promise<void>;

class RouteContext {
    params: { [key: string]: string } = {};
    args: string[] = [];
}

interface RouteMatcher {
    matches(routePart: string): boolean;
    apply(routePart: string, context: RouteContext): void;
}

interface Route {
    path: RouteMatcher[];
    callback: RouteCallback;
}

class ParamMatcher implements RouteMatcher {

    constructor(private paramName: string) { }

    matches() { return true; }
    apply(routePart: string, context: RouteContext) {
        context.params[this.paramName] = routePart;
    }
}

class LiteralMatcher implements RouteMatcher {

    private literal: string;

    constructor(literalMixedCase: string) {
        this.literal = literalMixedCase.toLowerCase();
    }

    matches(pathPart: string) {
        return pathPart.toLowerCase() === this.literal;
    }
    apply() { }
}

export class Router {

    private temporaryRoutes: Route[] = [];
    private routes: Route[] = [];
    private discordContext = new DiscordContext();
    private txContext = new TxContext();
    private messageCounter = 0;

    constructor(public commandPrefix: string | null = null) {

    }

    private createMatcher(pathPart: string) {
        if(pathPart.startsWith(':')) {
            return new ParamMatcher(pathPart.substr(1));
        } else {
            return new LiteralMatcher(pathPart);
        }
    }

    addRoute(route: string[], callback: RouteCallback) {
        this.routes.push({
            path: route.map(pathPart => this.createMatcher(pathPart)),
            callback
        });
    }

    addTemporaryRoute(route: string[], callback: RouteCallback) {
        this.temporaryRoutes.push({
            path: route.map(pathPart => this.createMatcher(pathPart)),
            callback
        });
    }

    findRoute(routes: Route[], messageParts: string[]) {
        return routes
        .filter(route => route.path.length <= messageParts.length)
        .find(route => this.routeMatches(route, messageParts));
    }

    private routeMatches(route: Route, messageParts: string[]) {
        for(let i = 0; i < route.path.length; i++) {
            if(!route.path[i].matches(messageParts[i])) {
                return false;
            }
        }
        return true;
    }

    async route(message: Discord.Message): Promise<void> {
        let messageText = message.content;

        if(this.commandPrefix) {
            if(messageText.toLowerCase().startsWith(this.commandPrefix.toLowerCase())) {
                messageText = messageText.slice(this.commandPrefix.length);
            } else {
                return;
            }
        }

        let messageParts = messageText.split(/\s+/g);
        let route = this.findRoute(this.temporaryRoutes, messageParts);

        if (!route) {
            route = this.findRoute(this.routes, messageParts);
            if (route) {
                this.temporaryRoutes = [];
            }
        }

        if(!route) {
            if(this.commandPrefix) {
                message.reply('I see you are trying to say something...how does that make you feel?');
            }
            return;
        }

        let context = new RouteContext();
        for(let i = 0; i < messageParts.length; i++) {
            if(i < route.path.length) {
                route.path[i].apply(messageParts[i], context);
            } else {
                context.args.push(messageParts[i]);
            }
        }

        try {
            await this.txContext.beginTx('router-' + this.messageCounter++, async () => {
                await this.discordContext.beginTx(message, async () => {
                    await (route as Route).callback(message, context.params, context.args).catch(err => {
                        console.log(err);
                        message.reply('Oh...oh no!  I can clean this up.  Pleas don\'t kill me!  *puppy dog eyes*');
                    });
                });
            });
        }
        catch (err) {
            console.log(err);
            message.reply('Look what you made me do!  *grabs shoulders* LOOK WHAT YOU MADE ME DO!');
        }
    }

}