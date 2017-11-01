"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("../test");
const print_schedule_1 = require("./print-schedule");
describe('Print Schedule Command Tests', () => {
    let testHarness;
    beforeEach(() => {
        testHarness = new test_1.TestHarness((router, arenaClient) => {
            new print_schedule_1.PrintScheduleCommand(arenaClient).register(router);
        });
    });
    it('Should print a schedule', () => {
        testHarness.mockArenaClient.getUnfinishedMatchesReply = [{
                contestantOneName: 'Gerik',
                contestantTwoName: 'Helen',
                startTime: 1508036040880,
                endTime: -1,
                id: 0
            }, {
                contestantOneName: 'Exechio',
                contestantTwoName: 'Mustafa',
                startTime: 1508061240880,
                endTime: -1,
                id: 1
            }];
        return testHarness.sendMessage('schedule').then(() => {
            let expectedMessage = 'Gerik Vs. Helen @ Sat Oct 14 2017 20:54:00 GMT-0600\n' +
                'Exechio Vs. Mustafa @ Sun Oct 15 2017 03:54:00 GMT-0600';
            expect(testHarness.sentMessages.length).toBe(1);
            expect(testHarness.sentMessages[0]).toBe(expectedMessage);
        });
    });
});
//# sourceMappingURL=print-schedule.spec.js.map