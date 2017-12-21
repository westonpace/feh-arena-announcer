import * as rp from 'request-promise-native';

import { UnfinishedMatch, Message, ContestantStats, Tier, Image, Contestant } from './arena-model';

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
        }).then((rsp: any) => {
            return rsp as T;
        });
    }

    getUnfinishedMatches() {
        return this.apiCall<UnfinishedMatch[]>('GET', 'matches');
    }

    getImages() {
        return this.apiCall<Image[]>('GET', 'images');
    }

    getContestants() {
        return this.apiCall<Contestant[]>('GET', 'contestants');
    }

    getMessagesForMatchSinceTimestamp(matchId: number, timestamp: number) {
        return this.apiCall<Message[]>('GET', 'matches', matchId.toString(), 'messages?since=' + timestamp);
    }

    getTiers() {
        return this.apiCall<Tier[]>('GET', 'tiers');
    }

    getTierStats(tierName: string) {
        return this.apiCall<ContestantStats[]>('GET', 'tiers', tierName, 'statistics');
    }

}