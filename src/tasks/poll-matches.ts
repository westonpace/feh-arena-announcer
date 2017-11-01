import { MatchWatchingService } from '../match-watching';
import { TaskService } from '../task';

const THIRTY_SECONDS_MS = 30 * 1000;

export class PollMatchesTask {

    constructor(private matchWatchingService: MatchWatchingService) {

    }

    register(taskService: TaskService) {
        taskService.scheduleRepeatingTask(THIRTY_SECONDS_MS, () => this.pollMatches());
    }

    private pollMatches(): Promise<void> {
        return this.matchWatchingService.poll();
    }

}