import { Message } from 'discord.js';
import * as sprintf from 'sprintf-js';
import * as moment from 'moment';

import { Router } from '../../router';
import { MatchService, MatchHistoryCursor, FinishedMatch } from '../../client';

export class PrintMatchHistoryCommand {

    constructor(private matchService: MatchService, private router: Router) {

    }

    register(router: Router) {
        router.addRoute(['match', 'history'], (message) => this.printMatchHistory(message));
    }

    private async printMatchHistory(message: Message) {
        this.addTemporaryNavigation();
        let cursor = await this.matchService.getFinishedMatches();
        this.printMatchesTable(message, cursor);
    }

    private addTemporaryNavigation() {
        this.router.addTemporaryRoute(['older'], (message) => this.handleOlderNavigation(message));
        this.router.addTemporaryRoute(['newer'], (message) => this.handleNewerNavigation(message));
    }

    private async handleOlderNavigation(message: Message) {
        let cursor = await this.matchService.pageBackwards();
        this.printMatchesTable(message, cursor);
    }

    private async handleNewerNavigation(message: Message) {
        let cursor = await this.matchService.pageForwards();
        this.printMatchesTable(message, cursor);
    }

    private async printMatchesTable(message: Message, cursor: MatchHistoryCursor) {
        let resultMessage = '```\n';
        resultMessage += "Match Id | Cont. One Name | Cont. Two Name | Match Time\n";
        resultMessage += "---------+----------------+----------------+-----------\n";
        resultMessage += cursor.lastResults.map(match => this.formatMatch(match)).join("\n");
        resultMessage += '\n```';
        let cursorEndTime = cursor.endTime === null ? 'now' : moment(cursor.endTime).format("dddd, MMMM Do YYYY, h:mm:ss a Z");
        resultMessage += '\nDisplaying matches working backwards from *' + cursorEndTime + '*.  To view more matches type `older`, `newer`, or a date modifier (e.g. `back 3 days` or `forward 30 minutes`).';
        resultMessage += '\n\nTo replay a match type `match :matchId replay`';
        message.reply(resultMessage);
    }

    private formatMatch(match: FinishedMatch) {
        let contestantOneName = (match.result.contestantOneWon) ? match.contestantOneName + '*' : match.contestantOneName;
        let contestantTwoName = (match.result.contestantOneWon) ? match.contestantTwoName : match.contestantTwoName + '*';
        let matchTime = moment(match.startTime).format("dddd, MMMM Do YYYY, h:mm:ss a Z");
        return sprintf.sprintf('%8d | %14s | %-14s | %s', match._id, contestantOneName, contestantTwoName, matchTime);
    }
}