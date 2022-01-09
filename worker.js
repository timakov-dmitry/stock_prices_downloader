import sourceAPI from "./sourceAPIs/index.js";
import exportTarget from "./exportTarget/index.js";
import {sleep} from "./tools.js";
import config from "./config.js";
import logger from "./logger.js";


class Worker {
    constructor(settings, taskManager) {
        this.api = sourceAPI[settings.sourceAPIName]
        this.exportTarget = exportTarget[settings.exportTargetName]
        this.taskManager = taskManager
        logger.info(`Worker started. \n =======================================`);
    }

    async run(){
        while (this.taskManager.queue.length) {
            const task = this.taskManager.nextTask()
            const history = await this.api.query(task)
            await this.exportTarget.saveRequest(history)
            await sleep(config.QUERY.querySleepTime)
        }
        await this.exportTarget.finish()
    }
}

export default Worker;