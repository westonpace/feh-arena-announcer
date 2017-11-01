import * as moment from 'moment';

import { MatchScanningService } from '../match-watching';
import { TaskService } from '../task';
import { BroadcastService } from '../channels';
import { getCurrentTimestamp } from '../util';

const ONE_MINUTE_MS = 60 * 1000;
const FIVE_MINUTES_MS = 5 * ONE_MINUTE_MS;

export class ReportNextMatchTask {

    constructor(private matchScanningService: MatchScanningService, private broadcast: BroadcastService) {

    }

    register(taskService: TaskService) {
        taskService.scheduleRepeatingTask(ONE_MINUTE_MS, () => this.checkAndReport());
    }

    private async checkAndReport(): Promise<void> {
        let nextMatch = await this.matchScanningService.scanForMatchesWithin(FIVE_MINUTES_MS);
        if (nextMatch) {
            let now = getCurrentTimestamp();
            let minutesUntilMatch = Math.round(Math.max(1, moment.duration(nextMatch.startTime - now).asMinutes()));
            this.broadcast.broadcastMessage(
                'A match between ' +
                nextMatch.contestantOneName +
                ' and ' + nextMatch.contestantTwoName +
                ' will be starting in about ' + minutesUntilMatch +  ' minutes.' +
                '  If you want to hear the match make sure to `tune in`'
            );
        }
    }

}