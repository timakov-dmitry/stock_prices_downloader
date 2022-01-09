import log from 'simple-node-logger';
import config from "./config.js";

const opts = {
    logFilePath:'logs/out.log',
    timestampFormat:'YYYY-MM-DD HH:mm:ss'
};

const logger = log.createSimpleLogger(opts);
logger.setLevel(config.RUN_SETTINGS.logLevel);

export default logger