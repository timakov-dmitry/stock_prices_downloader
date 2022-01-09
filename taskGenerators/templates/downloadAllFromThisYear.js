import sourceAPI from "../../sourceAPIs/index.js";
import config from "../../config.js";
import {writeFileAsync} from "../../tools.js";
import moment from "moment";
import logger from "../../logger.js";

const from = moment().month(1).dayOfYear(1).hour(3).minute(1).second(1).millisecond(0).toISOString()
const to = moment().toISOString()

class DOWNLOAD_ALL_FROM_THIS_YEAR {
    constructor() {
        this.api = sourceAPI[config.RUN_SETTINGS.sourceAPIName]
        logger.info(`Template "DOWNLOAD_ALL_FROM_THIS_YEAR" (templates) started.`);
    }

    async _save(queue) {
        queue = JSON.stringify(queue, null, 2);
        await writeFileAsync(config.QUEUE.jsonFileLocation, queue)
    }

    async buildQueue() {
        const activeList = await this.api.getActiveList(config.QUERY.type)
        const tasks = activeList.map(item => ({
            figi: item.figi,
            from,
            to,
            interval: config.QUERY.interval,
            type: config.QUERY.type,
            name: item.name,
            currency: item.currency,
        }))
        await this._save(tasks)
    }
}

export default DOWNLOAD_ALL_FROM_THIS_YEAR