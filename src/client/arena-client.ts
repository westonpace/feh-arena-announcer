import * as rp from 'request-promise-native';
import * as queryString from 'query-string';

import { DiscordContext } from '../context';

import { UnfinishedMatch, FinishedMatch, Message, ContestantStats, Tier, Image, Contestant, User, MatchHistoryPagingParameters } from './arena-model';

type Method = 'GET' | 'PUT' | 'POST' | 'DELETE';

export class ArenaClient {

    private getBearerAuth() {
        let user = this.discordContext.tryGetCurrentUser();
        if (user) {
            return { bearer: this.discordContext.currentUser.id }
        } else {
            return undefined;
        }
    }

    private readOnlyApiCall<T>(method: Method, ...parts: string[]) {
        return this.apiCall<void, T>(method, null, ...parts);
    }

    private async apiCall<R, T>(method: Method, entity: R | null, ...parts: string[]): Promise<T> {
        var methodString = method
        var uri = this.baseUrl + parts.join('/');
        let params: rp.OptionsWithUri = {
            uri: uri,
            auth: this.getBearerAuth(),
            method: methodString,
            json: true
        };
        if (entity) {
            params.body = entity;
        }
        try {
            let rsp = await rp(params);
            return rsp as T;
        } catch (err) {
            if (err.name && err.name === 'StatusCodeError') {
                if(err.statusCode === 401) {
                    await this.register();
                    return this.apiCall<R, T>(method, entity, ...parts);
                }
            }
            throw err;
        }
    }

    private register() {
        return this.apiCall<String, void>(
            'POST',
            this.discordContext.currentUser.username,
            'users'
        );
    }

    private discordContext = new DiscordContext();

    constructor(private baseUrl: string) {

    }

    getUnfinishedMatches() {
        return this.readOnlyApiCall<UnfinishedMatch[]>('GET', 'matches');
    }

    getCurrentUser() {
        return this.readOnlyApiCall<User>('GET', 'users', 'me');
    }

    getImages() {
        return this.readOnlyApiCall<Image[]>('GET', 'images');
    }

    getContestants() {
        return this.readOnlyApiCall<Contestant[]>('GET', 'contestants');
    }

    getMessagesForMatchSinceTimestamp(matchId: number, timestamp: number) {
        return this.readOnlyApiCall<Message[]>('GET', 'matches', matchId.toString(), 'messages?since=' + timestamp);
    }

    getTiers() {
        return this.readOnlyApiCall<Tier[]>('GET', 'tiers');
    }

    getTierStats(tierName: string) {
        return this.readOnlyApiCall<ContestantStats[]>('GET', 'tiers', tierName, 'statistics');
    }

    getFinishedMatches(pagingParameters: MatchHistoryPagingParameters) {
        let query = queryString.stringify(pagingParameters);
        return this.readOnlyApiCall<FinishedMatch[]>('GET', 'match-history?' + query);
    }

}