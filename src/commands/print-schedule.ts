import * as moment from 'moment';
import { Message } from 'discord.js';

import { Router } from '../router';
import { ArenaClient, UnfinishedMatch } from '../client';

export class PrintScheduleCommand {

    constructor(private arenaClient: ArenaClient) {
        
    }

    register(router: Router) {
        router.addRoute(['schedule'], (message) => this.handleMessage(message));
    }

    handleMessage(message: Message) {
        return this.arenaClient.getUnfinishedMatches().then(matches => {
            let formattedMessage = this.printSchedule(matches);
            message.channel.send(formattedMessage);
        });
    }

    printSchedule(matches: UnfinishedMatch[]) {
        return matches.map(match => this.printMatch(match)).join('\n');
    }

    printMatch(match: UnfinishedMatch) {
        let startTimeStr = moment(match.startTime).toString();
        return match.contestantOneName + ' Vs. ' + match.contestantTwoName + ' @ ' + startTimeStr;
    }

}