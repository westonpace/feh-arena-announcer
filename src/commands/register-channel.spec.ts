import { TestHarness } from '../test';
import { ChannelsRepository, ChannelRequest } from '../channels';

import { RegisterChannelCommand } from './register-channel';

describe('Register Channel Command Tests', () => {

    let testHarness: TestHarness;

    // Recording what was attempted
    let registeredChannels: ChannelRequest[] = [];
    let broadcasts: boolean[] = [];
    let unregisteredChannels: ChannelRequest[] = []

    let mockChannelRepo = {
        registerChannel: (channel: ChannelRequest, broadcast: boolean) => {
            registeredChannels.push(channel);
            broadcasts.push(broadcast);
        },
        unregisterChannel: (channel: ChannelRequest) => {
            unregisteredChannels.push(channel);
        }
    };

    beforeEach(() => {
        testHarness = new TestHarness((router) => {
            new RegisterChannelCommand(mockChannelRepo as ChannelsRepository).register(router);
        });
        registeredChannels = [];
        broadcasts = [];
        unregisteredChannels = [];
    })

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