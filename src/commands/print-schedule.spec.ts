import { TestHarness } from '../test';

import { PrintScheduleCommand } from './print-schedule';

describe('Print Schedule Command Tests', () => {

    let testHarness: TestHarness;

    beforeEach(() => {
        testHarness = new TestHarness((router, arenaClient) => {
            new PrintScheduleCommand(arenaClient).register(router);
        });
    })

    it('Should print a schedule', () => {
        testHarness.mockArenaClient.getUnfinishedMatchesReply = [{
            contestantOneName:'Gerik',
            contestantTwoName:'Helen',
            startTime:1508036040880,
            endTime:-1,
            id:0 
        }, {
            contestantOneName:'Exechio',
            contestantTwoName:'Mustafa',
            startTime:1508061240880,
            endTime:-1,
            id:1
        }];
        return testHarness.sendMessage('schedule').then(() => {
            let expectedMessage = 
            'Gerik Vs. Helen @ Sat Oct 14 2017 20:54:00 GMT-0600\n' +
            'Exechio Vs. Mustafa @ Sun Oct 15 2017 03:54:00 GMT-0600';
            expect(testHarness.sentMessages.length).toBe(1);
            expect(testHarness.sentMessages[0]).toBe(expectedMessage); 
        });
    });

});