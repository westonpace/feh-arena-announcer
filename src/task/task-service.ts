import { Clogger } from '../util';

export class TaskService {

    private logger = new Clogger();

    scheduleRepeatingTask(interval: number, run: () => Promise<void>) {
        setInterval(() => {
            run().catch(err => {
                this.logger.exception(err);
            });
        }, interval);
    }

}