"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("../test");
const register_channel_1 = require("./register-channel");
describe('Register Channel Command Tests', () => {
    let testHarness;
    // Recording what was attempted
    let registeredChannels = [];
    let broadcasts = [];
    let unregisteredChannels = [];
    let mockChannelRepo = {
        registerChannel: (channel, broadcast) => {
            registeredChannels.push(channel);
            broadcasts.push(broadcast);
        },
        unregisterChannel: (channel) => {
            unregisteredChannels.push(channel);
        }
    };
    beforeEach(() => {
        testHarness = new test_1.TestHarness((router) => {
            new register_channel_1.RegisterChannelCommand(mockChannelRepo).register(router);
        });
        registeredChannels = [];
        broadcasts = [];
        unregisteredChannels = [];
    });
    it('Should allow me to register a channel', () => {
        testHarness.sendMessage('channel register');
        expect(registeredChannels.length).toBe(1);
        expect(broadcasts.length).toBe(1);
        expect(broadcasts[0]).toBe(false);
        expect(testHarness.sentReplies.length).toBe(1);
        testHarness.sendMessage('channel register broadcast');
        expect(registeredChannels.length).toBe(2);
        expect(broadcasts.length).toBe(2);
        expect(broadcasts[1]).toBe(true);
        expect(testHarness.sentReplies.length).toBe(2);
        testHarness.sendMessage('channel register off');
        expect(unregisteredChannels.length).toBe(1);
        expect(testHarness.sentReplies.length).toBe(3);
    });
});
//# sourceMappingURL=register-channel.spec.js.map