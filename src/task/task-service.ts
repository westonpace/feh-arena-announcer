export class TaskService {

    scheduleRepeatingTask(interval: number, run: () => Promise<void>) {
        setInterval(() => {
            run().catch(err => {
                console.log('Task Error: ' + err);
            });
        }, interval);
    }

}