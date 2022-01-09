import tinkoffAPI from '@tinkoff/invest-openapi-js-sdk';
import dotenv from 'dotenv';
import _ from "lodash";
import logger from "../logger.js";

dotenv.config();


class TINKOFF_API {
    constructor() {
        const apiURL = 'https://api-invest.tinkoff.ru/openapi';
        const socketURL = 'wss://api-invest.tinkoff.ru/openapi/md/v1/md-openapi/ws';
        const secretToken = process.env.TINKOFF_TOKEN;
        const brokerAccountId = process.env.brokerAccountId;
        this._api = new tinkoffAPI({apiURL, secretToken, socketURL, brokerAccountId});
        logger.info(`Module "TINKOFF_API" (sourceAPIs) started.`);
    }

    async getActiveList(activeType) {
        let activeList = await this._api[activeType]();
        activeList = activeList.instruments.map(item => _.pick(item, ['figi', 'type', 'name', 'currency']))
        return activeList
    }

    async query({figi, from, to, interval, type, name, currency}) {
        try {
            const history = await this._api.candlesGet({from, to, figi, interval});
            if (!history.candles.length) return []
            return history.candles.map(day => ({
                o: day.o,
                c: day.c,
                h: day.h,
                l: day.l,
                v: day.v,
                date: day.time.substr(0, 10),
                figi,
                name,
                type,
                currency
            }))
        } catch (e) {
            console.log(e)
            return []
        }
    }
}

export default TINKOFF_API;