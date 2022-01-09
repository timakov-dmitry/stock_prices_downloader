import {writeFileAsync} from "../tools.js";
import config from "../config.js";
import logger from "../logger.js";

class EXPORT_TO_JSON_FILE  {
    batchIndex = 1
    currentBatch = []
    constructor() {
        logger.info(`Module "EXPORT_TO_JSON_FILE" (exportTarget) started.`);
    }

    async _save() {
        const saveData = JSON.stringify(this.currentBatch, null, 2);
        const filePath = `${config.EXPORT_SETTINGS.exportDir}/${config.RUN_SETTINGS.generatorTemplateName}_${config.QUERY.type}_${this.batchIndex}.json`
        await writeFileAsync(filePath, saveData);
        this.currentBatch = []
        this.batchIndex++;
        console.log(`Data has written to file: ${filePath}.json`);
    }

    async finish() {
        await this._save()
        logger.info(`======================================= \n All data saved`);
    }

    async saveRequest(newItem) {
        this.currentBatch.push(newItem)
        if (this.currentBatch.length > config.EXPORT_SETTINGS.batchSize) await this._save()
    }
}

export default EXPORT_TO_JSON_FILE;

