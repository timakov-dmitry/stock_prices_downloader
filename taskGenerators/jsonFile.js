import templates from "./templates/index.js";
import config from "../config.js";
import {readFileAsync} from "../tools.js";
import logger from "../logger.js";


class JSON_FILE {
    constructor() {
        logger.info(`Module "JSON_FILE" (taskGenerators) started.`);
    }

    buildQueue() {
        this.template.build()
        const tasks = []
        return tasks
    }

    async fetchQueue() {
        const taskString = await readFileAsync(config.QUEUE.jsonFileLocation, "utf8")
        return JSON.parse(taskString)
    }
}

export default JSON_FILE;