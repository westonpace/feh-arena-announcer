export interface UnfinishedMatch {
    _id: number;
    contestantOneName: string;
    contestantTwoName: string;
    startTime: number;
    endTime: number;
}

export interface FinishedMatch extends UnfinishedMatch {
    result: {
        loserDied: boolean;
        contestantOneWon: boolean;
    }
}

export interface Message {
    sequence: number;
    body: string;
    last: boolean;
    timestamp: number;
}

export interface Contestant {
    name: string;
    profileImageName: string;
    gender: string;
    background: {
        hometown: string;
        occupation: string;
    };
    boon: string;
    bane: string;
    fehClass: string;
}

export interface Image {
    author: string;
    authorUrl: string;
    name: string;
    license: string;
    url: string;
}

export interface User {
    _id: string;
    name: string;
}

export interface Tier {
    name: string;
    contestants: string[];
}

export interface ContestantStats {
    _id: string;
    wins: number;
    losses: number;
    born: number;
    died: number;
}

export interface MatchHistoryPagingParameters {
    timeStart?: number;
    timeEnd?: number;
    idStart?: number;
    idEnd?: number;
}
