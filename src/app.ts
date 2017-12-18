import * as Discord from 'discord.js';
import * as config from 'config';

import { Router } from './router';
import { ArenaClient, ContestantService, ImageService } from './client';
import { ChannelsRepository, BroadcastService } from './channels';
import { TaskService } from './task';
import { MatchScanningService, MatchWatchingService } from './match-watching';
import * as commands from './commands';
import * as tasks from './tasks';

const client = new Discord.Client();
const router = new Router(config.get('app.default-command-prefix'));
const arenaClient = new ArenaClient();
const channelsRepository = new ChannelsRepository();
const broadcastService = new BroadcastService(channelsRepository, client);
const taskService = new TaskService();
const matchScanningService = new MatchScanningService(arenaClient);
const matchWatchingService = new MatchWatchingService(arenaClient, broadcastService);
const contestantService = new ContestantService(arenaClient);
const imageService = new ImageService(arenaClient);
 
client.on('ready', () => {
    new commands.PrintNameCommand(config.get('discord.name')).register(router);
    new commands.PrintScheduleCommand(arenaClient).register(router);
    new commands.RegisterChannelCommand(channelsRepository).register(router);
    new commands.ReportChannelStatusCommand(channelsRepository).register(router);
    new commands.PrintTierListCommand(arenaClient).register(router);
    new commands.TuneInCommand(matchWatchingService, matchScanningService).register(router);
    new commands.PrintTierRosterCommand(arenaClient).register(router);
    new commands.ReportContestantRosterCommand(contestantService, imageService).register(router);
    new tasks.ReportNextMatchTask(matchScanningService, broadcastService).register(taskService);
    new tasks.PollMatchesTask(matchWatchingService).register(taskService);
    console.log('I am ready!');
});
 
client.on('message', message => {
    router.route(message);
});
 
client.login(config.get('discord.token')).catch(err => {
    console.log(err);
});