import * as rp from 'request-promise-native';

import { UnfinishedMatch, Message, Tier, TierStats } from './arena-model';

type Method = 'GET' | 'PUT' | 'POST' | 'DELETE';

export class ArenaClient {

    private baseUrl = 'http://localhost:3000/';

    private apiCall<T>(method: Method, ...parts: string[]): Promise<T> {
        var methodString = method
        var uri = this.baseUrl + parts.join('/');
        return rp({
            uri: uri,
            method: methodString,
            json: true
        }).then(rsp => {
            return rsp as T;
        });
    }

    getUnfinishedMatches() {
        return this.apiCall<UnfinishedMatch[]>('GET', 'matches');
    }

    getMessagesForMatchSinceTimestamp(matchId: number, timestamp: number) {
        return this.apiCall<Message[]>('GET', 'matches', matchId.toString(), 'messages?since=' + timestamp);
    }

    getTiers() {
        return this.apiCall<Tier[]>('GET', 'tiers');
    }

    getTierStats(tierName: string) {
        return this.apiCall<TierStats>('GET', 'statistics', 'tiers', tierName);
    }

}