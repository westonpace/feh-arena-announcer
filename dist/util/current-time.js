"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
var currentMoment = null;
function getCurrentMoment() {
    if (currentMoment) {
        return currentMoment.clone();
    }
    return moment();
}
exports.getCurrentMoment = getCurrentMoment;
function getCurrentTimestamp() {
    return getCurrentDate().getTime();
}
exports.getCurrentTimestamp = getCurrentTimestamp;
function getCurrentDate() {
    return getCurrentMoment().toDate();
}
exports.getCurrentDate = getCurrentDate;
function mockCurrentTime(newTime) {
    currentMoment = newTime;
}
exports.mockCurrentTime = mockCurrentTime;
function clearCurrentTimeMocking() {
    currentMoment = null;
}
exports.clearCurrentTimeMocking = clearCurrentTimeMocking;
//# sourceMappingURL=current-time.js.map