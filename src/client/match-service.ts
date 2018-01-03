import { UserContextService } from '../context';

import { ArenaClient } from './arena-client';
import { FinishedMatch } from './arena-model';

export class MatchHistoryCursor {
    endTime: number | null;
    previousEndTimes: number[];
    lastResults: FinishedMatch[];
}

const PAGING_CONTEXT_KEY = 'match-history-paging';

export class MatchService {

    constructor(private client: ArenaClient, private userContextService: UserContextService) {

    }

    async getFinishedMatches(): Promise<MatchHistoryCursor> {
        let result = await this.client.getFinishedMatches({});
        let cursor: MatchHistoryCursor = { endTime: null, lastResults: result, previousEndTimes: [] };
        this.userContextService.set(PAGING_CONTEXT_KEY, cursor);
        return cursor;
    }

    async pageBackwards(): Promise<MatchHistoryCursor> {
        let currentPaging = this.userContextService.get(PAGING_CONTEXT_KEY) as MatchHistoryCursor;
        let oldEndTime = currentPaging.endTime;
        currentPaging.endTime = currentPaging.lastResults[currentPaging.lastResults.length - 1].startTime;
        let result = await this.client.getFinishedMatches({timeEnd: currentPaging.endTime as number});
        if (result.length > 0) {
            currentPaging.lastResults = result;
            if (oldEndTime !== null) {
                currentPaging.previousEndTimes.push(oldEndTime);
            }
        } else {
            currentPaging.endTime = oldEndTime;
        }
        return currentPaging;
    }

    async pageForwards(): Promise<MatchHistoryCursor> {
        let currentPaging = this.userContextService.get(PAGING_CONTEXT_KEY) as MatchHistoryCursor;
        if (currentPaging.previousEndTimes.length === 0) {
            currentPaging.endTime = null;
        } else {
            currentPaging.endTime = currentPaging.previousEndTimes.pop() as number;
        }
        let result = await this.client.getFinishedMatches({timeEnd: currentPaging.endTime as number});
        currentPaging.lastResults = result;
        return currentPaging;
    }

}