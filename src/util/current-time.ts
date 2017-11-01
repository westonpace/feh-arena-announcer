import * as moment from 'moment';

var currentMoment: moment.Moment | null = null;

export function getCurrentMoment() {
    if (currentMoment) {
        return currentMoment.clone();
    }

    return moment();
}

export function getCurrentTimestamp() {
    return getCurrentDate().getTime();
}

export function getCurrentDate() {
    return getCurrentMoment().toDate();
}

export function mockCurrentTime(newTime: moment.Moment) {
    currentMoment = newTime;
}

export function clearCurrentTimeMocking() {
    currentMoment = null;
}