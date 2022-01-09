import dotenv from 'dotenv';
dotenv.config();
import Worker from "./worker.js";
import TASK_MANAGER from "./taskManager/index.js";
import config from "./config.js";
import templates from "./taskGenerators/templates/index.js";


const workerSettings = {
    sourceAPIName: config.RUN_SETTINGS.sourceAPIName,
    exportTargetName: config.RUN_SETTINGS.exportTargetName,
}

const taskManager = new TASK_MANAGER(config.RUN_SETTINGS.taskGeneratorName)
const worker = new Worker(workerSettings, taskManager)
const generatorTemplate = templates[config.RUN_SETTINGS.generatorTemplateName]

generatorTemplate
    .buildQueue()
    .then(() => taskManager.fetchQueue())
    .then(() => worker.run())
    .then(console.log)
    .catch(console.log)