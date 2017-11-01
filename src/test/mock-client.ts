import { UnfinishedMatch } from '../client';

export class MockArenaClient {

    getUnfinishedMatchesReply: UnfinishedMatch[] = [];

    getUnfinishedMatches() {
        return Promise.resolve(this.getUnfinishedMatchesReply);
    }

}