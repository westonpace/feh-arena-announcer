"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TaskService {
    scheduleRepeatingTask(interval, run) {
        setInterval(() => {
            run().catch(err => {
                console.log('Task Error: ' + err);
            });
        }, interval);
    }
}
exports.TaskService = TaskService;
//# sourceMappingURL=task-service.js.map