"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RouteContext {
    constructor() {
        this.params = {};
        this.args = [];
    }
}
class ParamMatcher {
    constructor(paramName) {
        this.paramName = paramName;
    }
    matches() { return true; }
    apply(routePart, context) {
        context.params[this.paramName] = routePart;
    }
}
class LiteralMatcher {
    constructor(literalMixedCase) {
        this.literal = literalMixedCase.toLowerCase();
    }
    matches(pathPart) {
        return pathPart.toLowerCase() === this.literal;
    }
    apply() { }
}
class Router {
    constructor(commandPrefix = null) {
        this.commandPrefix = commandPrefix;
        this.routes = [];
    }
    createMatcher(pathPart) {
        if (pathPart.startsWith(':')) {
            return new ParamMatcher(pathPart.substr(1));
        }
        else {
            return new LiteralMatcher(pathPart);
        }
    }
    addRoute(route, callback) {
        this.routes.push({
            path: route.map(pathPart => this.createMatcher(pathPart)),
            callback: callback
        });
    }
    findRoute(messageParts) {
        return this.routes
            .filter(route => route.path.length <= messageParts.length)
            .find(route => this.routeMatches(route, messageParts));
    }
    routeMatches(route, messageParts) {
        for (let i = 0; i < route.path.length; i++) {
            if (!route.path[i].matches(messageParts[i])) {
                return false;
            }
        }
        return true;
    }
    route(message) {
        let messageText = message.content;
        if (this.commandPrefix) {
            if (messageText.toLowerCase().startsWith(this.commandPrefix.toLowerCase())) {
                messageText = messageText.slice(this.commandPrefix.length);
            }
            else {
                return Promise.resolve();
            }
        }
        let messageParts = messageText.split(/\s+/g);
        let route = this.findRoute(messageParts);
        if (!route) {
            if (this.commandPrefix) {
                message.reply('I see you are trying to say something...how does that make you feel?');
            }
            return Promise.resolve();
        }
        let context = new RouteContext();
        for (let i = 0; i < messageParts.length; i++) {
            if (i < route.path.length) {
                route.path[i].apply(messageParts[i], context);
            }
            else {
                context.args.push(messageParts[i]);
            }
        }
        try {
            return route.callback(message, context.params, context.args).catch(err => {
                console.log(err);
                message.reply('Oh...oh no!  I can clean this up.  Pleas don\'t kill me!  *puppy dog eyes*');
            });
        }
        catch (err) {
            console.log(err);
            message.reply('Look what you made me do!  *grabs shoulders* LOOK WHAT YOU MADE ME DO!');
            return Promise.resolve();
        }
    }
}
exports.Router = Router;
//# sourceMappingURL=router.js.map