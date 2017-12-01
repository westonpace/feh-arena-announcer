export interface UnfinishedMatch {
    id: number;
    contestantOneName: string;
    contestantTwoName: string;
    startTime: number;
    endTime: number;
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

export interface Tier {
    name: string;
    contestants: Contestant[];
}

export interface ContestantStats {
    wins: number;
    losses: number;
    born: number;
    died: number;
}

export type TierStats = { [key: string]: ContestantStats };