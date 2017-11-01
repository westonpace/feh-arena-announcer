"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
class PrintScheduleCommand {
    constructor(arenaClient) {
        this.arenaClient = arenaClient;
    }
    register(router) {
        router.addRoute(['schedule'], (message) => this.handleMessage(message));
    }
    handleMessage(message) {
        return this.arenaClient.getUnfinishedMatches().then(matches => {
            let formattedMessage = this.printSchedule(matches);
            message.channel.send(formattedMessage);
        });
    }
    printSchedule(matches) {
        return matches.map(match => this.printMatch(match)).join('\n');
    }
    printMatch(match) {
        let startTimeStr = moment(match.startTime).toString();
        return match.contestantOneName + ' Vs. ' + match.contestantTwoName + ' @ ' + startTimeStr;
    }
}
exports.PrintScheduleCommand = PrintScheduleCommand;
//# sourceMappingURL=print-schedule.js.map