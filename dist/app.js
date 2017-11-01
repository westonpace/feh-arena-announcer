"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const router_1 = require("./router");
const client_1 = require("./client");
const channels_1 = require("./channels");
const task_1 = require("./task");
const match_watching_1 = require("./match-watching");
const commands = require("./commands");
const tasks = require("./tasks");
const client = new Discord.Client();
const router = new router_1.Router('!');
const arenaClient = new client_1.ArenaClient();
const channelsRepository = new channels_1.ChannelsRepository();
const broadcastService = new channels_1.BroadcastService(channelsRepository, client);
const taskService = new task_1.TaskService();
const matchScanningService = new match_watching_1.MatchScanningService(arenaClient);
const matchWatchingService = new match_watching_1.MatchWatchingService(arenaClient, broadcastService);
client.on('ready', () => {
    new commands.PrintScheduleCommand(arenaClient).register(router);
    new commands.RegisterChannelCommand(channelsRepository).register(router);
    new commands.ReportChannelStatusCommand(channelsRepository).register(router);
    new commands.PrintTierListCommand(arenaClient).register(router);
    new commands.TuneInCommand(matchWatchingService, matchScanningService).register(router);
    new commands.PrintTierRosterCommand(arenaClient).register(router);
    new tasks.ReportNextMatchTask(matchScanningService, broadcastService).register(taskService);
    new tasks.PollMatchesTask(matchWatchingService).register(taskService);
    console.log('I am ready!');
});
client.on('message', message => {
    router.route(message);
});
client.login('MzY4NTE0OTYxMzc2NTQyNzIw.DMLKog.lndSRBiiTJIbGk4PRxWW9GdC6Tw').catch(err => {
    console.log(err);
});
//# sourceMappingURL=app.js.map