import {readFileAsync} from "../tools.js";
import config from "../config.js";
import taskGenerator from "../taskGenerators/index.js";
import logger from "../logger.js";

class TASK_MANAGER {
    queueStartLength = undefined
    queue = []

    constructor(taskGeneratorName) {
        this.taskGenerator = taskGenerator[taskGeneratorName]
    }

    async fetchQueue() {
        this.queue = await this.taskGenerator.fetchQueue()
        this.queueStartLength = this.queue.length
    }

    nextTask() {
        const task = this.queue.shift()
        logger.info(` Started new task: Download ${task.type}: "${task.name}". ${this.queue.length} left.`)
        return task
    }
}

export default TASK_MANAGER